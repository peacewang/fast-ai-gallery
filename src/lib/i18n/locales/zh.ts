import type { Dictionary } from "../types";

export const zhDictionary: Dictionary = {
  hero: {
    title: "AI Gallery · 让 AI 能力落地的展厅",
    description:
      "这里是团队投放 AI 想法的地方：多模态交互、生成式动效、智能助手 UI……只要放进 Gallery，就能以最直观的方式展示「AI 如何改变产品体验」。",
    counterSuffix: "个作品",
  },
  gallery: {
    label: "Gallery",
    title: "作品速览",
    emptyPrefix: "暂无 Demo。复制 ",
    emptyMiddle: " 作为模板并添加 ",
    emptySuffix: " 与封面图片即可自动出现。",
    templatePath: "src/app/poetry",
    configFile: "demo.json",
    cardCta: "打开 Demo",
  },
  workflow: {
    title: "如何为 AI Gallery 添加作品",
    intro: "Follow the workflow",
    steps: [
      {
        title: "Fork 仓库",
        body: `# 在 GitHub 上 Fork\nhttps://github.com/peacewang/fast-ai-gallery\n# 或使用 CLI\ngh repo fork peacewang/fast-ai-gallery --clone`,
      },
      {
        title: "复制模板",
        body: `mkdir -p src/app/my-demo\ncp src/app/poetry/page.tsx src/app/my-demo/page.tsx`,
      },
      {
        title: "添加 metadata",
        body: `# src/app/my-demo/demo.json\n{\n  "title": "My Demo",\n  "description": "一句话描述",\n  "image": "cover.jpg"\n}`,
      },
      {
        title: "放置封面",
        body: `# 将封面图放在该目录\ncp ~/Downloads/cover.png src/app/my-demo/cover.png`,
      },
    ],
  },
};
