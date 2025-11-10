import { PersonalInfo, Project, Experience, Certification, Skills, Education, Leadership } from './types';

export const personalInfo: PersonalInfo = {
  name: "KORIVI RAHUL",
  location: "Kamareddy, Telangana",
  email: "korivirahul43@gmail.com",
  phone: "+91 6300033149",
  linkedin: "https://linkedin.com/in/rahul-korivi",
  github: "https://github.com/rahul30i",
  leetcode: "https://leetcode.com/u/rahul30i",
  summary: "I am a results-driven B.Tech 4th-year Computer Science student specializing in Artificial Intelligence and Machine Learning. I have hands-on experience in programming with Java, C++, C#, and Python, and a strong interest in building scalable, efficient, and intelligent software solutions. My passion lies in exploring next-generation cloud capacity management technologies and contributing to high-performance distributed systems. I’m committed to continuous learning, innovation, and applying AI-driven approaches to solve real-world challenges in software development and system optimization..",
  profilePhoto: "/images/rahul-profile.jpg"
};

export const projects: Project[] = [
  {
    title: "Smart Career Mentor",
    description: "Engineered a scalable and reliable front-end for a full-stack AI application for personalized career guidance, focusing on high performance and observability.",
    tech: ["React", "TypeScript", "Google Gemini API", "REST APIs"]
  },
  {
    title: "AI Interview Assistant",
    description: "Implemented a Machine Learning feature in Python to automate interview preparation and architected REST APIs for efficient data access and high availability.",
    tech: ["Python", "Flask", "Machine Learning", "REST APIs"]
  },
  {
    title: "WanderLust Data Storage System",
    description: "Developed a robust backend with Node.js and authored design documents for a high-scale distributed data storage system focusing on high availability.",
    tech: ["JavaScript", "Node.js", "MongoDB", "REST APIs"]
  }
];

export const experiences: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Swecha",
    location: "Hyderabad, Telangana",
    duration: "Aug 2024",
    duties: [
      "Contributed to the AI Creators Internship program, building AI for preserving culture and language advancement.",
      "Collaborated to design and implement new software features in a Unix/Linux environment, improving efficiency by 15%.",
      "Authored and maintained high-quality C++ code, improving availability, reliability, and performance."
    ]
  }
];

export const certifications: Certification[] = [
    { 
    name: "AI Creators Internship Program", 
    issuer: "Swecha",
    imageUrl: "/images/swecha-ai-internship.jpg"
  },
    { 
    name: "What Is Generative AI?", 
    issuer: "LinkedIn Learning",
    imageUrl: "/images/linkedin-genai.jpg"
  },
  { 
    name: "Oracle Certified Data Science Professional", 
    issuer: "Oracle University",
    imageUrl: "/images/oracle-datascience.jpg" 
  },
  { 
    name: "Delta: Full-Stack Web Development", 
    issuer: "Apna College",
    imageUrl: "/images/apna-fullstack.jpg"
  },
  { 
    name: "Alpha: Data Structures & Algorithms (Java)", 
    issuer: "Apna College",
    imageUrl: "/images/apna-dsa.jpg"
  },
];

export const skills: Skills = {
    "Languages": ["C", "C++", "C#", "Java", "JavaScript", "Python", "SQL", "HTML/CSS"],
    "Core Areas": ["High-Scale Distributed Systems", "Cloud Capacity Management", "System Design", "Data Structures & Algorithms", "Software Engineering", "Reliability", "Performance", "Observability"],
    "Cloud & DevOps": ["Microsoft Azure", "AWS", "Google Cloud", "Docker", "Git", "CI/CD", "REST APIs"],
    "Frameworks & Tools": ["React", "Node.js", "Flask", "Unix/Linux", "VS Code", "GitHub"]
};

export const education: Education = {
    institution: "Institute of Aeronautical Engineering",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    location: "Hyderabad, Telangana"
};

export const leadership: Leadership[] = [
    {
        title: "Problem-Solving",
        description: "Demonstrated expertise in Data Structures and Algorithms by solving 100+ challenges on LeetCode using C++, Java, and Python."
    },
    {
        title: "Collaboration",
        description: "Applied a growth mindset and innovative approach in a competitive hackathon, collaborating with peers to realize shared goals and empower team success."
    }
];