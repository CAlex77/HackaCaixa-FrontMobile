import { SafeAreaView, View, Text } from "react-native";
import { useThemeCtx } from "@/src/context/ThemeContext";
import { getSimpleScreenStyles } from "../styles/simpleScreen.styles";

export default function ListaProdutos() {
  const { theme } = useThemeCtx();
  const styles = getSimpleScreenStyles(theme);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Produtos Cadastrados</Text>
        <Text style={styles.text}>
          (Listagem virá aqui, consumindo GET /produtos)
        </Text>
      </View>
    </SafeAreaView>
  );
}
