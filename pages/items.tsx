import React, { useEffect, useMemo, useState } from 'react';
import { Paper, Typography } from '@material-ui/core';
import Axios from 'axios';
import { stringify } from 'qs';
import { GenericItem } from '../src/components/items/generic-item';
import styled from 'styled-components';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { useObserver } from 'mobx-react-lite';
import { Filter } from '../src/components/filter/filter';
import { buildFilter } from '../src/components/filter/build-filter';

interface Response {
  items: any[];
  count: number;
}

interface ItemsProps {
  items: Response;
}

async function fetchItems(filter: any): Promise<Response> {
  filter = buildFilter(filter);

  if (!filter.limit) {
    filter.limit = 100;
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


function parseFilter(rawFilter?: string) {
  let filter = {};

  if (rawFilter) {
    try {
      filter = JSON.parse(rawFilter as string);
    } catch (e) {
      // ignore parse error
    }
  }

  return filter;
}

const ItemBox = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  padding: ${({ theme }) => theme.spacing(1)}px;

  &:last-of-type {
    border-bottom: none;
  }
`;

export default function Items({ items }: ItemsProps) {
  const { query, push } = useRouter();
  const [data, setData] = useState(items);
  const filter$ = useMemo(
    () => new BehaviorSubject(parseFilter(query?.filter as string)),
    []
  );

  useEffect(() => {
    if (data?.items.length > 0) {
      return;
    }

    fetchItems({}).then(setData);
  }, []);

  useEffect(() => {
    const observable = filter$
      .pipe(debounceTime(200))
      .subscribe((value) => {
        fetchItems(value).then(setData);

        if (value) {
          push(`/items?filter=${JSON.stringify(value)}`);
        }
      });

    return () => observable.unsubscribe();
  }, []);

  return useObserver(() => (
    <>
      <Filter
        value={filter$.value}
        onChange={(values) => {
          filter$.next(values);
        }}
      />

      <Typography>Found {data?.count} results.</Typography>

      <Paper>
        {data?.items.map((item) => (
          <ItemBox key={item.id}>
            <GenericItem item={item} />
          </ItemBox>
        ))}
      </Paper>
    </>
  ));
}

Items.getInitialProps = async ({ query }: NextPageContext) => {
  const items = await fetchItems(parseFilter(query?.filter as string));

  return { items };
};
