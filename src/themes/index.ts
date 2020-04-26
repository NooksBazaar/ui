import darkTheme from './dark';
import lightTheme from './light';

type Theme = typeof darkTheme;

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
