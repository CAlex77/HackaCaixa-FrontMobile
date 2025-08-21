import { StyleSheet } from "react-native";
import type { AppTheme } from "@/src/context/ThemeContext";

export const getFormStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: theme === "dark" ? "#000" : "#fff" },
    container: {
      flex: 1,
      padding: 16,
      width: "100%",
      maxWidth: 600,
      alignSelf: "center",
      gap: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: theme === "dark" ? "#fff" : "#000",
      textAlign: "center",
      marginBottom: 8,
    },
    fieldLabel: {
      color: theme === "dark" ? "#ddd" : "#333",
      fontWeight: "600",
      marginTop: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#e5e5e5",
      backgroundColor: theme === "dark" ? "#111" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 10,
    },
    hint: {
      color: theme === "dark" ? "#aaa" : "#666",
      fontSize: 12,
    },
    error: {
      color: "#ff5a5f",
      fontSize: 12,
      marginTop: 2,
      fontWeight: "600",
    },
    submit: {
      marginTop: 12,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: "#0a84ff",
    },
    submitText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 16,
    },
    row: { flexDirection: "row", gap: 12 },
    col: { flex: 1 },
  });
