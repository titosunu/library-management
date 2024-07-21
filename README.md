# Library Management System

Library Management System API, built using Node.js, Express, Swagger, Prisma ORM, and MySQL.

## Installation

1. Clone repositori:
   ```sh
   git clone https://github.com/titosunu/library-management
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up database
   Perbarui URL koneksi database di prisma/.env & jalankan migrasi prisma

4. Start the server
   npm run dev

## Swagger

The API will run on the server at http://localhost:3000. Check the API endpoints using Swagger at /api-docs.

## Endpoint API

### Books

- GET /books (Retrieve a list of all books)
- GET /books/:code (Retrieve details of a specific book by code)
- POST /books (Create a new book)
- DELETE /books/:code (Delete a book by code)
- PATCH /books/:code (Edit a book by code)

### Members

- GET /members (Retrieve a list of all members along with the number of books they have borrowed)
- GET /members/:code (Retrieve details of a specific member by code)
- POST /members (Create a new member)
- DELETE /members/:code (Delete a member by code)
- PATCH /members/:code (Edit a member by code)

### Borrow

- POST /borrow (Borrow a book. Requires memberId and bookId)

### Return

- POST /return (Return a borrowed book. Requires memberId and bookId)
## Schema

### Member

```graphql
model Member {
  code           String         @id @default(uuid())
  name           String
  borrowedBooks  BorrowedBook[]
  penaltyEndDate DateTime?
}
```

### Book

```graphql
model Book {
  code       String         @id @default(uuid())
  title      String
  stock      Int
  borrowedBy BorrowedBook[]
}
```

### BorrowedBook

```graphql
model BorrowedBook {
  id         Int      @id @default(autoincrement())
  memberId   String
  bookId     String
  borrowedAt DateTime @default(now())

  member     Member   @relation(fields: [memberId], references: [id])
  book       Book     @relation(fields: [bookId], references: [id])
}
```

<h3 align="left">Languages and Tools:</h3>
<p align="left"><a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFRztssUmVkQcDl8a8Jd4u8mZxOjX5jydMQA&s" alt="express" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><a href="https://www.prisma.io/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/prisma/presskit/main/Assets/Preview-Prisma-DarkLogo.png" alt="prisma" width="95" height="40"/> </a> <a href="https://swagger.io/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/swagger-api/swagger.io/wordpress/images/assets/SWU-logo-clr.png" alt="swagger" width="130" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> </p>
