# Teste de compreensão

## What this proposes

O texto propõe uma plataforma de enigmas textuais com aparência de terminal. Uma conta serve para jogar e criar. A pessoa encontra um enigma publicado pelo nome ou abre a área de autoria com `acessar o nexo`, onde pode salvar rascunhos, publicar e manter seus enigmas. Cada jogador avança por etapas, solicita dicas com `/dica` e retoma a partida em outra sessão. Depois da publicação, nome e estrutura ficam fixos. O primeiro acerto de qualquer jogador bloqueia a edição da resposta daquela etapa. A exclusão definitiva apaga as partidas relacionadas. O plano propõe React e Express em uma única instância com SQLite, define testes e um piloto qualitativo e exige registro, tutorial em português e commit local por tarefa.

## How the existing system works, per this document

O repositório já contém a configuração OpenSpec e a descoberta de produto. O texto descreve a aplicação, suas dependências e seus testes como trabalho futuro. O escopo funcional e a stack foram aprovados, enquanto detalhes técnicos, limites e redações permanecem sujeitos à revisão. A implementação depende de uma nova solicitação.

## Achados

O revisor conseguiu explicar todas as seções a partir do documento de leitura. Os intervalos abaixo correspondem à montagem usada na revisão. A proposta ocupava as linhas 1 a 196. O design começava na linha 199 e a fila na 427.

| Gravidade | Linhas | Lacuna de compreensão |
| --- | --- | --- |
| Alta | 33–41, 116–125, 152, 505 | A avaliação de autonomia depende do que os participantes recebem antes de jogar ou criar. A entrada mantém comandos e nomes de enigmas fora da tela inicial. O piloto precisa dizer quem recebe quais informações e em que momento. |
| Alta | 39–46, 243–249, 324, 330–339, 361 | A sequência de perguntas é compreensível. Falta fixar a resolução do nome antes ou depois da autenticação, o cabeçalho CSRF, o token após login e a distinção entre falha de senha e sessão expirada. |
| Alta | 81–83, 93, 259, 344, 348–349, 359, 365, 371–381 | Uma edição de dica ou da mensagem final pode mudar o conteúdo sem mudar `progress.version`. Falta uma regra para ordenar respostas que retornam fora de ordem com a mesma versão de progresso. |
| Alta | 108–110, 361, 365, 371–373, 497 | O primeiro acerto altera o bloqueio da resposta e a versão do enigma. Falta definir qual erro prevalece quando `VERSION_CONFLICT` e `ANSWER_LOCKED` se aplicam na mesma edição. |
| Alta | 99, 265–284, 300, 452, 468 | Cliente e servidor precisam contar caracteres pela mesma unidade. Falta dizer qual unidade vale e se um campo composto de espaços satisfaz a condição de preenchimento para publicar. |
| Alta | 105, 310, 409, 418–420, 504 | Uma restauração pode recuperar um enigma excluído após a cópia. O plano exige respeitar exclusões. Falta um procedimento verificável para identificar o que foi excluído desde a cópia ou decidir quando suspender a restauração. |
| Baixa | 35, 40, 275–276 | Uma definição breve de “nexo” ajudaria a identificar quando a palavra designa a plataforma ou um enigma. |
