import { Image, Pressable, useWindowDimensions } from "react-native";
import { Text, useTheme, XStack, YStack } from "tamagui";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { DecorativeShape } from "../components/DecorativeShape";
import type { RootStackParamList } from "../navigation/types";
import { useScreenLayout } from "../hooks/useScreenLayout";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

export function OnboardingScreen({ navigation }: Props) {
  const theme = useTheme();

  const { screenWidth, screenHeight: height, compact } = useScreenLayout();

  const titleSize = compact ? 32 : 40;
  const titleLineHeight = compact ? "36px" : "44px";

  const photoWidth = Math.min(screenWidth * 1.12, height * 0.66);

  return (
    <YStack
      flex={1}
      alignItems="center"
      backgroundColor="background"
      overflow="hidden"
    >
      <YStack
        width={screenWidth}
        height={height}
        position="relative"
        overflow="hidden"
        backgroundColor="background"
      >
        <DecorativeShape
          source={require("../assets/yellow_form.png")}
          style={{
            top: height * 0.04,
            right: -screenWidth * 0.4,
            width: screenWidth * 0.78,
            height: screenWidth * 1.0,
          }}
        />

        <DecorativeShape
          source={require("../assets/blue_form.png")}
          style={{
            top: height * 0.38,
            left: -screenWidth * 0.08,
            width: screenWidth * 1.16,
            height: screenWidth * 1.16 * (1295 / 1214),
          }}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar para boas-vindas"
          onPress={() => navigation.goBack()}
          hitSlop={8}
          style={{
            position: "absolute",
            top: compact ? 12 : 28,
            left: 20,
            width: 44,
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 3,
          }}
        >
          <Text fontSize={30} lineHeight="36px" color="color">
            ‹
          </Text>
        </Pressable>

        <YStack
          position="absolute"
          top={height * 0.1}
          left={28}
          right={28}
          zIndex={1}
        >
          <Text
            fontSize={titleSize}
            lineHeight={titleLineHeight}
            fontWeight="800"
            color="color"
          >
            Pequenas{"\n"}adoções,
          </Text>

          <Text
            fontSize={titleSize}
            lineHeight={titleLineHeight}
            fontWeight="800"
            color="pink"
          >
            grandes{"\n"}mudanças.
          </Text>

          <Text
            marginTop={16}
            fontSize={compact ? 16 : 18}
            lineHeight={compact ? "22px" : "26px"}
            color="color"
          >
            Adote um gato e transforme{"\n"}
            duas vidas: a dele e a sua.
          </Text>
        </YStack>

        <Image
          source={require("../assets/boo.png")}
          resizeMode="contain"
          accessible={false}
          style={{
            position: "absolute",
            bottom: height * 0.215,
            right: -screenWidth * 0.06,
            width: photoWidth,
            height: photoWidth * (1024 / 1536),
            zIndex: 1,
          }}
        />

        <DecorativeShape
          source={require("../assets/pink_form.png")}
          style={{
            bottom: height * 0.3,
            left: -screenWidth * 0.18,
            width: screenWidth * 0.6,
            height: screenWidth * 0.6,
          }}
        />

        <YStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height={height * 0.205}
          paddingHorizontal={26}
          paddingTop={12}
          backgroundColor="background"
          alignItems="center"
          gap={compact ? 8 : 14}
          zIndex={3}
        >
          <XStack gap={8} justifyContent="center">
            {[0, 1, 2].map((index) => (
              <YStack
                key={index}
                width={index === 0 ? 16 : 10}
                height={10}
                borderRadius={5}
                backgroundColor={index === 0 ? "primary" : "#D1CCC1"}
              />
            ))}
          </XStack>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Continuar para escolha de perfil"
            onPress={() => navigation.navigate("RoleSelection")}
            style={({ pressed }) => ({
              width: "100%",
              height: compact ? 48 : 56,
              borderRadius: 30,
              backgroundColor: theme.primary.val,
              justifyContent: "center",
              alignItems: "center",
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Text
              fontSize={20}
              lineHeight="28px"
              fontWeight="700"
              color="background"
            >
              Próximo
            </Text>

            <Text
              position="absolute"
              right={24}
              fontSize={28}
              lineHeight="34px"
              color="background"
            >
              →
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Pular apresentação"
            onPress={() => navigation.navigate("RoleSelection")}
            style={({ pressed }) => ({
              minHeight: 36,
              justifyContent: "center",
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text fontSize={18} lineHeight="24px" color="primary">
              Pular
            </Text>
          </Pressable>
        </YStack>
      </YStack>
    </YStack>
  );
}
