# Dokumentasi Implementasi API Laravel

## Overview

Implementasi API Laravel untuk aplikasi Nuxt Dispora telah selesai. Semua endpoint yang tersedia sudah terintegrasi ke dalam aplikasi.

## File yang Dibuat/Diupdate

### 1. Composables

- **`composables/useAuth.ts`** - Authentication management
- **`composables/useSettings.ts`** - Settings/profile management

### 2. Middleware

- **`middleware/auth.ts`** - Protected routes middleware
- **`middleware/guest.ts`** - Guest routes middleware

### 3. Plugin

- **`plugins/auth.client.ts`** - Client-side auth initialization

### 4. Type Declarations

- **`types/nuxt.d.ts`** - TypeScript declarations

### 5. Halaman yang Diupdate

- **`app/pages/login.vue`** - Login dengan API Laravel
- **`app/pages/home.vue`** - Profile info dari API
- **`app/pages/profile/pengaturan.vue`** - Settings terintegrasi API
- **`app/pages/profile/index.vue`** - Logout dengan API
- **`app/pages/index.vue`** - Redirect logic

## Fitur yang Bekerja

### Authentication

- ✅ Login dengan API Laravel
- ✅ Logout dengan API Laravel
- ✅ Auto-redirect berdasarkan status login
- ✅ Token management dengan localStorage
- ✅ Protected routes dengan middleware

### Profile Management

- ✅ Update profile (nama, email)
- ✅ Change password dengan validasi
- ✅ Reset password via email
- ✅ Delete account dengan konfirmasi

### API Endpoints yang Digunakan

- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/settings/profile` - Update profile
- `PUT /api/settings/password` - Change password
- `POST /api/settings/reset-password` - Reset password
- `DELETE /api/settings/account` - Delete account

## Cara Penggunaan

### 1. Login

```typescript
const { login, isLoading } = useAuth()

await login({
  email: 'user@example.com',
  password: 'password123',
})
```

### 2. Update Profile

```typescript
const { updateProfile } = useSettings()

await updateProfile({
  name: 'Nama Baru',
  email: 'email@baru.com',
})
```

### 3. Change Password

```typescript
const { changePassword } = useSettings()

await changePassword({
  old_password: 'password123',
  new_password: 'password456',
  confirm_password: 'password456',
})
```

### 4. Logout

```typescript
const { logout } = useAuth()

await logout()
```

## Middleware Usage

### Protected Routes

```typescript
definePageMeta({
  middleware: 'auth',
})
```

### Guest Routes

```typescript
definePageMeta({
  middleware: 'guest',
})
```

## Error Handling

Semua API calls sudah dilengkapi dengan error handling yang proper:

- Error messages ditampilkan ke user
- Loading states untuk semua actions
- Fallback behavior jika API gagal

## Security Features

- Token disimpan di localStorage
- Auto-clear token saat logout
- Protected routes redirect ke login
- Guest routes redirect ke home jika sudah login

## Testing

Untuk testing, gunakan kredensial yang sudah tersedia di API Laravel:

- Email: `superadmin@gmail.com`
- Password: `Sewdaq123`

## Notes

- Pastikan Laravel API berjalan di `http://localhost:8000`
- Token akan expired setelah 7 hari
- Semua requests menggunakan Bearer Token authentication
- Rate limiting sudah dikonfigurasi di backend Laravel
