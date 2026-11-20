# Spec Delta

## Purpose

Definir partidas individuais e lineares, com validação textual no servidor, dicas graduais e retomada consistente entre acessos e dispositivos.

## ADDED Requirements

### Requirement: Partida individual por enigma
O sistema SHALL manter um progresso independente para cada combinação de jogador e enigma publicado. No primeiro acesso autenticado SHALL iniciar na primeira etapa; nos seguintes SHALL retomar a etapa e as dicas já liberadas para aquela conta.

#### Scenario: Primeiro acesso
- **WHEN** uma conta abre pela primeira vez um enigma publicado
- **THEN** inicia na primeira etapa sem herdar o progresso de outra conta

#### Scenario: Retorno em outro dispositivo
- **WHEN** uma pessoa acessa o mesmo enigma com sua conta em outro dispositivo
- **THEN** retoma sua etapa e as dicas já reveladas

### Requirement: Somente conteúdo liberado ao jogador
A experiência e as respostas de jogo SHALL entregar apenas o nome do enigma, a etapa atual e suas dicas já reveladas, além dos dados necessários para operar a partida. SHALL omitir respostas corretas, etapas futuras e conteúdo de etapas anteriores, inclusive quando o jogador também for autor.

#### Scenario: Inspeção da resposta de jogo
- **WHEN** um jogador consulta os dados da partida
- **THEN** não recebe respostas corretas nem enunciados ou dicas ocultas de outras etapas

#### Scenario: Tentativa de pular etapa
- **WHEN** um jogador envia um identificador de etapa que não é sua etapa atual
- **THEN** a operação não libera nem valida aquela etapa e não altera seu progresso

### Requirement: Comparação textual única
Cada etapa SHALL ter uma única resposta correta. A comparação SHALL ignorar maiúsculas, minúsculas e espaços externos e preservar acentos, pontuação e espaços internos. A validação SHALL ocorrer no servidor contra a resposta vigente.

#### Scenario: Resposta equivalente
- **WHEN** a resposta cadastrada é `Lua` e o jogador envia ` LUA `
- **THEN** a tentativa é aceita como correta

#### Scenario: Diferenças significativas
- **WHEN** a resposta é `satélite natural` e o jogador envia `satelite natural`, `satélite  natural` ou acrescenta pontuação
- **THEN** essas tentativas não são tratadas automaticamente como equivalentes

### Requirement: Erros sem perda e tentativas ilimitadas
O jogador SHALL poder tentar responder sem limite de tentativas de jogo. Uma resposta incorreta SHALL manter a etapa, as soluções e as dicas já reveladas. A interface SHALL apresentar o resultado da tentativa sem revelar a resposta correta.

#### Scenario: Resposta incorreta
- **WHEN** o jogador envia uma resposta incorreta
- **THEN** permanece na mesma etapa com seu progresso preservado e pode tentar novamente

### Requirement: Avanço linear por acerto
Uma resposta correta SHALL registrar a solução da etapa e liberar somente a próxima etapa daquele jogador. O primeiro acerto global da etapa SHALL bloquear sua resposta para edição do autor na mesma operação consistente.

#### Scenario: Avanço independente
- **WHEN** um jogador resolve a etapa atual e ainda há uma próxima
- **THEN** vê a próxima etapa e a partida de outra conta permanece em seu próprio ponto

#### Scenario: Primeiro acerto global
- **WHEN** ocorre a primeira solução correta de uma etapa
- **THEN** o avanço e o bloqueio da resposta são confirmados juntos

### Requirement: Envios repetidos ou desatualizados
Toda operação de avanço ou revelação SHALL ser vinculada à etapa e ao estado de progresso que a originaram. Reenvios e operações concorrentes SHALL evitar avanços ou revelações duplicadas; pedidos desatualizados SHALL permitir obter o estado atual.

#### Scenario: Duplo envio de resposta
- **WHEN** dois pedidos enviam a mesma resposta para a mesma etapa de uma conta
- **THEN** a conta avança no máximo uma etapa, mesmo que a próxima aceite o mesmo texto

#### Scenario: Duplo pedido de dica
- **WHEN** dois pedidos de dica partem do mesmo estado da partida
- **THEN** revelam no máximo uma dica nova e permitem sincronizar a interface

### Requirement: Dicas graduais por comando
O comando `/dica` SHALL revelar a primeira dica ainda oculta da etapa atual na ordem cadastrada. As dicas SHALL ser opcionais; ao esgotá-las, a interface SHALL informar que não há mais dicas na etapa. `dica`, sem a barra, SHALL ser validado como resposta comum.

#### Scenario: Solicitação gradual
- **WHEN** o jogador solicita `/dica` duas vezes, aguardando cada resultado
- **THEN** recebe uma dica por solicitação na ordem cadastrada, se houver dicas disponíveis

#### Scenario: Nenhuma dica restante
- **WHEN** o jogador pede `/dica` sem dicas ainda ocultas na etapa atual
- **THEN** recebe a indicação de que não há mais dicas e mantém seu progresso

### Requirement: Dicas reveladas e lista vigente
Dicas reveladas da etapa atual SHALL permanecer visíveis ao retomar a partida. Edições SHALL mostrar o texto atualizado sem versões anteriores; remoções SHALL ocultar a dica removida; novas dicas SHALL começar ocultas. A próxima revelação SHALL considerar as dicas existentes e ainda não reveladas.

#### Scenario: Dica editada
- **WHEN** o autor altera uma dica que o jogador já revelou e a partida é consultada novamente
- **THEN** a interface mostra seu texto atualizado

#### Scenario: Remoção e inclusão
- **WHEN** o autor remove uma dica revelada e adiciona outra
- **THEN** a removida deixa de aparecer e a nova só é revelada por uma nova solicitação

### Requirement: Pistas físicas validadas por texto
O enunciado e as dicas SHALL poder mencionar nomes ou endereços de lugares. A progressão SHALL depender exclusivamente da resposta textual correta, sem exigir geolocalização, check-in ou comprovação de presença.

#### Scenario: Resposta após pesquisa externa
- **WHEN** um jogador volta à plataforma com uma resposta obtida a partir de uma indicação de lugar
- **THEN** o sistema aplica a mesma validação textual utilizada nas demais etapas

### Requirement: Conclusão persistente
Acertar a última etapa SHALL marcar o enigma como concluído e exibir a mensagem personalizada vigente ou a padrão. Acessos posteriores SHALL mostrar o estado concluído e a mensagem atualizada, sem oferecer reinício da partida no MVP.

#### Scenario: Último acerto
- **WHEN** um jogador responde corretamente à última etapa
- **THEN** a conclusão é persistida e a mensagem final é apresentada

#### Scenario: Retorno após concluir
- **WHEN** a conta volta a um enigma concluído
- **THEN** vê a conclusão e a mensagem vigente, sem reiniciar a sequência

### Requirement: Enigma excluído durante a partida
Se o enigma for excluído, o sistema SHALL interromper consultas e alterações de sua partida e indicar indisponibilidade. SHALL remover o progresso vinculado e impedir que uma nova publicação com o mesmo nome herde esse estado.

#### Scenario: Exclusão com tela aberta
- **WHEN** o autor exclui o enigma e um jogador tenta enviar uma resposta ou pedir uma dica
- **THEN** recebe indisponibilidade e não produz novo progresso naquele enigma

#### Scenario: Mesmo nome em novo enigma
- **WHEN** um nome excluído é reutilizado e o jogador o acessa
- **THEN** inicia uma partida nova, independente da publicação anterior
