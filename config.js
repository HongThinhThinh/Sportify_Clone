// Spotify API Configuration
const SPOTIFY_CONFIG = {
  // Client ID từ Spotify Developer Dashboard
  CLIENT_ID: "1c4a3ae975784635a3c2ab7830df56a1",

  // Client Secret - CHÚ Ý: Trong production không nên để Client Secret ở frontend
  // Đây chỉ là demo, trong thực tế nên sử dụng backend để xử lý
  CLIENT_SECRET: "a0bc021852114d1eb79cfed9e951bc19",

  // Redirect URI
  REDIRECT_URI: "http://127.0.0.1:5500",

  // Scopes cần thiết
  SCOPES: [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "streaming",
    "user-library-read",
    "user-top-read",
  ].join(" "),

  // API endpoints
  API_BASE: "https://api.spotify.com/v1",
  AUTH_BASE: "https://accounts.spotify.com",
  TOKEN_URL: "https://accounts.spotify.com/api/token",
};

// Demo tracks với nhạc Việt Nam hot
const DEMO_TRACKS = [
  {
    id: "demo1",
    name: "Chúng Ta Của Hiện Tại",
    artists: [{ name: "Sơn Tùng M-TP" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 30000,
  },
  {
    id: "demo2",
    name: "Anh Đang Ở Đâu Đấy Anh",
    artists: [{ name: "Hương Giang" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 25000,
  },
  {
    id: "demo3",
    name: "Bước Qua Mùa Cô Đơn",
    artists: [{ name: "Vũ." }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 28000,
  },
  {
    id: "demo4",
    name: "Đen Đá Không Đường",
    artists: [{ name: "Đen Vâu ft. Kiều Minh Tuấn" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 32000,
  },
  {
    id: "demo5",
    name: "Dreamy Night",
    artists: [{ name: "AMEE" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 30000,
  },
  {
    id: "demo6",
    name: "Ghen Cô Vy",
    artists: [{ name: "ERIK ft. MIN" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 25000,
  },
  {
    id: "demo7",
    name: "Lạc Trôi",
    artists: [{ name: "Sơn Tùng M-TP" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 28000,
  },
  {
    id: "demo8",
    name: "Hai Triệu Năm",
    artists: [{ name: "Đen Vâu ft. Biên" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 30000,
  },
  {
    id: "demo9",
    name: "Sài Gòn Đau Lòng Quá",
    artists: [{ name: "Hứa Kim Tuyền ft. Hoàng Dũng" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 27000,
  },
  {
    id: "demo10",
    name: "Thương Em",
    artists: [{ name: "AMEE" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 29000,
  },
  {
    id: "demo11",
    name: "Có Chắc Yêu Là Đây",
    artists: [{ name: "Sơn Tùng M-TP" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 31000,
  },
  {
    id: "demo12",
    name: "Muộn Rồi Mà Sao Còn",
    artists: [{ name: "Sơn Tùng M-TP" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop&auto=format",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 26000,
  },
];

console.log(`
🎵 SPORTIFY WEB PLAYER
📝 Cấu hình:
- Client ID: ${SPOTIFY_CONFIG.CLIENT_ID ? "✅" : "❌"}
- Client Secret: ${SPOTIFY_CONFIG.CLIENT_SECRET ? "✅" : "❌"}
- Demo tracks: ${DEMO_TRACKS.length} bài
`);
