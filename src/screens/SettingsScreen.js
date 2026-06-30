import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Check, ChevronRight, Settings } from "lucide-react-native";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme";

export default function SettingsScreen() {
  const { dailyGoal, setDailyGoal } = useAppContext();
  const [goalInput, setGoalInput] = useState(String(dailyGoal));
  const [saved, setSaved] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const saveGoal = () => {
    const nextGoal = Math.max(800, Math.min(6000, Number(goalInput) || dailyGoal));
    setDailyGoal(Math.round(nextGoal));
    setGoalInput(String(Math.round(nextGoal)));
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Personal plan</Text>
            <Text style={styles.title}>Settings</Text>
          </View>
          <View style={styles.iconBadge}>
            <Settings size={23} color={theme.colors.emerald} />
          </View>
        </View>

        <View style={styles.formPanel}>
          <Text style={styles.label}>Daily calorie limit</Text>
          <Text style={styles.copy}>This target updates the dashboard ring and recipe budget immediately.</Text>
          <View style={[styles.inputWrap, isFocused && styles.inputWrapFocused]}>
            <TextInput
              value={goalInput}
              onChangeText={(value) => setGoalInput(value.replace(/[^0-9]/g, ""))}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              keyboardType="number-pad"
              style={styles.input}
              maxLength={4}
            />
            <Text style={styles.unit}>kcal</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.saveButton} onPress={saveGoal}>
            <Check size={20} color="#FFFFFF" />
            <Text style={styles.saveText}>{saved ? "Saved" : "Update Goal"}</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoPanel}>
          <Text style={styles.infoTitle}>Current target</Text>
          <Text style={styles.infoNumber}>{dailyGoal} kcal</Text>
          <Text style={styles.infoCopy}>A steady, realistic goal is easier to follow than a perfect one.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.background
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: theme.layout.bottomPadding,
    alignItems: "center"
  },
  inner: {
    width: "100%",
    maxWidth: theme.layout.maxWidth
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
  iconBadge: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "rgba(4, 120, 87, 0.1)"
  },
  formPanel: {
    marginTop: 24,
    padding: 18,
    borderRadius: 28,
    backgroundColor: theme.colors.card,
    ...theme.shadow
  },
  label: {
    fontSize: 18,
    color: theme.colors.ink,
    fontWeight: "900"
  },
  copy: {
    marginTop: 7,
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  },
  inputWrap: {
    marginTop: 18,
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(15, 23, 42, 0.08)"
  },
  inputWrapFocused: {
    borderColor: theme.colors.emerald
  },
  input: {
    flex: 1,
    color: theme.colors.ink,
    fontSize: 28,
    fontWeight: "900"
  },
  unit: {
    color: theme.colors.muted,
    fontSize: 15,
    fontWeight: "900"
  },
  saveButton: {
    marginTop: 16,
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 999,
    backgroundColor: theme.colors.emerald,
    ...theme.shadow
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900"
  },
  infoPanel: {
    marginTop: 16,
    padding: 18,
    borderRadius: 24,
    backgroundColor: theme.colors.card,
    ...theme.shadow
  },
  infoTitle: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  infoNumber: {
    marginTop: 8,
    color: theme.colors.ink,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900"
  },
  infoCopy: {
    marginTop: 4,
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  }
});
