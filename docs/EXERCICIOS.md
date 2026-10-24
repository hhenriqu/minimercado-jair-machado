# Exercícios: o ciclo do dinheiro do Seu Jair

O sistema já tem as três telas prontas. O que falta é o **cérebro**: as regras que decidem o que
acontece quando alguém compra mercadoria ou vende no caixa. Tudo isso mora em
[`js/logica.js`](../js/logica.js), e é o único arquivo que você precisa mexer.

```
 FINANCEIRO  --paga-->  ESTOQUE  --vira produto-->  CAIXA
     ^                                                |
     +------------- dinheiro da venda volta ----------+
```

## Como trabalhar

1. Abra a pasta do projeto no VS Code.
2. Abra `index.html` no navegador (no VS Code, a extensão **Live Server** ajuda: botão direito no
   arquivo › *Open with Live Server*). Cada vez que salvar, a página recarrega.
3. Abra `testes.html` em outra aba. Ela mostra quais regras já funcionam. A meta é ficar tudo verde.
4. Aperte **F12** e vá na aba *Console*. É lá que aparecem os erros e os seus `console.log`.
5. Um exercício por vez. Terminou um, faça um commit (veja [GIT.md](GIT.md)).
6. Travou? Botão **"Voltar ao primeiro dia"** no rodapé apaga os dados e recomeça.

## Fase 0: desenhar o fluxo (antes de programar!)

Pegue papel, quadro branco ou o [Excalidraw](https://excalidraw.com) e desenhe o que acontece com o
dinheiro e com os produtos em cada passo. Responda com o Helio:

- Onde o dinheiro está guardado? O que faz ele **aumentar**? E **diminuir**?
- O Seu Jair compra 10 cafés a R$ 11. O que muda no Financeiro? E no Estoque?
- Um cliente leva 2 cafés a R$ 17,50 e paga com R$ 50. O que muda em cada tela? Quanto de troco?
- Depois da compra e da venda, o mercado ganhou ou perdeu dinheiro? Quanto?
- O que **não pode** acontecer? (vender o que não tem, comprar sem dinheiro, ...)
- Em que ordem as coisas precisam acontecer? O que acontece se der erro no meio do caminho?

Guarde a foto do desenho na pasta `docs/` e faça seu primeiro commit com ela.

## Fase 1: Financeiro

| # | Função | O que faz |
|---|---|---|
| 1.1 | `calcularSaldo(movimentacoes)` | Entradas menos saídas. Faz o saldo do topo aparecer. |
| 1.2 | `totalPorTipo(movimentacoes, tipo)` | Soma só as entradas ou só as saídas. |
| 1.3 | `registrarMovimentacao(dados, tipo, valor, descricao)` | Lança um dinheiro novo no extrato. |

Conceitos que aparecem: `for`, `if`, somar numa variável, `push` numa lista, objetos.

**Pronto quando:** na tela Financeiro, o saldo mostra R$ 500,00 e dá para lançar uma conta de luz.

## Fase 2: Estoque

| # | Função | O que faz |
|---|---|---|
| 2.1 | `produtosAbaixoDoMinimo(produtos)` | Lista o que precisa repor. |
| 2.2 | `reporEstoque(dados, produtoId, quantidade)` | Compra do fornecedor: sai dinheiro, entra produto. |

Dica para o 2.2: você já escreveu `registrarMovimentacao`. Dá para reaproveitar?

**Pronto quando:** comprar 5 pães faz o saldo cair R$ 20,00 e o pão aparecer com 5 unidades.

## Fase 3: Caixa

| # | Função | O que faz |
|---|---|---|
| 3.1 | `adicionarAoCarrinho(carrinho, produto, quantidade)` | Coloca no carrinho, sem passar do estoque. |
| 3.2 | `removerDoCarrinho(carrinho, produtoId)` | Tira do carrinho. |
| 3.3 | `calcularTotal(carrinho)` | Soma o carrinho. |
| 3.4 | `calcularTroco(total, valorPago)` | Troco, ou `null` se o dinheiro não dá. |
| 3.5 | `finalizarVenda(dados, carrinho, valorPago)` | Baixa o estoque, guarda a venda e devolve o dinheiro ao Financeiro. |

O 3.5 é o grande final: é ele que fecha o ciclo. Antes de programar, escreva os passos em
português, como comentários, e só depois transforme cada comentário em código.

**Pronto quando:** o teste "Ciclo" fica verde e, no site, uma venda aparece no extrato do Financeiro.

## Fase 4: desafios extras (escolha os que quiser)

Cada desafio vira um cartão, uma branch e um PR.

1. **Lucro:** mostrar no Financeiro quanto o mercado lucrou nas vendas (preço de venda menos custo).
2. **Vendas do dia:** cartão no Financeiro com o total vendido hoje.
3. **Desconto:** no caixa, desconto de 10% para compras acima de R$ 100.
4. **Cancelar venda:** botão que desfaz uma venda (o produto volta ao estoque e o dinheiro sai).
5. **Cadastrar produto:** formulário no Estoque para criar um produto novo.
6. **Formas de pagamento:** dinheiro, Pix ou cartão. Só dinheiro tem troco.
7. **Fechamento de caixa:** resumo do dia com quantidade de vendas, total e ticket médio.
8. **Crie seu próprio teste** em `js/testes.js` para cada regra nova que inventar.

## Perguntas para o mentor fazer (Helio)

- "Por que você conferiu isso antes de mexer no estoque?"
- "E se o cliente clicar duas vezes no botão de finalizar?"
- "Esse número pode ser negativo? E com centavos, dá certo?" (dica: `0.1 + 0.2` no console)
- "Onde mais essa regra se repete? Dá para virar uma função?"
