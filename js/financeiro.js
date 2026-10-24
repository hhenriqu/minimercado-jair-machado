// ============================================================
// financeiro.js: desenha a tela do Financeiro (JÁ ESTÁ PRONTO)
// A lógica de verdade está em logica.js
// ============================================================

function desenharFinanceiro() {
  const dados = carregarDados();
  const movs = dados.movimentacoes;

  document.getElementById("saldo").textContent = formatarDinheiro(calcularSaldo(movs));
  document.getElementById("entradas").textContent = formatarDinheiro(totalPorTipo(movs, "entrada"));
  document.getElementById("saidas").textContent = formatarDinheiro(totalPorTipo(movs, "saida"));

  const corpo = document.getElementById("extrato");
  corpo.innerHTML = "";
  for (const mov of movs.slice().reverse()) {
    const sinal = mov.tipo === "saida" ? "- " : "+ ";
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${formatarData(mov.data)}</td>
      <td>${mov.descricao}</td>
      <td class="numero ${mov.tipo}">${sinal}${formatarDinheiro(mov.valor)}</td>`;
    corpo.appendChild(linha);
  }
  atualizarSaldoTopo();
}

document.getElementById("form-movimentacao").onsubmit = (evento) => {
  evento.preventDefault();
  const dados = carregarDados();
  const tipo = document.getElementById("tipo").value;
  const valor = Number(document.getElementById("valor").value);
  const descricao = document.getElementById("descricao").value.trim() || "Lançamento manual";
  const resultado = registrarMovimentacao(dados, tipo, valor, descricao);
  if (resultado && resultado.ok) {
    salvarDados(dados);
    evento.target.reset();
    mostrarMensagem(resultado.mensagem || "Movimentação lançada!");
  } else {
    mostrarMensagem(resultado ? resultado.mensagem : "registrarMovimentacao não devolveu nada", "erro");
  }
  desenharFinanceiro();
};

desenharFinanceiro();
