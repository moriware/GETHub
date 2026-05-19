export type ThemeMode = 'light' | 'dark';

export interface ThemeColorTokens {
  primary: string;
  background: string;
  headerBackground: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
}

export interface ThemeSpacingTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ThemeRadiusTokens {
  sm: number;
  md: number;
  lg: number;
}

export interface ThemeTypographyTokens {
  body: number;
  label: number;
  title: number;
  headline: number;
}

export interface ThemeSizeTokens {
  iconSm: number;
  iconMd: number;
  iconLg: number;
  avatarSm: number;
  avatarMd: number;
  avatarLg: number;
}

export interface ThemeOpacityTokens {
  full: number;
  disabled: number;
  pressed: number;
  subtle: number;
  medium: number;
}

export interface ThemeBorderTokens {
  width: {
    none: number;
    thin: number;
    thick: number;
  };
}

export interface ThemeShadowValue {
  shadowColor: string;
  shadowOpacity: number;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowRadius: number;
  elevation: number;
}

export interface ThemeShadowTokens {
  sm: ThemeShadowValue;
  md: ThemeShadowValue;
}

export interface AppTheme {
  mode: ThemeMode;
  colors: ThemeColorTokens;
  spacing: ThemeSpacingTokens;
  radius: ThemeRadiusTokens;
  typography: ThemeTypographyTokens;
  sizes: ThemeSizeTokens;
  opacity: ThemeOpacityTokens;
  borders: ThemeBorderTokens;
  shadows: ThemeShadowTokens;
}
