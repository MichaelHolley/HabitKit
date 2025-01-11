> [!WARNING]  
> WIP - This repo is still work in progress. Issues during app-usage may occur.

# HabitKit

[![Build & Publish](https://github.com/MichaelHolley/HabitKit/actions/workflows/nixpacks_publish.yml/badge.svg?branch=main)](https://github.com/MichaelHolley/HabitKit/actions/workflows/nixpacks_publish.yml)

A simple and intuitive app to track, build, and maintain your habits for a better you!

![image](https://github.com/user-attachments/assets/1fcd0733-f82f-474f-a1b5-844f9167aae8)

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
  habitkitweb:
    image: mpholley/habitkit:latest
    restart: always
    ports:
      - 3000:3000
    depends_on:
      - db
    environment:
      - DATABASE_URL=mysql://root:mysecretpassword@db:3306/HabitKit
      - ORIGIN=
  db:
    image: mysql
    restart: always
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: mysecretpassword
      MYSQL_DATABASE: HabitKit
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```
