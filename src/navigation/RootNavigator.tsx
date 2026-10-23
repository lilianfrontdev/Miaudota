import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WelcomeScreen } from "../screens/WelcomeScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import type { RootStackParamList } from "./types";
import { RoleScreen } from "../screens/RoleScreen";
import { OnboardingDiscoverScreen } from "../screens/OnboardingDiscoverScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "#FFF7E7",
          },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="OnboardingDiscover"component={OnboardingDiscoverScreen} />
        <Stack.Screen name="RoleSelection" component={RoleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
