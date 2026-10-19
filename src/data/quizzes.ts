export interface PracticeQuizQuestion {
  id: string;
  question: string;
  questionTe?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationTe?: string;
}

export interface PracticeQuiz {
  id: string;
  title: string;
  titleTe?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  passingScorePercent: number;
  description: string;
  questions: PracticeQuizQuestion[];
}

export const practiceQuizzes: PracticeQuiz[] = [
  {
    id: 'quiz-ai-llm-basics',
    title: 'Generative AI & LLM Core Concepts',
    titleTe: 'జెనరేటివ్ AI & LLM ప్రాథమిక క్విజ్',
    category: 'Artificial Intelligence',
    level: 'beginner',
    durationMinutes: 10,
    passingScorePercent: 75,
    description: 'Test your understanding of tokens, context windows, hallucinations, and prompt structures.',
    questions: [
      {
        id: 'q1-1',
        question: 'What is the role of the "Context Window" in a Large Language Model?',
        questionTe: 'లార్జ్ లాంగ్వేజ్ మోడల్‌లో "కాంటెక్స్ట్ విండో" పాత్ర ఏమిటి?',
        options: [
          'It is the operating system window where the AI runs',
          'It is the maximum number of tokens the model can process in memory during a single interaction',
          'It is a special browser extension required for AI chat',
          'It is the graphics card memory size'
        ],
        correctIndex: 1,
        explanation: 'The context window dictates the working memory of the model during a prompt and response cycle.',
        explanationTe: 'కాంటెక్స్ట్ విండో అనేది మోడల్ ఒకేసారి తన మెమరీలో ప్రాసెస్ చేయగల గరిష్ట టోకెన్ల పరిమితి.'
      },
      {
        id: 'q1-2',
        question: 'In the CR-TCO prompting formula, what does "C" stand for?',
        questionTe: 'CR-TCO ప్రాంప్టింగ్ ఫార్ములాలో "C" దేనిని సూచిస్తుంది?',
        options: [
          'Coding language',
          'Context (the background situation and constraints)',
          'Creativity coefficient',
          'Command line interface'
        ],
        correctIndex: 1,
        explanation: 'In CR-TCO, C stands for Context — providing the background scenario so the AI generates accurate responses.',
        explanationTe: 'CR-TCO లో C అంటే Context (సందర్భం/నేపథ్యం).'
      },
      {
        id: 'q1-3',
        question: 'Why does an LLM occasionally "hallucinate" incorrect facts?',
        questionTe: 'LLM కొన్నిసార్లు తప్పుడు సమాచారాన్ని (Hallucination) ఎందుకు ఇస్తుంది?',
        options: [
          'Because its battery ran out',
          'Because it predicts statistically probable sequences of words rather than accessing real-time database facts directly',
          'Because of an internet firewall error',
          'Because it is trying to deceive humans intentionally'
        ],
        correctIndex: 1,
        explanation: 'LLMs are probabilistic token predictors, not factual databases. Without grounding or retrieval (RAG), they generate plausible-sounding text.',
        explanationTe: 'LLMలు సంభావ్యత ఆధారంగా పదాలను ఊహిస్తాయి, నేరుగా నిజాలను వెతకవు.'
      },
      {
        id: 'q1-4',
        question: 'What temperature setting is recommended for deterministic tasks like writing code or solving math?',
        questionTe: 'కోడింగ్ మరియు గణితం వంటి ఖచ్చితమైన పనులకు సిఫార్సు చేయబడిన టెంపరేచర్ సెట్టింగ్ ఏది?',
        options: [
          'Low temperature (0.0 to 0.2)',
          'High temperature (0.8 to 1.0)',
          'Extreme temperature (2.0)',
          'Negative temperature (-1.0)'
        ],
        correctIndex: 0,
        explanation: 'Low temperature minimizes randomness, producing predictable, accurate, and reproducible outputs.',
        explanationTe: 'తక్కువ టెంపరేచర్ (0.0 నుండి 0.2) కోడింగ్‌లో కచ్చితమైన ఫలితాలను ఇస్తుంది.'
      }
    ]
  },
  {
    id: 'quiz-react-typescript',
    title: 'React 19 & TypeScript Frontend Architecture',
    titleTe: 'React 19 & TypeScript ఫ్రంటెండ్ క్విజ్',
    category: 'Programming & Web Dev',
    level: 'intermediate',
    durationMinutes: 12,
    passingScorePercent: 75,
    description: 'Assess your knowledge on immutable state, hooks dependencies, and TypeScript interfaces.',
    questions: [
      {
        id: 'q2-1',
        question: 'What is the primary danger of omitting the dependency array in useEffect(() => {...})?',
        questionTe: 'useEffect లో డిపెండెన్సీ అర్రే ఇవ్వకపోతే వచ్చే ప్రమాదం ఏమిటి?',
        options: [
          'TypeScript will fail to compile',
          'The effect executes on every single component render, frequently causing infinite loops if updating state',
          'The component will automatically unmount',
          'All CSS styles will reset'
        ],
        correctIndex: 1,
        explanation: 'Without a dependency array, useEffect runs after every render cycle, which triggers state updates and re-renders indefinitely.',
        explanationTe: 'డిపెండెన్సీ అర్రే లేకపోతే ప్రతి రెండర్‌లోనూ ఎఫెక్ట్ రన్ అయ్యి అనవసర లూప్స్ ఏర్పడతాయి.'
      },
      {
        id: 'q2-2',
        question: 'How do you fix "TypeError: Cannot read properties of undefined (reading \'name\')" systematically?',
        questionTe: '"TypeError: Cannot read properties of undefined" ఎర్రర్‌ను ఎలా పరిష్కరించాలి?',
        options: [
          'Delete the name property',
          'Use Optional Chaining (?.) and Nullish Coalescing (??) e.g. user?.name ?? "Guest"',
          'Restart your computer',
          'Change the file to a .txt file'
        ],
        correctIndex: 1,
        explanation: 'Optional chaining safely short-circuits evaluation if the target is null or undefined without throwing a runtime TypeError.',
        explanationTe: 'ఆప్షనల్ చైనింగ్ (?.) మరియు నల్లిష్ కోయలేసింగ్ (??) వాడటం ద్వారా సురక్షితంగా డీఫాల్ట్ విలువను ఇవ్వవచ్చు.'
      },
      {
        id: 'q2-3',
        question: 'What is the key difference between useMemo and useCallback?',
        questionTe: 'useMemo మరియు useCallback మధ్య ముఖ్యమైన తేడా ఏమిటి?',
        options: [
          'useMemo caches a computed value; useCallback caches a function definition',
          'useCallback only works in mobile apps',
          'useMemo can only be used with numbers',
          'There is no difference'
        ],
        correctIndex: 0,
        explanation: 'useMemo memoizes the returned result of an expensive calculation; useCallback memoizes the function instance reference.',
        explanationTe: 'useMemo అనేది గణించిన విలువను కాష్ చేస్తుంది; useCallback ఫంక్షన్ రిఫరెన్స్‌ను కాష్ చేస్తుంది.'
      }
    ]
  },
  {
    id: 'quiz-ats-resume',
    title: 'ATS Resume Engineering & Career Placement',
    titleTe: 'ATS రెజ్యూమ్ & కెరీర్ ప్రిపరేషన్ క్విజ్',
    category: 'Career Development',
    level: 'beginner',
    durationMinutes: 8,
    passingScorePercent: 70,
    description: 'Test your understanding of the Google XYZ format, ATS parsing rules, and placement optimization.',
    questions: [
      {
        id: 'q3-1',
        question: 'According to Google\'s XYZ formula for resume bullet points, what are the three components?',
        questionTe: 'గూగుల్ XYZ రెజ్యూమ్ ఫార్ములాలోని మూడు ముఖ్య అంశాలు ఏమిటి?',
        options: [
          'XML, YAML, and Z-index',
          'Accomplished [X], as measured by [Y], by doing [Z]',
          'Experience, Years, and Zipcode',
          'Excellence, Yield, and Zero bugs'
        ],
        correctIndex: 1,
        explanation: 'Google XYZ: Accomplished [X], measured by [Y], by doing [Z] provides quantifiable impact.',
        explanationTe: 'సాధించిన పని [X], కొలవగల ఫలితం [Y], ఉపయోగించిన పద్ధతి [Z].'
      },
      {
        id: 'q3-2',
        question: 'Why should software engineering students avoid multi-column graphic resumes for online applications?',
        questionTe: 'ఆన్‌లైన్ జాబ్ అప్లికేషన్లలో గ్రాఫిక్/మల్టీ-కాలమ్ రెజ్యూమ్‌లు ఎందుకు వాడకూడదు?',
        options: [
          'Because companies hate graphics',
          'Because ATS parsers read columns horizontally across lines, garbling text into unreadable fragments',
          'Because PDF files cannot support multiple columns',
          'Because multi-column files are too large'
        ],
        correctIndex: 1,
        explanation: 'ATS engines parse text left-to-right, mixing across columns and dropping candidate scores.',
        explanationTe: 'ATS సాఫ్ట్‌వేర్ కాలమ్స్‌ను ఎడమ నుండి కుడికి లైన్‌గా చదవడం వల్ల టెక్స్ట్ గందరగోళంగా మారుతుంది.'
      }
    ]
  }
];
