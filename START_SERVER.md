# 启动开发服务器指南

## 快速启动

在项目根目录（`fast-ai-gallery`）下执行：

```powershell
npm run dev
```

## 访问地址

服务器启动后，访问：
- **首页**：http://localhost:3000
- **朝代演示**：http://localhost:3000/dynasty

## 如果遇到问题

### 1. 端口被占用

如果 3000 端口被占用，可以使用其他端口：

```powershell
npm run dev -- -p 3001
```

然后访问 http://localhost:3001

### 2. 查看详细错误

如果服务器无法启动，查看终端输出的错误信息。

### 3. 清理并重新安装

```powershell
# 删除 node_modules 和锁定文件
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# 重新安装
npm install

# 启动服务器
npm run dev
```

### 4. 检查 Node.js 版本

确保 Node.js 版本 >= 18：

```powershell
node --version
```

## 服务器启动成功的标志

您应该看到类似这样的输出：

```
  ▲ Next.js 16.0.3
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

## 功能验证

启动成功后，您可以：
1. 访问首页查看所有 Demo
2. 点击"中国朝代更迭"卡片
3. 体验各种视图模式和功能

