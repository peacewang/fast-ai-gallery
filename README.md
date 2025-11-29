# AI Gallery

AI Gallery 是一个极简的 Next.js 外壳，用来快速托管交互 Demo。你只需要把每个 Demo 当成一个独立的 App Router 路由，就能立即在本地或 Vercel 上访问，首页会自动列出所有作品。

**生产环境**: 已部署到 [https://www.peacewang.com/gallery](https://www.peacewang.com/gallery)

## 本地开发

```bash
pnpm install
pnpm dev
```

然后打开 [http://localhost:3000](http://localhost:3000) 查看首页，以及当前维护的 Demo 链接。

**注意**: 本地开发时，`basePath` 配置会自动禁用，可以直接访问根路径。生产环境会自动使用 `/gallery` 作为基础路径。

## 如何添加新的 Demo

1. 在 `src/app` 下创建一个目录，例如 `src/app/my-demo`。
2. 将 `src/app/poetry/page.tsx` 复制过去并替换内容，或直接编写一个新的 `page.tsx`。如果组件使用了 `useState/useEffect` 等客户端特性，文件头部加上 `'use client';`。
3. 在目录里新建 `demo.json`，填入在首页展示用的元数据，并用 `image` 指向同目录下的封面图。例如：
   ```json
   {
     "title": "My Demo",
     "description": "一句话描述，展示在首页",
     "image": "cover.png"
   }
   ```
4. 把封面图放在同目录（如 `src/app/my-demo/cover.png`）。支持 `jpg/png/webp/svg/gif`，也可以把 `image` 配置成外链或 `/public` 路径。
5. 访问 `/my-demo` 验证效果。首页会自动扫描 `src/app/*/demo.json` 和封面图，生成卡片。
6. 提交后部署即可上线。

## 部署到生产环境

本项目已配置为部署到 PeaceWang 个人网站 (`https://www.peacewang.com/gallery`)。

### 快速部署

**首次使用**：需要先配置部署脚本：

1. 复制模板文件：
   ```bash
   cp deploy-gallery.bat.example deploy-gallery.bat
   cp QUICK_START.md.example QUICK_START.md
   ```

2. 编辑 `deploy-gallery.bat`，修改服务器IP和配置信息

3. 在 Windows 环境下，双击运行 `deploy-gallery.bat` 脚本即可自动完成部署

**注意**：`deploy-gallery.bat` 和 `QUICK_START.md` 包含服务器敏感信息，已添加到 `.gitignore`，不会提交到 Git。

### 详细部署说明

请查看 [DEPLOY.md](./DEPLOY.md) 了解完整的部署流程、服务器配置和故障排查指南。

## 目录结构

```
src/app/
  page.tsx           # 首页，自动列出 Demo
  poetry/
    page.tsx        # 示例：枫桥夜泊交互诗词卡片
    demo.json       # 首页展示用的标题、描述、封面
    cover.jpg       # 本地封面图，和 demo.json 一起被读取
```

欢迎在此基础上扩展更多页面，或加入 Storybook、MDX 等工具来管理 Demo 资产。README 只保留最小必要步骤，方便快速复制粘贴投入使用。
