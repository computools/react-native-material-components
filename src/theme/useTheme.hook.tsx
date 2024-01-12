import {useContext} from 'react';

import {ThemeContext} from './Theme.context';

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  return theme;
};
