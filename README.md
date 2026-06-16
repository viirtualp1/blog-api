# Blog API

A modular REST API for a blog platform built with NestJS.

It includes authentication, role-based access control, posts and tags management, validation, global error handling, logging, and Swagger documentation. The project follows a scalable backend architecture with clear separation of concerns.

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication (Access + Refresh tokens)
- bcrypt password hashing
- class-validator / class-transformer
- @nestjs/swagger

## Features

### Authentication & Security

- User registration and login
- Password hashing with bcrypt
- JWT Access Tokens (short-lived)
- JWT Refresh Tokens (long-lived)
- HttpOnly cookie-based refresh token storage
- Token rotation on refresh
- Logout with refresh token invalidation
- Role-based access control (RBAC)
- Protected routes using guards
- Passport JWT strategy

### Blog Features

- CRUD for posts
- CRUD for tags
- Many-to-many relation between posts and tags
- Pagination for posts
- DTO validation for all inputs

### Architecture

- Modular NestJS structure (Auth / Users / Posts / Tags)
- Prisma ORM with PostgreSQL
- Global exception filter
- Logging interceptor
- DTO-based validation layer
- Swagger API documentation
- Clear separation:
  - Controllers handle HTTP layer
  - Services contain business logic
  - Prisma handles database layer

## Getting Started

### 1. Clone repository

```bash
git clone https://github.com/viirtualp1/blog-api.git
cd blog-api
npm install
```

### 2. Environment variables

Create `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/blog

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

### 3. Prisma setup

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Run project

```bash
npm run start:dev
```

Server runs at:

```
http://localhost:3000
```

Swagger documentation:

```
http://localhost:3000/api
```

## API Endpoints

### Auth

| Method | Endpoint       | Description    |
| ------ | -------------- | -------------- |
| POST   | /auth/register | Register user  |
| POST   | /auth/login    | Login user     |
| POST   | /auth/refresh  | Refresh tokens |
| POST   | /auth/logout   | Logout user    |

### Posts

| Method | Endpoint   | Description         |
| ------ | ---------- | ------------------- |
| GET    | /posts     | Get paginated posts |
| GET    | /posts/:id | Get post by id      |
| POST   | /posts     | Create post         |
| PATCH  | /posts/:id | Update post         |
| DELETE | /posts/:id | Delete post         |

### Tags

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET    | /tags    | Get tags    |
| POST   | /tags    | Create tag  |
