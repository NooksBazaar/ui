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

  // if (!item.variants) {
  //   return (
  //     <p>
  //       {t(
  //         'items.card.unsupported',
  //         'Imagine there was lovely information of {{name}} here.',
  //         { name: item.name },
  //       )}
  //     </p>
  //   );
  // }

  const store = useLocalStore(() => ({
    activeVariant: item.variants?.[0] ?? item,
    displayVariant: item.variants?.[0] ?? item,

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
    <Grid container alignItems="center" style={{ minHeight: 128 }} spacing={1}>
      <Grid item sm={2} style={{ maxWidth: 128 }}>
        <ItemImage src={getImageUrl(store.displayVariant)} alt={item.name} />
      </Grid>
      <Grid item sm={10}>
        <Typography variant="h6">
          {store.displayVariant.name || item.name}
        </Typography>

        <Typography variant="body1">
          <strong>{t('item.buy', 'Buy:')}</strong>{' '}
          {store.displayVariant.buy === -1 || !store.displayVariant.buy ? (
            <NotForSale />
          ) : (
            store.displayVariant.buy
          )}{' '}
          <br />
          <strong>{t('item.sell', 'Sell:')}</strong> {store.displayVariant.sell}
        </Typography>

        {item.variants?.length > 1 &&
          item.variants.map((variant: any) => {
            let name = variant.variation;

            if (variant.colors) {
              const colors = Array.from(new Set([...variant.colors])).join(
                ' / ',
              );

              if (colors !== name) {
                name += ` (${colors})`;
              }
            }

            return (
              <Tooltip title={name} key={variant.uniqueEntryId} placement="top">
                <VariantImage
                  src={getImageUrl(variant)}
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

function getImageUrl(variant: any) {
  return (
    variant.image ||
    variant.storageImage ||
    variant.inventoryImage ||
    variant.critterpediaImage ||
    variant.framedImage
  );
}
