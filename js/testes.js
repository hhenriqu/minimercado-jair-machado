// ============================================================
// testes.js: confere as funções de logica.js (JÁ ESTÁ PRONTO)
// Você pode (e deve!) criar testes novos quando inventar regras.
// ============================================================

const testes = [];
function teste(exercicio, descricao, funcao) {
  testes.push({ exercicio, descricao, funcao });
}

// Dados de mentirinha, criados do zero para cada teste
function mercadoDeTeste(saldoInicial = 100) {
  return {
    produtos: [
      { id: 1, nome: "Arroz", custo: 10, precoVenda: 20, quantidade: 5, estoqueMinimo: 3 },
      { id: 2, nome: "Café",  custo: 8,  precoVenda: 15, quantidade: 1, estoqueMinimo: 4 },
    ],
    movimentacoes: [
      { id: 1, data: new Date().toISOString(), tipo: "entrada", valor: saldoInicial, descricao: "Inicial" },
    ],
    vendas: [],
  };
}

function iguais(a, b) {
  return Math.abs(a - b) < 0.001;
}

// ---------- Financeiro ----------
teste("1.1", "Saldo soma entradas e tira saídas", () => {
  const movs = [
    { tipo: "entrada", valor: 500 },
    { tipo: "entrada", valor: 30 },
    { tipo: "saida", valor: 100 },
  ];
  return iguais(calcularSaldo(movs), 430);
});
teste("1.1", "Saldo de lista vazia é zero", () => iguais(calcularSaldo([]), 0));

teste("1.2", "Total de entradas e de saídas", () => {
  const movs = [
    { tipo: "entrada", valor: 50 },
    { tipo: "saida", valor: 20 },
    { tipo: "saida", valor: 5 },
  ];
  return iguais(totalPorTipo(movs, "entrada"), 50) && iguais(totalPorTipo(movs, "saida"), 25);
});

teste("1.3", "Registrar uma entrada aumenta o saldo", () => {
  const d = mercadoDeTeste(100);
  const r = registrarMovimentacao(d, "entrada", 40, "Teste");
  return r.ok && d.movimentacoes.length === 2 && iguais(calcularSaldo(d.movimentacoes), 140);
});
teste("1.3", "Valor zero ou negativo é recusado", () => {
  const d = mercadoDeTeste(100);
  const r1 = registrarMovimentacao(d, "entrada", 0, "Zero");
  const r2 = registrarMovimentacao(d, "saida", -10, "Negativo");
  return !r1.ok && !r2.ok && d.movimentacoes.length === 1;
});

// ---------- Estoque ----------
teste("2.1", "Encontra produtos abaixo do mínimo", () => {
  const lista = produtosAbaixoDoMinimo(mercadoDeTeste().produtos);
  return lista.length === 1 && lista[0].nome === "Café";
});

teste("2.2", "Repor estoque aumenta a quantidade", () => {
  const d = mercadoDeTeste(100);
  const r = reporEstoque(d, 2, 3);
  return r.ok && buscarProduto(d, 2).quantidade === 4;
});
teste("2.2", "Repor estoque paga com o dinheiro do financeiro", () => {
  const d = mercadoDeTeste(100);
  reporEstoque(d, 2, 3); // 3 x R$ 8 = R$ 24
  return iguais(calcularSaldo(d.movimentacoes), 76);
});
teste("2.2", "Sem dinheiro, não compra", () => {
  const d = mercadoDeTeste(10);
  const r = reporEstoque(d, 1, 5); // 5 x R$ 10 = R$ 50
  return !r.ok && buscarProduto(d, 1).quantidade === 5 && iguais(calcularSaldo(d.movimentacoes), 10);
});

// ---------- Caixa ----------
teste("3.1", "Adiciona produto no carrinho", () => {
  const d = mercadoDeTeste();
  const carrinho = [];
  const r = adicionarAoCarrinho(carrinho, buscarProduto(d, 1), 2);
  return r.ok && carrinho.length === 1 && carrinho[0].quantidade === 2 && carrinho[0].precoUnitario === 20;
});
teste("3.1", "Mesmo produto duas vezes vira uma linha só", () => {
  const d = mercadoDeTeste();
  const carrinho = [];
  adicionarAoCarrinho(carrinho, buscarProduto(d, 1), 1);
  adicionarAoCarrinho(carrinho, buscarProduto(d, 1), 1);
  return carrinho.length === 1 && carrinho[0].quantidade === 2;
});
teste("3.1", "Não passa do que tem no estoque", () => {
  const d = mercadoDeTeste();
  const carrinho = [];
  adicionarAoCarrinho(carrinho, buscarProduto(d, 2), 1); // só tem 1 café
  const r = adicionarAoCarrinho(carrinho, buscarProduto(d, 2), 1);
  return !r.ok && carrinho.length === 1 && carrinho[0].quantidade === 1;
});

teste("3.2", "Remove produto do carrinho", () => {
  const carrinho = [
    { produtoId: 1, nome: "Arroz", precoUnitario: 20, quantidade: 1 },
    { produtoId: 2, nome: "Café", precoUnitario: 15, quantidade: 1 },
  ];
  removerDoCarrinho(carrinho, 1);
  return carrinho.length === 1 && carrinho[0].produtoId === 2;
});

teste("3.3", "Total do carrinho", () => {
  const carrinho = [
    { produtoId: 1, nome: "Arroz", precoUnitario: 20, quantidade: 2 },
    { produtoId: 2, nome: "Café", precoUnitario: 15, quantidade: 1 },
  ];
  return iguais(calcularTotal(carrinho), 55) && iguais(calcularTotal([]), 0);
});

teste("3.4", "Troco certo e pagamento insuficiente", () => {
  return iguais(calcularTroco(55, 100), 45) && iguais(calcularTroco(55, 55), 0) && calcularTroco(55, 50) === null;
});

teste("3.5", "Venda baixa o estoque", () => {
  const d = mercadoDeTeste();
  const carrinho = [{ produtoId: 1, nome: "Arroz", precoUnitario: 20, quantidade: 2 }];
  const r = finalizarVenda(d, carrinho, 50);
  return r.ok && buscarProduto(d, 1).quantidade === 3;
});
teste("3.5", "Dinheiro da venda volta pro financeiro", () => {
  const d = mercadoDeTeste(100);
  const carrinho = [{ produtoId: 1, nome: "Arroz", precoUnitario: 20, quantidade: 2 }];
  finalizarVenda(d, carrinho, 50);
  return iguais(calcularSaldo(d.movimentacoes), 140);
});
teste("3.5", "A venda fica registrada com o troco", () => {
  const d = mercadoDeTeste();
  const carrinho = [{ produtoId: 1, nome: "Arroz", precoUnitario: 20, quantidade: 2 }];
  finalizarVenda(d, carrinho, 50);
  return d.vendas.length === 1 && iguais(d.vendas[0].total, 40) && iguais(d.vendas[0].troco, 10);
});
teste("3.5", "Carrinho vazio ou pagamento curto não vende", () => {
  const d = mercadoDeTeste(100);
  const r1 = finalizarVenda(d, [], 50);
  const r2 = finalizarVenda(d, [{ produtoId: 1, nome: "Arroz", precoUnitario: 20, quantidade: 2 }], 30);
  return !r1.ok && !r2.ok && d.vendas.length === 0 && buscarProduto(d, 1).quantidade === 5 &&
    iguais(calcularSaldo(d.movimentacoes), 100);
});

// ---------- Ciclo completo ----------
teste("Ciclo", "Comprar 2 cafés e vender os 3: o mercado lucra", () => {
  const d = mercadoDeTeste(100);
  reporEstoque(d, 2, 2); // paga 16, fica com 3 cafés
  const carrinho = [];
  adicionarAoCarrinho(carrinho, buscarProduto(d, 2), 3);
  finalizarVenda(d, carrinho, 50); // recebe 45
  return buscarProduto(d, 2).quantidade === 0 && iguais(calcularSaldo(d.movimentacoes), 129);
});

// ---------- Roda tudo e mostra na tela ----------
let passaram = 0;
const corpo = document.getElementById("resultados");
for (const t of testes) {
  let ok = false;
  let detalhe = "";
  try {
    ok = t.funcao() === true;
  } catch (erro) {
    detalhe = " (erro: " + erro.message + ")";
    console.error("Teste", t.exercicio, t.descricao, erro);
  }
  if (ok) passaram++;
  const linha = document.createElement("tr");
  linha.innerHTML = `
    <td>${t.exercicio}</td>
    <td>${t.descricao}</td>
    <td class="${ok ? "entrada" : "saida"}">${ok ? "Passou" : "Ainda não" + detalhe}</td>`;
  corpo.appendChild(linha);
}
document.getElementById("placar").textContent = `${passaram} de ${testes.length} testes passando`;
