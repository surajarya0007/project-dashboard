export interface Project {
  name: string;
  link?: string;
  github?: string;
  date: string;
  description: string;
  longDescription: string;
  points: string[];
  images: string[];
  video?: string;
  tech: string[];
  featured: boolean;
  stats: {
    developmentTime: string;
    teamSize: string;
    codeLines: string;
    deployments: string;
  };
}

export const projects: Project[] = [
  {
    name: "API_Security_Shield",
    link: "https://management-fontend.vercel.app/Login",
    github: "https://github.com/surajarya0007/management-fontend",
    date: "Aug '24",
    description:
      "Comprehensive API management system focused on real-time API inventory, security assessments, and role-based data access.",
    longDescription:
      "API Security Shield is a robust platform designed to help organizations manage and secure their API ecosystem. The system provides real-time monitoring, vulnerability assessment, and comprehensive access control features to ensure API security at scale.",
    points: [
      "Created a comprehensive API management system focused on real-time API inventory, security assessments, and role-based data access.",
      "Designed a personalized dashboard for seamless data handling.",
      "Implemented automated vulnerability scanning and reporting features.",
      "Integrated with existing security tools via custom-built connectors.",
      "Reduced security incident response time by 60% through automated alerting.",
    ],
    images: ["/projects/1.jpg", "/projects/1-2.jpg", "/projects/1-3.jpg"],
    video: "/videos/demo1.mp4",
    tech: ["Next.js", "Node.js", "Express", "Tailwind", "MongoDB", "Framer Motion"],
    featured: true,
    stats: {
      developmentTime: "3 months",
      teamSize: "4 developers",
      codeLines: "15,000+",
      deployments: "120+",
    },
  },
  {
    name: "TeeGenius",
    link: "https://github.com/Prasoon2050/Stage0",
    github: "https://github.com/Prasoon2050/Stage0",
    date: "July '24",
    description: "E-commerce platform for custom-printed t-shirts with AI integration for design generation.",
    longDescription:
      "TeeGenius revolutionizes the custom t-shirt market by combining e-commerce functionality with AI-powered design generation. Users can create unique designs using text prompts or upload their own artwork, preview them on virtual models, and order high-quality printed products.",
    points: [
      "Built a full-stack application using Next.js, Tailwind CSS, Node.js, MongoDB, and JWT authentication.",
      "Enabled users to purchase and sell custom-designed t-shirts.",
      "Integrated AI for prompt-based design generation.",
      "Implemented a virtual try-on feature using 3D modeling.",
      "Created a marketplace for designers to sell their templates.",
    ],
    images: ["/projects/3.jpg", "/projects/3-2.jpg", "/projects/3-3.jpg"],
    video: "/videos/demo2.mp4",
    tech: ["Next.js", "React.js", "Node.js", "Open API", "Framer-motion", "Fabric.js", "react-three"],
    featured: true,
    stats: {
      developmentTime: "4 months",
      teamSize: "3 developers",
      codeLines: "22,000+",
      deployments: "85+",
    },
  },
  {
    name: "You and Me",
    link: "https://you-and-me-jet.vercel.app/",
    github: "https://github.com/username/you-and-me",
    date: "Feb '24",
    description: "Social media platform for wedding memories with guest authentication and photo sharing capabilities.",
    longDescription:
      "You and Me is a specialized social platform designed for wedding couples to share their special moments with guests. The platform provides a private, elegant space for photo sharing, memory collection, and guest interaction before, during, and after the wedding celebration.",
    points: [
      "Developed a wedding invitation platform with guest authentication features.",
      "Enabled guests to upload, download, and like photos for memory sharing.",
      "Implemented separate database views for the groom's and bride's sides.",
      "Created a timeline feature to organize photos chronologically.",
      "Built a comment and reaction system for guest interaction.",
    ],
    images: ["/projects/2.jpg", "/projects/2-2.jpg", "/projects/2-3.jpg"],
    video: "/videos/demo3.mp4",
    tech: ["Next.js", "React.js", "Node.js", "Google Drive API", "Framer"],
    featured: false,
    stats: {
      developmentTime: "2 months",
      teamSize: "2 developers",
      codeLines: "8,000+",
      deployments: "45+",
    },
  },
  {
    name: "NFT Market Place",
    github: "https://github.com/username/nft-marketplace",
    date: "May '23",
    description: "Decentralized NFT marketplace for minting and trading digital assets using blockchain technology.",
    longDescription:
      "This NFT Marketplace is a decentralized application built on blockchain technology that allows users to mint, buy, sell, and trade unique digital assets. The platform supports various NFT standards and provides a secure, transparent environment for digital asset transactions.",
    points: [
      "Spearheaded development of a decentralized NFT marketplace using a React.js frontend and a Motoko-powered backend integrated with Web3 technologies.",
      "Enabled over 500 users to securely upload, list, and sell NFTs for crypto tokens.",
      "Implemented smart contracts for secure, transparent transactions.",
      "Created a bidding system for auction-style sales.",
      "Built a wallet integration supporting multiple blockchain networks.",
    ],
    images: ["/projects/4.jpg", "/projects/3.jpg", "/projects/1.jpg"],
    video: "/videos/demo4.mp4",
    tech: ["Next.js", "React.js", "Node.js", "Web3", "Blockchain", "Motoko"],
    featured: false,
    stats: {
      developmentTime: "5 months",
      teamSize: "6 developers",
      codeLines: "30,000+",
      deployments: "150+",
    },
  },
  {
    name: "3D Portfolio Website",
    link: "https://port-taupe-mu.vercel.app/",
    github: "https://github.com/surajarya0007/port",
    date: "Jun '22",
    description: "Interactive 3D portfolio website showcasing projects and skills with immersive user experience.",
    longDescription:
      "This portfolio website pushes the boundaries of web design by incorporating 3D elements, interactive animations, and immersive experiences. Built with Three.js and WebGL, the site creates a memorable showcase for creative work while maintaining performance and accessibility.",
    points: [
      "Designed and developed an interactive 3D portfolio with Three.js for immersive user experience.",
      "Implemented responsive design principles for optimal viewing across all devices.",
      "Created custom 3D models and animations to showcase technical skills.",
      "Optimized 3D rendering for performance across different devices.",
      "Incorporated interactive elements that respond to user movement and scroll.",
    ],
    images: ["/projects/5.jpg", "/projects/5-2.jpg", "/projects/5-3.jpg"],
    video: "/videos/demo5.mp4",
    tech: ["React.js", "Node.js", "Three.js", "email.js", "GSAP"],
    featured: false,
    stats: {
      developmentTime: "2 months",
      teamSize: "1 developer",
      codeLines: "5,000+",
      deployments: "30+",
    },
  },
  {
    name: "CryptoMarket",
    link: "https://cryptoorderbook-steel.vercel.app/",
    github: "https://github.com/surajarya0007/goQuant",
    date: "Feb '25",
    description: "Dashboard that streams real-time cryptocurrency order book data with some indicators.",
    longDescription:
      "A Next.js dashboard that streams real-time cryptocurrency order book data—bids, asks, bid-ask spread, volume imbalance, and market depth—from a public API. It features an intuitive, responsive UI with components for the order book, spread and imbalance indicators, a depth chart, and a trading-pair selector.",
    points: [
      "Built a real-time cryptocurrency order book dashboard with Next.js.",
      "Integrated WebSocket connections for live data streaming.",
      "Implemented bid-ask spread and volume imbalance indicators.",
      "Created interactive depth charts for market visualization.",
      "Added support for multiple trading pairs and exchanges.",
    ],
    images: ["/projects/6.jpg", "/projects/6-2.jpg", "/projects/6-3.jpg"],
    video: "/videos/demo6.mp4",
    tech: ["Next.js", "React.js", "Node.js", "WebSocket", "Chart.js"],
    featured: false,
    stats: {
      developmentTime: "2 months",
      teamSize: "1 developer",
      codeLines: "8,000+",
      deployments: "45+",
    },
  },
];
