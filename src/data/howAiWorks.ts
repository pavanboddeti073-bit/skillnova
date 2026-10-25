export interface HowAiWorksLesson {
  id: string;
  slug: string;
  title: string;
  category: 'ai_systems' | 'software_architecture' | 'execution_sandboxes';
  durationMinutes: number;
  badge: string;
  summary: string;
  coreConcepts: string[];
  plainLanguageExplanation: string;
  realWorldAnalogy: string;
  interactiveDiagramMermaid: string;
  deepDiveMarkdown: string;
  quickQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export type SystemLesson = HowAiWorksLesson;

export const howAiWorksLessons: HowAiWorksLesson[] = [
  // LESSON 1: WHAT IS AN AI MODEL
  {
    id: 'how-01-model-foundations',
    slug: 'what-is-an-ai-model-weights-inference',
    title: '1. What an AI Model Actually Is: Training vs Inference',
    category: 'ai_systems',
    durationMinutes: 12,
    badge: 'AI Core',
    summary: 'Demystify large language models: learn what neural network weights are, how training differs from inference, and why models generate probabilities.',
    coreConcepts: ['Neural Network Weights', 'Training vs Inference', 'Probabilistic Next-Token Prediction', 'Compute Costs'],
    plainLanguageExplanation: 'An AI model is not a database of answers or a conscious brain. It is a giant mathematical file containing billions of numbers called "weights". During training, the computer reads massive amounts of text and adjusts these numbers to calculate which word is most likely to come next. When you ask a question (inference), the model runs your words through those numbers to predict the next word one by one.',
    realWorldAnalogy: 'Imagine a master musician who has listened to every song written in the last 100 years. If you play the first 4 chords of a melody, they do not search a hard drive—they intuitively feel which musical note naturally follows next based on millions of hours of pattern training.',
    interactiveDiagramMermaid: `flowchart LR
    A["Training Phase (Months / $10M+ GPUs)"] --> B["Trained Model File (Frozen Weights)"]
    C["Learner Query Prompt"] --> D["Inference Runtime (Seconds)"]
    B --> D
    D --> E["Generated Response Tokens"]`,
    deepDiveMarkdown: `### 🧠 Training vs. Inference: The Critical Distinction

#### 1. Training (The Creation Phase):
- **What happens:** The neural network starts with random numbers and attempts to predict the next word in trillions of sentences. Every time it makes a mistake, an optimization algorithm (**Backpropagation**) nudges the numbers slightly closer to the right answer.
- **Compute:** Requires thousands of high-end GPUs (like NVIDIA H100s) running continuously for weeks or months.
- **Cost:** Millions of dollars in electricity and hardware.
- **Result:** A static, frozen file of numbers called **model weights** (e.g. Meta Llama 3, Muse Spark).

#### 2. Inference (The Usage Phase):
- **What happens:** The model is locked. When you type *"Explain binary search"*, the model performs mathematical matrix multiplications against its frozen weights to output words.
- **Compute:** Runs in milliseconds to seconds on a single GPU or CPU.
- **Key Takeaway:** The model does **NOT** learn or update its weights while answering your question! Once the conversation ends, its internal memory is reset unless stored in a database.`,
    quickQuiz: {
      question: 'Does a standard AI model update its internal weights and learn permanently while answering your questions during chat?',
      options: [
        'Yes, every conversation permanently trains the model weights immediately.',
        'No, inference uses frozen weights; conversation context is passed temporarily via the prompt.',
        'Yes, but only if you click the thumbs-up button.',
        'Only on weekends when servers run updates.'
      ],
      correctIndex: 1,
      explanation: 'Inference uses frozen, static weights. The model feels like it remembers your conversation only because the frontend resends past messages in the conversation history with every new request.'
    }
  },

  // LESSON 2: TOKENS & CONTEXT WINDOWS
  {
    id: 'how-02-tokens-context-windows',
    slug: 'tokens-context-windows-and-cost',
    title: '2. Tokens, Context Windows & Cost Economics',
    category: 'ai_systems',
    durationMinutes: 15,
    badge: 'Economics',
    summary: 'Discover how computers break words into numerical tokens, what context window limits mean, and how developers optimize API costs.',
    coreConcepts: ['Tokenization (BPE)', 'Context Window Limits', 'Input vs Output Pricing', 'Prompt Optimization'],
    plainLanguageExplanation: 'Computers cannot read letters directly—they only understand numbers. Before text reaches an AI model, a program called a Tokenizer chops the words into numeric pieces called "tokens". Roughly speaking, 1 token is about 4 characters or 0.75 words in English. The "context window" is the maximum number of tokens a model can read and write in a single conversation.',
    realWorldAnalogy: 'Think of an AI model as an executive with an 8-page desk organizer. They can only read and remember whatever documents fit on that desk right now. If a conversation exceeds 8 pages (the context window), older pages fall off the edge of the desk and are forgotten unless summarized.',
    interactiveDiagramMermaid: `flowchart TD
    Raw["Raw Text: 'function binarySearch()'"] --> Tok["Tokenizer (Byte-Pair Encoding)"]
    Tok --> IDs["Token IDs: [1524, 8291, 40182, 321]"]
    IDs --> Model["Transformer Attention Layers"]
    Model --> Out["Next Token Prediction: 'low = 0'"]`,
    deepDiveMarkdown: `### 🔢 How Tokenization Works in Practice

#### 1. Why Not Just Split by Words?
If models used entire words, they would need a dictionary containing millions of words in every language, including typos and slang. Instead, modern LLMs use **Byte-Pair Encoding (BPE)**:
- Common words are single tokens: \`" the"\` = token \`262\`
- Code symbols are often individual tokens: \`"{"\` = token \`90\`
- Unfamiliar words are broken into syllables: \`"SkillNova"\` -> \`["Skill", "Nova"]\`

#### 2. The Context Window Budget:
A model with a 128,000-token context window can read roughly 300 pages of text at once. However, larger context windows:
- Require exponentially more memory (Attention mechanism scales quadratically $O(n^2)$ without optimizations).
- Increase latency (time to first token).
- Cost more money per API request.`,
    quickQuiz: {
      question: 'Approximately how many English words does a 1,000-token response contain?',
      options: [
        'Exactly 1,000 words',
        'About 750 words (roughly 0.75 words per token)',
        'About 4,000 words',
        'Only 100 words'
      ],
      correctIndex: 1,
      explanation: 'In English, 1 token averages about 4 characters or roughly 0.75 words. Therefore, 1,000 tokens corresponds to approximately 750 words.'
    }
  },

  // LESSON 3: END-TO-END REQUEST LIFECYCLE
  {
    id: 'how-03-request-lifecycle',
    slug: 'end-to-end-request-lifecycle',
    title: '3. End-to-End Architecture: From User Keystroke to AI Output',
    category: 'software_architecture',
    durationMinutes: 15,
    badge: 'Architecture',
    summary: 'Trace the complete journey of a request: Browser -> Network -> Express API -> Meta Model API -> Response Validation -> UI.',
    coreConcepts: ['HTTP POST & Headers', 'Server-Side Security Boundary', 'Model API Authentication', 'Safe Output Sanitization'],
    plainLanguageExplanation: 'When you ask Nova AI a question, your browser never contacts the AI provider directly. Doing so would expose private API keys in client-side JavaScript. Instead, your browser sends an authenticated request to our Express backend, which validates your input, attaches the server-side `MODEL_API_KEY`, calls Meta Model API, verifies the response, and sends formatted markdown back to your screen.',
    realWorldAnalogy: 'Think of a restaurant: customers (browser) do not walk into the kitchen (AI model) and cook. They give their order to a waiter (backend server). The waiter checks if the customer has a table (authentication), carries the order to the kitchen, ensures the food is clean (sanitization), and brings it back to the table.',
    interactiveDiagramMermaid: `sequenceDiagram
    participant User as Learner Browser
    participant Server as SkillNova Backend (Express / Vercel)
    participant Meta as Meta Model API (Muse Spark)
    
    User->>Server: POST /api/tutor/chat { message, mode, level }
    Note over Server: Verify Auth & Validate Input Size (max 8KB)
    Server->>Meta: POST https://api.meta.ai/v1/chat/completions (with MODEL_API_KEY)
    Meta-->>Server: 200 OK { choices: [{ message: { content } }] }
    Note over Server: Sanitize Markdown & Check Hallucinations
    Server-->>User: 200 OK { reply, source, suggestedFollowUps }
    Note over User: Syntax Highlight Code & Render KaTeX`,
    deepDiveMarkdown: `### 🛡️ Why the Backend Security Boundary is Mandatory

If frontend code called \`https://api.meta.ai/v1\` directly:
1. Anyone could open DevTools (F12) -> Network -> find your \`Authorization: Bearer <KEY>\` header and steal your credits.
2. Attackers could bypass rate limits and abuse your account.
3. Untrusted outputs could inject cross-site scripting (XSS) attacks directly into user sessions.

**SkillNova's 5-Layer Defensive Pipeline:**
1. **Frontend:** Enter-to-send debounce, query length limit (8,000 chars).
2. **Gateway:** Rate limiting and JWT authentication validation.
3. **Model Router:** Attaches secret \`MODEL_API_KEY\`, selects Muse Spark or Ollama.
4. **Validation:** Checks that model output contains valid code syntax.
5. **Renderer:** Escapes raw HTML and renders isolated code blocks safely.`,
    quickQuiz: {
      question: 'Why must API keys for AI models (like MODEL_API_KEY) always remain on the server and never in client-side React code?',
      options: [
        'Because React apps run faster when keys are on the server.',
        'Because any user can inspect frontend code or network tabs in DevTools and steal exposed API keys.',
        'Because Google Chrome automatically blocks all API keys.',
        'It does not matter; frontend keys are completely safe.'
      ],
      correctIndex: 1,
      explanation: 'All client-side code runs on the user device. Anyone can open DevTools and copy any secret embedded in JavaScript bundles, which is why keys must always live behind a secure backend server.'
    }
  },

  // LESSON 4: SANDBOXED CODE EXECUTION
  {
    id: 'how-04-sandboxed-execution',
    slug: 'sandboxed-code-execution-architecture',
    title: '4. Safe Code Execution: How Sandboxes Protect Platforms',
    category: 'execution_sandboxes',
    durationMinutes: 18,
    badge: 'Security',
    summary: 'Learn how platforms safely run untrusted student code without crashing servers or exposing infrastructure.',
    coreConcepts: ['Process Isolation', 'Timeouts & OOM Killing', 'Restricted Syscalls', 'Virtual Machines vs Containers'],
    plainLanguageExplanation: 'When a learner writes `while True: pass` or tries to delete files on the server, the platform cannot allow that code to run directly on the main host machine. Sandboxed execution runs the code inside an isolated environment with strict resource handcuffs: no network access, maximum 3 seconds of CPU time, and a 64MB memory limit.',
    realWorldAnalogy: 'Think of a chemistry lab experiment inside a sealed fume hood behind thick glass. If the chemicals explode or release toxic smoke, the fume hood contains the damage and vents it away safely without harming anyone in the school building.',
    interactiveDiagramMermaid: `flowchart TD
    UserCode["Untrusted User Code"] --> Gateway["SkillNova Execution Router"]
    Gateway --> Guard["Pre-Execution Validator (File size, syntax check)"]
    Guard --> Sandbox["Isolated Runner (Node vm / Python -I Sandbox)"]
    Sandbox -- CPU Timeout > 3s --> Kill["Process Killed (SIGKILL / 137)"]
    Sandbox -- Exceeds 64MB --> OOM["Memory Limit Reached"]
    Sandbox -- Success --> Tests["Hidden & Visible Test Assertions"]
    Tests --> Results["Structured Pass/Fail Feedback"]`,
    deepDiveMarkdown: `### 🔒 The 4 Handcuffs of a Safe Code Runner

#### 1. Wall 1: The CPU Timeout (Watchdog Timer)
Learners will accidentally write infinite loops:
\`\`\`python
while True:
    pass
\`\`\`
If unchecked, this consumes 100% of a CPU core forever. The sandbox attaches an operating system watchdog timer: if execution exceeds **3,000ms**, it sends a \`SIGKILL\` signal and returns \`"Time Limit Exceeded (TLE)"\`.

#### 2. Wall 2: The Memory Cap (Max Heap)
If a user program allocates an array with 100,000,000 elements, it risks crashing the server. The runner enforces a strict memory ceiling (e.g. 64MB); exceeding it terminates the process with \`"Memory Limit Exceeded"\`.

#### 3. Wall 3: Network Isolation
Untrusted user code must **NEVER** have outbound internet access. Otherwise, malicious code could participate in DDoS attacks, port scan internal databases, or upload server files to foreign servers.

#### 4. Wall 4: File System Jail (Chroot / No-FS)
The runner disables access to sensitive system paths like \`/etc/passwd\`, \`.env\`, and project source files.`,
    quickQuiz: {
      question: 'What happens in a properly secured code execution sandbox when a student code contains an infinite loop like `while (true) {}`?',
      options: [
        'The entire hosting server crashes and restarts.',
        'A watchdog timer terminates the process after a predefined timeout (e.g. 3s) and reports "Time Limit Exceeded".',
        'The browser device catches on fire.',
        'The AI tutor automatically fixes the loop before executing it.'
      ],
      correctIndex: 1,
      explanation: 'Secure execution sandboxes run with strict CPU limits. When a program exceeds the allotted execution window, the operating system kills the process and returns a Time Limit Exceeded error.'
    }
  }
];
