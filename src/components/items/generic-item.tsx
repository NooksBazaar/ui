import React from 'react';
import { Grid, Tooltip, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useLocalStore, useObserver } from 'mobx-react-lite';

const ItemImage = styled.img`
  max-width: 128px;
  max-height: 128px;
  height: auto;
`;

const VariantImage = styled.img`
  max-width: 48px;
  max-height: 48px;
  height: auto;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  margin-right: ${({ theme }) => theme.spacing(.5)}px;

  &:last-of-type {
    margin-right: 0;
  }
`;

export interface GenericItemProps {
  item: any;
}

function NotForSale() {
  return (
    <Tooltip title="Not for sale">
      <abbr title="Not for sale">NFS</abbr>
    </Tooltip>
  )
}

export function GenericItem({ item }: GenericItemProps) {
  const store = useLocalStore(() => ({
    activeVariant: item.variants[0],
    displayVariant: item.variants[0],

    setActiveVariant(variant: any) {
      store.activeVariant = variant;
    },

    setDisplayVariant(variant: any) {
      store.displayVariant = variant;
    },

    resetToActive() {
      store.displayVariant = store.activeVariant;
    },
  }));

  return useObserver(() => (
    <Grid container>
      <Grid item sm={2}>
        <ItemImage src={store.displayVariant.image} alt={item.name}/>
      </Grid>
      <Grid item sm={10}>
        <Typography variant="h6">{store.displayVariant.name || item.name}</Typography>

        <Typography variant="body1">
          <strong>Buy</strong>: {store.displayVariant.buy === -1 ? <NotForSale /> : store.displayVariant.buy} <br/>
          <strong>Sell</strong>: {store.displayVariant.sell}
        </Typography>

        {item.variants.map((variant: any) => {
          return (
            <Tooltip title={variant.variation} key={variant.variation} placement="top">
              <VariantImage
                src={variant.image}
                onMouseOver={() => store.setDisplayVariant(variant)}
                onMouseOut={() => store.resetToActive()}
                onClick={() => store.setActiveVariant(variant)}
              />
            </Tooltip>
          );
        })}
      </Grid>
    </Grid>
  ));
}
