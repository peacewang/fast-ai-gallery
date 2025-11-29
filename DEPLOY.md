# Gallery 项目部署指南

本文档说明如何将 AI Gallery 项目部署到 PeaceWang 个人网站 (`https://www.peacewang.com/gallery`)。

## 前置要求

### 服务器环境
- Node.js 18+ (推荐使用 Node.js 20 LTS)
- pnpm (包管理器)
- PM2 或 systemd (用于进程管理)
- Tengine/Nginx (已配置，用于反向代理)

### 本地环境
- Node.js 18+
- pnpm
- Git

## 快速开始

**注意**：首次部署已完成，服务器环境已配置。本文档主要说明日常代码更新部署流程。

### 日常更新部署

使用 `deploy-gallery.bat` 脚本一键部署更新：

1. 在本地 Windows 环境，双击运行 `deploy-gallery.bat`
2. 脚本会自动：
   - 推送代码到 GitHub
   - SSH 连接到服务器
   - 拉取最新代码
   - 重新安装依赖（如有变更）
   - 重新构建项目
   - 重启 PM2 服务

### 首次部署说明

如果需要在新的服务器上部署，请参考下面的详细步骤。

## 部署步骤

### 1. 服务器端准备

#### 1.1 手动安装环境

```bash
# 安装 Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs

# 验证安装
node --version
npm --version

# 安装 pnpm
npm install -g pnpm

# 安装 PM2
npm install -g pm2

# 创建项目目录
mkdir -p /var/www/html/gallery-app
cd /var/www/html/gallery-app
```

### 2. 首次部署

#### 2.1 首次部署步骤

```bash
# 1. 克隆或拉取代码
cd /var/www/html/gallery-app
git clone <your-gallery-repo-url> .
# 或
git pull

# 2. 安装依赖
pnpm install

# 3. 构建项目
pnpm build

# 4. 创建生产环境配置
echo "PORT=3001" > .env.production

# 5. 启动 PM2 服务
PORT=3001 pm2 start pnpm --name "gallery-app" -- start

# 6. 设置开机自启
pm2 save
pm2 startup  # 首次使用需要执行输出的命令
```

**注意**: Next.js 默认运行在 3000 端口，我们配置为 3001 端口，避免与 quote-app (8080) 或其他服务冲突。

### 3. 配置 Tengine 反向代理

编辑 Tengine 配置文件 `/etc/tengine/conf.d/quote-app.conf`，添加 gallery 路由：

```nginx
# Gallery 应用反向代理
location /gallery {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    
    # 处理 Next.js 静态资源
    proxy_set_header X-Forwarded-Prefix /gallery;
}

# 处理 Next.js 的 _next 静态资源
location /gallery/_next {
    proxy_pass http://127.0.0.1:3001;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

重新加载 Tengine 配置：

```bash
tengine -t  # 检查配置语法
tengine -s reload  # 重载配置
# 或
systemctl reload tengine
```

### 4. 验证部署

访问 `https://www.peacewang.com/gallery` 验证是否正常工作。

## 更新部署流程

### 方式一：使用自动化脚本 (推荐)

在本地 Windows 环境下，使用 `deploy-gallery.bat` 脚本：

1. 双击运行 `deploy-gallery.bat`
2. 脚本会自动：
   - 推送代码到 GitHub
   - SSH 连接到服务器
   - 拉取最新代码
   - 重新安装依赖（如有变更）
   - 重新构建项目
   - 重启 PM2 服务

### 方式二：手动部署

#### 在本地：

```bash
# 1. 提交并推送代码
git add .
git commit -m "Update gallery"
git push
```

#### 在服务器：

```bash
# 2. SSH 连接到服务器后执行
cd /var/www/html/gallery-app
git pull

# 3. 检查依赖是否有变更（可选，如果 package.json 有更新）
pnpm install

# 4. 重新构建
pnpm build

# 5. 重启服务
pm2 restart gallery-app

# 6. 查看日志确认
pm2 logs gallery-app --lines 50
```

## PM2 常用命令

```bash
# 查看所有进程
pm2 list

# 查看 gallery-app 状态
pm2 status gallery-app

# 查看日志
pm2 logs gallery-app

# 重启服务
pm2 restart gallery-app

# 停止服务
pm2 stop gallery-app

# 删除服务
pm2 delete gallery-app

# 查看监控
pm2 monit
```

## 故障排查

### 1. 服务无法启动

```bash
# 检查端口是否被占用
netstat -tlnp | grep 3001

# 检查 Node.js 版本
node --version

# 查看 PM2 日志
pm2 logs gallery-app --err
```

### 2. 页面 404 或资源加载失败

- 检查 Tengine 配置是否正确
- 确认 `basePath` 配置为 `/gallery`
- 检查 Next.js 服务器是否正常运行：`pm2 status gallery-app`

### 3. 构建失败

```bash
# 清理缓存重新构建
rm -rf .next
pnpm build
```

## 使用 Systemd 替代 PM2 (可选)

如果更偏好使用 systemd，可以创建服务文件 `/etc/systemd/system/gallery-app.service`：

```ini
[Unit]
Description=Gallery Next.js App
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/html/gallery-app
Environment=NODE_ENV=production
Environment=PORT=3001
ExecStart=/usr/bin/pnpm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

然后：

```bash
systemctl daemon-reload
systemctl enable gallery-app
systemctl start gallery-app
systemctl status gallery-app
```

## 注意事项

1. **端口冲突**: 确保 gallery-app 使用的端口（3001）不与 quote-app (8080) 或其他服务冲突
2. **内存限制**: Next.js 应用可能占用较多内存，确保服务器有足够资源
3. **HTTPS**: Tengine 已配置 HTTPS，无需在 Next.js 中配置
4. **环境变量**: 生产环境变量应放在 `.env.production` 文件中，不要提交到 Git

