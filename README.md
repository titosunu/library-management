# Library Management System

API Sistem Manajemen Perpustakaan, yang dibangun menggunakan Node.js, Express, Swagger, Prisma ORM, dan MySql.

## Instalasi

1. Clone repositori:
   ```sh
   git clone https://github.com/titosunu/library-management
   ```
2. Instal dependencies:
   ```sh
   npm install
   ```
3. Set up database
   Perbarui URL koneksi database di prisma/.env & jalankan migrasi prisma

4. Jalankan Server
   npm run dev

## Swagger

Api akan berjalan di server http://localhost:3000. check endpoint api menggunakan swagger akses /api-docs.

## Endpoint API

### Books

- GET /books ( Mendapatkan daftar semua buku )
- GET /books/:code ( Mendapatkan detail buku spesifik berdasarkan kode )
- POST /books ( Membuat buku baru )
- DELETE /books/:code ( Menghapus buku berdasarkan kode )
- PATCH /books/:code ( Mengedit buku berdasarkan kode )

### Members

- GET /members ( Mendapatkan daftar semua anggota beserta jumlah buku yang mereka pinjam )
- GET /members/:code ( Mendapatkan detail anggota spesifik berdasarkan kode. )
- POST /members ( Membuat anggota baru )
- DELETE /members/:code ( Menghapus anggota berdasarkan kode )
- PATCH /members/:code ( Mengedit anggota berdasarkan kode )

### Borrow

- POST /borrow ( Meminjam buku. Membutuhkan \`memberId\` dan \`bookId\` )

### Return

- POST /return ( Mengembalikan buku yang dipinjam. Membutuhkan \`memberId\` dan \`bookId\` )

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
<p align="left"><a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="[https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg](https://camo.githubusercontent.com/f6128b6a17c28ec054b7ab67e595d39f503a0e17b116901141c05e1a1016985a/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67)" alt="express" width="95" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><a href="https://www.prisma.io/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/prisma/presskit/main/Assets/Preview-Prisma-DarkLogo.png" alt="prisma" width="95" height="40"/> </a> <a href="https://swagger.io/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/swagger-api/swagger.io/wordpress/images/assets/SWU-logo-clr.png" alt="swagger" width="95" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> </p>
