// app/login.tsx
import { SafeAreaView, View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { loginStyles as styles } from "./styles/login.styles";

export default function LoginScreen() {
  const goHome = () => router.replace("/home");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/bank-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Pressable style={styles.primaryButton} onPress={goHome}>
          <Text style={styles.primaryText}>Usar senha do celular</Text>
        </Pressable>

        <Pressable onPress={goHome}>
          <Text style={styles.secondaryText}>Usar a senha do banco</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
