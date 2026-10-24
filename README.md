# Minimercado Jair Machado

Sistema do mercadinho do Seu Jair, feito num hackathon para praticar **lógica de programação**.
São três telas que conversam entre si através do dinheiro e dos produtos:

| Tela | Para que serve |
|---|---|
| **Financeiro** | Saldo, entradas, saídas e extrato |
| **Estoque** | Produtos, alerta de reposição e compra do fornecedor |
| **Caixa** | Carrinho, total, troco e finalização da venda |

```
 FINANCEIRO  --paga-->  ESTOQUE  --vira produto-->  CAIXA
     ^                                                |
     +------------- dinheiro da venda volta ----------+
```

As telas estão prontas. A lógica do ciclo está em `js/logica.js`, com um `TODO` em cada função.

## Começando

- [Exercícios](docs/EXERCICIOS.md): o que programar, em que ordem.
- [Git, PR e Vercel](docs/GIT.md): como mandar cada mudança para o site no ar.
- `testes.html`: confere a lógica. A meta é ficar tudo verde.

## Como rodar

É um site estático (HTML, CSS e JavaScript puro), sem instalação. Abra `index.html` no navegador
ou use a extensão Live Server do VS Code. Os dados ficam no `localStorage` do navegador.

## Estrutura

```
index.html, caixa.html, estoque.html, financeiro.html, testes.html
css/style.css
js/dados.js        guarda e lê os dados (pronto)
js/logica.js       AS REGRAS DO MERCADO (é aqui que se programa)
js/caixa.js        desenha a tela do Caixa (pronto)
js/estoque.js      desenha a tela do Estoque (pronto)
js/financeiro.js   desenha a tela do Financeiro (pronto)
js/testes.js       testes da lógica (pronto, dá para criar mais)
docs/              exercícios e guia de Git
```
