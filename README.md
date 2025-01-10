> [!WARNING]  
> WIP - This repo is still work in progress. Issues during app-usage may occur.

# HabitKit

A simple and intuitive app to track, build, and maintain your habits for a better you!

![habitkit](https://github.com/user-attachments/assets/e4a30e41-c3ef-4c49-9214-1ef533fe2f9a)

## Running locally

Start the database:
`pnpm run db:start`

Generate Prisma Client:
`pnpm run prisma:generate`

Migrate the database:
`pnpm run prisma:migrate-dev`

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
