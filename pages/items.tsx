import React, { useEffect, useState } from 'react';
import { Box, Container, Divider, Paper } from '@material-ui/core';
import Axios from 'axios';
import { stringify } from 'qs';
import { GenericItem } from '../src/components/items/generic-item';

interface ItemsProps {
  items: any[];
}

async function fetchItems(): Promise<any[]> {
  const filter = {
    limit: 15,
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

export default function Items({ items }: ItemsProps) {
  const [data, setData] = useState(items || []);

  useEffect(() => {
    if (data.length > 0) {
      return;
    }

    fetchItems().then(setData);
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <Box p={1}>
              <GenericItem item={item} />
            </Box>
            <Divider />
          </React.Fragment>
        ))}
      </Paper>
    </Container>
  );
}

Items.getInitialProps = async () => {
  const items = await fetchItems();

  return { items };
};
