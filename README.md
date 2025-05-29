

---

## ✅ LANGKAH LENGKAP: Website React ke Aplikasi Android APK

### 1. **Build React App (Vite)**

Buka terminal di folder project kamu, lalu jalankan:

```bash
npm install
npm run build
```

📁 Ini akan menghasilkan folder `dist/` berisi website yang sudah siap dibungkus jadi aplikasi.

---

### 2. **Install Capacitor dan Inisialisasi**

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

✅ Saat `npx cap init`, isi:

* **Name**: Nama aplikasimu (misal: `Portofolio Nugra`)
* **Package ID**: Format domain terbalik, misalnya: `com.ludang.portofolio`

---

### 3. **Pasang Platform Android**

```bash
npm install @capacitor/android
npx cap add android
```

> Ini akan membuat folder `android/` di project kamu

---

### 4. **Copy File Web ke Android**

```bash
npx cap copy
```

> Ini menyalin hasil dari folder `dist/` ke aplikasi Android

---

### 5. **Buka Proyek Android di Android Studio**

```bash
npx cap open android
```

> Android Studio akan terbuka dan memuat proyek Android-mu

---

### 6. **Build APK di Android Studio**

Setelah Android Studio terbuka:

1. Tunggu Gradle selesai sync
2. Klik menu **`Build`** → **`Generate App Bundles or APKs`** → **`Build APK(s)`**
3. Tunggu proses selesai

Setelah selesai, akan muncul notifikasi:

> ✅ APK(s) generated successfully — Klik **Locate**

---

### 7. **Temukan File APK**

File APK bisa ditemukan di:

```
<project_folder>/android/app/build/outputs/apk/debug/app-debug.apk
```

Atau langsung klik tombol **Locate** di Android Studio saat build selesai.

---

### 8. **Install APK di HP Android**

1. Kirim file APK ke HP kamu
2. Aktifkan "Install dari sumber tidak dikenal"
3. Buka file APK dan install

---

## 🔧 (Opsional) Kustomisasi Aplikasi:

* 🔁 Ubah **nama & ikon** aplikasi
* 🌊 Tambah **splash screen**
* 🛡️ Build **Signed APK** untuk upload ke Play Store

