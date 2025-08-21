import { http } from "./http";

export type ProdutoInput = {
  nome: string;
  taxaJurosAnual: number; // em %
  prazoMaximoMeses: number; // inteiro
};

export type Produto = ProdutoInput & {
  id: string | number;
  createdAt?: string;
};

export const produtosApi = {
  criar: (data: ProdutoInput) => http.post<Produto>("/produtos", data),
  listar: () => http.get("/produtos"),
};
