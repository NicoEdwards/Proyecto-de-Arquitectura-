# Deno + TypeScript + MongoDB

This template was created manually.

---

## Development Instructions

1. Prepare Code

- `deno task install`: Install all dependencies
- `deno task update`: Update all dependencies
- `deno task format`: Run formatter
- `deno task lint`: Run linter and base typechecking

2. Prepare Database

- `docker compose up -d`: Launch database

3. Launch App

- copy `.env.dev` to `.env`: Create .env file
- `deno task dev`: Run app in development mode
- "http://localhost:8000/api": Access api
- "http://localhost:8081": "Access mongo-express"

## Production Demo

- "https://cris-proyectoppr-86.deno.dev/api": Access api
