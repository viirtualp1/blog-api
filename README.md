# Blog API

A simple REST API for a blog website

Includes CRUD for posts and tags, DTO validation, a global exception filter, a logging interceptor, and Swagger documentation

## Tech Stack

- NestJS
- TypeScript
- class-validator / class-transformer
- @nestjs/swagger

## Getting Started

```bash
git clone https://github.com/viirtualp1/blog-api.git
cd blog-api
npm install

npm run start:dev
```

API runs on `http://localhost:3000`. Swagger docs are available at `http://localhost:3000/api`.

## Endpoints

### Posts

| Method | Path                   | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | /posts?page=1&limit=10 | List posts (paginated) |
| GET    | /posts/:id             | Get a post by ID       |
| POST   | /posts                 | Create a post          |
| PATCH  | /posts/:id             | Update a post          |
| DELETE | /posts/:id             | Delete a post          |

### Tags

| Method | Path  | Description  |
| ------ | ----- | ------------ |
| GET    | /tags | List tags    |
| POST   | /tags | Create a tag |

### Example request

```http
POST /posts
Content-Type: application/json

{
  "title": "Learning NestJS",
  "content": "Today I worked through dependency injection and the request lifecycle...",
  "tagIds": [1, 2]
}
```

### Example error response

```json
{
  "statusCode": 404,
  "message": "Post with id 5 not found",
  "timestamp": "2026-06-15T10:32:00.000Z",
  "path": "/posts/5"
}
```

## Notes

Data is stored in memory for now

A persistent database (PostgreSQL via Prisma/TypeORM) is planned as the next step, along with authentication, Redis caching, and Docker support
