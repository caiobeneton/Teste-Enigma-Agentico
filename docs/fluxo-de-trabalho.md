# Fluxo de trabalho e requisito educacional

## Requisito EDU-01

Toda e qualquer tarefa concluída deve ter registro e um tutorial próprio, didático e reproduzível, em português, que explique passo a passo **como e por que cada etapa foi implementada**. A regra inclui implementação, correção, refatoração, testes, documentação, configuração e tarefas de processo. Documentar somente o resultado ou listar arquivos não satisfaz o requisito.

O tutorial é uma entrega da própria tarefa, não uma atividade opcional ao final do MVP. Uma tarefa incompleta continua pendente mesmo que seu código já funcione. Para tarefas marcadas antes desta regra, o gerente deve auditar registro e tutorial e registrar lacunas antes de considerá-las conformes; não inventar explicações históricas sem consultar o Git.

## Rastreabilidade sem duplicar a fila

O `tasks.md` da mudança OpenSpec é a fila canônica do produto. Preserve seus IDs. Para a mudança atual, uma tarefa como `1.1` é identificada integralmente por `define-puzzle-platform-mvp/1.1`.

| Entrega | Convenção |
| --- | --- |
| Registro por tarefa de produto | `docs/registros/<change>/<id>.md` |
| Tutorial por tarefa de produto | `docs/tutoriais/<change>/<id>.md` |
| Registro de tarefa de processo fora do MVP | `docs/registros/PROC-<numero>.md` |
| Tutorial de tarefa de processo | `docs/tutoriais/PROC-<numero>.md` |
| Ordem de leitura | `docs/tutoriais/README.md`, com links; sem duplicar status ou checklists de produto |
| Modelos | `docs/modelos/tarefa.md` e `docs/modelos/tutorial.md` |
| Vínculo Git | Trailer `Task: <change>/<id>` ou `Task: PROC-<numero>` na mensagem do commit |

O registro contém status detalhado, arquitetura, decisões, responsáveis por papel, verificações e revisão. Ele referencia a tarefa original e o tutorial. Use links relativos e o ID completo ao comunicar trabalho. Novas tarefas fora da fila recebem o próximo ID `PROC` livre; não use essa categoria para ocultar funcionalidade que deveria estar no OpenSpec.

Quando uma tarefa mudar código, comandos ou configuração ensinados em capítulos anteriores, o professor identifica os tutoriais afetados. Atualize-os junto da mudança ou mantenha o capítulo histórico com versão e ponto inicial explícitos, indicando o capítulo que ensina o procedimento vigente. Registre a escolha e os links na tarefa atual; não deixe um comando antigo apresentado como instrução atual.

## Equipe

| Agente | Responsabilidade e entrega | Limite |
| --- | --- | --- |
| `arquiteto` | Lê requisitos e dependências, desenha a solução, justifica decisões e define critérios de aceite no registro. | Não implementa nem conclui tarefas. |
| `designer_ui_ux` | Em tarefas de interface, define a solução visual e de interação e seus motivos antes da implementação, e revisa o resultado visual depois. | Segue as specs e o guia; não cria funcionalidades nem atesta conformidade sem evidência. |
| `programador_web` | Implementa o desenho, executa verificações e entrega arquivos e sequência reproduzível ao professor. | Não conclui nem faz commit. |
| `professor` | Lê o resultado efetivo, explica conceitos e escreve/revisa o tutorial contra os arquivos e evidências. | Não inventa comportamento, execução ou resultados. |
| `gerente` | Coordena, acompanha o status, confere aceite, registro e tutorial e faz o commit local. | Não atesta conclusão com entregas ou validações faltando. |

Os perfis persistentes estão em `.codex/agents/*.toml`, com nome, descrição e instruções. Seguem o formato de [agentes personalizados do Codex](https://learn.chatgpt.com/docs/agent-configuration/subagents#custom-agents), sem fixar modelo ou substituir permissões do ambiente. O `AGENTS.md` solicita sua utilização nas sessões do projeto. Se a sessão não disponibilizar os perfis pelo nome, o gerente pode delegar transmitindo o conteúdo do perfil. Esses arquivos não são um serviço de execução contínua nem um bloqueio automático de Git.

O agente principal pode ser o gerente. Com poucos slots, execute especialistas em sequência. Só paralelize trabalho independente e delimite arquivos por responsável. Todo staging e commit passa pelo gerente.

O [guia visual](design/estilo-interface.md) é a fonte canônica de valores e usos de cores, tipografia, espaçamento, componentes e estados. A [folha visual](design/previa-interface.html) permite examinar a proposta como documentação, sem representar uma aplicação integrada. As [referências originais](referencias/interface/) são preservadas; não copiar seus estilos para a aplicação sem avaliar as decisões do guia. Os demais documentos apontam para o guia em vez de manter tabelas de tokens concorrentes. Contratos e comportamentos das specs prevalecem sobre a estética.

## Etapas e passagens de responsabilidade

1. **Pendente → em arquitetura.** O gerente lê a tarefa autorizada, seus pré-requisitos e o estado do Git; abre o registro com o modelo e informa ao arquiteto ID, escopo e arquivos. Arquitetura aprovada significa coerência com requisitos vigentes; dúvidas de produto voltam ao usuário, decisões rotineiras seguem o design.
2. **Em arquitetura → em design, quando aplicável, ou em implementação.** O arquiteto registra solução, alternativas e motivos, dependências, contratos, invariantes, arquivos e aceite observável. Se a tarefa afeta interface ou experiência, o gerente passa esse material ao designer; em tarefas exclusivamente de banco ou infraestrutura, registra que design não se aplica e segue ao programador. Em trabalho documental, o desenho arquitetural é a estrutura de documentos e suas relações.
3. **Em design → em implementação.** O designer consulta o guia e as referências pertinentes, define os componentes, estados, hierarquia, comportamento responsivo e critérios de teclado, foco e legibilidade aplicáveis. Registra motivos e entrega ao programador referências de tokens, desenho e critérios observáveis, sem duplicar a fonte canônica ou contrariar as specs. Dúvidas de comportamento retornam ao arquiteto e ao gerente.
4. **Em implementação → em tutorial.** O programador entrega o resultado, o diff e comandos/verificações reais com ambiente e resultados. Quando houve design, o designer revisa a implementação visual contra o desenho e registra o que inspecionou, mediu ou apenas propôs antes da passagem ao professor. Divergências relevantes voltam ao arquiteto ou ao designer; falhas concretas retornam ao programador. Uma falha não vira sucesso por ter sido documentada.
5. **Em tutorial → em revisão.** O professor lê os arquivos reais, o diff e as decisões do designer quando aplicáveis, redige o tutorial pelo modelo, verifica os exemplos e informa o grau de reprodução executado. Explica conceitos, os motivos das escolhas técnicas e visuais, falhas comuns e resultados esperados. Lacunas voltam ao programador, arquiteto ou designer.
6. **Em revisão → pronta para commit.** O gerente confere todos os critérios abaixo, incluindo entrega e revisão visual quando aplicáveis, os links e o índice. Verificações não aplicáveis recebem justificativa; verificações necessárias não executadas mantêm a tarefa pendente. Falta de permissão Git deixa o status `aguardando commit`.
7. **Pronta para commit → concluída.** O gerente prepara a marcação `[x]` no `tasks.md` e o status final do registro imediatamente antes de criar o commit que os reúne às entregas. A conclusão só é confirmada após o commit existir e seu conteúdo ser conferido. Se o commit falhar, desfaz somente suas marcações finais, mantém as entregas e registra `aguardando commit`; nunca descarta trabalho para limpar o Git.

O gerente mantém o usuário informado durante o trabalho. Interrupções deixam no registro o estado e o próximo passo para outra sessão retomar.

## Critérios de conclusão

- A solução atende à tarefa e às specs aplicáveis, sem ampliar o escopo silenciosamente.
- A arquitetura e os motivos das escolhas estão registrados na escala adequada.
- Em tarefas de interface, há handoff do designer com critérios observáveis e revisão visual do resultado, com evidências e limites. Em tarefas sem interface, a não aplicabilidade é justificada; não exigir design de banco ou infraestrutura.
- Verificações pertinentes foram executadas e registradas com comandos, ambiente, resultados e limitações. Teste real, inspeção por leitura e simulação estão identificados separadamente.
- O registro identifica origem, dependências, arquivos, entregas por papel, tutorial e aceite do gerente.
- O tutorial ensina cada etapa: ponto inicial, pré-requisitos, comando ou edição, caminho do arquivo, como funciona, por que foi escolhido e como reconhecer sucesso.
- Um leitor consegue reconstruir a mudança a partir do ponto inicial indicado. Inclua trechos completos suficientes, ordem das edições e dependências; para código extenso, divida em passos e referencie o arquivo integral no commit.
- Professor e gerente conferiram fidelidade entre explicações e resultado. Registrar quem revisou e se houve execução dos passos ou apenas leitura; não confundir promessa de reprodução com reprodução verificada.
- Links entre tarefa, registro e tutorial, e índice de leitura, estão atualizados.
- O commit local reúne as entregas e tem o trailer da tarefa; seu conteúdo foi verificado.

## Protocolo de commit

Um commit por tarefa concluída, incluindo código quando houver, registro, tutorial, índice e marcação da tarefa. Tarefas documentais também têm commit. Evite misturar tarefas ou arquivos de outras pessoas. Não inclua arquivos reais de ambiente, dados de execução, tokens ou material privado nos exemplos.

Use `git status --short`, `git diff`, `git diff --check` e staging por caminhos explícitos. Confira `git diff --cached --stat` e `git diff --cached` antes de commitar. Mensagem sugerida:

```text
feat: configurar os workspaces e explicar o bootstrap

Task: define-puzzle-platform-mvp/1.1
```

O assunto depende da mudança real (`feat`, `fix`, `docs` etc.). Depois, confira `git show --stat --oneline HEAD`, o trailer e o estado da árvore. Para localizar um commit sem gravar seu próprio hash dentro dele:

```powershell
git log --format="%h %s" --grep="^Task: define-puzzle-platform-mvp/1.1$"
```

O registro aponta para esse identificador estável e informa o commit-base de partida. O gerente comunica o hash real após criá-lo. Não faça um segundo commit apenas para inserir o hash do primeiro no próprio registro. Push e publicação externa dependem de solicitação específica.

## Ordem orientativa das tarefas já planejadas

As 41 tarefas do planejamento inicial mantêm seus IDs; consulte suas marcações no `tasks.md` para o andamento atual. A ordem abaixo resume dependências por bloco, sem substituí-las por outra fila:

1. Base local (`1.*`) antes de persistência e integração executável.
2. Persistência e invariantes (`2.*`) antes dos serviços que dependem de SQLite e transações.
3. Identidade e proteção (`3.*`) antes de operações autenticadas de autoria e jogo.
4. Autoria (`4.*`) e progressão (`5.*`) compartilham contratos de conteúdo, bloqueio de respostas e versões; o arquiteto detalha as dependências por tarefa.
5. Interfaces (`6.*`, `7.*`) precisam dos respectivos contratos e usam a API real para atestar integração; esboços isolados não provam integração.
6. Entrega e piloto (`8.*`) dependem do percurso integrado e da verificação em produção local prevista no design.

Os tutoriais acompanham cada tarefa desde o primeiro bloco. A tarefa `8.4` prepara instruções de uso do piloto; ela não substitui os tutoriais de programação.
