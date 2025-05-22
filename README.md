# MTT-CMS Penyaluran Hewan Kurban

## Deskripsi
Aplikasi ini merupakan CMS berbasis Strapi untuk penyaluran hewan kurban dengan plugin khusus `kurban-distribution`.

---

## Instalasi dan Setup

### 1. Clone Repository
```bash
git clone https://github.com/Stradivary/mtt-cms.git
cd mtt-cms
```

### 2. Setup Plugin `kurban-distribution`
Plugin ini berada di folder `src/plugins/kurban-distribution`. Pastikan langkah-langkah berikut dilakukan di dalam folder plugin sebelum menjalankan aplikasi utama:

```bash
cd src/plugins/kurban-distribution
npm install
npm run build
npm run watch
```

### 3. Kembali ke folder utama aplikasi Strapi
```bash
cd ../../../
npm install
npm run develop
# atau jika menggunakan yarn
yarn develop
```

---

## Menjalankan Aplikasi

Setelah menjalankan perintah `npm run develop` atau `yarn develop`, buka browser dan akses:

```
http://localhost:1337
```

Anda akan disuguhkan halaman login. Untuk username dan password dapat diminta dari admin.

---

## Mengakses Plugin Kurban-Distribution

Setelah login, Anda dapat mengakses plugin:

- Lewat menu admin klik **kurban-distribution**
- Atau langsung ke URL:

```
http://localhost:1337/admin/plugins/kurban-distribution
```

---

## Catatan

- Pastikan plugin `kurban-distribution` sudah terbuild dan sedang dalam mode watch sebelum menjalankan aplikasi utama.
- Plugin ini menggunakan middleware dan routes kustom yang diatur dalam folder plugin.
- Pastikan permission API dan roles sudah diatur dengan benar di dashboard admin.

---

Terima kasih telah menggunakan aplikasi ini.
