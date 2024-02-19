import {useContext} from 'react';

import {MaterialComponentsContext} from '../provider/MaterialComponents.context';

export const useTypography = () => {
  const {typography} = useContext(MaterialComponentsContext);

  return typography;
};
