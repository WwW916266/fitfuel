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
  },
  {
    match: ["nasi lemak"],
    name: "Nasi Lemak",
    baseQuantity: "1 plate",
    baseWeightG: 420,
    calories: 690,
    protein: 24,
    carbs: 82,
    fat: 30
  },
  {
    match: ["laksa"],
    name: "Laksa",
    baseQuantity: "1 bowl",
    baseWeightG: 520,
    calories: 610,
    protein: 23,
    carbs: 68,
    fat: 27
  },
  {
    match: ["sushi"],
    name: "Sushi",
    baseQuantity: "6 pieces",
    baseWeightG: 180,
    calories: 300,
    protein: 14,
    carbs: 48,
    fat: 6
  },
  {
    match: ["sandwich"],
    name: "Sandwich",
    baseQuantity: "1 sandwich",
    baseWeightG: 220,
    calories: 420,
    protein: 22,
    carbs: 46,
    fat: 16
  },
  {
    match: ["coffee", "latte", "milk tea", "bubble tea"],
    name: "Sweetened Cafe Drink",
    baseQuantity: "1 cup",
    baseWeightG: 360,
    calories: 240,
    protein: 7,
    carbs: 36,
    fat: 7
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

const foodIntentTerms = [
  "ate",
  "eat",
  "had",
  "having",
  "breakfast",
  "lunch",
  "dinner",
  "supper",
  "snack",
  "meal",
  "drink",
  "drank",
  "bowl",
  "plate",
  "serving",
  "cup",
  "piece",
  "slice"
];

const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
const GEMINI_MODEL = "gemini-1.5-flash";

const fitFuelLogSchema = {
  type: "OBJECT",
  properties: {
    is_valid_log: { type: "BOOLEAN" },
    log_type: { type: "STRING", enum: ["diet", "error"] },
    macro_updates: {
      type: "OBJECT",
      properties: {
        calories: { type: "INTEGER" },
        protein_g: { type: "INTEGER" },
        carbs_g: { type: "INTEGER" },
        fat_g: { type: "INTEGER" }
      },
      required: ["calories", "protein_g", "carbs_g", "fat_g"]
    },
    parsed_items: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          name: { type: "STRING" },
          quantity_description: { type: "STRING" },
          estimated_weight_g: { type: "INTEGER" },
          calories: { type: "INTEGER" },
          protein: { type: "INTEGER" },
          carbs: { type: "INTEGER" },
          fat: { type: "INTEGER" }
        },
        required: ["name", "quantity_description", "estimated_weight_g", "calories", "protein", "carbs", "fat"]
      }
    },
    recipe_recommendation_vector: {
      type: "OBJECT",
      properties: {
        suggested_search_keyword: { type: "STRING" },
        required_tag: { type: "STRING", enum: ["high-protein", "low-carb", "balanced", "none"] }
      },
      required: ["suggested_search_keyword", "required_tag"]
    },
    coach_response: { type: "STRING" }
  },
  required: [
    "is_valid_log",
    "log_type",
    "macro_updates",
    "parsed_items",
    "recipe_recommendation_vector",
    "coach_response"
  ]
};

const geminiSystemInstruction =
  "You are the FitFuel Diary nutrition scientist. Return only valid JSON matching the provided schema. " +
  "Estimate realistic weights, calories, protein, carbs, and fat. If input is unrelated to food, drink, health, " +
  "or exercise, return an error log with zero macro updates.";

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

function hasFoodIntent(text) {
  const normalized = text.toLowerCase();
  return foodIntentTerms.some((term) => normalized.includes(term)) || containsFoodSignal(normalized);
}

function titleCase(text) {
  return text
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(" ")
    .filter(Boolean)
    .slice(0, 5)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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

function buildGenericEstimate(userInput) {
  const normalized = userInput.toLowerCase();
  const isSmall = normalized.includes("small") || normalized.includes("snack") || normalized.includes("half");
  const isLarge = normalized.includes("large") || normalized.includes("big") || normalized.includes("double");
  const multiplier = isSmall ? 0.65 : isLarge ? 1.25 : 1;
  const name = titleCase(
    normalized
      .replace(/\b(i|ate|eat|had|having|for|breakfast|lunch|dinner|supper|snack|meal|a|an|the)\b/g, "")
      .trim()
  );

  return [
    {
      name: name || "Estimated Meal",
      quantity_description: isSmall ? "small serving" : isLarge ? "large serving" : "1 estimated serving",
      estimated_weight_g: Math.round(360 * multiplier),
      calories: Math.round(520 * multiplier),
      protein: Math.round(24 * multiplier),
      carbs: Math.round(58 * multiplier),
      fat: Math.round(18 * multiplier)
    }
  ];
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
    coach_response: "I could not identify a food from that entry. Try a meal phrase like \"chicken rice\", \"two eggs\", or \"I had laksa for lunch\"."
  };
}

function normalizeGeminiLog(log) {
  const isValid = Boolean(log?.is_valid_log) && log?.log_type === "diet";
  const items = Array.isArray(log?.parsed_items) ? log.parsed_items : [];
  const macros = log?.macro_updates || {};

  if (!isValid) {
    return invalidResponse();
  }

  const normalizedItems = items.map((item) => ({
    name: String(item?.name || "Food item"),
    quantity_description: String(item?.quantity_description || "estimated serving"),
    estimated_weight_g: Math.max(0, Math.round(Number(item?.estimated_weight_g || 0))),
    calories: Math.max(0, Math.round(Number(item?.calories || 0))),
    protein: Math.max(0, Math.round(Number(item?.protein || 0))),
    carbs: Math.max(0, Math.round(Number(item?.carbs || 0))),
    fat: Math.max(0, Math.round(Number(item?.fat || 0)))
  }));

  const summed = sumMacros(normalizedItems);

  return {
    is_valid_log: normalizedItems.length > 0,
    log_type: normalizedItems.length > 0 ? "diet" : "error",
    macro_updates: {
      calories: Math.max(0, Math.round(Number(macros.calories || summed.calories))),
      protein_g: Math.max(0, Math.round(Number(macros.protein_g || summed.protein_g))),
      carbs_g: Math.max(0, Math.round(Number(macros.carbs_g || summed.carbs_g))),
      fat_g: Math.max(0, Math.round(Number(macros.fat_g || summed.fat_g)))
    },
    parsed_items: normalizedItems,
    recipe_recommendation_vector: {
      suggested_search_keyword: String(
        log?.recipe_recommendation_vector?.suggested_search_keyword ||
          buildRecipeVector(summed).suggested_search_keyword
      ),
      required_tag: ["high-protein", "low-carb", "balanced", "none"].includes(
        log?.recipe_recommendation_vector?.required_tag
      )
        ? log.recipe_recommendation_vector.required_tag
        : buildRecipeVector(summed).required_tag
    },
    coach_response: String(log?.coach_response || buildCoachResponse(normalizedItems, summed))
  };
}

function getGeminiOutputText(payload) {
  if (typeof payload?.output_text === "string") {
    return payload.output_text;
  }

  if (typeof payload?.outputText === "string") {
    return payload.outputText;
  }

  if (typeof payload?.text === "string") {
    return payload.text;
  }

  const stepText = payload?.steps
    ?.flatMap((step) => step?.output || step?.outputs || step?.content || [])
    ?.map((part) => part?.text)
    ?.filter(Boolean)
    ?.join("");

  if (stepText) {
    return stepText;
  }

  const legacyText = payload?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("");
  return legacyText || "";
}

async function processWithGemini(userInput) {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch(`${GEMINI_API_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: geminiSystemInstruction }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: `Analyze this FitFuel diary entry: ${userInput}` }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        response_mime_type: "application/json",
        response_schema: fitFuelLogSchema
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini request failed: ${response.status}`);
  }

  const payload = await response.json();
  const outputText = getGeminiOutputText(payload);
  if (!outputText) {
    throw new Error("Gemini returned an empty response");
  }

  return normalizeGeminiLog(JSON.parse(outputText));
}

async function processUserLogLocally(userInput) {
  const safeInput = String(userInput || "").trim();

  await new Promise((resolve) => setTimeout(resolve, 550));

  if (looksInvalid(safeInput)) {
    return invalidResponse();
  }

  const parsedItems = parseItems(safeInput);
  if (parsedItems.length === 0 && !hasFoodIntent(safeInput)) {
    return invalidResponse();
  }

  const finalItems = parsedItems.length > 0 ? parsedItems : buildGenericEstimate(safeInput);
  const macroUpdates = sumMacros(finalItems);

  return {
    is_valid_log: true,
    log_type: "diet",
    macro_updates: macroUpdates,
    parsed_items: finalItems,
    recipe_recommendation_vector: buildRecipeVector(macroUpdates),
    coach_response:
      parsedItems.length > 0
        ? buildCoachResponse(finalItems, macroUpdates)
        : `I estimated ${finalItems[0].name} as a typical mixed meal. You can add details like portion size or ingredients next time for a sharper macro estimate.`
  };
}

export async function processUserLogWithCodex(userInput) {
  const safeInput = String(userInput || "").trim();

  try {
    const geminiResult = await processWithGemini(safeInput);
    if (geminiResult) {
      return geminiResult;
    }
  } catch (error) {
    console.warn("Gemini unavailable, using local parser fallback.", error);
  }

  return processUserLogLocally(safeInput);
}
