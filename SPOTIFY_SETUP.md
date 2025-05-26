# 🎵 Hướng dẫn cấu hình Spotify App

## Vấn đề hiện tại
Ứng dụng chỉ hoạt động ở `localhost:8000` nhưng không hoạt động với Live Server (thường là `localhost:5500`) do **Redirect URI** không được cấu hình đúng.

## ✅ Giải pháp

### 1. Truy cập Spotify Developer Dashboard
- Đi tới: https://developer.spotify.com/dashboard
- Đăng nhập với tài khoản Spotify của bạn
- Tìm app có Client ID: `1c4a3ae975784635a3c2ab7830df56a1`

### 2. Cập nhật Redirect URIs
Trong phần **Settings** của app, thêm các Redirect URIs sau:

```
http://localhost:5500
http://127.0.0.1:5500
http://localhost:8000
http://127.0.0.1:8000
http://localhost:3000
http://127.0.0.1:3000
```

### 3. Lưu thay đổi
- Click **Save** để lưu cấu hình
- Đợi vài phút để thay đổi có hiệu lực

## 🚀 Kiểm tra

### Cách 1: Live Server (VSCode)
1. Cài đặt extension "Live Server" trong VSCode
2. Right-click vào `index.html` → "Open with Live Server"
3. Ứng dụng sẽ mở ở `http://127.0.0.1:5500` hoặc `http://localhost:5500`

### Cách 2: Python HTTP Server
```bash
cd /path/to/your/project
python -m http.server 8000
```
Mở: `http://localhost:8000`

### Cách 3: Node.js HTTP Server
```bash
npx http-server -p 3000
```
Mở: `http://localhost:3000`

## 🔧 Tự động detect URL

Code đã được cập nhật để tự động detect URL hiện tại:

```javascript
// Tự động detect URL hiện tại
function getCurrentURL() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return "http://127.0.0.1:5500";
}

const SPOTIFY_CONFIG = {
  // ...
  get REDIRECT_URI() {
    return getCurrentURL();
  },
  // ...
};
```

## 📝 Fallback Mode

Nếu Spotify API không khả dụng, ứng dụng sẽ tự động:
- Hiển thị 12 demo tracks nhạc Việt Nam
- Cho phép phát nhạc demo
- Vẫn có đầy đủ chức năng player

## ⚠️ Lưu ý

1. **CORS**: Một số browser có thể block requests từ `file://` protocol
2. **HTTPS**: Trong production, nên sử dụng HTTPS
3. **Client Secret**: Không nên expose Client Secret ở frontend trong production

## 🎯 Kết quả mong đợi

Sau khi cấu hình xong:
- ✅ Hoạt động với Live Server
- ✅ Hoạt động với Python HTTP Server  
- ✅ Hoạt động với bất kỳ local server nào
- ✅ Tự động fallback nếu Spotify API không khả dụng
- ✅ Hiển thị nhạc Việt Nam hot
