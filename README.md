# Nexo — projeto e tutorial de programação web

Uma plataforma de enigmas textuais construída como material de aprendizado: cada tarefa concluída deve ensinar, passo a passo, **como e por que** a solução foi implementada e como reproduzir o resultado.

O MVP está planejado com JavaScript, React, Vite, Express e SQLite. A base JavaScript está organizada em npm workspaces: o frontend React/Vite apresenta somente a pergunta inicial e já pode ser executado e compilado; a API exporta uma fábrica Express vazia, sem servidor ou rotas. Persistência, autenticação, autoria e jogo serão implementados nas tarefas seguintes.

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

Para gerar os arquivos estáticos e inspecionar o build localmente:

```powershell
npm run build
npm run preview
```

O build fica em `web/dist/`. `preview` serve para inspeção local; a entrega integrada em produção com Express será criada na tarefa 1.2.

Para conferir a base da API sem abrir porta ou iniciar servidor:

```powershell
node --check api/src/app.js
node --input-type=module -e "import { createApp } from './api/src/app.js'; const app = createApp(); console.log(typeof app, typeof app.use);"
```

A última linha deve imprimir `function function`: a fábrica retorna uma aplicação Express com o método `use`. Isso comprova importação e criação, sem comprovar endpoints ainda inexistentes. Não há script de execução da API ou suíte de testes nesta base.

## Planejamento e aprendizado

- [Planejamento e tarefas do MVP](openspec/changes/define-puzzle-platform-mvp/tasks.md)
- [Proposta](openspec/changes/define-puzzle-platform-mvp/proposal.md), [design](openspec/changes/define-puzzle-platform-mvp/design.md) e [specs](openspec/changes/define-puzzle-platform-mvp/specs/)
- [Como a equipe trabalha e conclui tarefas](docs/fluxo-de-trabalho.md)
- [Tutoriais em ordem de estudo](docs/tutoriais/README.md)
- [Instruções para agentes](AGENTS.md) e [perfis especializados](.codex/agents/)

Para solicitar execução, indique uma tarefa ou um conjunto delimitado. O gerente coordena arquiteto, programador web e professor, verifica as entregas e cria o commit local da tarefa concluída. A equipe atua durante as sessões de trabalho; os arquivos não iniciam processos de acompanhamento em segundo plano.
