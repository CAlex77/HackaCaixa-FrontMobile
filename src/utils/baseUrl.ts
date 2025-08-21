// src/utils/baseUrl.ts
import { Platform, NativeModules } from "react-native";
import Constants from "expo-constants";

function hostFromScriptURL(): string | null {
  // Ex.: http://192.168.0.23:19000/index.bundle?platform=android&dev=true
  const url: string | undefined = (NativeModules as any)?.SourceCode?.scriptURL;
  const m = url?.match(/https?:\/\/([^:\/]+)/);
  return m?.[1] ?? null;
}

function hostFromHostUri(): string | null {
  // SDK 49+ costuma expor hostUri (ex.: 192.168.0.23:19000)
  const hostUri = (Constants as any)?.expoConfig?.hostUri as string | undefined;
  if (!hostUri) return null;
  return hostUri.split(":")[0] || null;
}

function hostFromDebuggerHost(): string | null {
  // fallback antigo (ex.: 192.168.0.23:19000)
  const dbg = (Constants as any)?.manifest?.debuggerHost as string | undefined;
  if (!dbg) return null;
  return dbg.split(":")[0] || null;
}

function looksLikeTunnel(h?: string | null) {
  if (!h) return false;
  const s = h.toLowerCase();
  return (
    s.includes("expo.dev") || s.includes("exp.direct") || s.includes("ngrok")
  );
}

export function getApiBase(): string {
  // 0) ENV sempre ganha (serve p/ túnel, deploy, CI)
  const env = process.env.EXPO_PUBLIC_API_URL;
  if (env) return env.replace(/\/$/, "");

  // 1) Web: pega o host do navegador
  if (Platform.OS === "web" && typeof window !== "undefined") {
    const host = window.location.hostname || "localhost";
    return `http://${host}:3333`;
  }

  // 2) Native: tenta host do bundle
  let host = hostFromScriptURL();

  // 3) Se for túnel, tenta extrair o IP do hostUri (SDK nova) ou debuggerHost (SDK antiga)
  if (looksLikeTunnel(host)) {
    host = hostFromHostUri() || hostFromDebuggerHost() || host;
  }

  // 4) Se ainda assim continuou túnel ou não achamos nada, cai pra localhost (bom pro web/emu)
  if (!host || looksLikeTunnel(host)) host = "localhost";

  return `http://${host}:3333`;
}
