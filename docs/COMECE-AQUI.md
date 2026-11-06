# Comece aqui

Este guia leva você do zero até o **primeiro exercício funcionando**, um passo de cada vez.
Depois dele, todos os outros exercícios seguem o mesmo método.

## Entendendo o que você recebeu

O site já existe e já tem as três telas. Só que ele ainda **não sabe fazer contas**. Por exemplo:

- O saldo no topo mostra **R$ 0,00**, mas o Seu Jair começou com R$ 500.
- Clicar em "Comprar e repor" no Estoque mostra o aviso *"Falta programar reporEstoque"*.
- Clicar num produto no Caixa mostra *"Falta programar adicionarAoCarrinho"*.

Cada aviso desses aponta para uma função vazia no arquivo `js/logica.js`. **Seu trabalho é
preencher essas funções**, e você não precisa mexer em nenhum outro arquivo.

| Arquivo | Quem mexe |
|---|---|
| `js/logica.js` | **Você.** As regras do mercado. |
| `js/testes.js` | Já pronto. Confere se as suas regras estão certas. |
| Todo o resto (HTML, CSS, `caixa.js`, ...) | Já pronto. Só desenha as telas. |

## Passo 1: preparar o computador (uma vez só)

1. Instale o [VS Code](https://code.visualstudio.com) e o [Git](https://git-scm.com/downloads).
2. No VS Code, instale a extensão **Live Server** (ícone de quadradinhos na barra lateral, procure
   por "Live Server").
3. Baixe o projeto. Abra o terminal (no VS Code: menu *Terminal › New Terminal*) e digite:
   ```
   git clone https://github.com/hhenriqu/minimercado-jair-machado.git
   cd minimercado-jair-machado
   code .
   ```
4. Com o projeto aberto no VS Code, clique com o botão direito em `index.html` e escolha
   **Open with Live Server**. O site abre no navegador.

## Passo 2: olhar o sistema "quebrado"

Antes de programar, veja o problema com os próprios olhos:

1. No site, clique em **Financeiro**. O saldo está R$ 0,00. Mas olhe o extrato: tem uma entrada de
   R$ 500,00! O extrato já sabe que o dinheiro chegou, só falta alguém **somar**.
2. Abra `testes.html` no navegador (troque `index.html` por `testes.html` na barra de endereço).
   Vai aparecer algo como *"2 de 20 testes passando"*. A meta da hackathon é chegar a 20 de 20.
3. Aperte **F12** e clique na aba **Console**. Deixe aberta: é a sua janela para dentro do código.

## Passo 3: o primeiro exercício, `calcularSaldo`

### 3.1 Encontre a função

Abra `js/logica.js` no VS Code e procure (Ctrl+F) por `calcularSaldo`. Você vai ver:

```js
function calcularSaldo(movimentacoes) {
  // TODO: percorra as movimentações e calcule o saldo
  return 0;
}
```

Por que o saldo aparece R$ 0,00? Porque a função sempre devolve `0`, sem olhar nada.

### 3.2 Olhe o que a função recebe

A função recebe `movimentacoes`, uma lista. Para ver como ela é de verdade, digite isto no Console
do navegador e aperte Enter:

```js
carregarDados().movimentacoes
```

Clique na setinha para abrir. Cada item tem um `tipo` (`"entrada"` ou `"saida"`) e um `valor`.

### 3.3 Resolva no papel, sem código

Imagine esta lista:

| tipo | valor |
|---|---|
| entrada | 500 |
| entrada | 30 |
| saida | 100 |

Qual é o saldo? Como você chegou nesse número? Escreva os passos **em português**, como se
explicasse para o Seu Jair. Por exemplo: *"começo com zero, olho a primeira linha, ..."*.

### 3.4 Transforme os passos em comentários

Dentro da função, troque o `// TODO` pelos seus passos, um por linha, como comentários:

```js
function calcularSaldo(movimentacoes) {
  // começo com saldo zero
  // para cada movimentação da lista:
  //   se for entrada, ...
  //   se for saída, ...
  // no final, devolvo o saldo
  return 0;
}
```

### 3.5 Transforme cada comentário em código

Agora, uma linha de cada vez. Se travar, abra as dicas abaixo **uma por vez**.

<details>
<summary>Dica 1: como guardar um número que vai mudando?</summary>

Use uma variável criada com `let` (porque ela vai mudar):
```js
let saldo = 0;
```
</details>

<details>
<summary>Dica 2: como passar por cada item da lista?</summary>

```js
for (const mov of movimentacoes) {
  // aqui dentro, "mov" é uma movimentação por vez
  console.log(mov.tipo, mov.valor);
}
```
Salve, recarregue o site e olhe o Console: aparece cada movimentação.
</details>

<details>
<summary>Dica 3: como decidir se soma ou subtrai?</summary>

```js
if (mov.tipo === "entrada") {
  // somar
} else if (mov.tipo === "saida") {
  // subtrair
}
```
Para somar na variável: `saldo = saldo + mov.valor;` (ou o atalho `saldo += mov.valor;`).
</details>

<details>
<summary>Dica 4: e o final?</summary>

Troque o `return 0;` por `return saldo;`. A função precisa **devolver** o resultado para a tela
conseguir mostrar.
</details>

### 3.6 Confira

1. Salve o arquivo (Ctrl+S). O Live Server recarrega o site sozinho.
2. O saldo no topo deve mostrar **R$ 500,00**.
3. Em `testes.html`, as duas linhas do exercício **1.1** devem estar verdes ("Passou").
4. Não funcionou? Olhe o Console (F12). Erro em vermelho mostra o arquivo e a linha.

### 3.7 Guarde o trabalho (commit e Pull Request)

```
git switch -c exercicio-1-1-saldo
git add js/logica.js
git commit -m "Calcula o saldo do financeiro"
git push -u origin exercicio-1-1-saldo
```

No GitHub, clique em **Compare & pull request**, escreva o que fez e peça revisão para o Helio.
Depois que ele aprovar e você clicar em **Merge**, o site na Vercel atualiza sozinho e o saldo
aparece certo online. Detalhes em [GIT.md](GIT.md).

## O método, para todos os outros exercícios

Você acabou de usar o método que serve para **todas** as funções. Repita para cada uma:

1. **Encontre** a função em `js/logica.js` e leia o comentário em cima dela.
2. **Olhe** o que ela recebe (`console.log` ou o Console do navegador).
3. **Resolva no papel** com um exemplo pequeno.
4. **Escreva os passos** em português, como comentários.
5. **Troque cada comentário** por código, uma linha por vez, salvando e olhando o Console.
6. **Confira** em `testes.html` e no site.
7. **Commit e PR.**

A ordem dos exercícios e as dicas de cada um estão em [EXERCICIOS.md](EXERCICIOS.md). Siga na ordem:
cada exercício usa o anterior.
