# Nexo — projeto e tutorial de programação web

Uma plataforma de enigmas textuais construída como material de aprendizado: cada tarefa concluída deve ensinar, passo a passo, **como e por que** a solução foi implementada e como reproduzir o resultado.

O MVP está planejado com JavaScript, React, Vite, Express e SQLite. O frontend React/Vite apresenta a pergunta inicial; Express fornece o endpoint de saúde e entrega o build. Persistência, autenticação, autoria e jogo serão implementados nas tarefas seguintes.

## Executar a base local

Use Node **24.22.3** como versão de referência (`.nvmrc`) e um patch da família 24 que satisfaça `>=24.22.3 <25`. A instalação e o build foram verificados em Windows com Node 24.22.3 e npm 11.19.1. O arquivo `.nvmrc` registra a versão; ele não instala o Node nem modifica seu ambiente automaticamente. A configuração `engine-strict` rejeita uma instalação com runtime incompatível.

No PowerShell, entre na raiz deste repositório e confira o runtime antes de instalar:

```powershell
node --version
npm --version
npm ci
npm ls --workspaces --depth=0
```

`npm ci` instala a árvore registrada em `package-lock.json`, compartilhada pelos dois workspaces. Os comandos seguintes também partem da raiz:

```powershell
npm run dev
```

Abra o endereço local informado pelo Vite para ver “O que você busca?”. Encerre com `Ctrl+C`. Não há campo de entrada ou fluxo de jogo nesta etapa.

Em outro terminal, execute `npm run dev:api`. O Vite encaminha requisições `/api` ao Express na porta 3000; por exemplo, acesse `http://localhost:5173/api/health` usando a porta informada pelo Vite.

Para gerar os arquivos estáticos e inspecionar o build localmente:

```powershell
npm run build
npm run preview
```

O build fica em `web/dist/`. `preview` serve para inspeção local. Para exercitar a entrega integrada localmente após o build, no PowerShell execute `$env:NODE_ENV='production'` e `npm start`; acesse `http://localhost:3000/`. Essa configuração é intermediária: validação de ambiente e segredos será adicionada na tarefa 1.3.

Para conferir a base da API sem abrir porta ou iniciar servidor:

```powershell
node --check api/src/app.js
node --input-type=module -e "import { createApp } from './api/src/app.js'; const app = createApp(); console.log(typeof app, typeof app.use);"
```

A última linha deve imprimir `function function`: a fábrica retorna uma aplicação Express com o método `use`, sem abrir porta durante a importação.

## Planejamento e aprendizado

- [Planejamento e tarefas do MVP](openspec/changes/define-puzzle-platform-mvp/tasks.md)
- [Proposta](openspec/changes/define-puzzle-platform-mvp/proposal.md), [design](openspec/changes/define-puzzle-platform-mvp/design.md) e [specs](openspec/changes/define-puzzle-platform-mvp/specs/)
- [Como a equipe trabalha e conclui tarefas](docs/fluxo-de-trabalho.md)
- [Guia visual canônico](docs/design/estilo-interface.md), [folha visual documental](docs/design/previa-interface.html) e [referências de interface preservadas](docs/referencias/interface/)
- [Tutoriais em ordem de estudo](docs/tutoriais/README.md)
- [Instruções para agentes](AGENTS.md) e [perfis especializados](.codex/agents/)

Para solicitar execução, indique uma tarefa ou um conjunto delimitado. A equipe tem cinco agentes: arquiteto, designer UI/UX, programador web, professor e gerente. Em tarefas que afetem interface ou experiência, o designer define a solução visual entre arquitetura e implementação e revisa o resultado conforme o guia. Tarefas exclusivamente de banco ou infraestrutura dispensam essa etapa. O gerente coordena os especialistas, verifica as entregas e cria o commit local da tarefa concluída. A equipe atua durante as sessões de trabalho; os arquivos não iniciam processos de acompanhamento em segundo plano.

O guia e a folha visual são documentação de design; sua entrega não significa que o estilo já tenha sido aplicado ao frontend nem que as telas de jogo e autoria estejam implementadas.
