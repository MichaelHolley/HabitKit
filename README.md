# Ascent

[![Build & Publish](https://github.com/MichaelHolley/Ascent/actions/workflows/nixpacks_publish.yml/badge.svg?branch=main)](https://github.com/MichaelHolley/Ascent/actions/workflows/nixpacks_publish.yml)

A simple and intuitive app to track, build, and maintain your habits for a better you!

![ascent michaelholley de_ (1)](https://github.com/user-attachments/assets/e05f0eed-e120-4430-b6b6-0968644a5e8b)

## Running locally

Start the database:
`pnpm db:start`

Generate Prisma Client:
`pnpm prisma:generate`

Migrate the database:
`pnpm prisma:migrate-dev`

Start the web server:
`pnpm dev`

## Deployment

### `docker-compose.yml`

```yml
services:
  ascentweb:
    image: mpholley/ascent:latest
    restart: always
    ports:
      - 3000:3000
    depends_on:
      - db
    environment:
      - DATABASE_URL=mysql://root:mysecretpassword@db:3306/Ascent
      - ORIGIN=
  db:
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: mysecretpassword
      MYSQL_DATABASE: Ascent
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```
