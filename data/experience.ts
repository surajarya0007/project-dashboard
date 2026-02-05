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
    id: "goquant",
    company: "GoQuant",
    role: "Full Stack Developer",
    period: "May 2025 – Jan 2026",
    techStack: ["Next.js", "Node.js", "Express", "Docker", "Python", "C++"],
    description: [
      "**Interface Development:** Build and optimize user interfaces for trading applications, dashboards, and data visualization.",
      "**User Experience (UX):** Ensure responsive, intuitive, and accessible design across all devices and screen sizes.",
      "**Integration:** Collaborate with back-end engineers to integrate APIs, ensuring efficient data handling and seamless interaction.",
      "**Performance Optimization:** Monitor, troubleshoot, and optimize front-end performance for low latency and smooth operation.",
      "**Design Collaboration:** Work closely with designers to implement and refine visual elements, maintaining consistency with brand guidelines.",
      "**Testing and Debugging:** Perform rigorous testing across browsers and devices, identifying and resolving bugs proactively.",
      "**Documentation:** Maintain clear and comprehensive documentation of front-end systems, code, and processes."
    ],
    logo: "/logos/goquant.png",
    website: "https://goquant.io/",
    linkedin: "https://www.linkedin.com/company/goquant/"
  },
  {
    id: "tcs",
    company: "Tata Consultancy Services",
    role: "Software Engineer Intern",
    period: "Feb 2024 – Jul 2024",
    techStack: ["Next.js", "Node.js", "Express", "Tailwind", "MongoDB", "Framer Motion"],
    description: [
      "Developed and maintained scalable client projects using **Next.js**.",
      "Collaborated with cross-functional teams to optimize **MongoDB performance**.",
      "Integrated dynamic animations with **Framer Motion** to elevate user experience."
    ],
    logo: "/logos/tcs.png",
    website: "https://www.tcs.com/",
    linkedin: "https://www.linkedin.com/company/tata-consultancy-services/"
  },
  {
    id: "cadence",
    company: "Cadence Design Systems",
    role: "Software Developer Trainee",
    period: "Jun 2023 – Jul 2023",
    techStack: ["Node.js", "Express", "MySQL", "React Native"],
    description: [
      "Refined the **website frontend** to deliver a modern, user-centric interface.",
      "Managed and updated the **product verification module** to ensure data accuracy."
    ],
    logo: "/logos/cadence.png",
    website: "https://www.cadence.com/en_US/home.html",
    linkedin: "https://www.linkedin.com/company/cadence/"
  }
];
