@echo off
echo 🎵 SPORTIFY WEB PLAYER SERVER
echo ================================
echo.
echo Đang khởi động server...
echo.

REM Kiểm tra Python
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo ✅ Sử dụng Python HTTP Server
    echo 🌐 Server: http://localhost:8080
    echo 📝 Nhấn Ctrl+C để dừng server
    echo.
    python -m http.server 8080
) else (
    REM Kiểm tra Node.js
    node --version >nul 2>&1
    if %errorlevel% == 0 (
        echo ✅ Sử dụng Node.js HTTP Server
        echo 🌐 Server: http://localhost:8080
        echo 📝 Nhấn Ctrl+C để dừng server
        echo.
        npx http-server -p 8080
    ) else (
        echo ❌ Không tìm thấy Python hoặc Node.js
        echo.
        echo 📝 Vui lòng cài đặt một trong hai:
        echo    - Python: https://python.org
        echo    - Node.js: https://nodejs.org
        echo.
        echo Hoặc sử dụng Live Server extension trong VS Code
        pause
    )
)
