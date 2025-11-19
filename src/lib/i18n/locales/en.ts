import type { Dictionary } from "../types";

export const enDictionary: Dictionary = {
  hero: {
    title: "AI Gallery · A stage for AI-native experiences",
    description:
      "A shared showroom for multimodal interactions, generative motion, and assistant UIs—drop a demo in and let everyone see how AI transforms product experience.",
    counterSuffix: "Projects",
  },
  gallery: {
    label: "Gallery",
    title: "Projects",
    emptyPrefix: "No demo yet. Copy ",
    emptyMiddle: " as a template and add ",
    emptySuffix: " plus a cover image to see it here.",
    templatePath: "src/app/poetry",
    configFile: "demo.json",
    cardCta: "Open demo",
  },
  workflow: {
    title: "How to add a project",
    intro: "Follow the workflow",
    steps: [
      {
        title: "Fork the repo",
        body: `# Fork on GitHub\nhttps://github.com/ZeroZ-lab/fast-ai-gallery\n# Or via CLI\ngh repo fork ZeroZ-lab/fast-ai-gallery --clone`,
      },
      {
        title: "Duplicate the template",
        body: `mkdir -p src/app/my-demo\ncp src/app/poetry/page.tsx src/app/my-demo/page.tsx`,
      },
      {
        title: "Add metadata",
        body: `# src/app/my-demo/demo.json\n{\n  "title": "My Demo",\n  "description": "One-line pitch",\n  "image": "cover.jpg"\n}`,
      },
      {
        title: "Drop the cover",
        body: `# Place the image next to the page\ncp ~/Downloads/cover.png src/app/my-demo/cover.png`,
      },
    ],
  },
};
