import { getApiBase } from "../src/utils/baseUrl";

describe("getApiBase", () => {
  it("retorna a URL base com IP fixo e porta 3333", () => {
    expect(getApiBase()).toBe("http://192.168.15.6:3333");
  });
});
