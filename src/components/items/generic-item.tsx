import React from 'react';
import { Grid, Tooltip, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useLocalStore, useObserver } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

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
  margin-right: ${({ theme }) => theme.spacing(0.5)}px;

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
      <abbr>NFS</abbr>
    </Tooltip>
  );
}

export function GenericItem({ item }: GenericItemProps) {
  const { t } = useTranslation('common');
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
        <ItemImage src={store.displayVariant.image} alt={item.name} />
      </Grid>
      <Grid item sm={10}>
        <Typography variant="h6">
          {store.displayVariant.name || item.name}
        </Typography>

        <Typography variant="body1">
          <strong>{t('item.buy', 'Buy:')}</strong>{' '}
          {store.displayVariant.buy === -1 ? (
            <NotForSale />
          ) : (
            store.displayVariant.buy
          )}{' '}
          <br />
          <strong>{t('item.sell', 'Sell:')}</strong> {store.displayVariant.sell}
        </Typography>

        {item.variants?.length > 1 && item.variants.map((variant: any) => {
          let name = variant.variation;

          if (variant.colors) {
            const colors = new Set([...variant.colors]);

            name += ` (${[...colors].join(' / ')})`
          }

          return (
            <Tooltip
              title={name}
              key={variant.uniqueEntryId}
              placement="top"
            >
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
