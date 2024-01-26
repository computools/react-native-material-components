import {useContext} from 'react';

import {MaterialComponentsContext} from '../provider/MaterialComponents.context';

export const useTheme = () => {
  const {theme} = useContext(MaterialComponentsContext);

  return theme;
};
