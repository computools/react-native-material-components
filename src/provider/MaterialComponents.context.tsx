import React, {createContext, type ReactNode} from 'react';

import type {Theme} from '../theme/theme.types';
import {LightTheme} from '../theme/build-theme';
import {materialTypography} from '../typography/typography.styles';
import type {MaterialTypography} from '../typography/typography.types';

interface MaterialComponentsContextType {
  theme: Theme;
  typography: MaterialTypography;
}

export const MaterialComponentsContext = createContext<MaterialComponentsContextType>({theme: LightTheme, typography: materialTypography});

export interface MaterialComponentsProviderProps {
  children: ReactNode;

  theme?: Theme;
  typography?: MaterialTypography;
}

export const MaterialComponentsProvider: React.FC<MaterialComponentsProviderProps> = ({
  children,
  theme = LightTheme,
  typography = materialTypography,
}) => <MaterialComponentsContext.Provider value={{theme, typography}}>{children}</MaterialComponentsContext.Provider>;
