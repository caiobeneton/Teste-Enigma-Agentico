# Crítica da proposta funcional

Três revisores avaliaram decisões de produto, estrutura do documento e clareza. A leitura confirmou que a proposta e as quatro specs explicam a jornada de autoria e jogo. Os pontos abaixo precisam de ajuste ou confirmação para orientar uma equipe nova.

| Origem | Prioridade | Achado e ação proposta |
| --- | --- | --- |
| Design e estilo | Alta | No cadastro, explicitar que a criação exige senha válida. Registrar também a consequência de informar se um nome existe antes da senha. A proteção por requisições limita o volume de consultas. A decisão sobre o fluxo continua com a equipe. Proposta 41–46, identidade 20–44, design 128. |
| Design | Alta | Depois de concluir um enigma, definir como voltar à entrada por teclado. O design troca o desafio pela mensagem final e o logout fica na entrada e na autoria. Especificar e testar o caminho para concluir, voltar e reabrir a partida concluída. Proposta 60–64 e 88–93, design 57 e 79. |
| Design | Alta | O mínimo para publicação precisa continuar valendo nas edições. O modelo já diz que só rascunhos aceitam campos vazios. Levar essa regra à spec, ao contrato de edição e ao teste de recusa de texto vazio ou formado por espaços. Proposta 96–110, autoria 67–76 e 89–117, design 102 e 148. |
| Design, estrutura e estilo | Alta | Traduzir riscos das pistas físicas em instruções do piloto. Definir como o responsável orienta autores sobre locais permitidos e recebe relatos de pistas removidas ou de acesso inadequado. O plano já prevê acompanhamento direto. Proposta 71–75, 116–118, 150–152 e 165, tarefa 8.4. |
| Estrutura e design | Média | Dar acesso direto aos fluxos e às decisões citadas. A lista de capacidades pode apontar para cada spec e para os trechos do design que registram as alternativas de runtime, banco e arquitetura. Registrar por que decisões de produto como salvamento manual e ausência de pausa foram escolhidas, quando a justificativa for conhecida. Proposta 96–103, 129–137, 169–176 e 184–193. |
| Estrutura | Média | Incluir na visão geral as responsabilidades de autorização, sessão e validação no servidor. As regras existem nas specs. Links diretos ajudam quem começa pela proposta. Identidade 53–91, progressão 20–32 e entrada 72–88. |
| Estilo | Média | A frase “reservar `/dica` e `/inicio` como respostas” pode inverter a regra. O trecho 66 e a spec de autoria exigem rejeitar essas respostas. Corrigir a redação no trecho 141. |
| Estrutura e estilo | Média | Explicar o ponto de partida no repasse. O guia visual falava da base 1.1 no presente, embora o novo repositório ainda vá recriá-la. A cópia agora identifica a origem no guia, no README e no índice de tutoriais. |
| Estilo | Baixa | A aprovação do escopo aparece várias vezes. Uma data na abertura e uma indicação clara do que depende de escolha deixam o texto mais fácil de usar fora da conversa. Proposta 3, 17, 114, 141 e 195. |

Os revisores também pediram critérios verificáveis para os demais riscos do piloto. O acompanhamento direto e as regras de escopo já tratam parte deles. Retenção, restauração e hospedagem precisam de decisões operacionais antes do piloto.
