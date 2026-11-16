# PROC-01 — Estabelecer o processo educacional e a equipe de agentes

## Identificação e andamento

- Origem: solicitação do usuário em 16/11/2026 para ler as tarefas, exigir registro e tutorial para cada conclusão e criar quatro agentes especializados.
- Status: concluída.
- Dependências: planejamento existente em [tasks.md](../../openspec/changes/define-puzzle-platform-mvp/tasks.md), proposta, design e quatro specs da mesma mudança.
- Ponto inicial: `c60b2ae1b5df73ef9d2b5d36c3c55138ac351d2a`; árvore de trabalho inicialmente limpa.
- Papéis: agente principal como gerente coordenador; subagente `arquiteto` para análise; subagente `programador_web` para revisão da implementação documental; subagente `professor` para escrever e conferir o tutorial; subagente `gerente` para aceite final e commit.
- Tutorial: [PROC-01](../tutoriais/PROC-01.md).
- Commit de entrega: localizar pelo trailer `Task: PROC-01`.

## Objetivo e aceite

Estabelecer EDU-01 como requisito de toda tarefa concluída: registro e tutorial didático reproduzível, explicando como e por que cada passo foi implementado. Criar os perfis persistentes de arquiteto, programador web, professor e gerente, com acompanhamento e commit local por tarefa concluída.

Aceite: instruções persistentes; quatro perfis TOML válidos; planejamento existente coerente e com os mesmos 41 itens pendentes; fluxo de passagem entre papéis; modelos e rastreabilidade; tutorial desta entrega; validação estrutural e commit local conferido. Esta tarefa de processo não implementa funcionalidades e não corresponde a um checkbox do MVP.

## Arquitetura

O arquiteto leu as 41 tarefas, design e quatro specs e recomendou regra durável em `AGENTS.md`, contexto/regras em `openspec/config.yaml` e alinhamento de proposta, design e introdução das tarefas. O requisito pertence ao desenvolvimento e ao ensino; as quatro specs funcionais permanecem intactas.

Separar fila canônica (`tasks.md`), registro por tarefa e tutorial permite manter IDs estáveis sem duplicar checklists. O gerente coordena a sequência arquiteto → programador → professor → revisão/commit, podendo ser o agente principal. Perfis `.codex/agents/*.toml` usam `name`, `description` e `developer_instructions`, conforme a documentação oficial consultada nesta sessão. Modelos e permissões são herdados do ambiente.

Alternativas descartadas: deixar o tutorial somente para a entrega final acumularia lacunas; repetir EDU-01 em 41 linhas dificultaria manutenção; criar uma quinta spec funcional confundiria o fluxo da equipe com o comportamento da aplicação; manter agentes apenas nesta conversa não preservaria suas instruções nas próximas sessões.

As dependências principais são base → persistência → identidade → APIs → interfaces → entrega. O arquiteto destacou dependências cruzadas entre primeiro acerto e bloqueio da edição, testes concorrentes e exclusão com partidas reais; o gerente deve detalhá-las ao selecionar cada tarefa.

Riscos: explicações baseadas no plano sem ler código, comandos não executados apresentados como validados, commits com arquivos alheios e promessa de acompanhamento fora de sessão. As instruções e critérios de revisão tratam esses pontos; não são um mecanismo automático de bloqueio de Git.

## Implementação ou alteração documental

1. Criados `AGENTS.md` e `.codex/agents/{arquiteto,programador_web,professor,gerente}.toml` com responsabilidades, limites e passagem entre agentes.
2. Criados `README.md`, `docs/fluxo-de-trabalho.md` e modelos de registro/tutorial, com estados, convenções de caminhos, aceite e protocolo de commit.
3. Atualizados contexto/regras/operações do OpenSpec e os artefatos existentes de proposta, design e tarefas; IDs, checkboxes e specs funcionais preservados.
4. Criados índice didático, este registro e tutorial PROC-01, entregue e revisado pelo professor.
5. O programador web revisou a configuração, removeu uma duplicação de título no design e acrescentou manutenção dos tutoriais quando procedimentos posteriores mudarem, com atualização ou indicação de versão e ponto inicial.

## Verificações e evidências

Ambiente observado: Windows, PowerShell 5.1.26100.9818, Git 2.56.1.windows.1, Node v24.11.1, npm 11.6.2, Python 3.14.0 e OpenSpec 2.0.0 via npm exec. Versões descrevem esta verificação documental; não representam validação da stack futura da aplicação.

Comandos executados na raiz do projeto:

- `git status --short` no início: árvore limpa.
- `npm exec --yes --cache "$env:TEMP\teste-enigma-npm-cache" --package @fission-ai/openspec -- openspec list --json`: confirmou raiz local e 0/41 tarefas concluídas. O executável não estava no PATH; execução via npm resolveu sem instalar dependência na aplicação.
- Mesmo prefixo npm com `openspec status --change define-puzzle-platform-mvp --json`: confirmou os caminhos dos artefatos existentes e planejamento completo. Planejamento completo não significa MVP implementado.
- Mesmo prefixo npm com `openspec validate define-puzzle-platform-mvp --strict --no-interactive`: passou na primeira validação após a edição.
- `python -c "import pathlib,tomllib; files=list(pathlib.Path('.codex/agents').glob('*.toml')); [tomllib.loads(p.read_text(encoding='utf-8')) for p in files]; print(len(files))"`: quatro perfis analisados sem erro de sintaxe.
- `git diff --check`: passou na verificação inicial; Git informou conversão LF/CRLF, sem erro de whitespace.
- O programador comparou as linhas de tarefas ao HEAD: os 41 itens são idênticos e continuam pendentes; conferiu nomes únicos e sintaxe dos quatro TOML e links locais dos arquivos existentes.
- Mesmo prefixo npm com `openspec instructions tasks --change define-puzzle-platform-mvp --json`: confirmou que EDU-01 e as duas regras de conclusão são efetivamente incluídos nas instruções geradas. `git diff --name-only -- openspec/changes/define-puzzle-platform-mvp/specs` retornou vazio.
- O gerente coordenador executou a alternativa pré-commit do tutorial: copiou `AGENTS.md`, `README.md`, `.codex`, `docs` e `openspec` com `Copy-Item` para a pasta temporária `C:\Users\caiob\AppData\Local\Temp\nexo-proc01-documentos-beb1e9b03e444a339a861843b168be20`. Nessa cópia documental passaram a validação dos quatro TOML, OpenSpec 2.0.0 com `--strict --no-interactive` e a existência dos links locais de 11 documentos. A cópia não contém histórico Git e não equivale ao roteiro pós-commit de clone/restauração.
- O gerente coordenador comparou na raiz original os 41 itens e as quatro specs ao commit-base: os itens continuam idênticos e pendentes e as specs permanecem sem alteração.

Essas verificações são documentais e de configuração. Não foram executados testes de aplicação nem integração de navegador: a aplicação não existe nesta entrega. O parser TOML não comprova descoberta dos perfis pela interface do cliente; nesta sessão a delegação usa as ferramentas disponíveis e instruções explícitas.

## Entrega didática

O subagente professor leu os quatro perfis, `AGENTS.md`, README, fluxo, modelos, índice, este registro, configuração OpenSpec e diff de proposta/design/tarefas. Escreveu [PROC-01](../tutoriais/PROC-01.md), explicando a construção por grupos de arquivos, campos dos perfis, responsabilidades, regra transversal, modelos, rastreabilidade e verificações. O roteiro inclui ponto inicial exato e reprodução em clone temporário após a existência do commit de entrega, localizado pelo trailer.

O capítulo diferencia validação documental de teste de aplicação e descoberta dos perfis pelo cliente. O professor não executou o roteiro pós-commit de clone/restauração antes de o commit existir; não declarou reprodução completa em ambiente limpo. Não há capítulos anteriores afetados por esta primeira entrega.

O professor executou os blocos de validação na raiz atual: quatro perfis TOML válidos, 41 linhas de tarefas idênticas ao commit-base e pendentes, links Markdown locais existentes, validação estrita do OpenSpec 2.0.0 (pacote fixado no comando do capítulo) e `git diff --check` sem erros. Incluiu alternativa de cópia documental temporária para conferência pré-commit; a reprodução nessa cópia fica a cargo do gerente e não foi declarada executada pelo professor.

## Revisão do gerente

O gerente coordenador conferiu as entregas e executou a reprodução documental temporária descrita acima. O subagente gerente leu o tutorial completo e a entrega didática, confirmou a correspondência com os perfis, o fluxo, os modelos e as mudanças OpenSpec e concedeu aceite final documental. A aula explica como e por que os grupos de arquivos foram criados, fornece comandos e ponto inicial e diferencia o que foi executado do roteiro pós-commit ainda não executado.

O aceite preserva as 41 tarefas pendentes e as quatro specs funcionais. Esta marcação final é preparada imediatamente antes do commit; a conclusão só é confirmada após existir e ser conferido o commit local com trailer `Task: PROC-01`. Se o commit falhar, o registro deve voltar a `aguardando commit`, preservando as entregas.

## Pendências e retomada

Nenhuma pendência documental de aceite. O roteiro pós-commit de clone/restauração permanece como instrução para o leitor e não é apresentado como executado nesta revisão. As 41 tarefas de produto permanecem pendentes e dependem de solicitação de implementação.
