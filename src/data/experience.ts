export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  duration: string;
  isCurrent?: boolean;
  responsibilities: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Front End Developer",
    company: "Praxio",
    duration: "Jul 2024 – Present",
    isCurrent: true,
    responsibilities: [
      "Build scalable web apps with React.js & SolidJS with focus on performance",
      "Collaborate with UI/UX designers, backend engineers, and product managers",
      "Conduct code reviews; apply lazy loading & memoization optimizations",
      "Active in Agile ceremonies: sprint planning, standups, retrospectives",
    ],
  },
  {
    id: 2,
    role: "Front End Developer",
    company: "Enthu Technology Solutions India Pvt Ltd",
    duration: "Mar 2022 – Jun 2024",
    responsibilities: [
      "Developed real-time IoT dashboards using charting libraries",
      "Built role-based access control user management modules",
      "Created pixel-perfect UI implementations aligned with modern design systems",
    ],
  },
  {
    id: 3,
    role: "Front End Developer Trainee",
    company: "Abytz Technology Solutions India Pvt Ltd",
    duration: "Dec 2021 – Mar 2022",
    responsibilities: [
      "Maintained and enhanced existing React.js applications",
      "Learned component lifecycle, prop drilling, and Redux patterns",
    ],
  },
  {
    id: 4,
    role: "Software Developer Trainee",
    company: "Aja Technologiess Pvt Ltd",
    duration: "Oct 2020 – Jan 2021",
    responsibilities: [
      "Participated in full dev cycle: coding, testing, debugging under senior mentorship",
      "Applied PHP-based development and database interaction best practices",
    ],
  },
];
