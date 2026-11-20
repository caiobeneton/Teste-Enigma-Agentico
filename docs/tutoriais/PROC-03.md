# PROC-03 — Escrever e revisar código para quem está aprendendo

## Objetivo e ponto de partida

Neste capítulo, você vai transformar a ideia de código simples em uma regra de escrita e revisão. A versão inicial do EDU-01 exigia um tutorial por tarefa. A regra passa a exigir que o código seja legível para quem está aprendendo as tecnologias do projeto antes de aceitar a entrega.

Comece no commit `b0b983292b3b908805be2009c6449713cb048203`. Um commit é uma versão identificável do projeto. Esse ponto inclui o fluxo educacional ensinado em [PROC-01](PROC-01.md) e a etapa de design ensinada em [PROC-02](PROC-02.md). As decisões desta entrega estão no [registro PROC-03](../registros/PROC-03.md).

## Pré-requisitos

Use Git, PowerShell e um editor que salve arquivos em UTF-8. Execute os comandos na raiz da sua cópia de trabalho. Se quiser reconstruir as edições, use uma cópia do repositório a partir do commit-base. Use Node.js para rodar o exercício de leitura em JavaScript.

## Passo 1 — Definir o que é código simples

Em [docs/fluxo-de-trabalho.md](../fluxo-de-trabalho.md), acrescente **Código simples para quem está aprendendo** depois de **Requisito EDU-01**. Exija a solução mais simples que cumpra os requisitos e preserve a correção, a segurança e o comportamento esperado. Inclua frontend, backend, SQL, migrações, scripts, testes, configurações executáveis e exemplos da documentação.

Dê instruções concretas. Use nomes que indiquem o que uma variável guarda ou o que uma função faz. Divida uma expressão difícil de ler em etapas explícitas. Inclua funções, camadas, padrões e dependências quando a tarefa precisar deles.

Se houver uma alternativa simples que cumpra os mesmos requisitos, use-a. Quando um requisito ou a tecnologia exigir um recurso avançado, limite seu uso ao trecho em que for necessário. Registre o motivo e explique o conceito no tutorial antes de usá-lo.

## Passo 2 — Exercitar a revisão por leitura

No fim da seção do fluxo, oriente o revisor a localizar as entradas, seguir as decisões e conferir saídas, efeitos e erros. Teste a instrução com um caso didático que recebe um nome em texto e devolve uma mensagem. A palavra `if` executa um bloco quando a condição é verdadeira. `===` compara os valores, e `return` encerra a função e devolve o valor indicado.

Salve o exemplo abaixo em `nexo-proc03-exemplo.js` na pasta temporária indicada por `$env:TEMP` no PowerShell. `console.log` imprime a mensagem devolvida pela função.

```javascript
function validarNome(nome) {
	if (nome === '') {
		return 'Informe o nome.';
	}

	return 'Nome aceito.';
}

console.log(validarNome(''));
console.log(validarNome('Nexo'));
```

Execute o arquivo pelo PowerShell.

```powershell
node "$env:TEMP\nexo-proc03-exemplo.js"
```

No código, `nome` é a entrada. A comparação com `''`, o texto vazio, identifica o caso de erro. Para a primeira chamada, confira a mensagem `Informe o nome.`. Para a segunda, confira `Nome aceito.`. Você consegue prever as duas mensagens lendo a função em ordem.

## Passo 3 — Incluir a revisão no trabalho da equipe

Na tabela **Equipe** do [fluxo de trabalho](../fluxo-de-trabalho.md#equipe), indique que o arquiteto escolhe a solução mais simples que cumpre os requisitos. O programador aplica a regra ao código. O professor lê o código, explica os conceitos novos e pede revisão de complexidade evitável. O gerente confere a revisão antes do aceite.

Na seção **Critérios de conclusão** do mesmo arquivo, peça que o registro identifique quem revisou e quais trechos foram conferidos. Confira se a sequência do código pode ser acompanhada e se cada recurso avançado indispensável tem motivo no registro e explicação no tutorial. Se a leitura revelar um trecho difícil de seguir com uma alternativa equivalente mais simples, devolva-o para ajuste.

## Passo 4 — Ligar a regra aos documentos usados em cada tarefa

Acrescente uma referência curta à seção do fluxo em [AGENTS.md](../../AGENTS.md), no [README.md](../../README.md) e no cabeçalho do EDU-01 da [fila do MVP](../../openspec/changes/define-puzzle-platform-mvp/tasks.md). Em [openspec/config.yaml](../../openspec/config.yaml), acrescente o lembrete ao bloco `context`, que fornece o contexto do projeto para as instruções do OpenSpec. Isso permite encontrar a mesma regra ao ler as instruções do repositório ou consultar a fila.

No [modelo de registro](../modelos/tarefa.md), use a seção **Arquitetura** para registrar por que a solução é a mais simples e justificar recursos avançados indispensáveis. Em **Revisão do gerente**, indique quem revisou, os trechos conferidos e os ajustes feitos. No [modelo de tutorial](../modelos/tutorial.md), use **Solução e motivos** para orientar exemplos simples, apresentar conceitos antes de usá-los e ensinar como conferir o efeito de cada recurso avançado indispensável.

## Verificação do resultado completo

Da raiz da cópia de estudo, use estes comandos para comparar as edições com o ponto inicial. `git diff` mostra as linhas acrescentadas e retiradas. A opção `--check` detecta problemas de espaços em branco no conteúdo alterado.

```powershell
$baseProc03 = 'b0b983292b3b908805be2009c6449713cb048203'
git diff --check $baseProc03
git diff $baseProc03 -- openspec/changes/define-puzzle-platform-mvp/tasks.md
git diff --name-only $baseProc03
git status --short
```

O primeiro comando Git deve terminar sem erros. Na fila, confira que o diff acrescenta o parágrafo no cabeçalho do EDU-01 e que nenhuma linha de tarefa ou marcação mudou. Na lista de arquivos, confira que as diferenças estão nos documentos e na configuração do OpenSpec. O comando `git status --short` também lista arquivos novos que o Git ainda não acompanha. Abra os atalhos para o critério de simplicidade e confirme que chegam ao título certo no fluxo. Os resultados e o ambiente da verificação estão no [registro PROC-03](../registros/PROC-03.md).

## Problemas comuns

- Se a tarefa depender de um conceito novo, explique o conceito antes de usá-lo e mostre como verificar seu resultado.
- Se uma solução tiver menos linhas e for mais difícil de seguir, confira se uma sequência de passos explícitos preserva os requisitos. Use a versão que o iniciante consegue acompanhar.
- Se um link apontar apenas para o início do fluxo, confira o título e a âncora, que é a parte do endereço depois de `#`.

## Arquivos finais e continuidade

Depois que a entrega estiver no histórico, localize o commit e confira o que ele modificou.

```powershell
$entregaProc03 = git log --all -1 --format=%H --grep='^Task: PROC-03$'
$entregaProc03
```

A primeira linha procura a entrega pela linha `Task: PROC-03` da mensagem do commit. A segunda imprime o identificador. Se o resultado estiver vazio, use uma cópia com o histórico da entrega. Com o identificador preenchido, mostre as edições completas.

```powershell
git show $entregaProc03
```

Use o resultado ao repetir os quatro passos e confira cada edição no arquivo correspondente.

Para as próximas tarefas, consulte o [critério de simplicidade vigente](../fluxo-de-trabalho.md#código-simples-para-quem-está-aprendendo) e a [trilha de aprendizado](README.md).
