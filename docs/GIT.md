# Git, commit, PR e Vercel

Cada mudança que você fizer vai seguir o mesmo caminho que um time de verdade usa:

```
branch  ->  commits  ->  push  ->  Pull Request  ->  revisão do Helio  ->  merge  ->  site no ar
```

## Conceitos

| Termo | Analogia do mercado | O que é |
|---|---|---|
| **Repositório** | O caderno de contas do Seu Jair | A pasta do projeto com todo o histórico |
| **Commit** | Uma anotação datada no caderno | Uma "foto" das mudanças, com uma mensagem |
| **Branch** | Um rascunho numa folha separada | Uma linha de trabalho paralela, sem mexer na oficial |
| **main** | O caderno oficial | A branch principal, que vai para o site |
| **Push** | Levar o rascunho para o escritório | Enviar seus commits para o GitHub |
| **Pull Request (PR)** | Pedir pro Seu Jair conferir antes de passar a limpo | Pedido para juntar sua branch na main |
| **Merge** | O rascunho aprovado é passado a limpo | A branch entra na main |

## Preparação (uma vez só)

1. Instalar o Git: https://git-scm.com/downloads e o VS Code: https://code.visualstudio.com
2. Criar conta no GitHub e aceitar o convite do Helio para o repositório.
3. Configurar nome e e-mail:
   ```
   git config --global user.name "Leticia ..."
   git config --global user.email "seu@email.com"
   ```
4. Baixar o projeto:
   ```
   git clone https://github.com/hhenriqu/minimercado-jair-machado.git
   cd minimercado-jair-machado
   code .
   ```

## O ciclo de cada exercício

```
git switch main                      # volta para a versão oficial
git pull                             # traz o que já foi aprovado
git switch -c fase-1-saldo           # cria seu rascunho
# ... programa, testa no testes.html ...
git status                           # o que mudou?
git add js/logica.js                 # escolhe o que vai na foto
git commit -m "Calcula o saldo do financeiro"
git push -u origin fase-1-saldo      # manda para o GitHub
```

Depois, no GitHub, clique em **Compare & pull request**, escreva o que fez e como testou, e peça
revisão para o Helio. Ele vai comentar, você ajusta (novos commits na mesma branch entram no PR
sozinhos) e, quando ele aprovar, clique em **Merge**.

### Boas mensagens de commit

- Comece com um verbo: "Calcula o saldo", "Bloqueia venda sem estoque", "Corrige troco com centavos".
- Um commit por ideia. Se precisar de "e" na mensagem, talvez sejam dois commits.

### Modelo de descrição do PR

```
## O que fiz
Programei calcularSaldo e totalPorTipo.

## Como testei
testes.html: 1.1 e 1.2 verdes. No site, o saldo do topo mostra R$ 500,00.

## Dúvidas
Uma saída maior que o saldo deve ser bloqueada?
```

## Vercel: o site no ar

O Helio conecta o repositório na Vercel uma vez (*Add New › Project › Import* o repositório,
*Framework Preset: Other*, sem comando de build). A partir daí:

- Todo **merge na main** atualiza o site oficial sozinho.
- Todo **PR** ganha um link de *Preview* nos comentários do PR. Dá para testar a mudança online antes
  de aprovar.

Os dados ficam guardados no navegador de quem usa (localStorage). Cada pessoa vê o seu próprio
mercadinho, e o botão "Voltar ao primeiro dia" recomeça do zero.
