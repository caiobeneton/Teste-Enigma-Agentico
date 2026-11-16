# Proposal

Registro da descoberta em 15/11/2026. O escopo funcional do MVP e a stack descrita neste documento foram aprovados na conversa, mantendo as pendências de detalhamento explicitadas. Propostas ainda não aprovadas permanecem identificadas como tal. Este registro não autoriza implementação.

## Why

Criar uma plataforma comunitária de enigmas inspirada em Alternate Reality Games (ARGs), em que usuários publiquem desafios e jogadores avancem por sequências de soluções. Pistas podem indicar locais físicos, conectando experiências online e presenciais; no MVP, essa conexão ocorre por orientações do autor e pelo envio de respostas textuais pelos jogadores.

## What Changes

### Requisito transversal de entrega educacional — EDU-01

Por solicitação de 16/11/2026, o projeto também será um tutorial de programação web. Toda tarefa concluída, inclusive documentação, configuração, testes, correções e refatorações, exige registro e tutorial próprio, didático e reproduzível, explicando passo a passo como e por que cada etapa foi implementada. O tutorial deve refletir os arquivos efetivamente entregues e as verificações realmente realizadas.

A equipe passa a trabalhar com quatro papéis: arquiteto para analisar tarefas e desenhar a solução; programador web para implementá-la; professor para ler o resultado e explicar sua construção; gerente para acompanhar dependências e andamento, conferir registros e tutoriais e realizar um commit local por tarefa concluída. As regras e critérios estão em `docs/fluxo-de-trabalho.md`, na raiz do repositório, e os perfis em `.codex/agents/`.

Esse requisito se aplica a todas as tarefas existentes e futuras, sem alterar as funcionalidades do MVP nem autorizar sua implementação nesta solicitação. As quatro capacidades funcionais em `specs/` permanecem com seu escopo atual.

### Visão e requisitos confirmados

- Interface simples e direta, com aparência de terminal de linha de comando.
- No MVP, o conteúdo dos enigmas será exclusivamente textual: enunciados, dicas, respostas e mensagens de conclusão.
- A comunidade cria e joga enigmas. Cada jogador joga sozinho, com progresso individual e linear; não haverá equipes nem desbloqueio coletivo.
- O autor escolhe quantas etapas terá o enigma e cadastra as perguntas/enunciados e respostas corretas. Pode também registrar dicas. O desenho proposto da interface de autoria está em `design.md`.
- O autor pode salvar um enigma incompleto e continuar sua elaboração em outro acesso.

### Áreas de jogadores e criadores

- Haverá uma tela/área para jogadores e uma tela/área separada para criadores, ambas com cadastro e login.
- A conta será única: o mesmo usuário e senha servirão para jogar e acessar a área de criadores. O progresso do jogador e os enigmas de sua autoria estarão vinculados à mesma conta.
- Na identificação e no cadastro, os nomes de usuário são comparados ignorando maiúsculas, minúsculas e espaços no início e no fim. A grafia escolhida é preservada na exibição: `Caio`, `caio` e ` caio ` identificam a mesma conta.
- A criação e a manutenção dos enigmas pertencem à área de criadores; a experiência de jogo pertence à área de jogadores.
- A apresentação da plataforma deve preservar o mistério. A tela inicial dos jogadores não anuncia os comandos nem a possibilidade de criar enigmas. As opções de autoria aparecem na área de criadores.
- Após acessar sua área, o criador encontra seus enigmas e pode continuar rascunhos, editar publicados ou iniciar um novo enigma.
- Um endereço direto para a área de criadores poderá ser apresentado dentro dela como conveniência. O comando de entrada permite retornar à área sem depender de conhecer esse endereço.

### Entrada, identificação e cadastro

1. No primeiro acesso, a tela apresenta apenas a frase **“O que você busca?”** como mensagem inicial.
2. Informar **“acessar o nexo”** conduz à área de criadores, passando por cadastro/login quando necessário. Esse comando substitui **“criar um novo nexo”** como entrada da área. **“Criar um novo nexo”** passa a ser uma ação dentro da área de criadores, ao lado das opções de continuar rascunhos e editar publicados.
3. Informar o nome de um enigma conduz à interface de jogo daquele enigma, passando pela identificação quando necessário.
4. A identificação começa com **“Quem você é?”** para obter o nome de usuário. Para um usuário existente, pergunta-se **“Qual é a senha?”** e segue-se com o login.
5. Para um nome de usuário inexistente, antes de pedir a senha, exibe-se exatamente **“Não conhecemos você. Novo por aqui? (y/n)”**. Com `y` ou `Y`, pergunta-se **“Qual é a senha?”** e conclui-se o cadastro após obter a senha. Com `n` ou `N`, retorna-se à pergunta **“Quem você é?”**, sem solicitar a senha nessa tentativa.
6. Na interface de jogo, o usuário não recebe a opção de criar um enigma. A criação terá sua área separada, com acesso de criador.

Enquanto houver uma sessão ativa, ela é reutilizada: ao informar outro enigma ou digitar **“acessar o nexo”**, a pessoa segue para o destino sem repetir usuário e senha. A apresentação proposta do cadastro/login na área de criadores reutiliza o fluxo de identificação conforme `design.md`.

A recuperação de acesso fica fora do MVP. Perder a senha significa perder o acesso à conta nesta versão, incluindo seu progresso e a manutenção dos enigmas de sua autoria. Isso não equivale a excluir a conta ou seus enigmas.

### Identificação dos enigmas

- Os nomes são únicos em toda a plataforma, com validação de disponibilidade durante o registro.
- Após a publicação, o nome do enigma fica fixo e não pode ser alterado.
- O nome é reservado ao salvar o primeiro rascunho com um nome válido e disponível, antes da publicação. Outros criadores não podem usar esse nome enquanto ele estiver reservado ao enigma.
- Ao excluir um enigma, seu nome fica disponível novamente para qualquer criador, seguindo as regras de nomes válidos e reservados.
- Qualquer pessoa que conheça o nome de um enigma publicado pode encontrá-lo e, após cadastro/login, jogar. O acesso não depende de autorização do autor.
- A comparação dos nomes desconsidera maiúsculas, minúsculas e espaços no início e no fim, tanto na disponibilidade quanto na localização do enigma. A grafia escolhida pelo autor é preservada na exibição.
- **“criar um novo nexo”** e **“acessar o nexo”** são nomes reservados e não podem ser usados como nomes de enigmas. A reserva segue a comparação de nomes já definida, desconsiderando maiúsculas, minúsculas e espaços no início e no fim.

### Jogo e validação

- A interface de jogo mostra o nome do enigma, o enunciado da etapa atual, um campo de resposta e um botão ou comando para enviar.
- Durante a partida, o jogador vê apenas a etapa atual. O MVP não oferece consulta ou navegação para etapas já resolvidas; o progresso continua sendo salvo para retomar a etapa atual.
- Durante o jogo, o comando **`/inicio`** retorna à pergunta **“O que você busca?”**, preservando a sessão e o progresso. A partir da entrada, o jogador pode informar outro enigma ou acessar a área de criadores.
- Inicialmente, as respostas são apenas texto. Cada etapa tem uma única resposta correta cadastrada, sem respostas alternativas.
- Os textos equivalentes a `/dica` e `/inicio` são reservados como comandos e não podem ser cadastrados como respostas corretas. Essa reserva foi confirmada durante o planejamento técnico e segue a comparação das respostas.
- A comparação das respostas ignora maiúsculas, minúsculas e espaços no início e no fim. Acentos, pontuação e espaços internos continuam significativos: ` lua ` equivale a `lua`, mas `satelite` é diferente de `satélite`. Cada etapa continua tendo apenas uma resposta cadastrada, sem alternativas.
- Uma resposta correta libera a próxima etapa apenas para aquele jogador. Uma resposta incorreta mantém o jogador na etapa atual.
- As tentativas de resposta são ilimitadas no MVP. Respostas incorretas não causam perda de progresso nem reinício de etapas já resolvidas.

### Pistas em locais físicos

- O autor pode indicar lugares no conteúdo do enigma, por exemplo, por endereço ou nome do local.
- Cada jogador retorna à plataforma e envia sua própria resposta textual, que é comparada à resposta correta cadastrada para a etapa, seguindo as regras de validação já acordadas.
- No MVP, a plataforma valida a resposta enviada; não verifica localização nem exige comprovação de presença física no lugar indicado.

### Dicas e retomada do progresso

- As dicas são opcionais e permanecem ocultas até serem solicitadas pelo comando **`/dica`**. O texto `dica`, sem a barra, é tratado como uma resposta textual normal.
- O autor pode cadastrar várias dicas por etapa, definindo sua ordem no cadastro. Não haverá ação de reordenar dicas no MVP.
- O autor pode adicionar e remover dicas. Dicas novas começam ocultas para os jogadores; dicas removidas deixam de aparecer, inclusive para quem já as revelou.
- As dicas já reveladas da etapa atual permanecem visíveis enquanto continuarem na lista do autor, inclusive quando o jogador retorna em outro acesso. O comando `/dica` revela a primeira dica ainda oculta na ordem cadastrada.
- Quando o autor edita o texto de uma dica, os jogadores que já a revelaram passam a ver o texto atualizado. Não são preservadas versões anteriores da dica para o jogador.
- Quando todas as dicas tiverem sido reveladas, a interface informa que não há mais dicas naquela etapa.
- O progresso é salvo por jogador e por enigma, incluindo a etapa atual, as etapas resolvidas e as dicas já reveladas.
- Ao retornar ao mesmo enigma com a mesma conta, o jogador retoma automaticamente de onde parou, inclusive em outro dispositivo.

### Conclusão

- Acertar a última etapa marca o enigma como concluído para aquele jogador e exibe uma mensagem final.
- Ao acessar novamente um enigma concluído, o jogador vê o estado “concluído” e a mensagem final. O enigma permanece concluído para ele e não há opção de reiniciar a partida no MVP.
- Durante a criação, o autor pode definir uma mensagem de conclusão personalizada ou manter a mensagem padrão da plataforma. A personalização é opcional.
- O autor pode editar a mensagem final personalizada após a publicação. O texto atualizado é exibido também para quem retornar a um enigma já concluído.
- O texto padrão sugerido para revisão editorial está em `design.md`; não foi aprovado individualmente durante a descoberta.

### Publicação e edição

- Durante a elaboração, o enigma pode ser salvo como rascunho incompleto e retomado depois. O salvamento do rascunho é manual, por uma ação explícita em botão ou comando, e a interface confirma quando o conteúdo foi salvo. A quantidade e a ordem das etapas podem ser montadas antes da publicação.
- Publicar é uma ação explícita. Para publicar, é necessário um nome válido e único, pelo menos uma etapa e enunciado e resposta preenchidos em todas as etapas.
- Dicas e mensagem final personalizada são opcionais e não são requisitos para publicar; a mensagem padrão é usada quando o autor não personaliza a conclusão.
- Antes de concluir a publicação, a interface informa que o nome do enigma, a quantidade e a ordem das etapas ficarão fixos e pede confirmação ao autor.
- Após a publicação, o nome do enigma não pode ser alterado e a quantidade e a ordem das etapas ficam fixas: não se adicionam, removem ou reordenam etapas.
- No MVP, o autor não terá opção de pausar um enigma publicado. A pausa reversível foi proposta e rejeitada.
- O autor pode excluir definitivamente seus enigmas, tanto rascunhos quanto publicados.
- A exclusão apaga todo o conteúdo do enigma e todos os dados de progresso vinculados a ele, incluindo etapas resolvidas, dicas reveladas e registros de conclusão. Não fica um histórico do enigma removido para os jogadores. O nome fica disponível novamente para qualquer criador; um novo enigma com esse nome não herda o progresso do anterior.
- A resposta de uma etapa pode ser alterada enquanto nenhum jogador tiver resolvido aquela etapa.
- Uma alteração permitida da resposta passa a valer imediatamente. Cada envio é comparado à resposta vigente no momento da validação, inclusive quando o jogador já estava naquela etapa antes da alteração.
- A primeira solução correta, por qualquer jogador, bloqueia a edição da resposta daquela etapa. O bloqueio é global para a etapa, e não apenas para a partida de quem a resolveu.
- Enunciados e dicas continuam sempre editáveis, inclusive depois de a etapa ter sido resolvida.
- O bloqueio de uma resposta não bloqueia a edição das respostas de outras etapas que ainda não tenham sido resolvidas por ninguém.

### Escopo funcional aprovado para o primeiro MVP

O conjunto de funcionalidades descrito nesta seção foi aprovado como escopo funcional do MVP. A aprovação mantém abertas as decisões de detalhamento listadas adiante.

A primeira validação será realizada com um pequeno grupo, como piloto inicial. Essa decisão define o público da validação; a regra de acesso aos enigmas publicados por nome e cadastro/login continua valendo.

Durante o piloto, os participantes relatarão problemas diretamente ao responsável pela plataforma. O acompanhamento será direto; sistema de denúncias e painel de moderação ficam fora do MVP.

Os critérios de avaliação do piloto serão qualitativos:

- **Autonomia:** participantes conseguem criar, publicar, jogar e retomar partidas sem ajuda para operar a interface.
- **Interesse:** a experiência desperta vontade de continuar jogando ou criar outros enigmas.

Validar o percurso completo: com uma conta única, o criador acessa sua área pelo comando “acessar o nexo”, cria um enigma com possibilidade de salvar e retomar rascunhos e confirma sua publicação quando os critérios forem atendidos. Um jogador encontra o enigma pelo nome, se identifica, avança sozinho pelas etapas textuais, solicita dicas por comando e retoma seu progresso em acessos futuros. Ao acertar a última etapa, conclui o enigma e recebe a mensagem final personalizada ou padrão. Aplicar as regras acordadas de nomes, validação de respostas e edição após publicação.

A aparência de terminal, o conteúdo exclusivamente textual e as regras descritas fazem parte do escopo funcional aprovado. O planejamento técnico propõe os detalhes de autoria, navegação e operação em `design.md`, sujeitos à revisão dos artefatos. Pistas físicas são contempladas como indicações de lugares pelo autor, com avanço validado exclusivamente pela resposta textual do jogador. Ranking, comentários, catálogo público e monetização não integram o escopo aprovado e não foram priorizados como trabalho futuro.

Ficam fora do MVP, conforme as decisões da descoberta:

- Prévia privada de teste com simulação de partidas para o autor.
- Pausa de enigmas publicados.
- Recuperação de acesso.
- Reordenação de dicas.
- Consulta a etapas anteriores e reinício de partidas.
- Sistema de denúncias e painel de moderação.
- Conteúdo não textual nos enigmas.

### Detalhamento proposto e pendências para revisão

O escopo funcional e a stack permanecem aprovados. A confirmação adicional de reservar `/dica` e `/inicio` como respostas também está registrada. Os artefatos técnicos propõem a execução desse escopo; limites, redações e escolhas técnicas não são apresentados como aprovações individuais feitas na descoberta.

| Assunto antes pendente | Encaminhamento no planejamento |
| --- | --- |
| Identificação, sessões e falhas | `specs/user-identity/spec.md` e design, decisões 2, 3 e 6. |
| Entrada, comparação de comandos e retorno | `specs/terminal-entry/spec.md` e design, decisões 2–4. |
| Autoria, publicação, confirmação de exclusão e limites | `specs/puzzle-authoring/spec.md` e design, decisões 2, 3, 7 e 8. |
| Mensagens de erro e conclusão padrão | Redações propostas na decisão 3 e contrato de erros na decisão 7 do design; podem ser ajustadas editorialmente. |
| Banco, API, autenticação e concorrência | Decisões 4–8 do design, com tarefas e verificações em `tasks.md`. |
| Enigmas problemáticos e pistas físicas | Relatos diretos; o autor pode corrigir os campos permitidos ou excluir/recriar. Sem pausa, override de respostas ou ferramenta de moderação. Orientações e logística do piloto serão preparadas na entrega. |

Permanecem para a preparação do piloto: provedor, domínio e configuração concreta de HTTPS/volume, forma de comunicar o comando aos primeiros criadores e revisão dos textos/limites propostos. Essas escolhas não alteram a divisão de tarefas nem acrescentam funcionalidades ao MVP.

### Casos extremos e riscos a considerar

| Situação | Consequência a considerar |
| --- | --- |
| Duas pessoas tentam registrar o mesmo nome de enigma | Apenas uma poderá obter aquele nome; a API proposta retorna conflito à outra, preservando sua edição local. |
| A primeira solução ocorre ao mesmo tempo que uma edição de resposta | A validação deve respeitar a resposta vigente e o bloqueio global deve impedir alterações posteriores ao primeiro acerto; a implementação precisa preservar essas regras em operações concorrentes. |
| A resposta muda enquanto o jogador está lendo a etapa | Pela regra aprovada, vale a resposta vigente na validação; uma tentativa baseada no conteúdo anterior pode ser rejeitada. |
| O enunciado muda após a resposta ficar bloqueada | A pergunta pode deixar de corresponder à resposta, tornando a etapa insolúvel. |
| O autor cadastra uma resposta errada | A etapa pode ficar insolúvel; o plano prevê relato direto e correção dos campos permitidos ou exclusão/recriação, respeitando o bloqueio da resposta. |
| Uma solução é compartilhada ou descoberta por tentativas automáticas | O avanço pode ocorrer sem a resolução pretendida. O plano não acrescenta anti-cheat ou limite de tentativas de jogo ao piloto. |
| Nome de usuário digitado incorretamente | A confirmação de cadastro reduz, mas não elimina, a criação acidental de outra identidade. |
| Pista física removida, local fechado ou acesso inadequado | O jogador pode ficar impedido de continuar ou ser exposto a risco. |

## Capabilities

### New Capabilities

As capacidades abaixo estão detalhadas nos arquivos correspondentes em `specs/` desta mudança:

- `terminal-entry`: entrada por intenção, acesso discreto à área de criadores por “acessar o nexo”, localização de enigma por nome e retorno à entrada pelo comando `/inicio`.
- `user-identity`: conta única para cadastro e login nas áreas de jogador e criador.
- `puzzle-authoring`: área de criação, rascunhos com salvamento manual e retomada posterior, nomes únicos, critérios e confirmação de publicação, regras de edição de enigmas e etapas e exclusão de rascunhos e publicados.
- `individual-progression`: apresentação da etapa atual, validação textual, desbloqueio individual linear, dicas sequenciais por comando, retomada do progresso e conclusão com mensagem personalizada ou padrão.

### Modified Capabilities

Nenhuma. Não havia especificações existentes no projeto durante o registro.

## Impact

Este artefato preserva a descoberta de produto e a escolha da stack. O planejamento técnico está detalhado nas quatro specs, em `design.md` e em `tasks.md`, incluindo modelo de dados, API, sessões, concorrência e verificações. Os artefatos estão disponíveis para revisão; nenhum código de produto foi escrito.

### Stack aprovada

- **Linguagem da aplicação:** JavaScript, incluindo JSX nos componentes React.
- **Front-end:** React com Vite.
- **Back-end:** Node.js com Express.
- **Banco de dados:** SQLite.

A hospedagem concreta ainda será definida e deverá preservar os dados do SQLite entre reinícios e implantações. O design propõe uma instância Express, `better-sqlite3` e sessões persistidas no mesmo banco; essas são escolhas do planejamento técnico para revisão.

O escopo funcional do MVP está aprovado. Os artefatos produzidos por `openspec-propose` completam o planejamento desta mudança. Após sua revisão, a implementação pode prosseguir pelo fluxo `openspec-apply-change` mediante nova solicitação; concluir o planejamento não inicia a implementação.
