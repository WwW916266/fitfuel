import React, { useMemo } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { ChefHat, Clock, Flame } from "lucide-react-native";
import { useAppContext } from "../context/AppContext";
import { theme } from "../theme";

const recipes = [
  {
    title: "Ginger Chicken Lettuce Cups",
    calories: 310,
    protein: 34,
    time: "18 min",
    tags: ["high-protein", "low-carb"],
    image:
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Salmon Quinoa Green Bowl",
    calories: 520,
    protein: 38,
    time: "24 min",
    tags: ["omega-3", "balanced"],
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Turkey Avocado Rice Plate",
    calories: 610,
    protein: 42,
    time: "22 min",
    tags: ["high-protein", "meal-prep"],
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Greek Yogurt Berry Crunch",
    calories: 290,
    protein: 23,
    time: "7 min",
    tags: ["breakfast", "high-protein"],
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Tofu Vegetable Noodle Soup",
    calories: 430,
    protein: 24,
    time: "20 min",
    tags: ["plant-forward", "comfort"],
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Egg White Spinach Wrap",
    calories: 360,
    protein: 28,
    time: "12 min",
    tags: ["light", "breakfast"],
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80"
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
      <View style={styles.inner}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Smart recommendations</Text>
            <Text style={styles.title}>Recipes</Text>
          </View>
          <View style={styles.iconBadge}>
            <ChefHat size={23} color={theme.colors.emerald} />
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
              <View style={styles.imageWrap}>
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
              </View>
              <View style={styles.recipeBody}>
                <View style={styles.cardTop}>
                  <View style={styles.calorieBadge}>
                    <Flame size={14} color="#E76F51" />
                    <Text style={styles.calorieBadgeText}>{recipe.calories}</Text>
                  </View>
                </View>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <View style={styles.metaRow}>
                  <Clock size={15} color={theme.colors.muted} />
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
  budgetPanel: {
    marginTop: 20,
    padding: 20,
    borderRadius: 28,
    backgroundColor: "#0F2F2B",
    ...theme.shadow
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
    minHeight: 154,
    flexDirection: "row",
    gap: 14,
    padding: 12,
    borderRadius: 24,
    backgroundColor: theme.colors.card,
    ...theme.shadow
  },
  imageWrap: {
    width: 126,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#ECFDF5"
  },
  recipeImage: {
    width: "100%",
    height: "100%"
  },
  recipeBody: {
    flex: 1,
    minHeight: 130,
    justifyContent: "center"
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  calorieBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#FFF0EA"
  },
  calorieBadgeText: {
    color: "#B94A30",
    fontSize: 12,
    fontWeight: "900"
  },
  recipeTitle: {
    marginTop: 10,
    fontSize: 18,
    lineHeight: 24,
    color: theme.colors.ink,
    fontWeight: "900"
  },
  metaRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  metaText: {
    color: theme.colors.muted,
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
    borderRadius: 999,
    backgroundColor: "#ECFDF5"
  },
  tagText: {
    color: theme.colors.emerald,
    fontSize: 11,
    fontWeight: "900"
  },
  emptyState: {
    padding: 18,
    borderRadius: 24,
    backgroundColor: theme.colors.card,
    ...theme.shadow
  },
  emptyTitle: {
    color: theme.colors.ink,
    fontSize: 17,
    fontWeight: "900"
  },
  emptyCopy: {
    marginTop: 7,
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  }
});
