export interface Project {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  challenges: string[];
  githubLink: string;
  icon: string;
  gradient: string;
  gradientFull: string;
  category: string;
  year: string;
  role: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "smart-attendance-system",
    title: "Smart Attendance System",
    tagline: "Automated attendance tracking with real-time analytics",
    description:
      "An intelligent attendance tracking system built with Java and Spring Boot. Features automated attendance management, real-time tracking, and comprehensive reporting capabilities.",
    longDescription:
      "The Smart Attendance System revolutionizes how educational institutions and organizations track attendance. Built on a robust Java/Spring Boot backend, it features automated check-in/check-out workflows, real-time dashboards for administrators, and comprehensive analytics that provide insights into attendance patterns. The system uses RESTful APIs to communicate between the frontend and backend, with MySQL handling persistent storage of all attendance records, user profiles, and reports.",
    techStack: ["Java", "Spring Boot", "MySQL", "REST API", "JPA/Hibernate", "Maven"],
    features: [
      "Automated attendance tracking with real-time status updates",
      "Role-based access control for admins, faculty, and students",
      "Comprehensive reporting and analytics dashboard",
      "RESTful API architecture for seamless integration",
      "Database-backed persistent storage with MySQL",
      "Attendance history and pattern analysis",
    ],
    challenges: [
      "Designing a scalable data model to handle large volumes of attendance records",
      "Implementing real-time tracking with efficient database queries",
      "Building a robust authentication and authorization system",
    ],
    githubLink: "https://github.com/space0032/smart_attandance_system",
    icon: "📋",
    gradient: "from-gold/20 to-gold-bright/20",
    gradientFull: "from-gold to-gold-bright",
    category: "Enterprise",
    year: "2025",
    role: "Full Stack Developer",
    featured: true,
  },
  {
    id: 2,
    slug: "civicbridge-ai",
    title: "CivicBridge-AI",
    tagline: "AI-powered civic engagement bridging citizens and government",
    description:
      "An AI-powered civic engagement platform that bridges the gap between citizens and local government. Features include issue reporting, community discussions, and AI-assisted problem resolution.",
    longDescription:
      "CivicBridge-AI is an innovative platform designed to strengthen the connection between citizens and their local government bodies. Leveraging artificial intelligence and machine learning algorithms, the platform automatically categorizes civic issues, suggests solutions from historical data, and routes complaints to the appropriate departments. Citizens can report infrastructure problems, participate in community discussions, and track the resolution of their issues in real-time. The AI component learns from resolved cases to improve future recommendations.",
    techStack: ["JavaScript", "AI/ML", "Node.js", "React", "Express.js", "MongoDB"],
    features: [
      "AI-powered issue categorization and routing",
      "Real-time community discussion forums",
      "Automated problem resolution suggestions using ML",
      "Issue tracking with status updates and notifications",
      "Government dashboard for department-wise analytics",
      "Citizen feedback and satisfaction scoring system",
    ],
    challenges: [
      "Training ML models on diverse civic issue datasets",
      "Building real-time notification system for issue status updates",
      "Ensuring data privacy and security for citizen information",
    ],
    githubLink: "https://github.com/space0032/CivicBridge-AI",
    icon: "🏛️",
    gradient: "from-arcane/20 to-arcane-dim/30",
    gradientFull: "from-arcane to-arcane-dim",
    category: "AI / Civic Tech",
    year: "2025",
    role: "Lead Developer",
    featured: true,
  },
  {
    id: 3,
    slug: "college-management-system",
    title: "College Management System",
    tagline: "End-to-end college administration platform",
    description:
      "Comprehensive college management platform with student enrollment, course management, and administrative features.",
    longDescription:
      "A full-featured college management system designed to digitize and streamline all administrative processes in educational institutions. The platform handles everything from student enrollment and course registration to faculty management and grade tracking. Built with Java and the Spring Framework, it uses JPA for ORM and MySQL for data persistence. The system supports multi-role access for students, faculty, and administrators, each with tailored dashboards and functionality.",
    techStack: ["Java", "Spring Framework", "MySQL", "JPA", "Thymeleaf", "Bootstrap"],
    features: [
      "Student enrollment and profile management",
      "Course registration and scheduling system",
      "Faculty management and assignment tracking",
      "Grade management with GPA calculation",
      "Admin dashboard with analytics and reporting",
      "Role-based access control with Spring Security",
    ],
    challenges: [
      "Modeling complex relationships between students, courses, and faculty",
      "Implementing concurrent course registration without conflicts",
      "Building a flexible grading system that supports different evaluation methods",
    ],
    githubLink: "https://github.com/space0032/College-Management-2",
    icon: "🎓",
    gradient: "from-gold-bright/20 to-gold/20",
    gradientFull: "from-gold-bright to-gold",
    category: "Education",
    year: "2025",
    role: "Backend Developer",
  },
  {
    id: 4,
    slug: "smart-clinic-management",
    title: "Smart Clinic Management",
    tagline: "Modern healthcare management for clinics",
    description:
      "Healthcare management system for clinics with patient records, appointment scheduling, and medical history tracking.",
    longDescription:
      "Smart Clinic Management is a comprehensive healthcare solution designed for small to medium-sized clinics. The system digitizes patient records, automates appointment scheduling, and maintains detailed medical histories. Built with a JavaScript-based stack using React for the frontend and Node.js/Express for the backend, it provides an intuitive interface for both medical staff and patients. MongoDB handles the flexible storage of medical records, which can vary significantly between patients and visit types.",
    techStack: ["JavaScript", "Node.js", "React", "MongoDB", "Express.js", "Chart.js"],
    features: [
      "Patient registration and electronic health records",
      "Appointment scheduling with calendar integration",
      "Medical history tracking with timeline view",
      "Prescription management and printing",
      "Dashboard with patient statistics and trends",
      "Search and filter functionality across records",
    ],
    challenges: [
      "Designing flexible document schemas for varied medical records",
      "Implementing HIPAA-compliant data handling practices",
      "Building an intuitive UI for non-technical medical staff",
    ],
    githubLink: "https://github.com/space0032/Smart-Clinic-Management-System",
    icon: "🏥",
    gradient: "from-slate/15 to-arcane-dim/25",
    gradientFull: "from-slate to-arcane-dim",
    category: "Healthcare",
    year: "2025",
    role: "Full Stack Developer",
  },
  {
    id: 5,
    slug: "hackathon-voting-system",
    title: "Hackathon Voting System",
    tagline: "Real-time voting platform for hackathon events",
    description:
      "Real-time voting platform for hackathons with secure authentication, live vote counting, and admin dashboard.",
    longDescription:
      "A purpose-built voting platform designed for hackathon events, enabling organizers to manage team presentations and audience/judge voting in real-time. Built with TypeScript and Next.js, the platform features secure authentication to prevent vote manipulation, live vote counting with animated result displays, and a comprehensive admin dashboard for event management. TailwindCSS powers the responsive, mobile-friendly interface ensuring participants can vote from any device.",
    techStack: ["TypeScript", "Next.js", "React", "TailwindCSS", "Prisma", "PostgreSQL"],
    features: [
      "Secure voter authentication to prevent duplicate votes",
      "Real-time vote counting with live result updates",
      "Admin dashboard for event and team management",
      "Multiple voting categories with weighted scoring",
      "Mobile-responsive design for on-device voting",
      "Export results and generate certificates",
    ],
    challenges: [
      "Preventing vote manipulation and ensuring fairness",
      "Handling concurrent votes without race conditions",
      "Building real-time updates with optimistic UI patterns",
    ],
    githubLink: "https://github.com/space0032/Hackathon_Voting_System",
    icon: "🗳️",
    gradient: "from-ember/20 to-ember/35",
    gradientFull: "from-ember to-ember/70",
    category: "Events",
    year: "2025",
    role: "Frontend Lead",
  },
  {
    id: 6,
    slug: "java-validation-sanitizer",
    title: "Java Validation Sanitizer",
    tagline: "Security-first input validation library for Java",
    description:
      "A robust Java library for input validation and sanitization. Prevents SQL injection and XSS attacks.",
    longDescription:
      "Java Validation Sanitizer is a lightweight, zero-dependency library that provides comprehensive input validation and sanitization for Java applications. It protects against common web vulnerabilities including SQL injection, Cross-Site Scripting (XSS), and command injection attacks. The library offers a fluent API for defining validation rules and can be easily integrated into any Java project. It includes pre-built validators for common data types like emails, URLs, phone numbers, and custom regex patterns, along with configurable sanitization strategies.",
    techStack: ["Java", "JUnit", "Security", "Maven", "CI/CD", "Static Analysis"],
    features: [
      "SQL injection prevention with parameterized query support",
      "XSS attack sanitization with HTML entity encoding",
      "Fluent API for chaining validation rules",
      "Pre-built validators for emails, URLs, and phone numbers",
      "Custom regex pattern support for domain-specific validation",
      "Comprehensive test suite with 95%+ code coverage",
    ],
    challenges: [
      "Covering all edge cases in SQL injection patterns",
      "Balancing security strictness with usability",
      "Ensuring zero performance overhead in high-throughput applications",
    ],
    githubLink: "https://github.com/space0032/java-validation-sanitizer",
    icon: "🔒",
    gradient: "from-gold/20 to-arcane/20",
    gradientFull: "from-gold to-arcane",
    category: "Security / Library",
    year: "2024",
    role: "Solo Developer",
  },
  {
    id: 7,
    slug: "data-science-projects",
    title: "Data Science Projects",
    tagline: "ML, data analysis & visualization explorations",
    description:
      "Collection of data science projects covering machine learning, data analysis, and visualization techniques.",
    longDescription:
      "A curated collection of data science projects and Jupyter notebooks that explore various aspects of machine learning, statistical analysis, and data visualization. Each project tackles a real-world dataset and demonstrates the complete data science pipeline — from data cleaning and exploratory analysis to feature engineering, model training, and evaluation. The collection serves as both a learning resource and a showcase of practical data science skills using Python's scientific computing ecosystem.",
    techStack: ["Python", "Jupyter", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    features: [
      "End-to-end ML pipeline implementations",
      "Exploratory data analysis with rich visualizations",
      "Feature engineering and selection techniques",
      "Model comparison and hyperparameter tuning",
      "Statistical hypothesis testing and inference",
      "Well-documented Jupyter notebooks with explanations",
    ],
    challenges: [
      "Handling messy real-world datasets with missing values",
      "Selecting appropriate models for different data distributions",
      "Communicating complex statistical findings in clear visualizations",
    ],
    githubLink: "https://github.com/space0032/Tutudude_DataScience",
    icon: "📊",
    gradient: "from-gold-bright/15 to-arcane/20",
    gradientFull: "from-gold-bright to-arcane",
    category: "Data Science",
    year: "2024",
    role: "Data Analyst",
  },
  {
    id: 8,
    slug: "growfund",
    title: "GrowFund",
    tagline: "Gamified financial literacy for Indian farmers",
    description:
      "A gamified financial literacy app designed for Indian farmers to educate them about investments and wealth management.",
    longDescription:
      "GrowFund is a socially impactful Android application that gamifies financial literacy education specifically for Indian farmers. The app uses farm-specific scenarios, engaging gameplay mechanics, and relatable analogies to teach financial planning, investment strategies, and wealth management concepts. Users progress through levels that mirror actual farming seasons, making investment decisions that affect their virtual farm's growth. The app supports multiple Indian languages and uses simple, visual-first design principles to ensure accessibility for users with varying literacy levels.",
    techStack: ["Java", "Android SDK", "Firebase", "SQLite", "Material Design", "Lottie"],
    features: [
      "Gamified learning modules with farm-based scenarios",
      "Multi-language support for regional Indian languages",
      "Progress tracking with achievement badges and rewards",
      "Investment simulation with real market-inspired mechanics",
      "Offline-first architecture for rural connectivity",
      "Visual-first UI design for accessibility",
    ],
    challenges: [
      "Designing financial concepts accessible to low-literacy users",
      "Building engaging game mechanics around investment education",
      "Supporting offline functionality in areas with poor connectivity",
    ],
    githubLink: "https://github.com/space0032/GrowFund",
    icon: "🌱",
    gradient: "from-arcane-dim/30 to-slate/15",
    gradientFull: "from-arcane-dim to-slate",
    category: "FinTech / Social Impact",
    year: "2025",
    role: "Android Developer",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit: number = 3): Project[] {
  const current = getProjectBySlug(currentSlug);
  if (!current) return projects.slice(0, limit);

  // Find projects with overlapping tech stack
  return projects
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      project: p,
      overlap: p.techStack.filter((t) =>
        current.techStack.some(
          (ct) => ct.toLowerCase() === t.toLowerCase()
        )
      ).length,
    }))
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, limit)
    .map((p) => p.project);
}
