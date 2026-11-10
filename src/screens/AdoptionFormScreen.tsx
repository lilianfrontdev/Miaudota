import { useRef, useState, type ComponentRef, type ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  type TextInputProps,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, XStack, YStack, useTheme } from "tamagui";

import { DecorativeShape } from "../components/DecorativeShape";
import { useScreenLayout } from "../hooks/useScreenLayout";
import { cats } from "../data/cats";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "AdoptionForm">;

type FormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  hadCats: string;
  interest: string;
  housing: string;
  windowScreens: string;
  children: string;
  otherPets: string[];
  hoursAlone: string;
  familyAgrees: string;
  acceptTruth: boolean;
  acceptTerm: boolean;
};

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  city: "",
  hadCats: "",
  interest: "",
  housing: "",
  windowScreens: "",
  children: "",
  otherPets: [],
  hoursAlone: "",
  familyAgrees: "",
  acceptTruth: false,
  acceptTerm: false,
};

const CHIP_BG = "#F2E8DA";
const CARD_BG = "#FFFBF3";
const FIELD_BORDER = "#E9DFD3";
const PLACEHOLDER = "#9A8F86";
const MUTED = "#8A7B70";
const STEP_LINE = "#D9D0C4";
const INTEREST_LIMIT = 300;

const STEPS = [
  {
    label: "Sobre você",
    title: "Sobre você",
    subtitle: "Essas informações nos ajudam a te conhecer melhor.",
  },
  {
    label: "Seu estilo de vida",
    title: "Seu estilo de vida",
    subtitle: "Conte como é a sua rotina e o lar que o gatinho vai ganhar.",
  },
  {
    label: "Confirmação",
    title: "Confirmação",
    subtitle: "Revise suas respostas antes de enviar.",
  },
];

const CITIES = [
  "Bento Gonçalves",
  "Caxias do Sul",
  "Farroupilha",
  "Flores da Cunha",
  "Garibaldi",
  "Outra cidade",
];

const HAD_CATS_OPTIONS = [
  "Sim, tenho atualmente",
  "Já tive, mas não tenho mais",
  "Nunca tive",
];

const HOUSING_OPTIONS = ["Apartamento", "Casa com pátio", "Casa sem pátio"];
const WINDOW_OPTIONS = ["Sim", "Não", "Vou instalar"];
const YES_NO_OPTIONS = ["Sim", "Não"];
const OTHER_PETS_OPTIONS = ["Gatos", "Cachorros", "Outros", "Nenhum"];
const HOURS_ALONE_OPTIONS = ["Menos de 4h", "4 a 8h", "Mais de 8h"];
const FAMILY_OPTIONS = ["Sim", "Ainda vou conversar"];

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function FormField({
  icon,
  label,
  children,
}: {
  icon: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <XStack gap={10} alignItems="flex-start">
      <Text
        width={24}
        fontSize={18}
        lineHeight="20px"
        textAlign="center"
        color="color"
        accessible={false}
      >
        {icon}
      </Text>

      <YStack flex={1} minWidth={0} gap={4}>
        <Text fontSize={13} lineHeight="18px" fontWeight="700" color="color">
          {label}
        </Text>

        {children}
      </YStack>
    </XStack>
  );
}

function FormInput(props: TextInputProps) {
  const theme = useTheme();

  return (
    <XStack
      height={40}
      paddingHorizontal={12}
      alignItems="center"
      borderWidth={1}
      borderColor={FIELD_BORDER}
      borderRadius={12}
      backgroundColor="surface"
    >
      <TextInput
        placeholderTextColor={PLACEHOLDER}
        {...props}
        style={[
          {
            flex: 1,
            minWidth: 0,
            height: 40,
            fontSize: 14,
            color: theme.color.val,
          },
          props.style,
        ]}
      />
    </XStack>
  );
}

function SelectField({
  label,
  placeholder,
  value,
  options,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const theme = useTheme();

  return (
    <YStack
      height={40}
      borderWidth={1}
      borderColor={FIELD_BORDER}
      borderRadius={12}
      backgroundColor="surface"
      justifyContent="center"
      overflow="hidden"
    >
      <Picker
        accessibilityLabel={label}
        selectedValue={value}
        onValueChange={(item) => onChange(String(item))}
        mode="dropdown"
        dropdownIconColor={theme.color.val}
        style={{
          width: "100%",
          height: 42,
          color: value ? theme.color.val : PLACEHOLDER,
          backgroundColor: theme.surface.val,
          borderWidth: 0,
        }}
      >
        <Picker.Item label={placeholder} value="" enabled={false} />

        {options.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
    </YStack>
  );
}

function ChipGroup({
  options,
  isSelected,
  onSelect,
}: {
  options: string[];
  isSelected: (option: string) => boolean;
  onSelect: (option: string) => void;
}) {
  return (
    <XStack flexWrap="wrap" gap={8}>
      {options.map((option) => {
        const selected = isSelected(option);

        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            // accessibilityRole="button"
            accessibilityState={{ selected }}
            style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
          >
            <YStack
              paddingHorizontal={14}
              paddingVertical={7}
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
                {option}
              </Text>
            </YStack>
          </Pressable>
        );
      })}
    </XStack>
  );
}

function StepIndicator({ step }: { step: number }) {
  return (
    <XStack>
      {STEPS.map((item, index) => {
        const number = index + 1;
        const active = number === step;
        const done = number < step;

        return (
          <YStack
            key={item.label}
            flex={1}
            alignItems="center"
            gap={4}
            position="relative"
            accessible
            /*accessibilityLabel={`Etapa ${number} de ${STEPS.length}: ${item.label}`}*/
          >
            {index < STEPS.length - 1 ? (
              <YStack
                position="absolute"
                top={16}
                left="50%"
                width="100%"
                height={2}
                backgroundColor={done ? "primary" : STEP_LINE}
              />
            ) : null}

            <YStack
              width={34}
              height={34}
              borderRadius={17}
              alignItems="center"
              justifyContent="center"
              backgroundColor={active || done ? "primary" : CHIP_BG}
              zIndex={1}
            >
              <Text
                fontSize={15}
                lineHeight="20px"
                fontWeight="700"
                color={active || done ? "#FFFFFF" : "color"}
              >
                {done ? "✓" : number}
              </Text>
            </YStack>

            <Text
              fontSize={11}
              lineHeight="15px"
              textAlign="center"
              fontWeight={active ? "700" : "400"}
              color={active ? "primary" : "color"}
            >
              {item.label}
            </Text>
          </YStack>
        );
      })}
    </XStack>
  );
}

function Checkbox({
  checked,
  label,
  onToggle,
}: {
  checked: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <Pressable
      // accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={onToggle}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <YStack
        width={24}
        height={24}
        borderRadius={7}
        borderWidth={1.5}
        borderColor="primary"
        alignItems="center"
        justifyContent="center"
        backgroundColor={checked ? "primary" : "surface"}
      >
        {checked ? (
          <Text
            fontSize={15}
            lineHeight="20px"
            fontWeight="700"
            color="#FFFFFF"
            accessible={false}
          >
            ✓
          </Text>
        ) : null}
      </YStack>

      <Text flex={1} fontSize={13} lineHeight="19px" color="color">
        {label}
      </Text>
    </Pressable>
  );
}

function SummaryBlock({
  title,
  onEdit,
  rows,
}: {
  title: string;
  onEdit: () => void;
  rows: { label: string; value: string }[];
}) {
  return (
    <YStack gap={6}>
      <XStack alignItems="center" justifyContent="space-between">
        <Text fontSize={15} lineHeight="22px" fontWeight="800" color="color">
          {title}
        </Text>

        <Pressable
          // accessibilityRole="button"
          /*accessibilityLabel={`Editar ${title}`}*/
          onPress={onEdit}
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <Text fontSize={13} lineHeight="20px" fontWeight="700" color="primary">
            Editar
          </Text>
        </Pressable>
      </XStack>

      <YStack
        padding={12}
        gap={6}
        borderRadius={14}
        backgroundColor="background"
      >
        {rows.map((row) => (
          <XStack key={row.label} gap={12} justifyContent="space-between">
            <Text fontSize={13} lineHeight="18px" color={MUTED}>
              {row.label}
            </Text>

            <Text
              flex={1}
              fontSize={13}
              lineHeight="18px"
              fontWeight="600"
              textAlign="right"
              color="color"
            >
              {row.value || "—"}
            </Text>
          </XStack>
        ))}
      </YStack>
    </YStack>
  );
}

export function AdoptionFormScreen({ navigation, route }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { screenWidth, compact } = useScreenLayout();

  const cat = cats.find((item) => item.id === route.params.catId);
  const catName = cat?.name ?? "gatinho";

  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function toggleOtherPet(option: string) {
    setForm((current) => {
      let updated: string[];

      if (option === "Nenhum") {
        updated = current.otherPets.includes("Nenhum") ? [] : ["Nenhum"];
      } else {
        const withoutNone = current.otherPets.filter((item) => item !== "Nenhum");

        updated = withoutNone.includes(option)
          ? withoutNone.filter((item) => item !== option)
          : [...withoutNone, option];
      }

      return { ...current, otherPets: updated };
    });
    setError("");
  }

  function goToStep(next: number) {
    setStep(next);
    setError("");
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  }

  function validate(currentStep: number) {
    if (currentStep === 1) {
      if (!form.name.trim()) return "Informe seu nome completo.";

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        return "Informe um e-mail válido.";
      }

      if (form.phone.replace(/\D/g, "").length < 10) {
        return "Informe um telefone com DDD.";
      }

      if (!form.city) return "Selecione sua cidade.";
      if (!form.hadCats) return "Conte se você já teve gatos.";
    }

    if (currentStep === 2) {
      if (
        !form.housing ||
        !form.windowScreens ||
        !form.children ||
        form.otherPets.length === 0 ||
        !form.hoursAlone ||
        !form.familyAgrees
      ) {
        return "Responda todas as perguntas para continuar.";
      }
    }

    if (currentStep === 3) {
      if (!form.acceptTruth || !form.acceptTerm) {
        return "Aceite os dois termos para enviar.";
      }
    }

    return "";
  }

  function handleNext() {
    Keyboard.dismiss();

    const message = validate(step);

    if (message) {
      setError(message);
      return;
    }

    if (step < STEPS.length) {
      goToStep(step + 1);
      return;
    }

    setSubmitted(true);
  }

  function handleBack() {
    if (step > 1) {
      goToStep(step - 1);
      return;
    }

    navigation.goBack();
  }

  const current = STEPS[step - 1];

  return (
    <YStack flex={1} alignItems="center" backgroundColor="background">
      <YStack
        flex={1}
        width={screenWidth}
        position="relative"
        overflow="hidden"
        backgroundColor="background"
      >
        <DecorativeShape
          source={require("../assets/pink_form.png")}
          style={{
            top: 30,
            right: -screenWidth * 0.28,
            width: screenWidth * 0.85,
            height: screenWidth * 0.96,
            transform: [{ rotate: "180deg" }],
          }}
        />

        <DecorativeShape
          source={require("../assets/cat1.png")}
          style={{
            top: insets.top + 15,
            right: -20,
            width: screenWidth * 0.4,
            height: screenWidth * 0.46,
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

        {submitted ? (
          <YStack
            flex={1}
            paddingTop={insets.top + 8}
            paddingBottom={Math.max(insets.bottom, 16)}
            paddingHorizontal={26}
            alignItems="center"
            justifyContent="center"
            gap={16}
          >
            <YStack
              width={72}
              height={72}
              borderRadius={36}
              alignItems="center"
              justifyContent="center"
              backgroundColor="primary"
            >
              <Text
                fontSize={36}
                lineHeight="44px"
                fontWeight="700"
                color="#FFFFFF"
                accessible={false}
              >
                ✓
              </Text>
            </YStack>

            <Text
              fontSize={compact ? 28 : 32}
              lineHeight={compact ? "34px" : "38px"}
              fontWeight="800"
              textAlign="center"
              color="color"
            >
              Interesse enviado!
            </Text>

            <Text
              fontSize={16}
              lineHeight="24px"
              textAlign="center"
              color="color"
            >
              Recebemos suas respostas sobre {catName}. A ONG vai analisar e
              entrar em contato pelo e-mail ou telefone informado.
            </Text>

            <Pressable
              // accessibilityRole="button"
              onPress={() => navigation.navigate("Home")}
              style={({ pressed }) => ({
                alignSelf: "stretch",
                marginTop: 8,
                height: compact ? 50 : 56,
                borderRadius: 30,
                backgroundColor: theme.primary.val,
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                fontSize={18}
                lineHeight="26px"
                fontWeight="700"
                color="background"
              >
                Voltar para o início
              </Text>
            </Pressable>
          </YStack>
        ) : (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            {/* Parte fixa: cabeçalho, etapas e card (o card rola por dentro) */}
            <YStack
              flex={1}
              minHeight={0}
              paddingTop={insets.top + 4}
              paddingHorizontal={20}
              gap={compact ? 8 : 12}
            >
              <YStack gap={compact ? 2 : 4}>
                <Pressable
                  // accessibilityRole="button"
                  /*accessibilityLabel={
                    step > 1 ? "Voltar para a etapa anterior" : "Voltar"
                  }*/
                  onPress={handleBack}
                  hitSlop={8}
                  style={({ pressed }) => ({
                    width: 40,
                    height: 36,
                    marginLeft: -8,
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: pressed ? 0.6 : 1,
                  })}
                >
                  <Text fontSize={30} lineHeight="34px" color="color">
                    ‹
                  </Text>
                </Pressable>

                <Text
                  fontSize={compact ? 24 : 28}
                  lineHeight={compact ? "29px" : "33px"}
                  fontWeight="800"
                  color="color"
                >
                  Formulário de{"\n"}interesse de adoção
                </Text>

                <Text
                  maxWidth="80%"
                  fontSize={13}
                  lineHeight="18px"
                  color="color"
                >
                  Conte um pouco sobre você para encontrarmos o gatinho ideal.
                </Text>
              </YStack>

              <StepIndicator step={step} />

              {/* Card com rolagem interna */}
              <YStack
                flex={1}
                minHeight={0}
                borderRadius={22}
                backgroundColor={CARD_BG}
                overflow="hidden"
              >
                <YStack
                  paddingHorizontal={16}
                  paddingTop={14}
                  paddingBottom={4}
                  gap={2}
                >
                  <Text
                    fontSize={22}
                    lineHeight="28px"
                    fontWeight="800"
                    color="color"
                  >
                    {current.title}
                  </Text>

                  <Text fontSize={12} lineHeight="17px" color="color">
                    {current.subtitle}
                  </Text>
                </YStack>

                <ScrollView
                  ref={scrollRef}
                  style={{ flex: 1 }}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 8,
                    paddingBottom: 16,
                    gap: 10,
                  }}
                >
                  {step === 1 ? (
                    <>
                      <FormField icon="☺" label="Nome completo">
                        <FormInput
                          /*accessibilityLabel="Nome completo"*/
                          placeholder="Digite seu nome"
                          value={form.name}
                          onChangeText={(value) => update("name", value)}
                          autoCapitalize="words"
                          autoComplete="name"
                          returnKeyType="next"
                        />
                      </FormField>

                      <FormField icon="✉" label="E-mail">
                        <FormInput
                          /*accessibilityLabel="E-mail"*/
                          placeholder="seuemail@email.com"
                          value={form.email}
                          onChangeText={(value) => update("email", value)}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                          autoComplete="email"
                          textContentType="emailAddress"
                          returnKeyType="next"
                        />
                      </FormField>

                      <FormField icon="☏" label="Telefone">
                        <FormInput
                          /*accessibilityLabel="Telefone"*/
                          placeholder="(54) 99999-9999"
                          value={form.phone}
                          onChangeText={(value) =>
                            update("phone", formatPhone(value))
                          }
                          keyboardType="phone-pad"
                          autoComplete="tel"
                          textContentType="telephoneNumber"
                          returnKeyType="next"
                        />
                      </FormField>

                      <FormField icon="⌂" label="Cidade">
                        <SelectField
                          label="Cidade"
                          placeholder="Digite sua cidade"
                          value={form.city}
                          options={CITIES}
                          onChange={(value) => update("city", value)}
                        />
                      </FormField>

                      <FormField icon="♧" label="Você já teve gatos?">
                        <SelectField
                          label="Você já teve gatos?"
                          placeholder="Selecione"
                          value={form.hadCats}
                          options={HAD_CATS_OPTIONS}
                          onChange={(value) => update("hadCats", value)}
                        />
                      </FormField>

                      <FormField
                        icon="✎"
                        label="Conte um pouco sobre seu interesse"
                      >
                        <YStack
                          minHeight={84}
                          padding={10}
                          borderWidth={1}
                          borderColor={FIELD_BORDER}
                          borderRadius={12}
                          backgroundColor="surface"
                        >
                          <TextInput
                            /*accessibilityLabel="Conte um pouco sobre seu interesse"*/
                            placeholder="Ex.: Estou procurando um gatinho companheiro para apartamento."
                            placeholderTextColor={PLACEHOLDER}
                            value={form.interest}
                            onChangeText={(value) => update("interest", value)}
                            multiline
                            maxLength={INTEREST_LIMIT}
                            textAlignVertical="top"
                            style={{
                              minHeight: 52,
                              padding: 0,
                              fontSize: 14,
                              color: theme.color.val,
                            }}
                          />

                          <Text
                            alignSelf="flex-end"
                            fontSize={11}
                            lineHeight="16px"
                            color={MUTED}
                          >
                            {form.interest.length}/{INTEREST_LIMIT}
                          </Text>
                        </YStack>
                      </FormField>
                    </>
                  ) : null}

                  {step === 2 ? (
                    <>
                      <FormField icon="⌂" label="Tipo de moradia">
                        <ChipGroup
                          options={HOUSING_OPTIONS}
                          isSelected={(option) => form.housing === option}
                          onSelect={(option) => update("housing", option)}
                        />
                      </FormField>

                      <FormField
                        icon="☐"
                        label="As janelas têm tela de proteção?"
                      >
                        <ChipGroup
                          options={WINDOW_OPTIONS}
                          isSelected={(option) => form.windowScreens === option}
                          onSelect={(option) => update("windowScreens", option)}
                        />
                      </FormField>

                      <FormField icon="☻" label="Há crianças em casa?">
                        <ChipGroup
                          options={YES_NO_OPTIONS}
                          isSelected={(option) => form.children === option}
                          onSelect={(option) => update("children", option)}
                        />
                      </FormField>

                      <FormField icon="♧" label="Outros animais em casa">
                        <ChipGroup
                          options={OTHER_PETS_OPTIONS}
                          isSelected={(option) =>
                            form.otherPets.includes(option)
                          }
                          onSelect={toggleOtherPet}
                        />
                      </FormField>

                      <FormField icon="◷" label="Tempo sozinho por dia">
                        <ChipGroup
                          options={HOURS_ALONE_OPTIONS}
                          isSelected={(option) => form.hoursAlone === option}
                          onSelect={(option) => update("hoursAlone", option)}
                        />
                      </FormField>

                      <FormField
                        icon="♡"
                        label="Todos em casa concordam com a adoção?"
                      >
                        <ChipGroup
                          options={FAMILY_OPTIONS}
                          isSelected={(option) => form.familyAgrees === option}
                          onSelect={(option) => update("familyAgrees", option)}
                        />
                      </FormField>
                    </>
                  ) : null}

                  {step === 3 ? (
                    <>
                      <SummaryBlock
                        title="Sobre você"
                        onEdit={() => goToStep(1)}
                        rows={[
                          { label: "Gatinho", value: catName },
                          { label: "Nome", value: form.name.trim() },
                          { label: "E-mail", value: form.email.trim() },
                          { label: "Telefone", value: form.phone },
                          { label: "Cidade", value: form.city },
                          { label: "Já teve gatos", value: form.hadCats },
                        ]}
                      />

                      <SummaryBlock
                        title="Seu estilo de vida"
                        onEdit={() => goToStep(2)}
                        rows={[
                          { label: "Moradia", value: form.housing },
                          {
                            label: "Tela nas janelas",
                            value: form.windowScreens,
                          },
                          { label: "Crianças em casa", value: form.children },
                          {
                            label: "Outros animais",
                            value: form.otherPets.join(", "),
                          },
                          { label: "Tempo sozinho", value: form.hoursAlone },
                          {
                            label: "Família concorda",
                            value: form.familyAgrees,
                          },
                        ]}
                      />

                      <YStack gap={12}>
                        <Checkbox
                          checked={form.acceptTruth}
                          onToggle={() =>
                            update("acceptTruth", !form.acceptTruth)
                          }
                          label="Declaro que as informações acima são verdadeiras."
                        />

                        <Checkbox
                          checked={form.acceptTerm}
                          onToggle={() => update("acceptTerm", !form.acceptTerm)}
                          label="Concordo em assinar o termo de adoção responsável caso o interesse seja aprovado."
                        />
                      </YStack>
                    </>
                  ) : null}
                </ScrollView>
              </YStack>
            </YStack>

            <YStack
              paddingHorizontal={20}
              paddingTop={8}
              paddingBottom={Math.max(insets.bottom, 12)}
              gap={6}
              zIndex={2}
            >
              {error ? (
                <Text
                  /*accessibilityRole="alert"*/
                  fontSize={13}
                  lineHeight="18px"
                  fontWeight="600"
                  textAlign="center"
                  color="color"
                >
                  {error}
                </Text>
              ) : null}

              <Pressable
                // accessibilityRole="button"
                onPress={handleNext}
                style={({ pressed }) => ({
                  height: compact ? 48 : 54,
                  flexShrink: 0,
                  borderRadius: 30,
                  backgroundColor: theme.primary.val,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: pressed ? 0.8 : 1,
                })}
              >
                <Text
                  fontSize={18}
                  lineHeight="26px"
                  fontWeight="700"
                  color="background"
                >
                  {step === STEPS.length ? "Enviar interesse" : "Próximo"}
                </Text>

                <Text
                  position="absolute"
                  right={24}
                  fontSize={26}
                  lineHeight="32px"
                  color="background"
                  accessible={false}
                >
                  →
                </Text>
              </Pressable>
            </YStack>
          </KeyboardAvoidingView>
        )}
      </YStack>
    </YStack>
  );
}