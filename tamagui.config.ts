import { defaultConfig } from '@tamagui/config/v6';
import { createTamagui } from 'tamagui';

const config = createTamagui({
  ...defaultConfig,

  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
  },

  variables: {
    primary: '#07599C',
    pink: '#f99ea6',
    yellow: '#fcb31f',
    green: '#97A58A',
    surface: '#FFFFFF',
  },

  themes: {
    ...defaultConfig.themes,

    miau: {
      ...defaultConfig.themes.light,
      background: '#FFF7E7',
      color: '#482313',
    },
  },
});

export default config;

export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}