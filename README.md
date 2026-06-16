# Blog API

A modular REST API for a blog platform built with NestJS.

It includes authentication, role-based access control, posts and tags management, validation, global error handling, logging, and Swagger documentation. The project follows a scalable backend architecture with clear separation of concerns.

---

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication (Access + Refresh tokens)
- bcrypt password hashing
- class-validator / class-transformer
- @nestjs/swagger

---

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

---

### Blog Features

- CRUD for posts
- CRUD for tags
- Many-to-many relation between posts and tags
- Pagination for posts
- DTO validation for all inputs

---

### Architecture

- Modular NestJS structure (Auth / Users / Posts / Tags)
- Prisma ORM with PostgreSQL
- Global exception filter
- Logging interceptor
- DTO-based validation layer
- Swagger API documentation
- Clear separation: Controller / Service / DB layer

---

## Getting Started

### 1. Clone repository

```bash
git clone https://github.com/viirtualp1/blog-api.git
cd blog-api
npm install
```
