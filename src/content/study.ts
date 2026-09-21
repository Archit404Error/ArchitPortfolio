export const studyIntro = {
  title: "The Study.",
  lede: "The study is a peek into my mind. What I’m reading, the research questions I keep returning to, and notes from the academic side of my life.",
} as const;

export type BookStatus = "reading" | "finished" | "next";

export interface Book {
  title: string;
  author: string;
  status: BookStatus;
  year?: number;
  rating?: number;
  note?: string;
  cover?: string;
  url?: string;
  spine?: string;
}

export const bookStatusLabel: Record<BookStatus, string> = {
  reading: "Reading now",
  finished: "Finished",
  next: "Up next",
};

export const bookshelf: Book[] = [
  {
    title: "The Wealth of Nations",
    author: "Adam Smith",
    status: "finished",
    year: 2026,
    rating: 5,
    note: "As expected, Capitalism from first principles is a pretty great read.",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    status: "finished",
    year: 2026,
    rating: 5,
    note: "The most contrarian thing of all is not to oppose the crowd, but to think for yourself.",
  },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    status: "finished",
    year: 2024,
    rating: 5,
    note: "All human wisdom is contained in these two words: 'wait and hope.'",
  },
  {
    title: "Elon Musk",
    author: "Walter Isaacson",
    status: "finished",
    year: 2023,
    rating: 4.5,
    note: "Well written with interesting core themes; would have loved to hear more about the early days of Musk's first startup",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andy Hunt & Dave Thomas",
    status: "finished",
    year: 2022,
    rating: 5,
    note: "A seminal engineering text that forever improved the way I think about and write code.",
  },
  {
    title: "Steve Jobs",
    author: "Walter Isaacson",
    rating: 5,
    status: "finished",
    note: "The greatest tech entrepreneur of all time.",
  },
];

export type QuestionStatus = "exploring" | "active" | "parked";

export interface ResearchQuestion {
  question: string;
  why: string;
  status: QuestionStatus;
  links?: { label: string; href: string }[];
}

export const questionStatusLabel: Record<QuestionStatus, string> = {
  exploring: "Exploring",
  active: "Active",
  parked: "Parked for now",
};

export const researchQuestions: ResearchQuestion[] = [
  {
    question:
      "Is there a fundamental limit to the generalization capability of Transformer based Large Language Models?",
    why: "We've seen massive gains in domains like coding and mathematics over the past few years form Transformer based LLMs, but its unclear whether such gains can be made in other domains. It will be necessary for us to consider whether there is a fundamental limit to the LLM architecture, or whether any domain can be solved with the right training data.",
    status: "active",
  },
  {
    question:
      "What exactly causes LLMs to develop an impersonal and distinctly robotic style, and how can we avoid it?",
    why: "Producing aligned LLMs that still sound authentic and unique is a core issue for building any communication platform that's centered around AI. I'm deeply interested in exploring how we can build authentically human models that can still embody the current formal LLM tone when necessary.",
    status: "exploring",
  },
  {
    question:
      "What is the optimal memory paradigm for Agents that need to intimately understand their users' lives?",
    why: "When building any memory system, the core problems come down to understanding which memories are actually important and useful when interacting with the user, and which ones can be forgotten. This is extremely difficult to determine in practice, yet highly necessary for any true personal assistant.",
    status: "exploring",
  },
];

export interface AcademicEntry {
  title: string;
  meta?: string;
  detail?: string;
  href?: string;
}

export interface AcademicSection {
  id: string;
  heading: string;
  lede?: string;
  entries: AcademicEntry[];
}

export const academic: AcademicSection[] = [
  {
    id: "research",
    heading: "Research",
    entries: [
      {
        title: "Computer vision research with Prof. Noah Snavely",
        meta: "Cornell University, Aug 2023 to present",
        detail:
          "Improving the accuracy of a video entity motion-detection pipeline: implementing a CoTracker optical-flow stage for data preprocessing, optimizing network efficiency, and investigating how the pipeline’s bijective mappings to a 3D canonical space can be used for generative video editing.",
      },
    ],
  },
  {
    id: "education",
    heading: "Education",
    entries: [
      {
        title: "B.S. in Computer Science, minor in Applied Mathematics",
        meta: "Cornell University",
        detail:
          "Merrill Presidential Scholar Award Recipient for outstanding academic and research achievement",
      },
    ],
  },
  {
    id: "papers",
    heading: "Papers that shaped my thinking",
    lede: "The papers that redefined my perception of the AI field.",
    entries: [],
  },
  {
    id: "teaching",
    heading: "Teaching and talks",
    entries: [],
  },
];

export const hasStudyContent =
  bookshelf.length > 0 ||
  researchQuestions.length > 0 ||
  academic.some((section) => section.entries.length > 0);
