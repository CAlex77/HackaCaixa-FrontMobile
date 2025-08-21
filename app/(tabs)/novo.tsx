import { SafeAreaView, View, Text } from "react-native";

export default function NovoProduto() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          Cadastrar Produto
        </Text>
        <Text style={{ marginTop: 8, opacity: 0.8 }}>
          (Formulário virá aqui: nome, taxa anual (%), prazo máximo em meses)
        </Text>
      </View>
    </SafeAreaView>
  );
}
