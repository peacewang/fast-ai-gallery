@echo off
echo ========================================
echo Gallery 项目服务器环境配置 (远程执行)
echo ========================================
echo.

:: 配置区域 - 根据实际情况修改
set SERVER_IP=47.106.199.235
set SERVER_USER=root

echo [1/3] 上传配置脚本到服务器...
echo ----------------------------------------
scp setup-server.sh %SERVER_USER%@%SERVER_IP%:/tmp/setup-server.sh
if %errorlevel% neq 0 (
    echo 错误: 无法上传脚本到服务器
    echo 提示: 请确保已配置 SSH 密钥认证
    pause
    exit /b
)

echo.
echo [2/3] 在服务器上执行环境配置...
echo ----------------------------------------
ssh %SERVER_USER%@%SERVER_IP% "chmod +x /tmp/setup-server.sh && bash /tmp/setup-server.sh"
if %errorlevel% neq 0 (
    echo 错误: 服务器配置执行失败
    pause
    exit /b
)

echo.
echo [3/3] 清理临时文件...
echo ----------------------------------------
ssh %SERVER_USER%@%SERVER_IP% "rm -f /tmp/setup-server.sh"

echo.
echo ========================================
echo 服务器环境配置完成！
echo ========================================
echo.
echo 下一步操作：
echo 1. SSH 到服务器: ssh %SERVER_USER%@%SERVER_IP%
echo 2. 进入项目目录: cd /var/www/html/gallery-app
echo 3. 克隆代码或拉取最新代码
echo 4. 运行首次部署脚本: bash deploy-first-time.sh
echo.
pause

