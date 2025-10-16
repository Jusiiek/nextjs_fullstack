## Next.js Fullstack Test App
This application was created to test the capabilities of Next.js as a full-stack application framework – with authentication (NextAuth), 
user support, a PostgreSQL database (Docker), a backend (API/server actions), and a responsive frontend.

Key Features:
* Authentication with NextAuth.js (Credentials Provider)
* User management: listing users, viewing user details
* Backend API with Next.js App Router and server actions
* PostgreSQL database using docker-compose
* Prisma ORM
* Modern UI styling with Mantine, including a frosted glass navigation drawer
* Dockerized setup: launch everything with a single command

Purpose:
A test project for rapid prototyping and exploring the modern Node.js stack using Next.js 14+ (App Router), backend processing, frontend UI, and production/dev environment setup with Docker.

### Run the project locally

Users for test you will find in src/scripts/loadUsers.ts

###### First way

Use Docker and docker-compose to build the entire application in containers and wait for a successful build.
From the root directory of the application, run the command:
```bash
  docker-compose up -d
```

Since there is no registration, you need to load test fixtures.
You need to enter the API container:
```bash
  docker ps | grep front_back-app
```
Copy the container id
and use the command:
```bash
  docker exec -ti <container-id> sh
```
Apply migrations:
```bash
  sh docker-entrypoint.sh
```
and load fixtures:
```bash
  npm run load_fixtures
```

You should see information about the users being added to the database in the console:

```
Inserted users created!
```

Exit the container with the command 'exit' and you’re done. The web application is available locally at http://localhost:3000/


###### Second way

Build only the postgres container

```bash
  docker-compose up -d db
```

Install packages:
```bash
  npm install
```
Apply migrations:
```bash
  npx prisma migrate dev --name init
  npx prisma generate
```
and load fixtures:
```bash
  npm run load_fixtures
```

Finally run dev:
```bash
  npm run dev
```
