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
};
