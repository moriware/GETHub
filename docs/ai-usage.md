# Uso de IA no desenvolvimento do GETHub

Durante o desenvolvimento, utilizei IA como ferramenta de apoio principalmente para organização estrutural, sugestões de arquitetura e aceleração de tarefas repetitivas. As decisões finais de implementação, revisão e integração no projeto foram feitas manualmente, com adaptações para atender ao contexto da aplicação.

## Partes assistidas por IA

As principais partes do código e da estrutura que receberam assistência de IA foram:

- Organização das rotas do Expo com navegação baseada em arquivos.
- Sugestão de estrutura de pastas e arquivos para melhorar a organização das rotas.
- Criação e ajuste de um arquivo de layout para envolver as rotas.
- Sugestões para integração do tema na navegação.
- Separação de `SearchRepositoriesParams` em conceitos distintos, como input e params.
- Sugestão para criação de uma classe utilitária de formatação de datas.
- Geração de constantes simples por auto-complete, como `HTTP_METHODS`.
- Sugestões para organização dos arquivos de tokens.
- Sugestões de textos para strings e mensagens da aplicação.

## Prompts e instruções utilizadas

Alguns exemplos de instruções dadas para a IA durante o desenvolvimento:

- "Me ajude a organizar e melhorar as rotas do Expo utilizando navegação baseada em arquivos."
- "Sugira uma estrutura de pastas e arquivos para organizar as rotas da aplicação."
- "Me ajude a implementar o tema criado na navegação."
- "Onde faz mais sentido colocar uma classe para formatar datas: infra ou services?"
- "Estou usando `SearchRepositoriesParams` tanto nos use-cases quanto na API; faz sentido separar em input e params?"
- "Sugira uma forma de organizar os arquivos de tokens com base nesta estrutura."
- "Sugira mensagens e strings mais adequadas para a aplicação."

## O que revisei, modifiquei ou rejeitei

Nem todo output da IA foi aceito diretamente. As principais revisões manuais foram:

- Revisei a estrutura sugerida para as rotas do Expo e adaptei os arquivos à realidade da aplicação.
- Criei manualmente um arquivo de layout para envolver as rotas.
- Adicionei manualmente o provedor de tema da navegação, integrando-o ao design system já existente no projeto.
- Após a sugestão sobre `SearchRepositoriesParams`, refatorei manualmente a separação entre input e params para melhorar manutenção futura e identificação de pontos de quebra.
- Implementei a classe de formatação de datas com base na sugestão recebida, mas ajustando sua localização e integração ao restante da arquitetura.
- Usei auto-complete apenas em constantes simples, revisando o resultado antes de manter no código.
- Recusei assistência da IA na parte de injeção de dependências, pois considerei essa área específica demais e preferi implementá-la manualmente para manter maior controle e reduzir risco de erro.

## Justificativa das alterações

As alterações manuais foram feitas para garantir:

- aderência à arquitetura definida no projeto;
- compatibilidade com o design system existente;
- separação mais clara de responsabilidades entre camadas;
- melhor manutenção futura;
- maior confiança em partes sensíveis da aplicação, como injeção de dependências.

## Reflexão sobre o uso de IA

A IA foi utilizada como apoio para brainstorming, organização e produtividade, mas não substituiu a análise técnica. Sempre revisei as sugestões antes de aplicá-las e descartei o que não fazia sentido para a arquitetura da aplicação. Dessa forma, o código final reflete meu entendimento sobre as decisões implementadas.
