import React from 'react';
import Head from 'next/head';
import App, { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Shell } from '../src/components/shell';
import '../src/icons';
import { themes } from '../src/themes';
import NextCookies from 'next-cookies';
import { Cookies } from '../types/cookies';
import { IncomingMessage } from 'http';
import universalLanguageDetect from '@unly/universal-language-detector/lib';
import { LANG_EN, SUPPORTED_LANGUAGES } from '../src/i18n';
import {
  fetchTranslations,
  i18nextLocize,
  I18nextResources,
} from '../src/i18n-locize';
import { I18nextProvider } from 'react-i18next';
import { AppContext } from 'next/dist/pages/_app';

type MyAppProps = AppProps<{
  lang: string;
  defaultLocales: I18nextResources;
}>;

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  const i18n = i18nextLocize(pageProps.lang, pageProps.defaultLocales); // Apply i18next configuration with Locize backend

  const theme = themes.light;

  return (
    <>
      <Head>
        <title>Nook's Bazaar!</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <I18nextProvider i18n={i18n}>
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
      </I18nextProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  const { req } = ctx;
  const readonlyCookies: Cookies = NextCookies(ctx); // Parses Next.js cookies in a universal way (server + client)
  let publicHeaders: any = {};

  if (req) {
    const { headers }: IncomingMessage = req;
    publicHeaders = {
      'accept-language': headers['accept-language'],
      'user-agent': headers['user-agent'],
      host: headers['host'],
    };
  }

  // Resolves the lang, will first check in cookies, and then browser settings
  const lang: string = universalLanguageDetect({
    supportedLanguages: SUPPORTED_LANGUAGES, // Whitelist of supported languages, will be used to filter out languages that aren't supported
    fallbackLanguage: LANG_EN, // Fallback language in case the user's language cannot be resolved
    acceptLanguageHeader: publicHeaders?.['accept-language'], // Optional - Accept-language header will be used when resolving the language on the server side
    serverCookies: readonlyCookies, // Optional - Cookie "i18next" takes precedence over navigator configuration (ex: "i18next: fr"), will only be used on the server side
    errorHandler: (error: Error) => {
      console.error(error.message);
    },
  });

  const appProps = await App.getInitialProps(appContext);

  const defaultLocales: I18nextResources = await fetchTranslations(lang); // Pre-fetches translations from Locize API

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      lang,
      defaultLocales,
    },
  };
};
