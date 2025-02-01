## Getting Started

Make sure you have `.env.local` filee

**.env.local**

Check [here](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#exposing-environment-variables-to-the-browser) for why we add prefix to env vars

```bash
NEXT_PUBLIC_SCHEMA_PATH=http://localhost:3000/api/graphql
NEXT_PUBLIC_GHN_PATH=https://online-gateway.ghn.vn
```
s
Run commands to start development environment

```bash
pnpm i
```

```bash
pnpm generate
```

```bash
pnpm dev
```

App starts at [http://localhost:3000](http://localhost:3000).

## GraphQL

- You can put your GraphQL Language (gql) anywhere, but it's recommended to put it in `src/graphql` folder. 
- Run the following command. This will get the schema from the server and generate the types for you. Then you can call `useYourQueryName` to fetch/mutate data.

```bash
pnpm generate
```

## UI library

- https://www.radix-ui.com/themes/docs/overview/getting-started
- https://www.radix-ui.com/primitives/docs/overview/introduction


## Code Structure and Routing
- We use `next.js` App Router (not Page Router) for routing: read this carefully to understand the Code Structure and Routing: https://nextjs.org/docs/app/building-your-application/routing

- In UI development, the terms "Container", "Page", and "Component" are often used to describe different types of components based on their responsibilities and usage. Here's a brief explanation of each:

  - **Component (Pure UI no data load):** This is the most basic building block of a UI. A component is a reusable piece of UI that encapsulates its own styles and behaviors. Examples of components might include buttons, inputs, cards, etc.

  - **Container (Components with data load):** A container is a type of component that is primarily concerned with how things work. It usually doesn't contain any direct markup or styles. Instead, it provides data and behavior to presentational or other container components. Containers are often stateful and serve as the connection between Redux, or other state management libraries, and the UI.

  - **Page (Containers and Components with layout):** A page is a component that represents a whole screen in the application. It's usually composed of multiple components and containers to form a complete piece of functionality. Pages are typically connected to routing, meaning different routes will render different pages.

- Understand the above definitions and break down your UI wisely 🙏

## Complex State Management
- We use Recoil for complex state management: https://recoiljs.org/. We may want to move to Zustand since Recoil is not yet stable.
- This simplifies the state management and makes it easier to manage the state across the Application level. You can still do the *useContext + reducer* pattern for simple state management (which is also preferred).