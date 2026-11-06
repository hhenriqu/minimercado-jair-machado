# Exercícios: o ciclo do dinheiro do Seu Jair

> **Primeira vez aqui?** Leia antes o [Comece aqui](COMECE-AQUI.md). Ele mostra como preparar o
> computador e faz o exercício 1.1 junto com você, passo a passo.

O sistema já tem as três telas prontas. O que falta é o **cérebro**: as regras que decidem o que
acontece quando alguém compra mercadoria ou vende no caixa. Tudo isso mora em
[`js/logica.js`](../js/logica.js), e é o único arquivo que você precisa mexer.

```
 FINANCEIRO  --paga-->  ESTOQUE  --vira produto-->  CAIXA
     ^                                                |
     +------------- dinheiro da venda volta ----------+
```

## O método (repita em todo exercício)

1. **Encontre** a função em `js/logica.js` (Ctrl+F) e leia o comentário em cima dela.
2. **Olhe** o que ela recebe: `console.log(...)` dentro da função ou o Console do navegador (F12).
3. **Resolva no papel** com o exemplo do exercício.
4. **Escreva os passos** em português, como comentários dentro da função.
5. **Troque cada comentário** por código, uma linha por vez. Salve e olhe o Console a cada linha.
6. **Confira** em `testes.html` (as linhas do exercício ficam verdes) e no site.
7. **Commit e PR** (veja [GIT.md](GIT.md)).

Travou? Abra as dicas **uma de cada vez**. Tente sozinha pelo menos 10 minutos antes de abrir a
próxima. Se a dica não resolver, chame o Helio.

## Fase 0: desenhar o fluxo (antes de programar!)

Pegue papel, quadro branco ou o [Excalidraw](https://excalidraw.com) e desenhe três caixas
(Financeiro, Estoque, Caixa) e setas mostrando o que vai de uma para a outra. Depois responda:

- Onde o dinheiro está guardado? O que faz ele **aumentar**? E **diminuir**?
- O Seu Jair compra 10 cafés a R$ 11. O que muda no Financeiro? E no Estoque?
- Um cliente leva 2 cafés a R$ 17,50 e paga com R$ 50. O que muda em cada tela? Quanto de troco?
- Depois da compra e da venda, o mercado ganhou ou perdeu dinheiro? Quanto?
- O que **não pode** acontecer? (vender o que não tem, comprar sem dinheiro, ...)
- Em que ordem as coisas precisam acontecer? O que acontece se der erro no meio do caminho?

**Pronto quando:** o desenho está fotografado na pasta `docs/` e enviado no seu primeiro commit.

---

## Fase 1: Financeiro

### 1.1 `calcularSaldo(movimentacoes)`

Feito passo a passo no [Comece aqui](COMECE-AQUI.md).

- **Recebe:** a lista de movimentações.
- **Devolve:** um número, entradas menos saídas.
- **Exemplo:** entradas de 500 e 30, saída de 100 → `430`.
- **Pronto quando:** o saldo do topo mostra R$ 500,00 e os testes 1.1 ficam verdes.

### 1.2 `totalPorTipo(movimentacoes, tipo)`

- **Recebe:** a lista de movimentações e um texto, `"entrada"` ou `"saida"`.
- **Devolve:** a soma só das movimentações daquele tipo.
- **Exemplo:** entradas 50; saídas 20 e 5 → `totalPorTipo(lista, "saida")` devolve `25`.
- **Pronto quando:** os cartões "Total de entradas" e "Total de saídas" do Financeiro aparecem certos.

<details><summary>Dica 1</summary>

É quase igual ao `calcularSaldo`. O que muda é a pergunta do `if`: em vez de "é entrada?", a
pergunta é "é do tipo que me pediram?".
</details>

<details><summary>Dica 2</summary>

```js
if (mov.tipo === tipo) { ... }
```
</details>

### 1.3 `registrarMovimentacao(dados, tipo, valor, descricao)`

- **Recebe:** todos os dados do mercado, o tipo, o valor e uma descrição.
- **Faz:** coloca uma movimentação nova no final de `dados.movimentacoes`.
- **Devolve:** `{ ok: true, mensagem: "..." }` se deu certo, ou `{ ok: false, mensagem: "motivo" }`.
- **Regras:** valor maior que zero; tipo só `"entrada"` ou `"saida"`. Saída maior que o saldo: você
  decide (e explica no PR).
- **Pronto quando:** no Financeiro, lançar "Conta de luz, saída, 80" faz o saldo cair para R$ 420,00.

<details><summary>Dica 1: primeiro as regras</summary>

Comece pelos "não pode". Se algo estiver errado, devolva o erro na hora e a função para ali:
```js
if (valor <= 0) {
  return { ok: false, mensagem: "O valor precisa ser maior que zero" };
}
```
</details>

<details><summary>Dica 2: como é uma movimentação nova</summary>

Ela tem os mesmos campos das que já existem (veja no Console com `carregarDados().movimentacoes`):
```js
const nova = {
  id: proximoId(dados.movimentacoes),
  data: new Date().toISOString(),
  tipo: tipo,
  valor: valor,
  descricao: descricao,
};
```
</details>

<details><summary>Dica 3: colocar na lista</summary>

`dados.movimentacoes.push(nova);` e depois `return { ok: true, mensagem: "Lançado!" };`
</details>

---

## Fase 2: Estoque

### 2.1 `produtosAbaixoDoMinimo(produtos)`

- **Recebe:** a lista de produtos.
- **Devolve:** uma **lista nova** só com os produtos que precisam de reposição.
- **Exemplo:** Café tem 2 e o mínimo é 4 → entra na lista. Leite tem 12 e o mínimo é 6 → não entra.
- **Pronto quando:** a tela Estoque mostra "Repor!" no Café e no Pão de forma.

<details><summary>Dica 1</summary>

Crie uma lista vazia (`const resultado = [];`), percorra os produtos com `for` e use
`resultado.push(produto)` quando ele precisar de reposição. No final, `return resultado;`.
</details>

<details><summary>Dica 2</summary>

A pergunta é `produto.quantidade < produto.estoqueMinimo`. Com `<=` também vale: decida qual faz
mais sentido para o Seu Jair.
</details>

### 2.2 `reporEstoque(dados, produtoId, quantidade)`

O Seu Jair compra do fornecedor: **sai dinheiro do Financeiro e entra produto no Estoque**.

- **Exemplo:** comprar 5 Pães de forma (custo R$ 4) → custa R$ 20. Saldo cai de 500 para 480 e o
  pão passa de 0 para 5.
- **Regras:** produto precisa existir; quantidade maior que zero; precisa ter dinheiro para pagar.
- **Pronto quando:** o exemplo acima funciona na tela e os testes 2.2 ficam verdes.

<details><summary>Dica 1: escreva os passos antes</summary>

1. achar o produto
2. conferir se a quantidade faz sentido
3. calcular quanto custa
4. conferir se tem dinheiro
5. tirar o dinheiro do financeiro
6. aumentar a quantidade do produto
7. devolver que deu certo
</details>

<details><summary>Dica 2: achar o produto</summary>

Já existe uma função pronta em `dados.js`: `const produto = buscarProduto(dados, produtoId);`.
Se não achar, ela devolve `undefined`.
</details>

<details><summary>Dica 3: tirar o dinheiro</summary>

Você já escreveu uma função que lança dinheiro: `registrarMovimentacao(dados, "saida", custo, "Compra de pão")`.
Ela devolve `{ ok, mensagem }`: se `ok` for `false`, pare e devolva o mesmo erro. Para saber se tem
dinheiro, use `calcularSaldo(dados.movimentacoes)`.
</details>

<details><summary>Dica 4: a ordem importa</summary>

Só aumente o estoque **depois** de conseguir pagar. Se fizer ao contrário e o pagamento falhar, o
Seu Jair ganha produto de graça.
</details>

---

## Fase 3: Caixa

Um **item do carrinho** tem este formato:
```js
{ produtoId: 1, nome: "Arroz 5kg", precoUnitario: 27.9, quantidade: 2 }
```

### 3.1 `adicionarAoCarrinho(carrinho, produto, quantidade)`

- **Faz:** coloca o produto no carrinho (o carrinho é uma lista).
- **Regras:** se o produto já está no carrinho, só aumenta a quantidade; não pode passar do estoque.
- **Devolve:** `{ ok, mensagem }`.
- **Pronto quando:** clicar duas vezes no Arroz mostra **uma** linha com quantidade 2, e clicar no
  Café mais de 2 vezes mostra o aviso de estoque.

<details><summary>Dica 1: já está no carrinho?</summary>

```js
const item = carrinho.find((i) => i.produtoId === produto.id);
```
Se `item` for `undefined`, o produto ainda não está no carrinho.
</details>

<details><summary>Dica 2: conferir o estoque</summary>

Some o que já está no carrinho com o que querem colocar agora, e compare com `produto.quantidade`.
</details>

<details><summary>Dica 3: colocar ou aumentar</summary>

Se já existe: `item.quantidade += quantidade;`. Se não: `carrinho.push({ produtoId: produto.id, ... })`
com os quatro campos do formato acima.
</details>

### 3.2 `removerDoCarrinho(carrinho, produtoId)`

- **Faz:** tira o item daquele produto do carrinho. Não precisa devolver nada.

<details><summary>Dica</summary>

Ache a posição com `carrinho.findIndex((i) => i.produtoId === produtoId)` e remova com
`carrinho.splice(posicao, 1)`. Se a posição for `-1`, o item não está lá.
</details>

### 3.3 `calcularTotal(carrinho)`

- **Devolve:** a soma de `precoUnitario × quantidade` de cada item.
- **Exemplo:** 2 arroz a R$ 20 + 1 café a R$ 15 → `55`.

<details><summary>Dica</summary>

É a mesma ideia do `calcularSaldo`: começa com zero, percorre a lista e vai somando.
</details>

### 3.4 `calcularTroco(total, valorPago)`

- **Devolve:** o troco, ou `null` se o dinheiro não dá.
- **Exemplo:** total 55, pagou 100 → `45`. Pagou 50 → `null`.
- **Pronto quando:** digitar o valor pago no Caixa mostra o troco na hora.

### 3.5 `finalizarVenda(dados, carrinho, valorPago)`: o grande final

É aqui que o ciclo fecha: **sai produto do Estoque, a venda fica registrada e o dinheiro entra no
Financeiro.**

- **Exemplo** (depois de repor o Pão no exercício 2.2): 1 Arroz (R$ 27,90) + 1 Pão (R$ 7,90), pago com R$ 50 → total R$ 35,80, troco
  R$ 14,20, o Arroz passa de 5 para 4 e o saldo sobe R$ 35,80.
- **Regras:** carrinho com itens; pagamento suficiente; estoque de tudo.
- **Pronto quando:** o teste **Ciclo** fica verde e a venda aparece no extrato do Financeiro.

<details><summary>Dica 1: escreva os passos antes</summary>

1. carrinho vazio? erro
2. calcular total e troco; troco `null`? erro
3. conferir o estoque de **todos** os itens
4. só então baixar o estoque de cada item
5. guardar a venda em `dados.vendas`
6. lançar a entrada do dinheiro no financeiro
7. devolver que deu certo, com o troco na mensagem
</details>

<details><summary>Dica 2: por que conferir tudo antes de baixar?</summary>

Se o carrinho tem Arroz e Café, e só falta Café, você não quer ter baixado o Arroz antes de
descobrir. Use um `for` só para conferir e **outro** `for` para baixar.
</details>

<details><summary>Dica 3: o formato de uma venda</summary>

```js
{ id: proximoId(dados.vendas), data: new Date().toISOString(), itens: carrinho, total, valorPago, troco }
```
</details>

<details><summary>Dica 4: reaproveite</summary>

Você já tem `calcularTotal`, `calcularTroco`, `buscarProduto` e `registrarMovimentacao`. A função
final é quase só chamar as outras na ordem certa.
</details>

---

## Fase 4: desafios extras (escolha os que quiser)

Cada desafio vira uma branch e um PR.

1. **Lucro:** mostrar no Financeiro quanto o mercado lucrou nas vendas (preço de venda menos custo).
2. **Vendas do dia:** cartão no Financeiro com o total vendido hoje.
3. **Desconto:** no caixa, desconto de 10% para compras acima de R$ 100.
4. **Cancelar venda:** botão que desfaz uma venda (o produto volta ao estoque e o dinheiro sai).
5. **Cadastrar produto:** formulário no Estoque para criar um produto novo.
6. **Formas de pagamento:** dinheiro, Pix ou cartão. Só dinheiro tem troco.
7. **Fechamento de caixa:** resumo do dia com quantidade de vendas, total e ticket médio.
8. **Crie seu próprio teste** em `js/testes.js` para cada regra nova que inventar.

## Para o mentor (Helio)

**Roteiro sugerido**

| Encontro | O que fazer | Meta |
|---|---|---|
| 1 | Preparar o computador, Fase 0 (desenho) e exercício 1.1 juntos, seguindo o Comece aqui. Primeiro commit e primeiro PR. | Saldo R$ 500 no site online |
| 2 | 1.2, 1.3 e 2.1 | Financeiro completo |
| 3 | 2.2 e 3.1 a 3.4 | Comprar e montar o carrinho |
| 4 | 3.5 e o teste Ciclo | 20 de 20 testes |
| 5+ | Desafios extras | Ela escolhe |

**Perguntas para fazer em vez de dar a resposta**

- "O que essa função recebe? Mostra no Console."
- "Faz no papel com o exemplo. Que conta você fez de cabeça?"
- "Por que você conferiu isso antes de mexer no estoque?"
- "E se o cliente clicar duas vezes no botão de finalizar?"
- "Esse número pode ser negativo? E com centavos, dá certo?" (dica: `0.1 + 0.2` no Console)
- "Onde mais essa regra se repete? Dá para virar uma função?"
