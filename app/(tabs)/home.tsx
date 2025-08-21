import { SafeAreaView, View, Text, Pressable, FlatList } from "react-native";
import { router, type Href } from "expo-router";
import { useThemeCtx } from "@/src/context/ThemeContext";
import { getHomeStyles } from "../styles/home.styles";

type Action = { id: string; title: string; description: string; href: Href };

const actions: Action[] = [
  {
    id: "create",
    title: "Cadastrar Produto",
    description: "Nome, taxa anual (%) e prazo máximo",
    href: "/(tabs)/novo",
  },
  {
    id: "list",
    title: "Listar Produtos",
    description: "Ver produtos cadastrados (GET /produtos)",
    href: "/(tabs)/listar",
  },
  {
    id: "sim",
    title: "Simular Empréstimo",
    description: "Valor, meses e memória de cálculo",
    href: "/(tabs)/simulacao",
  },
];

export default function Home() {
  const { theme } = useThemeCtx();
  const styles = getHomeStyles(theme);

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
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
