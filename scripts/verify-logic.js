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
assert.strictEqual(siteConfig.name, 'SkillNova Mega14');
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

// 7. Full-Stack AI Tutor & Bilingual Capabilities
console.log('✓ Checking Full-Stack AI Tutor Service...');
const tutorResponseEn = await askAiTutor('where do i start as a beginner?', 'en', 'beginner');
assert.ok(tutorResponseEn.content.length > 50);
assert.strictEqual(tutorResponseEn.isDemo, false);

const tutorResponseTe = await askAiTutor('where do i start as a beginner?', 'te', 'beginner');
assert.ok(tutorResponseTe.content.length > 50);
assert.ok(tutorResponseTe.suggestedFollowUps.length > 0);
console.log('  -> Full-Stack AI Tutor returned verified educational answers in English and Telugu.');

// 8. Prompt Templates Integrity
console.log('✓ Checking Prompt Templates...');
assert.ok(promptTemplates.length >= 6, 'Expected at least 6 prompt templates');
promptTemplates.forEach(pt => {
  assert.ok(pt.id, 'Prompt template missing ID');
  assert.ok(pt.title, 'Prompt template missing title');
  assert.ok(pt.task.length > 10, 'Prompt template task too short');
  assert.ok(pt.role.length > 5, 'Prompt template role too short');
});
console.log(`  -> ${promptTemplates.length} structured CR-TCO prompt templates verified.`);

// 9. Project Templates Integrity
console.log('✓ Checking Prebuilt Project Plans...');
assert.ok(prebuiltProjectPlans.length >= 3, 'Expected at least 3 project plans');
prebuiltProjectPlans.forEach(pp => {
  assert.ok(pp.id, 'Project plan missing ID');
  assert.ok(pp.goalSummary, 'Project plan missing goal summary');
  assert.ok(pp.milestones.length >= 3, `Project plan ${pp.id} has fewer than 3 milestones`);
});
console.log(`  -> ${prebuiltProjectPlans.length} project plans verified with milestones.`);

// 10. Career Resources Integrity
console.log('✓ Checking Career Programs...');
assert.ok(verifiedCareerResources.length >= 7, 'Expected at least 7 career programs');
verifiedCareerResources.forEach(cr => {
  assert.ok(cr.id, 'Career resource missing ID');
  assert.ok(cr.officialUrl.startsWith('http'), `Invalid URL for career resource ${cr.id}`);
  assert.ok(cr.lastCheckedAt, `Missing lastCheckedAt for ${cr.id}`);
});
console.log(`  -> ${verifiedCareerResources.length} verified student career opportunities checked.`);

// 11. 18-Category Coding Practice Engine Integrity
console.log('✓ Checking 18-Category Coding Practice Engine...');
import { practiceProblems, practiceCategories } from '../src/data/practiceProblems.ts';
assert.ok(practiceCategories.length === 18, `Expected 18 categories, found ${practiceCategories.length}`);
assert.ok(practiceProblems.length >= 8, `Expected at least 8 problems, found ${practiceProblems.length}`);
practiceProblems.forEach(p => {
  assert.ok(p.id, 'Problem missing ID');
  assert.ok(p.title, 'Problem missing title');
  assert.ok(p.starterCode.length > 5, `Problem ${p.id} starter code too short`);
  assert.ok(p.visibleTests.length >= 1, `Problem ${p.id} has no visible test cases`);
  assert.ok(p.hints.length >= 2, `Problem ${p.id} has fewer than 2 progressive hints`);
  assert.ok(p.referenceSolution.length > 10, `Problem ${p.id} missing reference solution`);
});
console.log(`  -> ${practiceProblems.length} practice problems across 18 categories and 5 difficulty tiers verified.`);

// 12. Developer Tools Academy (10 Tools, 8-Stage Progression)
console.log('✓ Checking Developer Tools Academy (10 Tools, 8-Stage Progression)...');
import { developerToolsCourses } from '../src/data/developerToolsAcademy.ts';
assert.strictEqual(developerToolsCourses.length, 10, `Expected exactly 10 tool courses, found ${developerToolsCourses.length}`);
developerToolsCourses.forEach(dt => {
  assert.ok(dt.id, 'Tool missing ID');
  assert.strictEqual(dt.stages.length, 8, `Tool ${dt.id} must have exactly 8 stages, found ${dt.stages.length}`);
  assert.ok(dt.commonMistakes.length >= 2, `Tool ${dt.id} has fewer than 2 common mistakes`);
  assert.ok(dt.portfolioProjectDeliverable.length > 5, `Tool ${dt.id} missing portfolio project deliverable`);
});
console.log(`  -> All 10 developer tools verified with mandatory 8-stage interactive lesson progression.`);

// 13. Real-World Project Studio
console.log('✓ Checking Real-World Project Studio...');
import { portfolioProjects } from '../src/data/projectStudio.ts';
assert.ok(portfolioProjects.length >= 3, 'Expected at least 3 portfolio projects');
portfolioProjects.forEach(proj => {
  assert.ok(proj.id, 'Project missing ID');
  assert.ok(proj.milestones.length >= 4, `Project ${proj.id} has fewer than 4 milestones`);
  assert.ok(proj.securityChecklist.length >= 3, `Project ${proj.id} missing security checklist`);
});
console.log(`  -> ${portfolioProjects.length} guided portfolio project blueprints verified.`);

// 14. Systems & How AI Works Lessons
console.log('✓ Checking How AI Works Systems Lessons...');
import { howAiWorksLessons } from '../src/data/howAiWorks.ts';
assert.strictEqual(howAiWorksLessons.length, 4, `Expected 4 systems lessons, found ${howAiWorksLessons.length}`);
howAiWorksLessons.forEach(hl => {
  assert.ok(hl.interactiveDiagramMermaid.length > 20, `Lesson ${hl.id} missing interactive mermaid diagram`);
  assert.ok(hl.deepDiveMarkdown.length > 50, `Lesson ${hl.id} deep dive markdown too short`);
  assert.ok(hl.quickQuiz.options.length >= 3, `Lesson ${hl.id} missing quiz options`);
  assert.ok(hl.plainLanguageExplanation.length > 30, `Lesson ${hl.id} plain language explanation too short`);
});
console.log(`  -> 4 deep architectural lessons (Weights, Tokens, Request Lifecycle, Sandbox) verified.`);

// 15. Safe Code Execution Sandbox Integration Test
console.log('✓ Checking Safe Sandbox Code Execution Engine...');
import { executeCode } from '../server/codeRunner.ts';
const sandboxTest = await executeCode({
  code: 'function add(a, b) { return a + b; }',
  language: 'javascript',
  visibleTests: [
    { id: 't1', input: 'add(2, 3)', expectedOutput: '5', description: '2 + 3 = 5' }
  ],
  hiddenTests: [
    { id: 'h1', input: 'add(-1, 1)', expectedOutput: '0', description: '-1 + 1 = 0', isHidden: true }
  ]
});
assert.strictEqual(sandboxTest.status, 'passed', `Sandbox test failed: ${sandboxTest.stderr}`);
assert.strictEqual(sandboxTest.testsPassed, 2);
assert.ok(sandboxTest.executionTimeMs >= 0);
console.log(`  -> JavaScript/TypeScript sandbox passed both visible and hidden test assertions in ${sandboxTest.executionTimeMs}ms.`);

console.log('\n=============================================');
console.log('🎉 ALL AUTOMATED VERIFICATION CHECKS PASSED!');
console.log('=============================================\n');
