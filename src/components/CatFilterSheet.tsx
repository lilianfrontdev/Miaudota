import { useEffect, useRef, useState } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text, XStack, YStack, useTheme } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DecorativeShape } from "./DecorativeShape";
import { useScreenLayout } from "../hooks/useScreenLayout";

export type CatFilters = {
  location: string;
  age: string;
  sex: string;
  health: string;
  personality: string[];
  environment: string;
  compatibility: string[];
};

type SingleFilterKey = "age" | "sex" | "health" | "environment";
type MultiFilterKey = "personality" | "compatibility";

type FilterSection =
  | {
      key: SingleFilterKey;
      title: string;
      type: "single";
      options: string[];
      icon: string;
    }
  | {
      key: MultiFilterKey;
      title: string;
      type: "multiple";
      options: string[];
      icon: string;
    };

type CatFilterSheetProps = {
  visible: boolean;
  initialFilters: CatFilters;
  locationOptions?: string[];
  onClose: () => void;
  onApply: (filters: CatFilters) => void;
};

const CHIP_BG = "#F2E8DA"; // chip não selecionado (sem borda, como no design)
const FIELD_BORDER = "#E9DFD3";

export const ALL_LOCATIONS = "Todas as cidades";

export const EMPTY_FILTERS: CatFilters = {
  location: ALL_LOCATIONS,
  age: "Todos",
  sex: "Todos",
  health: "Todos",
  personality: [],
  environment: "Indiferente",
  compatibility: ["Indiferente"],
};

const FILTER_SECTIONS: FilterSection[] = [
  {
    key: "age",
    title: "Tipo de gato",
    type: "single",
    icon: "♧",
    options: ["Todos", "Filhotes", "Jovens", "Adultos"],
  },
  {
    key: "sex",
    title: "Sexo",
    type: "single",
    icon: "⚥",
    options: ["Todos", "Fêmea", "Macho"],
  },
  {
    key: "health",
    title: "Situação de saúde",
    type: "single",
    icon: "♡",
    options: ["Todos", "Castrado", "Vacinado", "Vermifugado"],
  },
  {
    key: "personality",
    title: "Personalidade",
    type: "multiple",
    icon: "☺",
    options: [
      "Carinhoso",
      "Brincalhão",
      "Sociável",
      "Calmo",
      "Independente",
      "Se dá bem com outros gatos",
    ],
  },
  {
    key: "environment",
    title: "Ambiente ideal",
    type: "single",
    icon: "⌂",
    options: ["Apartamento", "Casa com pátio", "Indiferente"],
  },
  {
    key: "compatibility",
    title: "Convive bem com",
    type: "multiple",
    icon: "☻",
    options: ["Outros gatos", "Cachorros", "Crianças", "Indiferente"],
  },
];

// "Caxias do Sul · RS" -> "Caxias do Sul - RS" (formato do design)
function formatLocation(location: string) {
  return location.replace(" · ", " - ");
}

function SectionTitle({
  icon,
  title,
  tight,
}: {
  icon: string;
  title: string;
  tight: boolean;
}) {
  return (
    <XStack alignItems="center" gap={8}>
      <Text
        width={20}
        fontSize={tight ? 16 : 18}
        lineHeight="20px"
        textAlign="center"
        color="color"
        accessible={false}
      >
        {icon}
      </Text>

      <Text
        fontSize={tight ? 14 : 15}
        lineHeight="20px"
        fontWeight="800"
        color="color"
      >
        {title}
      </Text>
    </XStack>
  );
}

function FilterChip({
  label,
  selected,
  tight,
  onPress,
}: {
  label: string;
  selected: boolean;
  tight: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
    >
      <YStack
        paddingHorizontal={tight ? 12 : 14}
        paddingVertical={tight ? 5 : 6}
        borderRadius={20}
        alignItems="center"
        justifyContent="center"
        backgroundColor={selected ? "primary" : CHIP_BG}
      >
        <Text
          fontSize={12}
          lineHeight="16px"
          color={selected ? "#FFFFFF" : "color"}
          fontWeight={selected ? "700" : "500"}
        >
          {label}
        </Text>
      </YStack>
    </Pressable>
  );
}

export default function CatFilterSheet({
  visible,
  initialFilters,
  locationOptions = [],
  onClose,
  onApply,
}: CatFilterSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { screenWidth } = useScreenLayout();

  const screenHeight = Dimensions.get("window").height;
  const tight = screenHeight < 720;

  const [draftFilters, setDraftFilters] = useState<CatFilters>(initialFilters);
  const [pickerOpen, setPickerOpen] = useState(false);

  // Só ativa o scroll se o conteúdo realmente não couber (telas muito pequenas)
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const canScroll = contentHeight > containerHeight + 1;

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (!visible) {
      return;
    }

    setDraftFilters({
      ...initialFilters,
      personality: [...initialFilters.personality],
      compatibility: [...initialFilters.compatibility],
    });
    setPickerOpen(false);

    sheetTranslateY.setValue(screenHeight);
    backdropOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateY, {
        toValue: 0,
        duration: 280,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, initialFilters, screenHeight, backdropOpacity, sheetTranslateY]);

  function closeSheet() {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateY, {
        toValue: screenHeight,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        onClose();
      }
    });
  }

  // Botão voltar do Android: fecha o seletor de cidade primeiro, depois o sheet
  useEffect(() => {
    if (!visible) {
      return;
    }

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (pickerOpen) {
          setPickerOpen(false);
        } else {
          closeSheet();
        }
        return true;
      },
    );

    return () => subscription.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, pickerOpen]);

  function clearFilters() {
    setDraftFilters({
      ...EMPTY_FILTERS,
      personality: [],
      compatibility: ["Indiferente"],
    });
  }

  function selectLocation(location: string) {
    setDraftFilters((current) => ({ ...current, location }));
    setPickerOpen(false);
  }

  function selectSingle(key: SingleFilterKey, option: string) {
    setDraftFilters((current) => ({ ...current, [key]: option }));
  }

  function toggleMultiple(key: MultiFilterKey, option: string) {
    setDraftFilters((current) => {
      const selected = current[key];

      if (option === "Indiferente") {
        return { ...current, [key]: ["Indiferente"] };
      }

      const withoutIndifferent = selected.filter(
        (item) => item !== "Indiferente",
      );

      const updated = withoutIndifferent.includes(option)
        ? withoutIndifferent.filter((item) => item !== option)
        : [...withoutIndifferent, option];

      // Se desmarcar tudo em "Convive bem com", volta para Indiferente
      if (key === "compatibility" && updated.length === 0) {
        return { ...current, [key]: ["Indiferente"] };
      }

      return { ...current, [key]: updated };
    });
  }

  function isSelected(section: FilterSection, option: string) {
    if (section.type === "single") {
      return draftFilters[section.key] === option;
    }

    return draftFilters[section.key].includes(option);
  }

  if (!visible) {
    return null;
  }

  const horizontalPadding = screenWidth < 360 ? 16 : 22;
  const allLocations = [ALL_LOCATIONS, ...locationOptions];

  return (
    // Camada por cima da tela, na mesma árvore do app (sem Modal),
    // para herdar a mesma fonte e tema das outras telas.
    <View style={[StyleSheet.absoluteFill, { zIndex: 100, elevation: 100 }]}>
      <YStack flex={1} justifyContent="flex-end">
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0, 0, 0, 0.48)",
              opacity: backdropOpacity,
            },
          ]}
        />

        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={closeSheet}
          accessibilityRole="button"
          accessibilityLabel="Fechar filtros"
        />

        <Animated.View
          style={{
            height: "92%",
            transform: [{ translateY: sheetTranslateY }],
          }}
        >
          <YStack
            flex={1}
            backgroundColor="background"
            borderTopLeftRadius={28}
            borderTopRightRadius={28}
            overflow="hidden"
            position="relative"
          >
            <YStack
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              pointerEvents="none"
            >

              <DecorativeShape
                source={require("../assets/pink_form.png")}
                style={{
                  top: 110,
                  right: -screenWidth * 0.2,
                  width: screenWidth * 0.55,
                  height: screenWidth * 0.62,
                  transform: [{ rotate: "180deg" }],
                }}
              />

              <DecorativeShape
                source={require("../assets/cat1.png")}
                style={{
                  top: 140,
                  right: -14,
                  width: screenWidth * 0.3,
                  height: screenWidth * 0.38,
                }}
              />

              <DecorativeShape
                source={require("../assets/pink_form.png")}
                style={{
                  bottom: -45,
                  left: -60,
                  width: 150,
                  height: 130,
                }}
              />

              <DecorativeShape
                source={require("../assets/green_form.png")}
                style={{
                  bottom: -60,
                  right: -70,
                  width: 190,
                  height: 170,
                }}
              />
            </YStack>

            <YStack
              alignSelf="center"
              width={52}
              height={5}
              borderRadius={6}
              backgroundColor="#D8D1C8"
              marginTop={8}
              marginBottom={2}
            />

            <XStack
              paddingHorizontal={horizontalPadding}
              paddingTop={2}
              paddingBottom={tight ? 4 : 8}
              alignItems="center"
              justifyContent="space-between"
              zIndex={1}
            >
              <Text
                fontSize={tight || screenWidth < 360 ? 26 : 30}
                lineHeight={tight || screenWidth < 360 ? "32px" : "36px"}
                fontWeight="800"
                color="color"
              >
                Filtros
              </Text>

              <Pressable
                onPress={clearFilters}
                accessibilityRole="button"
                hitSlop={8}
                style={{ padding: 6 }}
              >
                <Text fontSize={14} fontWeight="700" color="primary">
                  Limpar tudo
                </Text>
              </Pressable>
            </XStack>

            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
              bounces={false}
              overScrollMode="never"
              scrollEnabled={canScroll}
              onLayout={(event) =>
                setContainerHeight(event.nativeEvent.layout.height)
              }
              onContentSizeChange={(_, height) => setContentHeight(height)}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
                paddingHorizontal: horizontalPadding,
                paddingTop: 4,
                paddingBottom: 8,
                gap: tight ? 8 : 10,
              }}
            >

              <YStack gap={tight ? 4 : 6} zIndex={1}>
                <SectionTitle icon="⚲" title="Localização" tight={tight} />

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Selecionar localização"
                  onPress={() => setPickerOpen(true)}
                  style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
                >
                  <XStack
                    minHeight={tight ? 38 : 42}
                    paddingHorizontal={12}
                    alignItems="center"
                    gap={10}
                    borderWidth={1}
                    borderColor={FIELD_BORDER}
                    borderRadius={14}
                    backgroundColor="#FFFBF3"
                  >
                    <Text
                      fontSize={20}
                      lineHeight="24px"
                      color="color"
                      accessible={false}
                    >
                      ⌖
                    </Text>

                    <Text flex={1} fontSize={14} color="color">
                      {formatLocation(draftFilters.location)}
                    </Text>

                    <Text
                      fontSize={24}
                      lineHeight="28px"
                      color="color"
                      accessible={false}
                    >
                      ›
                    </Text>
                  </XStack>
                </Pressable>
              </YStack>

              {FILTER_SECTIONS.map((section) => (
                <YStack key={section.key} gap={tight ? 4 : 6} zIndex={1}>
                  <SectionTitle
                    icon={section.icon}
                    title={section.title}
                    tight={tight}
                  />

                  <XStack flexWrap="wrap" gap={tight ? 6 : 8}>
                    {section.options.map((option) => (
                      <FilterChip
                        key={option}
                        label={option}
                        tight={tight}
                        selected={isSelected(section, option)}
                        onPress={() => {
                          if (section.type === "single") {
                            selectSingle(section.key, option);
                          } else {
                            toggleMultiple(section.key, option);
                          }
                        }}
                      />
                    ))}
                  </XStack>
                </YStack>
              ))}
            </ScrollView>

            <YStack
              paddingHorizontal={20}
              paddingTop={6}
              paddingBottom={Math.max(insets.bottom, 12)}
              zIndex={2}
            >
              <Pressable
                onPress={() => onApply(draftFilters)}
                accessibilityRole="button"
                accessibilityLabel="Aplicar filtros"
                style={({ pressed }) => ({
                  minHeight: tight ? 48 : 52,
                  borderRadius: 30,
                  backgroundColor: theme.primary.val,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text fontSize={17} fontWeight="700" color="background">
                  Aplicar filtros
                </Text>

                <Text
                  position="absolute"
                  right={22}
                  fontSize={26}
                  lineHeight="32px"
                  color="background"
                  accessible={false}
                >
                  →
                </Text>
              </Pressable>
            </YStack>
   
            {pickerOpen ? (
              <View
                style={{
                  ...StyleSheet.absoluteFill,
                  zIndex: 20,
                  elevation: 20,
                  justifyContent: "center",
                  paddingHorizontal: horizontalPadding,
                }}
              >
                <Pressable
                  style={{
                    ...StyleSheet.absoluteFill,
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                  }}
                  onPress={() => setPickerOpen(false)}
                  accessibilityRole="button"
                  accessibilityLabel="Fechar seleção de cidade"
                />

                <View
                  style={{
                    backgroundColor: theme.background.val,
                    borderRadius: 22,
                    paddingVertical: 14,
                    paddingHorizontal: 8,
                    maxHeight: screenHeight * 0.5,
                  }}
                >
                  <Text
                    paddingHorizontal={12}
                    paddingBottom={8}
                    fontSize={17}
                    lineHeight="24px"
                    fontWeight="800"
                    color="color"
                  >
                    Escolha a cidade
                  </Text>

                  <ScrollView showsVerticalScrollIndicator={false}>
                    {allLocations.map((option) => {
                      const selected = draftFilters.location === option;

                      return (
                        <Pressable
                          key={option}
                          onPress={() => selectLocation(option)}
                          accessibilityRole="button"
                          accessibilityState={{ selected }}
                          style={({ pressed }) => ({
                            minHeight: 46,
                            paddingHorizontal: 12,
                            marginVertical: 2,
                            borderRadius: 14,
                            flexDirection: "row",
                            alignItems: "center",
                            backgroundColor: selected ? CHIP_BG : "transparent",
                            opacity: pressed ? 0.7 : 1,
                          })}
                        >
                          <Text
                            flex={1}
                            fontSize={15}
                            fontWeight={selected ? "700" : "400"}
                            color="color"
                          >
                            {formatLocation(option)}
                          </Text>

                          {selected ? (
                            <Text
                              fontSize={18}
                              fontWeight="700"
                              color="primary"
                              accessible={false}
                            >
                              ✓
                            </Text>
                          ) : null}
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            ) : null}
          </YStack>
        </Animated.View>
      </YStack>
    </View>
  );
}