export type WorkflowStep = {
  title: string;
  body: string;
};

export type Dictionary = {
  hero: {
    title: string;
    description: string;
    counterSuffix: string;
  };
  gallery: {
    label: string;
    title: string;
    emptyPrefix: string;
    emptyMiddle: string;
    emptySuffix: string;
    templatePath: string;
    configFile: string;
    cardCta: string;
  };
  workflow: {
    title: string;
    intro: string;
    steps: WorkflowStep[];
  };
};
