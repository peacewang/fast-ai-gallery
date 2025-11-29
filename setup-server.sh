#!/bin/bash

# Gallery 项目服务器环境配置脚本
# 使用方法: 在服务器上执行 bash setup-server.sh

set -e  # 遇到错误立即退出

echo "=========================================="
echo "Gallery 项目服务器环境配置"
echo "=========================================="
echo ""

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}错误: 请使用 root 用户运行此脚本${NC}"
    exit 1
fi

echo -e "${GREEN}[1/6] 检查 Node.js 安装...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js 未安装，开始安装 Node.js 20...${NC}"
    curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
    yum install -y nodejs
    echo -e "${GREEN}Node.js 安装完成${NC}"
else
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}Node.js 已安装: $NODE_VERSION${NC}"
fi

echo ""
echo -e "${GREEN}[2/6] 检查 pnpm 安装...${NC}"
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}pnpm 未安装，开始安装...${NC}"
    npm install -g pnpm
    echo -e "${GREEN}pnpm 安装完成${NC}"
else
    PNPM_VERSION=$(pnpm --version)
    echo -e "${GREEN}pnpm 已安装: $PNPM_VERSION${NC}"
fi

echo ""
echo -e "${GREEN}[3/6] 检查 PM2 安装...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}PM2 未安装，开始安装...${NC}"
    npm install -g pm2
    echo -e "${GREEN}PM2 安装完成${NC}"
else
    PM2_VERSION=$(pm2 --version)
    echo -e "${GREEN}PM2 已安装: $PM2_VERSION${NC}"
fi

echo ""
echo -e "${GREEN}[4/6] 创建项目目录...${NC}"
GALLERY_DIR="/var/www/html/gallery-app"
if [ ! -d "$GALLERY_DIR" ]; then
    mkdir -p "$GALLERY_DIR"
    echo -e "${GREEN}目录已创建: $GALLERY_DIR${NC}"
else
    echo -e "${GREEN}目录已存在: $GALLERY_DIR${NC}"
fi

echo ""
echo -e "${GREEN}[5/6] 检查端口占用...${NC}"
PORT=3001
if netstat -tlnp 2>/dev/null | grep -q ":$PORT "; then
    echo -e "${YELLOW}警告: 端口 $PORT 已被占用${NC}"
    netstat -tlnp | grep ":$PORT "
    echo -e "${YELLOW}请检查是否需要停止占用该端口的服务${NC}"
else
    echo -e "${GREEN}端口 $PORT 可用${NC}"
fi

echo ""
echo -e "${GREEN}[6/6] 环境检查完成！${NC}"
echo ""
echo "=========================================="
echo "环境配置摘要"
echo "=========================================="
echo "Node.js: $(node --version 2>/dev/null || echo '未安装')"
echo "npm: $(npm --version 2>/dev/null || echo '未安装')"
echo "pnpm: $(pnpm --version 2>/dev/null || echo '未安装')"
echo "PM2: $(pm2 --version 2>/dev/null || echo '未安装')"
echo "项目目录: $GALLERY_DIR"
echo "运行端口: $PORT"
echo ""
echo "=========================================="
echo "下一步操作："
echo "=========================================="
echo "1. 进入项目目录: cd $GALLERY_DIR"
echo "2. 克隆或拉取代码: git clone <your-repo-url> ."
echo "3. 安装依赖: pnpm install"
echo "4. 构建项目: pnpm build"
echo "5. 创建 .env.production: echo 'PORT=3001' > .env.production"
echo "6. 启动服务: PORT=3001 pm2 start pnpm --name 'gallery-app' -- start"
echo "7. 设置开机自启: pm2 save && pm2 startup"
echo ""
echo "配置 Tengine 反向代理请参考 DEPLOY.md 第 3 节"
echo ""

