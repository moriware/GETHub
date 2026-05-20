# Arquitetura do Projeto

## Visão geral

Este projeto segue **Clean Architecture** adaptada para Expo/React Native, com separação clara entre:

- regras de negócio puras;
- orquestração de casos de uso;
- integrações externas (API, cache, storage);
- UI (telas, hooks e componentes).

A aplicação usa `expo-router` para rotas, `@tanstack/react-query` para dados assíncronos/cache e `AsyncStorage` para persistência do cache de queries.

## Estrutura real (resumo)

```text
src/
  app/                  # Entrada do Expo Router (rotas por arquivo)
  core/                 # Providers e navegação
  domain/               # Entidades, contratos e value objects
  application/          # Use cases e serviços de aplicação
  infrastructure/       # HTTP, APIs, repositórios, mappers, DI, cache e storage
  presentation/         # Screens, hooks, componentes e view-models
  design/               # Tokens e temas tipados
  shared/               # Constantes, tipos e utilitários compartilhados
tests/                  # Unit, integration e component tests
```

## Camadas e responsabilidades

### 1) Domain (`src/domain`)

Contém apenas regras e contratos, sem dependência de React Native, React Query, Axios ou AsyncStorage.

- `entities`: `Repository`, `Issue`, `Owner`
- `contracts`: `IRepositoryRepository`, `IIssueRepository`
- `value-objects`: `Pagination`, `Result`
- `errors`: `DomainError`

Objetivo: ser executável e testável em ambiente Node puro.

### 2) Application (`src/application`)

Orquestra o domínio por meio de casos de uso.

- `use-cases/repositories/SearchRepositoriesUseCase`
- `use-cases/repositories/GetRepositoryDetailsUseCase`
- `use-cases/issues/GetRepositoryIssuesUseCase`
- `services/DateFormatterService`

Regra: use case depende de contrato do domínio, nunca da implementação concreta de infraestrutura.

### 3) Infrastructure (`src/infrastructure`)

Implementa detalhes externos.

- `http/client`: cliente HTTP base (Axios)
- `api/github`: chamadas da API do GitHub
- `repositories`: implementação dos contratos do domínio
- `mappers`: conversão API -> domínio
- `cache/app-query-client`: configuração do React Query, persist/hydrate, online/focus manager
- `storage`: adapter para `@react-native-async-storage/async-storage`
- `di/container.ts`: composição das dependências concretas

### 4) Presentation (`src/presentation`)

Camada de interface.

- `screens`: Home, Details, Issues e Design System
- `hooks`: hooks de dados (React Query) que chamam os use cases via container
- `components`: UI reutilizável + primitives (`AppView`, `AppPressable`, `AppFlatList`)
- `view-models`: contratos de dados prontos para renderização

Regra: tela/componente não chama API diretamente.

### 5) Core e App (`src/core` e `src/app`)

Coordenação da aplicação.

- `src/app/_layout.tsx`: ponto de montagem dos providers
- `core/providers`: tema, safe area, navigation theme e query provider
- `core/navigation/RootNavigator.tsx`: stack, opções globais e botão de atalho para Design System
- `src/app/...`: arquivos de rota do Expo Router

## Fluxo de dados (exemplo real)

### Busca de repositórios

1. `HomeScreen` dispara `useSearchRepositories`.
2. O hook usa `useInfiniteQuery` com `queryKey` de busca.
3. O `queryFn` chama `fetchSearchRepositoriesPage(...)`.
4. Essa função chama `container.useCases.searchRepositories.execute(...)`.
5. O use case usa `IRepositoryRepository`.
6. A implementação concreta (`GithubRepositoryRepository`) consulta `GithubRepositoryApi`.
7. O mapper converte retorno da API para entidade de domínio.
8. Hook converte domínio para view-model e a tela renderiza.

### Detalhes e issues

O padrão é o mesmo:

- hook (`useRepositoryDetails` / `useRepositoryIssues`)
- use case
- contrato de domínio
- repositório concreto
- API GitHub
- mapper
- retorno para view-model/tela

## Estado assíncrono e cache

Implementação em `infrastructure/cache/app-query-client`:

- `QueryClient` com defaults de `staleTime`, `gcTime` e retry;
- persistência com `dehydrate(...)` -> `AsyncStorage`;
- restauração com `hydrate(...)` no boot;
- `onlineManager` ligado ao `expo-network`;
- `focusManager` ligado ao `AppState`.

O `QueryProvider` hidrata o cache antes de renderizar a árvore principal.

## Tema e design system

Tema tipado em `src/shared/types/theme.ts` e tokens em `src/design/tokens`.

- `lightTheme` e `darkTheme` em `src/design/theme`.
- `ThemeProvider` controla modo atual.
- `NavigationThemeProvider` aplica as cores ao React Navigation.

## Princípios aplicados no projeto

- **Inversão de dependência**: use cases dependem de interfaces de domínio.
- **Domínio isolado**: domínio sem acoplamento a frameworks.
- **Separação por camadas**: UI não conhece API/Storage diretamente.
- **Composição no limite**: wiring de concretos no `container.ts`.

## Convenções de organização

- Separação por arquivo de `*.ts` (funções), `*.types.ts` (tipos) e `*.tsx` (componente/tela) quando aplicável.
- Estilos extraídos para `*.styles.ts`.
- Regras de query centralizadas em `queryKeys` para consistência.

## Testes

Pasta `tests/` organizada em:

- `unit/application/use-cases`: valida regras de negócio.
- `integration/repositories`: valida integração entre repository + mapper + api mockada.
- `component/design-system`: valida comportamento de componentes de UI.

Cobertura é gerada via Jest e scripts em `package.json` (`test`, `test:coverage`).
