import { Image, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, YStack, useTheme } from "tamagui";
import { useScreenLayout } from "../hooks/useScreenLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "RoleSelection">;

const profiles = [
  {
    id: "adopter",
    title: "Quero adotar",
    description: "Encontre seu novo melhor amigo.",
    image: require("../assets/cat_icon.png"),
  },
  {
    id: "organization",
    title: "Sou ONG ou protetor",
    description: "Cadastre seus gatos e encontre adotantes responsáveis.",
    image: require("../assets/house_icon.png"),
  },
  {
    id: "supporter",
    title: "Quero ajudar",
    description: "Contribua de outras formas com a causa.",
    image: require("../assets/heart_icon.png"),
  },
] as const;

export function RoleScreen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { screenWidth, compact } = useScreenLayout();

  const cardColors = {
    adopter: theme.pink.val,
    organization: theme.green.val,
    supporter: theme.yellow.val,
  };

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

        <Image
          source={require("../assets/cat1.png")}
          resizeMode="contain"
          accessible={false}
          pointerEvents="none"
          style={{
            position: "absolute",
            top: insets.top + 12,
            right: -36,
            width: compact ? 130 : 160,
            height: compact ? 147 : 181,
          }}
        />

        <YStack
          flex={1}
          paddingHorizontal={20}
          paddingTop={insets.top + 56}
          paddingBottom={Math.max(insets.bottom, 16)}
          gap={compact ? 16 : 24}
        >
          <YStack
            minHeight={compact ? 112 : 140}
            justifyContent="center"
            gap={10}
          >
            <Text
              fontSize={compact ? 29 : 34}
              lineHeight={compact ? "36px" : "42px"}
              fontWeight="800"
              color="primary"
            >
              Bem-vindo(a)!
            </Text>

            <Text
              maxWidth={screenWidth * 0.66}
              fontSize={compact ? 17 : 19}
              lineHeight={compact ? "23px" : "27px"}
              color="color"
            >
              Como você quer fazer parte dessa história?
            </Text>
          </YStack>

          <YStack flex={1} justifyContent="center" gap={compact ? 20 : 16}>
            {profiles.map((profile) => (
              <Pressable
                key={profile.id}
                disabled
                accessibilityRole="button"
                accessibilityLabel={`${profile.title}. ${profile.description}`}
                accessibilityState={{ disabled: true }}
                style={{
                  flexGrow: 1,
                  flexBasis: 0,
                  minHeight: 96,
                  maxHeight: 128,
                  borderRadius: 28,
                  backgroundColor: cardColors[profile.id],
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  gap: 12,
                }}
              >
                <Image
                  source={profile.image}
                  resizeMode="contain"
                  accessible={false}
                  style={{
                    width: compact ? 76 : 82,
                    height: compact ? 78 : 96,
                  }}
                />

                <YStack flex={1} gap={6}>
                  <Text
                    fontSize={compact ? 18 : 21}
                    lineHeight={compact ? "24px" : "27px"}
                    fontWeight="800"
                    color="color"
                  >
                    {profile.title}
                  </Text>

                  <Text
                    fontSize={compact ? 14 : 16}
                    lineHeight={compact ? "20px" : "22px"}
                    color="color"
                  >
                    {profile.description}
                  </Text>
                </YStack>

                <Text fontSize={30} lineHeight="36px" color="color">
                  ›
                </Text>
              </Pressable>
            ))}
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  );
}
