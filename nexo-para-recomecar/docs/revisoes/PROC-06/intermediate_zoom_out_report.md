# Segunda leitura da proposta

O revisor voltou ao documento completo após ler os relatórios de compreensão e crítica. A configuração de uma instância com Express e SQLite atende à escala pretendida para o primeiro piloto, desde que a equipe defina a preparação do grupo e o procedimento operacional. A pasta de repasse contém documentação, referências e a amostra visual estática.

| Prioridade | Resultado da segunda leitura | Onde tratar |
| --- | --- | --- |
| Alta | Faltam limites claros para uma ação de edição de enigma publicado. Uma opção é salvar cada etapa, dica ou mensagem final com um controle próprio e devolver a versão confirmada. Uma ação única exige que as alterações sejam aplicadas juntas. | Design 2, 7 e 8 e tarefa 7.4. |
| Alta | Um percurso curto em navegador com API e SQLite reais pode entrar assim que as primeiras telas estiverem ligadas. Duas contas bastam para publicar, encontrar e concluir uma etapa. O aceite completo de produção local fica em 8.1. | Tarefas 6.3, 7.3 e 8.1. |
| Alta | O roteiro do piloto deve informar o nome do enigma ao jogador e o comando ao criador. Deve definir quando o observador ajuda e como os participantes relatam problemas com pistas físicas. | Proposta 112–125 e 150–152 e tarefa 8.4. |
| Alta | Testar a restauração em cópia prova que o backup pode ser aberto. Para testar o respeito a exclusões, simular uma exclusão posterior e definir quando interromper a restauração se a equipe não puder verificar o conteúdo recuperado. | Plano de migração no design e tarefa 8.3. |
| Média | A identidade já exige senha válida e a spec de entrada indica que o destino vem antes do login. O trabalho que falta é explicitar o token, os retornos de erro e como revalidar o destino ao retomar. | Identidade, entrada, design 6 e 7 e tarefas 3.3, 3.4 e 6.2. |
| Média | Definir a contagem de requisições por IP e exercitar a chegada do grupo nas condições do piloto. A fila limitada de hashes também pode recusar uma chegada simultânea. | Design 6 e tarefas 3.4 e 8.4. |
| Média | Confirmados os casos de precedência de erro de edição, resposta de jogo atrasada, campos obrigatórios em publicados e retorno à entrada após conclusão. | Tarefas 2.2, 4.3, 4.4, 5.6, 6.5, 6.6 e 7.4. |
| Baixa | README, guia visual e índice já esclarecem a origem dos tutoriais. O leitor também pode abrir um registro diretamente. A cópia agora identifica a origem das marcações históricas nos três registros. | Repasse. |

O revisor manteve a recomendação de registrar parâmetros locais e a técnica de renumeração junto das tarefas que vão verificá-los. A arquitetura deve fixar os contratos que as implementações precisam preservar.
