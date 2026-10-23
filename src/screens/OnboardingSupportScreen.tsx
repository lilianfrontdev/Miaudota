import { Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, XStack, YStack, useTheme } from "tamagui";

import { DecorativeShape } from "../components/DecorativeShape";
import { useScreenLayout } from "../hooks/useScreenLayout";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "OnboardingSupport">;

export function OnboardingSupportScreen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const { screenWidth, screenHeight, compact } = useScreenLayout();

  const horizontalPadding = 26;
  const titleSize = compact ? 28 : 32;
  const titleLineHeight = compact ? "33px" : "38px";

  return (
    <YStack
      flex={1}
      alignItems="center"
      backgroundColor="background"
      overflow="hidden"
    >
      <YStack
        flex={1}
        width={screenWidth}
        position="relative"
        backgroundColor="background"
        overflow="hidden"
      >
        <DecorativeShape
          source={require("../assets/yellow_form.png")}
          style={{
            top: -screenHeight * 0.1,
            right: -screenWidth * 0.3,
            width: screenWidth * 0.62,
            height: screenWidth * 1.68,
          }}
        />

        <DecorativeShape
          source={require("../assets/blue_form.png")}
          style={{
            top: screenHeight * 0.38,
            left: -screenWidth * 0.08,
            width: screenWidth * 1.16,
            height: screenWidth * 1.16 * (1295 / 1214),
          }}
        />

        <DecorativeShape
          source={require("../assets/pink_form.png")}
          style={{
            bottom: screenHeight * 0.2,
            left: -screenWidth * 0.18,
            width: screenWidth * 0.6,
            height: screenWidth * 1.0,
          }}
        />

        <YStack
          flex={1}
          minHeight={0}
          paddingTop={insets.top + 8}
          paddingBottom={Math.max(insets.bottom, 12)}
          paddingHorizontal={horizontalPadding}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar para apresentação anterior"
            onPress={() => navigation.goBack()}
            hitSlop={8}
            style={({ pressed }) => ({
              width: 44,
              height: 44,
              marginLeft: -8,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.6 : 1,
            })}
          >
            <Text fontSize={30} lineHeight="36px" color="color">
              ‹
            </Text>
          </Pressable>

          <YStack
            flexShrink={0}
            marginTop={compact ? 8 : 16}
            gap={compact ? 10 : 14}
          >
            <YStack>
              <Text
                fontSize={titleSize}
                lineHeight={titleLineHeight}
                fontWeight="800"
                color="color"
              >
                Existem muitas{"\n"}formas de
              </Text>

              <Text
                fontSize={titleSize}
                lineHeight={titleLineHeight}
                fontWeight="800"
                color="pink"
              >
                fazer a diferença.
              </Text>
            </YStack>

            <Text
              fontSize={compact ? 15 : 16}
              lineHeight={compact ? "21px" : "24px"}
              color="color"
            >
              Adote, divulgue ou conecte sua ONG a quem quer ajudar. Cada gesto
              conta!
            </Text>
          </YStack>

          <YStack
            flex={1}
            minHeight={0}
            marginTop={compact ? 18 : 24}
            marginBottom={compact ? 18 : 24}
            alignItems="center"
            justifyContent="center"
          >
            <YStack
              flex={1}
              minHeight={0}
              width="100%"
              maxHeight={screenWidth * 0.88}
              borderRadius={28}
              overflow="hidden"
              position="relative"
            >
              <Image
                source={require("../assets/cats.png")}
                resizeMode="cover"
                accessible
                accessibilityLabel="Dois gatos juntos"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </YStack>
          </YStack>

          <YStack flexShrink={0} alignItems="center" gap={compact ? 10 : 14}>
            <XStack
              gap={8}
              marginBottom={4}
              justifyContent="center"
              accessible
              accessibilityLabel="Página 3 de 3"
            >
              {[0, 1, 2].map((index) => (
                <YStack
                  key={index}
                  width={index === 2 ? 18 : 9}
                  height={9}
                  borderRadius={5}
                  backgroundColor={index === 2 ? "background" : "#d1ccc1"}
                  zIndex={1}
                />
              ))}
            </XStack>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Continuar para escolha de perfil"
              onPress={() => navigation.navigate("RoleSelection")}
              style={({ pressed }) => ({
                width: "100%",
                height: compact ? 50 : 56,
                borderRadius: 30,
                backgroundColor: theme.background.val,
                justifyContent: "center",
                alignItems: "center",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                fontSize={20}
                lineHeight="28px"
                fontWeight="700"
                color="primary"
              >
                Vamos começar
              </Text>

              <Text
                position="absolute"
                right={24}
                fontSize={26}
                lineHeight="32px"
                color="primary"
              >
                →
              </Text>
            </Pressable>
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  );
}
