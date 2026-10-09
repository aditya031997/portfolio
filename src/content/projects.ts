/**
 * Case studies. Order here is the order on the home page.
 *
 * Screenshots: put images (1600x807 WebP works well) in public/projects/<slug>/ and list them in
 * `screenshots`. The first one replaces the drawn preview on the card. With none, the drawn preview
 * shows and the gallery is hidden.
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
  /** Public repo, if the code can be shared. Adds a "View code" button to the case study. */
  githubUrl?: string;
  videoUrl?: string;
  overview: string[];
  built: string[];
  architecture: { title: string; steps: string[] }[];
  decisions: { title: string; body: string }[];
  /** `title` and `description` show under the slide in the carousel; `alt` is for screen readers. */
  screenshots: { src: string; alt: string; title?: string; description?: string }[];
};

export const projects: Project[] = [
  {
    slug: "football-predictions",
    accent: "#34d399",
    visual: "football",
    title: "Football Prediction Platform",
    tagline: "Automated football predictions with a public track record nobody can edit",
    summary:
      "A fully automated football prediction site. Every day it pulls fixtures, stats, injuries, weather and bookmaker odds, prices 12 betting markets, publishes value bets before kickoff and grades them after the match. I built the Next.js frontend, with thousands of SEO pages and a Payload CMS blog.",
    period: "Jul 2026 - Present",
    status: "in-development",
    statusNote: "Private client project, not public yet",
    role: "Frontend developer (Next.js, SEO, Payload CMS)",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Payload CMS", "ISR", "JSON-LD", "MongoDB", "Redis"],
    overview: [
      "Most tipster sites show off their winners and quietly forget the losers. This client wanted the opposite: every pick is published before kickoff, locked so it can't be changed, and graded in public after the match. The idea is a system that proves whether the picks make money, not a tipster site.",
      "The backend does the maths with no human involved. It blends the bookmakers' fair probability (70%) with a Poisson goal model (30%), and only publishes a bet when the best price on offer is at least 2% better than that probability, using odds that are less than 15 minutes old from at least 3 bookmakers. It covers 12 markets across around 75 to 100 leagues.",
      "I built the public website on Next.js 16: the page templates, the programmatic SEO, the free and premium views and the Payload CMS blog.",
    ],
    built: [
      "Page types for matches, leagues, countries, markets, daily predictions, results, performance and pricing, all generated from the backend's data and served with ISR.",
      "Match pages with predictions for all 12 markets, plus team form, head to head, weather and the league table.",
      "Programmatic SEO: canonical URLs with permanent redirects for old URL shapes, JSON-LD (SportsEvent, BreadcrumbList, ItemList, BlogPosting, Product) and a sitemap index split by page type.",
      "Shared noindex rules, so pages with no predictions or inactive leagues stay out of Google, and a switch that stops the staging site from ever being indexed.",
      "On-demand revalidation. When a pick is published or settled, the backend calls a webhook with cache tags like results or league:<id>, and only those pages refresh, within seconds.",
      "Payload CMS 3 inside the Next.js app for the blog, with drafts, versions, media uploads and link rules that turn keywords into internal links automatically.",
      "Free and premium views. Premium numbers like EV, edge and fair probability are removed on the server for free users, and the frontend follows the same rules.",
      "One server-side fetch helper for the whole site. If a call fails it returns nothing, so that section of the page is hidden instead of the page crashing.",
    ],
    architecture: [
      { title: "Daily pipeline", steps: ["Fixtures, stats, weather, odds", "Prediction engine at 06:00", "Value bets published 6h before kickoff", "Locked at T-10 min", "Graded after full time"] },
      { title: "Finding value", steps: ["Bookmaker odds", "Remove bookmaker margin", "Blend 70/30 with Poisson model", "EV = probability × best odds − 1", "Publish if EV ≥ 2%"] },
      { title: "Keeping pages fresh", steps: ["Pick published or settled", "Backend webhook", "Cache tag revalidation", "Fresh static page", "Google"] },
      { title: "Blog", steps: ["Editor in Payload CMS", "Publish", "On-demand revalidation", "Live article"] },
    ],
    decisions: [
      {
        title: "A track record nobody can edit",
        body: "Picks are frozen when published, locked 10 minutes before kickoff and never deleted, only marked as replaced. The public results page lists every pick, so the numbers can be trusted.",
      },
      {
        title: "Market plus model, not model alone",
        body: "Bookmaker prices already contain a lot of information. In testing, the 70/30 blend scored a Brier score of 0.2074, better than the market alone (0.2097) or the model alone (0.2244).",
      },
      {
        title: "No third-party calls when a page loads",
        body: "Background jobs collect all the data and pages only read our own API. That keeps pages fast and protects the paid API quotas from traffic spikes.",
      },
      {
        title: "Refreshing only what changed",
        body: "Thousands of pages can't all be rebuilt every few minutes. With ISR and cache tags, a settled match only refreshes its own match, league and results pages.",
      },
      {
        title: "Not indexing thin pages",
        body: "A generator can create pages with almost nothing on them, like a league with no fixtures yet. Those get noindex so they don't pull down how Google sees the rest of the site.",
      },
      {
        title: "Separate database for the CMS",
        body: "Blog content lives in its own database, away from match data. Backups and migrations are simpler, and one side can't break the other.",
      },
    ],
    screenshots: [
      {
        src: "/projects/football-predictions/home.webp",
        alt: "Home page with the Banker of the Day, platform stats and today's tips",
        title: "Home page",
        description:
          "The Banker of the Day with its odds, EV and suggested stake, live platform stats, tabs for each market and today's tips. Premium users also see EV, edge, MPO and Banker score on every tip, plus their own progress.",
      },
      {
        src: "/projects/football-predictions/markets.webp",
        alt: "Markets hub with picks, ROI, win rate and average EV per market",
        title: "Markets hub",
        description:
          "Every betting market with today's picks, 90-day ROI, win rate and average EV. Each market links to its own page, built to rank for searches like \"BTTS tips\".",
      },
      {
        src: "/projects/football-predictions/performance.webp",
        alt: "Public performance page with ROI, profit chart and breakdowns by market and league",
        title: "Public track record",
        description:
          "Picks, win rate, ROI and profit for any time range, a cumulative profit chart and breakdowns by market and league. The numbers are recalculated every hour from settled picks, and every pick stays visible.",
      },
      {
        src: "/projects/football-predictions/blog.webp",
        alt: "Blog with featured articles, categories and search",
        title: "Insights and guides",
        description:
          "The blog runs on Payload CMS inside the Next.js app. Editors write and publish from the admin panel, the page refreshes within seconds, and keywords in each article are turned into internal links automatically.",
      },
    ],
  },
  {
    slug: "ai-virtual-receptionist",
    accent: "#a78bfa",
    visual: "voice",
    title: "AI Virtual Receptionist",
    tagline: "An AI that answers support calls and gets a technician on the line when it can't help",
    summary:
      "A voice AI receptionist, admin panel and website chatbot for SmartCaller, used in the Australian aged-care and nurse-call industry. The AI answers calls from a knowledge base, rings technicians in priority order when a person is needed, and calls them itself after hours.",
    period: "Jul 2025 - Jun 2026",
    status: "live",
    statusNote: "In production",
    role: "Full-stack developer (backend, admin panel, chatbot)",
    stack: ["NestJS", "Next.js", "PostgreSQL", "TypeORM", "Twilio", "ElevenLabs", "OpenAI", "AWS"],
    overview: [
      "SmartCaller runs the support line for companies that install nurse-call and alarm systems in care facilities across Australia. Callers are usually facility staff with a problem that needs a technician, and a lot of calls come in after hours.",
      "The client wanted an AI that could handle common questions by itself, and get a real technician on the phone when it couldn't. The project has three parts: a NestJS backend that runs the call logic, an admin panel for the support team, and a chatbot for their website. I worked on all three.",
    ],
    built: [
      "Calls come in through Twilio to an ElevenLabs voice agent. The agent answers from the knowledge base and calls backend tools to look up site details, working hours and caller information.",
      "During business hours the caller waits in a conference with hold music while the system rings technicians in priority order, 3 tries each. Answering machine detection makes sure only a real person gets connected.",
      "After hours the AI makes outbound calls to the on-call technicians, explains the issue and emails them the caller's details. If nobody picks up, the dealer gets an email.",
      "Knowledge base where staff upload PDFs, Word files, links or a whole sitemap. Scanned PDFs go through OCR with AWS Textract, with OpenAI vision as a fallback, before the content is added to the agent.",
      "Admin panel with a live dashboard, call history with recordings and transcripts, PDF export, dealers and technicians, business hours and public holidays.",
      "Support inbox that pulls emails over IMAP and uses OpenAI to draft a reply from the email and the related call transcript.",
      "Website chatbot where visitors can ask questions, generate facility reports or book an appointment. An OpenAI intent router works out what the visitor wants.",
      "HubSpot CRM connection, with each token stored encrypted.",
    ],
    architecture: [
      { title: "Call path", steps: ["Caller", "Twilio", "ElevenLabs voice agent", "NestJS agent tools", "Answer from knowledge base"] },
      { title: "Business hours", steps: ["Needs a person", "Caller on hold", "Ring technicians by priority", "Connected or callback email"] },
      { title: "After hours", steps: ["Request logged", "AI calls on-call technician", "Retry every 5 minutes", "Email dealer if no answer"] },
      { title: "Knowledge base", steps: ["PDF, DOCX or sitemap", "OCR if scanned", "ElevenLabs knowledge base", "Voice and chat agents"] },
    ],
    decisions: [
      {
        title: "Every call ends with a person or a callback",
        body: "A bot that keeps the caller stuck is worse than voicemail. If the AI can't help, the system rings technicians, calls them after hours, or emails the dealer. There is always a next step.",
      },
      {
        title: "Only connecting real people",
        body: "If a technician's voicemail picked up, the caller would end up talking to a recording. Answering machine detection means the caller is only joined when a person actually answers.",
      },
      {
        title: "OCR with a fallback",
        body: "A lot of product datasheets are scanned PDFs with no text in them. Textract reads most of them and OpenAI vision handles the pages it can't. Without this the agent would have nothing to answer from.",
      },
      {
        title: "Asking instead of guessing",
        body: "The chatbot's intent router runs at temperature 0 with a fixed list of intents. If it isn't confident, it asks the visitor a question instead of guessing, and report or booking details are checked against real site data before anything is submitted.",
      },
      {
        title: "Live updates on the dashboard",
        body: "New calls and support emails show up for the team straight away through Server-Sent Events, so nobody has to keep refreshing the page.",
      },
    ],
    screenshots: [
      {
        src: "/projects/ai-virtual-receptionist/dashboard.webp",
        alt: "Dashboard with call stats, calls by hour and caller feedback",
        title: "Live dashboard",
        description:
          "Total, answered, disconnected and after-hours calls, each compared with the previous period. The chart shows what time of day calls come in, and caller feedback can be split between the AI and human agents. New calls show up without refreshing, using Server-Sent Events.",
      },
      {
        src: "/projects/ai-virtual-receptionist/call-history.webp",
        alt: "Call history with filters for after-hours calls, status and dates",
        title: "Call history",
        description:
          "Every call the AI takes is saved with the caller, site, duration and feedback. The team can filter by business or after hours, call status and date. Opening a call shows the transcript, the recording and a summary, and it can be exported as a PDF.",
      },
      {
        src: "/projects/ai-virtual-receptionist/knowledge-base.webp",
        alt: "Knowledge base where staff upload product documents for the AI",
        title: "Knowledge base",
        description:
          "Staff upload PDFs, Word files, website links, text and FAQs, organised in folders. All of it is synced to the ElevenLabs agent, so the AI answers callers from this content instead of making things up.",
      },
      {
        src: "/projects/ai-virtual-receptionist/knowledge-base-document.webp",
        alt: "Text pulled out of an uploaded product datasheet",
        title: "Reading uploaded documents",
        description:
          "This is the text the system pulled out of a product datasheet. Scanned PDFs have no text in them, so they go through OCR with AWS Textract first and OpenAI vision if that fails.",
      },
      {
        src: "/projects/ai-virtual-receptionist/mail-inbox.webp",
        alt: "Support inbox with callback requests sent by the AI",
        title: "Support inbox",
        description:
          "The support mailbox is pulled in over IMAP. When the AI can't reach a technician, it sends a callback request here with the caller's details and a summary of the call. Staff can generate a reply draft with OpenAI, based on the email and the call transcript.",
      },
      {
        src: "/projects/ai-virtual-receptionist/dealers.webp",
        alt: "Dealers and their technicians, who receive transferred calls",
        title: "Dealers and technicians",
        description:
          "Each dealer has its own technicians, ranked by priority. When a caller needs a person, the system rings the technicians for that site in this order until someone picks up.",
      },
      {
        src: "/projects/ai-virtual-receptionist/availability.webp",
        alt: "Business hours that decide how calls are routed",
        title: "Business hours and holidays",
        description:
          "Opening hours and public holidays decide what happens to a call. During business hours the caller is transferred to a technician. After hours the AI calls the on-call technician itself.",
      },
    ],
  },
  {
    slug: "cryptometric",
    accent: "#fbbf24",
    visual: "crypto",
    title: "Cryptometric",
    tagline: "Crypto market data, token safety checks and swaps on five chains",
    summary:
      "A crypto platform with live prices for 5,000+ coins, token security checks and a non-custodial swap on Ethereum, BNB Chain, Polygon, Base and Avalanche. I built most of the Node.js backend: the swap engine, the market data sync and the live updates.",
    period: "Mar 2024 - Dec 2024",
    status: "live",
    statusNote: "Live in production",
    role: "Backend developer (Node.js)",
    stack: ["Node.js", "Express", "MySQL", "Sequelize", "ethers.js", "Uniswap SDK", "Socket.IO", "Moralis", "CoinMarketCap API", "GoPlus"],
    overview: [
      "Crypto users usually jump between CoinMarketCap for prices, a token scanner to check if a coin is safe, and a DEX to actually buy it. Cryptometric puts all three in one place, with price alerts and news on top.",
      "The product has a Vue frontend, an older Laravel API and a newer Node.js backend. I worked on the Node.js backend, which handles the swap, the market data sync, token security data and live updates. I made more than half of the commits on it.",
    ],
    built: [
      "Swap API for 5 chains. It reads wallet balances and allowances, builds the approve transaction when needed and returns a swap transaction that is ready to sign.",
      "Best price routing with Uniswap's smart order router across V2 and V3 pools, with slippage set by the user and a 30 minute deadline. When the best route is a V2 pool, the swap is quoted again and built directly against that chain's V2 router.",
      "Direct wrap and unwrap, so ETH to WETH and back skips the router completely.",
      "A cron job that pulls coin listings and categories from CoinMarketCap into MySQL every 10 minutes.",
      "Live updates with Socket.IO. The coin table is sent when a browser connects and again after every sync, which keeps the bubble chart up to date.",
      "Token detail API that finds a token's contract on each chain, reads its decimals on-chain with ethers.js and saves new tokens automatically.",
      "Security and supply data from GoPlus: honeypot check, buy and sell tax, mintable or proxy contracts and top holders.",
      "Wallet token balances through Moralis.",
    ],
    architecture: [
      { title: "Swap", steps: ["Pick tokens and amount", "Check allowance", "Approve if needed", "Smart order router quote", "User signs in wallet"] },
      { title: "Market data", steps: ["CoinMarketCap API", "Cron every 10 minutes", "MySQL", "Socket.IO push", "Live bubble chart"] },
      { title: "Token details", steps: ["Token page opened", "CoinMarketCap info", "Decimals read on-chain", "GoPlus security check", "Saved to token list"] },
    ],
    decisions: [
      {
        title: "The server never touches user funds",
        body: "The backend only builds transactions and sends them back. The user signs everything in MetaMask, Coinbase Wallet or WalletConnect, so there are no private keys on the server and nothing to steal.",
      },
      {
        title: "One swap engine for five chains",
        body: "Each chain has its own router, quoter and wrapped token. All of that lives in one network config, so the same swap code runs on all five chains.",
      },
      {
        title: "Falling back to V2 when it wins",
        body: "When the best route is a V2 pool, the swap is built directly against the V2 router with a minimum output amount. That keeps those swaps simple and predictable.",
      },
      {
        title: "Checking a token before people buy it",
        body: "Plenty of new tokens are scams. Showing GoPlus data like honeypot status and sell tax on the token page lets users spot a bad token before they swap into it.",
      },
      {
        title: "Pushing data instead of polling",
        body: "Market data changes every 10 minutes for everyone. Pushing it once over Socket.IO is cheaper than thousands of browsers calling the API again and again.",
      },
    ],
    screenshots: [
      {
        src: "/projects/cryptometric/home.webp",
        alt: "Home dashboard with a price chart, favourite coins, alerts and news",
        title: "Home dashboard",
        description:
          "A widget board the user can rearrange: a TradingView price chart, their top 5 favourite coins with live prices, new coin alerts and the latest crypto news.",
      },
      {
        src: "/projects/cryptometric/markets.webp",
        alt: "Crypto markets table with search, filters and trader presets",
        title: "Crypto markets",
        description:
          "More than 5,000 coins with search, filters for category, price, rank, market cap and volume, and Day Trader or Swing Trader presets. The Node backend syncs prices and categories from CoinMarketCap every 10 minutes.",
      },
      {
        src: "/projects/cryptometric/bubble-chart.webp",
        alt: "Top tokens shown as bubbles sized by market cap",
        title: "Top tokens bubble chart",
        description:
          "Top tokens as bubbles sized by market cap and coloured by price change over 1 hour, 24 hours, 7 days or 30 days. The data is pushed live from the Node backend over Socket.IO after every sync.",
      },
      {
        src: "/projects/cryptometric/swap.webp",
        alt: "Swap page with the WalletConnect wallet picker open",
        title: "Token swap",
        description:
          "Users connect MetaMask, Coinbase Wallet or any WalletConnect wallet and swap on Ethereum, BNB Chain, Polygon, Base or Avalanche. The backend finds the best route with Uniswap's smart order router and builds the transaction, and the user signs it in their own wallet.",
      },
      {
        src: "/projects/cryptometric/news.webp",
        alt: "Crypto news feed with search and email digest settings",
        title: "Crypto news",
        description:
          "News from many crypto sources in one feed, with search and an option to get a daily or weekly news digest by email.",
      },
    ],
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
