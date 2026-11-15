# Proposal

Registro da descoberta em 15/11/2026. As regras identificadas como confirmadas foram acordadas na conversa; propostas e pendências continuam abertas. Este registro não autoriza implementação nem define stack.

## Why

Criar uma plataforma comunitária de enigmas inspirada em Alternate Reality Games (ARGs), em que usuários publiquem desafios e jogadores avancem por sequências de soluções. A visão inclui pistas em locais físicos, conectando experiências online e presenciais; sua participação no primeiro MVP ainda não foi definida.

## What Changes

### Visão e requisitos confirmados

- Interface simples e direta, com aparência de terminal de linha de comando.
- A comunidade cria e joga enigmas. Cada jogador joga sozinho, com progresso individual e linear; não haverá equipes nem desbloqueio coletivo.
- O autor escolhe quantas etapas terá o enigma e cadastra as perguntas/enunciados e respostas corretas. Pode também registrar dicas. Os detalhes da interface de autoria serão elaborados futuramente.

### Entrada, identificação e cadastro

1. No primeiro acesso, a tela apresenta apenas a frase **“O que você busca?”** como mensagem inicial.
2. Informar **“criar um novo nexo”** conduz à identificação e, em seguida, à interface de registro de enigmas.
3. Informar o nome de um enigma conduz à identificação e, em seguida, à interface de jogo daquele enigma.
4. A identificação pergunta **“Quem você é?”** para obter o nome de usuário e **“Qual é a senha?”** para obter a senha, nessa ordem. O mesmo fluxo também permite cadastro.
5. Para um nome de usuário inexistente, exibe-se exatamente **“Não conhecemos você. Novo por aqui? (y/n)”**. `y` ou `Y` confirma o cadastro; `n` ou `N` retorna à pergunta **“Quem você é?”**. O ponto exato dessa confirmação em relação à coleta da senha ainda precisa ser detalhado.
6. Na interface de jogo, o usuário não recebe a opção de criar um enigma. Isso define a navegação desse fluxo, sem estabelecer um papel permanente de jogador separado do papel de autor.

### Identificação dos enigmas

- Os nomes são únicos em toda a plataforma, com validação de disponibilidade durante o registro.
- A comparação dos nomes desconsidera maiúsculas, minúsculas e espaços no início e no fim, tanto na disponibilidade quanto na localização do enigma. A grafia escolhida pelo autor é preservada na exibição.
- **“criar um novo nexo”** é reservado como comando e não pode ser nome de enigma, considerando a regra de comparação dos nomes.

### Jogo e validação

- A interface de jogo mostra o nome do enigma, a dica da etapa atual, um campo de resposta e um botão ou comando para enviar.
- Inicialmente, as respostas são apenas texto. Cada etapa tem uma única resposta correta cadastrada, sem respostas alternativas.
- A comparação das respostas ignora maiúsculas e minúsculas. Espaços, acentos e pontuação ainda não têm tratamento confirmado; a normalização aprovada para nomes não é automaticamente aplicável às respostas.
- Uma resposta correta libera a próxima etapa apenas para aquele jogador. Uma resposta incorreta mantém o jogador na etapa atual.

### Publicação e edição

- Após a publicação, a quantidade e a ordem das etapas ficam fixas: não se adicionam, removem ou reordenam etapas.
- A resposta de uma etapa pode ser alterada enquanto nenhum jogador tiver resolvido aquela etapa.
- A primeira solução correta, por qualquer jogador, bloqueia a edição da resposta daquela etapa. O bloqueio é global para a etapa, e não apenas para a partida de quem a resolveu.
- Enunciados e dicas continuam sempre editáveis, inclusive depois de a etapa ter sido resolvida.
- O bloqueio de uma resposta não bloqueia a edição das respostas de outras etapas que ainda não tenham sido resolvidas por ninguém.

### Recorte proposto para o primeiro MVP — ainda não aprovado como escopo fechado

Validar o percurso completo: um usuário se identifica ou se cadastra, cria e publica um enigma; outro usuário o encontra pelo nome, se identifica e avança sozinho pelas etapas textuais. Aplicar as regras acordadas de nomes, validação de respostas e edição após publicação.

A aparência de terminal e as interações descritas fazem parte dos requisitos confirmados. Os detalhes da autoria, da publicação e da conclusão ainda exigem descoberta. Pistas físicas permanecem na visão, com inclusão no MVP pendente. Ranking, comentários, catálogo público, monetização e outros recursos não foram acordados nem priorizados.

### Decisões pendentes

- **Identidade e sessão:** comparação dos nomes de usuário; confirmação de cadastro antes ou depois da senha; senha incorreta; entradas diferentes de `y/Y/n/N`; recuperação de acesso; continuidade de uma sessão existente.
- **Entrada e descoberta:** comportamento para enigma inexistente ou indisponível; comparação do comando quanto a maiúsculas e espaços; navegação de retorno e troca entre criação e jogo.
- **Autoria e publicação:** campos e limites, mínimo/máximo de etapas, quantidade e apresentação das dicas, teste pelo autor, eventual rascunho, requisitos para publicar e possibilidade de retirar um enigma do ar.
- **Respostas:** tratamento de espaços, acentos e pontuação; mensagens de erro; limites de tentativas; efeito de uma resposta alterada enquanto alguém já está naquela etapa.
- **Progresso e conclusão:** retomada em acessos futuros, reinício, consulta a etapas anteriores e experiência após acertar a última resposta.
- **Pistas físicas:** necessidade ou não de visita, forma de comprovar descoberta, disponibilidade, acessibilidade e orientações para participação segura.
- **Operação da comunidade:** público pretendido, visibilidade, denúncias, moderação e tratamento de enigmas incorretos ou abandonados.
- **Validação do MVP:** público inicial, critério de sucesso e recorte final de funcionalidades.

### Casos extremos e riscos identificados — sem solução aprovada

| Situação | Consequência a considerar |
| --- | --- |
| Duas pessoas tentam registrar o mesmo nome de enigma | Apenas uma poderá obter aquele nome; falta definir o retorno à outra. |
| A primeira solução ocorre ao mesmo tempo que uma edição de resposta | É necessário definir a regra que decide qual resposta vale e quando o bloqueio passa a valer. |
| A resposta muda enquanto o jogador está lendo a etapa | Uma tentativa baseada no conteúdo anterior pode ser rejeitada. |
| O enunciado muda após a resposta ficar bloqueada | A pergunta pode deixar de corresponder à resposta, tornando a etapa insolúvel. |
| O autor cadastra uma resposta errada ou perde o acesso | A sequência pode ficar sem manutenção; falta definir correção e retirada. |
| Uma solução é compartilhada ou descoberta por tentativas automáticas | O avanço pode ocorrer sem a resolução pretendida; falta decidir o nível de controle desejado. |
| Nome de usuário digitado incorretamente | A confirmação de cadastro reduz, mas não elimina, a criação acidental de outra identidade. |
| Pista física removida, local fechado ou acesso inadequado | O jogador pode ficar impedido de continuar ou ser exposto a risco. |

## Capabilities

### New Capabilities

Organização proposta para futuras especificações; os arquivos de specs ainda não foram criados:

- `terminal-entry`: entrada por intenção, comando reservado e localização de enigma por nome.
- `user-identity`: identificação e confirmação de cadastro no fluxo de terminal.
- `puzzle-authoring`: registro, nomes únicos, publicação e regras de edição de enigmas e etapas.
- `individual-progression`: apresentação da etapa atual, validação textual e desbloqueio individual linear.

### Modified Capabilities

Nenhuma. Não havia especificações existentes no projeto durante o registro.

## Impact

Este artefato preserva a descoberta de produto para orientar as próximas conversas. O planejamento permanece parcial: specs, design e tarefas não foram produzidos. Não foram escolhidos stack, APIs, banco de dados ou integrações, nem escrito código de produto.

As regras confirmadas orientarão a futura definição do comportamento. As pendências e o recorte proposto de MVP precisam de discussão antes de serem tratados como requisitos aprovados. `openspec-propose` pode completar os artefatos de planejamento quando houver escopo suficiente; a implementação ocorre posteriormente, a partir da mudança planejada.
