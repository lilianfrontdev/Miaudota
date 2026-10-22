import { Image, Pressable } from "react-native";
import { Text, useTheme, XStack, YStack } from "tamagui";

import { DecorativeShape } from "../components/DecorativeShape";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useScreenLayout } from "../hooks/useScreenLayout";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export function WelcomeScreen({ navigation }: Props) {
  const { screenWidth, screenHeight, compact } = useScreenLayout();

  const logoWidth = Math.min(screenWidth * 0.94, screenHeight * 0.44);
  const catWidth = Math.min(screenWidth * 0.96, screenHeight * 0.46);

  const blueWidth = Math.max(
    screenWidth * 1.08,
    (screenHeight * 0.54 * 1214) / 1295,
  );

  const blueHeight = blueWidth * (1295 / 1214);

  return (
    <YStack
      flex={1}
      width="100%"
      alignItems="center"
      backgroundColor="background"
      overflow="hidden"
    >
      <YStack
        width={screenWidth}
        height={screenHeight}
        position="relative"
        overflow="hidden"
        backgroundColor="background"
      >
        <DecorativeShape
          source={require("../assets/yellow_form.png")}
          style={{
            top: -screenHeight * 0.04,
            right: -screenWidth * 0.4,
            width: screenWidth * 0.8,
            height: screenWidth * 0.8,
          }}
        />

        <DecorativeShape
          source={require("../assets/pink_form.png")}
          style={{
            top: screenHeight * 0.3,
            left: -screenWidth * 0.13,
            width: screenWidth * 0.52,
            height: screenWidth * 0.78,
          }}
        />

        <DecorativeShape
          source={require("../assets/blue_form.png")}
          style={{
            top: screenHeight * 0.49,
            left: (screenWidth - blueWidth) / 2,
            width: blueWidth,
            height: blueHeight,
          }}
        />

        <Image
          source={require("../assets/logo.png")}
          resizeMode="contain"
          accessibilityLabel="MiauDota"
          style={{
            position: "absolute",
            top: screenHeight * 0.16,
            left: (screenWidth - logoWidth) / 2,
            width: logoWidth,
            height: logoWidth * (887 / 1774),
          }}
        />

        <YStack
          position="absolute"
          top={screenHeight * 0.395}
          left={24}
          right={24}
          alignItems="center"
        >
          <Text
            fontSize={compact ? 18 : 22}
            lineHeight={compact ? "24px" : "28px"}
            textAlign="center"
            color="color"
          >
            Conectando gatos{"\n"}a novos começos
          </Text>
        </YStack>

        <Image
          source={require("../assets/cat2.png")}
          resizeMode="contain"
          accessible={false}
          pointerEvents="none"
          style={{
            position: "absolute",
            top: screenHeight * 0.47,
            left: (screenWidth - catWidth) / 2,
            width: catWidth,
            height: catWidth * (1024 / 1536),
          }}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Começar apresentação"
          onPress={() => navigation.navigate("Onboarding")}
          style={({ pressed }) => ({
            position: "absolute",
            bottom: screenHeight * 0.102,
            left: screenWidth * 0.08,
            right: screenWidth * 0.08,
            height: compact ? 52 : 62,
            borderRadius: 32,
            backgroundColor: "#FFF7E7",
            alignItems: "center",
            justifyContent: "center",
            opacity: pressed ? 0.8 : 1,
          })}
        >
          <Text
            fontSize={20}
            lineHeight="28px"
            fontWeight="700"
            color="primary"
          >
            Começar
          </Text>

          <Text
            position="absolute"
            right={24}
            fontSize={28}
            lineHeight="34px"
            color="primary"
          >
            →
          </Text>
        </Pressable>
      </YStack>
    </YStack>
  );
}
