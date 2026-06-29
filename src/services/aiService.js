const nutritionDictionary = [
  {
    match: ["chicken rice", "hainanese chicken", "rice chicken"],
    item: { name: "Chicken rice", calories: 620, protein: 32, carbs: 68, fat: 22 },
    keyword: "lighter chicken rice bowl"
  },
  {
    match: ["egg", "eggs", "omelette", "omelet"],
    item: { name: "Eggs", calories: 156, protein: 13, carbs: 1, fat: 11 },
    keyword: "high protein egg breakfast"
  },
  {
    match: ["pizza", "slice pizza", "pepperoni"],
    item: { name: "Pizza", calories: 560, protein: 24, carbs: 62, fat: 22 },
    keyword: "low calorie flatbread pizza"
  },
  {
    match: ["burger", "cheeseburger", "beef burger"],
    item: { name: "Burger", calories: 650, protein: 31, carbs: 48, fat: 36 },
    keyword: "lean high protein burger bowl"
  },
  {
    match: ["salmon", "grilled salmon"],
    item: { name: "Grilled salmon", calories: 410, protein: 39, carbs: 4, fat: 24 },
    keyword: "salmon vegetable dinner"
  },
  {
    match: ["salad", "caesar", "greens"],
    item: { name: "Mixed salad", calories: 260, protein: 10, carbs: 18, fat: 16 },
    keyword: "high protein salad"
  },
  {
    match: ["oat", "oats", "oatmeal", "porridge"],
    item: { name: "Oatmeal bowl", calories: 330, protein: 12, carbs: 55, fat: 8 },
    keyword: "overnight oats protein"
  },
  {
    match: ["noodle", "noodles", "ramen", "pasta"],
    item: { name: "Noodle bowl", calories: 540, protein: 18, carbs: 82, fat: 16 },
    keyword: "vegetable noodle soup"
  },
  {
    match: ["banana"],
    item: { name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
    keyword: "banana protein snack"
  },
  {
    match: ["yogurt", "yoghurt", "greek yogurt"],
    item: { name: "Greek yogurt", calories: 160, protein: 18, carbs: 12, fat: 4 },
    keyword: "greek yogurt parfait"
  }
];

const fallbackMeals = [
  { name: "Balanced meal estimate", calories: 430, protein: 24, carbs: 46, fat: 16 },
  { name: "Cafe meal estimate", calories: 520, protein: 27, carbs: 58, fat: 19 },
  { name: "Light plate estimate", calories: 360, protein: 20, carbs: 38, fat: 13 }
];

function titleCase(text) {
  return text
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function inferQuantity(text, itemName) {
  const normalized = text.toLowerCase();
  const directNumber = normalized.match(/(\d+)\s?(servings?|pieces?|pcs|slices?|bowls?|plates?|eggs?)/);
  if (directNumber) {
    return Math.min(4, Math.max(1, Number(directNumber[1])));
  }

  if (normalized.includes("two ") || normalized.includes("double ")) {
    return 2;
  }

  if (normalized.includes("half ") || normalized.includes("small ")) {
    return 0.5;
  }

  if (normalized.includes("large ") && !itemName.toLowerCase().includes("salad")) {
    return 1.25;
  }

  return 1;
}

function buildItems(userInput) {
  const normalized = userInput.toLowerCase();
  const matched = [];

  nutritionDictionary.forEach((entry) => {
    const didMatch = entry.match.some((keyword) => normalized.includes(keyword));
    if (didMatch) {
      const quantity = inferQuantity(normalized, entry.item.name);
      matched.push({
        name: quantity === 1 ? entry.item.name : `${quantity} x ${entry.item.name}`,
        calories: Math.round(entry.item.calories * quantity),
        protein: Math.round(entry.item.protein * quantity),
        carbs: Math.round(entry.item.carbs * quantity),
        fat: Math.round(entry.item.fat * quantity),
        keyword: entry.keyword
      });
    }
  });

  if (matched.length > 0) {
    return matched;
  }

  const fallback = fallbackMeals[Math.abs(userInput.length) % fallbackMeals.length];
  return [
    {
      ...fallback,
      name: userInput.trim().length > 2 ? titleCase(userInput.trim().slice(0, 32)) : fallback.name,
      keyword: "balanced healthy dinner"
    }
  ];
}

function makeFeedback(items, totalCalories) {
  const protein = items.reduce((sum, item) => sum + item.protein, 0);
  const carbs = items.reduce((sum, item) => sum + item.carbs, 0);
  const fat = items.reduce((sum, item) => sum + item.fat, 0);

  if (protein >= 30 && totalCalories <= 550) {
    return "Strong protein choice with a controlled calorie load, which should help fullness and recovery.";
  }

  if (fat > 30 || totalCalories > 650) {
    return "Good log; consider pairing your next meal with lean protein and vegetables to keep the day balanced.";
  }

  if (carbs > 70) {
    return "Nice energy-focused meal; adding extra protein later can make the day feel steadier.";
  }

  return "Logged successfully with a balanced estimate, and your next meal can stay simple and nutrient-dense.";
}

export async function processUserLogWithCodex(userInput) {
  const safeInput = String(userInput || "").trim();
  const itemsWithKeywords = buildItems(safeInput);
  const identifiedItems = itemsWithKeywords.map(({ keyword, ...item }) => item);
  const total = identifiedItems.reduce((sum, item) => sum + item.calories, 0);
  const keyword = itemsWithKeywords[0]?.keyword || "balanced healthy recipe";
  const recommendedMax = total > 600 ? 450 : 550;

  await new Promise((resolve) => setTimeout(resolve, 550));

  return {
    category: "diet",
    analyzed_meal: {
      identified_items: identifiedItems,
      total_meal_calories: Math.round(total)
    },
    recipe_api_payload: {
      search_keyword: keyword,
      target_max_calories: recommendedMax
    },
    coach_feedback: makeFeedback(identifiedItems, total)
  };
}
