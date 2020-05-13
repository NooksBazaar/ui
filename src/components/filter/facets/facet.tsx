import React, { useState } from 'react';
import { Box, Chip, Popover } from '@material-ui/core';
import styled from 'styled-components';
import { RangeFacet } from './range-facet';
import { useTranslation } from 'react-i18next';

const FacetChip = styled(Chip)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`;

export interface FacetProps {
  facet: string;
  idx: number;
  onRemoveFacet(idx: number): () => void;
}

type FacetTypes = 'range' | 'text' | 'number';

const facetMaps: { [key: string]: FacetTypes } = {
  buy: 'range',
  sell: 'range',
};

export function Facet({ facet, idx, onRemoveFacet }: FacetProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const facetType: FacetTypes | undefined = facetMaps[facet];
  const { t } = useTranslation('common');
  let component: React.ReactNode;

  switch (facetType) {
    case 'range':
      component = (
        <RangeFacet
          start={{
            name: `${facet}.from`,
            label: t('facet.range.from', 'From'),
          }}
          end={{
            name: `${facet}.to`,
            label: t('facet.range.to', 'To'),
          }}
        />
      );
      break;
    default:
      component = 'nope';
      break;
  }

  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment key={idx}>
      <FacetChip
        key={facet}
        label={facet}
        clickable
        onClick={handleOpen}
        onDelete={onRemoveFacet(idx)}
      />

      <Popover
        id={`${facet}-menu`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={2}>
          {component}
        </Box>
      </Popover>
    </React.Fragment>
  );
}
