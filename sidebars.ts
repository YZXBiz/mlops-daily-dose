import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Part I: Foundations',
      collapsed: false,
      items: [
        'chapter1',
        'chapter2',
        'chapter3',
        'chapter4',
      ],
    },
    {
      type: 'category',
      label: 'Part II: Data & Features',
      collapsed: false,
      items: [
        'chapter5',
        'chapter6',
        'chapter7',
      ],
    },
    {
      type: 'category',
      label: 'Part III: Training & Experimentation',
      collapsed: false,
      items: [
        'chapter8',
        'chapter9',
        'chapter10',
      ],
    },
    {
      type: 'category',
      label: 'Part IV: Deployment & Serving',
      collapsed: false,
      items: [
        'chapter11',
        'chapter12',
        'chapter13',
      ],
    },
    {
      type: 'category',
      label: 'Part V: Monitoring & Operations',
      collapsed: false,
      items: [
        'chapter14',
        'chapter15',
        'chapter16',
      ],
    },
    {
      type: 'category',
      label: 'Part VI: LLMOps',
      collapsed: false,
      items: [
        'chapter17',
        'chapter18',
      ],
    },
  ],
};

export default sidebars;
