export const profile = {
  name: "Aditya Singh",
  role: "Full-Stack Developer",
  location: "Mohali, India",
  siteUrl: "https://aditya-portfolio-1001.netlify.app",
  email: "singhaditya4743@gmail.com",
  phone: "+91 81467 24743",
  linkedin: "https://linkedin.com/in/aditya-singh8146",
  github: "https://github.com/aditya031997",
  resume: "/Aditya_Singh_resume.pdf",
  headline: "I build SEO-heavy web platforms and AI voice systems.",
  /** Same headline for the hero; words between *asterisks* render in the italic accent font. */
  headlineMarked: "I build *SEO-heavy* web platforms & *AI voice* systems.",
  intro:
    "I've been building web apps for clients for almost five years, mostly with Next.js, Node.js, PostgreSQL and MongoDB. My recent work includes a football prediction site with thousands of SEO pages and an AI receptionist that answers phone calls.",
  availability: "Open to full-time roles",
};

export type SkillGroup = { label: string; items: string[] };

export const skills: SkillGroup[] = [
  { label: "Frontend", items: ["React", "Next.js (App Router, ISR)", "Vue.js", "Redux", "JavaScript (ES2022)", "HTML & CSS"] },
  { label: "Backend", items: ["Node.js", "Express", "NestJS", "REST API design", "JWT / bcrypt auth"] },
  { label: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Schema design & indexing"] },
  { label: "Integrations", items: ["Payload CMS", "Twilio", "ElevenLabs", "Web3 wallets (MetaMask, Coinbase)"] },
  { label: "SEO & delivery", items: ["Technical SEO", "JSON-LD structured data", "Sitemaps", "Docker", "Git", "Postman / Swagger"] },
];
