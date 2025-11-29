#!/bin/bash

# Gallery 项目首次部署脚本
# 使用方法: 在服务器项目目录下执行 bash deploy-first-time.sh

set -e  # 遇到错误立即退出

echo "=========================================="
echo "Gallery 项目首次部署"
echo "=========================================="
echo ""

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}错误: 请在项目根目录下运行此脚本${NC}"
    exit 1
fi

# 检查必要的命令
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}错误: pnpm 未安装，请先运行 setup-server.sh${NC}"
    exit 1
fi

if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}错误: PM2 未安装，请先运行 setup-server.sh${NC}"
    exit 1
fi

echo -e "${GREEN}[1/5] 安装依赖...${NC}"
pnpm install

echo ""
echo -e "${GREEN}[2/5] 构建项目...${NC}"
pnpm build

echo ""
echo -e "${GREEN}[3/5] 创建生产环境配置...${NC}"
if [ ! -f ".env.production" ]; then
    echo "PORT=3001" > .env.production
    echo -e "${GREEN}.env.production 已创建${NC}"
else
    echo -e "${YELLOW}.env.production 已存在，跳过创建${NC}"
fi

echo ""
echo -e "${GREEN}[4/5] 检查 PM2 服务状态...${NC}"
if pm2 list | grep -q "gallery-app"; then
    echo -e "${YELLOW}PM2 服务 'gallery-app' 已存在，正在重启...${NC}"
    pm2 restart gallery-app
else
    echo -e "${GREEN}启动 PM2 服务...${NC}"
    PORT=3001 pm2 start pnpm --name "gallery-app" -- start
fi

echo ""
echo -e "${GREEN}[5/5] 配置 PM2 开机自启...${NC}"
pm2 save
echo -e "${YELLOW}提示: 如果是首次使用 PM2，请运行 'pm2 startup' 并执行输出的命令${NC}"

echo ""
echo "=========================================="
echo "部署完成！"
echo "=========================================="
echo ""
echo "服务状态:"
pm2 status gallery-app
echo ""
echo "查看日志: pm2 logs gallery-app"
echo "查看监控: pm2 monit"
echo ""
echo "下一步: 配置 Tengine 反向代理（参考 DEPLOY.md）"
echo ""

