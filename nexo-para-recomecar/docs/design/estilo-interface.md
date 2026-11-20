# Nexo — direção visual e interação

## Direção definida

**Terminal de fósforo verde:** fundo quase preto com leve matiz verde, texto monoespaçado, composição direta e acentos luminosos. A identidade vem da cor, do ritmo tipográfico e de contornos precisos. O conteúdo permanece nítido e estável, sem textura atrás da leitura ou efeitos de digitação que atrasem as mensagens.

Esta é a direção estabelecida pelo especialista `designer_ui_ux` a partir das referências fornecidas em 16/11/2026, registrada em [PROC-02](../registros/PROC-02.md). Orienta as próximas implementações e revisões visuais. No repositório de origem, a tarefa 1.1 entregou a base da aplicação. Consulte o [README desta cópia](../../README.md) para ver o ponto de partida da nova implementação.

A [folha visual](previa-interface.html) permite examinar paleta, tipografia, entrada e componentes. É documentação estática sem API, autenticação ou progresso real. Não é um recurso de prévia privada de enigmas para autores.

## O que as referências ensinam

O especialista abriu visualmente as três imagens e leu os dois arquivos textuais. Os originais ficam preservados em [referências de interface](../referencias/interface/).

| Arquivo | Aproveitar | Adaptar ou rejeitar | Motivo |
| --- | --- | --- | --- |
| [terminal-dark.png](../referencias/interface/terminal-dark.png) | Fundo preto, verde, alinhamento de texto e painéis delimitados. | Adaptar a organização em grupos somente à autoria. Rejeitar a barra com muitos menus e a densidade de tabelas na entrada do jogador. | A referência é um painel operacional; o Nexo precisa de uma entrada misteriosa e formulários legíveis. |
| [retro-terminal-hacker.jpeg](../referencias/interface/retro-terminal-hacker.jpeg) | Monoespaçada, hierarquia por peso/tamanho, contorno fino e vocabulário visual de terminal. | Reduzir brilho de títulos e bordas. Trocar grandes faixas verdes de tabelas por realce pontual. | O efeito é reconhecível, mas brilho contínuo e áreas muito saturadas disputam atenção com textos longos. |
| [fea77755-55d3-4efc-887d-9ce403f669f0-cover.png](../referencias/interface/fea77755-55d3-4efc-887d-9ce403f669f0-cover.png) | Respiro, painel central, contraste do botão e linguagem de prompt. | Rejeitar textura binária sob o conteúdo, navegação de portfólio, botões de janela decorativos e cartões de mídia. | Esses elementos não pertencem aos fluxos textuais do MVP e a textura reduz a clareza. |
| [hacker.css](../referencias/interface/hacker.css) | Família monoespaçada, combinação verde/preto e consistência de controles. | Não importar o arquivo. Substituir `outline: none`, `resize: none`, brilho disseminado, controles de 14px e estilos globais de imagens/tabelas por regras próprias. | Precisamos de foco de teclado visível, área de texto ajustável e controles confortáveis; as imagens são referência, não um sistema pronto para adoção. |
| [README.md da referência](../referencias/interface/README.md) | A organização por tipografia, controles, tabelas e estados ajuda a montar um guia. | Não adotar todas as classes, componentes ou a redução de fonte no celular. A nota de licença do material não é uma dependência técnica do Nexo. | A documentação descreve a biblioteca de referência; o conjunto necessário do produto vem das specs. |

## Paleta e tokens

Um **token** é um nome estável para uma decisão visual. O programador usa o nome em vez de repetir um valor sem contexto. O guia é a fonte canônica destes valores; a folha visual os demonstra.

```css
:root {
  --nexo-bg: #050805;
  --nexo-surface: #0c140f;
  --nexo-text: #c7f5cf;
  --nexo-muted: #95b69d;
  --nexo-accent: #45ff79;
  --nexo-control-border: #60896b;
  --nexo-line: #28422f;
  --nexo-focus: #e6ffe9;
  --nexo-warning: #f4c56a;
  --nexo-danger: #ff9b9b;
  --nexo-font: Consolas, "Liberation Mono", "Courier New", monospace;
  --nexo-radius: 4px;
  --nexo-space-1: 4px;
  --nexo-space-2: 8px;
  --nexo-space-3: 12px;
  --nexo-space-4: 16px;
  --nexo-space-6: 24px;
  --nexo-space-8: 32px;
  --nexo-space-12: 48px;
}
```

| Token de cor | Uso |
| --- | --- |
| `bg` | Fundo da página e texto escuro sobre botão de destaque. |
| `surface` | Painel e fundo de campos; separação discreta, sem cartões flutuantes. |
| `text` | Enunciados, parágrafos, valores e rótulos principais. O verde suave reduz o peso visual da leitura contínua. |
| `muted` | Metadados e explicações secundárias, nunca texto ilegível ou instrução escondida. |
| `accent` | Pergunta ativa, ação principal, link e indicação positiva acompanhada de texto. |
| `control-border` | Contorno necessário para reconhecer campos, botões secundários e estados. |
| `line` | Divisor decorativo entre grupos que já têm títulos e espaço. Nunca a única pista de um controle ou estado. |
| `focus` | Contorno externo de foco por teclado. |
| `warning` | Aviso com rótulo e explicação textual. |
| `danger` | Erro e ação destrutiva, sempre nomeados. Não fazer a pessoa depender da cor. |

### Contraste calculado

Foram calculadas as razões entre cores sólidas por luminância relativa sRGB, usando `(Lmaior + 0,05) / (Lmenor + 0,05)`. Valores da tabela são arredondados somente para apresentação; o cálculo usa os valores completos. Não aplicar opacidade aos textos ou controles abaixo sem recalcular a combinação efetiva.

| Primeiro plano | Sobre `bg` | Sobre `surface` |
| --- | --- | --- |
| `text` | 16,67:1 | 15,49:1 |
| `muted` | 9,06:1 | 8,42:1 |
| `accent` | 15,17:1 | 14,10:1 |
| `control-border` | 5,07:1 | 4,71:1 |
| `focus` | 19,02:1 | 17,68:1 |
| `warning` | 12,50:1 | 11,62:1 |
| `danger` | 9,98:1 | 9,28:1 |
| `line` — apenas decorativa | 1,83:1 | 1,70:1 |

O botão principal usa texto `bg` sobre fundo `accent`, razão 15,17:1. Não usar `text` claro sobre `accent`, combinação inadequada para esse botão.

Metas do guia: texto comum com pelo menos 4,5:1, informação visual necessária de controles com pelo menos 3:1 e foco visível. Esses alvos seguem as explicações oficiais de [contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [contraste não textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) e [foco visível](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html). O cálculo desta paleta não equivale a uma auditoria de conformidade da aplicação.

## Tipografia, espaço e composição

- Usar a pilha monoespaçada dos tokens, sem baixar fontes remotas. O sistema tenta cada fonte na ordem e termina na monoespaçada disponível.
- Texto e controles: `1rem`, respeitando a preferência de fonte do navegador; referência visual de 16px na configuração usual. Entrelinha de texto: `1.6`; controles: `1.4`.
- Texto secundário permanece em `1rem`; a hierarquia vem da cor e da posição. Não encolher controles no celular.
- Pergunta de entrada: `clamp(1.25rem, 3vw, 1.5rem)` e peso 400. Ela é uma pergunta, não um título de marketing.
- Título da área de criadores: `clamp(1.5rem, 4vw, 2rem)`; seções: `1.125rem`, peso 700. Não usar caixa alta em parágrafos ou rótulos longos.
- Empregar a escala 4/8/12/16/24/32/48px. Separar rótulo/campo por 8px, itens relacionados por 16px, grupos por 24–32px e grandes seções por 48px.
- Entrada e jogo: uma coluna, largura máxima de leitura de `72ch`, margens horizontais de 16px no celular e 32px quando houver espaço. Manter o conteúdo no fluxo normal, com espaço superior de `clamp(48px, 12vh, 112px)`, sem altura fixa que impeça rolagem quando o teclado virtual abrir.
- Autoria: largura máxima de `1120px`, com grupos claramente nomeados e formulário principal até `72ch`. Duas colunas somente para grupos independentes quando couberem sem apertar rótulos/campos. A ordem do DOM deve continuar a ordem de leitura e teclado.
- Abaixo de `48rem`, usar uma coluna e ações que possam quebrar linha. Campos têm `width: 100%`, `min-width: 0` e `box-sizing: border-box`. Listas de enigmas viram linhas/cartões textuais com nome, estado e ação; não exigir tabela larga no celular.
- Enunciados e mensagens usam `white-space: pre-wrap` e quebra de palavras longas. Texto nunca deve ser truncado por altura fixa. Código literal continua texto, sem interpretar marcação recebida.

## Contornos, luz e movimento

Controles usam borda sólida de 1px em `control-border` e raio de 4px. Painéis documentais ou de autoria podem usar `line` para delimitação decorativa; títulos e espaço mantêm a estrutura reconhecível. Evitar arredondamento de pílula, vidro, gradientes coloridos e sombras de cartões elevados.

O brilho é um acento: no máximo um contorno de destaque ou pequena marca visual por região. Referência para um painel destacado: `box-shadow: 0 0 18px rgb(69 255 121 / 0.08)`. Texto de leitura, campos e mensagens não recebem `text-shadow`. Não usar a sombra para substituir contraste de borda ou indicação de foco.

Não usar textura binária, scanlines, ruído, chuva de caracteres, cursor piscando ou animação de digitação nesta direção inicial. O conteúdo aparece completo assim que está disponível. Transições opcionais de cor/borda podem durar 120ms; com `prefers-reduced-motion: reduce`, removê-las. Carregamento é comunicado por texto e estado, sem depender de movimento.

## Componentes e estados

| Componente/estado | Regra visual e de interação |
| --- | --- |
| Campo textual | Rótulo associado, texto `text`, fundo `surface`, borda `control-border`, padding de 12px e altura mínima de 44px. Placeholder não substitui o rótulo. |
| Foco de teclado | `outline: 2px solid var(--nexo-focus); outline-offset: 3px` em `:focus-visible`. Não cortar o contorno com `overflow: hidden`, nem remover foco nativo sem alternativa. |
| Área de texto | Mesma linguagem do campo; altura inicial confortável, `resize: vertical`, sem bloquear seleção ou colagem. |
| Ação principal | Fundo `accent`, texto `bg`, rótulo de verbo claro; uma prioridade visual por grupo. Hover pode inverter para fundo `surface` e texto `accent`, mantendo borda reconhecível. |
| Ação secundária | Fundo `surface`, texto `text`, borda `control-border`; não compete com a principal. Links textuais ficam sublinhados, com indicação além da cor. |
| Ação destrutiva | Rótulo explícito, texto/borda `danger` e confirmação prevista pelas specs. Não colocar uma exclusão com destaque maior que salvar/publicar. |
| Desabilitado | Usar `disabled` quando aplicável e manter texto explicando o motivo próximo. Não apagar a legibilidade reduzindo a opacidade do grupo inteiro. |
| Carregamento | Mostrar texto como “Salvando…” no contexto da operação e estado acessível adequado na implementação. Não apagar o formulário nem simular progresso falso. |
| Erro | Rótulo “Erro” ou mensagem objetiva, cor `danger`, associação ao campo/ação e foco tratado conforme o fluxo. Manter valores locais quando previsto. |
| Aviso | Texto que explica consequência em `warning`; não depender apenas de um ícone. |
| Sucesso | Texto de confirmação em `accent`; conteúdo permanece legível e a confirmação não desaparece antes de poder ser percebida. |

Altura mínima de 44px e espaço de 8px entre ações são metas internas de conforto, não uma descrição do mínimo AA. O critério de [tamanho mínimo de alvo do W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) usa 24×24 CSS px com exceções; o Nexo escolhe controles maiores.

## Aplicação por experiência

### Entrada do jogador

O primeiro acesso apresenta somente **“O que você busca?”** como mensagem inicial e um campo para a intenção. A própria pergunta pode ser o rótulo visível do campo. Um pequeno `>` decorativo pode anteceder o texto de entrada, com `aria-hidden="true"`.

Não colocar navbar, logotipo explicativo, catálogo, cartões, instruções de comandos, link de criar enigma, falso `root@...` ou texto de boas-vindas. A ação é enviar pelo teclado conforme o fluxo futuro. A folha visual mostra apenas um campo demonstrativo; não interpreta entradas.

### Identificação

Reutilizar a coluna e a tipografia da entrada, preservando as mensagens aprovadas e a sequência da spec: “Quem você é?”, confirmação de novo usuário antes da senha, e “Qual é a senha?”. O campo de senha é nativo e mascarado. A identificação não vira um histórico visual permanente de credenciais.

### Jogo

Nome do enigma, enunciado da etapa atual, dicas já reveladas e campo de resposta. Hierarquia contida: nome como contexto, enunciado como conteúdo principal e retorno da ação próximo ao campo. Não renderizar respostas corretas, etapas anteriores/futuras ou dicas ocultas em áreas escondidas. Avançar substitui a apresentação atual; estética de terminal não autoriza um histórico infinito.

As mensagens de falha, falta de dicas e conclusão usam texto explícito. Não acrescentar placar, mapa de etapas, reinício ou sugestões novas de comandos por decisão visual.

### Criadores

A área própria pode mostrar “Seus enigmas”, a ação “Criar um novo nexo”, estado rascunho/publicado e operações permitidas. Formulários devem parecer ferramentas de escrita organizadas, sem excesso de menus de sistema.

Agrupar nome, etapas, dicas e conclusão com títulos e rótulos. Mostrar bloqueios de resposta com o motivo junto ao campo, sem depender só de `disabled`. Publicação e exclusão usam as confirmações do planejamento. Não criar uma prévia de simulação de partida, pausa ou controles de estrutura que o estado publicado proíbe.

## Critérios de revisão da implementação futura

- Comparar cores e medidas com os tokens, incluindo os estados de foco, erro, aviso e botões.
- Conferir teclado em ordem de leitura, foco visível e operação sem depender de hover; testar campos e mensagens com tecnologia assistiva nas tarefas de interface.
- Inspecionar pelo menos 320px, 390px e desktop, além de zoom: sem rolagem horizontal da página, controles cortados ou textos necessários escondidos. Uma tabela realmente necessária pode ter rolagem local nomeada, sem afetar a página toda.
- Conferir conteúdo com texto longo, quebra de linha, nomes extensos, erro e carregamento. Não testar apenas mensagens curtas de demonstração.
- Confirmar que o teclado virtual não bloqueia a continuidade e que os alvos principais permanecem confortáveis em telas pequenas.
- Conferir preferências de movimento e cores forçadas quando houver implementação; não declarar acessibilidade completa apenas por estes cálculos.
- Verificar a entrada do jogador separadamente da autoria: nenhum elemento de gerenciamento ou comando secreto pode vazar para a primeira visita.

O que já foi feito nesta definição: leitura das cinco referências, análise das três imagens, cálculo de contraste da paleta e construção da folha visual. Inspeção de navegador e demais verificações efetivamente executadas devem ser registradas em [PROC-02](../registros/PROC-02.md). Testes com usuários e implementação das telas permanecem fora desta entrega.
