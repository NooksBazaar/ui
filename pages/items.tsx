import React, { useEffect, useState } from 'react';
import { Container, Paper } from '@material-ui/core';
import Axios from 'axios';
import { stringify } from 'qs';
import { GenericItem } from '../src/components/items/generic-item';
import { FixedSizeList as List } from 'react-window';
import { useWindowSize } from 'react-use';
import styled from 'styled-components';

interface ItemsProps {
  items: any[];
}

async function fetchItems(): Promise<any[]> {
  const filter = {
    where: {
      sourceSheet: 'Housewares',
    },
  };

  const params = stringify({
    filter: JSON.stringify(filter),
  });

  const res = await Axios.get(`https://api-dev.bazaar.ac/items?${params}`);

  return res.data;
}

const ItemBox = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  padding: ${({ theme }) => theme.spacing(1)}px;
  background: ${({ theme }) => theme.palette.background.paper};
  overflow-y: hidden;
  height: unset !important;
  min-height: 150px;
  max-height: 150px;
  transition: ${({ theme }) => theme.transitions.create('max-height')};

  &:hover {
    max-height: 300px;
    z-index: 1;
  }
`

export default function Items({ items }: ItemsProps) {
  const [data, setData] = useState(items || []);
  const { height } = useWindowSize(1920, 1080);

  useEffect(() => {
    if (data.length > 0) {
      return;
    }

    fetchItems().then(setData);
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper>
        <List
          className="List"
          height={height - 32}
          itemCount={data.length}
          itemSize={150}
          width="100%"
        >
          {({ index, style }) => (
            <ItemBox style={style}>
              <GenericItem item={data[index]} />
            </ItemBox>
          )}
        </List>
      </Paper>
    </Container>
  );
}

Items.getInitialProps = async () => {
  const items = await fetchItems();

  return { items };
};
