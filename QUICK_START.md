# Gallery 项目快速部署指南

**注意**：首次部署已完成。本文档主要说明日常代码更新部署流程。

## 日常更新部署

### 一键部署（推荐）

在 Windows 环境下，双击运行：

```
deploy-gallery.bat
```

脚本会自动完成：
- ✅ 推送代码到 GitHub
- ✅ SSH 连接到服务器
- ✅ 拉取最新代码
- ✅ 重新安装依赖（如有变更）
- ✅ 重新构建项目
- ✅ 重启 PM2 服务

### 手动部署

如果需要手动部署，在服务器上执行：

```bash
# 1. SSH 连接到服务器
ssh root@47.106.199.235

# 2. 进入项目目录
cd /var/www/html/gallery-app

# 3. 拉取最新代码
git pull

# 4. 安装依赖（如果 package.json 有更新）
pnpm install

# 5. 重新构建
pnpm build

# 6. 重启服务
pm2 restart gallery-app
```

### 步骤 3: 配置 Tengine 反向代理

编辑 Tengine 配置文件：

```bash
vi /etc/tengine/conf.d/quote-app.conf
```

在文件末尾添加以下配置：

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

保存后重新加载 Tengine：

```bash
tengine -t  # 检查配置语法
tengine -s reload  # 重载配置
```

### 步骤 4: 验证部署

访问 `https://www.peacewang.com/gallery` 验证是否正常工作。

## 常用命令

### 查看服务状态

```bash
pm2 status gallery-app
pm2 logs gallery-app
pm2 monit
```

### 重启服务

```bash
pm2 restart gallery-app
```

### 更新代码后重新部署

在本地运行 `deploy-gallery.bat`，或在服务器上：

```bash
cd /var/www/html/gallery-app
git pull
pnpm install  # 如果 package.json 有更新
pnpm build
pm2 restart gallery-app
```

## 故障排查

### 服务无法启动

```bash
# 检查端口占用
netstat -tlnp | grep 3001

# 查看 PM2 错误日志
pm2 logs gallery-app --err

# 检查 Node.js 版本
node --version
```

### 页面 404

- 检查 Tengine 配置是否正确
- 确认 PM2 服务正在运行：`pm2 status gallery-app`
- 检查 Next.js 服务器日志：`pm2 logs gallery-app`

### 资源加载失败

- 确认 `next.config.ts` 中 `basePath` 配置为 `/gallery`
- 检查浏览器控制台错误信息
- 确认 Tengine 配置中的 `proxy_pass` 指向正确的端口

## 详细文档

更多详细信息请参考 [DEPLOY.md](./DEPLOY.md)

