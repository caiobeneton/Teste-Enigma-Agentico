# Projeto como tutorial de programação web

Cada tarefa concluída exige um registro e um tutorial curto em português. O tutorial descreve o que foi entregue e indica os arquivos e o registro.

Todo código produzido ou alterado deve usar a solução mais simples que cumpra os requisitos e seja legível para quem está aprendendo as tecnologias do projeto. Aplique o [critério de simplicidade](docs/fluxo-de-trabalho.md#código-simples-para-quem-está-aprendendo) antes de aprovar a entrega.

## Fontes de verdade

- Leia `README.md` e `docs/fluxo-de-trabalho.md` antes de trabalhar.
- Consulte `openspec/changes/` para descobrir a mudança ativa e suas tarefas; após arquivamento, consulte `openspec/specs/` e o histórico correspondente. Não crie uma segunda lista de tarefas de produto.
- Respeite proposta, design e specs vigentes. Aprovar planejamento não autoriza implementar o MVP inteiro; execute apenas o trabalho solicitado.
- Use `docs/modelos/tarefa.md` e `docs/modelos/tutorial.md`. Registro, tutorial e código precisam corresponder ao mesmo resultado verificado.
- Para tarefas de interface, leia o [guia visual canônico](docs/design/estilo-interface.md), sua [folha visual documental](docs/design/previa-interface.html) e as [referências preservadas](docs/referencias/interface/). As specs determinam o comportamento; escolhas estéticas não autorizam novos recursos.

## Equipe e delegação

Use os cinco agentes definidos em `.codex/agents/`: `arquiteto`, `designer_ui_ux`, `programador_web`, `professor` e `gerente`. Acione o designer quando a tarefa afetar interface ou experiência; tarefas exclusivamente de banco ou infraestrutura não dependem desse papel. O agente principal pode assumir o papel de gerente e delegar os demais, respeitando o limite de agentes disponível. Se os perfis não estiverem carregados na sessão, leia o TOML correspondente e transmita suas instruções ao subagente; informe qualquer impossibilidade de delegação.

1. **Gerente:** seleciona a tarefa autorizada, confere dependências, abre o registro e coordena as entregas.
2. **Arquiteto:** analisa a tarefa, desenha a solução proporcional ao problema e registra decisões, alternativas, contratos e critérios de verificação antes da implementação.
3. **Designer UI/UX, quando aplicável:** entre arquitetura e implementação, define a solução visual e de interação conforme o guia, registra motivos e critérios verificáveis e passa o desenho ao programador; depois revisa o resultado visual implementado.
4. **Programador web:** implementa a solução aprovada, realiza as verificações pertinentes e entrega ao designer e ao professor os arquivos, comandos e resultados reais.
5. **Professor:** confere os arquivos e as evidências da entrega e escreve o tutorial curto.
6. **Gerente:** confere os critérios técnicos, a revisão visual quando aplicável, o registro, o tutorial e os links. Atualiza a tarefa e faz o commit local.

As etapas dependentes são sequenciais. Paralelize somente trabalho independente, com arquivos e responsabilidades delimitados. Apenas o gerente controla marcações finais, staging e commits; não permita commits concorrentes. Os especialistas devolvem problemas ao responsável e repetem a revisão após correções.

## Critério obrigatório de conclusão

Só conclua uma tarefa quando houver solução entregue, verificações adequadas com evidências reais, registro rastreável, tutorial curto revisado e commit local conferido. Siga o protocolo de commit de `docs/fluxo-de-trabalho.md`, inclusive em falhas de Git.

- Inclua comandos simples no tutorial quando ajudarem a usar ou conferir a entrega. Indique onde executá-los e o resultado esperado.
- Se já houver uma tarefa marcada sem registro ou tutorial, complete a documentação antes de atestar a conclusão.
- Ao alterar um procedimento anterior, atualize os tutoriais afetados ou indique a versão de referência e o procedimento vigente. Registre a decisão na tarefa atual.
- Diferencie teste automatizado, inspeção manual, simulação e integração real. Nunca invente resultados ou declare reprodução que não foi executada.
- Mantenha dados reais, senhas, tokens, bancos de execução e certificados privados fora dos exemplos e commits.
- Preserve alterações do usuário. Use staging com caminhos explícitos e revise o diff antes do commit. Não faça push ou reescreva histórico sem solicitação.
- Estes documentos orientam agentes; não substituem testes ou bloqueios automáticos. Não anuncie acompanhamento contínuo quando não houver sessão em execução.
