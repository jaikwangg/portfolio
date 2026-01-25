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

export const allProjects: Project[] = [
  {
    id: 'fortoon',
    title: 'Fortoon',
    description: 'A full-stack web application built with Next.js and TypeScript.',
    longDescription: 'Fortoon is a comprehensive full-stack web application showcasing modern web development practices. Built with Next.js for optimal performance and TypeScript for type safety, this project demonstrates advanced frontend architecture and seamless user experience design.',
    image: '/project1.jpg',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    link: '#',
    category: 'project',
    features: [
      'Responsive design for all devices',
      'Modern UI/UX with glassmorphism effects',
      'Type-safe development with TypeScript',
      'Optimized performance with Next.js',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React', 'Framer Motion'],
  },
  {
    id: 'outfit-fashion-recommendation',
    title: 'Outfit Fashion Recommendation System',
    description: 'AI-driven recommendation model that suggests outfits based on user preferences, style patterns, and image-based input.',
    longDescription: 'An intelligent fashion recommendation system powered by AI and machine learning. This system analyzes user preferences, style patterns, and image inputs to provide personalized outfit suggestions. The application combines computer vision with recommendation algorithms to deliver accurate and relevant fashion advice.',
    image: '/project2.jpg',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    category: 'project',
    features: [
      'AI-powered outfit recommendations',
      'Image-based style analysis',
      'Personalized user preferences',
      'Machine learning integration',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Python', 'TensorFlow', 'OpenCV'],
  },
  {
    id: 'kmitl-science-website',
    title: 'KMITL science website',
    description: 'Developed frontend components for a Science Department web application, collaborating with a team through ClickUp.',
    longDescription: 'Collaborative frontend development project for KMITL Science Department website. Worked as part of a team using ClickUp for project management, developing responsive components and ensuring seamless user experience across all pages.',
    image: '/project3.jpg',
    tags: ['React', 'D3.js', 'Firebase'],
    link: 'https://www.science.kmitl.ac.th/en',
    category: 'project',
    features: [
      'Team collaboration via ClickUp',
      'Responsive frontend components',
      'Data visualization with D3.js',
      'Real-time updates with Firebase',
    ],
    technologies: ['React', 'D3.js', 'Firebase', 'JavaScript', 'CSS'],
  },
  {
    id: 'zkcert',
    title: 'ZKcert',
    description: 'A zero-knowledge voting prototype for transparent yet private elections.',
    longDescription: 'ZKcert is an innovative zero-knowledge proof-based certification and voting system. Built on Ethereum blockchain, it ensures transparency while maintaining voter privacy through advanced cryptographic techniques. This prototype demonstrates the potential of ZK-SNARKs in creating secure, verifiable, and private voting systems.',
    image: '/hackathon1.jpg',
    tags: ['ZK-SNARK', 'Ethereum', 'Next.js'],
    link: 'https://jaikwangg.github.io/zkcert/',
    github: 'https://github.com/jaikwangg/zkcert',
    category: 'prototype',
    features: [
      'Zero-knowledge proof implementation',
      'Blockchain-based verification',
      'Privacy-preserving voting',
      'Transparent yet anonymous',
    ],
    technologies: ['ZK-SNARK', 'Ethereum', 'Next.js', 'Solidity', 'Web3'],
  },
  {
    id: 'baan-un-jai-planner',
    title: 'baan-un-jai-planner',
    description: 'A disaster relief fund tracker ensuring accountability with blockchain.',
    longDescription: 'A blockchain-based disaster relief fund tracking system designed to ensure transparency and accountability in humanitarian aid distribution. This system tracks donations and fund usage on an immutable ledger, providing donors with complete visibility into how their contributions are being used.',
    image: '/hackathon2.jpg',
    tags: ['Solidity', 'IPFS', 'Tailwind'],
    link: 'https://jaikwangg.github.io/baan-un-jai-planner/',
    github: 'https://github.com/jaikwangg/baan-un-jai-planner',
    category: 'prototype',
    features: [
      'Blockchain-based fund tracking',
      'IPFS for decentralized storage',
      'Transparent donation tracking',
      'Immutable transaction records',
    ],
    technologies: ['Solidity', 'IPFS', 'Tailwind CSS', 'Ethereum', 'Web3'],
  },
  {
    id: 'aun-jai-care-connect',
    title: 'aun-jai-care-connect',
    description: 'A care coordination platform connecting patients with healthcare providers.',
    longDescription: 'Aun-jai Care Connect is a healthcare coordination platform designed to bridge the gap between patients and healthcare providers. The system facilitates seamless communication, appointment scheduling, and care plan management, improving healthcare accessibility and patient outcomes.',
    image: '/hackathon2.jpg',
    tags: ['Solidity', 'IPFS', 'Tailwind'],
    link: 'https://jaikwangg.github.io/aun-jai-care-connect/',
    github: 'https://github.com/jaikwangg/aun-jai-care-connect',
    category: 'prototype',
    features: [
      'Patient-provider connection',
      'Appointment scheduling',
      'Care plan management',
      'Secure data handling',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
  },
  {
    id: 'temple-guide',
    title: 'temple-guide',
    description: 'A comprehensive guide to temples with interactive maps and cultural information.',
    longDescription: 'Temple Guide is an interactive web application providing detailed information about temples, including location, history, cultural significance, and visitor information. The app features interactive maps, rich media content, and user-friendly navigation to help visitors explore and learn about various temples.',
    image: '/hackathon2.jpg',
    tags: ['Solidity', 'IPFS', 'Tailwind'],
    link: 'https://jaikwangg.github.io/temple-guide/',
    github: 'https://github.com/jaikwangg/temple-guide',
    category: 'prototype',
    features: [
      'Interactive temple maps',
      'Cultural information',
      'Visitor guides',
      'Rich media content',
    ],
    technologies: ['Next.js', 'Map APIs', 'Tailwind CSS', 'React'],
  },
  {
    id: 'insurplan',
    title: 'INSURPLAN',
    description: 'An insurance planning platform helping users make informed decisions.',
    longDescription: 'INSURPLAN is a comprehensive insurance planning platform that helps users compare, analyze, and select the best insurance plans for their needs. The platform provides detailed comparisons, coverage analysis, and personalized recommendations to simplify the insurance selection process.',
    image: '/hackathon2.jpg',
    tags: ['Solidity', 'IPFS', 'Tailwind'],
    link: 'https://insurplan.netlify.app/',
    github: 'https://github.com/jaikwangg/insurplan',
    category: 'prototype',
    features: [
      'Insurance plan comparison',
      'Coverage analysis',
      'Personalized recommendations',
      'User-friendly interface',
    ],
    technologies: ['React', 'Netlify', 'Tailwind CSS', 'JavaScript'],
  },
  {
    id: 'medtrack',
    title: 'MedTrack',
    description: 'A medication tracking and reminder system for better health management.',
    longDescription: 'MedTrack is a medication tracking and reminder system designed to help users manage their medications effectively. The app provides reminders, tracks medication history, monitors adherence, and helps users stay on top of their health regimen with an intuitive and user-friendly interface.',
    image: '/hackathon2.jpg',
    tags: ['Solidity', 'IPFS', 'Tailwind'],
    link: 'https://v0-medication-tracker-prototype.vercel.app/',
    github: 'https://github.com/jaikwangg/medtrack',
    category: 'prototype',
    features: [
      'Medication reminders',
      'Dosage tracking',
      'Adherence monitoring',
      'Health history records',
    ],
    technologies: ['Next.js', 'Vercel', 'Tailwind CSS', 'React'],
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
