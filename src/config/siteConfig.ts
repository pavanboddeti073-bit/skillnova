export interface SiteConfig {
  name: string;
  tagline: string;
  taglineTe: string;
  shortDescription: string;
  logoText: string;
  defaultLanguage: 'en' | 'te';
  supportedLanguages: Array<{
    code: 'en' | 'te';
    name: string;
    nativeName: string;
    flag: string;
  }>;
  primaryColor: string;
  contactEmail: string;
  githubUrl: string;
  version: string;
}

export const siteConfig: SiteConfig = {
  name: "SkillNova",
  tagline: "From 'I have an idea' to a real result—step by step, with visual references, copyable prompts, and explanations in your preferred language.",
  taglineTe: "'నాకు ఒక ఆలోచన ఉంది కానీ ఎలా ప్రారంభించాలో తెలియదు' నుండి నిజమైన ఫలితం వరకు—దశలవారీగా, దృశ్య సూచనలు, కాపీ చేయగల ప్రాంప్ట్‌లు మరియు మీ భాషలో వివరణలతో.",
  shortDescription: "Student-first AI learning, visual build studio, and creation launchpad.",
  logoText: "SkillNova",
  defaultLanguage: "en",
  supportedLanguages: [
    { code: "en", name: "English", nativeName: "English", flag: "🌐" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  ],
  primaryColor: "#2563eb", // blue-600
  contactEmail: "support@skillnova.dev",
  githubUrl: "https://github.com",
  version: "1.0.0-mvp",
};
