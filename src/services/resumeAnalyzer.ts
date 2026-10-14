import type { ResumeAnalysis } from '../types/index.ts';

export function analyzeStudentResume(resumeText: string): ResumeAnalysis {
  const sanitized = resumeText.trim();
  const lower = sanitized.toLowerCase();

  // Basic structural inspection
  const hasContact = lower.includes('@') || lower.includes('linkedin.com') || lower.includes('github.com');
  const hasEducation = lower.includes('bachelor') || lower.includes('btech') || lower.includes('university') || lower.includes('college') || lower.includes('degree');
  const hasProjects = lower.includes('project') || lower.includes('built') || lower.includes('developed') || lower.includes('github');
  const hasSkills = lower.includes('skills') || lower.includes('javascript') || lower.includes('python') || lower.includes('react');

  // Detect technical keywords
  const techKeywords = [
    'react', 'typescript', 'javascript', 'python', 'node', 'express', 'sql',
    'postgres', 'mongodb', 'git', 'github', 'docker', 'tailwind', 'html', 'css',
    'rest api', 'graphql', 'c++', 'java', 'aws', 'vercel', 'gemini', 'machine learning'
  ];
  const identifiedSkills = techKeywords.filter(k => lower.includes(k));

  // Detect weak passive verbs vs strong action verbs
  const weakVerbs = ['helped', 'worked on', 'assisted with', 'responsible for', 'tried to', 'handled'];
  const hasWeakVerbs = weakVerbs.some(w => lower.includes(w));

  // Compute educational clarity score
  let score = 50;
  if (hasContact) score += 10;
  if (hasEducation) score += 10;
  if (hasProjects) score += 15;
  if (hasSkills && identifiedSkills.length >= 3) score += 15;
  if (hasWeakVerbs) score -= 10;
  score = Math.max(30, Math.min(95, score));

  const strengths: string[] = [];
  if (hasProjects) strengths.push('Identified dedicated projects section demonstrating practical code experience.');
  if (hasEducation) strengths.push('Clear academic credential listing with university information.');
  if (identifiedSkills.length >= 4) strengths.push(`Recognized modern technical toolchain: ${identifiedSkills.slice(0, 4).join(', ')}.`);

  const impactBulletCritique = [
    {
      originalExample: 'Assisted in building a website for college notes using React.',
      improvedExample: 'Architected a responsive student study repository using React and Tailwind CSS, reducing resource search time by 40% across 200+ batchmates.',
      reason: 'Replaces passive "assisted in building" with strong active verb "Architected" and quantifies impact.'
    },
    {
      originalExample: 'Worked on machine learning model for sentiment analysis.',
      improvedExample: 'Fine-tuned a BERT-based NLP model on Hugging Face achieving 88% classification accuracy on 5,000 student feedback submissions.',
      reason: 'Includes explicit model family, dataset scale, and accuracy metric (Google XYZ formula).'
    }
  ];

  const atsSafetyTips = [
    'Avoid dual-column tables and complex graphic icons; standard applicant tracking systems (ATS) often parse columns in the wrong reading order.',
    'Use standard section headings: "Education", "Technical Skills", "Projects", "Experience", and "Certifications".',
    'Include live hyperlinks to working project demos (e.g. Vercel URLs) and clean GitHub profile links.',
    'Save and export as standard text-selectable PDF rather than an image-based scanned file.'
  ];

  const recommendedAdditions: string[] = [];
  if (!lower.includes('github.com')) recommendedAdditions.push('Add a clickable link to your GitHub profile showing public commit activity.');
  if (!lower.includes('live') && !lower.includes('vercel.app')) recommendedAdditions.push('Add live working URLs for at least 2 featured projects.');
  if (!lower.includes('typescript')) recommendedAdditions.push('Consider listing TypeScript alongside JavaScript to stand out for modern frontend openings.');

  return {
    clarityScore: score,
    structureRating: score >= 75 ? 'Good' : score >= 50 ? 'Needs Improvement' : 'Formatting Risk',
    strengths: strengths.length > 0 ? strengths : ['Contains baseline text that can be formatted into an effective technical resume.'],
    impactBulletCritique,
    atsSafetyTips,
    identifiedSkills: identifiedSkills.map(s => s.toUpperCase()),
    recommendedAdditions,
    disclaimer: 'Educational feedback only. Does not guarantee interviews, ATS scores, or hiring outcomes. Always verify requirements against official company job specifications.'
  };
}
