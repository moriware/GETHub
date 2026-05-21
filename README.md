# GETHub

Aplicativo React Native (Expo) para buscar repositórios no GitHub, visualizar detalhes e listar issues abertas.

## Documentação complementar

- Arquitetura detalhada: [docs/architecture.md](docs/architecture.md)
- Declaração de uso de IA: [docs/ai-usage.md](docs/ai-usage.md)

## Stack principal

- Expo SDK 55 + React Native 0.83
- Expo Router (file-based routing)
- TanStack React Query (cache, paginação e sincronização de dados)
- Axios (cliente HTTP)
- AsyncStorage (persistência do cache de queries)
- Jest + Testing Library (testes unitários, integração e componentes)

## Instalação e execução

### Pré-requisitos

- Node.js 20+
- npm 10+
- Expo CLI via `npx`
- Android Studio (emulador Android) ou Xcode (simulador iOS, macOS)

### 1) Instalar dependências

```bash
npm install
```

### 2) Configurar variáveis de ambiente (opcional, mas recomendado)

O app funciona sem token, porém pode atingir limite de rate do GitHub mais rapidamente.

```bash
EXPO_PUBLIC_GITHUB_TOKEN=seu_token_aqui
EXPO_PUBLIC_GITHUB_BASE_URL=https://api.github.com
```

Você pode exportar no shell ou usar `.env` compatível com Expo.

### 3) Rodar o projeto

```bash
npm run start
```

Atalhos úteis:

```bash
npm run android
npm run ios
npm run web
```

## Scripts úteis

```bash
npm run lint
npm run test
npm run test:watch
npm run test:coverage
```

## Decisões arquiteturais

### Por que Clean Architecture?

O projeto foi estruturado para separar claramente regras de negócio de framework, UI e integrações externas.  
Isso permite:

- evoluir UI e infraestrutura com menor impacto no domínio;
- testar use cases em isolamento;
- trocar implementação de API/cache/storage com menor acoplamento.

### Como está aplicado

- `domain`: entidades, contratos e regras puras.
- `application`: casos de uso e serviços de aplicação.
- `infrastructure`: HTTP, APIs, repositórios concretos, mappers, DI e cache.
- `presentation`: telas, hooks e componentes.
- `core`/`app`: providers, navegação e entrada do Expo Router.

Detalhes completos em: [docs/architecture.md](docs/architecture.md)

### Trade-offs assumidos

- Mais arquivos/boilerplate para recursos simples.
- Curva de aprendizado maior para onboarding inicial.
- Ganho de manutenção no médio/longo prazo, principalmente em testes e evolução de features.

## Declaração de uso de IA

Resumo objetivo:

- Gerado com apoio de IA: parte de estrutura inicial de rotas, sugestões de organização de camadas, revisão de testes, sugestões de textos e ajustes repetitivos.
- Adaptado manualmente: integração real com React Query, ajustes de arquitetura ao contexto do app, decisões de tema/navegação, refinamento de hooks e contratos.
- Rejeitado: sugestões que aumentavam acoplamento ou fugiam da organização definida (especialmente em pontos sensíveis como DI e fronteiras entre camadas).

Versão completa e detalhada em: [docs/ai-usage.md](docs/ai-usage.md)

## O que eu faria diferente com mais tempo

- Adicionaria testes E2E (ex.: Detox) para fluxos principais.
- Criaria contratos de erro mais ricos (tipos de erro por cenário/API).
- Melhoraria observabilidade (logs estruturados e tracing de falhas de rede/cache).
- Evoluiria acessibilidade e internacionalização para além do português.
- Adicionaria CI com gates de cobertura mínima por camada.
