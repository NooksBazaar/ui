import React from 'react';
import { Grid } from '@material-ui/core';
import { TextField } from 'mui-rff';
import { numericality } from 'redux-form-validators';

interface FieldProps {
  name: string;
  label: string;
}

export interface RangeFacetProps {
  start: FieldProps;
  end: FieldProps;
}

export function RangeFacet({ start, end }: RangeFacetProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          name={start.name}
          label={start.label}
          inputProps={{
            inputMode: 'numeric',
          }}
          variant="outlined"
          fieldProps={{
            validate: numericality({
              int: true,
              '>=': 0
            })
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name={end.name}
          label={end.label}
          inputProps={{
            inputMode: 'numeric',
          }}
          variant="outlined"
          fieldProps={{
            validate: numericality({
              int: true,
              '>=': 0
            })
          }}
          fullWidth
        />
      </Grid>
    </Grid>
  );
}
