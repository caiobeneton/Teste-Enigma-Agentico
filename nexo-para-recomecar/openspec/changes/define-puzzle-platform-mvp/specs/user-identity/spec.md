# Spec Delta

## Purpose

Definir uma única identidade para jogar e criar enigmas, com confirmação de cadastro e preservação do destino escolhido durante a autenticação.

## ADDED Requirements

### Requirement: Identidade única
O sistema SHALL usar a mesma conta para jogar e criar. SHALL comparar nomes de usuário ignorando maiúsculas, minúsculas e espaços externos, preservar a grafia de exibição e impedir contas distintas com a mesma identidade normalizada.

#### Scenario: Nome equivalente
- **WHEN** uma pessoa informa ` caio ` e existe a conta `Caio`
- **THEN** o sistema reconhece a conta existente e pede sua senha

#### Scenario: Uso nas duas áreas
- **WHEN** uma pessoa autenticada acessa a criação após jogar
- **THEN** utiliza a mesma conta e vê somente os enigmas de sua autoria

### Requirement: Identificação de conta existente
A identificação SHALL perguntar “Quem você é?” e, para um nome existente, “Qual é a senha?”. A autenticação válida SHALL encaminhar ao destino preservado. Uma senha incorreta SHALL manter a pessoa sem acesso e permitir nova tentativa.

#### Scenario: Login válido
- **WHEN** uma pessoa informa um usuário existente e sua senha correta
- **THEN** obtém uma sessão e segue para o enigma ou área de criadores escolhidos

#### Scenario: Senha incorreta
- **WHEN** a senha informada não corresponde à conta existente
- **THEN** o sistema informa falha, não cria outra conta e não libera o destino protegido

### Requirement: Confirmação antes da senha de cadastro
Para nome inexistente, o sistema SHALL perguntar “Não conhecemos você. Novo por aqui? (y/n)” antes da senha. `y/Y` SHALL levar à coleta da senha e ao cadastro; `n/N` SHALL retornar a “Quem você é?”. Outras entradas SHALL manter a confirmação sem criar conta.

#### Scenario: Novo usuário confirma
- **WHEN** uma pessoa confirma um nome inexistente com `Y`
- **THEN** recebe “Qual é a senha?” e a conta só é criada após enviar uma senha válida

#### Scenario: Novo usuário recusa
- **WHEN** uma pessoa responde `n` à confirmação
- **THEN** volta à pergunta de nome sem criar conta ou pedir senha nessa tentativa

#### Scenario: Resposta inválida à confirmação
- **WHEN** uma pessoa envia uma resposta diferente de `y/Y/n/N`
- **THEN** a confirmação permanece ativa e nenhum cadastro é realizado

### Requirement: Cadastro consistente sob concorrência
O cadastro SHALL verificar a unicidade no momento de criar a conta. Uma disputa pelo mesmo nome normalizado SHALL produzir uma única conta e informar conflito aos demais pedidos, sem autenticar ninguém na conta de outra pessoa.

#### Scenario: Dois cadastros simultâneos
- **WHEN** duas pessoas confirmam e tentam cadastrar o mesmo nome disponível
- **THEN** somente uma criação é aceita e a outra pessoa precisa escolher um nome disponível ou autenticar na conta existente

### Requirement: Proteção das credenciais
O sistema SHALL mascarar a entrada da senha, excluir credenciais do histórico visual e de logs e armazenar apenas uma derivação criptográfica adequada da senha com salt. A comparação de senhas SHALL preservar o texto informado, sem aplicar a normalização usada para nomes ou respostas de enigmas.

#### Scenario: Senha informada no terminal
- **WHEN** uma pessoa preenche e envia sua senha
- **THEN** o texto não aparece em claro no terminal, nas respostas da API ou nos logs

#### Scenario: Variação de caixa na senha
- **WHEN** uma senha é enviada com letras diferentes em maiúsculas ou minúsculas
- **THEN** o sistema não a trata automaticamente como equivalente à senha cadastrada

### Requirement: Sessão reutilizável e encerrável
Uma sessão válida SHALL identificar a mesma conta em todos os enigmas e na área de criadores. O sistema SHALL oferecer encerramento explícito da sessão. Expiração ou encerramento SHALL preservar os dados de progresso e autoria, exigindo nova autenticação para acessá-los.

#### Scenario: Reutilização da sessão
- **WHEN** alguém com sessão válida troca de enigma ou acessa a criação
- **THEN** não precisa repetir usuário e senha

#### Scenario: Sessão encerrada
- **WHEN** uma pessoa encerra a sessão e tenta acessar um recurso protegido
- **THEN** precisa se identificar novamente, mantendo seu progresso e enigmas salvos

#### Scenario: Sessão expirada
- **WHEN** uma operação protegida encontra uma sessão expirada
- **THEN** não executa a alteração e permite identificação para retomar o destino

### Requirement: Autorização pela autoria
Toda consulta e alteração de conteúdo de autoria SHALL verificar a conta autenticada. Conhecer o identificador de outro enigma SHALL ser insuficiente para consultar suas respostas ou editar, publicar e excluir seus dados.

#### Scenario: Outra conta tenta alterar enigma
- **WHEN** uma conta solicita uma operação de autoria sobre enigma de outra pessoa
- **THEN** o sistema recusa a operação e não revela respostas nem conteúdo de rascunho

### Requirement: Proteção das operações autenticadas
Operações que alterem conta, sessão, enigmas ou progresso SHALL exigir as proteções de origem e sessão definidas no design. A comunicação do piloto publicado SHALL proteger as credenciais em trânsito.

#### Scenario: Requisição originada de outro site
- **WHEN** uma origem não autorizada tenta executar uma operação autenticada que altera dados
- **THEN** a operação é recusada sem alterar conta, enigma ou progresso

### Requirement: Recuperação fora do MVP
O MVP SHALL omitir recuperação de acesso por e-mail, código ou fluxo administrativo de redefinição de senha. A perda da senha SHALL manter os dados existentes, sem excluir automaticamente conta, enigmas ou progresso.

#### Scenario: Usuário perde a senha
- **WHEN** uma pessoa não consegue informar a senha da conta no MVP
- **THEN** não recebe uma alternativa de recuperação e seus dados não são apagados automaticamente
