import { SafeAreaView, View, Text } from "react-native";

export default function ListaProdutos() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          Produtos Cadastrados
        </Text>
        <Text style={{ marginTop: 8, opacity: 0.8 }}>
          (Listagem virá aqui, consumindo GET /produtos)
        </Text>
      </View>
    </SafeAreaView>
  );
}
