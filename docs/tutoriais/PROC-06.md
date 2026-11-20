# PROC-06. Levar o Nexo para um novo repositório

## O que foi entregue

A pasta local `nexo-para-recomecar/` reúne a documentação, o planejamento OpenSpec e as instruções dos agentes. A fila da cópia começa com as 41 tarefas pendentes. Os tutoriais e registros de 1.1 a 1.3 descrevem a implementação da origem no commit `4e4fe17`.

A revisão EGM confirmou que a proposta orienta o início do projeto e apontou ajustes para as tarefas seguintes. O primeiro deles é definir a chave composta que o SQLite exige para vincular a etapa atual ao enigma na tarefa 2.1.

## Arquivos

- O `README.md` da pasta de repasse indica a ordem de leitura e as primeiras tarefas.
- [Relatório EGM consolidado](../revisoes/PROC-06/consolidated_review_report.md).
- [Registro da entrega e das verificações](../registros/PROC-06.md).

## Como usar ou conferir

1. Copie o conteúdo de `nexo-para-recomecar/` para a raiz do repositório novo, incluindo a pasta oculta `.codex/`.
2. Abra o `README.md` da cópia. Use a fila para acompanhar o trabalho e os tutoriais anteriores como referência para refazer a base.
3. Se tiver o OpenSpec instalado, execute o comando abaixo na raiz do repositório novo. O resultado esperado é `Change 'define-puzzle-platform-mvp' is valid`. O comando verifica os documentos. A execução da aplicação depende da implementação.

   ```powershell
   openspec validate define-puzzle-platform-mvp --strict --no-interactive
   ```
