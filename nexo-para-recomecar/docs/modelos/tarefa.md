# <ID completo> — <título>

## Identificação e andamento

- Origem: <link para a tarefa OpenSpec ou solicitação de processo>.
- Status: <pendente | em arquitetura | em design (quando aplicável) | em implementação | em tutorial | em revisão | pronta para commit | aguardando commit | concluída>.
- Dependências: <IDs, links e critérios para iniciar>.
- Ponto inicial: <hash do commit-base e alterações locais preexistentes relevantes>.
- Papéis: <quem atuou como gerente, arquiteto, designer UI/UX quando aplicável, programador web e professor; justificar quando design não se aplica>.
- Tutorial: <link relativo>.
- Commit de entrega: localizar pelo trailer `Task: <ID completo>`.

## Objetivo e aceite

<Problema, resultado esperado, escopo autorizado e critérios observáveis.>

## Arquitetura

<Antes da implementação: requisitos/specs consultados, dependências, desenho, contratos, invariantes, arquivos previstos, decisões e motivos, alternativas e riscos. Adaptar a tarefas documentais sem inventar aplicação.>

<Se a tarefa produzir ou alterar código, registre por que a solução é a mais simples que atende aos requisitos. Justifique cada recurso avançado indispensável. Consulte o [critério de simplicidade](../fluxo-de-trabalho.md#código-simples-para-quem-está-aprendendo).>

## Design UI/UX e revisão visual — quando aplicável

<Antes da implementação de interface: referências e guia consultados, solução visual e de interação, motivos, componentes/estados, responsividade, teclado/foco/legibilidade e critérios observáveis entregues ao programador. Referenciar os tokens do guia canônico, sem duplicá-los. Após implementar: registrar revisão do designer, o que foi inspecionado ou medido, limitações e correções. Para tarefa exclusivamente de banco ou infraestrutura, justificar não aplicabilidade.>

## Implementação ou alteração documental

<Sequência real, arquivos alterados, desvios do plano e decisões conciliadas com o arquiteto.>

## Verificações e evidências

| Tipo | Comando ou procedimento e diretório | Ambiente | Resultado real | Limitação |
| --- | --- | --- | --- | --- |
| <teste, manual, leitura, reprodução> | <exato> | <versões pertinentes> | <resultado observado> | <nenhuma ou descrição> |

## Tutorial

<Indique quem conferiu o tutorial e as fontes consultadas. Registre comandos executados e ajustes relevantes, quando houver.>

## Revisão do gerente

<Responsável, critérios conferidos, links, registro e tutorial, escopo do commit e decisão de aceite. Só confirmar conclusão após conferir a existência e o conteúdo do commit.>

<Se houver código, indique quem revisou a simplicidade, quais trechos conferiu e o que foi ajustado durante a revisão.>

## Pendências e retomada

<Se houver, bloqueio, responsável, próximo passo e critério para desbloquear. Pendência necessária à entrega impede conclusão.>
