@echo off
echo ====================================
echo 启动 Next.js 开发服务器
echo ====================================
echo.

cd /d %~dp0

echo 检查 Node.js 版本...
node --version
echo.

echo 检查依赖是否已安装...
if not exist "node_modules" (
    echo 依赖未安装，正在安装...
    call npm install
    echo.
)

echo 启动开发服务器...
echo 服务器将在 http://localhost:3000 启动
echo 按 Ctrl+C 停止服务器
echo.
echo ====================================
echo.

call npm run dev

pause

