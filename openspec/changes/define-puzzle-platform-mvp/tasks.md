# Tasks

Implementar segundo `design.md` e as quatro capacidades em `specs/`. As marcações abaixo registram o andamento da implementação; os registros e tutoriais de cada tarefa contêm suas entregas e evidências. Limites e textos propostos no design são os padrões de partida para revisão; mudanças no escopo funcional exigem atualização dos artefatos.

## Critério transversal de conclusão — EDU-01

Todas as tarefas abaixo, sem exceção, incluem registro e tutorial próprio em português, didático e reproduzível, explicando passo a passo **como e por que cada etapa foi implementada**. Isso também se aplica às tarefas de documentação, testes e operação. Não é necessário repetir esse requisito em cada linha.

Toda tarefa que produza ou altere código precisa cumprir o [critério de simplicidade do EDU-01](../../../docs/fluxo-de-trabalho.md#código-simples-para-quem-está-aprendendo) antes do aceite.

Seguir `AGENTS.md` e `docs/fluxo-de-trabalho.md` a partir da raiz: gerente coordena; arquiteto analisa e desenha; designer UI/UX define a solução de interface conforme `docs/design/estilo-interface.md` quando aplicável; programador web implementa e verifica; designer revisa o resultado visual; professor lê o resultado e explica os motivos técnicos e visuais pertinentes; gerente revisa as entregas e faz o commit local. Tarefas exclusivamente de banco ou infraestrutura dispensam designer. Use os modelos em `docs/modelos/`.

Para cada ID, criar `docs/registros/define-puzzle-platform-mvp/<id>.md` e `docs/tutoriais/define-puzzle-platform-mvp/<id>.md`, ligar o registro à tarefa original e atualizar `docs/tutoriais/README.md`. O registro inclui dependências, decisões de arquitetura, arquivos, comandos/resultados reais e revisões; o tutorial inclui pré-requisitos, ponto inicial no Git, passos completos, motivos e verificação. O commit usa o trailer `Task: define-puzzle-platform-mvp/<id>`.

Só marcar `[x]` após conferir solução, verificações pertinentes, registro e tutorial revisados; confirmar a conclusão depois do commit que reúne essas entregas e a marcação. Se o commit falhar, manter a tarefa pendente e registrar `aguardando commit`, conforme o protocolo do fluxo. Código pronto sem tutorial não é tarefa concluída. As 41 tarefas mantêm seus IDs e critérios técnicos; este requisito se soma ao aceite de cada uma.

## 1. Base JavaScript e execução local

- [x] 1.1 Criar npm workspaces `web` e `api`, com React/Vite, Express e módulos ES; fixar dependências compatíveis com Node 24 LTS atualizado e verificar instalação e build em Windows.
- [x] 1.2 Configurar proxy `/api` do Vite, inicialização Express e entrega do build em produção; verificar `/api/health`, navegação direta da SPA e JSON 404 para API inexistente em execução local de produção.
- [x] 1.3 Definir configuração por ambiente, diretório de dados ignorado, secret obrigatório em produção e scripts de migração/testes; documentar comandos e variáveis no README e validar que a aplicação falha claramente com configuração inválida.

## 2. SQLite e invariantes de dados

- [ ] 2.1 Implementar conexão `better-sqlite3`, WAL, FKs, timeout e migrações versionadas para as tabelas do design; verificar aplicação em banco vazio, segunda execução sem duplicação e persistência após reabrir o arquivo.
- [ ] 2.2 Implementar normalização de nomes/respostas e validações de reservas/limites no servidor; testar caixa Unicode, espaços externos, acentos, pontuação, espaços internos e rejeição de `/dica` e `/inicio` como respostas, preservando senhas intactas.
- [ ] 2.3 Criar repositórios SQL preparados e restrições de unicidade/autoria/referências; testar duas reservas equivalentes e tentativas de relacionar recursos de enigmas diferentes em SQLite temporário real.
- [ ] 2.4 Implementar helpers de transação e controle de versões para autoria e progresso; verificar rollback integral de falhas e conflito de versões sem sobrescrita silenciosa, documentando a disciplina de transações no módulo de persistência.

## 3. Conta única, sessão e proteção das requisições

- [ ] 3.1 Implementar scrypt assíncrono com salt, formato versionado e fila limitada; testar verificação correta/incorreta, diferenciação de caixa/espaços de senha e ausência de credenciais em logs e respostas.
- [ ] 3.2 Implementar adaptador SQLite de `express-session`, expiração, limpeza, cookie e regeneração; verificar autenticação após reinício do servidor, expiração, `touch` e revogação no logout.
- [ ] 3.3 Implementar `/auth/session`, `/auth/identify`, cadastro confirmado e login; testar nomes equivalentes, disputa de cadastro, senha incorreta e ausência de criação antes da confirmação.
- [ ] 3.4 Aplicar sessão, CSRF, origem, Helmet, limites de corpo e proteção de autenticação; testar mutações sem token/origem válida, 429, fila cheia e acesso sem sessão, preservando tentativas ilimitadas dos enigmas.
- [ ] 3.5 Documentar contratos de identidade, variáveis de cookie/proxy e ausência de recuperação; verificar exemplos contra a API real local e conferir que nenhum endpoint de recuperação ou papel de criador separado foi adicionado.

## 4. API de autoria e publicação

- [ ] 4.1 Implementar listagem/criação/leitura de enigmas próprios e reserva no primeiro salvamento; verificar com duas contas que rascunho incompleto é retomável e respostas de outra autoria não podem ser consultadas.
- [ ] 4.2 Implementar salvamento de snapshot do rascunho com IDs estáveis, renomeação e ordenação de etapas; testar conflito de nome/versão, IDs de outro enigma, liberação do nome anterior e ausência de reordenação de dicas.
- [ ] 4.3 Implementar publicação explícita do snapshot persistido e congelamento do nome/estrutura; testar mínimo de uma etapa, campos incompletos, dicas/conclusão opcionais e tentativas diretas de inserir/remover/substituir etapas de publicado.
- [ ] 4.4 Implementar edição de enunciado/resposta, mensagem final e inclusão/edição/remoção de dicas; testar campos bloqueados, ausência de rota de pausa e que dicas novas entram no fim sem alterar IDs das existentes.
- [ ] 4.5 Implementar exclusão autorizada e confirmada com cascatas; verificar remoção de conteúdo/progresso/conclusões, preservação de conta/outros enigmas e reutilização do nome com novo ID.
- [ ] 4.6 Registrar os contratos de autoria e códigos de conflito na documentação da API; verificar que exemplos de payload de rascunho e manutenção de publicado correspondem aos testes HTTP.

## 5. API de entrada e progressão individual

- [ ] 5.1 Implementar resolução exata de publicado por nome e abertura idempotente da partida; testar rascunho/inexistente/excluído como indisponível e isolamento de progresso entre duas contas.
- [ ] 5.2 Implementar DTO e consulta da etapa atual/conclusão; testar ausência de respostas, etapas anteriores/futuras e dicas ocultas em todos os payloads de jogo, inclusive para um jogador que também é autor.
- [ ] 5.3 Implementar validação e avanço/conclusão transacionais; testar erro sem perda, resposta vigente após edição e primeiro acerto global bloqueando somente a resposta daquela etapa.
- [ ] 5.4 Implementar checagem de etapa e versão em envios; testar duplo clique/retry, duas abas e etapas consecutivas com a mesma resposta sem avanço duplicado, com recarga após `STALE_PROGRESS`.
- [ ] 5.5 Implementar revelação de dicas por ID na ordem atual; testar esgotamento, duas solicitações do mesmo snapshot, retomada, edição visível, remoção de dica revelada e inclusão de nova dica oculta.
- [ ] 5.6 Exercitar corridas de acerto/edição e resposta/exclusão por clientes HTTP concorrentes; verificar invariantes para ambas as ordens de confirmação e ausência de progresso associado ao enigma recriado com o mesmo nome.
- [ ] 5.7 Documentar respostas de jogo, versões e exemplos de erros; validar os exemplos com API real e confirmar que nenhuma comprovação de presença física é exigida.

## 6. Interface de entrada, identificação e jogo

- [ ] 6.1 Implementar layout textual responsivo e reducer de identificação com as mensagens aprovadas; testar teclado, confirmação antes da senha, `y/Y/n/N`, falhas e destino preservado, sem anúncio de autoria na primeira visita.
- [ ] 6.2 Integrar sessão real, entrada por nome, comando discreto e controle de logout; verificar transição entre destinos sem repetir login e nova identificação após expiração ou encerramento.
- [ ] 6.3 Implementar etapa atual, campo de resposta e `/inicio`; verificar que avançar remove a apresentação da etapa anterior e que retornar preserva a partida, sem histórico ou reinício.
- [ ] 6.4 Implementar `/dica`, dicas visíveis e estado de esgotamento; testar o comportamento do componente e confirmar pela API real a retomada em novo acesso.
- [ ] 6.5 Implementar conclusão e mensagem personalizada/padrão vigente; verificar último acerto, retorno a concluído e mensagem atualizada pelo autor.
- [ ] 6.6 Tratar carregamento, falha de rede, conflitos de progresso e exclusão com a tela aberta; verificar retry sem avanço duplo, interface sem dados bloqueados e navegação de retorno disponível.

## 7. Interface de criação e manutenção

- [ ] 7.1 Implementar lista própria e formulário de rascunho com etapas, dicas e mensagem final; verificar criação/retomada por API real e botões sem ações de reordenar dicas ou prévia de teste.
- [ ] 7.2 Integrar salvamento manual, mensagens por campo e proteção contra descarte acidental; testar confirmação de salvamento, nome disputado e preservação da edição local em falhas ou reautenticação.
- [ ] 7.3 Implementar publicação com confirmação e indicação dos campos imutáveis; verificar que alterações não salvas exigem salvar antes e que a tela publicada não permite alterar nome/estrutura.
- [ ] 7.4 Integrar manutenção dos campos permitidos e bloqueios globais de respostas; testar atualização do editor após o primeiro acerto, conflito entre abas e edição continuada de enunciados/dicas/conclusão.
- [ ] 7.5 Implementar exclusão de rascunhos e publicados com aviso de perda integral; verificar cancelamento sem alteração e confirmação removendo o item e liberando seu nome na API.

## 8. Integração de produção e entrega para o piloto

- [ ] 8.1 Executar Playwright com build de produção, HTTPS local com certificado descartável e API/SQLite reais para o percurso de autor e jogador, com duas contas; verificar cookies Secure, criação, retomada, publicação, dicas, avanço, bloqueio de resposta e conclusão.
- [ ] 8.2 Verificar em navegador celular/desktop teclado, foco, contraste e conteúdo das requisições; registrar evidência de que a entrada preserva o mistério e somente o conteúdo liberado chega à experiência de jogo.
- [ ] 8.3 Documentar e ensaiar migração, backup consistente, restauração em cópia e reinício gracioso com volume persistente; verificar sessão e progresso após reiniciar e registrar as condições de reversão compatível do esquema.
- [ ] 8.4 Preparar roteiro curto de validação com pequeno grupo, relatos diretos e critérios qualitativos de autonomia/interesse; entregar instruções de uso e registrar limitações aprovadas, inclusive ausência de recuperação e perda integral por exclusão.
- [ ] 8.5 Executar build, testes relevantes dos módulos e suíte E2E integrada; comparar o produto às quatro specs e registrar resultados reais e pendências antes de solicitar revisão da implementação.

## Workflow follow-up

- Escolher provedor, domínio e volume persistente antes da publicação externa; essa ação será realizada quando solicitada, fora deste planejamento.
- Após implementação e revisão, usar o fluxo OpenSpec de arquivamento para consolidar as specs; não arquivar esta mudança apenas porque os documentos de planejamento estão completos.
