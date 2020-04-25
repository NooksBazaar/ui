import React from 'react';
import { Container, Typography } from '@material-ui/core';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome!
      </Typography>

      <p>One day a site will exist here. Maybe? At some point?</p>
    </Container>
  );
}
