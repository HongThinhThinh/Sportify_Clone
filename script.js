// Global variables
let accessToken = null;
let clientCredentialsToken = null;
let currentTrack = null;
let currentPlaylist = [];
let currentIndex = 0;
let isPlaying = false;
let currentSearchResults = [];

// DOM elements
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const resultsSection = document.getElementById("resultsSection");
const featuredTracks = document.getElementById("featuredTracks");
const featuredSection = document.querySelector(".featured-section");
const loginBtn = document.getElementById("loginBtn");
const audioPlayer = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const trackImage = document.getElementById("trackImage");
const trackName = document.getElementById("trackName");
const trackArtist = document.getElementById("trackArtist");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volumeSlider = document.getElementById("volumeSlider");
const loading = document.getElementById("loading");

// Spotify Embed elements
const spotifyEmbedContainer = document.getElementById("spotifyEmbedContainer");
const embedTitle = document.getElementById("embedTitle");
const embedContent = document.getElementById("embedContent");
const closeEmbedBtn = document.getElementById("closeEmbedBtn");
const openPlaylistBtn = document.getElementById("openPlaylistBtn");
const clearSearchBtn = document.getElementById("clearSearchBtn");

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎵 Sportify Web Player initialized");
  initializeApp();
  setupEventListeners();

  // Kiểm tra URL cho access token
  checkForAccessToken();

  // Khởi tạo Spotify API
  initializeSpotifyAPI();
});

async function initializeApp() {
  console.log("🚀 Đang khởi tạo ứng dụng...");

  // Hiển thị demo tracks ngay lập tức
  displayTracks(DEMO_TRACKS, featuredTracks, "grid");
  currentPlaylist = DEMO_TRACKS;

  console.log("📝 Đã hiển thị demo tracks");
}

async function initializeSpotifyAPI() {
  try {
    showLoading();

    console.log(
      `🔗 Đang kết nối Spotify API từ: ${SPOTIFY_CONFIG.REDIRECT_URI}`
    );

    // Thử lấy Client Credentials token
    clientCredentialsToken = await getClientCredentialsToken();

    if (clientCredentialsToken) {
      console.log("✅ Đã kết nối Spotify API thành công!");
      updateLoginButton(true);

      // Tải nhạc HOT từ Spotify
      await loadFeaturedTracks();
    } else {
      console.log("❌ Không thể kết nối Spotify API, sử dụng demo tracks");
      updateLoginButton(false);
      // Vẫn hiển thị demo tracks
      displayTracks(DEMO_TRACKS, featuredTracks, "grid");
      currentPlaylist = DEMO_TRACKS;
    }
  } catch (error) {
    console.error("Error initializing Spotify API:", error);
    updateLoginButton(false);
    // Fallback to demo tracks
    console.log("📝 Fallback: Hiển thị demo tracks");
    displayTracks(DEMO_TRACKS, featuredTracks, "grid");
    currentPlaylist = DEMO_TRACKS;
  } finally {
    hideLoading();
  }
}

function setupEventListeners() {
  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", debounce(handleSearch, 500));
    searchInput.addEventListener("input", toggleClearButton);
  }
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", clearSearch);
  }

  // Login button
  if (loginBtn) {
    loginBtn.addEventListener("click", handleLogin);
  }

  // Player controls
  if (playBtn) {
    playBtn.addEventListener("click", togglePlay);
  }
  if (prevBtn) {
    prevBtn.addEventListener("click", playPrevious);
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", playNext);
  }

  // Audio player events
  if (audioPlayer) {
    audioPlayer.addEventListener("loadedmetadata", updateDuration);
    audioPlayer.addEventListener("timeupdate", updateProgress);
    audioPlayer.addEventListener("ended", playNext);
    audioPlayer.addEventListener("error", handleAudioError);
  }

  // Volume control
  if (volumeSlider) {
    volumeSlider.addEventListener("input", updateVolume);
  }

  // Progress bar click
  const progressBar = document.querySelector(".progress-bar");
  if (progressBar) {
    progressBar.addEventListener("click", seekTo);
  }

  // Spotify Embed controls
  if (closeEmbedBtn) {
    closeEmbedBtn.addEventListener("click", closeSpotifyEmbed);
  }
  if (openPlaylistBtn) {
    openPlaylistBtn.addEventListener("click", () => {
      const playlistId = "1LXrJIgy8GPBsLNgScRMSh";
      showSpotifyPlaylistEmbed(playlistId);
    });
  }
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function showLoading() {
  loading.style.display = "flex";
}

function hideLoading() {
  loading.style.display = "none";
}

function checkForAccessToken() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const token = params.get("access_token");

  if (token) {
    accessToken = token;
    window.location.hash = "";
    updateLoginButton(true);
    console.log("✅ Đã đăng nhập Spotify thành công!");
    loadFeaturedTracks();
  }
}

function updateLoginButton(connected) {
  if (connected) {
    loginBtn.innerHTML = '<i class="fas fa-music"></i> Spotify Connected';
    loginBtn.style.background = "#1ed760";
    loginBtn.style.cursor = "default";
    loginBtn.disabled = true;
  } else {
    loginBtn.innerHTML = '<i class="fab fa-spotify"></i> Connect Spotify';
    loginBtn.style.background = "#1db954";
    loginBtn.style.cursor = "pointer";
    loginBtn.disabled = false;
  }
}

function handleLogin() {
  if (
    !SPOTIFY_CONFIG.CLIENT_ID ||
    SPOTIFY_CONFIG.CLIENT_ID === "YOUR_SPOTIFY_CLIENT_ID"
  ) {
    alert("⚠️ Vui lòng cập nhật CLIENT_ID trong file config.js");
    return;
  }

  const authUrl =
    `${SPOTIFY_CONFIG.AUTH_BASE}/authorize?` +
    `client_id=${SPOTIFY_CONFIG.CLIENT_ID}&` +
    `response_type=token&` +
    `redirect_uri=${encodeURIComponent(SPOTIFY_CONFIG.REDIRECT_URI)}&` +
    `scope=${encodeURIComponent(SPOTIFY_CONFIG.SCOPES)}`;

  window.location.href = authUrl;
}

async function loadFeaturedTracks() {
  try {
    showLoading();

    const token = getCurrentToken();
    if (token) {
      console.log("🔥 Đang tải nhạc HOT từ Spotify...");

      // Thử lấy từ search với các từ khóa phổ biến
      const hotTracks = await getPopularTracks();

      if (hotTracks && hotTracks.length > 0) {
        displayTracks(hotTracks, featuredTracks, "grid");
        currentPlaylist = hotTracks;
        console.log(`🔥 Đã hiển thị ${hotTracks.length} bài nhạc từ Spotify`);
        return;
      }
    }

    // Fallback to demo tracks
    console.log("📝 Sử dụng demo tracks");
    displayTracks(DEMO_TRACKS, featuredTracks, "grid");
    currentPlaylist = DEMO_TRACKS;
  } catch (error) {
    console.error("Error loading featured tracks:", error);
    displayTracks(DEMO_TRACKS, featuredTracks, "grid");
    currentPlaylist = DEMO_TRACKS;
  } finally {
    hideLoading();
  }
}

async function getPopularTracks() {
  try {
    // Các từ khóa tìm kiếm nhạc hot quốc tế và Việt Nam
    const popularQueries = [
      "top hits 2024",
      "viral songs",
      "trending music",
      "pop hits",
      "vietnamese music",
      "vpop",
      "son tung mtp",
      "den vau",
      "jack vietnam",
      "amee vietnam",
      "erik vietnam",
      "min vietnam",
    ];

    const tracks = [];

    for (let query of popularQueries) {
      try {
        const searchResults = await searchSpotify(query);
        if (
          searchResults &&
          searchResults.tracks &&
          searchResults.tracks.items
        ) {
          // Lấy tất cả tracks có preview_url, không chỉ lọc
          const queryTracks = searchResults.tracks.items.slice(0, 2); // Lấy 2 tracks đầu tiên từ mỗi query
          tracks.push(...queryTracks);
          console.log(`✅ Thêm ${queryTracks.length} tracks từ "${query}"`);
        }
      } catch (error) {
        console.log(`❌ Lỗi search "${query}":`, error.message);
      }

      if (tracks.length >= 12) break;
    }

    // Nếu không có tracks từ Spotify, trả về demo tracks
    if (tracks.length === 0) {
      console.log("📝 Không tìm thấy tracks từ Spotify, sử dụng demo tracks");
      return DEMO_TRACKS;
    }

    return tracks.slice(0, 12);
  } catch (error) {
    console.error("Error getting popular tracks:", error);
    return DEMO_TRACKS;
  }
}

async function handleSearch() {
  const query = searchInput.value.trim();

  if (query.length < 2) {
    resultsSection.style.display = "none";
    featuredSection.style.display = "block"; // Hiển thị lại featured section
    return;
  }

  try {
    showLoading();

    const token = getCurrentToken();
    if (token) {
      console.log(`🔍 Đang tìm kiếm "${query}" trên Spotify...`);
      const results = await searchSpotify(query);

      if (results && results.tracks && results.tracks.items) {
        const tracks = results.tracks.items;
        console.log(`✅ Tìm thấy ${tracks.length} kết quả`);
        displaySearchResults(tracks);
      } else {
        console.log("❌ Không tìm thấy kết quả");
        displaySearchResults([]);
      }
    } else {
      // Search trong demo data
      console.log(`🔍 Tìm kiếm "${query}" trong demo data...`);
      const demoResults = DEMO_TRACKS.filter(
        (track) =>
          track.name.toLowerCase().includes(query.toLowerCase()) ||
          track.artists[0].name.toLowerCase().includes(query.toLowerCase())
      );

      console.log(`📝 Tìm thấy ${demoResults.length} kết quả demo`);
      displaySearchResults(demoResults);
    }
  } catch (error) {
    console.error("Search error:", error);
    displaySearchResults([]);
  } finally {
    hideLoading();
  }
}

async function searchSpotify(query) {
  const token = getCurrentToken();
  if (!token) {
    throw new Error("No token available for search");
  }

  const response = await fetch(
    `${SPOTIFY_CONFIG.API_BASE}/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  return await response.json();
}

function displaySearchResults(tracks) {
  currentSearchResults = tracks;

  if (tracks.length === 0) {
    resultsSection.style.display = "none";
    featuredSection.style.display = "block"; // Hiển thị lại featured section nếu không có kết quả
    return;
  }

  displayTracks(tracks, searchResults, "list");
  resultsSection.style.display = "block";
  featuredSection.style.display = "none"; // Ẩn featured section khi có kết quả tìm kiếm
}

function displayTracks(tracks, container, layout = "grid") {
  container.innerHTML = "";

  tracks.forEach((track, index) => {
    const trackElement = createTrackElement(track, index, layout);
    container.appendChild(trackElement);
  });
}

function createTrackElement(track, index, layout) {
  const element = document.createElement("div");
  element.className = layout === "grid" ? "track-card" : "track-item";
  element.dataset.index = index;

  const imageUrl =
    track.album?.images?.[0]?.url ||
    track.image ||
    "https://via.placeholder.com/300x300?text=No+Image";

  const artistName = track.artists?.[0]?.name || track.artist;
  const trackName = track.name;
  const duration = formatDuration(track.duration_ms || track.duration);

  // Icon cho preview
  const previewIcon = track.preview_url ? "🎵" : "🎶";

  if (layout === "grid") {
    element.innerHTML = `
      <img src="${imageUrl}" alt="${trackName}" loading="lazy">
      <h3>${trackName} ${previewIcon}</h3>
      <p>${artistName}</p>
    `;
  } else {
    element.innerHTML = `
      <img src="${imageUrl}" alt="${trackName}" loading="lazy">
      <div class="track-info">
        <h4>${trackName} ${previewIcon}</h4>
        <p>${artistName}</p>
      </div>
      <span class="duration">${duration}</span>
    `;
  }

  element.addEventListener("click", () => playTrack(track, index));
  return element;
}

function playTrack(track, index) {
  console.log(`🎵 Phát bài: ${track.name} - ${track.artists?.[0]?.name}`);

  currentTrack = track;
  currentIndex = index;

  // Update UI với error handling
  if (trackImage) {
    trackImage.src =
      track.album?.images?.[0]?.url ||
      track.image ||
      "https://via.placeholder.com/60x60?text=♪";
  }
  if (trackName) {
    trackName.textContent = track.name;
  }
  if (trackArtist) {
    trackArtist.textContent = track.artists?.[0]?.name || track.artist;
  }

  // Update active state
  document
    .querySelectorAll(".track-card, .track-item")
    .forEach((el) => el.classList.remove("active"));
  document.querySelector(`[data-index="${index}"]`)?.classList.add("active");

  // Stop current audio
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }

  // Kiểm tra nếu có Spotify track ID, hiển thị embed cho bài hát cụ thể
  if (track.id && track.external_urls?.spotify) {
    console.log("🎵 Mở Spotify embed cho bài hát:", track.name);
    showSpotifyEmbed(track);
    return;
  }

  // Nếu không có Spotify ID, phát demo audio
  if (track.preview_url && audioPlayer) {
    console.log("🎵 Phát preview từ Spotify:", track.preview_url);
    audioPlayer.src = track.preview_url;

    audioPlayer.onloadstart = () => console.log("⏳ Đang tải audio...");
    audioPlayer.oncanplay = () => console.log("✅ Audio sẵn sàng");
    audioPlayer.onerror = () => {
      console.error("❌ Lỗi tải audio");
      playDemoAudio();
    };

    audioPlayer
      .play()
      .then(() => {
        isPlaying = true;
        updatePlayButton();
        console.log("🎶 Đang phát:", track.name);
      })
      .catch((error) => {
        console.error("❌ Lỗi phát audio:", error);
        playDemoAudio();
      });
  } else {
    console.log("🎶 Không có preview, phát demo audio");
    playDemoAudio();
  }
}

function playDemoAudio() {
  if (!audioPlayer) {
    console.error("❌ Audio player không tồn tại");
    return;
  }

  // Sử dụng một file audio demo có sẵn
  const demoUrl =
    "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3";
  audioPlayer.src = demoUrl;

  audioPlayer
    .play()
    .then(() => {
      isPlaying = true;
      updatePlayButton();
      console.log("🎶 Đang phát demo audio");
    })
    .catch((error) => {
      console.error("❌ Lỗi phát demo audio:", error);
      isPlaying = false;
      updatePlayButton();
    });
}

function togglePlay() {
  if (!currentTrack) {
    alert("Vui lòng chọn một bài hát");
    return;
  }

  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
    console.log("⏸️ Tạm dừng");
  } else {
    audioPlayer
      .play()
      .then(() => {
        isPlaying = true;
        console.log("▶️ Tiếp tục phát");
      })
      .catch((error) => {
        console.error("❌ Lỗi phát nhạc:", error);
        isPlaying = false;
      });
  }

  updatePlayButton();
}

function updatePlayButton() {
  if (playBtn) {
    const icon = playBtn.querySelector("i");
    if (icon) {
      icon.className = isPlaying ? "fas fa-pause" : "fas fa-play";
    }
  }
}

function playPrevious() {
  if (currentIndex > 0) {
    const tracks = getCurrentPlaylist();
    playTrack(tracks[currentIndex - 1], currentIndex - 1);
  }
}

function playNext() {
  const tracks = getCurrentPlaylist();
  if (currentIndex < tracks.length - 1) {
    playTrack(tracks[currentIndex + 1], currentIndex + 1);
  }
}

function getCurrentPlaylist() {
  const searchVisible = resultsSection.style.display !== "none";
  return searchVisible ? currentSearchResults : currentPlaylist;
}

function handleAudioError(e) {
  console.error("Audio error:", e);
  console.log("🔄 Thử phát demo audio...");
  playDemoAudio();
}

function updateDuration() {
  if (duration && audioPlayer) {
    duration.textContent = formatTime(audioPlayer.duration);
  }
}

function updateProgress() {
  if (audioPlayer && audioPlayer.duration && progress && currentTime) {
    const progressPercent =
      (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = progressPercent + "%";
    currentTime.textContent = formatTime(audioPlayer.currentTime);
  }
}

function seekTo(e) {
  if (!audioPlayer || !audioPlayer.duration) return;

  const progressBar = e.currentTarget;
  const clickX = e.offsetX;
  const width = progressBar.offsetWidth;
  const newTime = (clickX / width) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
}

function updateVolume() {
  if (audioPlayer && volumeSlider) {
    audioPlayer.volume = volumeSlider.value / 100;
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatDuration(ms) {
  if (!ms) return "0:00";
  const seconds = Math.floor(ms / 1000);
  return formatTime(seconds);
}

// Initialize volume
if (audioPlayer) {
  audioPlayer.volume = 0.5;
}

// Missing functions
function toggleClearButton() {
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.style.display =
      searchInput.value.length > 0 ? "block" : "none";
  }
}

function clearSearch() {
  if (searchInput) {
    searchInput.value = "";
    toggleClearButton();
    if (resultsSection) {
      resultsSection.style.display = "none";
    }
    if (featuredSection) {
      featuredSection.style.display = "block";
    }
  }
}

// ===== SPOTIFY EMBED FUNCTIONS =====

function showSpotifyEmbed(track) {
  if (!spotifyEmbedContainer || !embedTitle || !embedContent) {
    console.error("❌ Spotify embed elements không tồn tại");
    return;
  }

  // Tạo embed URL cho track cụ thể với full controls
  const trackId = track.id;
  const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;

  // Cập nhật title
  embedTitle.textContent = `🎵 ${track.name} - ${
    track.artists?.[0]?.name || track.artist
  }`;

  // Tạo iframe với full controls cho bài hát cụ thể
  embedContent.innerHTML = `
    <iframe
      title="Spotify Embed: ${track.name}"
      src="${embedUrl}"
      width="100%"
      height="100%"
      style="min-height: 400px; border-radius: 12px; border: none;"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy">
    </iframe>
  `;

  // Hiển thị container
  spotifyEmbedContainer.style.display = "block";

  console.log("✅ Đã mở Spotify embed cho bài hát:", track.name);
}

function showSpotifyPlaylistEmbed(playlistId) {
  if (!spotifyEmbedContainer || !embedTitle || !embedContent) {
    console.error("❌ Spotify embed elements không tồn tại");
    return;
  }

  // Sử dụng playlist ID với full controls
  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  // Cập nhật title
  embedTitle.textContent = "🎵 Spotify Playlist - Full Controls";

  // Tạo iframe với full controls
  embedContent.innerHTML = `
    <iframe
      title="Spotify Embed: Recommendation Playlist"
      src="${embedUrl}"
      width="100%"
      height="100%"
      style="min-height: 400px; border-radius: 12px; border: none;"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy">
    </iframe>
  `;

  // Hiển thị container
  spotifyEmbedContainer.style.display = "block";

  console.log("✅ Đã mở Spotify playlist embed với full controls");
}

function closeSpotifyEmbed() {
  if (spotifyEmbedContainer) {
    spotifyEmbedContainer.style.display = "none";
  }
  if (embedContent) {
    embedContent.innerHTML = "";
  }
  console.log("❌ Đã đóng Spotify embed");
}

// ===== SPOTIFY API FUNCTIONS =====

async function getClientCredentialsToken() {
  try {
    if (
      !SPOTIFY_CONFIG.CLIENT_SECRET ||
      SPOTIFY_CONFIG.CLIENT_SECRET === "YOUR_CLIENT_SECRET"
    ) {
      console.log("⚠️ Cần cập nhật CLIENT_SECRET trong config.js");
      return null;
    }

    const credentials = btoa(
      `${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`
    );

    const response = await fetch(SPOTIFY_CONFIG.TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("🔑 Client Credentials token thành công");
      return data.access_token;
    } else {
      const error = await response.text();
      console.error("Failed to get token:", response.status, error);
      return null;
    }
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

function getCurrentToken() {
  return accessToken || clientCredentialsToken;
}
