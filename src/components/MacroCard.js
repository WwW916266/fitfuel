import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#184038",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  label: {
    fontSize: 13,
    color: "#6D827B",
    fontWeight: "800"
  },
  value: {
    fontSize: 17,
    color: "#143E36",
    fontWeight: "900"
  },
  track: {
    height: 8,
    marginTop: 14,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#E7F0EC"
  },
  fill: {
    height: "100%",
    borderRadius: 5
  },
  goal: {
    marginTop: 9,
    fontSize: 11,
    color: "#8BA098",
    fontWeight: "700"
  }
});
