import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useThemeCtx } from "@/src/context/ThemeContext";
import { getFormStyles } from "../styles/form.styles";
import {
  produtosApi,
  type ProdutoInput,
} from "@/src/services/produtos.service";
import { router } from "expo-router";

export default function NovoProduto() {
  const { theme } = useThemeCtx();
  const styles = getFormStyles(theme);

  const [nome, setNome] = useState("");
  const [taxa, setTaxa] = useState<string>("");
  const [prazo, setPrazo] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    nome?: string;
    taxa?: string;
    prazo?: string;
  }>({});

  function validar(): boolean {
    const e: typeof errors = {};
    if (!nome.trim()) e.nome = "Informe o nome do produto";
    const taxaNum = Number(taxa.replace(",", "."));
    if (isNaN(taxaNum) || taxaNum <= 0)
      e.taxa = "Taxa anual deve ser um número maior que 0";
    const prazoNum = Number(prazo);
    if (!Number.isInteger(prazoNum) || prazoNum <= 0)
      e.prazo = "Prazo deve ser um inteiro maior que 0";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit() {
    if (!validar()) return;
    setLoading(true);
    try {
      const payload: ProdutoInput = {
        nome: nome.trim(),
        taxaJurosAnual: Number(taxa.replace(",", ".")),
        prazoMaximoMeses: Number(prazo),
      };
      await produtosApi.criar(payload);
      Alert.alert("Sucesso", "Produto cadastrado!", [
        { text: "OK", onPress: () => router.push("/(tabs)/listar") },
      ]);
    } catch (err: any) {
      Alert.alert("Erro", err?.message ?? "Falha ao cadastrar produto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Cadastrar Produto</Text>

        <Text style={styles.fieldLabel}>Nome do produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex.: Crédito Pessoal"
          placeholderTextColor={theme === "dark" ? "#777" : "#999"}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="sentences"
          returnKeyType="next"
        />
        {errors.nome ? <Text style={styles.error}>{errors.nome}</Text> : null}

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.fieldLabel}>Taxa de juros anual (%)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: 24.9"
              placeholderTextColor={theme === "dark" ? "#777" : "#999"}
              value={taxa}
              onChangeText={setTaxa}
              keyboardType="decimal-pad"
              returnKeyType="next"
            />
            <Text style={styles.hint}>Use ponto ou vírgula</Text>
            {errors.taxa ? (
              <Text style={styles.error}>{errors.taxa}</Text>
            ) : null}
          </View>

          <View style={styles.col}>
            <Text style={styles.fieldLabel}>Prazo máximo (meses)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex.: 48"
              placeholderTextColor={theme === "dark" ? "#777" : "#999"}
              value={prazo}
              onChangeText={(v) => setPrazo(v.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
              returnKeyType="done"
            />
            {errors.prazo ? (
              <Text style={styles.error}>{errors.prazo}</Text>
            ) : null}
          </View>
        </View>

        <Pressable
          style={[styles.submit, loading && { opacity: 0.6 }]}
          onPress={onSubmit}
          disabled={loading}
        >
          <Text style={styles.submitText}>
            {loading ? "Enviando..." : "Cadastrar"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
