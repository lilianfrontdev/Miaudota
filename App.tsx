import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider } from 'tamagui';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './src/navigation/RootNavigator';
import config from './tamagui.config';

export default function App() {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config} defaultTheme="miau">
        <StatusBar style="dark" />
        <RootNavigator />
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}