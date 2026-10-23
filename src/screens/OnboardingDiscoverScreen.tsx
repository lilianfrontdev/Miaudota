import { Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, XStack, YStack, useTheme } from "tamagui";

import { DecorativeShape } from "../components/DecorativeShape";
import { useScreenLayout } from "../hooks/useScreenLayout";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "OnboardingDiscover">;

export function OnboardingDiscoverScreen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const { screenWidth, screenHeight, compact } = useScreenLayout();

  const horizontalPadding = 26;
  const bottomPadding = Math.max(insets.bottom, 16);
  const titleSize = compact ? 30 : 36;
  const titleLineHeight = compact ? "35px" : "42px";

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
        overflow="hidden"
        backgroundColor="background"
      >
        <DecorativeShape
          source={require("../assets/yellow_form.png")}
          style={{
            top: screenHeight * -0.3,
            right: -screenWidth * 0.28,
            width: screenWidth * 0.62,
            height: screenWidth * 1.0,
          }}
        />

        <DecorativeShape
          source={require("../assets/pink_form.png")}
          style={{
            bottom: screenHeight * 0.02,
            left: -screenWidth * 0.48,
            width: screenWidth * 1.3,
            height: screenHeight * 0.8,
          }}
        />

        <YStack
          flex={1}
          paddingTop={insets.top + 8}
          paddingBottom={bottomPadding}
        >
          <YStack paddingHorizontal={16}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar para apresentação"
              onPress={() => navigation.goBack()}
              hitSlop={8}
              style={{
                position: "absolute",
                top: compact ? 12 : 28,
                left: 20,
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 3,
              }}
            >
              <Text fontSize={30} lineHeight="36px" color="color">
                ‹
              </Text>
            </Pressable>
          </YStack>

          <YStack
            paddingHorizontal={horizontalPadding}
            paddingTop={48}
            gap={12}
          >
            <YStack>
              <Text
                fontSize={titleSize}
                lineHeight={titleLineHeight}
                fontWeight="800"
                color="color"
              >
                Cada gato tem{"\n"}uma história.
              </Text>

              <Text
                fontSize={titleSize}
                lineHeight={titleLineHeight}
                fontWeight="800"
                color="yellow"
              >
                A próxima pode{"\n"}ser com você.
              </Text>
            </YStack>

            <Text
              fontSize={compact ? 15 : 17}
              lineHeight={compact ? "21px" : "24px"}
              color="color"
            >
              Conheça os gatinhos e encontre{"\n"} uma conexão especial.
            </Text>
          </YStack>

          <YStack flex={1} minHeight={0} position="relative" overflow="hidden">
            <Image
              source={require("../assets/boo2.png")}
              resizeMode="contain"
              accessible={false}
              pointerEvents="none"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </YStack>
          <YStack
            flexShrink={0}
            paddingHorizontal={horizontalPadding}
            paddingTop={12}
            backgroundColor="background"
            alignItems="center"
            gap={compact ? 8 : 14}
            zIndex={0}
          >
            <XStack
              gap={8}
              justifyContent="center"
              accessible
              accessibilityLabel="Página 2 de 3"
            >
              {[0, 1, 2].map((index) => (
                <YStack
                  key={index}
                  width={index === 1 ? 16 : 10}
                  height={10}
                  borderRadius={5}
                  backgroundColor={index === 1 ? "primary" : "#D1CCC1"}
                />
              ))}
            </XStack>

            <Pressable
              accessibilityRole="button"
              onPress={() => navigation.navigate("OnboardingSupport")}
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
                fontSize={26}
                lineHeight="32px"
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
                minHeight: 40,
                justifyContent: "center",
                paddingHorizontal: 16,
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
    </YStack>
  );
}
