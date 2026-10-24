// ============================================================
// estoque.js: desenha a tela do Estoque (JÁ ESTÁ PRONTO)
// A lógica de verdade está em logica.js
// ============================================================

function desenharEstoque() {
  const dados = carregarDados();
  const abaixo = produtosAbaixoDoMinimo(dados.produtos) || [];
  const idsAbaixo = abaixo.map((p) => p.id);

  const corpo = document.getElementById("produtos");
  corpo.innerHTML = "";
  for (const produto of dados.produtos) {
    const precisaRepor = idsAbaixo.includes(produto.id);
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${produto.nome}</td>
      <td class="numero">${formatarDinheiro(produto.custo)}</td>
      <td class="numero">${formatarDinheiro(produto.precoVenda)}</td>
      <td class="numero">${produto.quantidade}</td>
      <td class="numero">${produto.estoqueMinimo}</td>
      <td class="${precisaRepor ? "alerta" : ""}">${precisaRepor ? "Repor!" : "OK"}</td>`;
    corpo.appendChild(linha);
  }

  const lista = document.getElementById("abaixo-minimo");
  lista.innerHTML = abaixo.length
    ? abaixo.map((p) => `<li>${p.nome} (tem ${p.quantidade}, mínimo ${p.estoqueMinimo})</li>`).join("")
    : `<li class="vazio">Nada para repor (ou produtosAbaixoDoMinimo ainda não foi programada)</li>`;

  const select = document.getElementById("produto-repor");
  const escolhido = select.value;
  select.innerHTML = dados.produtos
    .map((p) => `<option value="${p.id}">${p.nome} (custo ${formatarDinheiro(p.custo)})</option>`)
    .join("");
  if (escolhido) select.value = escolhido;
  desenharCustoCompra();
}

// Mostra quanto a compra vai custar (só para ajudar quem está comprando)
function desenharCustoCompra() {
  const dados = carregarDados();
  const produto = buscarProduto(dados, document.getElementById("produto-repor").value);
  const quantidade = Number(document.getElementById("quantidade-repor").value);
  document.getElementById("custo-compra").textContent =
    produto && quantidade > 0 ? formatarDinheiro(produto.custo * quantidade) : "-";
}

document.getElementById("produto-repor").onchange = desenharCustoCompra;
document.getElementById("quantidade-repor").oninput = desenharCustoCompra;

document.getElementById("form-repor").onsubmit = (evento) => {
  evento.preventDefault();
  const dados = carregarDados();
  const produtoId = Number(document.getElementById("produto-repor").value);
  const quantidade = Number(document.getElementById("quantidade-repor").value);
  const resultado = reporEstoque(dados, produtoId, quantidade);
  if (resultado && resultado.ok) {
    salvarDados(dados);
    mostrarMensagem(resultado.mensagem || "Estoque reposto!");
  } else {
    mostrarMensagem(resultado ? resultado.mensagem : "reporEstoque não devolveu nada", "erro");
  }
  desenharEstoque();
  atualizarSaldoTopo();
};

desenharEstoque();
atualizarSaldoTopo();
