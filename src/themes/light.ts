import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 2px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 3px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 4px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 5px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 6px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 7px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 8px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 9px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 10px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 11px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 12px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 13px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 14px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 15px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 16px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 17px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 18px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 19px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 20px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 21px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 22px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 23px 4px 0 rgba(0, 0, 0, 0.14)',
    '0 24px 4px 0 rgba(0, 0, 0, 0.14)',
  ],
  mixins: {},
});

export default theme;
