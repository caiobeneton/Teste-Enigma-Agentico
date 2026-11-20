# PROC-04. Encurtar os tutoriais

## Identificação

- Origem: pedido para documentar o que foi implementado em um formato curto.
- Status: concluída.
- Dependência: [PROC-03](PROC-03.md).
- Ponto inicial: `4b3e3e77551bfe93d05c1f1dff628dde4a448211`.
- Equipe: gerente, arquiteto, programador web e professor.
- Entrega: [PROC-04](../tutoriais/PROC-04.md).
- Commit: trailer `Task: PROC-04`.

## Aceite

Cada capítulo descreve a entrega e indica os arquivos e o registro. Comandos entram quando forem úteis para usar ou conferir o resultado. O modelo e as instruções vigentes adotam o mesmo formato.

## Decisão

O arquiteto propôs manter os caminhos existentes e substituir os seis capítulos por resumos. Os registros e commits das entregas preservam as evidências históricas. As instruções ativas passam a pedir o mesmo formato curto.

## Alterações

O fluxo, os modelos, `AGENTS.md`, o README, os perfis e o OpenSpec adotam o resumo por entrega. O critério de simplicidade do código permanece no EDU-01.

O professor reduziu os seis capítulos de 1.951 para 77 linhas no total. Acrescentou o resumo da PROC-04 e atualizou o índice.

## Verificação

- `npm run build` e `npm test` na raiz, com Node 24.22.3 e npm 11.19.1 no Windows. Build concluído e cinco testes aprovados.
- OpenSpec 2.0.0 validou `define-puzzle-platform-mvp` com `--strict --no-interactive`. As instruções de tarefas incluem o novo formato.
- Python 3.14 leu os cinco perfis TOML e conferiu seus nomes.
- A revisão conferiu links e âncoras e comparou os resumos com as entregas. O diff contém 22 arquivos de documentação e instruções, com os 41 itens da fila do MVP preservados.

## Revisão

O gerente conferiu os capítulos, o índice, o modelo e as instruções. Cada capítulo tem de 10 a 15 linhas e aponta para o registro da tarefa.
