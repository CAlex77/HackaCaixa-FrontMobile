// app/_layout.tsx
import { Stack } from "expo-router";
import {
  ThemeProvider as NavThemeProvider,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useThemeCtx } from "@/src/context/ThemeContext";
import ThemeToggle from "@/src/components/ThemeToggle";

function LayoutInner() {
  const { theme } = useThemeCtx();
  const navTheme = theme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <NavThemeProvider value={navTheme}>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShadowVisible: false }}>
        {/* deixe como já estava no seu projeto */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      {/* Botão flutuante global (todas as telas) */}
      <ThemeToggle />
    </NavThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutInner />
    </ThemeProvider>
  );
}
