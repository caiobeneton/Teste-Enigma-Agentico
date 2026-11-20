# Nexo — projeto e tutorial de programação web

Uma plataforma de enigmas textuais. Cada tarefa concluída tem um registro e um tutorial curto com o que foi entregue e onde encontrar os arquivos.

Todo código produzido ou alterado, incluindo testes, scripts e exemplos, deve usar a solução mais simples que cumpra os requisitos. Escrevemos para quem está aprendendo as tecnologias do projeto. Consulte o [critério de simplicidade do EDU-01](docs/fluxo-de-trabalho.md#código-simples-para-quem-está-aprendendo).

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

Em outro terminal, execute `npm run dev:api`. O Vite encaminha requisições `/api` ao Express na porta 3000; por exemplo, acesse `http://localhost:5173/api/health` usando a porta informada pelo Vite. Para outra porta, defina a mesma variável `PORT` nos dois terminais antes de iniciar os processos. A origem padrão de desenvolvimento é `http://localhost:5173`.

Para gerar os arquivos estáticos e inspecionar o build localmente:

```powershell
npm run build
npm run preview
```

O build fica em `web/dist/`. `preview` serve para inspeção local. Para exercitar a entrega integrada em modo de produção local, configure as variáveis abaixo e execute `npm start`. O Express atende HTTP localmente; HTTPS externo depende de proxy e infraestrutura a configurar para o piloto.

```powershell
$env:NODE_ENV = 'production'
$env:PORT = '3000'
$env:APP_ORIGIN = 'https://example.test'
$env:DATABASE_PATH = Join-Path $env:TEMP 'nexo-exemplo.sqlite'
$env:SESSION_SECRET = node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
npm start
```

`NODE_ENV` aceita `development`, `test` ou `production` (padrão `development`). `PORT` é inteiro de 1 a 65535 (padrão 3000). `APP_ORIGIN` é uma única origem HTTP(S), sem credenciais, caminho, consulta ou fragmento; deve ser local em desenvolvimento/teste e HTTPS explícita em produção. Essa validação ainda não implementa a proteção de origem das mutações.

`DATABASE_PATH` é um caminho absoluto para um arquivo, cujo diretório pai deve existir e ser gravável. Desenvolvimento/teste usam `data/nexo.sqlite` por padrão; produção exige caminho explícito em volume persistente. A aplicação verifica o diretório, mas ainda não cria ou abre o banco. Caminhos externos são responsabilidade operacional e não são automaticamente ignorados pelo Git. `SESSION_SECRET` deve ser não vazio em produção; gere um segredo longo e aleatório e mantenha-o estável entre reinícios. Não registre o valor no Git. Sessões ainda não foram implementadas. Variáveis são lidas do ambiente do processo; arquivos `.env` não são carregados automaticamente.

Na raiz, rode `npm run build` e `npm test` para executar verificações reais de configuração e HTTP. `npm run migrate` termina com erro informando que a execução de migrações depende da tarefa 2.1; nenhuma migração é aplicada nesta etapa.

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
- [Tutoriais por entrega](docs/tutoriais/README.md)
- [Instruções para agentes](AGENTS.md) e [perfis especializados](.codex/agents/)

Para solicitar execução, indique uma tarefa ou um conjunto delimitado. A equipe tem cinco agentes: arquiteto, designer UI/UX, programador web, professor e gerente. Em tarefas que afetem interface ou experiência, o designer define a solução visual entre arquitetura e implementação e revisa o resultado conforme o guia. Tarefas exclusivamente de banco ou infraestrutura dispensam essa etapa. O gerente coordena os especialistas, verifica as entregas e cria o commit local da tarefa concluída. A equipe atua durante as sessões de trabalho; os arquivos não iniciam processos de acompanhamento em segundo plano.

O guia e a folha visual são documentação de design; sua entrega não significa que o estilo já tenha sido aplicado ao frontend nem que as telas de jogo e autoria estejam implementadas.
