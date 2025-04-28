# Kanban

O projeto é um organizador de tarefas inspirado na metodologia ágil Kanban, visa otimizar o fluxo de atividades utilizando cartões ou outros elementos visuais em um quadro.

## Como testar o projeto?

O projeto está hospedado no Vercel, então você pode clicar no link:  
[https://cyrrus-desafio.vercel.app](https://cyrrus-desafio.vercel.app)

Ou então fazer o download do projeto e abrir o `index.html` no seu navegador.

## Perguntas

### 1. Qual foi sua lógica para estruturar o projeto?

Decidi não me arriscar em fazer algo que não conheço por conta do prazo, então fiz HTML/CSS/JavaScript puro, algo simples e funcional. Para o script não ficar muito grande, separei em arquivos de acordo com sua função. Primeiro, implementei as funcionalidades principais, como as colunas e a adição de tarefas. Depois de ver que estava tudo funcionando, fui adicionando aos poucos os outros requisitos propostos.

### 2. Que parte você achou mais difícil ou travou?

Uma das partes mais difíceis para mim foi separar o `Script.js`. Inicialmente, quando implementei as funcionalidades básicas, fiz todo o JavaScript em um único arquivo. Mas quando o projeto foi aumentando, a manutenção ficou muito difícil porque o código estava muito longo e desorganizado. Então decidi que iria separar o script e fazer vários arquivos de acordo com o propósito das funções, o que me fez travar um pouco porque eu ainda não sabia como fazer uma função ser reconhecida em outro arquivo JavaScript (tipo um import).  
Também não entendia direito como os arquivos se "comunicavam" entre si, nem como o `window` poderia ser usado.  
Esses pontos me fizeram perder um tempo até entender como organizar corretamente o projeto e deixar os arquivos conversando entre si.

### 3. O que faria diferente se tivesse mais tempo?

Arrumaria melhor o front-end, deixaria as cores mais bonitas com uma paleta que combina.  
Além disso, tentaria fazer algo a mais do que o JavaScript puro, tentaria usar Angular ou Node.js.

### 4. O que faria diferente se fosse para um cliente real?

Com certeza, implementaria um banco de dados, além de escolher melhor as ferramentas para o projeto, como Angular, Firebase, Ionic e Node.js. Estudaria mais sobre essas tecnologias antes de tudo.  
Também faria um sistema de cadastro e login.

### 5. Você usou alguma ferramenta ou inteligência artificial para ajudar? Como?

Minha principal ferramenta para ajudar a desenvolver o projeto foi o YouTube, mas também usei o ChatGPT para me ajudar a implementar algumas coisas que eu não sabia e corrigir alguns erros.  
Por exemplo, as subtarefas sumiam quando eu arrastava a tarefa para outro campo. Usei o ChatGPT para me ajudar a resolver isso, ele sugeriu colocar um tempo de delay para esperar o drop terminar e atrasar um pouquinho antes de salvar a tarefa.  
Isso me ajudou muito, foi uma solução que eu não teria imaginado sozinha.

## Como funciona o projeto?

- Para adicionar uma tarefa, clique no símbolo "+" acima da coluna que deseja criar.
- Após isso, coloque as informações no modal da tarefa e clique em "Salvar". A tarefa será criada.
  
- As tarefas podem ser movimentadas por todas as colunas, inclusive dentro de uma mesma coluna.
- Você pode pesquisar por uma tarefa específica e, ao encontrá-la, clicar sobre o nome dela para ser redirecionado para o local onde ela está no quadro.
  
- Para atualizar uma tarefa, clique no símbolo de lápis, altere suas informações e clique em salvar.
- Para adicionar subtarefas, clique no ícone de lista, escreva a subtarefa e aperte Enter.
- Você pode marcar as subtarefas como feitas no checklist.
- Você também pode excluir uma subtarefa clicando no símbolo "-" ao lado.
- Caso deseje deletar a tarefa, clique no ícone de lixo e confirme.
