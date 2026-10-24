// ============================================================
// dados.js: o "banco de dados" do Minimercado Jair Machado
// ------------------------------------------------------------
// Tudo fica guardado no navegador (localStorage).
// Este arquivo JÁ ESTÁ PRONTO. Você pode ler para entender,
// mas a lógica do negócio fica em caixa.js, estoque.js e
// financeiro.js.
// ============================================================

const CHAVE = "jair-machado";

// Como o mercado começa no primeiro dia
function dadosIniciais() {
  return {
    produtos: [
      { id: 1, nome: "Arroz 5kg",        custo: 18.0, precoVenda: 27.9, quantidade: 5,  estoqueMinimo: 3 },
      { id: 2, nome: "Feijão 1kg",       custo: 5.5,  precoVenda: 8.99, quantidade: 8,  estoqueMinimo: 5 },
      { id: 3, nome: "Café 500g",        custo: 11.0, precoVenda: 17.5, quantidade: 2,  estoqueMinimo: 4 },
      { id: 4, nome: "Leite 1L",         custo: 3.2,  precoVenda: 5.49, quantidade: 12, estoqueMinimo: 6 },
      { id: 5, nome: "Pão de forma",     custo: 4.0,  precoVenda: 7.9,  quantidade: 0,  estoqueMinimo: 3 },
      { id: 6, nome: "Refrigerante 2L",  custo: 5.0,  precoVenda: 9.5,  quantidade: 6,  estoqueMinimo: 4 },
      { id: 7, nome: "Sabão em pó 1kg",  custo: 9.0,  precoVenda: 14.9, quantidade: 3,  estoqueMinimo: 2 },
      { id: 8, nome: "Banana (kg)",      custo: 3.0,  precoVenda: 5.99, quantidade: 10, estoqueMinimo: 5 },
    ],
    // Cada entrada ou saída de dinheiro vira uma movimentação.
    // tipo: "entrada" (dinheiro chegou) ou "saida" (dinheiro foi embora)
    movimentacoes: [
      { id: 1, data: new Date().toISOString(), tipo: "entrada", valor: 500, descricao: "Dinheiro inicial do Seu Jair" },
    ],
    // Cada venda finalizada no caixa
    vendas: [],
  };
}

// Lê os dados guardados. Se não houver nada, começa do zero.
function carregarDados() {
  try {
    const texto = localStorage.getItem(CHAVE);
    if (texto) return JSON.parse(texto);
  } catch (e) {
    console.warn("Não consegui ler os dados salvos, começando do zero.", e);
  }
  const dados = dadosIniciais();
  salvarDados(dados);
  return dados;
}

// Guarda os dados no navegador
function salvarDados(dados) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
  } catch (e) {
    console.warn("Não consegui salvar os dados.", e);
  }
}

// Apaga tudo e volta ao primeiro dia
function resetarDados() {
  if (!confirm("Apagar tudo e voltar ao primeiro dia do mercado?")) return;
  salvarDados(dadosIniciais());
  location.reload();
}

// Gera um id novo para uma lista (o maior id + 1)
function proximoId(lista) {
  let maior = 0;
  for (const item of lista) {
    if (item.id > maior) maior = item.id;
  }
  return maior + 1;
}

// Procura um produto pelo id
function buscarProduto(dados, id) {
  return dados.produtos.find((p) => p.id === Number(id));
}

// Formata um número como dinheiro: 12.5 -> "R$ 12,50"
function formatarDinheiro(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Formata uma data ISO para o padrão brasileiro
function formatarData(iso) {
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

// Mostra um aviso no rodapé da tela. tipo: "sucesso" ou "erro"
function mostrarMensagem(texto, tipo = "sucesso") {
  const caixa = document.getElementById("mensagem");
  if (!caixa) return alert(texto);
  caixa.textContent = texto;
  caixa.className = tipo;
  clearTimeout(mostrarMensagem.timer);
  mostrarMensagem.timer = setTimeout(() => (caixa.className = ""), 3500);
}

// Atualiza o saldo que aparece no topo de todas as telas.
// Usa a função calcularSaldo, que VOCÊ vai escrever em financeiro-logica.js
function atualizarSaldoTopo() {
  const el = document.getElementById("saldo-topo");
  if (!el) return;
  const dados = carregarDados();
  el.textContent = "Saldo: " + formatarDinheiro(calcularSaldo(dados.movimentacoes));
}
