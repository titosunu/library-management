# Library Management System

Proyek ini adalah Backend test sebuah API Sistem Manajemen Perpustakaan https://github.com/eigen3dev/backend-test-case, yang dibangun menggunakan Node.js, Express, Swagger, Prisma ORM, dan MySql. **Untuk Soal algoritma berada di folder algorithms**.

## Instalasi

1. Clone repositori:
   ```sh
   git clone https://github.com/titosunu/backend-test
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
