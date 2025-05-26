# 🎵 HƯỚNG DẪN SETUP SPOTIFY API

## 📋 **Bước 1: Tạo Spotify Developer App**

### 1.1 Truy cập Spotify Developer Dashboard

- Đi tới: https://developer.spotify.com/dashboard
- Đăng nhập bằng tài khoản Spotify của bạn

### 1.2 Tạo App mới

- Click **"Create App"**
- Điền thông tin:
  ```
  App Name: Sportify Web Player
  App Description: Web music player using Spotify API
  Website: http://localhost:8080
  Redirect URI: http://localhost:8080
  ```
- Chọn **"Web API"** và **"Web Playback SDK"**
- Chấp nhận **Terms of Service**
- Click **"Save"**

### 1.3 Lấy Client ID

- Sau khi tạo app, bạn sẽ thấy **Client ID**
- Copy Client ID này

## 📋 **Bước 2: Cập nhật config.js**

Mở file `config.js` và thay thế:

```javascript
CLIENT_ID: "YOUR_CLIENT_ID_HERE", // ← Paste Client ID vào đây
```

## 📋 **Bước 3: Chạy HTTP Server**

### Cách 1: Sử dụng file start-server.bat (Windows)

```bash
# Double click vào file start-server.bat
# Hoặc chạy từ Command Prompt:
start-server.bat
```

### Cách 2: Python HTTP Server

```bash
python -m http.server 8080
```

### Cách 3: Node.js HTTP Server

```bash
npx http-server -p 8080
```

### Cách 4: VS Code Live Server

- Cài extension "Live Server"
- Right click vào index.html → "Open with Live Server"
- Đổi port thành 8080 trong settings

## 📋 **Bước 4: Truy cập và Đăng nhập**

1. **Mở trình duyệt:** http://localhost:8080
2. **Click "Login with Spotify"**
3. **Đăng nhập** tài khoản Spotify
4. **Chấp nhận permissions** cho app
5. **Được redirect về** và sử dụng full features

## 🎵 **Tính năng FREE sau khi đăng nhập:**

✅ **Tìm kiếm real-time** trong toàn bộ thư viện Spotify
✅ **Featured playlists** với tracks có preview
✅ **Preview 30s** miễn phí các bài hát
✅ **Thông tin chi tiết** nghệ sĩ, album, cover art
✅ **Chỉ hiển thị bài có preview** - không cần Premium

## ⚠️ **Lưu ý quan trọng:**

### Redirect URI phải chính xác

- Trong Spotify App Settings: `http://localhost:8080`
- Trong config.js: `http://localhost:8080`
- URL truy cập: `http://localhost:8080`
- **Phải giống nhau 100%**

### CORS và HTTPS

- Phải chạy qua HTTP server (không mở file trực tiếp)
- Localhost được Spotify cho phép
- Production cần HTTPS

### Spotify Free vs Premium

- **Tìm kiếm và browse:** ✅ Miễn phí
- **Preview 30s:** ✅ Miễn phí
- **Phát nhạc full:** ❌ Cần Spotify Premium
- **App này chỉ dùng tính năng FREE** 🎵

## 🔧 **Troubleshooting:**

### "Invalid redirect URI"

- Kiểm tra Redirect URI trong Spotify App Settings
- Đảm bảo match chính xác với config.js

### "Invalid client ID"

- Kiểm tra Client ID đã copy đúng
- Không có space hoặc ký tự thừa

### "CORS Error"

- Đảm bảo chạy qua HTTP server
- Không mở file:// trực tiếp

### "No tracks found"

- Kiểm tra access token trong Console
- Thử refresh page sau khi đăng nhập

## 🎯 **Test thành công:**

Sau khi setup xong, bạn sẽ thấy:

- Console log: "✅ Đã đăng nhập Spotify thành công!"
- Nút login đổi thành "Đã đăng nhập"
- Featured tracks từ Spotify thay vì demo
- Search trả về kết quả từ Spotify API

## 📞 **Cần hỗ trợ:**

Nếu gặp vấn đề, check Console (F12) để xem error logs chi tiết.
