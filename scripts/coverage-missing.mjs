// scripts/coverage-missing.mjs
import fs from "fs";
import path from "path";

const coverageJson = path.resolve("coverage", "coverage-final.json");
if (!fs.existsSync(coverageJson)) {
  console.error(
    "Arquivo coverage/coverage-final.json não encontrado. Rode: npm run test:coverage"
  );
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(coverageJson, "utf-8"));

function rangesFromHits(map, hits) {
  const missing = [];
  Object.entries(map).forEach(([id, loc]) => {
    if (hits[id] === 0) {
      const { start, end } = loc;
      const range =
        start.line === end.line ? `${start.line}` : `${start.line}-${end.line}`;
      missing.push(range);
    }
  });
  return missing;
}

const pad = (s, n) => (s + " ".repeat(n)).slice(0, n);

let anyMissing = false;

console.log("\nArquivos com trechos NÃO cobertos:\n");

Object.entries(data).forEach(([file, cov]) => {
  const sMissing = rangesFromHits(cov.statementMap, cov.s || {});
  const fMissing = Object.entries(cov.f || {})
    .filter(([, hit]) => hit === 0)
    .map(([id]) => {
      const loc = cov.fnMap[id]?.loc;
      if (!loc) return id;
      const { start, end } = loc;
      return start.line === end.line
        ? `${start.line}`
        : `${start.line}-${end.line}`;
    });

  const bMissing = [];
  Object.entries(cov.branchMap || {}).forEach(([id, info]) => {
    const hits = cov.b?.[id] || [];
    hits.forEach((h, idx) => {
      if (h === 0) {
        const loc = info.locations?.[idx];
        if (loc) {
          const { start, end } = loc;
          bMissing.push(
            start.line === end.line
              ? `${start.line}`
              : `${start.line}-${end.line}`
          );
        }
      }
    });
  });

  const total = cov.statements.pct;
  const fnPct = cov.functions.pct;
  const brPct = cov.branches.pct;

  if (sMissing.length || fMissing.length || bMissing.length) {
    anyMissing = true;
    console.log(`• ${file}`);
    console.log(
      `  - Statements: ${pad(`${cov.statements.pct}%`, 6)} faltando linhas: ${
        sMissing.join(", ") || "—"
      }`
    );
    console.log(
      `  - Functions : ${pad(`${fnPct}%`, 6)} faltando linhas: ${
        fMissing.join(", ") || "—"
      }`
    );
    console.log(
      `  - Branches  : ${pad(`${brPct}%`, 6)} faltando linhas: ${
        bMissing.join(", ") || "—"
      }`
    );
    console.log("");
  }
});

if (!anyMissing) {
  console.log("Cobertura total — sem trechos faltando 👏\n");
}
