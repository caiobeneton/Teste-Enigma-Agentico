# PROC-03 — Exigir código simples para quem está aprendendo

## Identificação e andamento

- Origem: solicitação de 20/11/2026 para revisar os documentos e exigir código compreensível independentemente da proficiência na stack.
- Status: concluída.
- Dependências: [PROC-01](PROC-01.md) e [fluxo de trabalho](../fluxo-de-trabalho.md).
- Ponto inicial: `b0b983292b3b908805be2009c6449713cb048203`, com árvore de trabalho limpa.
- Papéis: agente principal como gerente, com análise do arquiteto, implementação documental do programador web e tutorial do professor. A tarefa trata de orientações de engenharia e ensino, sem interface para projetar ou revisar.
- Tutorial: [PROC-03](../tutoriais/PROC-03.md).
- Commit de entrega: localizar pelo trailer `Task: PROC-03`.

## Objetivo e aceite

Toda entrega de código deve usar a solução mais simples que atenda aos requisitos. A revisão precisa identificar no código a sequência das ações, seus resultados e os casos de erro pertinentes. A regra inclui código da aplicação, testes, scripts, migrações, configuração executável e exemplos. Recursos avançados exigidos pelos requisitos ou pela stack precisam de justificativa no registro e explicação no tutorial.

## Arquitetura

O arquiteto propôs incorporar a simplicidade ao EDU-01 e detalhar a regra no fluxo de trabalho. O planejamento, a implementação, a revisão e o ensino adotam o mesmo critério. `AGENTS.md`, `README.md` e a mudança ativa do OpenSpec apontam para o fluxo. Os dois modelos ajudam a registrar e ensinar a decisão. Uma regra única evita manter versões concorrentes em perfis, documentos e tarefas. Cotas de linhas não indicariam se o leitor consegue seguir as operações.

O escopo reúne instruções, modelos e configuração do processo. No `tasks.md`, a regra entra no cabeçalho de aceite do EDU-01.

## Implementação documental

O programador registrou a regra e o modo de revisar código em [Código simples para quem está aprendendo](../fluxo-de-trabalho.md#código-simples-para-quem-está-aprendendo). A seção indica como identificar complexidade que pode ser removida e como lidar com recursos exigidos pela stack. O fluxo atribui a escolha ao arquiteto, a aplicação ao programador, a revisão da explicação ao professor e o aceite ao gerente.

O [README](../../README.md) e as [instruções dos agentes](../../AGENTS.md) apresentam a regra e apontam para o fluxo. Os [modelos de registro](../modelos/tarefa.md) e [tutorial](../modelos/tutorial.md) pedem evidências da revisão e explicações ao nível de quem está aprendendo. A [configuração do OpenSpec](../../openspec/config.yaml) inclui a regra no contexto do projeto. O [cabeçalho das tarefas](../../openspec/changes/define-puzzle-platform-mvp/tasks.md) referencia o critério de aceite.

## Verificações e evidências

Na raiz do projeto, em Windows e PowerShell 5.1, o gerente executou os comandos abaixo com o OpenSpec 2.0.0 disponível no cache local do npm.

```powershell
npm.cmd exec --offline --yes --cache "$env:TEMP\teste-enigma-npm-cache" --package @fission-ai/openspec -- openspec validate define-puzzle-platform-mvp --strict --no-interactive
npm.cmd exec --offline --yes --cache "$env:TEMP\teste-enigma-npm-cache" --package @fission-ai/openspec -- openspec instructions tasks --change define-puzzle-platform-mvp --json
```

A validação passou. As instruções geradas incluíram o critério de simplicidade e a orientação de revisar a legibilidade para iniciantes no campo `context`.

O programador verificou 22 links e âncoras nos seis arquivos Markdown da implementação. Comparou as linhas de tarefas com o commit-base e encontrou os mesmos 41 itens, com 3 marcados. `git diff --check` passou com avisos sobre finais de linha do Git. O comando abaixo, executado antes do staging, terminou com código 0 e sem diferenças.

```powershell
git diff --exit-code HEAD -- api web package.json package-lock.json openspec/changes/define-puzzle-platform-mvp/specs openspec/changes/define-puzzle-platform-mvp/proposal.md openspec/changes/define-puzzle-platform-mvp/design.md
```

O gerente conferiu os links locais, as âncoras e a lista de arquivos da entrega. Executou o exemplo JavaScript extraído do tutorial com Node v24.11.1. O resultado foi `Informe o nome.` seguido de `Nome aceito.`, como previsto para as duas entradas. A revisão de legibilidade foi feita pela equipe por leitura do exemplo e da documentação.

## Entrega didática

O professor leu a regra, o diff e os modelos. O [tutorial](../tutoriais/PROC-03.md) explica como escrever a regra, exercitar a revisão de um trecho, atribuir responsabilidades e integrar a mesma orientação aos documentos usados durante uma tarefa. Para reproduzir os passos, o professor criou um clone temporário com `git clone --no-hardlinks`, selecionou o commit-base com `git switch --detach` e sobrepôs as edições com `git apply` e a cópia dos arquivos novos.

Na cópia, `git diff --check` passou e o diff da fila mostrou apenas o acréscimo no cabeçalho. O professor executou o exemplo do capítulo com `node "$env:TEMP\nexo-proc03-exemplo.js"` e obteve as duas mensagens esperadas. Também conferiu 24 links e âncoras do capítulo e do índice. A reprodução ocorreu em um instantâneo anterior ao commit de entrega.

Os capítulos PROC-01 e PROC-02 conservam os pontos iniciais indicados nos próprios textos e remetem ao fluxo vigente. O índice apresenta o novo capítulo e indica o critério a usar nas próximas tarefas.

## Revisão do gerente

O gerente conferiu o escopo, a correspondência entre o tutorial e o diff, os links e o exemplo de código. O exemplo usa nome descritivo, uma condição e retornos explícitos. A regra de aceite indica o que o revisor deve seguir no código e o que registrar. A entrega reúne dez arquivos de documentação e configuração de processo.

## Pendências e retomada

Nenhuma pendência de aceite documental.
