import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ChefHat, Clock, Flame } from "lucide-react-native";
import { useAppContext } from "../context/AppContext";

const recipes = [
  {
    title: "Ginger Chicken Lettuce Cups",
    calories: 310,
    protein: 34,
    time: "18 min",
    tags: ["high-protein", "low-carb"]
  },
  {
    title: "Salmon Quinoa Green Bowl",
    calories: 520,
    protein: 38,
    time: "24 min",
    tags: ["omega-3", "balanced"]
  },
  {
    title: "Turkey Avocado Rice Plate",
    calories: 610,
    protein: 42,
    time: "22 min",
    tags: ["high-protein", "meal-prep"]
  },
  {
    title: "Greek Yogurt Berry Crunch",
    calories: 290,
    protein: 23,
    time: "7 min",
    tags: ["breakfast", "high-protein"]
  },
  {
    title: "Tofu Vegetable Noodle Soup",
    calories: 430,
    protein: 24,
    time: "20 min",
    tags: ["plant-forward", "comfort"]
  },
  {
    title: "Egg White Spinach Wrap",
    calories: 360,
    protein: 28,
    time: "12 min",
    tags: ["light", "breakfast"]
  }
];

export default function RecipesScreen() {
  const { dailyGoal, currentIntake } = useAppContext();
  const remaining = Math.max(0, dailyGoal - currentIntake);
  const filteredRecipes = useMemo(
    () => recipes.filter((recipe) => recipe.calories <= remaining || remaining === 0),
    [remaining]
  );
  const visibleRecipes = remaining === 0 ? [] : filteredRecipes;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>Smart recommendations</Text>
          <Text style={styles.title}>Recipes</Text>
        </View>
        <View style={styles.iconBadge}>
          <ChefHat size={23} color="#10A37F" />
        </View>
      </View>

      <View style={styles.budgetPanel}>
        <Text style={styles.budgetLabel}>Remaining calorie budget</Text>
        <Text style={styles.budgetNumber}>{remaining}</Text>
        <Text style={styles.budgetCopy}>Showing meal ideas that fit your day right now.</Text>
      </View>

      <View style={styles.grid}>
        {visibleRecipes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No room for a full recipe right now</Text>
            <Text style={styles.emptyCopy}>Try a zero-calorie drink, a short walk, or adjust your goal in Settings.</Text>
          </View>
        ) : (
          visibleRecipes.map((recipe) => (
            <View key={recipe.title} style={styles.recipeCard}>
              <View style={styles.cardTop}>
                <View style={styles.recipeIcon}>
                  <ChefHat size={20} color="#FFFFFF" />
                </View>
                <View style={styles.calorieBadge}>
                  <Flame size={14} color="#E76F51" />
                  <Text style={styles.calorieBadgeText}>{recipe.calories}</Text>
                </View>
              </View>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <View style={styles.metaRow}>
                <Clock size={15} color="#6F877F" />
                <Text style={styles.metaText}>{recipe.time}</Text>
                <Text style={styles.metaText}>{recipe.protein}g protein</Text>
              </View>
              <View style={styles.tagRow}>
                {recipe.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
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
  budgetPanel: {
    marginTop: 20,
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#103B34"
  },
  budgetLabel: {
    color: "#B8D8CF",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  budgetNumber: {
    marginTop: 6,
    color: "#FFFFFF",
    fontSize: 48,
    lineHeight: 54,
    fontWeight: "900"
  },
  budgetCopy: {
    marginTop: 4,
    color: "#DCF3EB",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  },
  grid: {
    marginTop: 16,
    gap: 12
  },
  recipeCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#143D36",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  recipeIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#10A37F"
  },
  calorieBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#FFF0EA"
  },
  calorieBadgeText: {
    color: "#B94A30",
    fontSize: 12,
    fontWeight: "900"
  },
  recipeTitle: {
    marginTop: 14,
    fontSize: 18,
    lineHeight: 24,
    color: "#133D36",
    fontWeight: "900"
  },
  metaRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  metaText: {
    color: "#6F877F",
    fontSize: 13,
    fontWeight: "800"
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14
  },
  tag: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#EAF5F0"
  },
  tagText: {
    color: "#20735F",
    fontSize: 11,
    fontWeight: "900"
  },
  emptyState: {
    padding: 18,
    borderRadius: 8,
    backgroundColor: "#FFFFFF"
  },
  emptyTitle: {
    color: "#143D36",
    fontSize: 17,
    fontWeight: "900"
  },
  emptyCopy: {
    marginTop: 7,
    color: "#657F76",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  }
});
