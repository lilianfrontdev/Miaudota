import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  type TextInputProps,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, XStack, YStack, useTheme } from "tamagui";

import { DecorativeShape } from "../components/DecorativeShape";
import { useScreenLayout } from "../hooks/useScreenLayout";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

type UserRole = "adopter" | "organization" | "supporter";

function RegisterField(props: TextInputProps) {
  const theme = useTheme();

  return (
    <XStack
      height={52}
      paddingHorizontal={16}
      borderWidth={1}
      borderColor="#D1D1D"
      borderRadius={16}
      backgroundColor="background"
      alignItems="center"
    >
      <TextInput
        placeholderTextColor={theme.color.val}
        {...props}
        style={[
          {
            flex: 1,
            minWidth: 0,
            height: 50,
            fontSize: 16,
            color: theme.color.val,
          },
          props.style,
        ]}
      />
    </XStack>
  );
}

export function RegisterScreen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const { screenWidth, compact } = useScreenLayout();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleRegister() {
    Keyboard.dismiss();

    if (
      !name.trim() ||
      !email.trim() ||
      !role ||
      !password ||
      !confirmPassword
    ) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Informe um e-mail válido.");
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setError("");
  }

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
          source={require("../assets/cat1.png")}
          style={{
            top: insets.top - 1,
            right: -20,
            width: screenWidth * 0.4,
            height: screenWidth * 0.46,
          }}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <YStack
            flex={1}
            minHeight={0}
            paddingTop={insets.top + 8}
            paddingBottom={Math.max(insets.bottom, 16)}
            paddingHorizontal={26}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar"
              onPress={() => navigation.goBack()}
              hitSlop={8}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                flexShrink: 0,
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

            {/* Cabeçalho */}
            <YStack
              marginTop={compact ? 4 : 16}
              marginBottom={compact ? 14 : 24}
              gap={6}
            >
              <Text
                fontSize={compact ? 32 : 38}
                lineHeight={compact ? "38px" : "44px"}
                fontWeight="800"
                color="primary"
              >
                Crie sua conta
              </Text>

              <Text
                fontSize={compact ? 15 : 17}
                lineHeight={compact ? "21px" : "24px"}
                color="color"
              >
                Escolha como participar e ajude{"\n"}a construir novos começos.
              </Text>
            </YStack>

            <YStack gap={compact ? 10 : 12}>
              <YStack
                height={52}
                borderWidth={1}
                borderColor="#D1D1D"
                borderRadius={16}
                backgroundColor="background"
                justifyContent="center"
                overflow="hidden"
              >
                <Picker
                  accessibilityLabel="Como você quer participar?"
                  selectedValue={role}
                  onValueChange={(value) => {
                    setRole(value as UserRole | "");
                    setError("");
                  }}
                  mode="dropdown"
                  dropdownIconColor={theme.primary.val}
                  style={{
                    width: "100%",
                    height: 52,
                    color: theme.color.val,
                    backgroundColor: theme.background.val,
                    borderWidth: 0,
                  }}
                >
                  <Picker.Item
                    label="Como você quer participar?"
                    value=""
                    enabled={false}
                  />
                  <Picker.Item label="Quero adotar" value="adopter" />
                  <Picker.Item
                    label="Represento uma ONG"
                    value="organization"
                  />
                  <Picker.Item label="Quero apoiar" value="supporter" />
                </Picker>
              </YStack>

              <RegisterField
                accessibilityLabel="Nome"
                placeholder={
                  role === "organization" ? "Nome da ONG" : "Nome completo"
                }
                value={name}
                onChangeText={(value) => {
                  setName(value);
                  setError("");
                }}
                autoCapitalize="words"
                autoComplete="name"
                returnKeyType="next"
              />

              <RegisterField
                accessibilityLabel="E-mail"
                placeholder="E-mail"
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  setError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
              />

              <RegisterField
                accessibilityLabel="Senha"
                placeholder="Senha"
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  setError("");
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="new-password"
                textContentType="newPassword"
                returnKeyType="next"
              />

              <RegisterField
                accessibilityLabel="Confirmar senha"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChangeText={(value) => {
                  setConfirmPassword(value);
                  setError("");
                }}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="go"
                onSubmitEditing={handleRegister}
              />
            </YStack>

            <XStack
              marginTop={4}
              alignItems="center"
              justifyContent="space-between"
              gap={8}
            >
              <Text flex={1} fontSize={12} lineHeight="18px" color="color">
                Use pelo menos 8 caracteres.
              </Text>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                  showPassword ? "Ocultar senhas" : "Mostrar senhas"
                }
                onPress={() => setShowPassword((value) => !value)}
                style={({ pressed }) => ({
                  minHeight: 44,
                  justifyContent: "center",
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text
                  fontSize={13}
                  lineHeight="20px"
                  fontWeight="700"
                  color="primary"
                >
                  {showPassword ? "Ocultar senhas" : "Mostrar senhas"}
                </Text>
              </Pressable>
            </XStack>

            <YStack minHeight={compact ? 30 : 40} justifyContent="center">
              {error ? (
                <Text
                  accessibilityRole="alert"
                  fontSize={13}
                  lineHeight="18px"
                  color="color"
                >
                  {error}
                </Text>
              ) : null}
            </YStack>

            <Pressable
              accessibilityRole="button"
              onPress={handleRegister}
              style={({ pressed }) => ({
                height: compact ? 50 : 56,
                flexShrink: 0,
                borderRadius: 30,
                backgroundColor: theme.primary.val,
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.8 : 1,
              })}
            >
              <Text
                fontSize={20}
                lineHeight="28px"
                fontWeight="700"
                color="background"
              >
                Criar conta
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

            <XStack
              marginTop={compact ? 8 : 18}
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
              gap={6}
            >
              <Text fontSize={14} lineHeight="22px" color="color">
                Já tem uma conta?
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.navigate("Login")}
                style={({ pressed }) => ({
                  minHeight: 44,
                  justifyContent: "center",
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text
                  fontSize={14}
                  lineHeight="22px"
                  fontWeight="700"
                  color="primary"
                >
                  Entrar
                </Text>
              </Pressable>
            </XStack>
          </YStack>
        </KeyboardAvoidingView>
      </YStack>
    </YStack>
  );
}
