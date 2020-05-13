import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  Tooltip,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Facet } from './facets/facet';
import { useForm, useFormState } from 'react-final-form';

export interface FacetFilterProps {
  // TODO: Add props
}

const Container = styled.div<{ hasFacets: boolean }>`
  padding: 0 ${({ theme, hasFacets }) => theme.spacing(hasFacets ? 3 : 1.5)}px;
`;

const FACETS = [
  'buy',
  'sell',
  'color',
  'theme',
  'set',
  'customizable',
  'interactive',
  'diy',
  'source',
];

export function FacetFilter(props: FacetFilterProps) {
  const form = useForm();
  const [enabledFacets, setEnabledFacets] = useState([] as string[]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const { values } = form.getState();
    let enabled = [];

    for (const facet of FACETS) {
      if (values[facet]) {
        enabled.push(facet);
      }
    }

    setEnabledFacets(enabled);
  }, [])

  const handleOpenFacetMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAddFacet = (facet: string) => () => {
    setEnabledFacets([...enabledFacets, facet]);
    handleClose();
  };

  const handleRemoveFacet = (facetIdx: number) => () => {
    const values = [...enabledFacets];

    values.splice(facetIdx, 1);

    setEnabledFacets(values);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container hasFacets={enabledFacets.length > 0}>
      {enabledFacets.map((facet, idx) => (
        <Facet
          key={idx}
          facet={facet}
          idx={idx}
          onRemoveFacet={handleRemoveFacet}
        />
      ))}

      <Tooltip title="Add filter">
        <IconButton onClick={handleOpenFacetMenu}>
          <SvgIcon>
            <FontAwesomeIcon icon={['fas', 'plus-circle']} />
          </SvgIcon>
        </IconButton>
      </Tooltip>

      <Menu
        id="facet-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {FACETS.map((facet) => (
          <MenuItem key={facet} onClick={handleAddFacet(facet)}>
            {facet}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
}
