export interface Experience {
  title: string;
  organization: string;
  description: string[];
  image: string;
  startDate: string;
  endDate: string;
  logoBg?: string;
}

export const experience: Experience[] = [
  {
    title: "Chief Executive Officer",
    organization: "Stamp (YC W25)",
    description: [
      "Architected and Implemented a service oriented backend integrating directly with IMAP and SMTP email protocols, supporting all modern email client features (schedule send, snoozed emails, labels, etc)",
      "Built an IMAP-optimized Agent SDK to construct a multi-agent ecosystem, with distinct agents for email annotation (summarization, todos, draft replies), user memories, Deep Research, Voice Mode, and more",
      "Fine-tuned a multilingual embedding model via contrastive learning to implement both a Retrieval Augmented Generation pipeline (hybrid semantic search + reranking) and a semi-supervised clustering email labeling algorithm",
      "Built Web, iOS, Android, and Desktop apps, with on-device persistence, notifications, and background refresh",
    ],
    image: "/orgs/stamp.svg",
    startDate: "Jan 2025",
    endDate: "Present",
    logoBg: "#0b1220",
  },
  {
    title: "Software Engineer",
    organization: "Stripe",
    description: [
      "Saved $1 million annually in database costs by optimizing PaymentIntents API code, and performing shard-aware database migrations for 150 billion stale records via PySpark, Databricks, Apache Airflow, and Apache Iceberg",
      "Improved API performance and stability for the PaymentIntents Multicapture API by using the Factory Design Pattern to decouple code across customer environments, increasing test coverage by 20%",
      "Improved Adaptive Pricing API semantics by adding presentment currency fields to the PaymentIntent Dataview and refactoring legacy PaymentIntent APIs to support multi-currency presentment",
    ],
    image: "/orgs/stripe.svg",
    startDate: "Jul 2024",
    endDate: "Dec 2024",
  },
  {
    title: "Software Engineer Intern",
    organization: "Apple",
    description: [
      "Implemented custom C++ library to detect topological and geometric changes in HD Maps for autonomous systems, reducing data transition time by 70%",
      "Constructed custom UI geometry classes, modals, and event handlers in Objective C to visualize library analysis in custom MacOS application",
      "Architected Protobuf schemas for library analysis serialization, visualization, and deployment",
    ],
    image: "/orgs/apple.jpg",
    startDate: "May 2023",
    endDate: "Aug 2023",
  },
  {
    title: "Computer Vision Researcher",
    organization: "Research at Cornell",
    description: [
      "Working with Prof. Noah Snavely to improve the accuracy of video entity motion detection pipeline",
      "Implementing CoTracker optical flow pipeline for data preprocessing and optimizing neural network efficiency",
      "Investigating applications of pipeline's bijective mappings to 3D canonical space in generative AI video editing",
    ],
    image: "/orgs/cornell.png",
    startDate: "Aug 2023",
    endDate: "May 2024",
  },
  {
    title: "President",
    organization: "Cornell AppDev",
    description: [
      "Leading all Software Development (iOS, Android, Backend) for a team of 50 students building apps with 10,000+ active users",
      "Constructing team vision, overseeing logistics, and communicating with stakeholders in Cornell administration",
      "Previously served as Product Lead, Technical Product Manager, and Backend Developer",
    ],
    image: "/orgs/appdev.png",
    startDate: "Feb 2022",
    endDate: "May 2024",
  },
  {
    title: "Software Engineer Intern",
    organization: "Johnson & Johnson Robotics",
    description: [
      "Worked on robotic surgery cloud platform enabling real-time data analytics & communication between IoT robot devices",
      "Automated deployment of 5,000+ cloud resources (Azure IoT Hub, Blob Storage, etc) by creating Terraform modules integrated into Enterprise Jenkins Instance",
      "Conceived & implemented Azure IoT Edge authentication module used across 8 device teams to interface with cloud",
    ],
    image: "/orgs/jnj.png",
    startDate: "May 2022",
    endDate: "Aug 2022",
  },
];
