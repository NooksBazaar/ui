import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useField } from 'react-final-form';

export interface SearchTermProps {
  name: string;
}

const SearchInput = styled.input`
  border: none;
  width: 100%;
  background: ${({ theme }) => theme.palette.background.paper};
  padding: ${({ theme }) => theme.spacing(3)}px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  font-size: ${({ theme }) => theme.typography.h6.fontSize};
`;

export function SearchTerm({ name }: SearchTermProps) {
  const { t } = useTranslation('common');
  const field = useField(name);

  return (
    <SearchInput
      type="text"
      placeholder={t('items.search-term', 'Enter search term')}
      {...field.input}
    />
  );
}
