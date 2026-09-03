import type { Locale } from './routing';

type UiCopy = {
  switchLabel: string;
  switchAriaLabel: string;
  openMenuAriaLabel: string;
  closeMenuAriaLabel: string;
  backHome: string;
  backNews: string;
  readMore: string;
  note: string;
  aboutHeading: string;
  emailAriaLabel: string;
  navigation: Record<string, string>;
  home: {
    title: string;
    recentUpdates: string;
    recentUpdatesSubtitle: string;
    viewAllNews: string;
  };
  news: {
    title: string;
    description: string;
    dateLocale: string;
  };
  projects: {
    title: string;
    description: string;
  };
  publications: {
    title: string;
    description: string;
    paperSingular: string;
    paperPlural: string;
  };
  cv: {
    downloadPdf: string;
  };
  teaching: {
    institution: string;
    role: string;
    highlight: string;
    rated: string;
    description: string;
  };
  heroActions: {
    cv: string;
    lab: string;
  };
};

export const ui: Record<Locale, UiCopy> = {
  en: {
    switchLabel: '中文',
    switchAriaLabel: 'Switch to Chinese',
    openMenuAriaLabel: 'Open menu',
    closeMenuAriaLabel: 'Close menu',
    backHome: 'Back to Home',
    backNews: 'Back to News',
    readMore: 'Read more',
    note: 'Note',
    aboutHeading: 'About Me',
    emailAriaLabel: 'Email',
    navigation: {
      '/': 'Home',
      '/#about': 'About',
      '/news': 'News',
      '/projects': 'Projects',
      '/teaching': 'Teaching',
      '/publications': 'Publications',
      '/cv': 'CV',
    },
    home: {
      title: 'Home',
      recentUpdates: 'Recent Updates',
      recentUpdatesSubtitle: 'Selected updates from my research, teaching, and professional work.',
      viewAllNews: 'View all news',
    },
    news: {
      title: 'News',
      description: 'A complete timeline of my professional journey and updates.',
      dateLocale: 'en',
    },
    projects: {
      title: 'Projects',
      description: 'Selected work across AI4Science, intelligent laboratory systems, XR, and human-centred computing.',
    },
    publications: {
      title: 'Publications',
      description: 'Research contributions in AI, computer vision, multimedia, XR, and human-centred computing.',
      paperSingular: 'paper',
      paperPlural: 'papers',
    },
    cv: {
      downloadPdf: 'Download PDF',
    },
    teaching: {
      institution: 'Institution',
      role: 'Role',
      highlight: 'Highlight',
      rated: 'Rated',
      description: 'Description',
    },
    heroActions: {
      cv: 'View CV',
      lab: 'Visit EC-ZERO Lab',
    },
  },
  zh: {
    switchLabel: 'English',
    switchAriaLabel: '切换到英文',
    openMenuAriaLabel: '打开菜单',
    closeMenuAriaLabel: '关闭菜单',
    backHome: '返回首页',
    backNews: '返回动态',
    readMore: '阅读全文',
    note: '备注',
    aboutHeading: '关于我',
    emailAriaLabel: '发送邮件',
    navigation: {
      '/': '首页',
      '/#about': '关于我',
      '/news': '动态',
      '/projects': '项目',
      '/teaching': '教学',
      '/publications': '成果',
      '/cv': '简历',
    },
    home: {
      title: '首页',
      recentUpdates: '近期动态',
      recentUpdatesSubtitle: '精选科研、教学与职业动态。',
      viewAllNews: '查看全部动态',
    },
    news: {
      title: '动态',
      description: '记录我的职业经历、研究工作与近期进展。',
      dateLocale: 'zh-CN',
    },
    projects: {
      title: '项目',
      description: '人工智能赋能科学研究、智能实验室、扩展现实与以人为本计算方向的代表性工作。',
    },
    publications: {
      title: '科研成果',
      description: '人工智能、计算机视觉、多媒体、扩展现实与以人为本计算方向的研究成果。',
      paperSingular: '篇成果',
      paperPlural: '篇成果',
    },
    cv: {
      downloadPdf: '下载英文版 PDF',
    },
    teaching: {
      institution: '机构',
      role: '职责',
      highlight: '亮点',
      rated: '学生评分',
      description: '课程简介',
    },
    heroActions: {
      cv: '查看简历',
      lab: '了解 EC-ZERO 实验室',
    },
  },
};
