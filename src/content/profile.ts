export const profile = {
  name: "Archit Mehta",
  firstName: "Archit",
  role: "Founder & Software Engineer",
  headline: "CEO of Stamp (YC W25)",
  location: "San Francisco, CA",
  email: "4architmehta@gmail.com",
  headshot: "/Archit_Headshot.jpeg",
  resume: "/Archit_Mehta_Resume.pdf",
  tagline:
    "I’m a tech entrepreneur building Stamp, the AI Secretary, a new email platform backed by Y Combinator.",
  socials: {
    github: "https://www.github.com/Archit404Error",
    linkedin: "https://www.linkedin.com/in/4architmehta/",
    email: "mailto:4architmehta@gmail.com",
  },
  links: {
    stamp: "https://stampmail.ai",
    ycombinator: "https://www.ycombinator.com/companies/stamp",
    stripe: "https://stripe.com",
    appdev: "https://cornellappdev.com",
  },
} as const;

export type IntroToken =
  | string
  | { text: string; href: string; external?: boolean };

export const introParagraphs: IntroToken[][] = [
  [
    "I’m a tech entrepreneur currently building ",
    { text: "Stamp", href: profile.links.stamp, external: true },
    ", the AI Secretary. Stamp is a new email platform that provides every user with their own personal Secretary that triages, writes, and learns like them. Stamp is also backed by ",
    { text: "Y Combinator", href: profile.links.ycombinator, external: true },
    ".",
  ],
  [
    "I’ve built dozens of ",
    { text: "projects", href: "#projects" },
    " with hundreds of thousands of users, and as an avid entrepreneur I’m always tinkering and building new ideas with the potential to revolutionize the world.",
  ],
  [
    "Prior to founding Stamp, I worked as a software engineer at ",
    { text: "Stripe", href: profile.links.stripe, external: true },
    ", where I saved the company more than $1 million annually through the performance improvements I made.",
  ],
  [
    "I graduated from Cornell University with a degree in Computer Science and minor in Applied Mathematics. On campus, I was President of ",
    { text: "Cornell AppDev", href: profile.links.appdev, external: true },
    ", a team of 50 students building apps with over 15,000 combined active users.",
  ],
];

export interface Affiliation {
  name: string;
  logo: string;
  blurb: string;
}

export const affiliations: Affiliation[] = [
  {
    name: "Stamp",
    logo: "/orgs/stamp.svg",
    blurb: "CEO & founder of Stamp (YC W25), the AI Secretary for email.",
  },
  {
    name: "Stripe",
    logo: "/orgs/stripe.svg",
    blurb:
      "I was previously a Software Engineer at Stripe, saving the firm $1 million annually in database costs.",
  },
  {
    name: "Apple",
    logo: "/orgs/apple.jpg",
    blurb:
      "I’ve interned at Apple, where I constructed a 10,000+ line C++ library from scratch to aid navigation of autonomous vehicles.",
  },
  {
    name: "Cornell",
    logo: "/orgs/cornell.png",
    blurb:
      "I studied CS & Math at Cornell, where I also conducted Computer Vision research.",
  },
  {
    name: "Cornell AppDev",
    logo: "/orgs/appdev.png",
    blurb:
      "I was president of Cornell AppDev, a team of 50+ student software engineers building products for 15,000+ users.",
  },
];
