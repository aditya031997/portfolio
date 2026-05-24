/**
 * Portfolio projects — add or edit entries here to update the Featured Work section.
 * icon: 'crypto' | 'voice' | 'tasks' | 'weather' | 'restaurant' | 'portfolio' | 'chat'
 * githubLink: set to null to hide the GitHub button (e.g. private / client work)
 */
export const projects = [
  {
    id: 1,
    title: 'Cryptometric',
    description:
      'A cryptocurrency platform to explore a vast token directory, follow the latest crypto market news, and save personal favorites. Users open any token for detailed info and charts. Core feature: multi-chain token swapping across Ethereum, BNB Smart Chain, Polygon, Base, and Avalanche — connect via MetaMask or Coinbase Wallet to swap tokens on supported networks.',
    technologies: ['Vue.js', 'Node.js', 'PostgreSQL', 'Web3', 'MetaMask', 'Coinbase Wallet'],
    icon: 'crypto',
    colorClass: 'project-cyan',
    liveLink: 'https://cryptometric.com/',
    githubLink: null,
    category: 'Crypto & Web3',
  },
  {
    id: 2,
    title: 'Virtual Reception',
    description:
      'An AI-powered virtual receptionist that answers inbound calls 24/7 with natural voice conversations. It captures caller details, handles common queries through guided call flows, and intelligently routes or escalates to the right human team when needed. Includes eligibility checks, priority-based escalation with retries, and a centralized admin dashboard for call history, transcripts, recordings, and analytics.',
    technologies: ['Node.js', 'Vue.js', 'PostgreSQL', 'Twilio', 'AI / NLP', 'Voice AI'],
    icon: 'voice',
    colorClass: 'project-violet',
    liveLink: 'https://smartcalleragency.com/',
    githubLink: null,
    category: 'AI & Voice Automation',
  },
];
