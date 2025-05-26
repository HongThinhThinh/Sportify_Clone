# 🎵 Sportify - Spotify Clone Web Player

Một ứng dụng web music player được xây dựng bằng HTML, CSS, và JavaScript thuần, tích hợp với Spotify API và Spotify Embed.

## ✨ Tính năng

### 🎶 **Music Player**
- Demo tracks với audio player tùy chỉnh
- Spotify embed iframe cho trải nghiệm nghe nhạc chất lượng cao
- Controls: Play, Pause, Previous, Next, Volume, Progress bar
- Responsive design cho mobile và desktop

### 🔍 **Search & Browse**
- Tìm kiếm real-time trong Spotify API (khi có credentials)
- Tìm kiếm trong demo tracks (fallback)
- Hiển thị kết quả dạng list với thông tin chi tiết
- Auto-hide featured section khi search

### 🎵 **Spotify Integration**
- Spotify Web API integration
- Spotify embed player cho tracks và playlists
- OAuth authentication flow
- Featured tracks từ Spotify

### 🎨 **UI/UX**
- Modern glassmorphism design
- Smooth animations và transitions
- Loading states và error handling
- Mobile-first responsive design

## 🚀 Demo

**Local Development:** `http://localhost:8080`
**Live Demo:** [Deploy trên Vercel](https://your-app-name.vercel.app)

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **API:** Spotify Web API
- **Styling:** Custom CSS với Glassmorphism effects
- **Icons:** Font Awesome
- **Deployment:** Vercel

## 📦 Installation

### **Local Development:**

1. **Clone repository:**
```bash
git clone https://github.com/your-username/sportify-clone.git
cd sportify-clone
```

2. **Setup Spotify API:**
- Tạo app tại [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
- Copy Client ID và Client Secret
- Cập nhật `config.js`:
```javascript
CLIENT_ID: "your_client_id",
CLIENT_SECRET: "your_client_secret",
REDIRECT_URI: "http://localhost:8080"
```

3. **Run local server:**
```bash
# Windows:
start-server.bat

# Mac/Linux:
python -m http.server 8080
# hoặc
npx serve -p 8080
```

4. **Mở trình duyệt:** `http://localhost:8080`

### **Deploy lên Vercel:**

Xem hướng dẫn chi tiết trong [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)

## 📁 Project Structure

```
sportify/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── script.js           # Main JavaScript logic
├── config.js           # Spotify API configuration
├── vercel.json         # Vercel deployment config
├── start-server.bat    # Local server script
├── README.md           # This file
├── DEPLOY_VERCEL.md    # Deployment guide
└── SETUP_SPOTIFY_API.md # Spotify API setup guide
```

## 🎯 Features Showcase

### **Music Player Controls**
- ▶️ Play/Pause với smooth transitions
- ⏮️⏭️ Previous/Next track navigation
- 🔊 Volume control với visual feedback
- 📊 Progress bar với seek functionality

### **Search Experience**
- 🔍 Real-time search với debouncing
- ❌ Clear search với button "X"
- 📱 Auto-hide sections khi search
- 🎵 Preview icons cho tracks có audio

### **Spotify Integration**
- 🎵 Embed player cho individual tracks
- 📋 Playlist embed với ID cố định
- 🔐 OAuth login flow
- 🎶 API search và featured tracks

## 🔧 Configuration

### **Spotify API Setup:**
1. Tạo app tại Spotify Developer Dashboard
2. Thêm Redirect URIs:
   - Local: `http://localhost:8080`
   - Production: `https://your-app.vercel.app`
3. Copy credentials vào `config.js`

### **Environment Variables:**
```javascript
// config.js
const SPOTIFY_CONFIG = {
  CLIENT_ID: "your_spotify_client_id",
  CLIENT_SECRET: "your_client_secret", // Chỉ cho local dev
  REDIRECT_URI: "your_redirect_uri",
  // ... other configs
};
```

## 🚀 Deployment

### **Vercel (Recommended):**
- ✅ Static hosting miễn phí
- ✅ Auto-deploy từ GitHub
- ✅ Custom domain support
- ⚠️ Chỉ frontend (không có backend)

### **Netlify:**
- ✅ Tương tự Vercel
- ✅ Form handling
- ✅ Serverless functions

### **GitHub Pages:**
- ✅ Miễn phí cho public repos
- ⚠️ Chỉ static files

## 📝 License

MIT License - xem [LICENSE](LICENSE) để biết thêm chi tiết.

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📞 Contact

- **Developer:** Your Name
- **Email:** your.email@example.com
- **GitHub:** [@your-username](https://github.com/your-username)
- **Demo:** [Live Demo](https://your-app-name.vercel.app)

---

⭐ **Star this repo if you found it helpful!**
