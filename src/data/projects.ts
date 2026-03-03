export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
  features?: string[];
  technologies?: string[];
  category: 'project' | 'prototype';
}

// Helper function to create slug from title
export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Get base path for images (handles GitHub Pages deployment)
const getImagePath = (filename: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';
  return `${basePath}/${filename}`;
};

export const allProjects: Project[] = [
  {
    id: 'fortoon',
    title: 'Fortoon',
    description: 'Full-stack web application built with Next.js and TypeScript.',
    longDescription: 'Fortoon is a full-stack web application showcasing modern web development practices. Built with Next.js for optimal performance and TypeScript for type safety, this project demonstrates frontend architecture and user experience design.',
    image: getImagePath('project-fortoon.png'),
    tags: ['Full-Stack', 'TypeScript', 'Next.js'],
    link: '#',
    category: 'project',
    features: [
      'Responsive design across devices',
      'Modern UI with glassmorphism effects',
      'Type-safe development',
      'Optimized performance',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Framer Motion'],
  },
  {
    id: 'outfit-fashion-recommendation',
    title: 'Outfit Fashion Recommendation System',
    description: 'AI-driven system suggesting outfits based on user preferences and image analysis.',
    longDescription: 'An intelligent fashion recommendation system powered by machine learning. Analyzes user preferences, style patterns, and image inputs to provide personalized outfit suggestions. Combines computer vision with recommendation algorithms for accurate fashion advice.',
    image: getImagePath('project-outfit.png'),
    tags: ['AI/ML', 'Computer Vision', 'Recommendation'],
    link: '#',
    category: 'project',
    features: [
      'AI-powered outfit recommendations',
      'Image-based style analysis',
      'Personalized preference learning',
      'Real-time outfit matching',
    ],
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'React', 'Node.js', 'MongoDB'],
  },
  {
    id: 'kmitl-science-website',
    title: 'KMITL Science Website',
    description: 'Frontend development for KMITL Science Department with team collaboration.',
    longDescription: 'Collaborative frontend development for KMITL Science Department website. Worked in a team using ClickUp for project management, developing responsive components and data visualizations for academic content presentation.',
    image: getImagePath('project-kmitl.png'),
    tags: ['Frontend', 'React', 'Data Visualization'],
    link: 'https://www.science.kmitl.ac.th/en',
    category: 'project',
    features: [
      'Team collaboration via ClickUp',
      'Responsive component library',
      'Interactive data visualizations',
      'Real-time content updates',
    ],
    technologies: ['React', 'D3.js', 'Firebase', 'JavaScript', 'CSS3'],
  },
  {
    id: 'math24',
    title: 'MATH24',
    description: 'Multiplayer mathematical puzzle game with local network connectivity.',
    longDescription: 'Multiplayer mathematical puzzle game where players compete to combine four numbers using arithmetic operations to reach 24. Features local network connectivity allowing multiple players on the same network to compete in real-time, improving mental math skills through engaging competitive gameplay.',
    image: getImagePath('project-outfit.png'),
    tags: ['Python', 'Multiplayer', 'Networking'],
    link: '#',
    category: 'project',
    features: [
      'Local network multiplayer',
      'Real-time competitive gameplay',
      'Random puzzle generation',
      'Solution validation engine',
    ],
    technologies: ['Python', 'Socket Programming', 'Network Protocol', 'Game Logic'],
  },
  {
    id: 'zkcert',
    title: 'ZKcert',
    description: 'Zero-knowledge proof certification for privacy-preserving credential verification.',
    longDescription: 'Zero-knowledge proof-based certification system built on Ethereum blockchain. Ensures transparency while maintaining privacy through ZK-SNARK cryptographic techniques. Demonstrates secure, verifiable, and private credential verification without revealing sensitive data.',
    image: getImagePath('project-zkcert.png'),
    tags: ['Blockchain', 'ZK-Proofs', 'Cryptography'],
    link: 'https://jaikwangg.github.io/zkcert/',
    github: 'https://github.com/jaikwangg/zkcert',
    category: 'prototype',
    features: [
      'ZK-SNARK proof generation',
      'Blockchain-based verification',
      'Privacy-preserving credentials',
      'Decentralized trust model',
    ],
    technologies: ['Solidity', 'ZK-SNARK', 'Ethereum', 'Next.js', 'Web3.js', 'TypeScript'],
  },
  {
    id: 'baan-un-jai-planner',
    title: 'Baan Un Jai Planner',
    description: 'Blockchain-based disaster relief fund tracker for transparent humanitarian aid.',
    longDescription: 'Disaster relief fund tracking system using blockchain for transparency and accountability. Tracks donations and fund allocation on an immutable ledger, providing donors with complete visibility into contribution usage and impact.',
    image: getImagePath('project-outfit.png'),
    tags: ['Blockchain', 'Social Impact', 'Transparency'],
    link: 'https://jaikwangg.github.io/baan-un-jai-planner/',
    github: 'https://github.com/jaikwangg/baan-un-jai-planner',
    category: 'prototype',
    features: [
      'Immutable donation tracking',
      'IPFS decentralized storage',
      'Real-time fund allocation',
      'Transparent audit trail',
    ],
    technologies: ['Solidity', 'Ethereum', 'IPFS', 'React', 'Web3.js', 'Tailwind CSS'],
  },
  {
    id: 'aun-jai-care-connect',
    title: 'Aun Jai Care Connect',
    description: 'Healthcare coordination platform connecting patients with providers.',
    longDescription: 'Healthcare coordination platform bridging patients and providers. Facilitates appointment scheduling, care plan management, and secure communication to improve healthcare accessibility and patient outcomes.',
    image: getImagePath('project-aun-jai-care-connect.png'),
    tags: ['Healthcare', 'Coordination', 'Web App'],
    link: 'https://jaikwangg.github.io/aun-jai-care-connect/',
    github: 'https://github.com/jaikwangg/aun-jai-care-connect',
    category: 'prototype',
    features: [
      'Patient-provider matching',
      'Appointment scheduling system',
      'Care plan management',
      'Secure messaging',
    ],
    technologies: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'JavaScript'],
  },
  {
    id: 'temple-guide',
    title: 'Temple Guide',
    description: 'Interactive temple guide with maps and cultural information for visitors.',
    longDescription: 'Interactive web application providing comprehensive temple information including location, history, and cultural significance. Features interactive maps and rich media content to help visitors explore and learn about temples.',
    image: getImagePath('project-temple-guide.png'),
    tags: ['Tourism', 'Maps', 'Cultural Heritage'],
    link: 'https://jaikwangg.github.io/temple-guide/',
    github: 'https://github.com/jaikwangg/temple-guide',
    category: 'project',
    features: [
      'Interactive map integration',
      'Cultural heritage information',
      'Visitor guides and tips',
      'Multimedia content gallery',
    ],
    technologies: ['Next.js', 'React', 'Mapbox', 'Tailwind CSS', 'TypeScript'],
  },
  {
    id: 'insurplan',
    title: 'INSURPLAN',
    description: 'Insurance planning platform for comparing and selecting optimal plans.',
    longDescription: 'Comprehensive insurance planning platform helping users compare, analyze, and select insurance plans. Provides detailed comparisons, coverage analysis, and personalized recommendations to simplify decision-making.',
    image: getImagePath('project-insurplan.png'),
    tags: ['FinTech', 'Insurance', 'Comparison'],
    link: 'https://insurplan.netlify.app/',
    github: 'https://github.com/jaikwangg/insurplan',
    category: 'prototype',
    features: [
      'Multi-plan comparison',
      'Coverage gap analysis',
      'Personalized recommendations',
      'Cost-benefit calculator',
    ],
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Chart.js', 'Netlify'],
  },
  {
    id: 'medtrack',
    title: 'MedTrack',
    description: 'Medication tracking and reminder system for prescription management.',
    longDescription: 'Medication tracking and reminder system helping users manage prescriptions effectively. Provides scheduled reminders, tracks medication history, monitors adherence rates, and maintains health records through an intuitive interface.',
    image: getImagePath('project-medtrack.png.png'),
    tags: ['Healthcare', 'Productivity', 'Tracking'],
    link: 'https://v0-medication-tracker-prototype.vercel.app/',
    category: 'prototype',
    features: [
      'Scheduled medication reminders',
      'Dosage tracking and history',
      'Adherence rate monitoring',
      'Health record management',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
  },
];

// Get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return allProjects.find(project => project.id === id);
};

// Get project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return allProjects.find(project => createSlug(project.title) === slug || project.id === slug);
};
