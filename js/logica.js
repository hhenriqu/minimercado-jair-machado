// ============================================================
// logica.js: O CÉREBRO DO MERCADO (é aqui que você programa!)
// ------------------------------------------------------------
// As telas já estão prontas: elas desenham as tabelas, os botões
// e chamam as funções deste arquivo. Mas as funções ainda não
// fazem nada. Sua missão é escrever cada uma delas.
//
// O ciclo do dinheiro do Seu Jair:
//
//   FINANCEIRO  --paga-->  ESTOQUE  --vira produto-->  CAIXA
//       ^                                                |
//       +------------- dinheiro da venda volta ----------+
//
// Dicas:
// - Faça na ordem dos exercícios (docs/EXERCICIOS.md).
// - Abra testes.html no navegador para conferir suas funções.
// - Use console.log(...) à vontade e veja o resultado no F12.
// - Quando uma função precisa avisar se deu certo ou errado,
//   ela devolve um objeto assim:
//       { ok: true,  mensagem: "Venda finalizada!" }
//       { ok: false, mensagem: "Saldo insuficiente" }
//
// Formato dos dados (veja dadosIniciais() em dados.js):
//   dados.produtos       -> [{ id, nome, custo, precoVenda, quantidade, estoqueMinimo }]
//   dados.movimentacoes  -> [{ id, data, tipo: "entrada" | "saida", valor, descricao }]
//   dados.vendas         -> [{ id, data, itens, total, valorPago, troco }]
//   item do carrinho     -> { produtoId, nome, precoUnitario, quantidade }
// ============================================================


// ------------------------------------------------------------
// PARTE 1: FINANCEIRO
// ------------------------------------------------------------

// Exercício 1.1
// Recebe a lista de movimentações e devolve o saldo (um número).
// Saldo = soma das entradas - soma das saídas.
// Exemplo: entradas de 500 e 30, saída de 100 -> 430
function calcularSaldo(movimentacoes) {
  // TODO: percorra as movimentações e calcule o saldo
  return 0;
}

// Exercício 1.2
// Soma só as movimentações de um tipo ("entrada" ou "saida").
// Usada nos cartões de resumo da tela Financeiro.
function totalPorTipo(movimentacoes, tipo) {
  // TODO
  return 0;
}

// Exercício 1.3
// Registra uma nova movimentação em dados.movimentacoes.
// Regras para pensar:
//   - O valor precisa ser maior que zero.
//   - O tipo só pode ser "entrada" ou "saida".
//   - Uma saída maior que o saldo deveria ser permitida? Você decide!
// Dica: use proximoId(dados.movimentacoes) e new Date().toISOString()
function registrarMovimentacao(dados, tipo, valor, descricao) {
  // TODO
  return { ok: false, mensagem: "Falta programar registrarMovimentacao (js/logica.js)" };
}


// ------------------------------------------------------------
// PARTE 2: ESTOQUE
// ------------------------------------------------------------

// Exercício 2.1
// Devolve uma lista só com os produtos cuja quantidade
// está abaixo (ou igual?) ao estoque mínimo. Você decide a regra.
function produtosAbaixoDoMinimo(produtos) {
  // TODO
  return [];
}

// Exercício 2.2
// O Seu Jair comprou mercadoria do fornecedor.
// Pense no passo a passo antes de programar:
//   - O produto existe? A quantidade faz sentido?
//   - Quanto custa essa compra? (custo x quantidade)
//   - Tem dinheiro no financeiro para pagar?
//   - O que muda no financeiro? E no estoque?
function reporEstoque(dados, produtoId, quantidade) {
  // TODO
  return { ok: false, mensagem: "Falta programar reporEstoque (js/logica.js)" };
}


// ------------------------------------------------------------
// PARTE 3: CAIXA
// ------------------------------------------------------------

// Exercício 3.1
// Coloca um produto no carrinho (o carrinho é uma lista).
//   - Se o produto já está no carrinho, aumenta a quantidade
//     em vez de repetir a linha.
//   - Não deixa colocar mais do que tem no estoque!
function adicionarAoCarrinho(carrinho, produto, quantidade) {
  // TODO
  return { ok: false, mensagem: "Falta programar adicionarAoCarrinho (js/logica.js)" };
}

// Exercício 3.2
// Tira um produto do carrinho.
function removerDoCarrinho(carrinho, produtoId) {
  // TODO
}

// Exercício 3.3
// Soma o valor do carrinho: preço unitário x quantidade de cada item.
function calcularTotal(carrinho) {
  // TODO
  return 0;
}

// Exercício 3.4
// Calcula o troco. Se o cliente pagou menos que o total,
// devolva null (assim a tela sabe que falta dinheiro).
function calcularTroco(total, valorPago) {
  // TODO
  return null;
}

// Exercício 3.5: O GRANDE FINAL
// Fecha a venda. É aqui que o ciclo se completa!
// Pense no passo a passo antes de programar:
//   - O carrinho tem itens? O pagamento cobre o total?
//   - Ainda tem estoque de tudo? (alguém pode ter mexido)
//   - O que muda no estoque?
//   - Como guardar a venda em dados.vendas?
//   - Como o dinheiro volta para o financeiro?
function finalizarVenda(dados, carrinho, valorPago) {
  // TODO
  return { ok: false, mensagem: "Falta programar finalizarVenda (js/logica.js)" };
}
