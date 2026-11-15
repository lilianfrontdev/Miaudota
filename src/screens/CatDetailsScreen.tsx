import { useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Share,
  type ImageSourcePropType,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, XStack, YStack, useTheme } from "tamagui";
import { useFavorites } from "../contexts/FavoritesContext";

import { DecorativeShape } from "../components/DecorativeShape";
import { useScreenLayout } from "../hooks/useScreenLayout";
import { cats } from "../data/cats";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "CatDetails">;

const CHIP_BG = "#F2E8DA"; 
const PINK_SOFT = "#F9D6D8";
const GREEN_SOFT = "#DCE1D2";
const HORIZONTAL_PADDING = 22;


function toFeminine(word: string) {
  if (word === "Brincalhão") return "Brincalhona";
  return word.endsWith("o") ? `${word.slice(0, -1)}a` : word;
}

function compatibilityText(list: string[]) {
  if (list.length === 0) return "Prefere ser o único pet da casa";

  const names = list.map((item) => item.toLowerCase());
  const text =
    names.length > 1
      ? `${names.slice(0, -1).join(", ")} e ${names[names.length - 1]}`
      : names[0];

  return `Convive bem com ${text}`;
}

function environmentText(environment: string) {
  if (environment === "Indiferente") return "Se adapta a qualquer ambiente";
  return `Ideal para ${environment.toLowerCase()}`;
}

function CircleButton({
  label,
  onPress,
  children,
}: {
  label: string;
  onPress: () => void;
  children: React.ReactNode;
}) {
  const theme = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => ({
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.background.val,
        alignItems: "center",
        justifyContent: "center",
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {children}
    </Pressable>
  );
}

export function CatDetailsScreen({ navigation, route }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { screenWidth, compact } = useScreenLayout();

  const cat = cats.find((item) => item.id === route.params.catId);

  const [photoIndex, setPhotoIndex] = useState(0);
  const photosRef = useRef<FlatList<ImageSourcePropType>>(null);
  const { isFavorite: checkFavorite, toggleFavorite } = useFavorites();
  const isFavorite = checkFavorite(route.params.catId);

  if (!cat) {
    return (
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        gap={12}
        backgroundColor="background"
      >
        <Text fontSize={18} lineHeight="24px" fontWeight="700" color="color">
          Gatinho não encontrado
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={{ minHeight: 44, justifyContent: "center" }}
        >
          <Text fontSize={16} lineHeight="24px" color="primary">
            Voltar
          </Text>
        </Pressable>
      </YStack>
    );
  }

  const isFemale = cat.sex === "Fêmea";
  const article = isFemale ? "a" : "o";
  const ofArticle = isFemale ? "da" : "do";

  const heroHeight = screenWidth * 0.75;
  const thumbSize = (screenWidth - HORIZONTAL_PADDING * 2 - 8 * 3) / 4;

  function handlePhotosScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setPhotoIndex(Math.max(0, Math.min(index, cat!.photos.length - 1)));
  }

  function goToPhoto(index: number) {
    photosRef.current?.scrollToIndex({ index, animated: true });
    setPhotoIndex(index);
  }

  function handleShare() {
    Share.share({
      message: `Conheça ${article} ${cat!.name}, ${cat!.sex.toLowerCase()} de ${cat!.age} em ${cat!.location.replace(" · ", " - ")}. Venha adotar pelo MiauDota!`,
    }).catch(() => {
      
    });
  }

  function handleAdopt() {
    navigation.navigate("AdoptionForm", { catId: cat!.id });
  }

  return (
    <YStack flex={1} alignItems="center" backgroundColor="background">
      <YStack
        flex={1}
        width={screenWidth}
        backgroundColor="background"
        overflow="hidden"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Math.max(insets.bottom, 16) + 8,
          }}
        >
          {/* Foto principal */}
          <YStack height={heroHeight} position="relative" overflow="hidden">
            <FlatList
              ref={photosRef}
              data={cat.photos}
              keyExtractor={(_, index) => String(index)}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handlePhotosScroll}
              scrollEventThrottle={16}
              style={{ height: heroHeight }}
              getItemLayout={(_, index) => ({
                length: screenWidth,
                offset: screenWidth * index,
                index,
              })}
              renderItem={({ item, index }) => (
                <Image
                  source={item}
                  resizeMode="cover"
                  accessibilityLabel={`Foto ${index + 1} de ${cat.name}`}
                  style={{ width: screenWidth, height: heroHeight }}
                />
              )}
            />

            <DecorativeShape
              source={require("../assets/yellow_form.png")}
              style={{
                top: heroHeight * 0.12,
                right: -screenWidth * 0.14,
                width: screenWidth * 0.3,
                height: screenWidth * 0.3,
              }}
            />

            <DecorativeShape
              source={require("../assets/pink_form.png")}
              style={{
                top: heroHeight * 0.5,
                left: -screenWidth * 0.14,
                width: screenWidth * 0.3,
                height: screenWidth * 0.3,
              }}
            />

            <XStack
              position="absolute"
              right={16}
              bottom={36}
              paddingHorizontal={10}
              paddingVertical={3}
              borderRadius={12}
              backgroundColor="rgba(255, 247, 231, 0.85)"
              accessible
              /*accessibilityLabel={`Foto ${photoIndex + 1} de ${cat.photos.length}`}*/
            >
              <Text
                fontSize={12}
                lineHeight="18px"
                fontWeight="700"
                color="color"
              >
                {photoIndex + 1}/{cat.photos.length}
              </Text>
            </XStack>
          </YStack>

          {/* Conteúdo */}
          <YStack
            flex={1}
            marginTop={-26}
            paddingHorizontal={HORIZONTAL_PADDING}
            paddingTop={10}
            gap={compact ? 12 : 16}
            borderTopLeftRadius={32}
            borderTopRightRadius={32}
            backgroundColor="background"
          >
            <XStack gap={6} justifyContent="center" accessible={false}>
              {cat.photos.map((_, index) => (
                <YStack
                  key={index}
                  width={index === photoIndex ? 16 : 8}
                  height={8}
                  borderRadius={4}
                  backgroundColor={index === photoIndex ? "primary" : "#D1CCC1"}
                />
              ))}
            </XStack>

            <YStack gap={8}>
              <XStack alignItems="center" flexWrap="wrap" gap={8}>
                <Text
                  fontSize={compact ? 32 : 38}
                  lineHeight={compact ? "38px" : "44px"}
                  fontWeight="800"
                  color="color"
                >
                  {cat.name}
                </Text>

                {cat.health.slice(0, 2).map((item) => (
                  <XStack
                    key={item}
                    paddingHorizontal={10}
                    paddingVertical={3}
                    borderRadius={10}
                    backgroundColor="green"
                  >
                    <Text
                      fontSize={11}
                      lineHeight="16px"
                      fontWeight="700"
                      color="color"
                    >
                      {isFemale ? toFeminine(item) : item}
                    </Text>
                  </XStack>
                ))}
              </XStack>

              <XStack alignItems="center" flexWrap="wrap" gap={16}>
                <XStack alignItems="center" gap={6}>
                  <Text
                    fontSize={16}
                    lineHeight="20px"
                    color="color"
                    accessible={false}
                  >
                    {isFemale ? "♀" : "♂"}
                  </Text>
                  <Text fontSize={13} lineHeight="20px" color="color">
                    {cat.sex}
                  </Text>
                </XStack>

                <XStack alignItems="center" gap={6}>
                  <Text
                    fontSize={16}
                    lineHeight="20px"
                    color="color"
                    accessible={false}
                  >
                    ◷
                  </Text>
                  <Text fontSize={13} lineHeight="20px" color="color">
                    {cat.age}
                  </Text>
                </XStack>

                <XStack alignItems="center" gap={6}>
                  <Text
                    fontSize={16}
                    lineHeight="20px"
                    color="color"
                    accessible={false}
                  >
                    ⚲
                  </Text>
                  <Text fontSize={13} lineHeight="20px" color="color">
                    {cat.location.replace(" · ", " - ")}
                  </Text>
                </XStack>
              </XStack>
            </YStack>

            <YStack gap={4}>
              <Text
                fontSize={18}
                lineHeight="26px"
                fontWeight="800"
                color="color"
              >
                Sobre {article} {cat.name}
              </Text>

              <Text fontSize={14} lineHeight="20px" color="color">
                {cat.description}
              </Text>
            </YStack>

            <YStack gap={8}>
              <Text
                fontSize={18}
                lineHeight="26px"
                fontWeight="800"
                color="color"
              >
                Temperamento
              </Text>

              <XStack flexWrap="wrap" gap={8}>
                {cat.personality.slice(0, 3).map((item) => (
                  <YStack
                    key={item}
                    flexGrow={1}
                    paddingHorizontal={14}
                    paddingVertical={9}
                    borderRadius={20}
                    alignItems="center"
                    backgroundColor={CHIP_BG}
                  >
                    <Text
                      fontSize={13}
                      lineHeight="18px"
                      fontWeight="500"
                      color="color"
                    >
                      {isFemale ? toFeminine(item) : item}
                    </Text>
                  </YStack>
                ))}
              </XStack>
            </YStack>

            <XStack gap={12}>
              <XStack
                flex={1}
                flexBasis={0}
                padding={12}
                gap={10}
                alignItems="center"
                borderRadius={18}
                backgroundColor={PINK_SOFT}
              >
                <Text
                  fontSize={28}
                  lineHeight="32px"
                  color="color"
                  accessible={false}
                >
                  ⌂
                </Text>

                <Text
                  flex={1}
                  fontSize={13}
                  lineHeight="17px"
                  fontWeight="500"
                  color="color"
                >
                  {compatibilityText(cat.compatibility)}
                </Text>
              </XStack>

              <XStack
                flex={1}
                flexBasis={0}
                padding={12}
                gap={10}
                alignItems="center"
                borderRadius={18}
                backgroundColor={GREEN_SOFT}
              >
                <Text
                  fontSize={28}
                  lineHeight="32px"
                  color="color"
                  accessible={false}
                >
                  ♡
                </Text>

                <Text
                  flex={1}
                  fontSize={13}
                  lineHeight="17px"
                  fontWeight="500"
                  color="color"
                >
                  {environmentText(cat.environment)}
                </Text>
              </XStack>
            </XStack>

            <Pressable
              accessibilityRole="button"
              onPress={handleAdopt}
              style={({ pressed }) => ({
                height: compact ? 50 : 56,
                flexShrink: 0,
                borderRadius: 30,
                backgroundColor: theme.primary.val,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                fontSize={22}
                lineHeight="28px"
                color="background"
                accessible={false}
              >
                ♡
              </Text>

              <Text
                fontSize={18}
                lineHeight="26px"
                fontWeight="700"
                color="background"
              >
                Quero adotar {article} {cat.name}
              </Text>
            </Pressable>

            <YStack gap={8}>
              <XStack alignItems="center" justifyContent="space-between">
                <Text
                  fontSize={15}
                  lineHeight="22px"
                  fontWeight="800"
                  color="color"
                >
                  Mais fotos {ofArticle} {cat.name}
                </Text>

                <Pressable
                  accessibilityRole="button"
                  onPress={() => Alert.alert("Ver todas as fotos", "Em breve.")}
                  hitSlop={8}
                  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                >
                  <Text
                    fontSize={13}
                    lineHeight="20px"
                    fontWeight="700"
                    color="primary"
                  >
                    Ver todas →
                  </Text>
                </Pressable>
              </XStack>

              <XStack gap={8}>
                {cat.photos.map((photo, index) => {
                  const selected = index === photoIndex;

                  return (
                    <Pressable
                      key={index}
                      accessibilityRole="button"
                      accessibilityLabel={`Ver foto ${index + 1} de ${cat.name}`}
                      accessibilityState={{ selected }}
                      onPress={() => goToPhoto(index)}
                      style={{
                        width: thumbSize,
                        height: thumbSize,
                        borderRadius: 14,
                        borderWidth: 2,
                        borderColor: selected
                          ? theme.primary.val
                          : "transparent",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        source={photo}
                        resizeMode="cover"
                        accessible={false}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Pressable>
                  );
                })}
              </XStack>
            </YStack>
          </YStack>
        </ScrollView>

        <XStack
          position="absolute"
          top={insets.top + 8}
          left={16}
          right={16}
          zIndex={5}
          alignItems="center"
          justifyContent="space-between"
          pointerEvents="box-none"
        >
          <CircleButton label="Voltar" onPress={() => navigation.goBack()}>
            <Text fontSize={28} lineHeight="32px" color="color">
              ‹
            </Text>
          </CircleButton>

          <XStack gap={10}>
            <CircleButton
              label={
                isFavorite
                  ? `Remover ${cat.name} dos favoritos`
                  : `Adicionar ${cat.name} aos favoritos`
              }
              onPress={() => toggleFavorite(cat.id)}
            >
              <Text fontSize={22} lineHeight="26px" color="primary">
                {isFavorite ? "♥" : "♡"}
              </Text>
            </CircleButton>

            <CircleButton label="Compartilhar" onPress={handleShare}>
              <Text fontSize={20} lineHeight="24px" color="color">
                ↗
              </Text>
            </CircleButton>
          </XStack>
        </XStack>
      </YStack>
    </YStack>
  );
}