import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets as MuiServerStyleSheets } from '@material-ui/core';
import { ServerStyleSheet as StyledServerStyleSheet } from 'styled-components';
import { themes } from '../src/themes';
import NextCookies from 'next-cookies';
import universalLanguageDetect from '@unly/universal-language-detector/lib';
import { SUPPORTED_LANGUAGES } from '../src/i18n';

type Props = {
  lang: string;
};

export default class MyDocument extends Document<Props> {
  render() {
    return (
      <Html lang={this.props.lang}>
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={themes.dark.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const cookies = NextCookies(ctx); // Parses Next.js cookies in a universal way (server + client) - It's an object

  // Universally detects the user's language
  const lang = universalLanguageDetect({
    supportedLanguages: SUPPORTED_LANGUAGES, // Whitelist of supported languages, will be used to filter out languages that aren't supported
    fallbackLanguage: 'en', // Fallback language in case the user's language cannot be resolved
    acceptLanguageHeader: ctx.req?.headers['accept-language'], // Optional - Accept-language header will be used when resolving the language on the server side
    serverCookies: cookies, // Optional - Cookie "i18next" takes precedence over navigator configuration (ex: "i18next: fr"), will only be used on the server side
    errorHandler: (error) => {
      // Optional - Use you own logger here, Sentry, etc.
      console.error(error);

      // Example if using Sentry in your app:
      // Sentry.withScope((scope): void => {
      //   scope.setExtra('level', level);
      //   scope.setExtra('origin', origin);
      //   scope.setContext('context', context);
      //   Sentry.captureException(error);
      // });
    },
  });

  // Render app and page and get the context of the page with collected side effects.
  const muiSheets = new MuiServerStyleSheets();
  const styledSheets = new StyledServerStyleSheet();

  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        styledSheets.collectStyles(muiSheets.collect(<App {...props} />)),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      muiSheets.getStyleElement(),
    ],
    lang,
  };
};
