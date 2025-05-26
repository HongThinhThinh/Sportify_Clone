# 🔑 Hướng dẫn lấy Client Secret cho Spotify API

## Tại sao cần Client Secret?

Để sử dụng **Client Credentials Flow**, bạn cần cả **Client ID** và **Client Secret**. Điều này cho phép ứng dụng:

- ✅ Lấy dữ liệu công khai từ Spotify mà **KHÔNG CẦN** người dùng đăng nhập
- ✅ Truy cập Featured Playlists, New Releases, Search
- ✅ Phát preview 30s miễn phí
- ✅ Hoạt động ngay khi mở trang web

## Các bước thực hiện:

### 1. Truy cập Spotify Developer Dashboard
```
https://developer.spotify.com/dashboard
```

### 2. Chọn App của bạn
- Click vào app "Sportify Web Player" (hoặc tên app bạn đã tạo)

### 3. Vào Settings
- Click nút **"Settings"** ở góc trên bên phải

### 4. Lấy Client Secret
- Trong phần **"Client Secret"**, click **"View client secret"**
- Copy đoạn mã dài (ví dụ: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0`)

### 5. Cập nhật config.js
Mở file `config.js` và thay thế:

```javascript
CLIENT_SECRET: "YOUR_CLIENT_SECRET", // ← Thay bằng Client Secret vừa copy
```

Thành:

```javascript
CLIENT_SECRET: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0", // ← Client Secret thật
```

### 6. Khởi động lại ứng dụng
- Refresh trang web
- Kiểm tra Console (F12) để xem log kết nối

## Kết quả mong đợi:

✅ **Thành công:**
```
🎵 Sportify Web Player initialized
🔑 Client ID đã được cấu hình
🚀 Đang khởi tạo kết nối Spotify API...
🔑 Client Credentials token lấy thành công
✅ Đã kết nối Spotify API thành công!
🔥 Đang tải nhạc HOT từ Spotify...
🔥 Đã tải 8 bài nhạc HOT từ Spotify
```

❌ **Lỗi (chưa cập nhật Client Secret):**
```
⚠️ Cần cập nhật CLIENT_SECRET trong config.js
📝 Hướng dẫn:
1. Truy cập https://developer.spotify.com/dashboard
2. Vào App Settings
3. Copy Client Secret vào config.js
```

## Lưu ý bảo mật:

⚠️ **Client Secret là thông tin nhạy cảm!**
- Không chia sẻ Client Secret công khai
- Không commit Client Secret lên Git public
- Chỉ sử dụng cho development/testing

## Troubleshooting:

### Lỗi 401 Unauthorized
- Kiểm tra Client ID và Client Secret có đúng không
- Đảm bảo app chưa bị suspend trên Spotify Dashboard

### Lỗi CORS
- Client Credentials Flow không bị CORS vì chạy server-to-server
- Nếu vẫn lỗi, thử chạy trên HTTP server thay vì file://

### Không có nhạc preview
- Một số bài hát không có preview 30s
- App sẽ tự động filter chỉ hiển thị bài có preview
