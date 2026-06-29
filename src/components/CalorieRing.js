import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

const size = 220;
const strokeWidth = 18;
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
          stroke="#DDEBE5"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={currentIntake > dailyGoal ? "#E76F51" : "#10A37F"}
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
        <Text style={styles.kicker}>Remaining</Text>
        <Text style={styles.remaining}>{remaining}</Text>
        <Text style={styles.subcopy}>of {dailyGoal} kcal</Text>
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
    marginTop: 18,
    marginBottom: 22
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  kicker: {
    fontSize: 13,
    color: "#668078",
    fontWeight: "800",
    textTransform: "uppercase"
  },
  remaining: {
    marginTop: 4,
    fontSize: 48,
    lineHeight: 54,
    color: "#123C35",
    fontWeight: "900"
  },
  subcopy: {
    marginTop: 2,
    fontSize: 15,
    color: "#668078",
    fontWeight: "700"
  }
});
