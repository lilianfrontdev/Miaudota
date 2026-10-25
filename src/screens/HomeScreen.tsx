import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  TextInput,
  type ImageSourcePropType,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, XStack, YStack, useTheme } from "tamagui";

import { DecorativeShape } from "../components/DecorativeShape";
import { useScreenLayout } from "../hooks/useScreenLayout";

type Cat = {
  id: string;
  name: string;
  sex: string;
  age: string;
  location: string;
  image: ImageSourcePropType;
};

const cats: Cat[] = [
  {
    id: "1",
    name: "Luna",
    sex: "Fêmea",
    age: "4 meses",
    location: "Caxias do Sul · RS",
    image: require("../assets/boo.png"),
  },
  {
    id: "2",
    name: "Nino",
    sex: "Macho",
    age: "1 ano",
    location: "Caxias do Sul · RS",
    image: require("../assets/boo2.png"),
  },
  {
    id: "3",
    name: "Amora",
    sex: "Fêmea",
    age: "2 anos",
    location: "Farroupilha · RS",
    image: require("../assets/boo.png"),
  },
  {
    id: "4",
    name: "Simba",
    sex: "Macho",
    age: "8 meses",
    location: "Caxias do Sul · RS",
    image: require("../assets/boo2.png"),
  },
  {
    id: "5",
    name: "Mel",
    sex: "Fêmea",
    age: "1 ano",
    location: "Bento Gonçalves · RS",
    image: require("../assets/boo.png"),
  },
  {
    id: "6",
    name: "Theo",
    sex: "Macho",
    age: "6 meses",
    location: "Caxias do Sul · RS",
    image: require("../assets/boo2.png"),
  },
];

export function HomeScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { screenWidth } = useScreenLayout();

  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"home" | "favorites">("home");

  const cardWidth = (screenWidth - 48 - 12) / 2;

  const filteredCats = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("pt-BR");

    return cats.filter((cat) => {
      const matchesSearch = [cat.name, cat.location, cat.sex, cat.age]
        .join(" ")
        .toLocaleLowerCase("pt-BR")
        .includes(query);

      const matchesTab = activeTab === "home" || favorites.includes(cat.id);

      return matchesSearch && matchesTab;
    });
  }, [search, favorites, activeTab]);

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id],
    );
  }

  return (
    <YStack flex={1} alignItems="center" backgroundColor="background">
      <YStack
        flex={1}
        width={screenWidth}
        backgroundColor="background"
        overflow="hidden"
      >
        <FlatList
          data={filteredCats}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: insets.top + 16,
            paddingHorizontal: 24,
            paddingBottom: 20,
          }}
          columnWrapperStyle={{
            gap: 12,
          }}
          ListHeaderComponent={
            <YStack>
              <YStack position="relative" paddingTop={8} paddingBottom={22}>
                <DecorativeShape
                  source={require("../assets/cat1.png")}
                  style={{
                    top: 0,
                    right: -44,
                    width: screenWidth * 0.32,
                    height: screenWidth * 0.36,
                  }}
                />

                <Text
                  fontSize={28}
                  lineHeight="34px"
                  fontWeight="800"
                  color="color"
                >
                  Olá, Lilian!
                </Text>

                <Text
                  maxWidth="70%"
                  marginTop={4}
                  fontSize={14}
                  lineHeight="20px"
                  color="color"
                >
                  Que tal encontrar seu{"\n"}
                  novo melhor amigo hoje?
                </Text>
              </YStack>

              <XStack
                height={48}
                paddingHorizontal={14}
                borderRadius={16}
                backgroundColor="surface"
                borderWidth={1}
                borderColor="#D1D1D1"
                alignItems="center"
                gap={8}
              >
                <Text
                  fontSize={22}
                  lineHeight="28px"
                  color="primary"
                  accessible={false}
                >
                  ⌕
                </Text>

                <TextInput
                  accessibilityLabel="Buscar gatos por nome ou localização"
                  placeholder="Buscar gatos, localização..."
                  placeholderTextColor={theme.color.val}
                  value={search}
                  onChangeText={setSearch}
                  autoCorrect={false}
                  returnKeyType="search"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    height: 46,
                    fontSize: 14,
                    color: theme.color.val,
                  }}
                />

                {search ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Limpar busca"
                    onPress={() => setSearch("")}
                    hitSlop={8}
                    style={{
                      width: 32,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text fontSize={22} lineHeight="28px" color="primary">
                      ×
                    </Text>
                  </Pressable>
                ) : null}
              </XStack>

              <XStack
                marginTop={16}
                minHeight={148}
                borderRadius={24}
                backgroundColor="pink"
                overflow="hidden"
                alignItems="center"
              >
                <Image
                  source={require("../assets/chiquinho.png")}
                  resizeMode="contain"
                  accessible={false}
                  style={{
                    width: "43%",
                    height: 148,
                  }}
                />

                <YStack
                  flex={1}
                  paddingVertical={18}
                  paddingRight={16}
                  gap={10}
                >
                  <Text
                    fontSize={21}
                    lineHeight="25px"
                    fontWeight="800"
                    color="color"
                  >
                    Eles só precisam{"\n"}
                    de uma chance.
                  </Text>

                  <Pressable
                    accessibilityRole="button"
                    onPress={() => {
                      setSearch("");
                      setActiveTab("home");
                    }}
                    style={({ pressed }) => ({
                      minHeight: 40,
                      paddingHorizontal: 12,
                      borderRadius: 24,
                      backgroundColor: theme.primary.val,
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: pressed ? 0.8 : 1,
                    })}
                  >
                    <Text
                      fontSize={12}
                      lineHeight="18px"
                      fontWeight="700"
                      color="background"
                    >
                      Ver gatos disponíveis →
                    </Text>
                  </Pressable>
                </YStack>
              </XStack>

              <XStack
                marginTop={22}
                marginBottom={14}
                alignItems="center"
                justifyContent="space-between"
                gap={8}
              >
                <Text
                  fontSize={19}
                  lineHeight="26px"
                  fontWeight="800"
                  color="color"
                >
                  {activeTab === "favorites"
                    ? "Seus favoritos"
                    : "Gatos em destaque"}
                </Text>

                <Text fontSize={12} lineHeight="18px" color="primary">
                  {filteredCats.length} disponíveis
                </Text>
              </XStack>
            </YStack>
          }
          ListEmptyComponent={
            <YStack paddingVertical={36} alignItems="center" gap={8}>
              <Text
                fontSize={18}
                lineHeight="24px"
                fontWeight="700"
                color="color"
              >
                Nenhum gatinho por aqui
              </Text>

              <Text
                fontSize={14}
                lineHeight="21px"
                textAlign="center"
                color="color"
              >
                {activeTab === "favorites"
                  ? "Toque no coração dos cards para salvar seus favoritos."
                  : "Experimente buscar outro nome ou cidade."}
              </Text>
            </YStack>
          }
          renderItem={({ item }) => {
            const isFavorite = favorites.includes(item.id);

            return (
              <YStack
                width={cardWidth}
                marginBottom={14}
                borderRadius={18}
                backgroundColor="surface"
                overflow="hidden"
              >
                <YStack
                  height={cardWidth * 0.85}
                  position="relative"
                  backgroundColor="background"
                >
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    accessibilityLabel={`Foto de ${item.name}`}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                      isFavorite
                        ? `Remover ${item.name} dos favoritos`
                        : `Adicionar ${item.name} aos favoritos`
                    }
                    accessibilityState={{ selected: isFavorite }}
                    onPress={() => toggleFavorite(item.id)}
                    style={({ pressed }) => ({
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: theme.background.val,
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: pressed ? 0.7 : 1,
                    })}
                  >
                    <Text fontSize={25} lineHeight="30px" color="primary">
                      {isFavorite ? "♥" : "♡"}
                    </Text>
                  </Pressable>
                </YStack>

                <YStack padding={10} gap={4}>
                  <Text
                    fontSize={17}
                    lineHeight="22px"
                    fontWeight="800"
                    color="color"
                  >
                    {item.name}
                  </Text>

                  <Text fontSize={12} lineHeight="17px" color="color">
                    {item.sex} · {item.age}
                  </Text>

                  <Text fontSize={11} lineHeight="16px" color="color">
                    {item.location}
                  </Text>

                  <XStack
                    marginTop={3}
                    alignSelf="flex-start"
                    paddingHorizontal={8}
                    paddingVertical={3}
                    borderRadius={10}
                    backgroundColor="green"
                  >
                    <Text
                      fontSize={10}
                      lineHeight="15px"
                      fontWeight="700"
                      color="color"
                    >
                      Disponível
                    </Text>
                  </XStack>
                </YStack>
              </YStack>
            );
          }}
        />

        <XStack
          paddingTop={8}
          paddingBottom={Math.max(insets.bottom, 10)}
          paddingHorizontal={8}
          borderTopWidth={1}
          borderColor="#D1D1D1"
          backgroundColor="surface"
          justifyContent="space-around"
        >
          {[
            { id: "home", label: "Início", icon: "⌂" },
            { id: "search", label: "Buscar", icon: "⌕" },
            { id: "favorites", label: "Favoritos", icon: "♡" },
            { id: "messages", label: "Mensagens", icon: "☏" },
            { id: "profile", label: "Perfil", icon: "○" },
          ].map((tab) => {
            const selected = activeTab === tab.id;
            const enabled = tab.id === "home" || tab.id === "favorites";

            return (
              <Pressable
                key={tab.id}
                accessibilityRole="button"
                accessibilityLabel={
                  enabled ? tab.label : `${tab.label}, em breve`
                }
                accessibilityState={{
                  selected,
                  disabled: !enabled,
                }}
                disabled={!enabled}
                onPress={() => {
                  if (tab.id === "home" || tab.id === "favorites") {
                    setActiveTab(tab.id);
                  }
                }}
                style={({ pressed }) => ({
                  flex: 1,
                  minHeight: 48,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: !enabled ? 0.4 : pressed ? 0.7 : 1,
                })}
              >
                <Text
                  fontSize={24}
                  lineHeight="28px"
                  color={selected ? "primary" : "color"}
                >
                  {tab.icon}
                </Text>

                <Text
                  fontSize={10}
                  lineHeight="16px"
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
    </YStack>
  );
}
