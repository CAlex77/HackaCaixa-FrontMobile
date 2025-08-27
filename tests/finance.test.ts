// tests/finance.test.ts
import {
  annualToMonthly,
  calcParcela,
  gerarMemoria,
  fmtMoeda,
  fmtPct,
} from "../src/utils/finance";

describe("finance utils", () => {
  it("annualToMonthly: 12% a.a ≈ 0.9489% a.m", () => {
    const m = annualToMonthly(12);
    expect(m).toBeCloseTo(0.009488, 5);
  });

  it("calcParcela: taxa zero vira divisão simples", () => {
    const pmt = calcParcela(1000, 0, 10);
    expect(pmt).toBeCloseTo(100, 10);
  });

  it("calcParcela: parcela PRICE com juros", () => {
    const pmt = calcParcela(1000, 0.01, 12);
    expect(pmt).toBeCloseTo(88.85, 2);
  });

  it("gerarMemoria: gera schedule consistente e quita no último mês", () => {
    const valor = 1000;
    const i = 0.01;
    const n = 12;

    const { parcela, totalComJuros, schedule } = gerarMemoria(valor, i, n);

    expect(schedule).toHaveLength(n);
    expect(parcela).toBeCloseTo(calcParcela(valor, i, n), 10);
    expect(totalComJuros).toBeCloseTo(parcela * n, 10);

    expect(schedule[0].juros).toBeCloseTo(valor * i, 10);

    const last = schedule[n - 1];
    expect(last.saldo).toBeCloseTo(0, 10)
    const penultimoSaldo = schedule[n - 2].saldo;
    expect(last.amortizacao).toBeCloseTo(penultimoSaldo, 6);
  });

  it("fmtPct: usa vírgula e duas casas", () => {
    expect(fmtPct(0.123)).toBe("12,30%");
  });

  it("fmtMoeda: retorna uma string (formato local pode variar no ambiente de teste)", () => {
    const s = fmtMoeda(1234);
    expect(typeof s).toBe("string");
    expect(s.length).toBeGreaterThan(0);
  });
});
