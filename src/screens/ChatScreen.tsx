import { useRef, useState, type ComponentRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, XStack, YStack, useTheme } from "tamagui";

import { DecorativeShape } from "../components/DecorativeShape";
import { useScreenLayout } from "../hooks/useScreenLayout";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

type Message = {
  id: string;
  sender: "user" | "organization";
  text: string;
  time: string;
};

const organizationName = "ONG Patas do Bem";
const organizationAvatar = require("../assets/cat_icon.png");

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "user",
    text: "Olá! Tenho interesse na Luna e gostaria de saber mais sobre o processo de adoção. 🐾",
    time: "10:24",
  },
  {
    id: "2",
    sender: "organization",
    text: "Olá, Lilian! 😊 Que bom que se interessou pela Luna! Posso te explicar como funciona o processo de adoção.",
    time: "10:26",
  },
  {
    id: "3",
    sender: "user",
    text: "Ótimo! Quais os próximos passos?",
    time: "10:27",
  },
  {
    id: "4",
    sender: "organization",
    text:
      "O processo de adoção tem algumas etapas simples:\n\n" +
      "1. Preenchimento do formulário de interesse\n" +
      "2. Conversa com a nossa equipe\n" +
      "3. Visita presencial ou virtual\n" +
      "4. Assinatura do termo de adoção\n\n" +
      "Assim garantimos que o gatinho vá para um lar seguro e cheio de amor! 💙",
    time: "10:28",
  },
  {
    id: "5",
    sender: "user",
    text: "Perfeito! Já vou preencher o formulário. Muito obrigada! 🥰",
    time: "10:29",
  },
  {
    id: "6",
    sender: "organization",
    text: "Nós que agradecemos! Qualquer dúvida, estamos por aqui. 🐾",
    time: "10:30",
  },
];

function OrganizationAvatar({ size }: { size: number }) {
  return (
    <YStack
      width={size}
      height={size}
      flexShrink={0}
      borderRadius={size / 2}
      backgroundColor="pink"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        source={organizationAvatar}
        resizeMode="contain"
        accessible={false}
        style={{ width: size * 0.65, height: size * 0.65 }}
      />
    </YStack>
  );
}

export function ChatScreen({ navigation }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { screenWidth } = useScreenLayout();

  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const nextMessageId = useRef(initialMessages.length + 1);
  const scrollOnNextLayout = useRef(true);

  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  const canSend = draft.trim().length > 0;

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;

    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes(),
    ).padStart(2, "0")}`;

    const message: Message = {
      id: String(nextMessageId.current++),
      sender: "user",
      text,
      time,
    };

    scrollOnNextLayout.current = true;
    setMessages((current) => [...current, message]);
    setDraft("");
  }

  return (
    <YStack flex={1} alignItems="center" backgroundColor="background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, width: screenWidth }}
      >
        <YStack flex={1} backgroundColor="background" overflow="hidden">
          <XStack
            paddingTop={insets.top + 16}
            paddingBottom={12}
            paddingHorizontal={12}
            alignItems="center"
            gap={10}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Voltar"
              onPress={() => navigation.goBack()}
              style={{
                width: 44,
                height: 44,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text fontSize={28} lineHeight="34px" color="color">
                ‹
              </Text>
            </Pressable>

            <OrganizationAvatar size={46} />

            <YStack flex={1} minWidth={0} gap={2}>
              <Text fontSize={16} fontWeight="800" color="color">
                {organizationName}
              </Text>
              <Text fontSize={12} lineHeight="16px" color="color">
                Conversa de demonstração
              </Text>
            </YStack>
          </XStack>

          <YStack flex={1} position="relative" overflow="hidden">
            <DecorativeShape
              source={require("../assets/pink_form.png")}
              style={{ left: -82, top: "20%", width: 150, height: 230 }}
            />

            <DecorativeShape
              source={require("../assets/green_form.png")}
              style={{ right: -86, bottom: 40, width: 150, height: 190 }}
            />

            <ScrollView
              ref={scrollRef}
              style={{ flex: 1 }}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 8,
                paddingBottom: 12,
                gap: 12,
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => {
                if (!scrollOnNextLayout.current) return;

                scrollOnNextLayout.current = false;
                scrollRef.current?.scrollToEnd({ animated: false });
              }}
            >
              {messages.map((message) => {
                const isMine = message.sender === "user";

                return (
                  <XStack
                    key={message.id}
                    alignSelf={isMine ? "flex-end" : "flex-start"}
                    maxWidth="86%"
                    alignItems="flex-start"
                    gap={8}
                  >
                    {!isMine && <OrganizationAvatar size={32} />}

                    <YStack flexShrink={1} minWidth={0} gap={4}>
                      <YStack
                        borderRadius={16}
                        paddingHorizontal={12}
                        paddingVertical={9}
                        backgroundColor={isMine ? "pink" : "surface"}
                      >
                        <Text fontSize={14} lineHeight="20px" color="color">
                          {message.text}
                        </Text>
                      </YStack>

                      <Text
                        alignSelf={isMine ? "flex-end" : "flex-start"}
                        fontSize={10}
                        lineHeight="14px"
                        color="color"
                        opacity={0.7}
                      >
                        {message.time}
                      </Text>
                    </YStack>
                  </XStack>
                );
              })}
            </ScrollView>
          </YStack>

          <XStack
            alignItems="flex-end"
            paddingHorizontal={16}
            paddingTop={8}
            paddingBottom={Math.max(insets.bottom, 12)}
            gap={8}
            backgroundColor="background"
          >
            <XStack
              flex={1}
              minWidth={0}
              minHeight={46}
              alignItems="center"
              borderRadius={24}
              borderWidth={1}
              borderColor="#D9D9D9"
              backgroundColor="surface"
              paddingRight={12}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Anexar arquivo"
                accessibilityState={{ disabled: true }}
                style={{
                  width: 44,
                  height: 44,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0.45,
                }}
              >
                <Text fontSize={18}>📎</Text>
              </Pressable>

              <TextInput
                accessibilityLabel="Mensagem"
                placeholder="Digite uma mensagem..."
                placeholderTextColor={theme.color.val}
                value={draft}
                onChangeText={setDraft}
                multiline
                maxLength={1000}
                style={{
                  flex: 1,
                  minWidth: 0,
                  minHeight: 44,
                  maxHeight: 100,
                  paddingVertical: 10,
                  fontSize: 14,
                  color: theme.color.val,
                }}
              />
            </XStack>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Enviar mensagem"
              onPress={sendMessage}
              style={({ pressed }) => ({
                width: 46,
                height: 46,
                borderRadius: 23,
                backgroundColor: theme.primary.val,
                alignItems: "center",
                justifyContent: "center",
              })}
            >
              <Text fontSize={23} lineHeight="28px" color="background">
                ➤
              </Text>
            </Pressable>
          </XStack>
        </YStack>
      </KeyboardAvoidingView>
    </YStack>
  );
}
