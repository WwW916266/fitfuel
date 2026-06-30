import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Camera, Send, Sparkles } from "lucide-react-native";
import { useAppContext } from "../context/AppContext";
import { processUserLogWithCodex } from "../services/aiService";
import { theme } from "../theme";

const initialMessages = [
  {
    id: "welcome",
    role: "assistant",
    text: 'Tell me what you ate, like "two eggs and oatmeal" or "chicken rice for lunch".'
  }
];

export default function AiLogScreen() {
  const scrollRef = useRef(null);
  const { addMealLog } = useAppContext();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const scrollToBottom = () => {
    requestAnimationFrame(() => scrollRef.current?.scrollToEnd({ animated: true }));
  };

  const submitLog = async () => {
    const trimmed = input.trim();
    if (!trimmed || isThinking) {
      return;
    }

    const userMessage = { id: `${Date.now()}-user`, role: "user", text: trimmed };
    setMessages((value) => [...value, userMessage]);
    setInput("");
    setIsThinking(true);
    scrollToBottom();

    try {
      const result = await processUserLogWithCodex(trimmed);
      if (result.is_valid_log) {
        addMealLog(result);
      }

      const itemNames = result.parsed_items.map((item) => item.name).join(", ");
      const responseText = result.is_valid_log
        ? `${itemNames}: ${result.macro_updates.calories} kcal logged. ${result.coach_response}`
        : result.coach_response;

      setMessages((value) => [
        ...value,
        { id: `${Date.now()}-assistant`, role: "assistant", text: responseText }
      ]);
      Alert.alert(result.is_valid_log ? "Coach feedback" : "Try another entry", result.coach_response);
    } catch (error) {
      setMessages((value) => [
        ...value,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          text: "I could not analyze that entry. Please try a simpler meal description."
        }
      ]);
    } finally {
      setIsThinking(false);
      scrollToBottom();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={10}
    >
      <View style={styles.inner}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Codex nutrition brain</Text>
            <Text style={styles.title}>AI Log</Text>
          </View>
          <View style={styles.headerIcon}>
            <Sparkles size={22} color={theme.colors.emerald} />
          </View>
        </View>

        <ScrollView
          ref={scrollRef}
          style={styles.chatList}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
        >
          {messages.map((message) =>
            message.role === "user" ? (
              <View key={message.id} style={[styles.messageRow, styles.userRow]}>
                <View style={[styles.bubble, styles.userBubble]}>
                  <Text style={[styles.bubbleText, styles.userBubbleText]}>{message.text}</Text>
                </View>
              </View>
            ) : (
              <View key={message.id} style={styles.messageRow}>
                <View style={styles.aiAvatar}>
                  <Sparkles size={16} color={theme.colors.emerald} />
                </View>
                <View style={[styles.bubble, styles.assistantBubble]}>
                  <Text style={styles.bubbleText}>{message.text}</Text>
                </View>
              </View>
            )
          )}

          {isThinking ? (
            <View style={styles.messageRow}>
              <View style={styles.aiAvatar}>
                <Sparkles size={16} color={theme.colors.emerald} />
              </View>
              <View style={[styles.bubble, styles.assistantBubble, styles.thinkingBubble]}>
                <Text style={styles.thinkingText}>AI is thinking...</Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
      </View>

      <View style={styles.inputBar}>
        <TouchableOpacity activeOpacity={0.7} style={styles.cameraButton}>
          <Camera size={22} color={theme.colors.emerald} />
        </TouchableOpacity>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Log a meal or snack"
          placeholderTextColor="#8AA198"
          style={styles.input}
          multiline
          maxLength={180}
        />
        <TouchableOpacity activeOpacity={0.7} style={styles.sendButton} onPress={submitLog}>
          <Send size={19} color="#FFFFFF" />
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: theme.colors.background
  },
  inner: {
    flex: 1,
    width: "100%",
    maxWidth: theme.layout.maxWidth
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  eyebrow: {
    color: theme.colors.emerald,
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  title: {
    marginTop: 2,
    fontSize: 34,
    lineHeight: 40,
    color: theme.colors.ink,
    fontWeight: "900"
  },
  headerIcon: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "rgba(4, 120, 87, 0.1)"
  },
  chatList: {
    flex: 1
  },
  chatContent: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    gap: 10
  },
  messageRow: {
    maxWidth: "92%",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 9
  },
  userRow: {
    alignSelf: "flex-end",
    justifyContent: "flex-end"
  },
  aiAvatar: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#ECFDF5",
    shadowColor: "#047857",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 3
  },
  bubble: {
    maxWidth: "100%",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 22
  },
  userBubble: {
    backgroundColor: theme.colors.slate
  },
  assistantBubble: {
    backgroundColor: theme.colors.card,
    ...theme.shadow
  },
  bubbleText: {
    color: theme.colors.ink,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700"
  },
  userBubbleText: {
    color: "#FFFFFF"
  },
  thinkingBubble: {
    backgroundColor: "#ECFDF5"
  },
  thinkingText: {
    color: theme.colors.emerald,
    fontSize: 14,
    fontWeight: "800"
  },
  inputBar: {
    width: "92%",
    maxWidth: theme.layout.maxWidth - 28,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    alignSelf: "center",
    marginBottom: 86,
    padding: 10,
    borderRadius: 24,
    backgroundColor: theme.colors.card,
    ...theme.shadow
  },
  cameraButton: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 23,
    backgroundColor: "#ECFDF5",
    ...theme.shadow
  },
  input: {
    flex: 1,
    maxHeight: 94,
    minHeight: 46,
    paddingTop: 12,
    paddingHorizontal: 4,
    color: theme.colors.ink,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700"
  },
  sendButton: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 14,
    borderRadius: 24,
    backgroundColor: theme.colors.emerald,
    ...theme.shadow
  },
  sendText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900"
  }
});
