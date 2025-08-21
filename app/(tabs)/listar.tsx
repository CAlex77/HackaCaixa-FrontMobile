// app/(tabs)/listar.tsx
import { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useThemeCtx } from "@/src/context/ThemeContext";
import { getSimpleScreenStyles } from "../styles/simpleScreen.styles";
import { produtosApi, type Produto } from "@/src/services/produtos.service";

export default function ListaProdutos() {
  const { theme } = useThemeCtx();
  const styles = getSimpleScreenStyles(theme);

  const [data, setData] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const load = useCallback(async () => {
    setErro(null);
    try {
      const itens = await produtosApi.listar();
      setData(itens as Produto[]);
    } catch (e: any) {
      setErro(e?.message ?? "Falha ao carregar produtos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <ActivityIndicator />
          <Text style={styles.text}>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Produtos Cadastrados</Text>

        {erro ? (
          <Text style={[styles.text, { color: "#ff5a5f" }]}>{erro}</Text>
        ) : null}

        {data.length === 0 ? (
          <Text style={styles.text}>
            Nenhum produto encontrado. Cadastre o primeiro em “Novo Produto”.
          </Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme === "dark" ? "#fff" : "#000"}
              />
            }
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={({ item }) => (
              <View
                style={{
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme === "dark" ? "#333" : "#e5e5e5",
                  backgroundColor: theme === "dark" ? "#111" : "#fafafa",
                  padding: 12,
                }}
              >
                <Text
                  style={{
                    color: theme === "dark" ? "#fff" : "#000",
                    fontWeight: "700",
                  }}
                >
                  {item.nome}
                </Text>
                <Text style={{ color: theme === "dark" ? "#ccc" : "#555" }}>
                  Taxa anual: {item.taxaJurosAnual}% • Prazo máx.:{" "}
                  {item.prazoMaximoMeses} meses
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
