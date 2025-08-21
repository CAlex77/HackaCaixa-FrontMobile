// app/home.tsx
import { SafeAreaView, View, Text, Pressable, FlatList } from "react-native";
import { router, type Href } from "expo-router";
import { homeStyles as styles } from "../styles/home.styles";
import { Ionicons } from "@expo/vector-icons";


type Action = {
  id: string;
  title: string;
  description: string;
  href: Href;
  icon: keyof typeof Ionicons.glyphMap;
};

const actions: Action[] = [
  {
    id: "create",
    title: "Cadastrar Produto",
    description: "Nome, taxa anual (%) e prazo máximo",
    href: "/(tabs)/novo",
    icon: "add-circle-outline",
  },
  {
    id: "list",
    title: "Listar Produtos",
    description: "Ver produtos cadastrados (GET /produtos)",
    href: "/(tabs)/listar",
    icon: "list-outline",
  },
  {
    id: "sim",
    title: "Simular Empréstimo",
    description: "Valor, meses e memória de cálculo",
    href: "/(tabs)/simulacao",
    icon: "calculator-outline",
  },
];


export default function Home() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Simulador de Crédito</Text>
        <Text style={styles.subtitle}>O que você deseja fazer?</Text>

        <FlatList
          data={actions}
          keyExtractor={(i) => i.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(item.href)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Ionicons
                  name={item.icon}
                  size={20}
                  color="#333"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
