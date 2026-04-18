// Demo CV data structure
export interface ExperienceItem {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  field: string
  year: string
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  tools: string
  link?: string
}

export interface CVData {
  personalInfo: {
    firstName: string
    lastName: string
    title: string
    email: string
    phone: string
    location: string
    summary: string
    socialLinks: {
      linkedin?: string
      behance?: string
      portfolio?: string
    }
  }
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  languages: string[]
  designTools: string[]
  developmentTools: string[]
  projects: ProjectItem[]
  interests: string[]
}

// Demo data - UI/UX Designer Resume
export const DEMO_CV_DATA: CVData = {
  personalInfo: {
    firstName: "Md. Raisul Hasan",
    lastName: "Rafi",
    title: "UX/UI Designer | Product Designer",
    email: "contact.raisulrafi@gmail.com",
    phone: "+880 1795-408194",
    location: "Barisal, Bangladesh",
    summary:
      "UI/UX Designer with 3+ years of professional experience designing user-centric digital products across web platforms and SaaS solutions. Demonstrated ability to translate business requirements into intuitive, scalable, and visually refined user experiences. Experienced in collaborating with cross-functional teams, conducting UX research, and delivering high-quality design solutions that support measurable business outcomes. Strong attention to usability, accessibility, and consistency through structured design systems.",
    socialLinks: {
      linkedin: "/in/rhr3032",
      behance: "/rhr3032",
      portfolio: "/raisulr",
    },
  },
  experience: [
    {
      id: "1",
      company: "MNTech Digital",
      position: "UI/UX Designer",
      startDate: "2025-02",
      endDate: "Present",
      description:
        "Delivered UX and UI solutions for 50+ client projects across SaaS, eCommerce, and enterprise platforms. Led design processes from discovery to final handoff, ensuring adherence to usability standards. Designed and optimized digital experiences to support business growth and reseller onboarding. Conducted user research and usability testing to validate design decisions and enhance user satisfaction. Developed wireframes, user flows, and high-fidelity prototypes aligned with brand and business objectives. Collaborated closely with development teams to ensure accurate design implementation.",
    },
    {
      id: "2",
      company: "Fiverr",
      position: "Freelance UI/UX Designer",
      startDate: "2022-01",
      endDate: "2024-12",
      description:
        "Delivered end-to-end UI/UX design solutions for international clients across SaaS, web applications, and marketing platforms. Collaborated directly with clients to gather requirements, define scope, and translate business goals into user-centered designs. Designed user flows, wireframes, and high-fidelity interfaces tailored to diverse industries and user needs. Maintained clear documentation and design handoffs to ensure smooth developer implementation. Managed multiple projects simultaneously while meeting deadlines and quality standards.",
    },
    {
      id: "3",
      company: "Upwork",
      position: "Freelance UI/UX Designer",
      startDate: "2023-01",
      endDate: "2024-12",
      description:
        "Delivered comprehensive UI/UX design solutions for global clients, spanning SaaS products, web apps, and marketing platforms. Partnered closely with clients to understand requirements, define project scope, and align designs with business objectives. Created intuitive user flows, wireframes, and high-fidelity interfaces customized for varied industries and audiences.",
    },
  ],
  education: [
    {
      id: "1",
      institution: "Patuakhali Govt. College",
      degree: "BA (Hons)",
      field: "Department of English Language & Literature",
      year: "2022",
    },
  ],
  skills: [
    "Product Design",
    "UX Research",
    "UX Design",
    "UX Writing",
    "Rapid Prototyping",
    "Usability Testing",
    "UI Design System",
    "Kanban & Scrum",
    "Design Systems",
    "Mobile-First Design",
    "Information Architecture",
  ],
  languages: ["English", "Bengali"],
  designTools: [
    "Figma",
    "Adobe Xd",
    "Framer",
    "Webflow",
    "Miro",
    "Whimsical",
    "Notion",
    "Jira",
    "Photoshop",
    "Illustrator",
  ],
  developmentTools: [
    "HTML & CSS",
    "JavaScript",
    "Tailwind",
    "ChakraUI",
    "Git",
    "GitHub",
  ],
  projects: [
    {
      id: "1",
      title: "Petition Landing Page UI Design",
      description: "Landing page UI design for petition platform",
      tools: "Figma | UI Design | Website",
      link: "Preview",
    },
    {
      id: "2",
      title: "Next-Generation Digital Marketing Agency Website",
      description: "Modern digital marketing agency website design",
      tools: "Figma | UI Design | Website | Agency",
      link: "Preview",
    },
    {
      id: "3",
      title: "Online Groceries Mobile App UI Design",
      description: "Mobile app UI for online grocery shopping",
      tools: "Figma | UI Design | Mobile App | E-commerce",
      link: "Preview",
    },
    {
      id: "4",
      title: "Rideshare Mobile App UI Design",
      description: "Rideshare application user interface design",
      tools: "Figma | UI Design | Mobile App | Ride Share",
      link: "Preview",
    },
    {
      id: "5",
      title: "Smart City Mobile App UI Design",
      description: "Smart city services mobile app interface",
      tools: "Figma | UI Design | Mobile App | Smart City",
      link: "Preview",
    },
  ],
  interests: ["Designing", "Reading Comics", "Coding", "Gaming"],
}
