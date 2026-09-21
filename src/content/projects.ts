export interface ProjectArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface ProjectArticle {
  kicker?: string;
  lead: string[];
  sections: ProjectArticleSection[];
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  device: "desktop" | "phone";
  url?: string;
  appStore?: string;
  marketplace?: string;
  npm?: string;
  github?: string;
  impact?: string;
  tech?: string[];
  article: ProjectArticle;
}

export const projects: Project[] = [
  {
    slug: "strompt",
    title: "Strompt: Structured Prompts",
    description:
      "Strompt (structured prompts) is an opinionated, zero-dependency TypeScript library for building readable, correct, and maintainable prompts for agentic applications. Instead of sprawling template strings, prompts are composed with a fluent builder of sections, subsections, and lists that render to clean Markdown with automatic numbering, making them easy to debug, diff, and reuse. Renderers are fully extensible, so teams can override how any node is rendered or define their own from scratch.",
    image: "/projects/strompt_mac.png",
    device: "desktop",
    npm: "https://www.npmjs.com/package/@4arch/strompt",
    github: "https://github.com/Archit404Error/strompt",
    tech: ["TypeScript", "npm", "Fluent Builder API", "Markdown", "LLM Agents"],
    article: {
      kicker: "Open source, TypeScript library",
      lead: [
        "When building agentic applications, a massive amount of logic is encoded as plaintext strings scattered throughout the codebase. As the codebase grows, it becomes nearly impossible to enforce a consistent prompt structure, or even to avoid typos and formatting mistakes while updating prompts.",
        "Strompt began as a solution to this problem, an attempt to solve this maintenance problem by asking if it would be possible to write prompts as code rather than strings, and therefore enforce the same maintainability patterns applied to code to agentic prompts.",
        "The result is a zero-dependency TypeScript library that treats prompts like documents -- composed from sections, lists, and nested blocks that render to clean, formatted Markdown.",
      ],
      sections: [
        {
          heading: "Why structure matters",
          paragraphs: [
            "To prevent prompt instructions, maximize agent performance, and make debugging simpler, it's important that prompts be cleanly structured with defined sections and consistent rendering strategies for serialized resources.",
            "With Strompt, these concepts are enforced through a clean, Fluid-Builder design pattern that enables prompts to be treated just like any other piece of code. With Strompts, prompts have the deterministic structure of code with the inherent flexibility of natural language.",
          ],
        },
        {
          heading: "Extensible by design",
          paragraphs: [
            "Strompt's default renderer produces markdown based prompts, and is fully extensible. Specific rendering methods can be overriden via the renderer's overrideSpec() method to employ custom rendering strategies, enabling any custom rendering format that may need to be supported for a given prompt.",
            "Moreover, Strompt also provides the ability to define custom prompt renderers by subclassing the PromptRenderer abstraction, enabling fully custom renderers in any format.",
          ],
        },
        {
          heading: "Key Learnings",
          paragraphs: [
            "We're still very early in the age of agents, which means primitives and best practices have yet to be defined. As developers, we can leverage the same principles applied to traditional code (abstraction, DRY) to build new abstractions that enable maintainable, consistent agentic applications. Strompt was the result of this thinking when applied to agent prompts, and there are many more such libraries and applications that may be built with this principle in mind in the future.",
          ],
        },
      ],
    },
  },
  {
    slug: "archivist",
    title: "Archivist: AI Code Search",
    description:
      "Archivist is a VS Code extension that brings blazingly fast, AI-powered semantic search to any codebase. It indexes a project in minutes using a custom-trained code embedding model, answers natural-language queries in milliseconds, and summarizes matched snippets to explain what they do, keeping its index in sync as you edit. Code is chunked with Tree-sitter syntax trees for precise results, and your source is never stored.",
    image: "/projects/archivist_vscode.png",
    video: "/projects/archivist_demo.mp4",
    device: "desktop",
    marketplace:
      "https://marketplace.visualstudio.com/items?itemName=4architmehta.archivist",
    github: "https://github.com/Archit404Error/Archivist",
    tech: [
      "TypeScript",
      "VS Code API",
      "FastAPI",
      "Sentence Transformers",
      "Tree-sitter",
      "Pinecone DB",
      "MongoDB",
      "Docker",
    ],
    article: {
      kicker: "The missing semantic search feature in your IDE",
      lead: [
        "Archivist is the blazingly fast semantic search engine built for natural code seach, directly in VS Code. Ask a question in plain English, get the right snippet back in milliseconds.",
        "Under the hood Archivist combines Tree-sitter chunking, a custom-trained code embedding model, and a live local indexing so results stay fresh as you edit.",
      ],
      sections: [
        {
          heading: "Indexing that respects syntax",
          paragraphs: [
            "Most embedding pipelines slice files by character or line count and hope for the best. Archivist walks Tree-sitter syntax trees so chunks align with real functions, classes, and modules, meaning retrieved chunks are coherent abstractions rather than massive fragments.",
            "Once indexed, natural-language queries hit a vector store and return reranked snippets, along with a summary that highlights the most relevant chunks.",
          ],
        },
        {
          heading: "Privacy first design",
          paragraphs: [
            "Source code is never stored on Archivist servers. Retrieval operates purely against chunk metadata, and privacy is a core guarantee of Archivist.",
          ],
        },
        {
          heading: "Key Learnings",
          paragraphs: [
            "While building Archivist, I learned how to build and deploy a vector embedding and retrieval pipeline at scale, create a VS Code extension, and utilize Tree Sitter for parsing code syntax trees across a variety of languages. This experience deepend my knowledge across the full stack, as I worked across VS Code frontend APIs, ML fine tuning, and building a search pipeline.",
          ],
        },
      ],
    },
  },
  {
    slug: "cornell-course-engine",
    title: "Cornell Course Engine",
    description:
      "Integrated directly with Cornell's class roster, this course search engine utilizes a custom Semantic Indexing and Search pipeline to help Cornell students discover interesting courses based on natural language queries.",
    image: "/projects/semantic_search_mac.png",
    device: "desktop",
    url: "https://www.youtube.com/watch?v=oEjnem97er4",
    github: "https://github.com/Archit404Error/SemanticClassSearch",
    tech: ["React", "Flask", "HF Transformers", "Pinecone DB", "EC2"],
    article: {
      kicker: "Campus tooling, semantic retrieval",
      lead: [
        "Cornell's massive course catalog made it extremely difficult for students (including myself) to find interesting classes, especially since the roster only included keyword search. The Semantic Course Engine I built lets students describe an interest in natural language and helps them discover new and interesting classes they may be interested in.",
      ],
      sections: [
        {
          heading: "Encoding meaning in vectors",
          paragraphs: [
            "Building the embedding and retrieval pipeline required fine tuning a custom embedding model. To generate the dataset, I leveraged sythetic query generation using BeIR and templated strings, using contrastive learning to tune the model and account for a variety of potential student queries.",
            "The results are then shortlisted and reranking via a custom built cross encoder model, with the app being accessible on both web and mobile.",
          ],
        },
        {
          heading: "Key Learnings",
          paragraphs: [
            "Creating this course engine not taught me how to perform contrastive learning and build a semantic search pipline (a concept I would implement in even greater detail for Archivist), it also made a massive impact on campus.",
            "Thousands of students were able to use Archivist to find interesting classes and enroll in them, classes may have been undiscovered or required hours of manual combing through the class roster to discover otherwise.",
          ],
        },
      ],
    },
  },
  {
    slug: "yolo",
    title: "Yolo: Social Events",
    description:
      "Yolo is the first social media app built around your calendar. It's designed to help you find fun events on campus and make friends with similar interests, and launched at Cornell in Fall 2022!",
    image: "/projects/yolo_phone.png",
    device: "phone",
    appStore: "https://apps.apple.com/us/app/yolo-cornell-events/id1618863681",
    github: "https://github.com/Archit404Error/YoloMobile",
    impact: "300+ Daily Active Users, 1000+ Users",
    tech: [
      "React Native",
      "MongoDB",
      "Express.js & Node.js",
      "Socket.io",
      "AWS CloudFront",
      "AWS S3",
      "AWS EC2",
    ],
    article: {
      kicker: "Mobile, social, campus launch",
      lead: [
        "Making plans on campus shouldn't require five group chats and a spreadsheet. Yolo puts events on a social graph wired to your calendar, making it easy to find the events you care about.",
        "We launched at Cornell in Fall 2022 and grew to hundreds of daily active users by leaning into what students already do: browse, RSVP, and show up together.",
      ],
      sections: [
        {
          heading: "Product thinking",
          paragraphs: [
            "The feed surfaces campus events that you're actually interested in, it understand which of your friends are going to a particular event and also whether or not that event matches your interests.",
            "Every event came with its own group chat, allowing attendees to communicat with one another beforehand and share memories afterwards. Upon accepting an event, it was easy to invite your friends and spread the word, making it extremely helpful for event hosts.",
          ],
        },
        {
          heading: "Engineering under the hood",
          paragraphs: [
            "React Native on the client, Express and MongoDB on the server, media and static assets on S3/CloudFront, compute on EC2. The hardest problems were safety, moderation, and breaking the chicken-and-egg paradox for initial events on the platform.",
          ],
        },
      ],
    },
  },
  {
    slug: "newsflash",
    title: "Newsflash: AI News",
    description:
      "NewsFlash is a website and mobile app that utilizes Machine Learning to identify news bias. It displays top headlines (and their bias), and is capable of analyzing the sentiments and bias of any article on the web.",
    image: "/projects/newsflash_mac.png",
    device: "desktop",
    url: "http://3.84.0.201:8000/",
    appStore:
      "https://apps.apple.com/us/app/newsflash-unbiased-news/id1578807973",
    impact: "1,000+ Users; 50,000+ Articles Analyzed",
    tech: ["TensorFlow", "NLTK", "React Native", "Flask", "SQL"],
    article: {
      kicker: "ML product, media literacy",
      lead: [
        "Newsflash aims to provide truly unbiased news. Not by rewriting news articles, but rather by exposing their inherent bias. It scores top stories for bias and sentiment, and lets anyone paste a URL to analyze an article on the fly.",
      ],
      sections: [
        {
          heading: "Models in the loop",
          paragraphs: [
            "A TensorFlow + NLTK pipeline classifies tone and ideological lean, displaying the bias of the latest articles on a particular subject.",
            "Newsflash is available both on web and mobile, and deploying to its userbase required me to consider advanced optimizations, such as caching article analyses for a given query for reuse to reduce server load.",
          ],
        },
        {
          heading: "Traction",
          paragraphs: [
            "Thousands of users downloaded the app and utilized Newsflash to proactively analyze articles and comabat news bias.",
          ],
        },
      ],
    },
  },
  {
    slug: "volume",
    title: "Volume: Cornell Publications",
    description:
      "Volume is a mobile app which aggregates all student publications, magazines, and flyers on Cornell campus. I led a team of 10 developers, designers, and marketers to build the app and grow it to over 400 users.",
    image: "/projects/volume_phone.png",
    device: "phone",
    github: "https://github.com/cuappdev/volume-backend",
    impact: "400+ users; 20+ publications; 5,000+ articles",
    tech: [
      "GraphQL",
      "MongoDB",
      "Express & Node.js",
      "TypeScript",
      "RSS Parsing",
    ],
    article: {
      kicker: "Cornell AppDev, leadership",
      lead: [
        "Student journalism at Cornell is vibrant and fragmented. Volume pulls publications, magazines, and flyers into one mobile reader so students can actually find the writing happening around them.",
        "I led a team of ten engineers, designers, and marketers from first API sketch to a campus launch that crossed four hundred users.",
      ],
      sections: [
        {
          heading: "Ingestion at scale",
          paragraphs: [
            "To build Volume, I helped cosntruct an RSS based ingestion layer to normalize inconsistent feeds into a unified GraphQL API backed by MongoDB. Publication partners keep their existing workflows while readers get a single, polished surface.",
            "Even beyond RSS ingestion, as Volume grew to display magazine and flyer publications, I led the construction of a publisher upload platform, enabling publishers to track analytics and upload directly onto Volume.",
          ],
        },
        {
          heading: "Leadership and growth",
          paragraphs: [
            "The technical work mattered, but so did shipping speed and inspiring the team I was leading. I emphasized creating a strong tightly knit culture built around shipping fast and collecting user feedback, and doing so taught me the importance in embracing personal connection as a leader, beyond simply focusing on the technology itself.",
          ],
        },
      ],
    },
  },
  {
    slug: "pricemerge",
    title: "PriceMerge",
    description:
      "PriceMerge empowers users to combat price hiking by allowing users to compare and track product prices across thousands of websites, automatically notifying them when prices drop. PriceMerge aided tens of thousands of users in acquiring PPE during the COVID-19 pandemic and has been featured on the national news.",
    image: "/projects/pricemerge_mac.png",
    device: "desktop",
    github: "https://github.com/Archit404Error/PriceMerge",
    impact: "25,000+ Users; 200,000+ Searches; Featured on national news",
    article: {
      kicker: "Consumer tooling, crisis response",
      lead: [
        "When prices spiked during the COVID pandemic, PPE became almost impossible to find. PriceMerge tracked products across thousands of storefronts and pinged users the moment a price dropped.",
        "During the pandemic it helped tens of thousands of people find PPE, racked up hundreds of thousands of searches, and earned national news coverage.",
      ],
      sections: [
        {
          heading: "Watching the market",
          paragraphs: [
            "PriceMerge leveraged scrapers to turn a messy web of listings into a single watchlist. Users could follow the items they cared about while the system handled continuous monitoring and alerts.",
            "The product was built for reliability and clarity, as users needed to know where stock existed and what it cost, fast.",
          ],
        },
        {
          heading: "Key Learnings",
          paragraphs: [
            "Shipping something people relied on during a crisis taught me a lot of about the importance of reliability, uptime, and building scalable systems. As my first ever major project, it also served as a way for me to discovery love of using technology to benefit others, and taught me the importance of customer obsession.",
          ],
        },
      ],
    },
  },
  {
    slug: "eatery",
    title: "Eatery: Cornell Dining",
    description:
      "Eatery is an app built by Cornell AppDev to display Cornell dining hall menus to 10,000+ users daily. I worked as a backend developer on a team of 10 to architect a new backend from scratch to enable account personalization, food recommendations, and item favoriting.",
    image: "/projects/eatery_phone.png",
    device: "phone",
    github: "https://github.com/cuappdev/eatery-blue-backend",
    impact: "10,000 Monthly Users; 30,000+ downloads",
    tech: ["Django", "PostGreSQL", "SQLAlchemy"],
    article: {
      kicker: "Cornell AppDev, backend rebuild",
      lead: [
        "Eatery is how Cornellians decide what to eat. With tens of thousands of monthly users, it was time to build an architecture that lived up to user demand.",
      ],
      sections: [
        {
          heading: "Rebuilding the foundation",
          paragraphs: [
            "I joined a team of ten to architect a new backend from scratch. We leveraged Django and PostgreSQL along side SQLAlchemy for data access and menu ingestion.",
            "We had to build flexible database schemas that could account for ever-shifting menus and enforce autoscaling to handle usage spikes during peak activity.",
          ],
        },
        {
          heading: "Personalization at campus scale",
          paragraphs: [
            "Favorites and recommendations sound simple until it's time to model dining halls, stations, dietary tags, and meal periods correctly. It was very difficult to get this feature right, and it required lots of discussion amongst the team and feedback from users.",
          ],
        },
      ],
    },
  },
];
