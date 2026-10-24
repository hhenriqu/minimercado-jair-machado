// ============================================================
// caixa.js: desenha a tela do Caixa (JÁ ESTÁ PRONTO)
// A lógica de verdade está em logica.js
// ============================================================

let carrinho = [];

function desenharProdutos() {
  const dados = carregarDados();
  const grade = document.getElementById("produtos");
  grade.innerHTML = "";
  for (const produto of dados.produtos) {
    const botao = document.createElement("button");
    botao.className = "produto-botao";
    botao.innerHTML = `
      <span>${produto.nome}</span>
      <strong>${formatarDinheiro(produto.precoVenda)}</strong>
      <small>${produto.quantidade} em estoque</small>`;
    botao.onclick = () => {
      const resultado = adicionarAoCarrinho(carrinho, produto, 1);
      if (resultado && !resultado.ok) mostrarMensagem(resultado.mensagem, "erro");
      desenharCarrinho();
    };
    grade.appendChild(botao);
  }
}

function desenharCarrinho() {
  const corpo = document.getElementById("carrinho");
  corpo.innerHTML = "";
  if (carrinho.length === 0) {
    corpo.innerHTML = `<tr><td colspan="4" class="vazio">Carrinho vazio</td></tr>`;
  }
  for (const item of carrinho) {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${item.nome}</td>
      <td class="numero">${item.quantidade}</td>
      <td class="numero">${formatarDinheiro(item.precoUnitario * item.quantidade)}</td>
      <td class="numero"><button class="secundario pequeno">remover</button></td>`;
    linha.querySelector("button").onclick = () => {
      removerDoCarrinho(carrinho, item.produtoId);
      desenharCarrinho();
    };
    corpo.appendChild(linha);
  }
  document.getElementById("total").textContent = formatarDinheiro(calcularTotal(carrinho));
  desenharTroco();
}

function desenharTroco() {
  const valorPago = Number(document.getElementById("valor-pago").value);
  const troco = calcularTroco(calcularTotal(carrinho), valorPago);
  document.getElementById("troco").textContent =
    troco === null || troco === undefined ? "-" : formatarDinheiro(troco);
}

function desenharVendas() {
  const dados = carregarDados();
  const corpo = document.getElementById("vendas");
  corpo.innerHTML = "";
  if (dados.vendas.length === 0) {
    corpo.innerHTML = `<tr><td colspan="4" class="vazio">Nenhuma venda ainda</td></tr>`;
  }
  for (const venda of dados.vendas.slice().reverse().slice(0, 10)) {
    const itens = (venda.itens || []).map((i) => `${i.quantidade}x ${i.nome}`).join(", ");
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${formatarData(venda.data)}</td>
      <td>${itens}</td>
      <td class="numero">${formatarDinheiro(venda.total)}</td>
      <td class="numero">${formatarDinheiro(venda.troco)}</td>`;
    corpo.appendChild(linha);
  }
}

document.getElementById("valor-pago").oninput = desenharTroco;

document.getElementById("limpar").onclick = () => {
  carrinho = [];
  desenharCarrinho();
};

document.getElementById("form-pagamento").onsubmit = (evento) => {
  evento.preventDefault();
  const dados = carregarDados();
  const valorPago = Number(document.getElementById("valor-pago").value);
  const resultado = finalizarVenda(dados, carrinho, valorPago);
  if (resultado && resultado.ok) {
    salvarDados(dados);
    carrinho = [];
    document.getElementById("valor-pago").value = "";
    mostrarMensagem(resultado.mensagem || "Venda finalizada!");
  } else {
    mostrarMensagem(resultado ? resultado.mensagem : "finalizarVenda não devolveu nada", "erro");
  }
  desenharProdutos();
  desenharCarrinho();
  desenharVendas();
  atualizarSaldoTopo();
};

desenharProdutos();
desenharCarrinho();
desenharVendas();
atualizarSaldoTopo();
