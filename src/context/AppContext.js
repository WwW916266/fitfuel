import React, { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

const emptyMacros = { protein: 0, carbs: 0, fat: 0 };

export function AppProvider({ children }) {
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [currentIntake, setCurrentIntake] = useState(0);
  const [macros, setMacros] = useState(emptyMacros);
  const [logs, setLogs] = useState([]);

  const addMealLog = (mealData) => {
    const items = mealData?.analyzed_meal?.identified_items || [];
    const totalCalories =
      mealData?.analyzed_meal?.total_meal_calories ||
      items.reduce((sum, item) => sum + Number(item.calories || 0), 0);

    const mealMacros = items.reduce(
      (acc, item) => ({
        protein: acc.protein + Number(item.protein || 0),
        carbs: acc.carbs + Number(item.carbs || 0),
        fat: acc.fat + Number(item.fat || 0)
      }),
      emptyMacros
    );

    const logEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      category: mealData?.category || "diet",
      title: items.map((item) => item.name).join(", ") || "Meal log",
      calories: Math.round(totalCalories),
      macros: {
        protein: Math.round(mealMacros.protein),
        carbs: Math.round(mealMacros.carbs),
        fat: Math.round(mealMacros.fat)
      },
      details: mealData
    };

    setCurrentIntake((value) => Math.max(0, Math.round(value + totalCalories)));
    setMacros((value) => ({
      protein: Math.max(0, Math.round(value.protein + mealMacros.protein)),
      carbs: Math.max(0, Math.round(value.carbs + mealMacros.carbs)),
      fat: Math.max(0, Math.round(value.fat + mealMacros.fat))
    }));
    setLogs((value) => [logEntry, ...value]);

    return logEntry;
  };

  const value = useMemo(
    () => ({
      dailyGoal,
      setDailyGoal,
      currentIntake,
      macros,
      logs,
      addMealLog
    }),
    [dailyGoal, currentIntake, macros, logs]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
