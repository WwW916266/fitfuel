import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { theme } from "../theme";

const size = 220;
const strokeWidth = 11;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

export default function CalorieRing({ currentIntake, dailyGoal }) {
  const progress = Math.min(1, Math.max(0, currentIntake / Math.max(dailyGoal, 1)));
  const remaining = Math.max(0, dailyGoal - currentIntake);
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(4, 120, 87, 0.12)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={currentIntake > dailyGoal ? theme.colors.coral : theme.colors.emerald}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.centerText}>
        <Text style={styles.remaining}>{remaining}</Text>
        <Text style={styles.kicker}>KCAL REMAINING</Text>
        <Text style={styles.subcopy}>Goal {dailyGoal.toLocaleString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 4
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  kicker: {
    marginTop: 4,
    fontSize: 10,
    color: "#8A9A94",
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase"
  },
  remaining: {
    fontSize: 56,
    lineHeight: 60,
    color: "#1F2937",
    fontWeight: "900"
  },
  subcopy: {
    marginTop: 7,
    fontSize: 13,
    color: theme.colors.muted,
    fontWeight: "400"
  }
});
