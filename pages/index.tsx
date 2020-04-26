import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export default function Index() {
  const { t } = useTranslation('common');

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        {t('welcome.header', `Welcome to Nook's Bazaar`)}
      </Typography>

      <p>{t('welcome.text', `One day a site will exist here... hopefully.`)}</p>
    </Container>
  );
}
