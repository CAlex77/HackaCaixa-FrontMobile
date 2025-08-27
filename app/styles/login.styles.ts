import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  safe: {
    flex: 1,
    // backgroundColor: "#8A05BE", um pequeno easter egg kkkkkk
    backgroundColor: "#0070af",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    width: "100%",
    maxWidth: 420, 
    alignSelf: "center",
    gap: 16,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 72,
    tintColor: "#fff",
  },
  primaryButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  primaryText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
  },
});
