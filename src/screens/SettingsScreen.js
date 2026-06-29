import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Check, Settings } from "lucide-react-native";
import { useAppContext } from "../context/AppContext";

export default function SettingsScreen() {
  const { dailyGoal, setDailyGoal } = useAppContext();
  const [goalInput, setGoalInput] = useState(String(dailyGoal));
  const [saved, setSaved] = useState(false);

  const saveGoal = () => {
    const nextGoal = Math.max(800, Math.min(6000, Number(goalInput) || dailyGoal));
    setDailyGoal(Math.round(nextGoal));
    setGoalInput(String(Math.round(nextGoal)));
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Personal plan</Text>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.iconBadge}>
          <Settings size={23} color="#10A37F" />
        </View>
      </View>

      <View style={styles.formPanel}>
        <Text style={styles.label}>Daily calorie limit</Text>
        <Text style={styles.copy}>This target updates the dashboard ring and recipe budget immediately.</Text>
        <View style={styles.inputWrap}>
          <TextInput
            value={goalInput}
            onChangeText={(value) => setGoalInput(value.replace(/[^0-9]/g, ""))}
            keyboardType="number-pad"
            style={styles.input}
            maxLength={4}
          />
          <Text style={styles.unit}>kcal</Text>
        </View>
        <TouchableOpacity activeOpacity={0.85} style={styles.saveButton} onPress={saveGoal}>
          <Check size={20} color="#FFFFFF" />
          <Text style={styles.saveText}>{saved ? "Saved" : "Update Goal"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>Current target</Text>
        <Text style={styles.infoNumber}>{dailyGoal} kcal</Text>
        <Text style={styles.infoCopy}>A steady, realistic goal is easier to follow than a perfect one.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F8F5"
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 104
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  eyebrow: {
    color: "#10A37F",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  title: {
    marginTop: 2,
    fontSize: 34,
    lineHeight: 40,
    color: "#113A33",
    fontWeight: "900"
  },
  iconBadge: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#E4F6EF"
  },
  formPanel: {
    marginTop: 24,
    padding: 18,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#153F37",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6
  },
  label: {
    fontSize: 18,
    color: "#143D36",
    fontWeight: "900"
  },
  copy: {
    marginTop: 7,
    color: "#657D75",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  },
  inputWrap: {
    marginTop: 18,
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F1F7F4",
    borderWidth: 1,
    borderColor: "#DCEAE4"
  },
  input: {
    flex: 1,
    color: "#123C35",
    fontSize: 28,
    fontWeight: "900"
  },
  unit: {
    color: "#6D867E",
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
    borderRadius: 8,
    backgroundColor: "#10A37F"
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900"
  },
  infoPanel: {
    marginTop: 16,
    padding: 18,
    borderRadius: 8,
    backgroundColor: "#EAF5F0"
  },
  infoTitle: {
    color: "#57746B",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  infoNumber: {
    marginTop: 8,
    color: "#123C35",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900"
  },
  infoCopy: {
    marginTop: 4,
    color: "#607B72",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  }
});
