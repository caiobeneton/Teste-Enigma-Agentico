# PROC-06. Repasse do projeto e revisão EGM

## Identificação e andamento

- Origem: pedido para desmarcar as tarefas iniciais em uma cópia e revisar a proposta do Nexo com `/egm-review`.
- Status: concluída.
- Ponto inicial: `4e4fe17c272cf335e1f76bda57ee9b636268fcd6`, com árvore limpa.
- Mudança relacionada: [define-puzzle-platform-mvp](../../openspec/changes/define-puzzle-platform-mvp/).
- Tutorial: [PROC-06](../tutoriais/PROC-06.md).
- Commit de entrega: trailer `Task: PROC-06`.

## Objetivo e arquitetura

Preparar o planejamento para a equipe começar em outro repositório. O gerente exportou `docs/`, `openspec/`, `AGENTS.md` e `.codex/agents/` para a pasta local `nexo-para-recomecar/`. O arquiteto recomendou preservar os 41 IDs e manter a cópia fora do índice Git de origem. No Git de origem entram o registro, o tutorial, o índice e a revisão. Assim, a fila continua representando a implementação de cada repositório.

A cópia desmarca 1.1, 1.2 e 1.3. Seu README, guia visual, índice de tutoriais e registros 1.1 a 1.3 identificam a implementação e as evidências históricas como pertencentes à origem. Alguns links dos registros e tutoriais antigos apontam para arquivos que a equipe ainda vai recriar. A entrega documental dispensa implementação e revisão visual de telas.

## Revisão EGM

O gerente escolheu a execução consolidada. Para a leitura, reuniu a proposta, o design e a fila em um documento temporário. A proposta ocupava as linhas 1 a 196 e a implementação, as linhas 197 a 511. O design começava na linha 199 e as tarefas na linha 427. Os revisores trabalharam em conversas sem o histórico do agente principal. A etapa de compreensão usou apenas o documento de leitura. As demais etapas consultaram as specs e as referências locais de arquitetura e interface. [Relatório consolidado](../revisoes/PROC-06/consolidated_review_report.md).

As observações do EGM foram registradas para discussão. O escopo funcional, as quatro specs, o design e os critérios das tarefas permanecem como estavam no ponto inicial. O guia visual da cópia recebeu uma atualização de contexto histórico, sem alterar as regras de interface. [Revisão anterior](PROC-05.md).

## Verificações e evidências

| Tipo | Procedimento | Resultado |
| --- | --- | --- |
| Comparação de arquivos | Lista de `git ls-tree` do commit-base, comparação de blobs e `git diff --no-index` entre as filas | Os 44 arquivos exportados estão presentes. Os 41 IDs são iguais na mesma ordem. A origem tem três tarefas concluídas. A cópia tem zero. |
| Validação estrutural | `openspec validate define-puzzle-platform-mvp --strict --no-interactive` na raiz da cópia, OpenSpec 2.0.0 | O comando confirmou que a mudança é válida. |
| Inspeção documental | Conferência dos links relativos dos documentos de entrada e do conteúdo da cópia | O programador verificou 35 referências relativas em 12 arquivos, todas com destino presente. Os links históricos para código de origem estão identificados no README. |
| Inspeção final | Comparação dos blobs com `git hash-object` e resolução dos links do README e dos relatórios | O gerente conferiu os 44 arquivos exportados e as seis diferenças previstas. Verificou seis arquivos de revisão e 20 links do README e dos relatórios. A entrada temporária do EGM foi retirada da cópia. |
| Teste isolado | SQLite 3.50.4 em memória com tabelas mínimas de etapas e progresso | A referência composta falhou sem `UNIQUE(id, puzzle_id)`. Com essa restrição, o SQLite aceitou a inserção válida e recusou a etapa de outro enigma. |
| Teste isolado | `toLowerCase()` para `['ΟΣ', 'Οσ', 'ος']` em Node.js 24.11.1 | O resultado `['ος', 'οσ', 'ος']` confirmou duas chaves diferentes no mesmo exemplo de comparação de caixa. |

A validação OpenSpec confere a estrutura do planejamento. O teste SQL usa dados fictícios e verifica uma restrição do banco. A cópia ainda precisa da implementação e dos testes da aplicação.

## Tutorial e aceite

O professor conferiu a fila desmarcada, o README da cópia, os links do tutorial e o resultado da validação estrita. O gerente conferiu as cinco etapas, os arquivos de repasse, a correspondência entre relatório e tutorial e os links do índice. O commit contém o relatório e os documentos do PROC-06. A cópia para o novo repositório fica na pasta local indicada no tutorial.
