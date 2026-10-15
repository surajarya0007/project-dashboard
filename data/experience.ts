export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  techStack: string[];
  logo?: string;
  website?: string;
  linkedin?: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "global-grand-gaming",
    company: "Global Grand Gaming Pvt Ltd",
    role: "SDE I · Top Coaching (EdTech Startup)",
    period: "Sep 2026 – Present",
    techStack: [
      "React Native",
      "Next.js",
      "React",
      "React Three Fiber",
      "Rapier",
      "Zustand",
      "TypeScript",
    ],
    description: [
      "Building core product features for Top Coaching, a new e-learning web and React Native app for JEE Main preparation, delivering theory lessons, practice test questions, and interactive 3D simulation challenges to students.",
      "Developed 3D physics simulation challenges with React Three Fiber and Rapier, using Zustand for predictable simulation and UI state so learners get instant, accurate feedback on their attempts.",
      "Embedded the same Next.js simulations inside the mobile app via React Native WebView, so web and mobile share one codebase and ship together, avoiding duplicate native implementations.",
    ],
    logo: "/logos/grandgaming.jpeg",
    website: "https://grandgaming.com/",
    linkedin: "https://www.linkedin.com/company/grandgaming/home/",
  },
  {
    id: "nit-warangal",
    company: "NIT Warangal",
    role: "Project Intern · Remote",
    period: "May 2026 – Present",
    techStack: [
      "Python",
      "Langchain",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Gemini API",
      "Upstash Redis",
      "Next.js",
      "TypeScript",
      "Google Cloud Run",
    ],
    description: [
      "Built an AI-powered news intelligence product 0-to-1, from architecture to deployment, owning the Next.js frontend, Node.js/Express backend, database and cloud deployment end to end.",
      "Developed an automated ingestion pipeline on Google Cloud Run that parses Google News feeds, scrapes articles, and generates structured dossiers via Gemini.",
      "Built semantic search on PostgreSQL pgvector with Gemini embeddings, tuning similarity thresholds to improve retrieval precision.",
      "Designed an inline retrieval workflow that detects missing context mid-conversation, triggers targeted re-ingestion, and updates the vector index live without restarting the session.",
      "Cut perceived latency with Upstash Redis caching and asynchronous background workers across ingestion and user-facing workflows.",
    ],
    logo: "/logos/nitWarangal.jpeg",
    website: "https://www.nitw.ac.in/",
    linkedin: "https://www.linkedin.com/school/national-institute-of-technology-warangal/home/",
  },
  {
    id: "goquant",
    company: "GoQuant",
    role: "Full Stack Developer",
    period: "May 2025 – Jan 2026",
    techStack: ["Python", "FastAPI", "Websockets", "Next.js", "Docker", "C++"],
    description: [
      "**Interface Development:** Build and optimize user interfaces for trading applications, dashboards, and data visualization.",
      "**User Experience (UX):** Ensure responsive, intuitive, and accessible design across all devices and screen sizes.",
      "**Integration:** Collaborate with back-end engineers to integrate APIs, ensuring efficient data handling and seamless interaction.",
      "**Performance Optimization:** Monitor, troubleshoot, and optimize front-end performance for low latency and smooth operation.",
      "**Design Collaboration:** Work closely with designers to implement and refine visual elements, maintaining consistency with brand guidelines.",
      "**Testing and Debugging:** Perform rigorous testing across browsers and devices, identifying and resolving bugs proactively.",
      "**Documentation:** Maintain clear and comprehensive documentation of front-end systems, code, and processes.",
    ],
    logo: "/logos/goquant.png",
    website: "https://goquant.io/",
    linkedin: "https://www.linkedin.com/company/goquant/",
  },
  {
    id: "tcs",
    company: "Tata Consultancy Services",
    role: "Software Engineer Intern",
    period: "Feb 2024 – Jul 2024",
    techStack: [
      "Next.js",
      "Node.js",
      "Express",
      "Tailwind",
      "MongoDB",
      "Framer Motion",
    ],
    description: [
      "Developed and maintained scalable client projects using **Next.js**.",
      "Collaborated with cross-functional teams to optimize **MongoDB performance**.",
      "Integrated dynamic animations with **Framer Motion** to elevate user experience.",
    ],
    logo: "/logos/tcs.png",
    website: "https://www.tcs.com/",
    linkedin: "https://www.linkedin.com/company/tata-consultancy-services/",
  },
  {
    id: "cadence",
    company: "Cadence Design Systems",
    role: "Software Developer Trainee",
    period: "Jun 2023 – Jul 2023",
    techStack: ["Node.js", "Express", "MySQL", "React Native"],
    description: [
      "Refined the **website frontend** to deliver a modern, user-centric interface.",
      "Managed and updated the **product verification module** to ensure data accuracy.",
    ],
    logo: "/logos/cadence.png",
    website: "https://www.cadence.com/en_US/home.html",
    linkedin: "https://www.linkedin.com/company/cadence/",
  },
];
