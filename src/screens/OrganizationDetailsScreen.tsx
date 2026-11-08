import { useState } from "react";
import { Image, Pressable, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, XStack, YStack, useTheme } from "tamagui";

import { DecorativeShape } from "../components/DecorativeShape";
import { useScreenLayout } from "../hooks/useScreenLayout";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "OrganizationDetails">;

const tabs = [
  { id: "about", label: "Sobre" },
  { id: "cats", label: "Meus gatos" },
  { id: "events", label: "Eventos" },
] as const;

type Tab = (typeof tabs)[number]["id"];

const organization = {
  name: "ONG Patas do Bem",
  location: "Caxias do Sul - RS",
  description:
    "A ONG Patas do Bem atua no resgate, tratamento e reabilitação de gatos em situação de vulnerabilidade. Nosso objetivo é encontrar lares responsáveis e promover o bem-estar animal.",
  stats: [
    { value: 48, label: "Gatos resgatados" },
    { value: 32, label: "Adotados" },
    { value: 5, label: "Em tratamento" },
  ],
  activities: [
    {
      title: "Resgate",
      description: "Acolhemos gatos em situação de rua e maus-tratos.",
      color: "pink",
      icon: require("../assets/heart_icon.png"),
    },
    {
      title: "Tratamento",
      description:
        "Oferecemos cuidados veterinários, vacinação e vermifugação.",
      color: "green",
      icon: null,
    },
    {
      title: "Adoção responsável",
      description:
        "Conectamos gatos a famílias que oferecem amor, cuidado e um lar seguro.",
      color: "yellow",
      icon: require("../assets/house_icon.png"),
    },
  ],
} as const;

export function OrganizationDetailsScreen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { screenWidth } = useScreenLayout();

  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [following, setFollowing] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const coverHeight = Math.min(screenWidth * 0.56, 245);

  return (
    <YStack flex={1} alignItems="center" backgroundColor="background">
      <YStack flex={1} width={screenWidth} overflow="hidden">
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Math.max(insets.bottom, 16),
          }}
          showsVerticalScrollIndicator={false}
        >
          <YStack
            height={coverHeight}
            position="relative"
            backgroundColor="green"
            overflow="hidden"
          >
            <DecorativeShape
              source={require("../assets/cat_icon1.png")}
              style={{
                width: screenWidth * 0.7,
                height: screenWidth * 0.7,
                top: insets.top + 12,
                left: screenWidth * 0.26,
                zIndex: 1,
              }}
            />

            <DecorativeShape
              source={require("../assets/pink_form.png")}
              style={{
                width: screenWidth * 0.7,
                height: screenWidth * 0.8,
                left: -screenWidth * 0.13,
                bottom: -screenWidth * 0.32,
                transform: [{ rotate: "-46deg" }],
              }}
            />

            <DecorativeShape
              source={require("../assets/yellow_form.png")}
              style={{
                width: screenWidth * 0.96,
                height: screenWidth * 2,
                right: -screenWidth * 0.3,
                bottom: -screenWidth * 0.25,
              }}
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar"
              onPress={() => navigation.goBack()}
              style={({ pressed }) => ({
                position: "absolute",
                top: insets.top + 8,
                left: 12,
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.65 : 1,
              })}
            >
              <Text fontSize={30} lineHeight="36px" color="background">
                ‹
              </Text>
            </Pressable>
          </YStack>

          <YStack
            marginTop={-16}
            borderTopLeftRadius={20}
            borderTopRightRadius={20}
            backgroundColor="background"
          >
            <XStack
              paddingHorizontal={16}
              paddingVertical={10}
              alignItems="center"
              gap={12}
            >
              <YStack
                width={68}
                height={68}
                marginTop={-27}
                flexShrink={0}
                borderRadius={34}
                borderWidth={4}
                borderColor="background"
                backgroundColor="pink"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
              >
                <Image
                  source={require("../assets/cat_icon.png")}
                  resizeMode="contain"
                  accessible={false}
                  style={{ width: 42, height: 42 }}
                />
              </YStack>

              <YStack flex={1} minWidth={0} gap={3} marginTop={20}>
                <Text
                  fontSize={16}
                  lineHeight="20px"
                  fontWeight="800"
                  color="color"
                >
                  {organization.name}
                </Text>
                <Text fontSize={12} lineHeight="16px" color="color">
                  {organization.location}
                </Text>
              </YStack>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                  following ? "Deixar de seguir a ONG" : "Seguir a ONG"
                }
                accessibilityState={{ selected: following }}
                onPress={() => setFollowing((current) => !current)}
                style={({ pressed }) => ({
                  minHeight: 44,
                  paddingHorizontal: 12,
                  flexShrink: 0,
                  borderRadius: 22,
                  borderWidth: 1,
                  borderColor: theme.primary.val,
                  backgroundColor: following
                    ? theme.background.val
                    : theme.primary.val,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.75 : 1,
                })}
              >
                <Text
                  fontSize={12}
                  lineHeight="16px"
                  fontWeight="700"
                  color={following ? "primary" : "background"}
                >
                  {following ? "Seguindo" : "Seguir"}
                </Text>
              </Pressable>
            </XStack>

            <XStack /*accessibilityRole="tablist"*/ paddingHorizontal={12}>
              {tabs.map((tab) => {
                const selected = activeTab === tab.id;

                return (
                  <Pressable
                    key={tab.id}
                    accessibilityRole="tab"
                    accessibilityState={{ selected }}
                    onPress={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1,
                      minHeight: 44,
                      alignItems: "center",
                      justifyContent: "center",
                      borderBottomWidth: 2,
                      borderBottomColor: selected
                        ? theme.primary.val
                        : "transparent",
                    }}
                  >
                    <Text
                      fontSize={13}
                      lineHeight="18px"
                      fontWeight={selected ? "700" : "400"}
                      color={selected ? "primary" : "color"}
                    >
                      {tab.label}
                    </Text>
                  </Pressable>
                );
              })}
            </XStack>
          </YStack>

          <YStack paddingHorizontal={14} paddingTop={14} gap={16}>
            {activeTab === "about" ? (
              <>
                <XStack gap={10}>
                  {organization.stats.map((stat) => (
                    <YStack
                      key={stat.label}
                      flex={1}
                      minWidth={0}
                      borderRadius={12}
                      backgroundColor="surface"
                      padding={10}
                      gap={3}
                    >
                      <Text
                        fontSize={22}
                        lineHeight="26px"
                        fontWeight="800"
                        color="primary"
                      >
                        {stat.value}
                      </Text>
                      <Text fontSize={11} lineHeight="15px" color="color">
                        {stat.label}
                      </Text>
                    </YStack>
                  ))}
                </XStack>

                <YStack
                  padding={16}
                  borderRadius={16}
                  backgroundColor="surface"
                  gap={16}
                >
                  <YStack gap={8}>
                    <Text fontSize={17} fontWeight="800" color="color">
                      Sobre a ONG
                    </Text>
                    <Text fontSize={14} lineHeight="20px" color="color">
                      {organization.description}
                    </Text>
                  </YStack>

                  {organization.activities.map((activity) => (
                    <XStack key={activity.title} alignItems="center" gap={12}>
                      <YStack
                        width={38}
                        height={38}
                        flexShrink={0}
                        borderRadius={19}
                        backgroundColor={activity.color}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {activity.icon ? (
                          <Image
                            source={activity.icon}
                            resizeMode="contain"
                            accessible={false}
                            style={{ width: 22, height: 22 }}
                          />
                        ) : (
                          <Text fontSize={21} lineHeight="26px" color="color">
                            +
                          </Text>
                        )}
                      </YStack>

                      <YStack flex={1} minWidth={0} gap={4}>
                        <Text fontSize={14} fontWeight="700" color="color">
                          {activity.title}
                        </Text>
                        <Text fontSize={12} lineHeight="17px" color="color">
                          {activity.description}
                        </Text>
                      </YStack>
                    </XStack>
                  ))}

                  {showMore && (
                    <Text fontSize={13} lineHeight="19px" color="color">
                      Além dos resgates, a ONG orienta adotantes sobre a
                      adaptação do gato ao novo lar e os cuidados do dia a dia.
                    </Text>
                  )}

                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ expanded: showMore }}
                    onPress={() => setShowMore((current) => !current)}
                    style={{ minHeight: 44, justifyContent: "center" }}
                  >
                    <XStack alignItems="center" justifyContent="space-between">
                      <Text fontSize={13} fontWeight="700" color="primary">
                        {showMore ? "Ver menos" : "Ver mais"}
                      </Text>
                      <Text fontSize={20} color="primary">
                        {showMore ? "⌃" : "›"}
                      </Text>
                    </XStack>
                  </Pressable>
                </YStack>
              </>
            ) : (
              <YStack
                padding={16}
                borderRadius={16}
                backgroundColor="surface"
                gap={6}
              >
                <Text fontSize={17} fontWeight="800" color="color">
                  {activeTab === "cats" ? "Gatos da ONG" : "Eventos"}
                </Text>
                <Text fontSize={14} lineHeight="20px" color="color">
                  {activeTab === "cats"
                    ? "Nenhum gato foi vinculado a este perfil ainda."
                    : "Não há eventos programados no momento."}
                </Text>
              </YStack>
            )}
          </YStack>

          <YStack marginTop="auto" paddingTop={16}>
            <YStack height={150} position="relative" overflow="hidden">
              <DecorativeShape
                source={require("../assets/pink_form.png")}
                style={{
                  left: -56,
                  bottom: -10,
                  width: 200,
                  height: 168,
                }}
              />

              <DecorativeShape
                source={require("../assets/cat1.png")}
                style={{
                  right: 0.80,
                  bottom: 0,
                  width: 120,
                  height: 160,
                }}
              />
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>
    </YStack>
  );
}
