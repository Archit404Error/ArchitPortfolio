export interface Skill {
  name: string;
  subtitle: string;
  imageUrl: string;
}

export interface SkillGroup {
  skillType: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    skillType: "Frontend",
    skills: [
      { name: "Next.js", subtitle: "Rendering Framework", imageUrl: "/logos/nextjs.png" },
      { name: "React.js", subtitle: "Web UI Library", imageUrl: "/logos/reactjs.png" },
      { name: "Svelte", subtitle: "Web UI Library", imageUrl: "/logos/svelte.png" },
      { name: "Tailwind CSS", subtitle: "CSS Framework", imageUrl: "/logos/tailwind.png" },
    ],
  },
  {
    skillType: "Backend",
    skills: [
      { name: "Node.js", subtitle: "JavaScript runtime", imageUrl: "/logos/nodejs.png" },
      { name: "Express.js", subtitle: "JS Backend Framework", imageUrl: "/logos/expressjs.png" },
      { name: "Flask", subtitle: "Backend Framework", imageUrl: "/logos/flask.png" },
      { name: "Django", subtitle: "Backend Framework", imageUrl: "/logos/django.svg" },
    ],
  },
  {
    skillType: "Databases",
    skills: [
      { name: "MongoDB", subtitle: "NoSQL Database", imageUrl: "/logos/mongodb.png" },
      { name: "GraphQL", subtitle: "API Query Language", imageUrl: "/logos/graphql.png" },
      { name: "PostgreSQL", subtitle: "Relational Database", imageUrl: "/logos/postgres.png" },
      { name: "MySQL", subtitle: "Relational Database", imageUrl: "/logos/mysql.png" },
    ],
  },
  {
    skillType: "DevOps",
    skills: [
      { name: "Docker", subtitle: "Container Creation", imageUrl: "/logos/docker.png" },
      { name: "Kubernetes", subtitle: "Container Orchestration", imageUrl: "/logos/kubernetes.png" },
      { name: "Terraform", subtitle: "Infra-as-a-Service", imageUrl: "/logos/terraform.png" },
      { name: "AWS, Azure, GCP", subtitle: "Cloud Services", imageUrl: "/logos/clouds.png" },
    ],
  },
  {
    skillType: "Machine Learning",
    skills: [
      { name: "PyTorch", subtitle: "Deep Learning Framework", imageUrl: "/logos/pytorch.png" },
      { name: "Hugging Face", subtitle: "Transformer Library", imageUrl: "/logos/huggingface.png" },
      { name: "TensorFlow", subtitle: "Deep Learning Framework", imageUrl: "/logos/tensorflow.png" },
      { name: "SKLearn", subtitle: "ML Toolkit", imageUrl: "/logos/sklearn.jpg" },
    ],
  },
  {
    skillType: "Mobile",
    skills: [
      { name: "React Native + Expo", subtitle: "Mobile Dev Framework", imageUrl: "/logos/expo.png" },
      { name: "Swift", subtitle: "iOS Development", imageUrl: "/logos/swift.png" },
      { name: "Objective C", subtitle: "iOS & MacOS Development", imageUrl: "/logos/objectivec.svg" },
      { name: "Jetpack Compose", subtitle: "Android Development", imageUrl: "/logos/jetpack.png" },
    ],
  },
  {
    skillType: "Languages",
    skills: [
      { name: "Java", subtitle: "Highly Experienced", imageUrl: "/logos/java.svg" },
      { name: "Python", subtitle: "Highly Experienced", imageUrl: "/logos/python.png" },
      { name: "C++", subtitle: "Experienced", imageUrl: "/logos/cpp.png" },
      { name: "JavaScript & TypeScript", subtitle: "Experienced", imageUrl: "/logos/javascript.png" },
    ],
  },
];
