This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_BASE_URL=

DATABASE_URL=
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=


# livekit

LIVEKIT_API_KEY =  
LIVEKIT_API_SECRET = 
NEXT_PUBLIC_LIVEKIT_URL = 
```

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
