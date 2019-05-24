Aplikasi pendataan amal sukarela client side dengan React dan server side dengan Nodejs dan Expressjs untuk menampilkan operasi CRUD(Create, Read, Update, Delete) dan Authentication.

## Getting Started

Untuk client side terdapat langsung pada folder utama react-express dan untuk server side dapat ditemukan di folder server.
Sebelum memulai project ini diharapkan telah menginstall nodejs dan mysql DB terlebih dahulu.

### Initial Setup

Clone terlebih dahulu project ini pada directory yang diinginkan dan install dependencies pada project client side dan server side:

```
cd react-express
npm install 
cd server
npm install
```

Pada project backend yaitu pada file yang terdapat pada `/server/app/config.env.js` perlu dilakukan penyesuaian pada bagian `database, username, password dan localhost` diisi disesuaikan dengan pengaturan koneksi database mysql. Sebagai contoh dibawah ini diisi dengan `database=test, username=root, password= , host=localhost`

```
const env = {
    database: 'test',
    username: 'root',
    password: '',
    host: 'localhost',
    ...
};
  ```

Untuk mencreate database jalankan perintah berikut:
```
CREATE DATABASE crud_db;
```

### Run the Project

Pada directory project ini anda dapat langsung menjalankan project client dengan cara `npm start` dan lihat hasilnya di browser pada alamat `http:localhost:3000`. Setelah itu tampilan project akan digiring ke halaman login jika user belum melakukan login.
Silahkan login dengan username `test` dan password `test`, selanjutnya dapat membuat member baru, mengedit member, menghapus member serta menampilkan semua member yang ada.

Setelah itu masuk ke directory `server` di folder server dan jalankan dengan perintah `node server.js` yang akan berjalan di url `http:localhost:8081`.

Ketika menjalankan project server dan database telah dibuat maka table user dan table member akan generate secara otomatis dan terisi beberapa data secara acak.