# Design

## Context

O repositório é greenfield: há configuração OpenSpec e a descoberta registrada em `proposal.md`, sem aplicação, dependências ou testes existentes. O escopo funcional e React + Vite + Express + SQLite foram aprovados. As quatro specs desta mudança são os contratos de comportamento.

Este documento contém decisões do planejamento técnico e padrões propostos de interface/limites. Esses padrões não são apresentados como decisões de produto previamente aprovadas. A execução deste plano ainda depende de uma solicitação de implementação.

## Goals / Non-Goals

**Goals:**

- Entregar uma aplicação única, simples de executar localmente e publicar para o piloto.
- Manter validação, autorização e persistência no servidor, com contratos explícitos entre front-end e API.
- Preservar unicidade, avanço individual, bloqueio global de respostas e exclusão integral sob concorrência.
- Permitir testar as regras com banco real temporário e os percursos pelo navegador.
- Entregar registro, tutorial curto e commit local conferido para cada tarefa, conforme EDU-01.

**Non-Goals:**

- Microserviços, API para clientes externos, tempo real por WebSocket, cache distribuído e infraestrutura de múltiplas instâncias.
- SSR, Server Components, TypeScript, ORM e sistema de design externo nesta primeira implementação.
- Novos recursos além do escopo aprovado; testes técnicos não criam a prévia de teste de autores rejeitada no produto.

## Decisions

### 1. Organização e execução

Um repositório com npm workspaces `web/` e `api/`, usando módulos ES e JavaScript. `web/src/` contém React e CSS; `api/src/` contém rotas, serviços, acesso SQL e autenticação; `api/migrations/` contém migrações versionadas. Dados ficam em diretório externo configurável, ignorado pelo Git. Este desenho será implementado depois; nenhuma dessas pastas de código é criada pelo planejamento.

Em desenvolvimento, Vite atende à interface e encaminha `/api` ao Express por proxy. Em produção, um processo Express atende `/api` e os arquivos do build Vite no mesmo domínio. APIs inexistentes retornam JSON 404 antes do fallback da SPA. O fallback atende somente navegação HTML, sem transformar erros de API em páginas.

Alternativas: HTML/JS puro exigiria mais controle manual do DOM; Next.js acrescentaria outra arquitetura após a escolha de Express. Separar front e API em hospedagens diferentes acrescentaria configuração de cookies e origem sem benefício para o piloto. O suporte a arquivos estáticos é documentado no [Express](https://expressjs.com/en/starter/static-files/).

Base proposta: Node.js 24 LTS no patch de segurança atualizado, React 19, Vite 8, Express 5 e `better-sqlite3` 13. As famílias foram verificadas nos metadados npm em 15/11/2026; patches exatos serão fixados no bootstrap e no lockfile. O Node local observado é 24.11.1: atualizar seu patch antes do piloto, sem trocar o runtime automaticamente durante este planejamento. [Releases Node.js](https://nodejs.org/en/about/previous-releases).

Dependências adicionais enxutas: React Router em modo declarativo, `express-session`, Helmet e limitador de requisições de autenticação. Sem biblioteca global de estado ou formulários nesta versão. `better-sqlite3` oferece SQL preparado e transações explícitas; evita introduzir um ORM neste conjunto pequeno de tabelas.

Configuração mínima: `NODE_ENV`, `PORT`, `APP_ORIGIN`, `DATABASE_PATH` e `SESSION_SECRET`. Em desenvolvimento, aceitar somente a origem local configurada do Vite. Em produção, exigir caminho persistente explícito para o banco e origem HTTPS. Secrets reais não entram em exemplos, arquivos versionados ou mensagens de erro.

### 2. Telas e estado do cliente

| Rota proposta | Conteúdo |
| --- | --- |
| `/` | Pergunta inicial e fluxo de identificação quando necessário; nenhum anúncio de autoria. |
| `/nexo` | Identificação compartilhada e lista dos enigmas da própria conta. |
| `/nexo/novo` | Formulário ainda local até o primeiro salvamento manual. |
| `/nexo/:id` | Edição do rascunho ou manutenção dos campos permitidos do publicado. |
| `/jogar/:id` | Etapa atual ou estado concluído. |

React Router cuida das rotas; um reducer local cuida dos estados `busca`, `usuario`, `confirmarCadastro`, `senha` e `carregando`. Um estado de sessão compartilhado contém somente usuário e token CSRF; o destino escolhido é preservado na rota/estado de navegação, sem redirecionamento para URLs arbitrárias.

A aparência usa CSS comum, fonte monoespaçada e formulários semânticos. O terminal interpreta intenções; não é um emulador de shell. A autoria usa campos textuais e controles de adicionar/remover, com ordenação de etapas somente no rascunho e nenhuma ação de reordenar dicas.

O [guia visual canônico](../../../docs/design/estilo-interface.md) define a direção UI/UX, valores e usos dos tokens, componentes, estados e critérios de legibilidade e interação. A [folha visual documental](../../../docs/design/previa-interface.html) permite revisar essa direção sem representar telas integradas. Tarefas de interface passam pelo designer entre arquitetura e implementação e pela revisão visual posterior; este documento referencia o guia sem duplicar tokens. Os comportamentos das specs prevalecem sobre escolhas estéticas, que não autorizam funcionalidades, comandos ou navegação adicionais.

Ao avançar, a etapa anterior é retirada da tela e do estado de apresentação; não fica em um histórico de terminal ou DOM oculto. A tela atual mostra suas dicas liberadas. Ao concluir, substitui-se o desafio pelo estado concluído e mensagem final. Respostas corretas e conteúdo de etapas bloqueadas nunca são carregados antecipadamente pelo cliente de jogo.

Formulários mantêm alterações locais até salvar. Publicar opera sobre o snapshot persistido; havendo alterações locais, a interface pede salvamento primeiro. Navegação para fora de edição alterada recebe aviso de descarte. Sessão expirada preserva o formulário em memória enquanto se pede nova identificação; recarregar/fechar sem salvar continua sujeito à regra de salvamento manual.

Atualizações de conteúdo aparecem em consultas e respostas posteriores da API, e ao retomar/focar a partida. Não há sincronização por push. A vigência imediata da resposta é garantida na validação do servidor, mesmo se a tela ainda mostrar um conteúdo anterior. Desabilitar envio durante uma requisição melhora a interação, mas a proteção contra duplicidade também existe no servidor.

### 3. Padrões propostos para fechar detalhes menores

Estes padrões são sugestões concretas deste planejamento para revisão, sem alterar as decisões aprovadas do produto:

| Detalhe | Padrão proposto |
| --- | --- |
| Comandos | Comparar com `trim()` e `toLowerCase()`, assim como as intenções reservadas. Comandos desconhecidos durante o jogo seguem como respostas comuns. |
| Nome de usuário | 1–64 caracteres Unicode após trim; rejeitar vazio e controles. Preservar espaços internos, acentos e pontuação. |
| Nome de enigma | 1–120 caracteres, mesmas restrições de texto de linha única e reservas já aprovadas. |
| Senha | 12–128 caracteres; nenhuma transformação, composição obrigatória ou senha de confirmação adicional. |
| Etapas e dicas | Até 50 etapas e 10 dicas por etapa no piloto; rascunho pode ter zero etapas. |
| Textos | Enunciado até 4.000 caracteres; resposta até 256; dica até 1.000; mensagem final até 4.000. |
| Primeiro salvamento | Exigir nome válido; os outros campos podem estar incompletos no rascunho. |
| Falhas de identificação | Senha incorreta mantém a pergunta de senha; confirmação inválida repete `y/n`; nome disputado no cadastro retorna ao nome. |
| Indisponibilidade | Mensagem genérica “Não encontramos esse nexo.” para nome ausente, rascunho ou exclusão. |
| Conclusão padrão | “Você chegou ao fim deste nexo.”, substituível pelo texto opcional do autor. |
| Encerrar sessão | Controle discreto na entrada autenticada e área de criadores; durante o jogo, pode-se chegar à entrada com `/inicio`. Sem acrescentar comandos de jogo reservados. |
| Exclusão | Confirmação explícita com aviso de perda de conteúdo, progresso e liberação do nome. |

O limite agregado de JSON será 2 MiB, independente dos limites por campo. Rejeitar excesso com indicação clara, preservando a edição local. Contar caracteres pela mesma regra no cliente e servidor e não alterar silenciosamente o conteúdo. Campos de linha múltipla aceitam quebras; nomes e respostas aceitam texto de uma linha. Ajustar números e redações antes do piloto, caso a revisão identifique necessidade; não são métricas de negócio aprovadas.

### 4. Normalização e identidade

O servidor deriva chaves com `trim().toLowerCase()` para nomes e comparação de respostas. Não remove acentos, pontuação ou espaços internos e não usa normalização Unicode adicional nesta versão. Senhas não passam por essa função. Guardar nome de exibição separado da chave.

Índices UNIQUE sobre as chaves persistidas garantem identidade e reserva global. Não depender de `COLLATE NOCASE` ou `lower()` do SQLite para fazer a normalização Unicode da aplicação. A checagem de disponibilidade é informativa; a escrita com restrição UNIQUE decide a disputa.

As reservas de nomes são `acessar o nexo` e `criar um novo nexo`. As reservas de respostas são `/dica` e `/inicio`, confirmadas pelo usuário. Aplicar as reservas também no salvamento de rascunhos, para detectar o problema cedo. Texto `dica` e outras respostas com barra que não coincidam com comandos permanecem disponíveis.

IDs independentes do nome usam UUIDs gerados no servidor. Renomear um rascunho troca a chave e libera a anterior em uma transação. Publicação impede renomear. Exclusão remove a chave; um novo cadastro com esse nome gera outro ID, sem herdar partidas.

### 5. Modelo de dados

Todas as tabelas da aplicação ficam no mesmo arquivo SQLite. Datas usam UTC; o horário de exibição não define ordenação das operações concorrentes. Valores de IDs e versões enviados pelo cliente são validados.

| Tabela | Campos principais e invariantes |
| --- | --- |
| `users` | `id`, `username_display`, `username_key UNIQUE`, `password_hash`, `created_at`. Sem papel separado de criador. |
| `puzzles` | `id`, `author_id`, `name_display`, `name_key UNIQUE`, `status` draft/published, `final_message NULL`, `version`, datas de criação/edição/publicação. |
| `steps` | `id`, `puzzle_id`, `position`, `prompt`, `answer_text`, `answer_key`, `first_solved_at NULL`. `UNIQUE(puzzle_id, position)`. Campos podem estar vazios somente em rascunho. |
| `hints` | `id`, `step_id`, `position`, `text`; `UNIQUE(step_id, position)`, posição determinada no cadastro, sem atualização de ordem. |
| `progress` | `id`, `user_id`, `puzzle_id`, `current_step_id NULL`, `completed_at NULL`, `version`, datas. `UNIQUE(user_id, puzzle_id)`; concluído tem etapa atual nula. |
| `step_solves` | `progress_id`, `step_id`, `solved_at`; chave composta impede solução duplicada na mesma partida. Não há endpoint de histórico para jogadores. |
| `hint_reveals` | `progress_id`, `hint_id`, `revealed_at`; chave composta identifica a dica efetivamente liberada, sem depender da posição. |
| `sessions` | ID de sessão, conteúdo mínimo de sessão e expiração; tabela do adaptador de `express-session`. |
| `schema_migrations` | Versões e datas das migrações SQL aplicadas. |

Ativar `foreign_keys`, WAL e `busy_timeout` de 5 segundos em cada conexão. Índices cobrem autoria, posição por enigma/etapa, partidas do usuário e expiração de sessões. FKs preservam as referências; os serviços transacionais também verificam que etapa, solução e dica pertencem ao mesmo enigma da partida. A etapa atual de `progress` usa FK composta com `puzzle_id` para impedir uma referência cruzada.

FKs com cascata eliminam etapas, dicas, soluções, revelações e partidas quando um enigma é apagado. Remover uma dica elimina suas revelações, sem apagar o progresso da partida. Não há soft delete, tabela de conteúdo excluído ou cópia do enigma na sessão. Contas e outros enigmas são preservados.

O texto da resposta do enigma precisa estar disponível à tela de autoria: `answer_text` e sua chave ficam no banco do servidor e somente no contrato de autoria autorizado. Isso é diferente das senhas, que só persistem como hash. DTOs de jogo são construídos explicitamente, sem serializar linhas completas de etapas.

Alternativas: JSON em arquivo dificultaria unicidade e alterações atômicas; um ORM e PostgreSQL acrescentariam ferramentas sem necessidade neste piloto. O limite escolhido é uma instância com banco em disco local persistente. [Transações SQLite](https://www.sqlite.org/lang_transaction.html), [API do better-sqlite3](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md).

### 6. Autenticação e sessões

Usar `express-session` com adaptador pequeno para SQLite sobre a conexão `better-sqlite3`. O adaptador implementa `get`, `set`, `destroy` e `touch`, respeita expiração, limpa registros expirados e é coberto por testes de reinício e revogação. O middleware pronto gera e verifica os IDs; o adaptador apenas persiste suas sessões. Evita um segundo driver e o store padrão em memória. O pacote `better-sqlite3-session-store` pesquisado tem versão 0.1.0 e metadados de manutenção antigos; não será incluído como dependência adicional deste plano.

Cookie proposto `nexo.sid`: HttpOnly, SameSite=Lax, Path=/, sem Domain e Secure em HTTPS. Expiração proposta de sete dias de inatividade, com renovação durante uso. Secret longo vindo do ambiente, persistido entre reinícios. Regenerar o ID ao cadastrar/autenticar e destruir no logout. Sessão guarda somente `userId`, CSRF e metadados mínimos; nunca senha ou resposta de enigma. [Contrato de stores e cookies do express-session](https://expressjs.com/en/resources/middleware/session/).

Hash de senha com `crypto.scrypt` assíncrono, salt aleatório de pelo menos 16 bytes e comparação por `timingSafeEqual`. Padrão técnico: N=2^17, r=8, p=1, chave de 64 bytes e `maxmem` de 256 MiB; armazenar algoritmo, parâmetros, salt e derivação. Não executar hash dentro de transação de banco. Escolha usa o suporte nativo do Node e evita outra dependência nativa para o piloto; Argon2id seria a alternativa ao revisar a política de credenciais. [Node crypto](https://nodejs.org/docs/latest-v24.x/api/crypto.html), [parâmetros scrypt da OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#scrypt).

O bootstrap de sessão fornece um token CSRF de sessão. Todas as mutações exigem token em cabeçalho e Origin permitido; repetir essa proteção na autenticação pré-login. Regenerar também o token depois da autenticação. Não habilitar CORS amplo; desenvolvimento usa proxy. GETs são livres de alterações de domínio.

Helmet e HTTPS protegem a publicação; configurar `trust proxy` apenas para o proxy realmente utilizado. Aplicar limite técnico inicial de 10 requisições/minuto/IP às rotas de identificação, login e cadastro, com 429 e retry orientado. Limitar hashes scrypt a uma execução simultânea, com fila de até quatro pedidos e resposta temporária 503 quando cheia, para controlar o uso de memória. Isso não estabelece limite de tentativas dos enigmas nem bloqueio permanente de conta. Não logar corpos de autenticação, respostas de jogadores, respostas corretas ou cookies.

### 7. Contratos da API

Todas as rotas ficam sob `/api`. Dados são JSON. Mutações recebem CSRF, verificam sessão quando necessário e autorizam o recurso pelo usuário da sessão, nunca por `authorId` fornecido pelo navegador.

| Método e rota | Entrada principal | Resultado |
| --- | --- | --- |
| `GET /auth/session` | Cookie, se houver | `user` ou null e `csrfToken`; prepara sessão pré-login. |
| `POST /auth/identify` | `username` | Estado `existing` ou `new`; não cria conta. |
| `POST /auth/register` | `username`, `password`, `confirmedNew: true` | Conta, sessão regenerada e novo CSRF; 409 se o nome foi ocupado. |
| `POST /auth/login` | `username`, `password` | Conta e sessão regenerada; 401 em falha. |
| `DELETE /auth/session` | Confirmação de intenção na interface | Revoga sessão e limpa cookie. |
| `POST /entry/resolve` | `name` | ID e nome de um publicado; 404 genérico para os demais estados. |
| `GET /author/puzzles` | Sessão | Resumo dos próprios rascunhos e publicados. |
| `POST /author/puzzles` | `name`, `finalMessage?`, `steps?` | Primeiro snapshot salvo e IDs gerados; reserva o nome. |
| `GET /author/puzzles/:id` | Sessão e autoria | Snapshot completo, respostas, bloqueios e `version`. |
| `PUT /author/puzzles/:id/draft` | `expectedVersion`, nome, mensagem e lista de etapas/dicas | Novo snapshot e versão; somente rascunho. |
| `PATCH /author/puzzles/:id` | `expectedVersion`, `finalMessage` | Atualiza a conclusão personalizada. |
| `POST /author/puzzles/:id/publish` | `expectedVersion`, `confirmed: true` | Publica o snapshot salvo após validação integral. |
| `PATCH /author/puzzles/:id/steps/:stepId` | `expectedVersion`, `prompt?`, `answer?` | Atualiza campos permitidos; resposta bloqueada não pode ser enviada para alteração. |
| `POST /author/puzzles/:id/steps/:stepId/hints` | `expectedVersion`, `text` | Adiciona dica ao fim, com novo ID. |
| `PATCH /author/puzzles/:id/steps/:stepId/hints/:hintId` | `expectedVersion`, `text` | Atualiza somente o texto. |
| `DELETE /author/puzzles/:id/steps/:stepId/hints/:hintId` | `expectedVersion` | Remove dica e vínculos de revelação. |
| `DELETE /author/puzzles/:id` | `expectedVersion`, `confirmed: true` | Exclui integralmente e libera o nome. |
| `POST /play/:puzzleId/open` | Sessão | Cria a partida se necessário ou devolve a existente; repetição é segura. |
| `GET /play/:puzzleId` | Sessão | Snapshot autorizado da própria partida. |
| `POST /play/:puzzleId/answers` | `expectedStepId`, `expectedProgressVersion`, `text` | `incorrect`, `advanced` ou `completed` e snapshot atual. |
| `POST /play/:puzzleId/hints/next` | `expectedStepId`, `expectedProgressVersion` | `revealed` ou `exhausted` e snapshot atual. |
| `GET /health` | Sem dados pessoais | Saúde mínima da aplicação, sem configurações ou conteúdo. |

No snapshot de rascunho, IDs ausentes indicam itens novos e IDs existentes devem pertencer ao enigma. Etapas podem ser reordenadas; dicas existentes conservam sua ordem relativa e novas dicas são acrescentadas ao fim. Recusar campos desconhecidos e mudanças de estado em payloads genéricos.

Snapshot de jogo: `puzzle: {id, name}`, `progress: {version, status}`, `currentStep: {id, prompt, revealedHints: [{id, text}]}` ou, se concluído, `currentStep: null` e `finalMessage`. Não contém `answer`, todas as etapas, dicas ocultas ou dados de outros usuários. Payload de autoria nunca é usado como estado da página de jogo, mesmo para o dono.

Erros usam `{error: {code, message, fields?}}`. 400 para entrada inválida; 401 para identificação necessária; 404 para indisponível ou recurso de outra autoria; 409 para `NAME_TAKEN`, `VERSION_CONFLICT`, `ANSWER_LOCKED`, `STRUCTURE_FROZEN` ou `STALE_PROGRESS`; 422 para publicação incompleta; 413 para excesso agregado; 429 para abuso de autenticação; 503 para contenção temporária do banco. Erros 500 não expõem SQL, stack ou conteúdo secreto. O cliente preserva sua edição em erros de validação e oferece recarregar em conflitos.

### 8. Transações, versões e invariantes

Usar transações `IMMEDIATE` curtas do `better-sqlite3`, sem `await`, rede ou hash no interior. SQLite define a ordem das escritas. `puzzles.version` protege snapshots de autoria; `progress.version` protege operações da própria partida. A transação valida tanto versão quanto regras atuais, independentemente de botões desabilitados no cliente.

**Salvar rascunho:** verificar autoria/estado/versão; validar nome/reservas e IDs; atualizar nome, etapas e dicas; manter identidade dos itens existentes; incrementar versão; confirmar tudo ou reverter tudo. Renumerar etapas em duas fases dentro da transação, usando posições temporárias livres, para evitar colisões do índice UNIQUE ao trocar a ordem.

**Publicar:** verificar autoria/versão e conteúdo persistido; marcar published com data e incrementar versão. Toda operação futura de rascunho é recusada. Nenhuma rota troca published por draft ou altera IDs/ordem de suas etapas.

**Responder:** verificar publicado, usuário, etapa esperada e versão de progresso; comparar à resposta vigente. Erro não altera a partida. Acerto insere solução única, preenche `first_solved_at` se vazio, avança/conclui e incrementa `progress.version` na mesma transação. O primeiro acerto também incrementa `puzzles.version` ao mudar o bloqueio exibido ao autor. Com resposta já bloqueada, novos acertos de outros jogadores não reabrem a edição.

**Editar resposta:** verificar autoria, versão e `first_solved_at IS NULL` dentro da transação. Se a edição confirmar antes do acerto, vale a resposta nova. Se o acerto confirmar antes, o bloqueio impede a edição; recarregar o editor mostra o motivo. Trocar a capitalização também é edição e não é permitido depois do bloqueio.

**Pedir dica:** verificar etapa/versão; selecionar a primeira dica atual não presente em `hint_reveals`; inserir a revelação e incrementar a versão. Se não houver, retornar exhausted sem mudar progresso. Remover uma dica elimina seu vínculo; adicionar usa novo ID, então começa oculta. Identidade por ID impede que a posição faça uma dica nova parecer revelada.

**Repetições:** todo envio inclui etapa e versão esperadas. Dois pedidos do mesmo snapshot não podem aplicar duas mutações. O segundo recebe `STALE_PROGRESS` e a interface consulta o estado atual. Isso cobre duplo clique, duas abas/dispositivos e retry após uma resposta de rede perdida, sem armazenar histórico de tentativas ou chaves de idempotência por tempo indefinido.

**Excluir:** verificar autoria/versão e deletar o enigma em uma transação com cascatas. Se uma tentativa de jogo confirmar antes, seu progresso é eliminado pela exclusão seguinte. Se a exclusão confirmar antes, a tentativa recebe 404. O nome fica livre somente quando a exclusão confirmar; o ID antigo nunca é reutilizado.

Consultas de snapshots também usam leitura consistente do conteúdo e da versão. Depois de uma resposta de rede perdida no primeiro salvamento, consultar a lista própria para recuperar o rascunho eventualmente criado; não sobrescrever automaticamente um item ao receber conflito de nome. Na interface, respostas atrasadas de requisições antigas não substituem um progresso mais recente já apresentado.

### 9. Estratégia de verificação

- Testes do servidor com `node:test`, cliente HTTP de teste e SQLite temporário em arquivo. Exercitar os serviços reais e contratos HTTP; mocks ficam restritos a tempo/ambiente quando necessário.
- Cobrir normalização Unicode, unicidade concorrente, autoria de outra conta, sessão persistente/revogação/CSRF, estrutura imutável, primeiro acerto versus edição, envios repetidos, listas de dicas e cascata integral de exclusão.
- Testes do cliente com Vitest e Testing Library para reducer de identificação, visibilidade de dicas e preservação de formulário em falhas. Não replicar o mesmo conjunto de contratos com mocks.
- Playwright em build de produção, com duas contas e API real: criar rascunho, sair/retomar, publicar, jogar, pedir dicas, retomar sessão e concluir; validar exclusão e respostas bloqueadas. Usar HTTPS local no harness de testes com certificado descartável, para que os cookies Secure funcionem sem enfraquecer a configuração de produção. Aceitar o certificado somente no navegador de teste, sem publicar chave ou certificado de produção.
- Inspecionar teclado/foco, celular, contraste e tela inicial sem anúncio de autoria. Conferir que respostas e conteúdo bloqueado não aparecem na rede, DOM ou bundle do cliente de jogo.
- Testes técnicos de desenvolvimento são distintos da prévia de teste de autores, que continua fora do produto.

## Fluxo educacional e equipe — EDU-01

Toda tarefa segue `docs/fluxo-de-trabalho.md` na raiz do projeto. O arquiteto define a solução e o programador implementa e verifica. Em tarefas de interface, o designer define e revisa a solução visual conforme `docs/design/estilo-interface.md`. O professor resume a entrega no tutorial. O gerente confere o aceite e cria o commit local. Os perfis ficam em `.codex/agents/` e as instruções gerais em `AGENTS.md`.

O registro guarda arquitetura, decisões e verificações reais. O tutorial descreve o resultado, indica os arquivos principais e aponta para o registro. Quando útil, inclui uma instrução simples de uso ou verificação. Os modelos ficam em `docs/modelos/`.

EDU-01 é um critério de engenharia e ensino, incluindo tarefas documentais e correções; não acrescenta telas ou funcionalidades ao produto. `[x]` só atesta uma tarefa com entregas verificadas e commit confirmado. As definições dos agentes orientam sessões ativas, sem criar um serviço de acompanhamento contínuo ou validação automática de qualidade.

## Risks / Trade-offs

- [SQLite e uma instância] -> Usar disco local persistente, transações curtas e um processo no piloto; rever arquitetura antes de múltiplas réplicas. Falhar na inicialização se diretório/secret forem inválidos.
- [Driver nativo no Windows] -> Conferir Node LTS e disponibilidade de binário no bootstrap; não trocar silenciosamente stack ou usar módulo experimental como fallback.
- [Store de sessão próprio] -> Limitar ao contrato de persistência do middleware e testar expiração, `touch`, concorrência e reinício; geração e assinatura continuam com `express-session`.
- [scrypt consome memória] -> Hash assíncrono fora de transações, fila limitada, limite de autenticação e teste do custo no ambiente real; não reduzir silenciosamente o fator.
- [Conta sem recuperação] -> Manter a exclusão desse recurso e informar a limitação no cadastro; não adicionar e-mail ou reset administrativo.
- [Enunciado pode divergir da resposta bloqueada] -> Relato direto no piloto; autor corrige enunciado/dicas ou exclui e recria conforme regras aprovadas. Sem override de resposta ou painel de moderação.
- [Conhecimento de soluções pode ser compartilhado] -> Sem anti-cheat ou ranking no piloto; segurança impede acesso não autorizado, mas não pretende provar como alguém descobriu uma resposta.
- [Exclusão sem histórico] -> Confirmação explícita, transação integral e orientação ao responsável sobre snapshots operacionais. Banco ativo não mantém soft delete ou histórico restaurável por jogadores.
- [Pistas físicas indisponíveis] -> Relato direto e correção textual pelo autor; o aplicativo não verifica locais e não condiciona avanço a localização.
- [Entrada de autoria discreta é descobrível por inspeção] -> Preservar a experiência de mistério e aplicar autenticação/autoria em todas as operações; não depender de esconder a rota para autorizar edições.

## Migration Plan

1. No bootstrap, fixar dependências compatíveis e criar scripts de desenvolvimento, build, execução, testes e migrações; manter os arquivos SQLite e secrets fora do Git.
2. Criar a primeira migração SQL e executá-la em banco vazio com `foreign_keys` ativo. O processo de produção executa migrações pendentes antes de aceitar requisições, falhando de forma explícita se houver erro.
3. Para o piloto, publicar um processo Node com build do front, HTTPS, diretório persistente do SQLite e secret de sessão estável. Provedor e domínio serão escolhidos depois; essa escolha não altera o desenho de uma instância.
4. Antes de migrações posteriores, fazer snapshot consistente pela API de backup SQLite e conferir a restauração em cópia. Não copiar isoladamente apenas o arquivo principal de um banco ativo em WAL. A retenção operacional não é um recurso de histórico de jogadores; remover snapshots temporários após a manutenção e respeitar exclusões ao restaurar dados.
5. Encerrar o processo de forma graciosa, finalizar requisições e fechar o banco. Após reiniciar, verificar saúde, sessão e progresso persistidos.
6. Reverter código somente quando compatível com a versão do esquema. Para migração incompatível, parar escritas e restaurar snapshot consistente aprovado para a manutenção; não executar downgrade destrutivo automaticamente. Restauração de dados do piloto exige revisão do responsável para não reintroduzir conteúdo já excluído.

## Open Questions

- Provedor, domínio e configuração exata de HTTPS/volume do piloto; o contrato operacional já exige uma instância com persistência.
- Ajustes editoriais das mensagens sugeridas e números da tabela de limites após revisão com o pequeno grupo. Os fluxos de erro, validação e testes já estão definidos; variações desses valores não mudam a arquitetura ou a divisão de tarefas.
