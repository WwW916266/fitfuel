import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Bot, ChefHat, Home, Settings } from "lucide-react-native";
import { AppProvider } from "./src/context/AppContext";
import DashboardScreen from "./src/screens/DashboardScreen";
import AiLogScreen from "./src/screens/AiLogScreen";
import RecipesScreen from "./src/screens/RecipesScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const tabs = [
  { id: "dashboard", label: "Today", icon: Home, screen: DashboardScreen },
  { id: "log", label: "AI Log", icon: Bot, screen: AiLogScreen },
  { id: "recipes", label: "Recipes", icon: ChefHat, screen: RecipesScreen },
  { id: "settings", label: "Settings", icon: Settings, screen: SettingsScreen }
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const ActiveScreen = tabs.find((tab) => tab.id === activeTab)?.screen || DashboardScreen;

  return (
    <AppProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.appShell}>
          <ActiveScreen />
          <View style={styles.tabBar}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTab;
              return (
                <TouchableOpacity
                  key={tab.id}
                  activeOpacity={0.8}
                  onPress={() => setActiveTab(tab.id)}
                  style={[styles.tabItem, isActive && styles.tabItemActive]}
                >
                  <Icon size={22} color={isActive ? "#FFFFFF" : "#68857D"} strokeWidth={2.3} />
                  <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F8F5"
  },
  appShell: {
    flex: 1,
    backgroundColor: "#F4F8F5"
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginBottom: 12,
    padding: 8,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    shadowColor: "#163A33",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12
  },
  tabItem: {
    flex: 1,
    minHeight: 58,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18
  },
  tabItemActive: {
    backgroundColor: "#10A37F"
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 14,
    color: "#68857D",
    fontWeight: "700"
  },
  tabLabelActive: {
    color: "#FFFFFF"
  }
});
