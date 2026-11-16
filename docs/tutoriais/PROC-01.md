# PROC-01 — Organizar a equipe e transformar cada tarefa em uma aula

## Objetivo e ponto de partida

Vamos preparar um projeto para ensinar programação web durante sua construção. Ao terminar este capítulo, o repositório terá quatro perfis de agentes, um fluxo de trabalho, modelos de registro e tutorial e uma regra comum: uma tarefa só termina quando sua solução, explicação, verificação e commit estiverem conferidos.

O ponto inicial é o commit `c60b2ae1b5df73ef9d2b5d36c3c55138ac351d2a`. Ele contém o planejamento do MVP e 41 tarefas pendentes. Este capítulo acrescenta o processo educacional; não cria a aplicação React/Express, um banco ou scripts de execução. Não há capítulo anterior obrigatório.

O [registro PROC-01](../registros/PROC-01.md) guarda decisões e evidências. A versão final dos arquivos pode ser localizada pelo trailer `Task: PROC-01` no Git. Um **commit** é uma versão identificável do repositório; um **trailer** é uma linha estruturada no final de sua mensagem, usada aqui para ligar a versão à tarefa.

## Pré-requisitos e ambiente

Use Git, um editor que salve em UTF-8, Node/npm e Python 3.11 ou superior. O Python inclui `tomllib` a partir da versão 3.11, o que permite validar os perfis TOML sem instalar outra biblioteca. O npm executa o OpenSpec; ele precisará acessar o pacote caso ainda não esteja no cache.

Os comandos deste capítulo usam PowerShell e partem da raiz do repositório. O ambiente observado na entrega foi Windows, PowerShell 5.1.26100.9818, Git 2.56.1.windows.1, Node v24.11.1, npm 11.6.2, Python 3.14.0 e OpenSpec 2.0.0. Essas versões descrevem a verificação documental, não uma aprovação das dependências futuras do MVP.

Para conferir suas ferramentas:

```powershell
git --version
node --version
npm --version
python --version
$PSVersionTable.PSVersion
```

## Passo 1 — Preparar uma cópia de estudo sem alterar seu trabalho

Depois que a entrega PROC-01 tiver sido commitada, abra PowerShell na raiz de uma cópia do projeto que contenha esse commit. Execute:

```powershell
$origemProjeto = (Get-Location).Path
$pastaEstudo = Join-Path $env:TEMP ("nexo-proc01-" + [guid]::NewGuid().ToString('N'))
git clone --no-hardlinks -- $origemProjeto $pastaEstudo
if ($LASTEXITCODE -ne 0) { throw 'O clone de estudo falhou.' }
Set-Location -LiteralPath $pastaEstudo
$commitEntrega = git log -1 --format=%H --grep='^Task: PROC-01$'
if (-not $commitEntrega) { throw 'Esta copia ainda nao contem o commit PROC-01.' }
git switch --detach c60b2ae1b5df73ef9d2b5d36c3c55138ac351d2a
if ($LASTEXITCODE -ne 0) { throw 'O ponto inicial nao esta disponivel.' }
git status --short
```

`Join-Path` monta um caminho na pasta temporária e o identificador aleatório evita reutilizar uma pasta existente. `git clone` cria uma cópia com histórico; `--no-hardlinks` evita compartilhar arquivos de objetos por links físicos. `git switch --detach` posiciona essa cópia exatamente no ponto inicial, sem mover uma branch do projeto original. O último comando deve mostrar uma árvore limpa.

Nos passos seguintes, `git restore --source` recuperará grupos específicos de arquivos da versão de entrega para a cópia de estudo. Ele não cria um commit nem altera o histórico. Usamos a versão integral como material de referência para evitar omitir instruções extensas; leia e compreenda cada grupo antes de recuperá-lo. Para praticar edição manual, abra os links dos arquivos completos e escreva o mesmo conteúdo em seu editor na ordem indicada.

Essa cópia pode ficar na pasta temporária para consulta. Não execute os comandos de restauração sobre uma árvore com trabalho que deseja preservar.

Se a entrega ainda estiver em revisão e não houver commit, faça uma **cópia documental**, sem histórico Git, em vez do roteiro acima. A partir da raiz original:

```powershell
$origemDocumentos = (Get-Location).Path
$copiaDocumental = Join-Path $env:TEMP ("nexo-proc01-documentos-" + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $copiaDocumental | Out-Null
foreach ($itemDocumental in @('AGENTS.md', 'README.md', '.codex', 'docs', 'openspec')) {
    Copy-Item -LiteralPath (Join-Path $origemDocumentos $itemDocumental) -Destination $copiaDocumental -Recurse
}
Set-Location -LiteralPath $copiaDocumental
```

Essa alternativa copia somente as pastas documentais desta entrega e permite repetir as verificações TOML, OpenSpec e links. Ela não executa o percurso a partir do commit-base e não contém `.git`: pule os comandos `git`, inclusive a comparação das 41 tarefas que depende do histórico. Essa comparação continua sendo realizada na raiz original. Não trate essa conferência isolada como reprodução do roteiro Git completo.

## Passo 2 — Escrever a regra comum e definir o percurso da tarefa

Crie primeiro [AGENTS.md](../../AGENTS.md) na raiz e [docs/fluxo-de-trabalho.md](../fluxo-de-trabalho.md). O primeiro contém as instruções duráveis para os agentes. O segundo detalha o funcionamento da equipe e os critérios de entrega.

A regra central em `AGENTS.md` é:

```markdown
Este projeto deve ensinar a construir uma aplicação web. Toda tarefa concluída, inclusive documentação, configuração, testes, correções e refatorações, exige registro e tutorial didático, passo a passo, de **como e por que** cada etapa foi realizada.
```

Ela se aplica à tarefa inteira. Um teste ou uma alteração de configuração também precisa ser explicado. Isso evita chegar ao fim do projeto com código funcionando e sem uma sequência de aprendizado.

O fluxo estabelece uma passagem de responsabilidade:

```text
gerente seleciona e registra
  → arquiteto desenha
  → programador web implementa e verifica
  → professor lê o resultado e ensina
  → gerente revisa e cria o commit
```

O gerente pode ser o agente principal da conversa. As etapas dependentes são sequenciais: o professor precisa ler o que existe; escrever a aula somente a partir de uma intenção poderia ensinar um comportamento diferente do código.

No fluxo completo, observe três decisões:

- `tasks.md` continua sendo a fila canônica: há um lugar principal para os itens e suas marcações.
- Um registro guarda andamento e evidências; o tutorial ensina a reconstruir a solução. Eles têm objetivos diferentes e se ligam pelo ID da tarefa.
- A conclusão depende do commit conferido. Se o Git falhar, as entregas ficam preservadas e o status passa a `aguardando commit`.

Recupere os dois arquivos completos na cópia de estudo:

```powershell
git restore --source=$commitEntrega --worktree -- AGENTS.md docs/fluxo-de-trabalho.md
Get-Content -Encoding UTF8 AGENTS.md
Get-Content -Encoding UTF8 docs/fluxo-de-trabalho.md
```

**Como conferir:** localize EDU-01, os quatro papéis, os estados da tarefa e o protocolo de commit. O documento também deve dizer que as instruções não criam acompanhamento em segundo plano nem bloqueios automáticos de Git. Um arquivo de orientação precisa de uma sessão que o leia e aplique.

## Passo 3 — Criar quatro perfis com responsabilidades delimitadas

Os perfis ficam em `.codex/agents/`. TOML é um formato de configuração com pares `chave = valor`. Cada arquivo define `name`, `description` e `developer_instructions`. Por exemplo, a estrutura do arquiteto começa assim:

```toml
name = "arquiteto"
description = "Analisa tarefas e dependências e desenha soluções web coerentes com as specs antes da implementação."
developer_instructions = '''
Você é o especialista em arquitetura deste projeto educacional de programação web.
'''
```

O trecho mostra a estrutura; o arquivo integral acrescenta os deveres e limites. As três aspas simples delimitam uma string de várias linhas. `name` identifica o agente, `description` orienta sua seleção e `developer_instructions` define seu comportamento. O formato segue a [documentação oficial de agentes personalizados](https://learn.chatgpt.com/docs/agent-configuration/subagents#custom-agents).

Crie os perfis completos nesta ordem:

| Arquivo e nome | O que as instruções precisam exigir | Por que existe esse limite |
| --- | --- | --- |
| [arquiteto.toml](../../.codex/agents/arquiteto.toml), `arquiteto` | Ler requisitos, registrar solução, contratos, alternativas, motivos, riscos e aceite antes da implementação. Não implementar nem fazer commit. | O desenho deve ser coerente com o problema antes de virar código. |
| [programador_web.toml](../../.codex/agents/programador_web.toml), `programador_web` | Implementar o desenho autorizado, verificar o resultado e entregar arquivos, comandos e evidências ao professor. Não concluir nem fazer commit. | Uma explicação reproduzível depende da sequência e dos resultados reais. |
| [professor.toml](../../.codex/agents/professor.toml), `professor` | Ler arquivos e diff, explicar conceitos e cada passo, conferir exemplos e indicar limites da reprodução. Não inventar verificações. | O texto precisa corresponder à implementação efetiva. |
| [gerente.toml](../../.codex/agents/gerente.toml), `gerente` | Coordenar os demais, revisar aceite e documentação e fazer staging e commit por tarefa. Preservar alterações alheias. | Um único responsável pelo Git evita commits concorrentes ou entregas misturadas. |

Nenhum perfil fixa o modelo nem altera as permissões. Assim, essas escolhas seguem o ambiente da sessão. Quando o cliente não disponibilizar o perfil pelo nome, as instruções de `AGENTS.md` orientam o gerente a ler o TOML e transmiti-lo ao subagente disponível.

Na cópia de estudo:

```powershell
git restore --source=$commitEntrega --worktree -- .codex/agents/arquiteto.toml .codex/agents/programador_web.toml .codex/agents/professor.toml .codex/agents/gerente.toml
python -c "import pathlib,tomllib; fs=list(pathlib.Path('.codex/agents').glob('*.toml')); ds=[tomllib.loads(p.read_text(encoding='utf-8')) for p in fs]; assert len(ds)==4; assert {d['name'] for d in ds}=={'arquiteto','programador_web','professor','gerente'}; assert all(d.get('description') and d.get('developer_instructions') for d in ds); print('4 perfis validos')"
```

**Como conferir:** a saída deve ser `4 perfis validos`, sem exceção Python. Isso verifica sintaxe e campos, mas não comprova que a interface do cliente carregou os perfis. Na entrega desta tarefa, a delegação foi realizada com as ferramentas disponíveis e instruções explícitas; o agente principal exerceu a gerência.

## Passo 4 — Dar o mesmo critério ao planejamento OpenSpec

OpenSpec organiza proposta, decisões de design, requisitos e tarefas. Abra [openspec/config.yaml](../../openspec/config.yaml). O campo `context` registra o contexto educacional, `rules` orienta os artefatos e `operations` orienta aplicação e arquivamento. O início do contexto usa um bloco de texto YAML:

```yaml
context: |
  Este projeto deve se tornar um tutorial de programação web em português.
  EDU-01: toda tarefa concluída, incluindo código, configuração, testes,
  documentação e correções, exige registro e tutorial didático reproduzível
  explicando passo a passo como e por que cada etapa foi implementada.
```

O símbolo `|` preserva um texto de várias linhas. A indentação faz parte da estrutura YAML; use espaços conforme o arquivo integral. Essa regra ajuda a manter o requisito nos planejamentos futuros, além da orientação aos agentes.

Atualize também os artefatos existentes:

1. Na [proposta](../../openspec/changes/define-puzzle-platform-mvp/proposal.md), acrescente EDU-01 dentro de `What Changes`, explicando o objetivo educacional e os papéis.
2. No [design](../../openspec/changes/define-puzzle-platform-mvp/design.md), acrescente o objetivo educacional e a seção de fluxo antes dos riscos, preservando as decisões técnicas.
3. Em [tasks.md](../../openspec/changes/define-puzzle-platform-mvp/tasks.md), acrescente o critério transversal antes da primeira seção numerada. Indique caminhos dos registros e tutoriais, revisão e commit, sem alterar as 41 linhas de tarefas.

Por que não criar uma nova funcionalidade de produto? EDU-01 regula como a equipe entrega e ensina; ele não muda as telas ou as regras dos enigmas. Por isso as quatro specs funcionais permanecem intactas. Por que não repetir a regra em 41 linhas? Uma regra comum é mais fácil de manter e vale para todas elas.

Recupere e compare esses arquivos:

```powershell
git restore --source=$commitEntrega --worktree -- openspec/config.yaml openspec/changes/define-puzzle-platform-mvp/proposal.md openspec/changes/define-puzzle-platform-mvp/design.md openspec/changes/define-puzzle-platform-mvp/tasks.md
git diff -- openspec/config.yaml openspec/changes/define-puzzle-platform-mvp/proposal.md openspec/changes/define-puzzle-platform-mvp/design.md openspec/changes/define-puzzle-platform-mvp/tasks.md
```

**Como conferir:** o diff deve acrescentar o processo, preservando escopo funcional, stack, IDs e checkboxes. Um diff mostra as diferenças entre versões; linhas iniciadas com `+` são acréscimos.

## Passo 5 — Criar modelos, registro e caminho de leitura

Crie [docs/modelos/tarefa.md](../modelos/tarefa.md) com identificação, andamento, objetivo/aceite, arquitetura, implementação, evidências, entrega didática, revisão do gerente e pendências. Os campos entre `<` e `>` são instruções de preenchimento e devem ser substituídos ao abrir uma tarefa real.

Crie [docs/modelos/tutorial.md](../modelos/tutorial.md). Cada passo segue esta estrutura:

```markdown
## Passo 1 — Uma alteração concreta

**O que e onde fazer:** caminho, comando ou edição necessária.

**Como funciona:** explicação das partes e de suas conexões.

**Por que fazer assim:** problema resolvido e motivo da escolha.

**Como conferir:** procedimento e resultado esperado.
```

Separar essas perguntas impede que uma aula se limite a mandar copiar código. Pré-requisitos e ponto inicial permitem que outra pessoa comece do mesmo estado. A seção de problemas comuns ajuda a diagnosticar falhas sem adivinhar.

Os caminhos de uma tarefa de produto serão, por exemplo, `docs/registros/define-puzzle-platform-mvp/1.1.md` e `docs/tutoriais/define-puzzle-platform-mvp/1.1.md`. Esta entrega recebe `PROC-01`, pois configura o processo e não implementa uma tarefa de produto. Crie seu [registro](../registros/PROC-01.md), este tutorial e o [índice de leitura](README.md). O índice contém links em ordem de estudo; não replica os checkboxes da fila.

Por fim, crie [README.md](../../README.md) na raiz como entrada para planejamento, fluxo e tutoriais. Ele deve deixar claro que a aplicação ainda não existe. Quando um procedimento mudar no futuro, o professor atualizará os capítulos afetados ou explicitará sua versão e o caminho vigente; isso evita ensinar instruções antigas como atuais.

Na cópia de estudo, recupere o grupo completo:

```powershell
git restore --source=$commitEntrega --worktree -- README.md docs/modelos/tarefa.md docs/modelos/tutorial.md docs/registros/PROC-01.md docs/tutoriais/README.md docs/tutoriais/PROC-01.md
git status --short
```

**Como conferir:** os arquivos novos devem aparecer como não rastreados, e os quatro arquivos existentes do OpenSpec como modificados em relação ao ponto inicial. Os links relativos devem ligar entrada, regras, modelos, registro e tutorial.

## Passo 6 — Verificar o conjunto antes de concluir

Execute na raiz da cópia de estudo:

```powershell
npm exec --yes --cache "$env:TEMP\teste-enigma-npm-cache" --package @fission-ai/openspec@2.0.0 -- openspec list --json
npm exec --yes --cache "$env:TEMP\teste-enigma-npm-cache" --package @fission-ai/openspec@2.0.0 -- openspec validate define-puzzle-platform-mvp --strict --no-interactive
git diff --check
```

O primeiro comando deve indicar a raiz da cópia e 0 de 41 tarefas concluídas. O segundo deve informar que a mudança é válida. `--strict` pede a verificação estrita; `git diff --check` aponta problemas de whitespace no diff dos arquivos rastreados. Esse comando sozinho não verifica links nem a qualidade didática dos arquivos novos.

O pacote OpenSpec está fixado em 2.0.0 neste roteiro para manter o comando associado ao ambiente da entrega. `npm exec` usa a ferramenta sem criar dependência da aplicação; `--cache` direciona seu cache à pasta temporária. Na sessão da entrega, `openspec` não estava no PATH, e o mesmo fallback npm, inicialmente sem fixar a versão no argumento, executou a versão 2.0.0 com sucesso.

Confirme que as linhas da fila não mudaram. O bloco abaixo executa Python pelo PowerShell:

```powershell
@'
import pathlib, re, subprocess
p = 'openspec/changes/define-puzzle-platform-mvp/tasks.md'
base = subprocess.check_output(['git', 'show', 'c60b2ae1b5df73ef9d2b5d36c3c55138ac351d2a:' + p]).decode('utf-8')
atual = pathlib.Path(p).read_text(encoding='utf-8')
linhas = lambda texto: re.findall(r'^- \[[ xX]\].*$', texto, re.M)
assert linhas(base) == linhas(atual)
assert len(linhas(atual)) == 41
assert all(linha.startswith('- [ ]') for linha in linhas(atual))
print('41 tarefas preservadas e pendentes')
'@ | python -
```

Compare também as specs e abra os links locais:

```powershell
git diff --exit-code -- openspec/changes/define-puzzle-platform-mvp/specs
```

Esse comando deve terminar sem diferenças. Para verificar os links Markdown locais dos documentos desta entrega:

```powershell
@'
from pathlib import Path
import re
arquivos = [Path('AGENTS.md'), Path('README.md')]
arquivos += list(Path('docs').rglob('*.md'))
arquivos += [Path('openspec/changes/define-puzzle-platform-mvp') / nome for nome in ('proposal.md', 'design.md', 'tasks.md')]
falhas = []
for arquivo in arquivos:
    texto = re.sub(r'```.*?```', '', arquivo.read_text(encoding='utf-8'), flags=re.S)
    for alvo in re.findall(r'\[[^\]]*\]\(([^)]+)\)', texto):
        if re.match(r'^[a-zA-Z][a-zA-Z0-9+.-]*:', alvo) or alvo.startswith('#'):
            continue
        caminho = alvo.split('#', 1)[0]
        if caminho and not (arquivo.parent / caminho).exists():
            falhas.append((str(arquivo), alvo))
assert not falhas, falhas
print('Links locais existentes')
'@ | python -
```

O verificador ignora blocos de código, endereços externos e âncoras internas. Ele verifica existência de arquivos e diretórios, não disponibilidade de páginas externas nem correção dos títulos de âncoras.

## Passo 7 — Revisar e vincular a entrega a um commit

Na execução real, o gerente lê os arquivos e as evidências, pede correções e faz staging somente dos caminhos dessa tarefa. Staging significa escolher o conteúdo que entrará no próximo commit. O commit deve reunir perfis, regras, registro, tutorial, índice e mudanças do planejamento.

A mensagem desta entrega usa um assunto documental e o vínculo:

```text
docs: estabelecer equipe e tutoriais por tarefa

Task: PROC-01
```

PROC-01 não marca nenhuma tarefa do MVP como pronta. Para tarefas de produto, o gerente prepara a marcação final junto das entregas e só anuncia conclusão após conferir o commit. Se ele falhar, mantém as entregas e registra a pendência de versionamento. Não grave o hash do próprio commit dentro dele: isso exigiria mudar seu conteúdo e, portanto, seu hash.

Na cópia de estudo não é necessário criar outro commit. Para consultar a entrega original:

```powershell
git show --stat --oneline $commitEntrega
git show --format=full --no-patch $commitEntrega
```

**Como conferir:** o trailer deve ser `Task: PROC-01` e os arquivos devem corresponder a este capítulo. Não é necessário fazer push para estudar ou concluir o commit local autorizado.

## Resultados verificados e limites

O professor leu os quatro perfis, as instruções, os modelos, o fluxo, o registro, o índice, a configuração e o diff dos três artefatos de planejamento. Conferiu os comandos de validação TOML, tarefas, links e OpenSpec na árvore de trabalho da entrega. Os resultados e o ambiente ficam no [registro](../registros/PROC-01.md).

O roteiro de clone e restauração a partir do commit final é uma instrução de reprodução para depois do commit: não foi executado pelo professor antes de esse commit existir. Recuperar os arquivos de referência comprova que se pode reconstruir o estado documental; não substitui entender e revisar seu conteúdo. Não houve teste da aplicação nem integração de navegador, pois esta entrega não implementa o MVP. Também não foi comprovada a descoberta automática dos perfis pela interface do cliente.

A alternativa de cópia documental permite uma conferência pré-commit, mas sua inclusão no roteiro não significa que o professor a tenha executado. Consulte o registro para saber quais reproduções adicionais o gerente efetivamente realizou.

## Problemas comuns

- **`openspec` não é reconhecido:** use os comandos `npm exec` acima. Confira Node/npm e acesso ao pacote; uma falha de rede não é erro das specs.
- **`tomllib` não foi encontrado:** confira `python --version` e use Python 3.11 ou superior. Não acrescente dependências à aplicação para validar estes documentos.
- **O commit PROC-01 não foi encontrado:** a origem ainda não contém a entrega commitada ou o histórico está incompleto. Use uma cópia com o histórico correto; não substitua silenciosamente o ponto inicial.
- **Avisos LF/CRLF:** Git pode avisar que converterá finais de linha no Windows. Diferencie o aviso de um erro de whitespace. Confira o diff; não troque a configuração global de Git por causa deste capítulo.
- **Acentos aparecem errados no terminal:** os arquivos devem permanecer UTF-8. Use `Get-Content -Encoding UTF8`; se necessário, ajuste a saída desta sessão com `[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`.
- **Os agentes não aparecem por nome:** o TOML válido não comprova carregamento pelo cliente. Siga a alternativa prevista em `AGENTS.md`: ler o perfil e fornecer suas instruções ao subagente disponível, informando limitações de delegação.

## Continuidade

Você aprendeu a separar requisitos do produto de critérios de entrega, delimitar responsabilidades dos agentes, ligar tarefa/documentação/commit e verificar a configuração sem inventar testes de aplicação. Consulte o [fluxo vigente](../fluxo-de-trabalho.md), os [modelos](../modelos/tutorial.md) e a [trilha de leitura](README.md) para as próximas tarefas. Os capítulos de implementação serão acrescentados somente quando suas tarefas forem efetivamente entregues.
