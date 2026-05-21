# Uso de IA no desenvolvimento do GETHub

Durante o desenvolvimento, utilizei IA como ferramenta de apoio principalmente para organização estrutural, sugestões de arquitetura, revisão de implementação e aceleração de tarefas repetitivas. As decisões finais de implementação, revisão e integração no projeto foram feitas manualmente, com adaptações para atender ao contexto da aplicação.

## Partes assistidas por IA

As principais partes do código e da estrutura que receberam assistência de IA foram:

- Organização das rotas do Expo com navegação baseada em arquivos.
- Sugestão de estrutura de pastas e arquivos para melhorar a organização das rotas.
- Criação e ajuste de um arquivo de layout para envolver as rotas.
- Sugestões para integração do tema na navegação.
- Separação de `SearchRepositoriesParams` em conceitos distintos, como input e params.
- Sugestões para adaptação do uso de React Query ao contexto do projeto.
- Revisão e refinamento da estratégia de testes.
- Sugestão de casos de teste complementares.
- Sugestão para criação de uma classe utilitária de formatação de datas.
- Geração de constantes simples por auto-complete, como `HTTP_METHODS`.
- Sugestões para organização dos arquivos de tokens.
- Sugestões de textos para strings e mensagens da aplicação.

## Prompts e instruções utilizadas

Alguns exemplos de instruções dadas para a IA durante o desenvolvimento foram:

- "Me ajude a organizar e melhorar as rotas do Expo utilizando navegação baseada em arquivos."
- "Sugira uma estrutura de pastas e arquivos para organizar as rotas da aplicação."
- "Me ajude a implementar o tema criado na navegação."
- "Onde faz mais sentido colocar uma classe para formatar datas: infra ou services?"
- "Estou usando `SearchRepositoriesParams` tanto nos use-cases quanto na API; faz sentido separar em input e params?"
- "No projeto foi mencionado o uso de React Query. Como posso adaptar essa biblioteca à minha implementação atual, considerando que eu já havia feito a consulta manualmente?"
- "Me ajude a revisar a implementação dos testes e apontar possíveis melhorias."
- "Sugira casos de teste adicionais para essa funcionalidade, mas sem fugir da estrutura que já defini no projeto."
- "Revise este teste e diga se ele está coerente com o comportamento esperado da funcionalidade."
- "Sugira uma forma de organizar os arquivos de tokens com base nesta estrutura."
- "Sugira mensagens e strings mais adequadas para a aplicação."

## O que revisei, modifiquei ou rejeitei

Nem todo output da IA foi aceito diretamente. As principais revisões manuais foram:

- Revisei a estrutura sugerida para as rotas do Expo e adaptei os arquivos à realidade da aplicação.
- Criei manualmente um arquivo de layout para envolver as rotas.
- Adicionei manualmente o provedor de tema da navegação, integrando-o ao design system já existente no projeto.
- Após a sugestão sobre `SearchRepositoriesParams`, refatorei manualmente a separação entre input e params para melhorar manutenção futura e identificação de pontos de quebra.
- Implementei a classe de formatação de datas com base na sugestão recebida, mas ajustando sua localização e integração ao restante da arquitetura.
- Na parte de busca de dados, eu já havia implementado a consulta manualmente. Como o arquivo mencionava o uso de React Query, utilizei a IA como apoio para entender a melhor forma de adaptar a biblioteca ao contexto do meu projeto, fazendo depois a integração e os ajustes necessários manualmente.
- Na parte de testes, usei a IA principalmente para revisar implementações, sugerir cenários complementares e conferir a coerência dos casos criados, sempre analisando e revisando cada sugestão antes de mantê-la.
- Usei auto-complete apenas em constantes simples, revisando o resultado antes de manter no código.
- Recusei assistência da IA na parte de injeção de dependências, pois considerei essa área específica demais e preferi implementá-la manualmente para manter maior controle e reduzir risco de erro.

## Justificativa das alterações

As alterações manuais foram feitas para garantir:

- aderência à arquitetura definida no projeto;
- compatibilidade com o design system existente;
- adaptação correta de bibliotecas ao contexto real da aplicação;
- separação mais clara de responsabilidades entre camadas;
- melhor manutenção futura;
- maior confiança em partes sensíveis da aplicação, como injeção de dependências e testes.

## Reflexão sobre o uso de IA

A IA foi utilizada como ferramenta de apoio para brainstorming, revisão de implementação, organização e ganho de produtividade, mas não substituiu a análise técnica nem a tomada de decisão. Em pontos como a adoção do React Query e a construção dos testes, ela serviu principalmente como suporte para revisão, comparação de abordagens e sugestão de melhorias, enquanto a adaptação ao contexto real do projeto e a validação final permaneceram sob minha responsabilidade. Dessa forma, o código final reflete meu entendimento das soluções implementadas e não uma adoção automática das respostas geradas.
