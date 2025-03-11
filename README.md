## Client 
cd client

## Persyaratan Sistem
- Node js 20+


## Step 1 
```bash
npm install
# or
yarn
```
## Step 2

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Backend 
cd backend
## Persyaratan Sistem

- Go (versi 1.x atau lebih tinggi)
- PostgreSQL
- Postgres driver untuk Go (`github.com/lib/pq`)

## Instalasi

### 1. Instalasi Go
Pastikan Go telah terinstal di sistem Anda. Anda dapat mengunduhnya di [https://golang.org/dl/](https://golang.org/dl/).

### 2. Menginstal PostgreSQL
Pastikan PostgreSQL telah terinstal dan berjalan di sistem Anda. Jika PostgreSQL belum terinstal, Anda bisa mengunduhnya dari [situs resmi PostgreSQL](https://www.postgresql.org/download/).

### 3. Instalasi Dependensi
jalankan `go mod init` untuk menginisialisasi proyek Go dan `go get` untuk menginstal dependensi yang diperlukan, seperti driver PostgreSQL (`pq`). serta `go mod tidy`

## 4. Tambahkan file .env 
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
PORT=8080
GIN_MODE=debug

