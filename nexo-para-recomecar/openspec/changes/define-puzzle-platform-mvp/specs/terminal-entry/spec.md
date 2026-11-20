# Spec Delta

## Purpose

Definir a entrada por intenção e a navegação da interface de terminal, preservando a descoberta da autoria e o destino escolhido durante a identificação.

## ADDED Requirements

### Requirement: Entrada misteriosa
Na primeira visita, a interface SHALL apresentar “O que você busca?” como única mensagem inicial, com entrada textual operável por teclado. A tela SHALL omitir menus, sugestões ou mensagens que anunciem a criação de enigmas.

#### Scenario: Primeira visita
- **WHEN** uma pessoa abre a entrada da plataforma sem sessão
- **THEN** vê a pergunta inicial e pode digitar e enviar sua intenção
- **AND** não recebe sugestões sobre autoria ou comandos secretos

### Requirement: Destino de jogador por nome
A entrada SHALL localizar um enigma publicado pelo nome, ignorando maiúsculas, minúsculas e espaços externos, e preservar seu destino durante cadastro/login. SHALL usar a sessão ativa quando existente.

#### Scenario: Localização e identificação
- **WHEN** uma pessoa sem sessão informa o nome de um enigma publicado
- **THEN** passa pela identificação e entra naquele enigma após autenticar

#### Scenario: Variação do nome
- **WHEN** alguém informa ` PORTAL ` e o nome cadastrado é `Portal`
- **THEN** o sistema localiza o mesmo enigma

#### Scenario: Sessão já ativa
- **WHEN** uma pessoa autenticada informa outro enigma publicado
- **THEN** segue para sua partida nesse enigma sem repetir usuário e senha

### Requirement: Conteúdo indisponível na busca
A localização por nome SHALL informar indisponibilidade para enigmas inexistentes, excluídos ou ainda em rascunho e permitir nova entrada. SHALL omitir conteúdo e respostas desses enigmas.

#### Scenario: Nome inexistente
- **WHEN** uma pessoa busca um nome que não corresponde a um enigma publicado
- **THEN** recebe uma indicação de indisponibilidade e pode tentar outro nome

#### Scenario: Rascunho conhecido pelo nome
- **WHEN** uma pessoa informa o nome de um rascunho
- **THEN** não consegue iniciar uma partida nem obter suas etapas

### Requirement: Entrada discreta de criadores
O comando “acessar o nexo” SHALL levar à área de criadores após identificação, quando necessária. A área SHALL apresentar os enigmas da própria conta e as ações de continuar rascunho, editar publicado e “Criar um novo nexo”.

#### Scenario: Primeiro acesso de criador
- **WHEN** uma pessoa sem sessão envia “acessar o nexo”
- **THEN** passa por cadastro/login e chega à área de seus enigmas

#### Scenario: Retorno de criador
- **WHEN** um criador autenticado retorna à sua área
- **THEN** pode abrir um rascunho existente sem iniciar outro enigma

### Requirement: Separação das experiências
A interface de jogo SHALL omitir ações de autoria, inclusive para contas que já criaram enigmas. O acesso direto à área de criadores SHALL exigir identificação e respeitar a autoria dos recursos acessados.

#### Scenario: Autor joga outro enigma
- **WHEN** uma conta com enigmas próprios abre uma partida
- **THEN** vê a experiência de jogador sem opções de criação

#### Scenario: Acesso direto sem sessão
- **WHEN** uma pessoa abre o endereço da área de criadores sem sessão
- **THEN** precisa se identificar antes de consultar ou alterar seus enigmas

### Requirement: Retorno à entrada
Durante o jogo, `/inicio` SHALL retornar à pergunta “O que você busca?” preservando a sessão, as etapas resolvidas e as dicas reveladas. SHALL permitir a seleção de outro enigma ou do destino de criação pela entrada.

#### Scenario: Interromper e retomar
- **WHEN** um jogador envia `/inicio` e depois informa o mesmo enigma
- **THEN** retoma seu progresso salvo sem repetir a identificação enquanto a sessão estiver ativa

### Requirement: Comandos interpretados como navegação
Os comandos da interface SHALL executar somente ações definidas pela aplicação. Texto de entrada SHALL ser tratado como dado, sem executar comandos do sistema operacional ou interpretar código enviado pelo usuário.

#### Scenario: Entrada semelhante a código
- **WHEN** alguém envia texto que não corresponde a uma intenção reconhecida
- **THEN** a aplicação o trata como dado e mantém o fluxo sem executar esse texto

### Requirement: Envio e retorno acessíveis
O terminal SHALL permitir envio por teclado, indicar carregamento e apresentar o resultado de cada operação sem depender exclusivamente de cor ou animação. Conteúdo textual dos usuários SHALL ser exibido como texto.

#### Scenario: Operação por teclado
- **WHEN** uma pessoa navega e envia uma entrada pelo teclado
- **THEN** consegue identificar a pergunta ativa e o resultado apresentado

#### Scenario: Texto semelhante a marcação
- **WHEN** um enunciado contém texto semelhante a HTML ou script
- **THEN** a interface exibe esse conteúdo literalmente
