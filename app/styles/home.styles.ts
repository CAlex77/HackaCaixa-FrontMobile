import { StyleSheet } from "react-native";
import type { AppTheme } from "@/src/context/ThemeContext";

export const getHomeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: theme === "dark" ? "#000" : "#fff" },
    container: {
      flex: 1,
      padding: 16,
      width: "100%",
      maxWidth: 980,
      alignSelf: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      textAlign: "center",
      marginTop: 8,
      color: theme === "dark" ? "#fff" : "#000",
    },
    subtitle: {
      textAlign: "center",
      marginTop: 4,
      marginBottom: 12,
      color: theme === "dark" ? "#aaa" : "#555",
    },
    list: { gap: 12, paddingVertical: 8 },
    card: {
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#e5e5e5",
      padding: 16,
      backgroundColor: theme === "dark" ? "#111" : "#fafafa",
    },
    cardTitle: {
      fontWeight: "700",
      fontSize: 16,
      marginBottom: 6,
      color: theme === "dark" ? "#fff" : "#000",
    },
    cardDescription: {
      color: theme === "dark" ? "#ccc" : "#666",
      lineHeight: 20,
    },
  });
