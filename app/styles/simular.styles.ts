import { StyleSheet, Dimensions } from "react-native";
import type { AppTheme } from "@/src/context/ThemeContext";

const { height: H } = Dimensions.get("window");

export const getSimularStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safe: { flex: 1, backgroundColor: theme === "dark" ? "#000" : "#fff" },

    // Área rolável principal
    scrollContainer: {
      padding: 16,
      paddingBottom: 24, // espaço p/ teclado / barras
    },

    container: {
      width: "100%",
      maxWidth: 900,
      alignSelf: "center",
      gap: 12,
      flexGrow: 1,
    },

    center: { alignItems: "center", justifyContent: "center", flex: 1 },
    loadingTxt: {
      color: theme === "dark" ? "#fff" : "#000",
      marginTop: 8,
    },

    // 🔻 área flexível para o resultado
    resultArea: { flexGrow: 1, gap: 10 },

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
    btnSecondary: { backgroundColor: "#444" },
    btnTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },
    error: { color: "#ff5a5f", fontSize: 12, fontWeight: "600" },

    // Cards
    card: {
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#e5e5e5",
      backgroundColor: theme === "dark" ? "#111" : "#fafafa",
      padding: 12,
    },
    cardScrollable: {
      minHeight: 160,
      maxHeight: H * 0.45, // impede ficar gigante em telas menores
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#e5e5e5",
      backgroundColor: theme === "dark" ? "#111" : "#fafafa",
      padding: 12,
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

    pageControls: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
      gap: 12,
    },
    pageIndicator: {
      color: theme === "dark" ? "#fff" : "#000",
      fontWeight: "600",
    },

    // Modal
    modalScrim: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0,0,0,0.45)",
      justifyContent: "center",
      alignItems: "center",
      padding: 12,
    },
    modalBox: {
      width: "100%",
      maxWidth: 420,
      maxHeight: H * 0.6, // <= controla altura da janela
      borderRadius: 12,
      padding: 12,
      backgroundColor: theme === "dark" ? "#111" : "#fff",
      borderWidth: 1,
      borderColor: theme === "dark" ? "#333" : "#e5e5e5",
      overflow: "hidden", // garante clip da lista
      gap: 8,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    modalTitle: {
      fontWeight: "700",
      fontSize: 16,
      color: theme === "dark" ? "#fff" : "#000",
    },
    modalList: {
      flexGrow: 0, // não tenta ocupar infinito
      maxHeight: H * 0.7, // lista rola dentro do modal
    },
    modalItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme === "dark" ? "#222" : "#eee",
      paddingHorizontal: 4,
    },
    modalItemTxt: { color: theme === "dark" ? "#fff" : "#000" },
    close: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: theme === "dark" ? "#222" : "#eee",
    },
    closeTxt: { color: theme === "dark" ? "#fff" : "#000", fontWeight: "600" },
  });
