import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export default function MacroCard({ label, value, goal, color, tint }) {
  const progress = Math.min(1, Math.max(0, value / Math.max(goal, 1)));

  return (
    <View style={[styles.card, { backgroundColor: tint || theme.colors.card }]}>
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
    padding: 15,
    borderRadius: 18,
    ...theme.shadow
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  label: {
    fontSize: 10,
    color: theme.colors.muted,
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase"
  },
  value: {
    fontSize: 17,
    color: theme.colors.ink,
    fontWeight: "900"
  },
  track: {
    height: 4,
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
    marginTop: 10,
    fontSize: 11,
    color: "#98A2B3",
    fontWeight: "400"
  }
});
