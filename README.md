# Library Management System

Proyek ini adalah Backend test sebuah API Sistem Manajemen Perpustakaan, yang dibangun menggunakan Node.js, Express, Swagger, Prisma ORM, dan MySql. API ini memungkinkan member untuk meminjam dan mengembalikan buku dengan berbagai batasan dan melacak buku-buku dan member. **Untuk Soal algoritma berada di folder algorithms**.

## Instalasi

1. Clone repositori:
   ```sh
   git clone https://github.com/titosunu/backend-test
   ```
2. Jalankan server:
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

### Buku (Books)

- **GET /books**

  - Mendapatkan daftar semua buku.

- **GET /books/:code**

  - Mendapatkan detail buku spesifik berdasarkan kode.

- **POST /books**

  - Membuat buku baru.

- **DELETE /books/:code**

  - Menghapus buku berdasarkan kode.

- **PATCH /books/:code**
  - Mengedit buku berdasarkan kode.

### Anggota (Members)

- **GET /members**

  - Mendapatkan daftar semua anggota beserta jumlah buku yang mereka pinjam.

- **GET /members/:code**

  - Mendapatkan detail anggota spesifik berdasarkan kode.

- **POST /members**

  - Membuat anggota baru.

- **DELETE /members/:code**

  - Menghapus anggota berdasarkan kode.

- **PATCH /members/:code**
  - Mengedit anggota berdasarkan kode.

### Meminjam (Borrow)

- **POST /borrow**
  - Meminjam buku. Membutuhkan \`memberId\` dan \`bookId\`.

### Mengembalikan (Return)

- **POST /return**
  - Mengembalikan buku yang dipinjam. Membutuhkan \`memberId\` dan \`bookId\`.
