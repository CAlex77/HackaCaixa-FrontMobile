// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      {/* login sem header */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      {/* grupo de tabs usa o layout próprio */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* demais telas/modais do template já são detectadas automaticamente */}
    </Stack>
  );
}
