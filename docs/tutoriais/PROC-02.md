# PROC-02 — Analisar referências e definir uma direção UI/UX

## Objetivo e ponto de partida

Neste capítulo, você aprenderá a transformar referências visuais em decisões que um programador consegue aplicar e verificar. Vamos acrescentar o especialista `designer_ui_ux`, explicar por que o Nexo adotou a direção **terminal de fósforo verde** e ligar o design ao fluxo da equipe.

UI trata da interface apresentada; UX considera como a pessoa compreende e realiza suas ações. Escolher uma cor é uma decisão de UI. Preservar a ordem de leitura, dar retorno a uma ação e manter autoria separada do jogo também afeta a experiência.

O commit-base é `fc8b336900a6ccff9f2cce8666407f7eab96313d`. Ele contém o bootstrap do [capítulo 1.1](define-puzzle-platform-mvp/1.1.md) e o processo ensinado em [PROC-01](PROC-01.md). Os cinco arquivos de referência fornecidos pelo usuário estavam na máquina, mas **ainda não eram rastreados nesse commit**. Eles passam a integrar a entrega PROC-02 para que leitores futuros consigam repetir a análise.

O resultado é um perfil de agente, um guia canônico, uma folha documental e a integração ao processo. O frontend em `web/` continua com o bootstrap; este capítulo não aplica o novo estilo à aplicação, não implementa telas e não conclui outra tarefa do MVP. Decisões e evidências ficam no [registro PROC-02](../registros/PROC-02.md).

## Passo 1 — Preparar os arquivos e separar suas responsabilidades

Você precisa de Git, Python **3.11 ou superior** para `tomllib`, um editor UTF-8 e um navegador. Os comandos usam PowerShell e partem da raiz do repositório. Não é necessário instalar pacotes npm para ler ou servir esta folha documental. O ambiente do professor foi Windows/PowerShell com Python 3.14.0.

Depois que PROC-02 tiver sido commitada, crie uma cópia de estudo com o histórico da entrega:

```powershell
$origemProjeto = (Get-Location).Path
$pastaEstudo = Join-Path $env:TEMP ('nexo-proc02-' + [guid]::NewGuid().ToString('N'))
git clone --no-hardlinks -- $origemProjeto $pastaEstudo
if ($LASTEXITCODE -ne 0) { throw 'Falha no clone de estudo.' }
Set-Location -LiteralPath $pastaEstudo
$commitProc02 = git log --all -1 --format=%H --grep='^Task: PROC-02$'
if (-not $commitProc02) { throw 'Esta copia nao contem a entrega PROC-02.' }
git switch --detach fc8b336900a6ccff9f2cce8666407f7eab96313d
if ($LASTEXITCODE -ne 0) { throw 'Commit-base indisponivel.' }
git restore --source=$commitProc02 --worktree -- docs/referencias/interface
```

`--all` pesquisa as referências do histórico; também permite localizar a entrega se você fizer a busca depois de destacar o HEAD no commit-base. A restauração recupera as referências **da entrega posterior**, sem fingir que existiam no base. Como trabalhamos em uma cópia nova, não sobrescrevemos as referências ou alterações do projeto original.

Antes de editar, diferencie quatro camadas:

| Camada | Caminho | O que representa |
| --- | --- | --- |
| Fontes | `docs/referencias/interface/` | Material recebido, preservado para consulta e rastreabilidade. |
| Decisões | `docs/design/estilo-interface.md` | Guia canônico: valores, usos, motivos e critérios de revisão. |
| Demonstração | `docs/design/previa-interface.html` | Folha estática para examinar aparência e estados isolados. |
| Aplicação | `web/` | Código do produto, que será alterado somente nas tarefas autorizadas. |

Essa separação evita interpretar uma imagem como requisito funcional ou uma folha visual como autenticação e jogo prontos. O arquivo HTML desta entrega não é a prévia privada de partidas para autores que ficou fora do MVP.

Confira as fontes e registre seus hashes antes de modificações documentais:

```powershell
Get-ChildItem -File docs/referencias/interface
Get-ChildItem -File docs/referencias/interface | Get-FileHash -Algorithm SHA256
Get-Content -Encoding UTF8 docs/referencias/interface/hacker.css
Get-Content -Encoding UTF8 docs/referencias/interface/README.md
```

Abra também cada uma das três imagens no visualizador. Seus nomes não bastam para descrever composição e legibilidade. Os hashes identificam o conteúdo recebido; em textos, o Git pode normalizar LF/CRLF ao versionar. Compare hashes de imagens diretamente e diferencie essa normalização de uma alteração editorial nos textos.

## Passo 2 — Observar cada referência e justificar o que não usar

O designer abriu as três imagens e leu os dois textos; o professor também os examinou para escrever este capítulo. A análise não escolheu uma imagem inteira para copiar. Ela separou elementos úteis dos que conflitam com o produto:

| Referência | Observação e decisão | Por quê |
| --- | --- | --- |
| [terminal-dark.png](../referencias/interface/terminal-dark.png) | Aproveitar alinhamento, verde sobre preto e grupos delimitados. Adaptar painéis à autoria e rejeitar a barra extensa de menus na entrada. | A imagem é um painel operacional denso; a primeira visita do jogador precisa preservar o mistério. |
| [retro-terminal-hacker.jpeg](../referencias/interface/retro-terminal-hacker.jpeg) | Aproveitar monoespaçada e contornos finos. Reduzir halos e grandes áreas de verde saturado. | O brilho de tabelas e títulos compete com a leitura de enunciados longos. |
| [fea77755-55d3-4efc-887d-9ce403f669f0-cover.png](../referencias/interface/fea77755-55d3-4efc-887d-9ce403f669f0-cover.png) | Aproveitar respiro, painel e linguagem de prompt. Rejeitar textura binária, navegação de portfólio, controles decorativos de janela e cartões de mídia. | Esses elementos descrevem outro produto e colocam ruído ou ações sem função no percurso textual do Nexo. |
| [hacker.css](../referencias/interface/hacker.css) | Aproveitar a coerência da paleta e da fonte como referência, sem importar o CSS. | O arquivo remove `outline`, bloqueia `resize` de textarea, espalha brilho e reduz controles a 14px no celular. Precisamos decidir foco, tamanho e leitura explicitamente. |
| [README da referência](../referencias/interface/README.md) | Aproveitar a organização por tipografia, controles e estados para estruturar o guia. Não adotar automaticamente classes e componentes. | A documentação ensina a biblioteca de origem; as funcionalidades do Nexo vêm das specs. |

Por isso **não adicionamos** `<link rel="stylesheet" href="hacker.css">` à aplicação ou à folha. Importar um CSS global traria também regras para tabelas, imagens e estados que não foram escolhidas. Preservar a fonte permite explicar e revisar a decisão sem tornar o produto dependente dela.

## Passo 3 — Criar o especialista persistente

Crie `.codex/agents/designer_ui_ux.toml`. Abaixo está seu conteúdo integral nesta entrega:

```toml
name = "designer_ui_ux"
description = "Analisa referências visuais e define a identidade, componentes e interação acessível do Nexo em um guia aplicável ao frontend."
developer_instructions = '''
Você é o especialista em Design UI/UX deste projeto educacional de programação web.
Leia AGENTS.md, docs/fluxo-de-trabalho.md, a tarefa e o registro atribuídos, as specs de comportamento, o design técnico e o guia visual vigente em docs/design/. Leia as referências em docs/referencias/interface/ e abra as imagens com a ferramenta de visualização; não deduza seu conteúdo somente pelo nome.
Identifique em cada referência o que aproveitar, adaptar ou rejeitar e explique por quê. Preserve os originais. Referências visuais não autorizam adicionar funcionalidades, comandos ou navegação ao produto.
Defina uma direção visual coerente: cores e seus usos, tipografia com fallback, escala de espaços e tamanhos, hierarquia, layout responsivo, componentes e estados. Registre valores concretos e motivos no guia visual canônico; evite decisões vagas como usar um verde bonito.
Respeite o terminal textual e a entrada misteriosa: a experiência inicial do jogador não anuncia autoria, menus ou comandos secretos. Criadores têm área própria; jogo mostra somente a etapa atual e dicas liberadas. Não invente papéis, telas ou funcionalidades além das specs.
Priorize legibilidade, HTML semântico, foco visível, teclado, mensagens textuais e alvos de toque. Não copie outline:none, redução excessiva de fontes, bloqueio de resize ou brilho intenso das referências sem corrigir seus efeitos de uso. Se citar WCAG ou normas, confira fontes oficiais atuais e diferencie alvo de projeto de conformidade efetivamente testada.
Evite textura, scanlines, animação de digitação ou brilho que atrapalhem leitura, atrasem conteúdo ou substituam feedback. Defina comportamento com preferência por movimento reduzido quando houver movimento.
Entregue ao arquiteto e ao programador tokens e critérios verificáveis. Quando solicitado, produza uma folha visual estática em docs/design/ para revisão, claramente separada da aplicação e sem simular API, autenticação ou progresso real. Não instale bibliotecas nem altere web/ sem escopo explícito.
Revise a implementação visual quando o gerente solicitar e registre o que foi inspecionado, medido ou apenas proposto. Comunique divergências; não declare testes com usuários ou conformidade sem evidência.
O professor lê a entrega para escrever o tutorial e o gerente decide o aceite final. Não marque tarefas como concluídas, não faça staging, commit ou push e não delegue sem coordenação do gerente.
'''
```

TOML usa pares `chave = valor`. `name` identifica o agente; `description` orienta quando utilizá-lo; as aspas triplas guardam suas instruções de várias linhas. O perfil exige observação, decisões concretas e revisão posterior, não somente uma opinião estética. Os limites preservam a autoridade das specs, o escopo da tarefa e o controle de commits pelo gerente.

O perfil não cria um serviço em segundo plano nem muda permissões. Se ele não aparecer pelo nome na sessão, o gerente pode ler seu conteúdo e transmiti-lo ao subagente disponível, conforme `AGENTS.md`.

## Passo 4 — Transformar a direção em valores e regras de uso

Crie [docs/design/estilo-interface.md](../design/estilo-interface.md) com esta sequência: direção, análise das fontes, tokens, contrastes, tipografia/composição, luz/movimento, componentes/estados, regras por experiência e critérios de revisão. O arquivo integral é a referência desta entrega; o tutorial explica sua construção sem manter um segundo guia concorrente.

O nome **terminal de fósforo verde** resume fundo quase preto com matiz verde, monoespaçada e acentos luminosos. O conteúdo contínuo usa verde suave; o verde vivo destaca intenção e ação. Isso mantém identidade sem fazer todo texto competir pela atenção.

Um **token** é um nome para uma decisão visual. Por exemplo, o guia define `--nexo-bg` para o fundo e `--nexo-accent` para destaques. O programador usa `var(--nexo-accent)` em vez de espalhar um código de cor sem significado. Nesta versão são **19 tokens**: dez cores, uma pilha de fontes, um raio e sete espaços. Valores e usos completos permanecem no guia.

As decisões se conectam ao uso:

- **Cor tem função:** `text` sustenta leitura; `muted` continua legível; `accent` indica prioridade; `danger` e `warning` vêm acompanhados de palavras. `line` é decorativa, enquanto `control-border` identifica controles.
- **Hierarquia sem encolher a leitura:** texto e controles usam `1rem`, normalmente 16px; a pergunta usa `clamp()` para variar dentro de limites. A pilha de fontes locais oferece fallback e dispensa download de fontes.
- **Espaço tem escala:** 4/8/12/16/24/32/48px distinguem elementos relacionados, grupos e seções. Entrada e jogo têm coluna até `72ch`, unidade relacionada à largura do caractere `0` da fonte, usada aqui como medida de leitura.
- **Celular reorganiza a composição:** abaixo de `48rem`, grupos passam a uma coluna. `min-width: 0`, quebra de palavras e ausência de alturas rígidas ajudam conteúdos longos a caber.
- **Luz é pontual:** brilho suave no contorno de uma região, sem sombras no texto de leitura. Não usamos chuva binária, digitação artificial ou cursor piscando. Informação pronta aparece sem espera decorativa.

O guia descreve também carregamento, desabilitado, erro, aviso e sucesso. Uma borda vermelha sem explicação não ensina a corrigir um campo; um botão apagado sem motivo não explica por que está indisponível. Mensagens e associações semânticas fazem parte do desenho.

### Calcular contraste em vez de adivinhar

Contraste compara luminâncias, não apenas nomes ou matizes das cores. Para as cores sólidas do guia, convertemos os canais sRGB para valores lineares, calculamos luminância relativa e aplicamos `(Lmaior + 0,05) / (Lmenor + 0,05)`, conforme a [definição do W3C](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance).

Na raiz da cópia de estudo, depois de criar ou recuperar o guia, execute este bloco PowerShell, que envia o programa ao Python:

```powershell
@'
from pathlib import Path
import re

guia = Path('docs/design/estilo-interface.md').read_text(encoding='utf-8')
tokens = dict(re.findall(r'(--nexo-[\w-]+)\s*:\s*([^;]+);', guia))

def luminancia(cor):
    canais = [int(cor[i:i+2], 16) / 255 for i in (1, 3, 5)]
    linear = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in canais]
    return sum(c * peso for c, peso in zip(linear, (0.2126, 0.7152, 0.0722)))

def contraste(a, b):
    maior, menor = sorted((luminancia(a), luminancia(b)), reverse=True)
    return (maior + 0.05) / (menor + 0.05)

for nome in ('text', 'muted', 'accent', 'control-border', 'focus', 'warning', 'danger', 'line'):
    frente = tokens['--nexo-' + nome]
    valores = [contraste(frente, tokens['--nexo-' + fundo]) for fundo in ('bg', 'surface')]
    print(nome, 'bg={:.2f}:1 surface={:.2f}:1'.format(*valores))
assert contraste(tokens['--nexo-muted'], tokens['--nexo-surface']) >= 4.5
assert contraste(tokens['--nexo-control-border'], tokens['--nexo-surface']) >= 3
print('Combinacoes de exemplo verificadas; isto nao e uma auditoria da aplicacao.')
'@ | python -
```

`int(..., 16)` lê os canais hexadecimais; a conversão linear corrige a relação entre o número sRGB e a luz representada. A soma ponderada produz a luminância. Só arredondamos a impressão, nunca o valor usado no aceite.

Resultados desta paleta: `muted` sobre `surface` ≈ **8,42:1**, borda funcional sobre a superfície ≈ **4,71:1**. A linha decorativa fica em aproximadamente **1,70:1**: ela não pode ser a única maneira de reconhecer um campo. O botão principal usa texto escuro `bg` sobre fundo `accent`, razão aproximada de 15,17:1, em vez de texto claro sobre verde vivo.

As metas do guia são 4,5:1 para texto comum e 3:1 para informação visual necessária de controles, com as condições e exceções descritas pelas fontes oficiais de [contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) e [contraste não textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). Recalcule se mudar opacidade, fundos ou estados. Medir a paleta não demonstra conformidade WCAG da página inteira ou da aplicação.

## Passo 5 — Demonstrar os componentes em uma folha independente

Crie [docs/design/previa-interface.html](../design/previa-interface.html) como um documento HTML completo, em português, com CSS próprio em `<style>`. O arquivo integral liga os trechos desta seção e mostra quatro grupos: paleta, entrada isolada, componentes/estados e organização da autoria. Sua introdução informa que campos e botões são amostras sem operações de produto.

O núcleo da entrada é:

```html
<div class="entry">
  <label class="entry-question" for="entry-intent">O que você busca?</label>
  <div class="prompt-row">
    <span class="prompt" aria-hidden="true">&gt;</span>
    <input id="entry-intent" type="text" autocomplete="off" spellcheck="false" />
  </div>
</div>
```

`for` associa a pergunta ao campo de mesmo `id`; o símbolo `>` é decorativo e recebe `aria-hidden`. A folha não interpreta a entrada. As legendas documentais e as amostras de autoria estão **fora** dessa composição: elas não são conteúdo autorizado para a primeira visita do jogador.

O foco e o redimensionamento têm regras explícitas no CSS:

```css
:focus-visible { outline: 2px solid var(--nexo-focus); outline-offset: 3px; }
input, textarea { width: 100%; min-width: 0; min-height: 44px; padding: 12px; }
textarea { resize: vertical; min-height: 120px; }
```

O contorno mostra onde o teclado atua; afastá-lo 3px ajuda a separá-lo da borda. Permitir redimensionamento vertical evita prender um texto longo em uma caixa pequena. A [explicação oficial sobre foco visível](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) trata a percepção desse estado como requisito para operação por teclado.

O tamanho de 44px é uma **meta interna de conforto**, com espaço entre ações. O mínimo AA de [tamanho de alvo na WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) é 24×24 CSS px, com exceções; não confunda a escolha mais confortável do projeto com o texto desse mínimo.

Na folha, a estrutura responsiva usa, entre outras regras:

```css
.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
.copy { max-width: 72ch; white-space: pre-wrap; overflow-wrap: anywhere; }
@media (max-width: 48rem) {
  .grid { grid-template-columns: minmax(0, 1fr); }
}
```

`minmax(0, 1fr)` permite que a coluna diminua sem impor a largura mínima de um texto longo. `pre-wrap` conserva quebras do enunciado e permite novas quebras; `overflow-wrap` evita que uma palavra extensa alargue a página. O bloco integral também ajusta espaçamento, lista e paleta no celular, trata cores forçadas e remove movimento quando solicitado.

Em erro, o HTML associa a mensagem ao campo com `aria-describedby` e usa `aria-invalid="true"`. O botão desabilitado tem explicação próxima. Essas amostras demonstram a associação; não representam validação de formulário ou um salvamento em andamento.

Para consultar a versão integral e reproduzir a folha após entender as partes, na cópia destacada do commit-base:

```powershell
git restore --source=$commitProc02 --worktree -- docs/design/estilo-interface.md docs/design/previa-interface.html
```

Essa recuperação é de dois documentos de referência extensos, não aplicação de CSS a `web/`. Verifique os 19 tokens entre ambos no passo 7.

## Passo 6 — Integrar o design ao trabalho da equipe

Adicionar um perfil sem estabelecer quando ele atua deixaria seu uso ao acaso. O fluxo passa a ser:

```text
gerente seleciona → arquiteto delimita
  → se afeta interface: designer desenha → programador implementa → designer revisa
  → se e somente banco/infraestrutura: programador implementa
  → professor explica → gerente confere e commita
```

A passagem do designer para o programador é um **handoff**: entrega de decisões, referências e critérios observáveis. Por exemplo: qual hierarquia usar, quais estados apresentar, quais tokens consultar e o que verificar em teclado e celular. O registro deve separar o que foi proposto do que foi inspecionado ou medido depois da implementação.

As integrações desta entrega alteram 12 arquivos existentes:

| Arquivos | Alteração e motivo |
| --- | --- |
| `AGENTS.md`, `README.md`, `docs/fluxo-de-trabalho.md` | Apresentar os cinco papéis, apontar guia/folha/fontes e tornar a etapa de design condicional a interface ou experiência. |
| `docs/modelos/tarefa.md` | Acrescentar estado `em design`, papel aplicável e seção de desenho/revisão visual, para a passagem ficar registrada. |
| `.codex/agents/arquiteto.toml` | Encaminhar contratos ao designer e referenciar o guia sem duplicar tokens. |
| `.codex/agents/programador_web.toml` | Ler o handoff e devolver o resultado à revisão visual antes do tutorial. |
| `.codex/agents/professor.toml` | Explicar os motivos visuais e distinguir metas, medidas e funcionalidade real. |
| `.codex/agents/gerente.toml` | Coordenar a etapa e conferir evidências/limites antes do aceite. |
| `openspec/config.yaml` | Manter o especialista e a precedência das specs nas orientações futuras. |
| `proposal.md`, `design.md`, `tasks.md` da mudança ativa | Alinhar o fluxo e referenciar o guia, preservando o backlog funcional. |

Use o diff versionado para conferir cada alteração e recuperar essas integrações na cópia de estudo:

```powershell
$integracoes = @(
  'AGENTS.md', 'README.md', 'docs/fluxo-de-trabalho.md', 'docs/modelos/tarefa.md',
  '.codex/agents/arquiteto.toml', '.codex/agents/programador_web.toml',
  '.codex/agents/professor.toml', '.codex/agents/gerente.toml', 'openspec/config.yaml',
  'openspec/changes/define-puzzle-platform-mvp/proposal.md',
  'openspec/changes/define-puzzle-platform-mvp/design.md',
  'openspec/changes/define-puzzle-platform-mvp/tasks.md'
)
git diff fc8b336900a6ccff9f2cce8666407f7eab96313d $commitProc02 -- $integracoes
git restore --source=$commitProc02 --worktree -- $integracoes
```

As specs prevalecem em todas essas etapas. A entrada não ganha menus nem anuncia autoria; identidade conserva as perguntas e confirmação; o jogo mostra só a etapa atual e dicas liberadas; criadores têm área própria. A estética de terminal não autoriza histórico de etapas, comandos novos, pausa, mapa de progresso ou prévia de partida. Dúvidas de comportamento voltam ao arquiteto e ao gerente.

## Passo 7 — Conferir estrutura, valores e resultado visual

Na raiz da cópia que já recebeu os arquivos, confira os cinco perfis:

```powershell
python -c "from pathlib import Path; import tomllib; ds=[tomllib.loads(p.read_text(encoding='utf-8')) for p in Path('.codex/agents').glob('*.toml')]; assert len(ds)==5; assert {d['name'] for d in ds}=={'arquiteto','designer_ui_ux','programador_web','professor','gerente'}; assert all(d.get('description') and d.get('developer_instructions') for d in ds); print('5 perfis validos')"
```

Isso verifica sintaxe, nomes e campos, não a descoberta dos perfis pela interface do cliente. Confira agora a correspondência dos tokens:

```powershell
@'
from pathlib import Path
import re
def tokens(caminho):
    texto = Path(caminho).read_text(encoding='utf-8')
    pares = re.findall(r'(--nexo-[\w-]+)\s*:\s*([^;]+);', texto)
    assert len(pares) == len(dict(pares)), 'Token duplicado'
    return {nome: valor.strip() for nome, valor in pares}
guia = tokens('docs/design/estilo-interface.md')
folha = tokens('docs/design/previa-interface.html')
assert len(guia) == 19
assert guia == folha, 'Valores divergentes entre guia e folha'
print('19 tokens identicos entre guia e folha')
'@ | python -
```

O script extrai declarações CSS, recusa repetições e compara nomes/valores. Ele não calcula medidas computadas no navegador. Uma regra de padding ou media query ainda precisa de inspeção visual.

Para abrir a folha, execute na raiz, em primeiro plano:

```powershell
python -m http.server 8766 --bind 127.0.0.1 --directory docs
```

Abra `http://127.0.0.1:8766/design/previa-interface.html`. O bind limita o servidor a esta máquina; ele serve somente a pasta documental. Encerre com `Ctrl+C` ao terminar. Se a porta estiver ocupada, escolha outra e ajuste o endereço. Não use `npm run dev` para confundir a folha com a aplicação.

No navegador, confira 1440px, 390px e 320px de largura: página sem overflow horizontal, grupos que se reorganizam, textos longos que quebram e controles legíveis. Use Tab para observar a ordem e o foco. Redimensione a textarea. Essas ações são conferências manuais; não são um teste com usuários nem uma auditoria completa de acessibilidade.

Na inspeção desta entrega, o gerente abriu a folha no Chrome em 1440×1000, 390×844 e 320×800, sem rolagem horizontal. Observou fonte de 16px e controles com altura mínima aproximada de 47,54px. No desktop, Tab alcançou o campo de entrada com foco visível; o console ficou sem erros ou avisos. As demais emulações e limites estão no [registro](../registros/PROC-02.md). O professor não repetiu essa inspeção de navegador.

Na cópia com Git, confirme que PROC-02 não mudou produto nem marcações:

```powershell
git diff --exit-code fc8b336900a6ccff9f2cce8666407f7eab96313d -- web api package-lock.json openspec/changes/define-puzzle-platform-mvp/specs
git diff --check
```

Como `tasks.md` recebeu uma regra de processo, compare separadamente somente suas linhas de tarefas:

```powershell
@'
from pathlib import Path
import re, subprocess
p = 'openspec/changes/define-puzzle-platform-mvp/tasks.md'
base = subprocess.check_output(['git', 'show', 'fc8b336900a6ccff9f2cce8666407f7eab96313d:' + p]).decode('utf-8')
linhas = lambda t: re.findall(r'^- \[[ xX]\].*$', t, re.M)
atual = linhas(Path(p).read_text(encoding='utf-8'))
assert atual == linhas(base)
assert len(atual) == 41
assert sum(l.startswith('- [x]') for l in atual) == 1
print('41 tarefas preservadas; somente 1.1 marcada')
'@ | python -
```

O objetivo é confirmar que o processo evoluiu sem declarar telas prontas ou duplicar a fila. Registro, tutorial e índice também devem estar ligados antes do aceite do gerente e do commit `Task: PROC-02`.

Ao registrar uma tarefa real, use os modelos para escrever decisões, verificações e explicações e acrescente o capítulo ao índice. Para completar a documentação da **versão de estudo** e consultar os registros desta entrega, recupere também os três documentos didáticos, que não existiam nessa forma no commit-base:

```powershell
git restore --source=$commitProc02 --worktree -- docs/registros/PROC-02.md docs/tutoriais/PROC-02.md docs/tutoriais/README.md
```

Assim, os links entre guia, registro, tutorial e índice ficam completos na cópia. Esse comando complementa a consulta aos documentos extensos; não substitui criar o perfil do passo 3 nem compreender e verificar as decisões ensinadas.

## Reprodução executada e limites

O professor leu os arquivos e as integrações, abriu as três imagens e leu os dois textos. Criou um clone temporário, destacou o commit-base e confirmou que as referências não existiam ali. Sobrepôs o snapshot documental atual para validar os comandos antes do commit: cinco perfis válidos, 19 tokens idênticos, contrastes iguais aos do guia e 41 tarefas preservadas, com somente 1.1 marcada. Verificou também links locais e ausência de mudanças nos arquivos de produto. O [registro](../registros/PROC-02.md) identifica o procedimento e os resultados efetivamente obtidos.

O roteiro Git de recuperação da entrega por trailer depende de um commit posterior e não foi declarado executado antes de sua existência. A folha já foi aberta pelo gerente; o professor não iniciou outro servidor nem refez navegador. Cálculo de cores, revisão documental e inspeção do HTML não demonstram conformidade WCAG da aplicação, testes com usuários ou implementação das telas.

## Problemas comuns e próximos usos

- **Referências ausentes no commit-base:** esperado. Recupere-as do commit PROC-02 pelo comando do passo 1; não as invente nem substitua por arquivos de nomes parecidos.
- **`tomllib` indisponível:** use Python 3.11 ou superior. Não acrescente dependências à aplicação apenas para validar os perfis.
- **Guia e folha divergem:** corrija a divergência na tarefa autorizada antes de aprovar. O guia é a fonte canônica; não decida qual cor vale por acaso.
- **Contraste cai após uma mudança:** confira fundo efetivo e opacidade, recalcule e reinspecione o estado. Um valor aprovado para texto não autoriza qualquer combinação de botão.
- **O foco desaparece:** procure remoção de outline, contêiner que corte o contorno e alterações de cor. Brilho decorativo não substitui foco identificável.
- **Fonte pequena no celular ou campo sem resize:** não copie essas regras da biblioteca recebida. A direção escolhida mantém leitura e interação confortáveis.
- **A folha mostra botões que a aplicação não possui:** são amostras documentais identificadas. Consulte specs e tarefa autorizada antes de implementar algo por aparência.

Nas próximas tarefas de interface, o gerente deve acionar o designer entre arquitetura e programação e pedir sua revisão depois. O programador consulta tokens e handoff; o professor explica também os motivos visuais; o gerente confere evidências e limites. Tarefas exclusivamente de banco ou infraestrutura registram que essa etapa não se aplica.

Os capítulos PROC-01 e 1.1 preservam seus pontos iniciais históricos. Para o processo atual de equipe e revisão visual, siga o [fluxo vigente](../fluxo-de-trabalho.md), o [guia canônico](../design/estilo-interface.md) e a [trilha de leitura](README.md).
