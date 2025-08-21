import { SafeAreaView, View, Text } from "react-native";

export default function Simulacao() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          Simular Empréstimo
        </Text>
        <Text style={{ marginTop: 8, opacity: 0.8 }}>
          (Formulário virá aqui: selecionar produto, valor, meses + resultado)
        </Text>
      </View>
    </SafeAreaView>
  );
}
