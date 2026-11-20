# PROC-02 — Definir a direção UI/UX a partir das referências

## Identificação e andamento

- Origem: solicitação de 16/11/2026 para criar um agente especialista em Design UI/UX, analisar [as referências locais](../referencias/interface/) e determinar o estilo do projeto.
- Status: concluída.
- Dependências: [PROC-01](PROC-01.md), planejamento/specs do MVP e arquivos fornecidos pelo usuário.
- Ponto inicial: `fc8b336900a6ccff9f2cce8666407f7eab96313d`; aplicação e documentos rastreados sem alterações. Os cinco arquivos em `docs/referencias/interface/` estavam presentes e ainda não rastreados.
- Papéis: agente principal como gerente coordenador; arquiteto, designer UI/UX, programador web, professor e gerente nas respectivas análises, entrega e revisão.
- Tutorial: [PROC-02](../tutoriais/PROC-02.md).
- Commit de entrega: localizar pelo trailer `Task: PROC-02`.

## Objetivo e aceite

Criar o perfil persistente `designer_ui_ux`, analisar visualmente as três imagens e ler o CSS/README fornecidos, definir um guia visual com decisões concretas e integrar o especialista ao fluxo. Entregar uma folha visual estática para examinar o estilo, registro, tutorial e commit local.

As referências originais serão preservadas e incluídas no versionamento desta entrega para permitir reproduzir a análise. O guia e a prévia são documentação de design; esta solicitação não implementa as telas nem conclui tarefas de produto. O MVP continua com 1/41 tarefas concluídas.

## Arquitetura

Análise anterior à entrega visual pelo agente `arquiteto`, em 16/11/2026. Foram consultados o pedido registrado, os perfis de arquiteto e designer, `README.md`, o fluxo de trabalho, o design técnico, as quatro specs e os textos `README.md` e `hacker.css` das referências. A inspeção das três imagens cabe ao designer; esta análise arquitetural não a substitui nem afirma tê-la realizado.

**Problema e encaixe.** A tarefa define a linguagem visual e acrescenta uma especialidade à equipe, sem implementar as telas. A solução usa `docs/design/estilo-interface.md` como guia canônico de cores, tipografia, espaçamento, componentes e estados, com motivos e rastreabilidade até cada uma das cinco referências. O design técnico recebe um link para esse guia, sem duplicar tabelas de tokens ou alterar contratos. Em caso de divergência, as specs vigentes continuam determinando o comportamento; uma decisão visual não autoriza nova funcionalidade.

**Entregas e responsabilidades.** O designer abre as imagens, lê o CSS/README, registra o que aproveitar, adaptar ou rejeitar e fornece valores concretos e critérios verificáveis para o programador. Produz também `docs/design/previa-interface.html`, folha visual documental estática com CSS comum e dados fictícios, utilizável localmente sem instalação ou fontes externas obrigatórias. Essa folha demonstra aparência e estados isolados, identifica-se como documentação e não executa autenticação, chamadas de API, salvamento, respostas ou progresso; não é a prévia privada de teste de enigmas excluída do MVP. O programador integra o quinto perfil aos documentos de processo e liga as fontes de verdade, sem copiar o CSS das referências para `web/`, instalar biblioteca ou modificar a aplicação. O professor explica análise, decisões, estrutura e reprodução no tutorial próprio; o gerente confere aceite, registros e commit. O designer participa das tarefas que afetem interface ou experiência, antes da implementação e na revisão visual, sem ser uma dependência artificial de tarefas exclusivamente de banco ou infraestrutura.

**Invariantes de interação.** O guia separa a aparência discreta da entrada e do jogo da área explícita de autoria. A tela inicial do jogador preserva “O que você busca?” como única mensagem inicial, sem anunciar comandos ou criação. Identificação mantém as perguntas, confirmação anterior à senha e mascaramento previstos; a conta não ganha novo papel. Jogo mostra somente a etapa atual e suas dicas liberadas, sem histórico de etapas ou controles de autoria; a área de criadores oferece somente ações já especificadas, com confirmação e limites de edição previstos. Estados de carregamento, erro, esgotamento e conclusão têm feedback textual, sem depender somente de cor ou animação. A estética não deve introduzir espera de digitação, reduzir legibilidade ou simular terminal de sistema operacional. Detalhes de teclado/foco, contraste, tamanhos de toque, quebra de textos longos e apresentação em celular devem ser especificados e distinguem metas de projeto de resultados efetivamente medidos.

**Alternativas e riscos.** Reutilizar `hacker.css` integralmente traria decisões globais inadequadas ao percurso: o texto consultado inclui remoção de outline, bloqueio de redimensionamento e brilho intenso. O arquivo serve como referência preservada, não dependência de execução. Escolher apenas uma imagem sem justificar adaptações deixaria o programador sem critérios objetivos; por isso o guia precisa relacionar todas as fontes às decisões. Editar o frontend já nesta tarefa misturaria definição de estilo com tarefas de interface ainda pendentes; a folha estática permite revisão sem essa ampliação. Tokens do HTML documental devem corresponder ao guia e futuras mudanças devem atualizar ambos ou explicitar a versão histórica. Os originais permanecem inalterados; conferir seus hashes antes e depois da entrega evita sobrescrita acidental. Referências não passam a ser certificados de acessibilidade nem prova de testes com usuários.

**Aceite observável.** Conferir: (1) perfil TOML válido e integrado a `AGENTS.md`, fluxo e referências pertinentes dos demais perfis; (2) análise das três imagens e dos dois textos efetivamente registrada; (3) guia único com valores, usos, alternativas, componentes, estados e limites compatíveis com as quatro specs; (4) folha visual aberta e inspecionada em viewport desktop e estreita, verificando legibilidade, foco/teclado dos exemplos operáveis e ausência de dependências externas necessárias, com o grau de inspeção registrado; (5) links corretos entre guia, folha, design técnico, registro, tutorial e índice; (6) originais preservados, aplicação e lockfile intactos e nenhuma marcação de tarefa de produto alterada; (7) tutorial e revisão do gerente antes do commit local de `PROC-02`. Cálculos de contraste ou referências normativas, se utilizados pelo designer, devem trazer método e fonte oficial; não declarar conformidade do produto ainda não implementado.

## Implementação ou alteração documental

1. Perfil `designer_ui_ux` criado com responsabilidades, leitura obrigatória das imagens, critérios de legibilidade e passagem de trabalho para arquiteto, programador, professor e gerente.
2. O designer abriu as três imagens e leu os dois arquivos textuais. Definiu **terminal de fósforo verde** em [estilo-interface.md](../design/estilo-interface.md): fundo quase preto, texto verde suave, acentos vivos, fonte monoespaçada e brilho pontual. O guia documenta o que aproveitar/adaptar/rejeitar em cada referência, 19 tokens, componentes/estados, regras por experiência e critérios de verificação.
3. O designer criou [previa-interface.html](../design/previa-interface.html), uma folha documental independente com paleta, entrada isolada, controles e organização da autoria. Sem JavaScript, API, fontes remotas ou importação do CSS original. Não implementa telas do produto.
4. O programador integrou o quinto papel em `AGENTS.md`, README, fluxo, modelo de registro, quatro perfis anteriores, configuração OpenSpec e proposta/design/tarefas. A etapa de design é condicional a interface/experiência, com revisão visual antes do tutorial. O design técnico referencia o guia sem duplicar tokens; as specs continuam determinando os comportamentos.

## Verificações e evidências

- Estado inicial: `git status --short` indicou somente `?? docs/referencias/`.
- Gerente abriu as três imagens locais e leu `README.md` e `hacker.css`. As referências usam fundo preto e verde intenso; o CSS original contém `outline: none`, brilho em vários componentes, `resize: none` e fonte de 14px em controles pequenos, pontos que exigem avaliação antes de uso.
- OpenSpec 2.0.0 confirmou raiz local e 1/41 tarefas concluídas; os artefatos existentes foram identificados pelo comando de status.

Inventário SHA256 dos arquivos fornecidos, antes das alterações documentais. A conferência final deve verificar que o conteúdo de trabalho permaneceu intacto. Para arquivos textuais, o Git pode normalizar finais de linha ao versionar; os hashes abaixo identificam os arquivos locais recebidos.

| Arquivo em `docs/referencias/interface/` | SHA256 inicial |
| --- | --- |
| `terminal-dark.png` | `7c08aed8b970c37b494ba35b4ea2eb827ac36487054d103bd36d96f53ee06f6c` |
| `retro-terminal-hacker.jpeg` | `ed2573056c54fa2438752a1ebf7a7816e8089fe09f590d79e4f698617eb6d514` |
| `fea77755-55d3-4efc-887d-9ce403f669f0-cover.png` | `8b6c76ce80f7311302b77aadb1b2371e206f6ffb88407cc41813e73237cee66a` |
| `hacker.css` | `8f76c62149ea9018e86815a88704e5be8d1a6916b0f90427b3c182592f9c45df` |
| `README.md` | `b77c9e639575f217caca0ac269e8a41fa5a2dca790a80da0fc0330249e30aeef` |

Verificações já realizadas:

- Programador: cinco perfis analisados por `tomllib`, com campos e nomes únicos; OpenSpec `validate define-puzzle-platform-mvp --strict --no-interactive` passou; as 41 linhas de tarefas são idênticas ao commit-base, incluindo somente 1.1 marcada; sem diferenças em `web/`, `api/` ou lockfile. `git diff --check` passou, com avisos de normalização LF/CRLF.
- Designer: 19 tokens idênticos entre guia e folha; IDs únicos e rótulos associados; ausência de scripts, URLs remotas e dependências da referência. Contrastes calculados por luminância relativa sRGB: menor texto/superfície 8,42:1; borda funcional/superfície 4,71:1. A linha decorativa 1,70:1 não identifica controles. São medidas da paleta, não declaração de conformidade da aplicação.
- Gerente coordenador: `python -m http.server 8766 --bind 127.0.0.1 --directory docs`, seguido de abertura de `/design/previa-interface.html` em contexto isolado do Chrome DevTools. Capturas e inspeção real em 1440×1000 e 390×844; conferência adicional em 320×800. Nenhuma rolagem horizontal nas três larguras. Controles com fonte computada de 16px e menor altura observada de aproximadamente 47,54px. As seções de componentes passam para uma coluna no celular; enunciado e nome longo quebram linha.
- Teclado no desktop: duas pressões de Tab alcançaram `entry-intent`, com `:focus-visible` verdadeiro, contorno sólido na cor de foco e área de texto com `resize: vertical`. Emulação de movimento reduzido não encontrou animações. Cores forçadas foram emuladas na conferência de 320px, sem extrapolar essa inspeção para uma auditoria de acessibilidade. Console sem erros ou avisos. A aba e o servidor documental foram encerrados após a inspeção.

## Entrega didática

Guia visual, folha documental e integração concluídos para leitura pelo professor. A direção visual foi escolhida pelo designer a pedido do usuário; a inspeção de navegador acima foi executada pelo gerente coordenador. Não houve teste com usuários nem implementação das telas.

O professor leu seu perfil atualizado, as instruções, README, fluxo/modelos, guia, HTML, perfil do designer e integrações dos 12 arquivos existentes. Também abriu as três imagens com a ferramenta de visualização e leu `hacker.css`/README, para explicar escolhas a partir dos materiais reais. Escreveu [PROC-02](../tutoriais/PROC-02.md) com perfil TOML integral, decisões sobre cada fonte, separação entre referências/guia/folha/aplicação, trechos essenciais de HTML/CSS, critérios de teclado e responsividade, cálculos reproduzíveis e passagem entre os cinco papéis.

Reprodução documental pelo professor em 16/11/2026: criou por `git clone --no-hardlinks` a cópia `C:\Users\caiob\AppData\Local\Temp\nexo-professor-proc02-zc2_ovqb\projeto`, destacou `fc8b336900a6ccff9f2cce8666407f7eab96313d` e confirmou ausência de `docs/referencias/interface/` nesse base. Sobrepôs os documentos e perfis atuais como snapshot pré-commit. Extraiu o TOML integral do próprio tutorial, comparou-o ao arquivo real e validou os cinco perfis com `tomllib`.

Os três blocos Python de análise do capítulo foram extraídos do Markdown e executados literalmente nesse snapshot: contraste por luminância sRGB, correspondência dos tokens e preservação das linhas de tarefas. Resultados: 19 tokens idênticos entre guia/folha; `muted`/`surface` 8,42:1, `control-border`/`surface` 4,71:1 e linha decorativa 1,70:1, com todas as combinações reproduzindo a tabela; 41 tarefas preservadas e somente 1.1 marcada. `git diff --exit-code <base> -- web api package-lock.json openspec/changes/define-puzzle-platform-mvp/specs` passou no snapshot. Os cinco arquivos de referência ficaram byte a byte idênticos aos originais locais sobrepostos.

Na árvore atual, o professor verificou existência dos links Markdown locais em 17 documentos de entrada, docs e planejamento, sem falhas, e reconferiu identidade do perfil integral do tutorial com o TOML real. `git diff --check` passou; apenas avisos LF/CRLF do ambiente Git.

O índice agora aponta para PROC-02 e para o fluxo atual; PROC-01 e 1.1 conservam seus pontos iniciais históricos. O roteiro ensina a recuperar referências do commit PROC-02, com `git log --all` mesmo após destacar o base, e a completar os documentos didáticos de consulta. Essa recuperação futura por trailer não foi declarada executada antes de existir o commit. O professor não iniciou servidor nem repetiu Chrome: a inspeção de navegador acima permanece atribuída ao gerente. Cálculos e revisão documental não são auditoria WCAG nem teste com usuários.

## Revisão do gerente

Aceite final documental concedido pelo gerente após ler o tutorial completo, a entrega didática e as evidências. O perfil integral do designer, a análise das cinco fontes, os motivos dos tokens e dos componentes e a sequência de integração correspondem aos arquivos entregues. O roteiro recupera explicitamente referências, guia/folha, integrações e documentos didáticos a partir do commit de entrega, preservando o ponto inicial histórico.

O gerente coordenador inspecionou a folha no Chrome em desktop, 390px e 320px e registrou foco, legibilidade e ausência de overflow; o professor reproduziu os blocos documentais em snapshot temporário, sem declarar a recuperação pós-commit executada antecipadamente. As revisões distinguem paleta calculada, inspeção manual, metas de acessibilidade e aplicação funcional. Não houve teste com usuários nem alteração das telas.

Na conferência de staging, `git diff --cached --check` identificou somente whitespace herdado na linha 10 de `docs/referencias/interface/README.md`, um dos originais recebidos. A fonte foi preservada sem edição, conforme o requisito de manter as referências intactas; os cinco blobs em staging são byte a byte idênticos aos arquivos locais e aos hashes iniciais. A mesma checagem, excluindo apenas esse README original, passou. Essa exceção explícita não foi apresentada como uma aprovação integral sem avisos.

A auditoria preliminar independente do gerente confirmou os cinco hashes locais iniciais, as 41 linhas de tarefas e a ausência de diferenças em aplicação, manifests, lockfile e specs. O gate final reúne somente os 23 caminhos autorizados da PROC-02, incluindo as referências originais para reprodução. Este status é preparado imediatamente antes do commit e só é confirmado após conferir o commit local com trailer `Task: PROC-02`; em falha, deve voltar a `aguardando commit`, preservando as entregas.

## Pendências e retomada

Nenhuma pendência de aceite documental. A direção visual ainda será aplicada à aplicação nas tarefas de interface autorizadas, com desenho e revisão do designer. Nenhum checkbox de produto foi alterado: o MVP permanece com somente 1.1 concluída e 40 tarefas pendentes.
