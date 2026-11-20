# Fluxo de trabalho e requisito educacional

## Requisito EDU-01

Cada tarefa concluída tem um registro e um tutorial curto em português. Resuma o que foi entregue, indique os arquivos principais e inclua o link para o registro. Acrescente uma instrução simples de uso ou verificação quando ajudar o leitor. Use o [modelo de tutorial](modelos/tutorial.md).

As decisões técnicas e as evidências de verificação ficam no registro. O gerente confere as duas entregas antes de aprovar a tarefa.

## Código simples para quem está aprendendo

O EDU-01 exige que todo código produzido ou alterado use a solução mais simples que atenda aos requisitos e preserve a correção, a segurança e o comportamento esperado. Escreva para quem está aprendendo as tecnologias do projeto, sem presumir experiência prévia com elas. Aplique o critério ao frontend, ao backend, ao SQL, às migrações, aos scripts, aos testes, às configurações executáveis e aos exemplos de documentação.

- Use nomes que descrevam o que cada variável guarda e o que cada função faz.
- Escreva as operações em etapas explícitas com recursos básicos ou usuais da tecnologia. Evite atalhos que concentrem várias operações em uma expressão difícil de ler.
- Mantenha funções, camadas, padrões e dependências apenas quando resolvem uma necessidade da tarefa.
- Substitua um recurso avançado sempre que houver uma alternativa mais simples que atenda aos mesmos requisitos. Quando o requisito ou a tecnologia exigir esse recurso, limite seu uso ao trecho necessário e registre o motivo.

Na revisão, leia o código e siga o caminho das entradas, das decisões, das saídas ou efeitos e dos erros pertinentes. Ao validar um campo, por exemplo, localize onde o valor é lido, qual condição indica erro e o que acontece quando o valor é válido. Se um trecho dificultar essa leitura e houver uma forma mais direta que cumpra os requisitos, reescreva o trecho antes do aceite.

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

Quando uma tarefa alterar um procedimento anterior, atualize os tutoriais afetados ou indique a versão de referência e o procedimento vigente. Registre a decisão na tarefa atual.

## Equipe

| Agente | Responsabilidade e entrega | Limite |
| --- | --- | --- |
| `arquiteto` | Lê requisitos e dependências, escolhe a solução mais simples que os atende e registra motivos e critérios de aceite. | Não implementa nem conclui tarefas. |
| `designer_ui_ux` | Em tarefas de interface, define a solução visual e de interação e seus motivos antes da implementação, e revisa o resultado visual depois. | Segue as specs e o guia; não cria funcionalidades nem atesta conformidade sem evidência. |
| `programador_web` | Implementa o desenho, aplica o critério de simplicidade e entrega os arquivos alterados e os resultados das verificações ao professor. | Não conclui nem faz commit. |
| `professor` | Confere a entrega e escreve o tutorial curto com base nos arquivos e evidências. Pede revisão de trechos com complexidade evitável. | Não inventa comportamento, execução ou resultados. |
| `gerente` | Coordena, acompanha o status, confere o aceite, incluindo a revisão de simplicidade, e faz o commit local. | Não atesta conclusão com entregas ou validações faltando. |

Os perfis persistentes estão em `.codex/agents/*.toml`, com nome, descrição e instruções. Seguem o formato de [agentes personalizados do Codex](https://learn.chatgpt.com/docs/agent-configuration/subagents#custom-agents), sem fixar modelo ou substituir permissões do ambiente. O `AGENTS.md` solicita sua utilização nas sessões do projeto. Se a sessão não disponibilizar os perfis pelo nome, o gerente pode delegar transmitindo o conteúdo do perfil. Esses arquivos não são um serviço de execução contínua nem um bloqueio automático de Git.

O agente principal pode ser o gerente. Com poucos slots, execute especialistas em sequência. Só paralelize trabalho independente e delimite arquivos por responsável. Todo staging e commit passa pelo gerente.

O [guia visual](design/estilo-interface.md) é a fonte canônica de valores e usos de cores, tipografia, espaçamento, componentes e estados. A [folha visual](design/previa-interface.html) permite examinar a proposta como documentação, sem representar uma aplicação integrada. As [referências originais](referencias/interface/) são preservadas; não copiar seus estilos para a aplicação sem avaliar as decisões do guia. Os demais documentos apontam para o guia em vez de manter tabelas de tokens concorrentes. Contratos e comportamentos das specs prevalecem sobre a estética.

## Etapas e passagens de responsabilidade

1. **Pendente → em arquitetura.** O gerente lê a tarefa autorizada, seus pré-requisitos e o estado do Git; abre o registro com o modelo e informa ao arquiteto ID, escopo e arquivos. Arquitetura aprovada significa coerência com requisitos vigentes; dúvidas de produto voltam ao usuário, decisões rotineiras seguem o design.
2. **Em arquitetura → em design, quando aplicável, ou em implementação.** O arquiteto registra solução, alternativas e motivos, dependências, contratos, invariantes, arquivos e aceite observável. Se a tarefa afeta interface ou experiência, o gerente passa esse material ao designer; em tarefas exclusivamente de banco ou infraestrutura, registra que design não se aplica e segue ao programador. Em trabalho documental, o desenho arquitetural é a estrutura de documentos e suas relações.
3. **Em design → em implementação.** O designer consulta o guia e as referências pertinentes, define os componentes, estados, hierarquia, comportamento responsivo e critérios de teclado, foco e legibilidade aplicáveis. Registra motivos e entrega ao programador referências de tokens, desenho e critérios observáveis, sem duplicar a fonte canônica ou contrariar as specs. Dúvidas de comportamento retornam ao arquiteto e ao gerente.
4. **Em implementação → em tutorial.** O programador entrega o resultado, o diff e comandos/verificações reais com ambiente e resultados. Quando houve design, o designer revisa a implementação visual contra o desenho e registra o que inspecionou, mediu ou apenas propôs antes da passagem ao professor. Divergências relevantes voltam ao arquiteto ou ao designer; falhas concretas retornam ao programador. Uma falha não vira sucesso por ter sido documentada.
5. **Em tutorial → em revisão.** O professor lê os arquivos, o diff e as evidências. Resume a entrega pelo modelo e confere os links e as instruções incluídas. Lacunas voltam ao responsável.
6. **Em revisão → pronta para commit.** O gerente confere todos os critérios abaixo, incluindo entrega e revisão visual quando aplicáveis, os links e o índice. Verificações não aplicáveis recebem justificativa; verificações necessárias não executadas mantêm a tarefa pendente. Falta de permissão Git deixa o status `aguardando commit`.
7. **Pronta para commit → concluída.** O gerente prepara a marcação `[x]` no `tasks.md` e o status final do registro imediatamente antes de criar o commit que os reúne às entregas. A conclusão só é confirmada após o commit existir e seu conteúdo ser conferido. Se o commit falhar, desfaz somente suas marcações finais, mantém as entregas e registra `aguardando commit`; nunca descarta trabalho para limpar o Git.

O gerente mantém o usuário informado durante o trabalho. Interrupções deixam no registro o estado e o próximo passo para outra sessão retomar.

## Critérios de conclusão

- A solução atende à tarefa e às specs aplicáveis, sem ampliar o escopo silenciosamente.
- A arquitetura e os motivos das escolhas estão registrados na escala adequada.
- Em tarefas com código, o registro indica quem revisou a simplicidade e quais trechos conferiu. A leitura do código permite seguir a sequência de operações. Cada recurso avançado indispensável tem justificativa no registro.
- Em tarefas de interface, há handoff do designer com critérios observáveis e revisão visual do resultado, com evidências e limites. Em tarefas sem interface, a não aplicabilidade é justificada; não exigir design de banco ou infraestrutura.
- Verificações pertinentes foram executadas e registradas com comandos, ambiente, resultados e limitações. Teste real, inspeção por leitura e simulação estão identificados separadamente.
- O registro identifica origem, dependências, arquivos, entregas por papel, tutorial e aceite do gerente.
- O tutorial resume o que foi entregue em português e indica os arquivos principais e o registro.
- Professor e gerente conferiram a correspondência entre o tutorial e a entrega. As evidências da revisão ficam no registro.
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

Os tutoriais acompanham cada tarefa desde o primeiro bloco. A tarefa `8.4` prepara instruções de uso do piloto.
