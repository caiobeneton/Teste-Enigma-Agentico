# Projeto como tutorial de programação web

Este projeto deve ensinar a construir uma aplicação web. Toda tarefa concluída, inclusive documentação, configuração, testes, correções e refatorações, exige registro e tutorial didático, passo a passo, de **como e por que** cada etapa foi realizada.

## Fontes de verdade

- Leia `README.md` e `docs/fluxo-de-trabalho.md` antes de trabalhar.
- Consulte `openspec/changes/` para descobrir a mudança ativa e suas tarefas; após arquivamento, consulte `openspec/specs/` e o histórico correspondente. Não crie uma segunda lista de tarefas de produto.
- Respeite proposta, design e specs vigentes. Aprovar planejamento não autoriza implementar o MVP inteiro; execute apenas o trabalho solicitado.
- Use `docs/modelos/tarefa.md` e `docs/modelos/tutorial.md`. Registro, tutorial e código precisam corresponder ao mesmo resultado verificado.

## Equipe e delegação

Use os quatro agentes definidos em `.codex/agents/`: `arquiteto`, `programador_web`, `professor` e `gerente`. O agente principal pode assumir o papel de gerente e delegar os demais, respeitando o limite de agentes disponível. Se os perfis não estiverem carregados na sessão, leia o TOML correspondente e transmita suas instruções ao subagente; informe qualquer impossibilidade de delegação.

1. **Gerente:** seleciona a tarefa autorizada, confere dependências, abre o registro e coordena as entregas.
2. **Arquiteto:** analisa a tarefa, desenha a solução proporcional ao problema e registra decisões, alternativas, contratos e critérios de verificação antes da implementação.
3. **Programador web:** implementa a solução aprovada, realiza as verificações pertinentes e entrega ao professor os arquivos, comandos e resultados reais.
4. **Professor:** lê a implementação efetiva e escreve o tutorial em português, explicando conceitos, cada passo, seu motivo e como reproduzir e verificar o resultado.
5. **Gerente:** revisa os critérios técnicos, a fidelidade didática, o registro e os links; somente então atualiza a tarefa e faz o commit local correspondente.

As etapas dependentes são sequenciais. Paralelize somente trabalho independente, com arquivos e responsabilidades delimitados. Apenas o gerente controla marcações finais, staging e commits; não permita commits concorrentes. Os especialistas devolvem problemas ao responsável e repetem a revisão após correções.

## Critério obrigatório de conclusão

Só conclua uma tarefa quando houver solução entregue, verificações adequadas com evidências reais, registro rastreável, tutorial reproduzível revisado e commit local conferido. Não marque `[x]` com tutorial ou registro faltando. Siga o protocolo de commit de `docs/fluxo-de-trabalho.md`, inclusive em falhas de Git.

- Explique pré-requisitos, diretório de execução, arquivos, comandos exatos, resultados esperados, motivos das escolhas e problemas comuns. Não use comandos de scripts ainda inexistentes como se funcionassem.
- Cada tarefa tem seu registro e seu tutorial, mesmo quando reutiliza conceitos de capítulos anteriores por links. Se já houver tarefa marcada sem essas entregas, registre a lacuna e complete-a antes de atestar sua conclusão pelo novo critério.
- Ao alterar um procedimento ensinado anteriormente, atualize os tutoriais afetados ou explicite a versão e o ponto inicial do capítulo, com link para o procedimento vigente. Registre essa decisão na tarefa atual.
- Diferencie teste automatizado, inspeção manual, simulação e integração real. Nunca invente resultados ou declare reprodução que não foi executada.
- Mantenha dados reais, senhas, tokens, bancos de execução e certificados privados fora dos exemplos e commits.
- Preserve alterações do usuário. Use staging com caminhos explícitos e revise o diff antes do commit. Não faça push ou reescreva histórico sem solicitação.
- Estes documentos orientam agentes; não substituem testes ou bloqueios automáticos. Não anuncie acompanhamento contínuo quando não houver sessão em execução.
