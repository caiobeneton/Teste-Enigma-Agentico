# Revisão EGM do planejamento do Nexo

## Parecer

**A proposta está boa para orientar o início do projeto. O plano precisa de correções pontuais antes de implementar persistência, autenticação e edição de publicados.** O primeiro bloqueio afeta a tarefa 2.1. A chave estrangeira da etapa atual usa duas colunas, mas o modelo não declara uma chave única para o par correspondente em `steps`. A falha foi reproduzida em SQLite em memória.

A proposta delimita o MVP, explica a jornada de quem publica e de quem joga e registra o que o piloto quer observar. As quatro specs dão critérios para conta, entrada, autoria e progressão. React, Express e SQLite em uma instância formam um desenho viável para o pequeno piloto. A equipe ainda precisa decidir como reconhecer uma sessão expirada, como salvar alterações de um publicado e como executar a primeira verificação integrada cedo.

Este parecer usa o commit `4e4fe17` como referência da origem e a cópia com as 41 tarefas pendentes como referência da equipe nova. [Proposta](../../../openspec/changes/define-puzzle-platform-mvp/proposal.md) · [Design](../../../openspec/changes/define-puzzle-platform-mvp/design.md) · [Specs](../../../openspec/changes/define-puzzle-platform-mvp/specs/) · [Fila](../../../openspec/changes/define-puzzle-platform-mvp/tasks.md).

## Ações por prioridade

As tarefas citadas são os pontos de decisão na fila existente. Os números entre parênteses indicam as etapas EGM que levantaram ou confirmaram o tema.

| Prioridade | Ação proposta e critério de aceite | Onde tratar |
| --- | --- | --- |
| Bloqueio | Definir a chave única `steps(id, puzzle_id)` que sustenta a referência da etapa atual. Em SQLite, inserir progresso válido, recusar etapa de outro enigma e testar exclusão em cascata. O ensaio isolado aceitou a primeira tentativa de inserção e recusou a segunda com a chave declarada. | Design 5, tarefas 2.1 e 2.3, revisão anterior e evidência desta rodada (9). |
| Alta | Definir como o comando e o servidor executam ou verificam o mesmo conjunto de migrações. Testar que uma migração com falha desfaz a execução e impede a abertura da porta de produção. | Design, plano de migração, tarefas 2.1 e 8.3, revisão anterior (9). |
| Alta | Fechar os contratos de sessão e destino. Definir o cabeçalho e a devolução do token CSRF após login, distinguir erro de senha de expiração e revalidar o destino selecionado antes de retomá-lo. Preservar a edição local só para a mesma conta. Testar logout com outra requisição em andamento. | Design 2, 6 e 7, tarefas 3.2 a 3.5, 5.1, 6.2 e 7.2 (6, 8, 9). |
| Alta | Definir o que cada ação de edição de um publicado salva e a versão devolvida. Testar alterações simultâneas, resultado parcial e prioridade de erro após o primeiro acerto. Alinhar a regra de campos obrigatórios do design com a spec e recusar edições que apaguem o enunciado ou a resposta. | Design 2, 5, 7 e 8, tarefas 4.3, 4.4, 4.6, 5.6 e 7.4 (5, 6, 7, 8, 9). |
| Alta | Exercitar cedo uma jornada com duas contas, navegador, API e SQLite reais. Uma conta publica uma etapa e a outra encontra e conclui o enigma. O cenário completo de produção local permanece em 8.1. | Design 9, tarefas 6.3, 7.3 e 8.1 (5, 8). |
| Alta | Definir como uma pessoa volta à entrada após concluir e como a tela trata respostas atrasadas quando só o conteúdo mudou. Testar retorno por teclado e duas respostas entregues em ordem inversa, preservando a informação mais recente. | Design 2 e 8, tarefas 6.5 e 6.6 (6, 7, 8, 9). |
| Alta | Definir o que cada participante recebe e quando o observador intervém. Dar ao criador o comando e ao jogador o nome, orientar sobre locais permitidos e verificar o canal de relatos. Ensaiar a entrada de um grupo na mesma rede e documentar a consequência de identificar nomes disponíveis antes da senha. | Proposta, escopo e riscos, design 6, tarefas 3.4 e 8.4 (5, 6, 7, 8). |
| Alta | Ensaiar a restauração de um backup anterior a uma exclusão. Especificar como verificar exclusões ocorridas depois do backup e quando suspender a restauração. | Design, plano de migração, tarefa 8.3 (6, 8). |
| Alta | Especificar os IDs e as ordens aceitas em rascunhos. Testar duplicatas, omissões e mudança de etapa de uma dica. Um pedido recusado preserva o snapshot anterior. | Design 7 e 8, tarefa 4.2 (9). |
| Média | Fixar a contagem de caracteres e a política de caixa Unicode. Em JavaScript, `toLowerCase()` gera `ος` e `οσ` para `ΟΣ` e `Οσ`. Testar as equivalências decididas para conta, busca e resposta. | Design 3 e 4, tarefa 2.2 (6, 7, 8, 9). |
| Média | Explicitar quais tentativas alteram versão. Testar a repetição depois de resposta incorreta, dica esgotada e avanço confirmado. Fixar o comportamento da exclusão confirmada com uma versão anterior ao primeiro acerto global. | Design 8, tarefas 5.4 e 5.6 (9). |
| Média | Antes de iniciar cada tarefa, informar os arquivos previstos e o comando de aceite no registro de arquitetura. Nas primeiras tarefas, explicitar a verificação de produção local e quando validar o driver SQLite. | Fluxo de trabalho, design 1 e 9, tarefas 1.1 a 1.3 e 2.1 (9). |
| Média | Ligar as quatro capacidades às specs e aos trechos do design que justificam as escolhas técnicas. Corrigir a frase sobre `/dica` e `/inicio` para dizer que são comandos e que o cadastro de respostas corretas os rejeita. | Proposta, escopo, pendências e capacidades (7). |
| Resolvida na cópia | O README, o guia, o índice e os registros 1.1 a 1.3 indicam a origem da implementação de referência. Os 41 IDs foram preservados e os três marcadores iniciais foram desmarcados. | Repasse (5, 7, 8). |

## Evidências e limites

- OpenSpec 2.0.0 validou a mudança na cópia com `openspec validate define-puzzle-platform-mvp --strict --no-interactive`.
- SQLite 3.50.4, em memória, retornou `foreign key mismatch` na inserção de progresso sem unicidade do par referenciado. Com `UNIQUE(id, puzzle_id)`, aceitou a etapa do mesmo enigma e recusou a etapa de outro enigma.
- Node 24.11.1 retornou `["ος","οσ","ος"]` ao aplicar `toLowerCase()` a `['ΟΣ', 'Οσ', 'ος']`.
- Esta rodada analisou o planejamento e executou testes isolados. O [registro PROC-05](../../registros/PROC-05.md) contém a revisão anterior e mais cenários de aceite.

## Relatórios por etapa

1. [Etapa 5. Leitura inicial](zoom_out_report.md).
2. [Etapa 6. Compreensão](comprehension_report.md).
3. [Etapa 7. Crítica da proposta](critic_report.md).
4. [Etapa 8. Segunda leitura](intermediate_zoom_out_report.md).
5. [Etapa 9. Prontidão da implementação](implementation_readiness_report.md).
