import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
    maxWidth: 980, // evita esticar no web
    alignSelf: "center",
  },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center", marginTop: 8 },
  subtitle: {
    textAlign: "center",
    marginTop: 4,
    marginBottom: 12,
    opacity: 0.8,
  },
  list: { gap: 12, paddingVertical: 8 },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    padding: 16,
    backgroundColor: "#fafafa",
  },
  cardTitle: { fontWeight: "700", fontSize: 16, marginBottom: 6 },
  cardDescription: { opacity: 0.8, lineHeight: 20 },
});
