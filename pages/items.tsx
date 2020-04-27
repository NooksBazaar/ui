import React, { useEffect, useMemo, useState } from 'react';
import { Container, Paper, Typography } from '@material-ui/core';
import Axios from 'axios';
import { stringify } from 'qs';
import { GenericItem } from '../src/components/items/generic-item';
import styled from 'styled-components';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';

interface Response {
  items: any[],
  count: number,
}

interface ItemsProps {
  items: Response;
}

async function fetchItems(searchTerm?: string): Promise<Response> {
  const filter: any = {
    limit: 15,
    where: {},
  };

  if (searchTerm) {
    filter.where.name = { like: searchTerm };
  }

  const params = stringify({
    filter: JSON.stringify(filter),
  });

  const res = await Axios.get(`https://api-dev.bazaar.ac/items?${params}`);

  return {
    items: res.data,
    count: res.headers['pagination-count'],
  };
}

const ItemBox = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  padding: ${({ theme }) => theme.spacing(1)}px;

  &:last-of-type {
    border-bottom: none;
  }
`;

const SearchBox = styled.div`
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const SearchInput = styled.input`
  border: none;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(3)}px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  font-size: ${({ theme }) => theme.typography.h6.fontSize};
`;

export default function Items({ items }: ItemsProps) {
  const { query, push } = useRouter();
  const { t } = useTranslation('common');
  const [data, setData] = useState(items);
  const searchTerm$ = useMemo(() => new BehaviorSubject(query.term as string || ''), []);

  useEffect(() => {
    if (data?.items.length > 0) {
      return;
    }

    fetchItems().then(setData);
  }, []);

  useEffect(() => {
    const observable = searchTerm$
      .pipe(debounceTime(200))
      .subscribe((value) => {
        fetchItems(value).then(setData);
        push(`/items?term=${value}`);
      });

    return () => observable.unsubscribe();
  }, []);

  return (
    <Container maxWidth="lg">
      <SearchBox>
        <SearchInput
          type="text"
          placeholder={t('items.search-term', 'Enter search term')}
          onChange={(e) => searchTerm$.next(e.target.value)}
        />
      </SearchBox>

      <Typography>
        Found {data?.count} results.
      </Typography>

      <Paper>
        {data?.items.map((item) => (
          <ItemBox key={item.id}>
            <GenericItem item={item} />
          </ItemBox>
        ))}
      </Paper>
    </Container>
  );
}

Items.getInitialProps = async ({ query }: NextPageContext) => {
  const items = await fetchItems(query.term as string);

  return { items };
};
