/**
 * Case studies. Order here is the order on the home page.
 *
 * Screenshots: put images in public/projects/<slug>/ and list them in `screenshots`
 * (e.g. { src: "/projects/football-predictions/home.png", alt: "Match listing page" }).
 * The gallery is hidden while the list is empty, so no placeholder ever shows.
 */

export type ProjectStatus = "live" | "in-development" | "delivered";

export type ProjectVisual = "football" | "voice" | "crypto" | "language";

export type Project = {
  slug: string;
  /** Accent colour used for the card glow, preview and case-study hero. */
  accent: string;
  visual: ProjectVisual;
  title: string;
  tagline: string;
  summary: string;
  period?: string;
  status: ProjectStatus;
  statusNote: string;
  role: string;
  stack: string[];
  liveUrl?: string;
  videoUrl?: string;
  overview: string[];
  built: string[];
  architecture: { title: string; steps: string[] }[];
  decisions: { title: string; body: string }[];
  screenshots: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "football-predictions",
    accent: "#34d399",
    visual: "football",
    title: "Football Prediction Platform",
    tagline: "Thousands of SEO pages built from live match data",
    summary:
      "A Next.js 16 site that creates pages for every match, league, country and betting market from live data. It also has a blog powered by Payload CMS and some content locked for premium users.",
    period: "Jul 2026 - Present",
    status: "in-development",
    statusNote: "Private client project, not yet public",
    role: "Frontend lead & CMS integration",
    stack: ["Next.js 16", "React", "Payload CMS", "Redis", "ISR", "JSON-LD"],
    overview: [
      "The client wanted to rank on Google for every match, league and betting market they cover. Nobody can write that many pages by hand, so the pages had to be generated from live data. They still needed to load fast and be easy for Google to crawl.",
      "I built the frontend that users see, and connected Payload CMS so their content team can write blog posts next to the generated pages.",
    ],
    built: [
      "Page templates for matches, leagues, countries and betting markets. Data comes from a live API and pages are rendered with SSR and ISR.",
      "SEO setup for every page: JSON-LD (SportsEvent, BreadcrumbList), canonical URLs and a separate XML sitemap for each page type.",
      "noindex on pages that don't have enough content yet, so Google only sees the useful ones.",
      "Payload CMS on its own database with collections, drafts, a rich text editor and media uploads.",
      "Blog and article pages. When an editor hits publish, the page is revalidated on demand, so the post is live in a few seconds.",
      "Free vs premium content checked on the server, and a Redis cache in front of the data API.",
    ],
    architecture: [
      { title: "Generated pages", steps: ["Live match data API", "Redis cache", "Next.js (SSR / ISR)", "Static HTML + JSON-LD", "Search engines"] },
      { title: "Editorial", steps: ["Editor in Payload CMS", "Publish", "On-demand revalidation", "Updated article page"] },
    ],
    decisions: [
      {
        title: "ISR instead of fully dynamic rendering",
        body: "Match data changes often, but not every second. With ISR the user gets static HTML, which is fast and cheap to serve, and the page refreshes in the background. This kept page speed good even with thousands of URLs.",
      },
      {
        title: "Not indexing thin pages",
        body: "Some generated pages have almost nothing on them, like a small market or a fixture with no stats yet. I marked those noindex so they don't pull down how Google sees the rest of the site.",
      },
      {
        title: "Redis for graceful degradation",
        body: "If the data API is slow or goes down, pages are served from the cache. Users and Google still get a working page instead of an error.",
      },
      {
        title: "Separate database for the CMS",
        body: "Blog content lives in its own database, away from match data. That makes backups and migrations simpler and one side can't break the other.",
      },
    ],
    screenshots: [],
  },
  {
    slug: "ai-virtual-receptionist",
    accent: "#a78bfa",
    visual: "voice",
    title: "AI Virtual Receptionist",
    tagline: "An AI that answers the phone and hands over to a person when needed",
    summary:
      "A voice AI for SmartCaller that answers incoming calls and handles common questions. If it can't help, it transfers the call to a human. If no one is free, it creates a support ticket with the full call details.",
    period: "Jul 2025 - Jun 2026",
    status: "live",
    statusNote: "Live in production",
    role: "Full-stack developer",
    stack: ["Node.js", "Vue.js", "PostgreSQL", "Twilio", "ElevenLabs", "AI / NLP"],
    liveUrl: "https://smartcalleragency.com/",
    overview: [
      "Businesses miss a lot of calls after office hours and when the team is busy. SmartCaller wanted an AI receptionist that is always available, sounds like a real person and knows when to pass the call to someone.",
      "It handles the full call. It talks to the caller, looks up information, sends emails, transfers to an agent and creates a ticket if nobody picks up.",
    ],
    built: [
      "Incoming calls through Twilio, with call flows that collect the caller's details and answer common questions.",
      "ElevenLabs text to speech so the AI sounds like a person and not a robot.",
      "If the caller asks for something in writing, the system emails it to them during the call.",
      "Escalation rules with eligibility checks, priority based transfer to human agents and retries.",
      "When no agent is available, a ticket is created with the caller's details, a short summary of the issue and the full transcript.",
      "Admin dashboard to see call history, transcripts, recordings and analytics.",
    ],
    architecture: [
      { title: "Call path", steps: ["Caller", "Twilio", "Node.js call service", "AI agent + ElevenLabs voice", "Resolved / email sent"] },
      { title: "Escalation", steps: ["Agent can't resolve", "Transfer to human", "No one free?", "Support ticket with transcript"] },
    ],
    decisions: [
      {
        title: "Planning for the AI to fail",
        body: "A bot that keeps the caller stuck is worse than voicemail. We assumed the AI would sometimes get it wrong, so the handover to a person or to a ticket had to work every time.",
      },
      {
        title: "Transcript attached to every ticket",
        body: "The support team can read what was said before they call back, so the customer doesn't have to explain everything again.",
      },
      {
        title: "Recording every call",
        body: "Recordings, transcripts and analytics are all in one dashboard. The client can check what the AI said and keep improving the call flows.",
      },
    ],
    screenshots: [],
  },
  {
    slug: "cryptometric",
    accent: "#fbbf24",
    visual: "crypto",
    title: "Cryptometric",
    tagline: "Research a token and swap it, on five different chains",
    summary:
      "A crypto platform with a big token directory, market news and favourites. Users can also swap tokens on five EVM chains using MetaMask or Coinbase Wallet.",
    status: "live",
    statusNote: "Live in production",
    role: "Full-stack developer",
    stack: ["Vue.js", "Node.js", "PostgreSQL", "Web3", "MetaMask", "Coinbase Wallet"],
    liveUrl: "https://cryptometric.com/",
    overview: [
      "Crypto users usually keep switching between explorers, news sites and DEXs. Cryptometric puts research and swapping in one place.",
      "Users can browse tokens, open any token to see details and charts, read market news, save favourites and swap without leaving the site.",
    ],
    built: [
      "Token directory with detail pages and charts, with data stored in PostgreSQL.",
      "Market news feed and saved favourites for each user.",
      "Wallet connection with MetaMask and Coinbase Wallet.",
      "Token swapping across Ethereum, BNB Smart Chain, Polygon, Base and Avalanche.",
    ],
    architecture: [
      { title: "Research", steps: ["Vue.js app", "Node.js API", "PostgreSQL", "Token pages & charts"] },
      { title: "Swap", steps: ["User wallet", "Network check / switch", "Swap on selected chain", "Transaction confirmed"] },
    ],
    decisions: [
      {
        title: "One swap flow for five chains",
        body: "Every network has its own chain ID and its own small issues. I kept one swap flow that checks the wallet's network and switches it if needed, instead of building five separate screens.",
      },
      {
        title: "Same code for both wallets",
        body: "MetaMask and Coinbase Wallet use the same interface in our code, so adding another wallet later won't need big changes.",
      },
    ],
    screenshots: [],
  },
  {
    slug: "language-assessment-platform",
    accent: "#f472b6",
    visual: "language",
    title: "Language Assessment Platform",
    tagline: "Japanese and Chinese practice for teachers and students",
    summary:
      "A MERN app where teachers create language tests and students practise with exercises and get feedback right away.",
    period: "Oct 2024 - Jun 2025",
    status: "delivered",
    statusNote: "Handed over to client, no longer online",
    role: "Full-stack developer",
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    overview: [
      "The client wanted one place where teachers could run tests and students could practise Japanese and Chinese.",
      "I worked on both the frontend and the backend, and handed the finished project over to the client.",
    ],
    built: [
      "Separate teacher and student logins, each with their own dashboard and permissions.",
      "Teachers can create tests, assign them and review the answers.",
      "Exercises for students that show feedback right away.",
      "REST API in Node.js and Express, with MongoDB and JWT login.",
    ],
    architecture: [{ title: "Request flow", steps: ["React app (teacher / student)", "Express REST API", "JWT role check", "MongoDB"] }],
    decisions: [
      {
        title: "Roles checked on the server",
        body: "Teachers and students can see and do different things. I checked roles in the API and not only in the UI, so a student can't open another student's answers by calling the API directly.",
      },
    ],
    screenshots: [],
  },
];

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In development",
  delivered: "Delivered",
};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
