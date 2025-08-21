import { StyleSheet } from "react-native";
import type { AppTheme } from "@/src/context/ThemeContext";

export const getSimularStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: theme === "dark" ? "#000" : "#fff" },
    container: {
      flex: 1,
      padding: 16,
      width: "100%",
      maxWidth: 900,
      alignSelf: "center",
      gap: 12,
    },
    // 🔻 área flexível para o resultado (abaixo do formulário)
    resultArea: { flex: 1 },

    title: {
      fontSize: 20,
      fontWeight: "700",
      color: theme === "dark" ? "#fff" : "#000",
      textAlign: "center",
      marginBottom: 8,
    },
    label: { fontWeight: "600", color: theme === "dark" ? "#ddd" : "#333" },
    input: {
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#e5e5e5",
      backgroundColor: theme === "dark" ? "#111" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 10,
    },
    row: { flexDirection: "row", gap: 12 },
    col: { flex: 1 },
    select: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme === "dark" ? "#333" : "#e5e5e5",
      backgroundColor: theme === "dark" ? "#111" : "#fff",
      paddingHorizontal: 12,
      paddingVertical: 14,
    },
    selectText: { color: theme === "dark" ? "#fff" : "#000" },
    btn: {
      marginTop: 8,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      backgroundColor: "#0a84ff",
    },
    btnTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },
    error: { color: "#ff5a5f", fontSize: 12, fontWeight: "600" },

    // card “normal” (autoaltura)
    card: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#e5e5e5",
      backgroundColor: theme === "dark" ? "#111" : "#fafafa",
      padding: 12,
    },
    // 🔻 card que vai conter a FlatList rolável
    cardScrollable: {
      flex: 1, // dá altura para a lista rolar
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#e5e5e5",
      backgroundColor: theme === "dark" ? "#111" : "#fafafa",
      padding: 12,
      minHeight: 160, // ajuda em telas pequenas
    },

    cardTitle: {
      fontWeight: "700",
      color: theme === "dark" ? "#fff" : "#000",
      marginBottom: 6,
    },
    line: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 4,
    },
    lineLabel: { color: theme === "dark" ? "#ccc" : "#555" },
    lineValue: { color: theme === "dark" ? "#fff" : "#000", fontWeight: "600" },
    listHeader: {
      fontWeight: "700",
      marginTop: 8,
      color: theme === "dark" ? "#fff" : "#000",
    },
    itemRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme === "dark" ? "#222" : "#eee",
    },
    itemTxt: { color: theme === "dark" ? "#ddd" : "#333" },

    modalScrim: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalBox: {
      width: "90%",
      maxWidth: 420,
      borderRadius: 12,
      padding: 12,
      backgroundColor: theme === "dark" ? "#111" : "#fff",
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#e5e5e5",
    },
    modalItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme === "dark" ? "#222" : "#eee",
    },
    modalItemTxt: { color: theme === "dark" ? "#fff" : "#000" },
    close: {
      alignSelf: "flex-end",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: theme === "dark" ? "#222" : "#eee",
      marginBottom: 8,
    },
    closeTxt: { color: theme === "dark" ? "#fff" : "#000", fontWeight: "600" },
  });
