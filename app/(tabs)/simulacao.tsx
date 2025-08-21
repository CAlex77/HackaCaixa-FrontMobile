import { SafeAreaView, View, Text } from "react-native";
import { useThemeCtx } from "@/src/context/ThemeContext";
import { getSimpleScreenStyles } from "../styles/simpleScreen.styles";

export default function Simulacao() {
  const { theme } = useThemeCtx();
  const styles = getSimpleScreenStyles(theme);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Simular Empréstimo</Text>
        <Text style={styles.text}>
          (Formulário virá aqui: selecionar produto, valor, meses + resultado)
        </Text>
      </View>
    </SafeAreaView>
  );
}
