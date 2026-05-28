export interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
}

export const technicalSkills: SkillCategory[] = [
  {
    id: "01",
    title: "Frameworks & Libraries",
    skills: ["React JS", "SolidJS", "Next JS", "React Hook Form"],
  },
  {
    id: "02",
    title: "UI & Styling",
    skills: ["HTML5", "CSS3", "Material UI", "Tailwind CSS", "Bootstrap"],
  },
  {
    id: "03",
    title: "Languages",
    skills: ["JavaScript ES6+", "TypeScript"],
  },
  {
    id: "04",
    title: "State & Data",
    skills: ["Redux Toolkit", "React Query", "REST APIs"],
  },
  {
    id: "05",
    title: "Data Visualization",
    skills: ["Apache ECharts", "Recharts"],
  },
  {
    id: "06",
    title: "Dev Tools",
    skills: ["Git", "GitHub", "GitLab", "VS Code", "Chrome DevTools"],
  },
];

export const softSkills: string[] = [
  "Attention to Detail",
  "Cross-functional Collaboration",
  "Problem Solving",
  "Self-motivated Learner",
  "Agile / Scrum",
];
