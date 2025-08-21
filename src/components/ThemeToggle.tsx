import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeCtx } from "@/src/context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ThemeToggle({ style }: { style?: ViewStyle }) {
  const { theme, toggleTheme } = useThemeCtx();
  const dark = theme === "dark";
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Alternar tema"
      onPress={toggleTheme}
      style={[
        styles.fab,
        dark ? styles.fabDark : styles.fabLight,
        style,
        { top: insets.top + 12 }, // 🔹 ajusta pela altura do status bar
      ]}
    >
      <Ionicons
        name={dark ? "eye-off-outline" : "eye-outline"}
        size={20}
        color={dark ? "#fff" : "#000"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  fabLight: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  fabDark: {
    backgroundColor: "rgba(0,0,0,0.6)",
    borderWidth: 1,
    borderColor: "#333",
  },
});
