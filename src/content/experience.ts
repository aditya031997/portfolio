export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: Job[] = [
  {
    company: "Eminence Technology",
    role: "Full-Stack Developer",
    period: "Jan 2022 - Present",
    location: "Mohali, India",
    points: [
      "Worked on 10+ full-stack apps for 5+ clients. On most of them I handled everything from the API design to the production deploy.",
      "Built the Next.js frontend for a football prediction site that generates thousands of SEO pages using ISR, JSON-LD and sitemaps, with a Payload CMS blog.",
      "Built an AI voice receptionist that answers calls any time, transfers to human agents and creates support tickets with the call transcript.",
      "Designed REST APIs and database schemas in PostgreSQL and MongoDB, with JWT and bcrypt auth and indexes for faster queries.",
      "Usually worked on 2 to 3 projects at once with designers, QA and other developers, in an agile setup.",
    ],
  },
  {
    company: "PixlerLab",
    role: "React.js Intern",
    period: "Sep 2021 - Jan 2022",
    location: "Mohali, India",
    points: [
      "Built React components and pages for client projects and fixed UI bugs.",
    ],
  },
];
