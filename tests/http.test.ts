// tests/http.test.ts

jest.mock("../src/utils/baseUrl", () => ({
  getApiBase: () => "http://fake-host:3333",
}));

import { http, API_URL } from "../src/services/http";

type FetchOk = {
  ok: true;
  status: number;
  json: () => Promise<any>;
};
type FetchErr = {
  ok: false;
  status: number;
  text: () => Promise<string>;
};

describe("http service", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it("usa API_URL do getApiBase", () => {
    expect(API_URL).toBe("http://fake-host:3333");
  });

  it("GET: retorna dados em sucesso", async () => {
    const data = [{ id: 1, nome: "X" }];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => data,
    } as FetchOk);

    const res = await http.get<typeof data>("/produtos");

    expect(global.fetch).toHaveBeenCalledWith(
      "http://fake-host:3333/produtos",
      expect.objectContaining({
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(res).toEqual(data);
  });

  it("POST: envia body JSON e retorna dados", async () => {
    const body = { nome: "Novo" };
    const data = { id: 9, ...body };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => data,
    } as FetchOk);

    const res = await http.post<typeof data>("/produtos", body);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://fake-host:3333/produtos",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
    );
    expect(res).toEqual(data);
  });

  it("erro HTTP: lança com mensagem contendo status e texto", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "algo deu errado",
    } as FetchErr);

    await expect(http.get("/produtos")).rejects.toThrow(
      "HTTP 500 - algo deu errado"
    );
  });
});
