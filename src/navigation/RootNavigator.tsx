import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WelcomeScreen } from "../screens/WelcomeScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import type { RootStackParamList } from "./types";
import { RoleScreen } from "../screens/RoleScreen";
import { OnboardingDiscoverScreen } from "../screens/OnboardingDiscoverScreen";
import { OnboardingSupportScreen } from "../screens/OnboardingSupportScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { OrganizationDetailsScreen } from "../screens/OrganizationDetailsScreen";
import { CatDetailsScreen } from "../screens/CatDetailsScreen";

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
        <Stack.Screen name="OnboardingSupport" component={OnboardingSupportScreen} />
        <Stack.Screen name="RoleSelection" component={RoleScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OrganizationDetails"component={OrganizationDetailsScreen}/>
        <Stack.Screen name="CatDetails" component={CatDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
