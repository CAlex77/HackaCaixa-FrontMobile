import { SafeAreaView, View, Text } from "react-native";
import { useThemeCtx } from "@/src/context/ThemeContext";
import { getSimpleScreenStyles } from "../styles/simpleScreen.styles";

export default function NovoProduto() {
  const { theme } = useThemeCtx();
  const styles = getSimpleScreenStyles(theme);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar Produto</Text>
        <Text style={styles.text}>
          (Formulário virá aqui: nome, taxa anual (%), prazo máximo em meses)
        </Text>
      </View>
    </SafeAreaView>
  );
}
