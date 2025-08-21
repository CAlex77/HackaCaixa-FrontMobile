// src/utils/finance.ts

// Converte taxa anual (%) para taxa efetiva mensal (fração)
export function annualToMonthly(annualPercent: number): number {
  const a = annualPercent / 100;
  return Math.pow(1 + a, 1 / 12) - 1;
}

// Parcela (sistema Price): PMT = P * i / (1 - (1+i)^-n)
export function calcParcela(valor: number, i: number, n: number): number {
  if (i === 0) return valor / n;
  return valor * (i / (1 - Math.pow(1 + i, -n)));
}

export type ParcelaLinha = {
  mes: number;
  juros: number;
  amortizacao: number;
  saldo: number;
};

export function gerarMemoria(
  valor: number,
  i: number,
  n: number
): {
  parcela: number;
  totalComJuros: number;
  schedule: ParcelaLinha[];
} {
  const pmt = calcParcela(valor, i, n);
  let saldo = valor;
  const schedule: ParcelaLinha[] = [];

  for (let mes = 1; mes <= n; mes++) {
    const juros = saldo * i;
    let amortizacao = pmt - juros;

    // Proteção contra ponto flutuante no último mês
    if (mes === n) amortizacao = saldo;

    saldo = saldo - amortizacao;
    schedule.push({
      mes,
      juros,
      amortizacao,
      saldo: Math.max(0, saldo),
    });
  }

  const totalComJuros = pmt * n;
  return { parcela: pmt, totalComJuros, schedule };
}

// Helpers de formatação
export const fmtMoeda = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const fmtPct = (v: number) =>
  `${(v * 100).toFixed(2).replace(".", ",")}%`;
