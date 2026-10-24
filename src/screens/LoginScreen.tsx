import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, XStack, YStack, useTheme } from "tamagui";

import { DecorativeShape } from "../components/DecorativeShape";
import { useScreenLayout } from "../hooks/useScreenLayout";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const { screenWidth, compact } = useScreenLayout();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    Keyboard.dismiss();
  }

  function handlePasswordRecovery() {
    Alert.alert("Recuperar senha");
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
          source={require("../assets/green_form.png")}
          style={{
            bottom: -115,
            left: -100,
            width: 290,
            height: 270,
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

            <YStack
              flexShrink={0}
              marginTop={compact ? 8 : 36}
              marginBottom={compact ? 16 : 36}
              gap={4}
            >
              <Text
                fontSize={compact ? 38 : 44}
                lineHeight={compact ? "44px" : "50px"}
                fontWeight="800"
                color="primary"
              >
                Entrar
              </Text>

              <Text
                maxWidth="65%"
                fontSize={18}
                lineHeight="24px"
                color="color"
              >
                Que bom ter você{"\n"}de volta!
              </Text>
            </YStack>

            <YStack flexShrink={0} gap={12}>
              <XStack
                minHeight={56}
                paddingHorizontal={16}
                borderWidth={1}
                borderColor="#D1CCC1"
                borderRadius={16}
                backgroundColor="background"
                alignItems="center"
                gap={12}
              >
                <Text
                  fontSize={22}
                  lineHeight="28px"
                  color="color"
                  accessible={false}
                >
                  ✉
                </Text>

                <TextInput
                  accessibilityLabel="E-mail"
                  placeholder="E-mail"
                  placeholderTextColor={theme.color.val}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  textContentType="emailAddress"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    height: 54,
                    fontSize: 16,
                    color: theme.color.val,
                  }}
                />
              </XStack>

              <XStack
                minHeight={56}
                paddingHorizontal={16}
                borderWidth={1}
                borderColor="#D1CCC1"
                borderRadius={16}
                backgroundColor="background"
                alignItems="center"
                gap={12}
              >
                <Text
                  fontSize={22}
                  lineHeight="28px"
                  color="color"
                  accessible={false}
                >
                  ⚿
                </Text>

                <TextInput
                  accessibilityLabel="Senha"
                  placeholder="Senha"
                  placeholderTextColor={theme.color.val}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="current-password"
                  textContentType="password"
                  returnKeyType="go"
                  onSubmitEditing={handleLogin}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    height: 54,
                    fontSize: 16,
                    color: theme.color.val,
                  }}
                />

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    showPassword ? "Ocultar senha" : "Mostrar senha"
                  }
                  onPress={() => setShowPassword((value) => !value)}
                  hitSlop={8}
                  style={{
                    minWidth: 44,
                    minHeight: 44,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    fontSize={12}
                    lineHeight="18px"
                    fontWeight="700"
                    color="primary"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Text>
                </Pressable>
              </XStack>

              <Pressable
                accessibilityRole="button"
                onPress={handlePasswordRecovery}
                style={({ pressed }) => ({
                  alignSelf: "flex-end",
                  minHeight: 40,
                  justifyContent: "center",
                  opacity: pressed ? 0.6 : 1,
                })}
              >
                <Text fontSize={14} lineHeight="20px" color="primary">
                  Esqueceu a senha?
                </Text>
              </Pressable>
            </YStack>

            <Pressable
              accessibilityRole="button"
              onPress={handleLogin}
              style={({ pressed }) => ({
                marginTop: 16,
                height: 56,
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
                Entrar
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
              flexShrink={0}
              marginVertical={compact ? 16 : 24}
              alignItems="center"
              gap={16}
            >
              <YStack flex={1} height={1} backgroundColor="primary" />

              <Text fontSize={13} lineHeight="20px" color="color">
                ou continue com
              </Text>

              <YStack flex={1} height={1} backgroundColor="primary" />
            </XStack>

            <XStack flexShrink={0} gap={12}>
              {["Google", "Apple"].map((provider) => (
                <YStack
                  key={provider}
                  flex={1}
                  minHeight={compact ? 60 : 76}
                  borderWidth={1}
                  borderColor="primary"
                  borderRadius={16}
                  backgroundColor="background"
                  alignItems="center"
                  justifyContent="center"
                  accessible
                >
                  <Text
                    fontSize={17}
                    lineHeight="24px"
                    fontWeight="700"
                    color="color"
                  >
                    {provider}
                  </Text>
                </YStack>
              ))}
            </XStack>

            <XStack
              flexShrink={0}
              marginTop={compact ? 12 : 32}
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
              gap={6}
            >
              <Text fontSize={14} lineHeight="22px" color="color">
                Ainda não tem uma conta?
              </Text>

              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.navigate("RoleSelection")}
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
                  Cadastre-se
                </Text>
              </Pressable>
            </XStack>
          </YStack>
        </KeyboardAvoidingView>
      </YStack>
    </YStack>
  );
}
