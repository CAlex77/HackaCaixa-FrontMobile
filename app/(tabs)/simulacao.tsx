import { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useThemeCtx } from "@/src/context/ThemeContext";
import { getSimularStyles } from "../styles/simular.styles";
import { produtosApi, type Produto } from "@/src/services/produtos.service";
import {
  annualToMonthly,
  gerarMemoria,
  fmtMoeda,
  fmtPct,
  type ParcelaLinha,
} from "@/src/utils/finance";

const PAGE_SIZE = 12;

export default function Simulacao() {
  const { theme } = useThemeCtx();
  const styles = getSimularStyles(theme);

  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erroProdutos, setErroProdutos] = useState<string | null>(null);

  const [produtoSel, setProdutoSel] = useState<Produto | null>(null);
  const [valor, setValor] = useState<string>("");
  const [meses, setMeses] = useState<string>("");

  const [abrirModal, setAbrirModal] = useState(false);

  const [resultado, setResultado] = useState<{
    taxaMensal: number;
    parcela: number;
    total: number;
    schedule: ParcelaLinha[];
  } | null>(null);

  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const itens = await produtosApi.listar();
        setProdutos(itens as Produto[]);
        if ((itens as Produto[]).length) setProdutoSel((itens as Produto[])[0]);
      } catch (e: any) {
        setErroProdutos(e?.message ?? "Falha ao carregar produtos");
      } finally {
        setLoadingProdutos(false);
      }
    })();
  }, []);

  function validar(): string | null {
    if (!produtoSel) return "Selecione um produto";
    const v = Number(valor.replace(/\./g, "").replace(",", "."));
    if (isNaN(v) || v <= 0) return "Informe um valor válido";
    const m = Number(meses);
    if (!Number.isInteger(m) || m <= 0) return "Informe meses (inteiro > 0)";
    if (m > produtoSel.prazoMaximoMeses)
      return `Prazo máximo do produto: ${produtoSel.prazoMaximoMeses} meses`;
    return null;
  }

  function simular() {
    const erro = validar();
    if (erro) {
      setResultado(null);
      alert(erro);
      return;
    }
    const v = Number(valor.replace(/\./g, "").replace(",", "."));
    const m = Number(meses);
    const i = annualToMonthly(produtoSel!.taxaJurosAnual);
    const { parcela, totalComJuros, schedule } = gerarMemoria(v, i, m);

    setResultado({
      taxaMensal: i,
      parcela,
      total: totalComJuros,
      schedule,
    });
    setPage(1);
  }

  const totalPages = useMemo(
    () =>
      resultado
        ? Math.max(1, Math.ceil(resultado.schedule.length / PAGE_SIZE))
        : 1,
    [resultado]
  );

  const pageItems = useMemo(() => {
    if (!resultado) return [];
    const start = (page - 1) * PAGE_SIZE;
    return resultado.schedule.slice(start, start + PAGE_SIZE);
  }, [resultado, page]);

  if (loadingProdutos) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={[styles.container, styles.center]}>
          <ActivityIndicator />
          <Text style={styles.loadingTxt}>Carregando produtos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (erroProdutos) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.title}>Simular Empréstimo</Text>
          <Text style={styles.error}>{erroProdutos}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Simular Empréstimo</Text>

            <Text style={styles.label}>Produto</Text>
            <Pressable
              style={styles.select}
              onPress={() => setAbrirModal(true)}
            >
              <Text style={styles.selectText}>
                {produtoSel
                  ? `${produtoSel.nome} • ${produtoSel.taxaJurosAnual}% a.a. • até ${produtoSel.prazoMaximoMeses}m`
                  : "Selecionar produto"}
              </Text>
            </Pressable>

            <View style={styles.row}>
              <View style={styles.col}>
                <Text style={styles.label}>Valor (R$)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex.: 10.000"
                  placeholderTextColor={theme === "dark" ? "#777" : "#999"}
                  value={valor}
                  onChangeText={(t) => setValor(t.replace(/[^0-9.,]/g, ""))}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.col}>
                <Text style={styles.label}>Meses</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex.: 12"
                  placeholderTextColor={theme === "dark" ? "#777" : "#999"}
                  value={meses}
                  onChangeText={(t) => setMeses(t.replace(/[^0-9]/g, ""))}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <Pressable style={styles.btn} onPress={simular}>
              <Text style={styles.btnTxt}>Simular</Text>
            </Pressable>

            {resultado && (
              <View style={styles.resultArea}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Resumo</Text>

                  <View style={styles.line}>
                    <Text style={styles.lineLabel}>Produto</Text>
                    <Text style={styles.lineValue}>{produtoSel?.nome}</Text>
                  </View>
                  <View style={styles.line}>
                    <Text style={styles.lineLabel}>Taxa efetiva mensal</Text>
                    <Text style={styles.lineValue}>
                      {fmtPct(resultado.taxaMensal)}
                    </Text>
                  </View>
                  <View style={styles.line}>
                    <Text style={styles.lineLabel}>Parcela mensal</Text>
                    <Text style={styles.lineValue}>
                      {fmtMoeda(resultado.parcela)}
                    </Text>
                  </View>
                  <View style={styles.line}>
                    <Text style={styles.lineLabel}>Total com juros</Text>
                    <Text style={styles.lineValue}>
                      {fmtMoeda(resultado.total)}
                    </Text>
                  </View>

                  <View style={styles.pageControls}>
                    <Pressable
                      onPress={() => setPage((p) => Math.max(1, p - 1))}
                      style={[
                        styles.btn,
                        styles.btnSecondary,
                        page <= 1 && { opacity: 0.5 },
                      ]}
                      disabled={page <= 1}
                    >
                      <Text style={styles.btnTxt}>Anterior</Text>
                    </Pressable>

                    <Text style={styles.pageIndicator}>
                      Página {page} de {totalPages}
                    </Text>

                    <Pressable
                      onPress={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      style={[
                        styles.btn,
                        page >= totalPages && { opacity: 0.5 },
                      ]}
                      disabled={page >= totalPages}
                    >
                      <Text style={styles.btnTxt}>Próxima</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.cardScrollable}>
                  <Text style={[styles.listHeader, { marginTop: 10 }]}>
                    Memória de cálculo
                  </Text>

                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator
                    contentContainerStyle={styles.tableScrollContent}
                  >
                    <View style={styles.table}>
                      <View style={[styles.tr, styles.trHeader]}>
                        <Text style={[styles.th, styles.colMes]}>Mês</Text>
                        <Text
                          style={[styles.th, styles.colValor, styles.thNum]}
                        >
                          Parcela
                        </Text>
                        <Text
                          style={[styles.th, styles.colValor, styles.thNum]}
                        >
                          Juros
                        </Text>
                        <Text
                          style={[styles.th, styles.colValor, styles.thNum]}
                        >
                          Amortização
                        </Text>
                        <Text
                          style={[styles.th, styles.colValor, styles.thNum]}
                        >
                          Saldo
                        </Text>
                      </View>

                      {pageItems.map((item) => (
                        <View key={item.mes} style={styles.tr}>
                          <Text style={[styles.td, styles.colMes]}>
                            Mês {item.mes}
                          </Text>
                          <Text
                            style={[styles.td, styles.colValor, styles.num]}
                          >
                            {fmtMoeda(
                              item.parcela ?? item.juros + item.amortizacao
                            )}
                          </Text>
                          <Text
                            style={[styles.td, styles.colValor, styles.num]}
                          >
                            {fmtMoeda(item.juros)}
                          </Text>
                          <Text
                            style={[styles.td, styles.colValor, styles.num]}
                          >
                            {fmtMoeda(item.amortizacao)}
                          </Text>
                          <Text
                            style={[styles.td, styles.colValor, styles.num]}
                          >
                            {fmtMoeda(item.saldo)}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {abrirModal && (
        <View style={styles.modalScrim} onTouchEnd={() => setAbrirModal(false)}>
          <View
            style={styles.modalBox}
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecionar produto</Text>
              <Pressable
                style={styles.close}
                onPress={() => setAbrirModal(false)}
              >
                <Text style={styles.closeTxt}>Fechar</Text>
              </Pressable>
            </View>

            <FlatList
              data={produtos}
              keyExtractor={(p) => String(p.id)}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalItem}
                  onPress={() => {
                    setProdutoSel(item);
                    setAbrirModal(false);
                  }}
                >
                  <Text style={styles.modalItemTxt}>
                    {item.nome} • {item.taxaJurosAnual}% a.a. • até{" "}
                    {item.prazoMaximoMeses}m
                  </Text>
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
              showsVerticalScrollIndicator
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
              style={styles.modalList}
              contentContainerStyle={{ paddingBottom: 8 }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
