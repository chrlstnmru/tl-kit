<div align="center">
  <img src="https://media.discordapp.net/attachments/1150257501602848808/1205544303347241001/tl-kit.png?ex=65d8c19f&is=65c64c9f&hm=36ec606fe492caed9bb3a18ee0d47844b41675f9fbe32c0ea90fa9434fc940e1&=&format=webp&quality=lossless" width="400" alt="Logo for TL Kit">
</div>
<p align="center">
  A boilerplate SvelteKit app for end-to-end typesafe API.
</p>

## About

The _"TL Kit"_ is a web development stack inspired by [T3 Stack](https://create.t3.gg/) by [Theo](https://twitter.com/t3dotgg), and is consist of:

- [SvelteKit](https://kit.svelte.dev/)
- [tRPC-SvelteKit](https://icflorescu.github.io/trpc-sveltekit)
- [TailwindCSS](https://tailwindcss.com/)
- [Typescript](https://typescriptlang.org)
- [DrizzleORM](https://orm.drizzle.team/)
- [Lucia](https://lucia-auth.com/)

This features both fast and typesafe API endpoints for SvelteKit, and a simple and easy to use authentication provider by Lucia. 

## Getting started

To get started, simply clone the repository and install the dependencies by running the command:

```bash
pnpm install
```

Duplicate the `.env.example` and rename it to `.env`. Make sure to fill out the environment variables.

You can add more auth provider by following the guide on [Lucia](https://lucia-auth.com/guides).