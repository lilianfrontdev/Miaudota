import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider } from 'tamagui';

import { WelcomeScreen } from './src/screens/WelcomeScreen';
import config from './tamagui.config';

export default function App() {
  return (
    <TamaguiProvider config={config} defaultTheme="miau">
      <StatusBar style="dark" />
      <WelcomeScreen />
    </TamaguiProvider>
  );
}