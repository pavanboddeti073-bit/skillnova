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
  name: "SkillNova Mega14",
  tagline: "Unlock Your Potential. Learn Smarter with AI.",
  taglineTe: "మీ సామర్థ్యాన్ని వెలికితీయండి. AIతో మరింత తెలివిగా నేర్చుకోండి.",
  shortDescription: "Your personal AI learning companion for mastering skills, understanding complex concepts, practicing confidently, and achieving your goals.",
  logoText: "SkillNova Mega14",
  defaultLanguage: "en",
  supportedLanguages: [
    { code: "en", name: "English", nativeName: "English", flag: "🌐" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  ],
  primaryColor: "#4f46e5", // indigo-600
  contactEmail: "support@skillnova.dev",
  githubUrl: "https://github.com/pavanboddeti073-bit/skillnova",
  version: "2.0.0-mega14",
};
