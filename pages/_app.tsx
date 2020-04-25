import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { Shell } from '../src/components/shell';
import '../src/icons';

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Nook's Bazaar!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Shell>
              <Component {...pageProps} />
            </Shell>
          </MuiThemeProvider>
        </ThemeProvider>
      </StylesProvider>
    </React.Fragment>
  );
}
