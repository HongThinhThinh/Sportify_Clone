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

// Demo tracks với audio URLs thực tế
const DEMO_TRACKS = [
  {
    id: "demo1",
    name: "Chill Lofi Beat",
    artists: [{ name: "Lofi Master" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 30000,
  },
  {
    id: "demo2",
    name: "Acoustic Guitar",
    artists: [{ name: "Guitar Hero" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 25000,
  },
  {
    id: "demo3",
    name: "Electronic Vibes",
    artists: [{ name: "DJ Electronic" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 28000,
  },
  {
    id: "demo4",
    name: "Piano Melody",
    artists: [{ name: "Piano Virtuoso" }],
    album: {
      images: [
        {
          url: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300&h=300&fit=crop",
        },
      ],
    },
    preview_url:
      "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    duration_ms: 32000,
  },
];

console.log(`
🎵 SPORTIFY WEB PLAYER
📝 Cấu hình:
- Client ID: ${SPOTIFY_CONFIG.CLIENT_ID ? "✅" : "❌"}
- Client Secret: ${SPOTIFY_CONFIG.CLIENT_SECRET ? "✅" : "❌"}
- Demo tracks: ${DEMO_TRACKS.length} bài
`);
