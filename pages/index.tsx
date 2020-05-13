import React, { useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';

export default function Index() {
  const { t } = useTranslation('common');
  const { push } = useRouter();

  useEffect(() => {
    push('/items');
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        {t('welcome.header', `Welcome to Nook's Bazaar`)}
      </Typography>

      <p>{t('welcome.text', `One day a site will exist here... hopefully.`)}</p>
    </Container>
  );
}

Index.getInitialProps = async ({ res }: NextPageContext) => {
  if (res) {
    res.writeHead(302, {
      Location: '/items',
    });
    res.end();
  }
};
