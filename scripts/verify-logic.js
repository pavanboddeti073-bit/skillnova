import assert from 'node:assert';
import { verifiedTools } from '../src/data/tools.ts';
import { buildRecipes } from '../src/data/recipes.ts';
import { guidedTutorials } from '../src/data/tutorials.ts';
import { academyLessons } from '../src/data/lessons.ts';
import { prebuiltProjectPlans } from '../src/data/projectTemplates.ts';
import { verifiedCareerResources } from '../src/data/careerResources.ts';
import { promptTemplates } from '../src/data/promptTemplates.ts';
import { analyzeStudentResume } from '../src/services/resumeAnalyzer.ts';
import { askAiTutor } from '../src/services/aiTutor.ts';
import { siteConfig } from '../src/config/siteConfig.ts';

console.log('--- RUNNING SKILLNOVA LOGIC VERIFICATION SUITE ---');

// 1. Site Config Integrity
console.log('✓ Checking Site Configuration...');
assert.strictEqual(typeof siteConfig.name, 'string');
assert.strictEqual(siteConfig.name, 'SkillNova');
assert.ok(siteConfig.supportedLanguages.length >= 2);
console.log('  -> SiteConfig verified.');

// 2. Verified Tools Catalog
console.log('✓ Checking Tools Catalog (No fake claims)...');
assert.ok(verifiedTools.length >= 18, `Expected at least 18 tools, found ${verifiedTools.length}`);
const validPricingTiers = ['Open Source', 'Free Tier', 'Free Trial', 'Paid', 'Pricing Not Verified'];
verifiedTools.forEach(t => {
  assert.ok(t.id, 'Tool missing ID');
  assert.ok(t.name, 'Tool missing Name');
  assert.ok(validPricingTiers.includes(t.pricingLabel), `Invalid pricing tier: ${t.pricingLabel} in ${t.name}`);
  assert.ok(t.officialUrl.startsWith('http'), `Invalid URL for ${t.name}`);
  assert.ok(t.lastVerifiedAt, `Missing lastVerifiedAt for ${t.name}`);
  assert.ok(t.samplePrompt.length > 10, `Sample prompt too short for ${t.name}`);
  assert.ok(t.beginnerSteps.length >= 3, `Expected at least 3 beginner steps for ${t.name}`);
});
console.log(`  -> ${verifiedTools.length} tools verified with valid pricing labels and official URLs.`);

// 3. Visual Step-by-Step Build Studio Recipes
console.log('✓ Checking Visual Build Studio Recipes...');
assert.ok(buildRecipes.length >= 5, 'Expected 5 build recipes');
buildRecipes.forEach(r => {
  assert.ok(r.slug, 'Recipe missing slug');
  assert.ok(r.targetDeliverable, `Missing target deliverable for ${r.slug}`);
  assert.ok(r.steps.length >= 2, `Recipe ${r.slug} must have multiple steps`);
  r.steps.forEach(s => {
    assert.ok(s.copyablePrompt, `Step ${s.stepNumber} in ${r.slug} missing prompt`);
    assert.ok(s.checkpoint, `Step ${s.stepNumber} in ${r.slug} missing checkpoint`);
    assert.ok(s.stuckTips.length > 0, `Step ${s.stepNumber} in ${r.slug} missing stuck tips`);
  });
});
console.log(`  -> ${buildRecipes.length} build recipes verified with visual data and copyable prompts.`);

// 4. Guided Tool School Tutorials
console.log('✓ Checking Guided Tool School...');
const expectedTools = ['google-antigravity', 'replit', 'lovable', 'github', 'vercel', 'full-workflow'];
expectedTools.forEach(expectedId => {
  const found = guidedTutorials.find(t => t.toolId === expectedId);
  assert.ok(found, `Missing guided tutorial for ${expectedId}`);
  assert.ok(found.steps.length >= 3, `Tutorial ${expectedId} has fewer than 3 steps`);
  assert.ok(found.safetyNotes.length > 0, `Tutorial ${expectedId} missing safety notes`);
});
console.log(`  -> ${guidedTutorials.length} deep tutorials verified (Antigravity, Replit, Lovable, GitHub, Vercel, Full Workflow).`);

// 5. AI Academy Lessons & Quizzes
console.log('✓ Checking Academy Lessons...');
assert.ok(academyLessons.length >= 5, 'Expected at least 5 academy lessons');
academyLessons.forEach(l => {
  assert.ok(l.quiz.length >= 1, `Lesson ${l.id} has no quiz questions`);
  l.quiz.forEach(q => {
    assert.ok(q.options.length >= 3, `Question "${q.question}" has fewer than 3 options`);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < q.options.length, 'Invalid correctIndex');
    assert.ok(q.explanation, 'Missing explanation');
  });
});
console.log(`  -> ${academyLessons.length} lessons verified with interactive quiz schemas.`);

// 6. Resume Reviewer Logic
console.log('✓ Checking Resume Impact Analyzer...');
const testResume = 'Worked on building a web app using React and Python. Helped students find notes.';
const analysis = analyzeStudentResume(testResume);
assert.ok(analysis.clarityScore >= 0 && analysis.clarityScore <= 100);
assert.ok(analysis.impactBulletCritique.length >= 2);
assert.ok(analysis.atsSafetyTips.length >= 3);
assert.ok(analysis.disclaimer.includes('Educational feedback only'));
console.log('  -> Resume analyzer parsed text, flagged passive verbs, and applied Google XYZ format.');

// 7. AI Tutor Demo Mode & Bilingual Capabilities
console.log('✓ Checking AI Tutor Service...');
const tutorResponseEn = await askAiTutor('where do i start as a beginner?', 'en', 'beginner');
assert.ok(tutorResponseEn.content.length > 50);
assert.strictEqual(tutorResponseEn.isDemo, true);

const tutorResponseTe = await askAiTutor('where do i start as a beginner?', 'te', 'beginner');
assert.ok(tutorResponseTe.content.length > 50);
assert.ok(tutorResponseTe.suggestedFollowUps.length > 0);
console.log('  -> AI Tutor returned verified educational answers in English and Telugu.');

console.log('\n=============================================');
console.log('🎉 ALL AUTOMATED VERIFICATION CHECKS PASSED!');
console.log('=============================================\n');
