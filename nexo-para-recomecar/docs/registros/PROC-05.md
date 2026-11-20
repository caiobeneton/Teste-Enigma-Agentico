# PROC-05. Revisão EGM do MVP

- Origem: pedido para revisar as quatro specs e a prontidão do design OpenSpec.
- Status: concluída.
- Ponto inicial: `7dec5eeac84e4894da43297ea6e36a3bc697bf94`.
- Mudança: [`define-puzzle-platform-mvp`](../../openspec/changes/define-puzzle-platform-mvp/).
- Resumo: [PROC-05](../tutoriais/PROC-05.md).
- Commit: trailer `Task: PROC-05`.

## Escopo e método

O arquiteto delimitou os critérios entre comportamento, design e tarefas. A primeira rodada usa `egm-review` no modo `feature_spec`, com a proposta como contexto. Cada teste de compreensão teve um agente dedicado à sua spec. Nas outras etapas, cada revisor fez passagens separadas pelas quatro specs. A segunda rodada usa `egm-review-loop` sobre o design, com a proposta, as quatro specs e a fila em contexto. Os revisores EGM começam em conversas sem o histórico do agente principal. O designer do projeto também fez uma leitura textual das jornadas.

Os resultados dizem respeito ao planejamento. A implementação autorizada no ponto inicial cobre três das 41 tarefas. A revisão leu as quatro specs, com 42 requisitos e 75 cenários. Os IDs de tarefas abaixo identificam onde tratar um achado depois de decidir a mudança.

## Leitura inicial das specs

O revisor geral leu as quatro specs e a proposta. Indicou a preservação do destino original durante o login, a validade de conteúdo depois da publicação, a versão que o autor confirma e a recuperação do destino após expiração. Também apontou a diferença entre retomar uma etapa e retornar a um enigma concluído. A proposta e o design já ajudam a resolver parte dessas dúvidas, como a comparação dos comandos e a separação entre as quatro capacidades.

## Teste de compreensão das specs

Quatro revisores, um por spec, fizeram as leituras abaixo. Os pontos de compreensão foram comparados com os demais artefatos para evitar que uma regra registrada em outro arquivo virasse um falso positivo.

### Entrada no terminal

**What this proposes**

A entrada pergunta “O que você busca?” e recebe texto pelo teclado. O nome localiza um enigma publicado. `acessar o nexo` abre a área de criação da própria conta. O destino é preservado durante a identificação. Durante a partida, `/inicio` volta à entrada mantendo a sessão e o progresso.

**How the existing system works, per this document**

A spec apresenta requisitos novos e descreve o comportamento pretendido da entrada, da autenticação e da partida.

A leitura isolada deixou dúvidas sobre colisões com `acessar o nexo` e sobre o resultado quando dois nomes normalizados são iguais. A spec de autoria já resolve ambas com reserva e unicidade. Um link local entre as regras evita a dúvida. [Entrada](../../openspec/changes/define-puzzle-platform-mvp/specs/terminal-entry/spec.md) · [Autoria](../../openspec/changes/define-puzzle-platform-mvp/specs/puzzle-authoring/spec.md)

### Identidade

**What this proposes**

A mesma conta serve para jogar e criar. A identificação distingue um usuário existente de um cadastro confirmado. O sistema protege senhas, resolve cadastros concorrentes e preserva dados quando a sessão acaba ou a senha é perdida.

**How the existing system works, per this document**

A spec descreve a identificação a partir de “Quem você é?”. Uma sessão válida permite trocar de destino. Uma operação protegida com sessão expirada é recusada e admite nova identificação.

O pós-cadastro, as regras de senha e a divisão dos dados de jogo e autoria ficam mais claros ao consultar o design. A dúvida sobre repetir uma ação recusada após expiração exige uma regra explícita. [Identidade](../../openspec/changes/define-puzzle-platform-mvp/specs/user-identity/spec.md) · [Design](../../openspec/changes/define-puzzle-platform-mvp/design.md)

### Autoria

**What this proposes**

O autor salva rascunhos próprios e confirma a publicação de etapas completas. Publicar fixa nome e estrutura. Enunciados, dicas e mensagem final podem mudar. A resposta fica bloqueada após o primeiro acerto global. A exclusão libera o nome e apaga o conteúdo e as partidas vinculadas.

**How the existing system works, per this document**

A spec descreve a jornada pretendida da área de criação. O primeiro salvamento reserva o nome. Uma edição de versão antiga recebe conflito. Uma disputa entre editar a resposta e acertá-la segue a ordem de confirmação.

O revisor identificou dúvidas sobre nome válido, comandos reservados como respostas e o efeito de remover uma dica antiga. Os demais documentos descrevem esses casos. Permanecem as dúvidas sobre o que a confirmação de publicação abrange e sobre a validação das edições depois de publicar. [Autoria](../../openspec/changes/define-puzzle-platform-mvp/specs/puzzle-authoring/spec.md) · [Progressão](../../openspec/changes/define-puzzle-platform-mvp/specs/individual-progression/spec.md)

### Progressão individual

**What this proposes**

Cada conta retoma sua partida e recebe somente o conteúdo liberado. O servidor compara a resposta com o texto vigente, avança após um acerto e registra a conclusão. Pedidos repetidos ficam vinculados ao estado de origem. O primeiro acerto global impede editar aquela resposta. Excluir o enigma também exclui o progresso.

**How the existing system works, per this document**

A spec descreve a partida pretendida. O autor cadastra uma resposta por etapa e pode editar a lista de dicas. Um novo enigma com o mesmo nome começa com partidas independentes.

O revisor encontrou dúvidas sobre `/dica` como resposta e sobre o resultado de pedidos concorrentes de dica e resposta. A autoria reserva o comando e o design usa a versão da partida para decidir o segundo pedido. O cenário de visibilidade pode explicitar a omissão de uma dica oculta da etapa atual e de dicas de etapas anteriores. [Progressão](../../openspec/changes/define-puzzle-platform-mvp/specs/individual-progression/spec.md) · [Autoria](../../openspec/changes/define-puzzle-platform-mvp/specs/puzzle-authoring/spec.md)

## Crítica das specs

Três revisores fizeram leituras por capacidade, com foco em regras do produto, cobertura de cenários e clareza do texto. As specs mantêm a estrutura de requisitos e cenários do OpenSpec. Os revisores de regras e estrutura convergiram na necessidade de testar a visibilidade das dicas da etapa atual e a validade dos campos após a publicação. A leitura de estilo encontrou dois pontos que afetam comportamento. “Primeira visita” e “sessão ausente” cobrem situações diferentes, e a expressão “etapa atual” pode ser lida como o registro completo em vez dos campos permitidos ao jogador.

A leitura também encontrou regras que podem ser referenciadas sem duplicar texto. O design define como publicar quando há alterações locais e como normalizar comandos. A progressão define como a remoção de uma dica afeta quem já a revelou. A ausência dessas regras na spec lida isoladamente motivou sugestões de links e cenários, com impacto menor do que uma contradição entre artefatos.

Um novo revisor geral releu as quatro specs depois da crítica. Confirmou os pontos de destino durante o login, retomada após expiração e validade da edição de publicados. A rodada manteve o escopo da [proposta](../../openspec/changes/define-puzzle-platform-mvp/proposal.md), incluindo as exclusões de pausa, recuperação de acesso, prévia privada e reinício de partidas.

## Achados sobre comportamento

| Prioridade | Caso a resolver | Tarefas e fontes |
| --- | --- | --- |
| Alta | **Enigma excluído durante o login.** A pessoa seleciona um enigma, ele é excluído e outro é publicado com o mesmo nome. O retorno deve revalidar a publicação originalmente escolhida e voltar à busca se estiver indisponível. | 5.1 e 6.2. Entrada 17–37, autoria 134–143, design 51 e 141. |
| Alta | **Reautenticação na autoria.** Definir quando a edição preservada em memória volta a aparecer. Testar expiração com a mesma conta e com uma conta diferente na mesma aba. A segunda conta precisa iniciar com seus próprios dados. A operação recusada deve ter um desfecho explícito, inclusive no caso de exclusão confirmada antes de expirar. | 3.4, 6.2 e 7.2. Identidade 64–84, design 59. |
| Alta | **Edição de etapa publicada.** A spec exige campos preenchidos ao publicar. O design já mantém a invariante de que só rascunhos aceitam enunciado ou resposta vazios. Alinhar a regra e exercitar uma edição vazia de etapa publicada, verificando que o valor anterior continua disponível. | 4.4 e 7.4. Autoria 67–76 e 89–117, design 102. |
| Alta | **Conteúdo recebido pelo jogador.** O cenário atual menciona dicas ocultas de outras etapas. Testar também uma dica ainda oculta da etapa atual, uma dica antes revelada de etapa anterior e a conta do autor usando a experiência de jogo. | 5.2 e 8.2. Progressão 20–25, design 161. |
| Média | **Conclusão e retorno à entrada.** Restringir a retomada de etapa às partidas em andamento e preservar a mensagem vigente no retorno a uma partida concluída. Definir como voltar à entrada por teclado após a tela substituir o desafio pela mensagem final. | 6.3 e 6.5. Progressão 9–18 e 100–109, entrada 65–70, design 57 e 79. |
| Média | **Campo preenchido durante avanço em outra aba.** A pessoa digita para uma etapa, outra aba avança e o foco atualiza a interface. Decidir se o texto é descartado ou mantido junto à etapa anterior. O teste deve verificar que a etapa nova só recebe texto enviado para ela. | 5.4 e 6.6. Progressão 60–69, design 61, 155 e 179–183. |
| Média | **Interromper e corrigir a identificação.** Uma pessoa pode digitar por engano o nome de outra conta e chegar à senha. Especificar o caminho de volta à pergunta de nome com o destino preservado. | 6.1 e 6.2. Identidade 20–44, design 51 e 76. |

As colunas de fontes referem-se às [specs da mudança](../../openspec/changes/define-puzzle-platform-mvp/specs/), ao [design](../../openspec/changes/define-puzzle-platform-mvp/design.md) e às [tarefas](../../openspec/changes/define-puzzle-platform-mvp/tasks.md). As prioridades indicam o impacto no aceite das tarefas citadas.

A cobertura pode melhorar com cenários menores para estado de carregamento sinalizado por texto, diferença entre primeira visita e retorno sem sessão, publicação com confirmação e zero etapas, e concorrência entre pedido de dica e envio de resposta. A regra da versão persistida antes de publicar já está no design e nas tarefas 4.3 e 7.3. A reserva de comandos e a unicidade já estão na autoria. Nesses casos, mantenha as fontes existentes e acrescente referências ou refine o aceite.

## Achados sobre prontidão do design

| Prioridade | Caso a resolver | Tarefas e fontes |
| --- | --- | --- |
| Alta | **Chave estrangeira da etapa atual.** O modelo precisa declarar uma chave única para o par de colunas de `steps` referenciado por `progress`, por exemplo `UNIQUE(id, puzzle_id)` na mesma ordem da referência. Com apenas a chave de `id` e a unicidade por posição listadas hoje, uma inserção válida pode falhar. Verificar inserção válida, recusa de etapa de outro enigma e cascata da exclusão em SQLite. | 2.1 e 2.3. Design 102, 104 e 110–112. |
| Alta | **Inicialização com migrações pendentes.** O design exige aplicar migrações antes de aceitar conexões em produção. A fila verifica reexecução e reinício. Definir em 2.1 como o comando de migração e a inicialização compartilham essa execução. Testar que uma migração com falha impede o servidor de aceitar conexões. | 2.1 e 8.3. Design 215–222, tarefas 25 e 78. |
| Alta | **Salvar alterações de um publicado.** O design oferece mutações separadas, cada uma com versão esperada, mas a interface ainda precisa definir a unidade de salvamento e o que cada sucesso devolve. Enviar uma edição de enunciado e uma dica com a mesma versão pode salvar só uma delas. Controles independentes, com a nova versão no retorno e indicação da ação confirmada, preservam as rotas propostas. Uma confirmação única exigiria outro contrato. | 4.4, 4.6 e 7.4. Design 59 e 145–163. |
| Alta | **Sessão e token após login.** O design renova o token CSRF ao autenticar, mas só o cadastro declara que devolve o novo token. Definir a sequência de busca sem sessão, identificação e entrega do token atualizado. Distinguir expiração de sessão de recusa por origem ou token. Testar busca anônima, primeira alteração após login e reautenticação após expiração. | 3.3, 3.4, 5.1 e 6.2. Design 126, 132, 136–141 e 163. |
| Alta | **Exclusão concorrente com primeiro acerto.** O acerto incrementa a versão do enigma. Uma exclusão já confirmada com a versão anterior deve seguir a regra de conflito ou ter uma exceção explícita. O teste precisa distinguir a exclusão que confirma primeiro da exclusão que recebe conflito e precisa de nova confirmação. | 4.5 e 5.6. Design 152, 173 e 181, tarefa 54. |
| Média | **Respostas atrasadas com a mesma versão da partida.** A edição de enunciado ou dica pode aparecer ao voltar o foco sem mudar a versão de progresso. Uma resposta antiga pode substituir o estado recém-atualizado se o cliente comparar só essa versão. Definir uma regra simples de ordenação ou reconsulta e testar os dois retornos na ordem inversa. | 5.2 e 6.6. Design 61, 161 e 177–183. |
| Média | **Respostas temporárias de autenticação.** O texto prevê HTTP 503 para fila de autenticação cheia. A tabela de erros menciona 503 somente para contenção do banco. Documentar os casos e como a interface informa a nova tentativa. | 3.4 e 3.5. Design 128 e 163. |
| Média | **Equivalência de caixa em Unicode.** O design usa `toLowerCase()` e aceita Unicode. Esse método gera chaves diferentes para o sigma maiúsculo `Σ` e o sigma final `ς`. A redação das specs permite entender que ambos seriam equivalentes. Fixar qual comparação vale e testar o mesmo critério em nomes e respostas. | 2.2. Identidade 9–14, autoria 34–39, progressão 31–40, design 70–86. |

Três revisores leram o design, a proposta, as quatro specs e a fila. Os pareceres sobre prontidão, código existente e clareza sustentam as prioridades acima. A leitura do código confirmou a inicialização existente e o comando de migração pendente. A proposta e o design ainda usam linguagem do momento anterior ao bootstrap. Date esse contexto e aponte para o README e o lockfile ao indicar o estado atual. [Servidor](../../api/src/server.js) · [Comando de migração](../../api/src/migrate.js) · [README](../../README.md)

O primeiro ponto que afeta a próxima tarefa de implementação é a chave estrangeira em 2.1. Inclua nela o aceite da inicialização antes de abrir a porta. Provedor, domínio, armazenamento do piloto e redação das mensagens continuam nas perguntas em aberto do design. A equipe pode detalhar os caminhos de arquivos e o desenho de cada alteração ao preparar a tarefa correspondente.

## Verificações

- A validação estrita da mudança passou com OpenSpec 2.0.0.
- Em SQLite 3.50.4, num banco em memória com dados fictícios, a referência composta falhou quando o par da tabela pai carecia de unicidade. Com o par declarado único, a inserção válida passou e a referência a outro enigma foi recusada.
- Em Node, `toLowerCase()` produziu `σ` para `Σ` e preservou `ς` como uma chave distinta.
- Os cenários da aplicação são propostas de aceite. As duas execuções acima verificam mecanismos isolados.

O programador conferiu a evidência sobre SQLite, a reautenticação na autoria e o requisito de inicialização por migração. Repetiu o teste isolado da chave estrangeira e confirmou o mesmo resultado. O gerente cruzou os pareceres com os arquivos e consolidou as prioridades. O professor conferiu e resumiu a entrega no capítulo PROC-05.
