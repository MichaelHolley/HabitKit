# HabitKit

[![Build & Publish](https://github.com/MichaelHolley/HabitKit/actions/workflows/nixpacks_publish.yml/badge.svg?branch=main)](https://github.com/MichaelHolley/HabitKit/actions/workflows/nixpacks_publish.yml)

A simple and intuitive app to track, build, and maintain your habits for a better you!

![image](https://github.com/user-attachments/assets/a728cc12-88a3-4485-9cdb-92169214a5b8)

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
    environment:
      MYSQL_ROOT_PASSWORD: mysecretpassword
      MYSQL_DATABASE: HabitKit
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```
