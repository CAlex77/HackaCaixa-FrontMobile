jest.mock("../src/services/http", () => {
  return {
    http: {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      del: jest.fn(),
    },
  };
});

import { http as httpMock } from "../src/services/http";
import {
  produtosApi,
  type ProdutoInput,
} from "../src/services/produtos.service";

describe("produtos.service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("listar → GET /produtos", async () => {
    (httpMock.get as jest.Mock).mockResolvedValueOnce([{ id: 1, nome: "X" }]);

    const res = await produtosApi.listar();
    expect(httpMock.get).toHaveBeenCalledWith("/produtos");
    expect(res).toEqual([{ id: 1, nome: "X" }]);
  });

  it("criar → POST /produtos com body", async () => {
    const body: ProdutoInput = {
      nome: "Novo",
      taxaJurosAnual: 10,
      prazoMaximoMeses: 12,
    };
    (httpMock.post as jest.Mock).mockResolvedValueOnce({ id: 9, ...body });

    const res = await produtosApi.criar(body);
    expect(httpMock.post).toHaveBeenCalledWith("/produtos", body);
    expect(res).toEqual({ id: 9, ...body });
  });

  it("propaga erro do http", async () => {
    (httpMock.get as jest.Mock).mockRejectedValueOnce(new Error("fail"));
    await expect(produtosApi.listar()).rejects.toThrow("fail");
  });
});
