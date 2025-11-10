
export interface PersonalInfo {
    name: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    leetcode: string;
    summary: string;
    profilePhoto?: string;
}

export interface Project {
    title: string;
    description: string;
    tech: string[];
}

export interface Experience {
    role: string;
    company: string;
    location: string;
    duration: string;
    duties: string[];
}

export interface Certification {
    name: string;
    issuer: string;
    imageUrl: string;
}

export interface Skills {
    [key: string]: string[];
}

export interface Education {
    institution: string;
    degree: string;
    location: string;
}

export interface Leadership {
    title: string;
    description: string;
}
