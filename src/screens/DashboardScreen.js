import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Flame, Sparkles } from "lucide-react-native";
import CalorieRing from "../components/CalorieRing";
import MacroCard from "../components/MacroCard";
import { useAppContext } from "../context/AppContext";

export default function DashboardScreen() {
  const { dailyGoal, currentIntake, macros, logs } = useAppContext();
  const latestLogs = logs.slice(0, 3);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>FitFuel diary</Text>
          <Text style={styles.title}>Today</Text>
        </View>
        <View style={styles.iconBadge}>
          <Sparkles size={23} color="#10A37F" />
        </View>
      </View>

      <View style={styles.heroPanel}>
        <View style={styles.heroTopline}>
          <Text style={styles.heroLabel}>Calories consumed</Text>
          <View style={styles.intakePill}>
            <Flame size={15} color="#E76F51" />
            <Text style={styles.intakeText}>{currentIntake} kcal</Text>
          </View>
        </View>
        <CalorieRing currentIntake={currentIntake} dailyGoal={dailyGoal} />
      </View>

      <Text style={styles.sectionTitle}>Macros</Text>
      <View style={styles.macroGrid}>
        <MacroCard label="Protein" value={macros.protein} goal={140} color="#10A37F" />
        <MacroCard label="Carbs" value={macros.carbs} goal={230} color="#2D9CDB" />
        <MacroCard label="Fat" value={macros.fat} goal={70} color="#F4A261" />
      </View>

      <View style={styles.diaryHeader}>
        <Text style={styles.sectionTitle}>Recent Diary</Text>
        <Text style={styles.countText}>{logs.length} logs</Text>
      </View>
      <View style={styles.diaryList}>
        {latestLogs.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No meals logged yet</Text>
            <Text style={styles.emptyCopy}>Use AI Log to add breakfast, lunch, dinner, or a quick snack.</Text>
          </View>
        ) : (
          latestLogs.map((log) => (
            <View key={log.id} style={styles.logRow}>
              <View style={styles.logDot} />
              <View style={styles.logBody}>
                <Text style={styles.logTitle} numberOfLines={1}>
                  {log.title}
                </Text>
                <Text style={styles.logMeta}>
                  {log.macros.protein}g protein / {log.macros.carbs}g carbs / {log.macros.fat}g fat
                </Text>
              </View>
              <Text style={styles.logCalories}>{log.calories}</Text>
            </View>
          ))
        )}
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
    fontSize: 36,
    lineHeight: 42,
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
  heroPanel: {
    marginTop: 20,
    padding: 18,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#163B34",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8
  },
  heroTopline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  heroLabel: {
    color: "#6B837B",
    fontSize: 14,
    fontWeight: "800"
  },
  intakePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#FFF0EA"
  },
  intakeText: {
    color: "#B94A30",
    fontSize: 12,
    fontWeight: "900"
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 20,
    lineHeight: 26,
    color: "#143D36",
    fontWeight: "900"
  },
  macroGrid: {
    flexDirection: "row",
    gap: 10
  },
  diaryHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between"
  },
  countText: {
    color: "#7A9289",
    fontSize: 13,
    fontWeight: "800"
  },
  diaryList: {
    gap: 10
  },
  emptyState: {
    padding: 18,
    borderRadius: 8,
    backgroundColor: "#EAF5F0"
  },
  emptyTitle: {
    fontSize: 16,
    color: "#143D36",
    fontWeight: "900"
  },
  emptyCopy: {
    marginTop: 6,
    color: "#617B73",
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600"
  },
  logRow: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#1C423B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3
  },
  logDot: {
    width: 10,
    height: 42,
    borderRadius: 5,
    backgroundColor: "#10A37F"
  },
  logBody: {
    flex: 1,
    paddingHorizontal: 12
  },
  logTitle: {
    fontSize: 15,
    color: "#123C35",
    fontWeight: "900"
  },
  logMeta: {
    marginTop: 5,
    fontSize: 12,
    color: "#71877F",
    fontWeight: "700"
  },
  logCalories: {
    color: "#123C35",
    fontSize: 18,
    fontWeight: "900"
  }
});
