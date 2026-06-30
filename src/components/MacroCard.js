import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export default function MacroCard({ label, value, goal, color }) {
  const progress = Math.min(1, Math.max(0, value / Math.max(goal, 1)));

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}g</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.goal}>Goal {goal}g</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "30%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.colors.card,
    ...theme.shadow
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  label: {
    fontSize: 13,
    color: theme.colors.muted,
    fontWeight: "800"
  },
  value: {
    fontSize: 17,
    color: theme.colors.ink,
    fontWeight: "900"
  },
  track: {
    height: 6,
    marginTop: 14,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "rgba(15, 23, 42, 0.06)"
  },
  fill: {
    height: "100%",
    borderRadius: 999
  },
  goal: {
    marginTop: 9,
    fontSize: 11,
    color: "#98A2B3",
    fontWeight: "700"
  }
});
