// Hub Engine v4 — Team Data Model
// Owner: John Lanter — CEO, AffiliateMediaHub Studio

const HUB_TEAM = {

  owner: {
    name: 'John Lanter',
    role: 'CEO / Builder',
    emoji: '👑',
    location: 'Orange, Texas'
  },

  aiAssistant: {
    name: 'Becky',
    role: 'AI Assistant + Creative Director',
    emoji: '🤖',
    model: 'llama-3.3-70b-versatile',
    api: 'Groq',
    personality: 'Warm, professional, creative, honest. Greets John by name. Never sycophantic.',
    greeting: 'Hello John, how is your day going?'
  },

  podcastShow1: {
    showName: 'Show 1',
    days: 'Monday + Wednesday',
    emoji: '🔴',
    color: '#a78bfa',
    host: {
      name: 'Lisa',
      role: 'Host',
      personality: 'Smooth, smart, confident. Delivers info clearly. Polished and direct.',
      image: 'assets/lisa.jpg'
    },
    guest: {
      name: 'Susan',
      role: 'Guest',
      personality: 'Professional, warm, confident. Clear and trustworthy.',
      image: 'assets/susan.jpg'
    },
    type: 'Podcast Only — No Affiliate Content'
  },

  podcastShow2: {
    showName: 'Show 2',
    days: 'Tuesday + Thursday',
    emoji: '🎙️',
    color: '#f59e0b',
    host: {
      name: 'Paul',
      role: 'Host',
      personality: 'Wise, storytelling mentor. Grey beard, coveralls. Warm and honest.',
      image: 'assets/paul.jpg'
    },
    guest: {
      name: 'Alisha',
      role: 'Guest',
      personality: 'Engaging, curious, conversational. Glasses. Energetic and relatable.',
      image: 'assets/alisha.jpg'
    },
    type: 'Podcast Only — No Affiliate Content'
  },

  businessShow: {
    showName: 'Show 3 — Business',
    days: 'Friday + Saturday',
    emoji: '🏢',
    color: '#34d399',
    host: {
      name: 'Susan',
      role: 'Host',
      personality: 'Professional, warm, confident business host.',
      image: 'assets/susan.jpg'
    },
    guest: {
      name: 'Alisha',
      role: 'Guest',
      personality: 'Curious, engaging, practical business co-host.',
      image: 'assets/alisha.jpg'
    },
    type: 'Business Podcast Only — No Affiliate Content'
  },

  affiliateTeam: {
    teamName: 'Affiliate Team',
    days: 'Any Day',
    emoji: '💰',
    color: '#f5c518',
    host: {
      name: 'Becky Host',
      role: 'Affiliate Host',
      personality: 'Professional, warm, guides conversation. Gold blouse, studio setting.',
      image: 'assets/becky-host.jpg'
    },
    guest: {
      name: 'Becky Guest',
      role: 'Affiliate Guest',
      personality: 'Relatable, genuine, shares experience. Cream blouse, home office.',
      image: 'assets/becky-guest.jpg'
    },
    type: 'Affiliate Promos Only — FTC Compliant — No Hard Selling'
  }

};

// Weekly schedule lookup
const SCHEDULE = {
  monday:    { show: 'podcastShow1', label: 'Show 1 — Lisa + Susan' },
  tuesday:   { show: 'podcastShow2', label: 'Show 2 — Paul + Alisha' },
  wednesday: { show: 'podcastShow1', label: 'Show 1 — Lisa + Susan' },
  thursday:  { show: 'podcastShow2', label: 'Show 2 — Paul + Alisha' },
  friday:    { show: 'businessShow', label: 'Show 3 — Susan + Alisha' },
  saturday:  { show: 'businessShow', label: 'Show 3 — Susan + Alisha' }
};

// App navigation model — 15 sections
const NAV_SECTIONS = [
  { id: 'dashboard',   label: 'Dashboard',      emoji: '🏠', phase: 1 },
  { id: 'employment',  label: 'Employment',     emoji: '💼', phase: 2 },
  { id: 'becky',       label: 'Becky AI',       emoji: '🤖', phase: 2 },
  { id: 'podcast',     label: 'Podcast',        emoji: '🎙️', phase: 3 },
  { id: 'business',    label: 'Business',       emoji: '🏢', phase: 3 },
  { id: 'affiliate',   label: 'Affiliate',      emoji: '💰', phase: 3 },
  { id: 'video',       label: 'Video Studio',   emoji: '🎬', phase: 3 },
  { id: 'calendar',    label: 'Calendar',       emoji: '📅', phase: 3 },
  { id: 'brand',       label: 'Brand Voice',    emoji: '🎨', phase: 2 },
  { id: 'prompts',     label: 'Prompts',        emoji: '💡', phase: 2 },
  { id: 'skills',      label: 'Skills',         emoji: '⚡', phase: 4 },
  { id: 'training',    label: 'Training',       emoji: '🎓', phase: 4 },
  { id: 'files',       label: 'Files',          emoji: '📁', phase: 4 },
  { id: 'team',        label: 'Team',           emoji: '👥', phase: 1 },
  { id: 'settings',    label: 'Settings',       emoji: '⚙️', phase: 4 }
];
