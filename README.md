> [!WARNING]  
> WIP - This repo is still work in progress. Issues during app-usage may occur.

# HabitKit

A simple and intuitive app to track, build, and maintain your habits for a better you!

![image](https://github.com/user-attachments/assets/aa915619-9d38-40d7-bbe8-a5d9110f86f6)

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
