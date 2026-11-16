# Spec Delta

## Purpose

Definir a criação e a manutenção de enigmas textuais pelo autor, com nomes exclusivos e regras de imutabilidade compatíveis com partidas em andamento.

## ADDED Requirements

### Requirement: Enigmas da própria conta
A área de criadores SHALL listar os enigmas da conta autenticada com nome e estado de rascunho ou publicado. SHALL permitir abrir um existente ou iniciar um novo enigma.

#### Scenario: Retomar criação
- **WHEN** um criador volta à sua área e escolhe um rascunho salvo
- **THEN** pode continuar a elaboração a partir do último salvamento

### Requirement: Autoria exclusivamente textual
O autor SHALL cadastrar nome, enunciados e uma resposta por etapa, além de dicas e mensagem final opcionais. O MVP SHALL aceitar somente conteúdo textual nesses campos, sem upload de mídia ou interpretação de marcação.

#### Scenario: Conteúdo de uma etapa
- **WHEN** o autor cadastra enunciado, resposta e dicas
- **THEN** esses conteúdos são tratados como texto e associados àquela etapa

### Requirement: Rascunho incompleto com salvamento manual
O autor SHALL conseguir salvar manualmente um rascunho com nome válido e disponível mesmo sem completar suas etapas. A interface SHALL confirmar o salvamento e permitir retomada posterior. Fechar a edição SHALL preservar apenas os dados efetivamente salvos.

#### Scenario: Etapas ainda incompletas
- **WHEN** o autor salva um rascunho com nome válido e campos de etapas incompletos
- **THEN** o rascunho é persistido, permanece sem publicação e pode ser retomado

#### Scenario: Alteração não salva
- **WHEN** o autor retorna depois de sair com alterações que não salvou
- **THEN** encontra a última versão salva do rascunho

### Requirement: Nome exclusivo reservado no rascunho
O primeiro salvamento SHALL reservar o nome válido e disponível, comparando nomes sem distinção de maiúsculas, minúsculas e espaços externos. Rascunhos e publicados SHALL compartilhar a mesma unicidade e preservar a grafia de exibição.

#### Scenario: Nome já reservado
- **WHEN** outro criador tenta salvar ` portal ` e existe o rascunho `Portal`
- **THEN** recebe conflito e o nome do primeiro enigma permanece reservado

#### Scenario: Salvamentos concorrentes
- **WHEN** dois criadores tentam reservar simultaneamente o mesmo nome
- **THEN** somente um salvamento obtém aquele nome

### Requirement: Nomes e respostas reservados
O sistema SHALL rejeitar nomes equivalentes a “acessar o nexo” e “criar um novo nexo”. SHALL rejeitar respostas equivalentes aos comandos `/dica` e `/inicio`, considerando a comparação das respostas, para evitar etapas impossíveis de resolver pela interface.

#### Scenario: Nome de comando
- **WHEN** o autor tenta salvar o nome ` ACESSAR O NEXO `
- **THEN** o sistema informa que o nome é reservado e não o registra

#### Scenario: Resposta igual a comando
- **WHEN** o autor informa `/dica` ou `/inicio` como resposta correta
- **THEN** o sistema recusa essa resposta sem impedir que o texto comum `dica` seja usado

### Requirement: Estrutura editável durante o rascunho
Antes da publicação, o autor SHALL poder adicionar, remover e ordenar etapas e alterar um nome de rascunho para outro disponível. A mudança de nome SHALL reservar o novo e liberar o anterior em uma única operação consistente.

#### Scenario: Elaborar sequência
- **WHEN** o autor reorganiza etapas de um rascunho e salva
- **THEN** a próxima edição apresenta a estrutura salva

#### Scenario: Renomear rascunho
- **WHEN** o autor salva um novo nome disponível em um rascunho
- **THEN** o novo nome é reservado e o anterior fica disponível

### Requirement: Publicação explícita com conteúdo mínimo
A publicação SHALL ser uma ação explícita que exige nome válido e único, ao menos uma etapa e enunciado e resposta não vazios em cada etapa. Dicas e personalização da conclusão SHALL ser opcionais. A interface SHALL informar o congelamento do nome e da estrutura antes da confirmação.

#### Scenario: Publicação válida
- **WHEN** o autor confirma a publicação de um rascunho que atende aos requisitos
- **THEN** o enigma fica disponível para jogar pelo nome com sua estrutura fixada

#### Scenario: Etapa incompleta
- **WHEN** o autor tenta publicar com uma etapa sem enunciado ou resposta
- **THEN** a publicação é recusada, indicando os campos a completar e mantendo o rascunho

### Requirement: Nome e etapas fixos após publicar
Após a publicação, o sistema SHALL impedir alterações no nome, na quantidade, na identidade e na ordem das etapas. SHALL impedir o retorno a rascunho e a pausa do enigma no MVP.

#### Scenario: Alterar estrutura de publicado
- **WHEN** um pedido tenta renomear, inserir, substituir, remover ou reordenar etapas de um enigma publicado
- **THEN** a operação é recusada sem alterar a estrutura ou o nome

#### Scenario: Despublicar ou pausar
- **WHEN** o autor acessa um enigma publicado no MVP
- **THEN** não recebe ação para pausar ou transformá-lo novamente em rascunho

### Requirement: Resposta bloqueada pelo primeiro acerto global
A resposta de uma etapa SHALL ser editável apenas enquanto nenhum jogador a tiver resolvido. O primeiro acerto SHALL bloquear definitivamente aquela resposta para o autor, independentemente da conta que acertou ou do progresso de outras etapas.

#### Scenario: Primeira solução de outra pessoa
- **WHEN** um jogador resolve uma etapa pela primeira vez
- **THEN** o autor não consegue alterar a resposta daquela etapa
- **AND** respostas de outras etapas sem soluções continuam editáveis

#### Scenario: Autor joga seu próprio enigma publicado
- **WHEN** o autor resolve uma etapa na experiência normal de jogador
- **THEN** seu acerto participa da mesma regra global de bloqueio, sem modo especial de teste

### Requirement: Edição e acerto consistentes
Alterações permitidas da resposta SHALL valer para os envios validados em seguida. Edição e primeiro acerto concorrentes SHALL preservar uma ordem consistente: uma edição anterior ao acerto define a resposta vigente; um acerto anterior impede a edição.

#### Scenario: Edição antes do envio
- **WHEN** o autor altera uma resposta ainda desbloqueada e um jogador envia a resposta anterior
- **THEN** a tentativa é comparada à nova resposta vigente

#### Scenario: Acerto antes da edição
- **WHEN** um acerto é confirmado antes de uma tentativa concorrente de editar a resposta
- **THEN** o progresso é salvo e a edição da resposta é recusada

### Requirement: Enunciado e dicas continuam editáveis
O autor SHALL poder editar os enunciados e textos de dicas mesmo após soluções. Dicas SHALL poder ser adicionadas e removidas; o MVP SHALL impedir sua reordenação. A ordem das dicas restantes SHALL ser preservada e novas dicas SHALL ser acrescentadas à sequência.

#### Scenario: Editar etapa resolvida
- **WHEN** o autor salva um novo enunciado ou texto de dica em uma etapa resolvida
- **THEN** o conteúdo atualizado fica disponível sem desbloquear ou alterar sua resposta

#### Scenario: Alterar lista de dicas
- **WHEN** o autor remove uma dica e acrescenta outra
- **THEN** a removida deixa a lista e a nova integra a sequência sem reordenar as existentes

### Requirement: Mensagem final opcional e editável
O autor SHALL poder definir uma mensagem final durante a criação e alterá-la após publicar. A ausência de personalização SHALL usar a mensagem padrão. O texto vigente SHALL ser exibido também em novos acessos de jogadores que já concluíram.

#### Scenario: Conclusão padrão
- **WHEN** o autor publica sem mensagem personalizada
- **THEN** a conclusão do enigma utiliza a mensagem padrão da plataforma

#### Scenario: Mensagem editada
- **WHEN** o autor altera a mensagem de um publicado e alguém volta a esse enigma concluído
- **THEN** o jogador vê a mensagem atualizada

### Requirement: Exclusão integral de enigma
O autor SHALL poder excluir seus rascunhos e publicados. A exclusão SHALL remover conteúdo, etapas, dicas, partidas, dicas reveladas e conclusões daquele enigma, sem histórico para os jogadores, e liberar seu nome. SHALL preservar a conta e outros enigmas.

#### Scenario: Excluir publicado em andamento
- **WHEN** o autor exclui um publicado com jogadores ativos ou concluídos
- **THEN** o enigma deixa de estar disponível e todo o progresso vinculado é removido

#### Scenario: Reutilizar nome
- **WHEN** outro criador registra o nome de um enigma excluído
- **THEN** cria um novo enigma sem herdar conteúdo, bloqueios ou progresso do anterior

### Requirement: Prevenção de sobrescrita silenciosa
Alterações concorrentes de autoria SHALL detectar uma versão desatualizada em vez de sobrescrever silenciosamente outra edição, uma publicação ou um bloqueio de resposta. A interface SHALL permitir recarregar os dados atuais após informar o conflito.

#### Scenario: Duas abas de edição
- **WHEN** uma segunda aba tenta salvar uma versão anterior àquela já salva pela primeira
- **THEN** recebe conflito sem apagar a edição mais recente
