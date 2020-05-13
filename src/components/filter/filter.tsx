import React, { useMemo } from 'react';
import styled from 'styled-components';
import { SearchTerm } from './search-term';
import { Form, FormSpy } from 'react-final-form';
import { FacetFilter } from './facet-filter';
import { cloneDeep } from 'lodash';

const Container = styled.div`
  background: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

export interface FilterProps {
  value: any;
  onChange(values: any): void;
}

export function Filter({ value, onChange } : FilterProps) {
  const initialValues = useMemo(() => value, []);

  return (
    <Form initialValues={initialValues} onSubmit={(values: any) => {
      const temp = cloneDeep(values);

      // buy
      if (values.buy?.from) {
        temp.buy.from = parseInt(values.buy?.from);
      }
      if (values.buy?.to) {
        temp.buy.to = parseInt(values.buy?.to);
      }

      // sell
      if (values.sell?.from) {
        temp.sell.from = parseInt(values.sell?.from);
      }
      if (values.sell?.to) {
        temp.sell.to = parseInt(values.sell?.to);
      }

      onChange(temp)
    }}>
      {({ handleSubmit }) => (
        <Container>
          <FormSpy
            onChange={({ valid }) => {
             if (!valid) {
                return;
              }

              handleSubmit();
            }}
            subscription={{ values: true, valid: true }}
          />

          <SearchTerm name="term" />
          <FacetFilter />
        </Container>
      )}
    </Form>
  );
}
