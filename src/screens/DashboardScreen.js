import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ChevronRight, Soup, Sparkles } from "lucide-react-native";
import CalorieRing from "../components/CalorieRing";
import MacroCard from "../components/MacroCard";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme";

export default function DashboardScreen() {
  const { dailyGoal, currentIntake, macros, logs } = useAppContext();
  const latestLogs = logs.slice(0, 3);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>FitFuel diary</Text>
            <Text style={styles.title}>Today</Text>
          </View>
          <View style={styles.iconBadge}>
            <Sparkles size={23} color={theme.colors.emerald} />
          </View>
        </View>

        <View style={styles.heroPanel}>
          <CalorieRing currentIntake={currentIntake} dailyGoal={dailyGoal} />
        </View>

        <Text style={styles.sectionTitle}>Macros</Text>
        <View style={styles.macroGrid}>
          <MacroCard
            label="Protein"
            value={macros.protein}
            goal={140}
            color={theme.colors.emeraldSoft}
            tint="rgba(143, 185, 150, 0.08)"
          />
          <MacroCard
            label="Carbs"
            value={macros.carbs}
            goal={230}
            color={theme.colors.amber}
            tint="rgba(185, 168, 106, 0.08)"
          />
          <MacroCard
            label="Fat"
            value={macros.fat}
            goal={70}
            color={theme.colors.coral}
            tint="rgba(201, 143, 116, 0.08)"
          />
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
                <View style={styles.logIcon}>
                  <Soup size={20} color={theme.colors.amber} strokeWidth={2.2} />
                </View>
                <View style={styles.logBody}>
                  <Text style={styles.logTitle} numberOfLines={1}>
                    {log.title}
                  </Text>
                  <Text style={styles.logMeta}>
                    {log.macros.protein}g P • {log.macros.carbs}g C • {log.macros.fat}g F
                  </Text>
                </View>
                <View style={styles.logTrailing}>
                  <Text style={styles.logCalories}>{log.calories}</Text>
                  <ChevronRight size={18} color="#98A2B3" />
                </View>
              </View>
            ))
          )}
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
    paddingTop: 12,
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
    alignItems: "center",
    marginBottom: 8
  },
  eyebrow: {
    color: theme.colors.emerald,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase"
  },
  title: {
    marginTop: 1,
    fontSize: 32,
    lineHeight: 36,
    color: theme.colors.ink,
    fontWeight: "900"
  },
  iconBadge: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    backgroundColor: "rgba(94, 140, 97, 0.1)"
  },
  heroPanel: {
    marginTop: 6,
    paddingVertical: 22,
    paddingHorizontal: 18,
    borderRadius: 28,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
    ...theme.shadow
  },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.ink,
    fontWeight: "700"
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
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "500"
  },
  diaryList: {
    gap: 10
  },
  emptyState: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: theme.colors.card,
    ...theme.shadow
  },
  emptyTitle: {
    fontSize: 16,
    color: theme.colors.ink,
    fontWeight: "900"
  },
  emptyCopy: {
    marginTop: 6,
    color: theme.colors.muted,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "600"
  },
  logRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: theme.colors.card,
    ...theme.shadow
  },
  logIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "rgba(185, 168, 106, 0.12)"
  },
  logBody: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 8
  },
  logTitle: {
    fontSize: 16,
    color: theme.colors.ink,
    fontWeight: "700"
  },
  logMeta: {
    marginTop: 4,
    fontSize: 12,
    color: theme.colors.muted,
    fontWeight: "400"
  },
  logTrailing: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  logCalories: {
    color: theme.colors.ink,
    fontSize: 18,
    fontWeight: "900"
  }
});
