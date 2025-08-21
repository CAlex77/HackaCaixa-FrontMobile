import { StyleSheet } from "react-native";
import type { AppTheme } from "@/src/context/ThemeContext";

export const getSimpleScreenStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: theme === "dark" ? "#000" : "#fff" },
    container: { flex: 1, padding: 16 },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: theme === "dark" ? "#fff" : "#000",
    },
    text: {
      marginTop: 8,
      color: theme === "dark" ? "#ccc" : "#555",
    },
  });
