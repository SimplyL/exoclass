## React exoclass app

### How to run the project

Install the dependencies and start the server, which is used as a proxy to bypass browser CORS restrictions and for mocked auth.

```sh
npm i
npm run dev:server
```

Open another terminal and start the client.

```sh
npm run dev
```

Mocked user login information can be found/adjusted in .env file.

#### Main technologies

- React
- Typescript
- Zustand - for data store
- Chakra-ui - as base components
- Vite

#### Project structure

```sh
-server
-src
    -components (For dumb components)
        -component-name
            -components (component specific subcomponents)
            -hooks (if relevant)
            -defaults (if relevant for constants)
            -helpers (if relevant for constants)
            -interfaces (if relevant component specific interfaces)
            -types (if relevant component specific interfaces)
            component-name.component.tsx
            component-name.styles.ts
            index.tsx
    -modules (For pages and logic heavy components, same structure as components)
    -interfaces (shared interfaces)
    -types (shared types)
    -helpers (shared helpers)
    -defaults (shared defaults)
    -api (shared api configurtion)
    -theme (component style overrides)
    -defaults (shared defaults)
    -hooks (shared hooks)
    store.ts (zustand data store)
    App.tsx (Router)
...other configuration files
```
