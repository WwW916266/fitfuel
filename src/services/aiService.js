const foodProfiles = [
  {
    match: ["chicken rice", "hainanese chicken", "rice chicken"],
    name: "Chicken Rice",
    baseQuantity: "1 plate",
    baseWeightG: 430,
    calories: 620,
    protein: 32,
    carbs: 68,
    fat: 22
  },
  {
    match: ["egg", "eggs", "omelette", "omelet"],
    name: "Whole Egg",
    baseQuantity: "1 large",
    baseWeightG: 50,
    calories: 78,
    protein: 6,
    carbs: 1,
    fat: 5
  },
  {
    match: ["pizza", "slice pizza", "pepperoni"],
    name: "Pizza Slice",
    baseQuantity: "2 slices",
    baseWeightG: 220,
    calories: 560,
    protein: 24,
    carbs: 62,
    fat: 22
  },
  {
    match: ["burger", "cheeseburger", "beef burger"],
    name: "Cheeseburger",
    baseQuantity: "1 burger",
    baseWeightG: 260,
    calories: 650,
    protein: 31,
    carbs: 48,
    fat: 36
  },
  {
    match: ["salmon", "grilled salmon"],
    name: "Grilled Salmon",
    baseQuantity: "1 fillet",
    baseWeightG: 180,
    calories: 410,
    protein: 39,
    carbs: 4,
    fat: 24
  },
  {
    match: ["salad", "caesar", "greens"],
    name: "Mixed Salad",
    baseQuantity: "1 bowl",
    baseWeightG: 280,
    calories: 260,
    protein: 10,
    carbs: 18,
    fat: 16
  },
  {
    match: ["oat", "oats", "oatmeal", "porridge"],
    name: "Oatmeal Bowl",
    baseQuantity: "1 bowl",
    baseWeightG: 250,
    calories: 330,
    protein: 12,
    carbs: 55,
    fat: 8
  },
  {
    match: ["noodle", "noodles", "ramen", "pasta"],
    name: "Noodle Bowl",
    baseQuantity: "1 bowl",
    baseWeightG: 420,
    calories: 540,
    protein: 18,
    carbs: 82,
    fat: 16
  },
  {
    match: ["banana"],
    name: "Banana",
    baseQuantity: "1 medium",
    baseWeightG: 118,
    calories: 105,
    protein: 1,
    carbs: 27,
    fat: 0
  },
  {
    match: ["yogurt", "yoghurt", "greek yogurt"],
    name: "Greek Yogurt",
    baseQuantity: "1 cup",
    baseWeightG: 170,
    calories: 160,
    protein: 18,
    carbs: 12,
    fat: 4
  },
  {
    match: ["rice"],
    name: "Cooked Rice",
    baseQuantity: "1 bowl",
    baseWeightG: 180,
    calories: 235,
    protein: 4,
    carbs: 52,
    fat: 1
  },
  {
    match: ["chicken breast", "grilled chicken"],
    name: "Grilled Chicken Breast",
    baseQuantity: "1 palm-sized piece",
    baseWeightG: 150,
    calories: 248,
    protein: 46,
    carbs: 0,
    fat: 5
  }
];

const nonFoodTerms = [
  "weather",
  "movie",
  "music",
  "homework",
  "code",
  "email",
  "meeting",
  "stock",
  "crypto",
  "travel"
];

function containsFoodSignal(text) {
  const normalized = text.toLowerCase();
  return foodProfiles.some((profile) => profile.match.some((term) => normalized.includes(term)));
}

function looksInvalid(text) {
  const normalized = text.toLowerCase();
  if (!normalized || normalized.length < 2) {
    return true;
  }

  return nonFoodTerms.some((term) => normalized.includes(term)) && !containsFoodSignal(normalized);
}

function inferMultiplier(text, profile) {
  const normalized = text.toLowerCase();
  const direct = normalized.match(/(\d+)\s?(servings?|pieces?|pcs|slices?|bowls?|plates?|burgers?|eggs?|cups?)/);

  if (direct) {
    const amount = Math.min(5, Math.max(0.25, Number(direct[1])));
    const unit = direct[2];

    if (profile.name === "Whole Egg" && /eggs?/.test(unit)) {
      return amount;
    }

    if (profile.name === "Pizza Slice" && /slices?/.test(unit)) {
      return amount / 2;
    }

    if (profile.name === "Greek Yogurt" && /cups?/.test(unit)) {
      return amount;
    }

    if (/bowls?/.test(unit) && ["Oatmeal Bowl", "Noodle Bowl", "Mixed Salad", "Cooked Rice"].includes(profile.name)) {
      return amount;
    }

    if (/plates?/.test(unit) && profile.name === "Chicken Rice") {
      return amount;
    }

    if (/burgers?/.test(unit) && profile.name === "Cheeseburger") {
      return amount;
    }
  }

  if (new RegExp(`two\\s+(large\\s+)?${profile.match[0]}s?`).test(normalized)) {
    return 2;
  }

  if (new RegExp(`three\\s+(large\\s+)?${profile.match[0]}s?`).test(normalized)) {
    return 3;
  }

  if (normalized.includes("half ") || normalized.includes("small ")) {
    return 0.5;
  }

  if (normalized.includes("large ")) {
    return 1.25;
  }

  return 1;
}

function quantityDescription(profile, multiplier) {
  if (multiplier === 1) {
    return profile.baseQuantity;
  }

  if (profile.name === "Whole Egg") {
    return `${Math.round(multiplier)} large`;
  }

  if (profile.name === "Pizza Slice") {
    return `${Math.round(multiplier * 2)} slices`;
  }

  if (multiplier === 0.5) {
    return `half ${profile.baseQuantity}`;
  }

  return `${multiplier} x ${profile.baseQuantity}`;
}

function toParsedItem(profile, multiplier) {
  return {
    name: profile.name,
    quantity_description: quantityDescription(profile, multiplier),
    estimated_weight_g: Math.round(profile.baseWeightG * multiplier),
    calories: Math.round(profile.calories * multiplier),
    protein: Math.round(profile.protein * multiplier),
    carbs: Math.round(profile.carbs * multiplier),
    fat: Math.round(profile.fat * multiplier)
  };
}

function parseItems(userInput) {
  const normalized = userInput.toLowerCase();
  const items = [];

  foodProfiles.forEach((profile) => {
    if (profile.name === "Cooked Rice" && normalized.includes("chicken rice")) {
      return;
    }

    const matched = profile.match.some((term) => normalized.includes(term));
    if (matched && !items.some((item) => item.name === profile.name)) {
      items.push(toParsedItem(profile, inferMultiplier(normalized, profile)));
    }
  });

  return items;
}

function sumMacros(items) {
  return items.reduce(
    (total, item) => ({
      calories: total.calories + item.calories,
      protein_g: total.protein_g + item.protein,
      carbs_g: total.carbs_g + item.carbs,
      fat_g: total.fat_g + item.fat
    }),
    { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 }
  );
}

function buildRecipeVector(macros) {
  if (macros.carbs_g >= 70) {
    return {
      suggested_search_keyword: "lean chicken vegetable dinner",
      required_tag: "high-protein"
    };
  }

  if (macros.fat_g >= 30) {
    return {
      suggested_search_keyword: "low fat high protein bowl",
      required_tag: "high-protein"
    };
  }

  if (macros.protein_g < 20) {
    return {
      suggested_search_keyword: "high protein balanced meal",
      required_tag: "high-protein"
    };
  }

  return {
    suggested_search_keyword: "balanced healthy recipe",
    required_tag: "balanced"
  };
}

function buildCoachResponse(items, macros) {
  const names = items.map((item) => item.name).join(", ");

  if (macros.protein_g >= 30 && macros.calories <= 600) {
    return `Logged ${names}. Nice protein density here; keep the next plate colorful with vegetables or fruit for micronutrient balance.`;
  }

  if (macros.carbs_g >= 70) {
    return `Logged ${names}. This gives you solid energy, and a lean protein plus vegetables at your next meal would balance the day well.`;
  }

  if (macros.fat_g >= 30) {
    return `Logged ${names}. Good consistency tracking this; consider a lighter, high-protein option next to keep calories easier to manage.`;
  }

  return `Logged ${names}. This is a reasonable entry, and your next meal can stay simple with protein, fiber, and plenty of water.`;
}

function invalidResponse() {
  return {
    is_valid_log: false,
    log_type: "error",
    macro_updates: {
      calories: 0,
      protein_g: 0,
      carbs_g: 0,
      fat_g: 0
    },
    parsed_items: [],
    recipe_recommendation_vector: {
      suggested_search_keyword: "",
      required_tag: "none"
    },
    coach_response: "Please enter a meal, snack, drink, or food image description so I can calculate nutrition values for your diary."
  };
}

export async function processUserLogWithCodex(userInput) {
  const safeInput = String(userInput || "").trim();

  await new Promise((resolve) => setTimeout(resolve, 550));

  if (looksInvalid(safeInput)) {
    return invalidResponse();
  }

  const parsedItems = parseItems(safeInput);
  if (parsedItems.length === 0) {
    return invalidResponse();
  }

  const macroUpdates = sumMacros(parsedItems);

  return {
    is_valid_log: true,
    log_type: "diet",
    macro_updates: macroUpdates,
    parsed_items: parsedItems,
    recipe_recommendation_vector: buildRecipeVector(macroUpdates),
    coach_response: buildCoachResponse(parsedItems, macroUpdates)
  };
}
