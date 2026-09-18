import { Role, Level, Question, QuestionEvaluation, InterviewSession, PastInterviewSummary, SessionResults } from '../types';

const INITIAL_PAST_INTERVIEWS: PastInterviewSummary[] = [
  {
    id: 'sess-10492',
    date: '2026-09-17',
    role: 'Software Engineer',
    level: 'Senior',
    score: 8.7,
    questionsCount: 3,
    status: 'Completed',
  },
  {
    id: 'sess-10488',
    date: '2026-09-15',
    role: 'DevOps',
    level: 'Mid',
    score: 7.4,
    questionsCount: 3,
    status: 'Completed',
  },
  {
    id: 'sess-10471',
    date: '2026-09-10',
    role: 'Data Scientist',
    level: 'Senior',
    score: 9.1,
    questionsCount: 3,
    status: 'Completed',
  },
];

const QUESTION_BANK: Record<Role, Record<Level, Question[]>> = {
  'Software Engineer': {
    Junior: [
      {
        id: 101,
        role: 'Software Engineer',
        level: 'Junior',
        category: 'Core Java & Data Structures',
        questionText: 'Explain the internal working of HashMap in Java. What happens during a hash collision, and how was this improved in Java 8?',
        context: 'Basic data structure fundamentals and algorithmic complexity.',
        expectedKeywords: ['hashCode()', 'equals()', 'Buckets', 'Linked list', 'Red-Black Tree', 'O(log n) treeification'],
      },
      {
        id: 102,
        role: 'Software Engineer',
        level: 'Junior',
        category: 'REST & HTTP',
        questionText: 'What is the difference between idempotent and non-idempotent HTTP methods in RESTful API design? Provide examples.',
        context: 'Web service fundamentals.',
        expectedKeywords: ['GET', 'PUT', 'DELETE', 'POST', 'Side-effects', 'Safety'],
      },
      {
        id: 103,
        role: 'Software Engineer',
        level: 'Junior',
        category: 'Databases',
        questionText: 'What is the difference between WHERE and HAVING clauses in SQL? When would you use HAVING?',
        context: 'Query design and relational database basics.',
        expectedKeywords: ['Aggregation', 'GROUP BY', 'Row-level filter', 'Aggregate functions like COUNT/AVG'],
      },
    ],
    Mid: [
      {
        id: 201,
        role: 'Software Engineer',
        level: 'Mid',
        category: 'Concurrency & Multithreading',
        questionText: 'How does the Java Memory Model handle visibility and ordering guarantees with the volatile keyword? How does volatile compare to AtomicInteger or synchronized blocks?',
        context: 'Concurrency and thread safety in multi-core systems.',
        expectedKeywords: ['Happens-before guarantee', 'CPU cache coherence', 'CAS (Compare-And-Swap)', 'Instruction reordering', 'Mutual exclusion'],
      },
      {
        id: 202,
        role: 'Software Engineer',
        level: 'Mid',
        category: 'Spring Boot Framework',
        questionText: 'How does Spring manage transaction rollbacks with @Transactional? Why does a checked Exception not trigger a rollback by default, and how can you customize that behavior?',
        context: 'Enterprise persistence and transaction isolation.',
        expectedKeywords: ['AOP Proxy', 'Unchecked vs Checked Exception', 'rollbackFor', 'PlatformTransactionManager'],
      },
      {
        id: 203,
        role: 'Software Engineer',
        level: 'Mid',
        category: 'System Design',
        questionText: 'How would you design a rate limiter in a Spring Boot microservice environment handling 20,000 requests per second across 10 cluster instances?',
        context: 'Distributed architecture and traffic management.',
        expectedKeywords: ['Token Bucket', 'Leaky Bucket', 'Redis with Lua script', 'Sliding Window Log', 'HTTP 429'],
      },
    ],
    Senior: [
      {
        id: 301,
        role: 'Software Engineer',
        level: 'Senior',
        category: 'Distributed Systems & Architecture',
        questionText: 'Explain how you would achieve distributed transaction consistency across microservices in an e-commerce order payment flow. Compare the 2-Phase Commit (2PC) protocol against the Saga Pattern.',
        context: 'Microservices data consistency without distributed deadlocks.',
        expectedKeywords: ['Saga Pattern', 'Choreography vs Orchestration', 'Compensating transactions', 'Eventual consistency', 'Idempotency key', 'Outbox pattern'],
      },
      {
        id: 302,
        role: 'Software Engineer',
        level: 'Senior',
        category: 'Performance & Observability',
        questionText: 'You notice high latency spikes in production under sustained load. Thread dumps show dozens of worker threads in BLOCKED state. Walk through your step-by-step diagnostic and remediation process.',
        context: 'Production troubleshooting and JVM telemetry.',
        expectedKeywords: ['JStack / Thread Dumps', 'Lock contention', 'Database connection pool starvation', 'GC pause profiling', 'APM tools', 'Flame graphs'],
      },
      {
        id: 303,
        role: 'Software Engineer',
        level: 'Senior',
        category: 'Event-Driven Architecture',
        questionText: 'In Apache Kafka, how do partition rebalances affect consumers, and how do you achieve strictly ordered processing with at-least-once delivery guarantees?',
        context: 'Message streaming and consumer lag mitigation.',
        expectedKeywords: ['Consumer Group', 'Partition Key', 'Cooperative Sticky Assignor', 'Manual commit', 'Idempotent consumer'],
      },
    ],
  },
  'Data Scientist': {
    Junior: [
      {
        id: 401,
        role: 'Data Scientist',
        level: 'Junior',
        category: 'ML Fundamentals',
        questionText: 'What is the bias-variance tradeoff in machine learning, and how do overfitting and underfitting relate to this tradeoff?',
        context: 'Model evaluation basics.',
        expectedKeywords: ['Model complexity', 'Underfitting', 'Overfitting', 'Cross-validation', 'Regularization'],
      },
      {
        id: 402,
        role: 'Data Scientist',
        level: 'Junior',
        category: 'Feature Engineering',
        questionText: 'How would you handle high cardinality categorical variables in a dataset with 50,000 samples for a tree-based classifier?',
        context: 'Data preprocessing.',
        expectedKeywords: ['Target encoding', 'Frequency encoding', 'One-hot encoding limitations', 'Embedding'],
      },
      {
        id: 403,
        role: 'Data Scientist',
        level: 'Junior',
        category: 'Metrics',
        questionText: 'Explain Precision, Recall, and F1-Score. Why is Accuracy a misleading metric in fraud detection models?',
        context: 'Imbalanced classification problems.',
        expectedKeywords: ['Class imbalance', 'False Positives vs False Negatives', 'PR-AUC', 'Confusion Matrix'],
      },
    ],
    Mid: [
      {
        id: 501,
        role: 'Data Scientist',
        level: 'Mid',
        category: 'Model Optimization',
        questionText: 'How does Gradient Boosting (like XGBoost or LightGBM) differ from Random Forests in how trees are built and errors are corrected?',
        context: 'Ensemble methods in tabular modeling.',
        expectedKeywords: ['Sequential vs Parallel', 'Residuals / Pseudo-residuals', 'Learning rate', 'Bagging vs Boosting'],
      },
      {
        id: 502,
        role: 'Data Scientist',
        level: 'Mid',
        category: 'Experimentation',
        questionText: 'How do you determine the sample size and test duration needed for an online A/B test with statistical significance?',
        context: 'Controlled experiments and hypothesis testing.',
        expectedKeywords: ['Statistical power (1-beta)', 'Significance level (alpha)', 'Minimum Detectable Effect (MDE)', 'Variance reduction'],
      },
      {
        id: 503,
        role: 'Data Scientist',
        level: 'Mid',
        category: 'Deep Learning',
        questionText: 'Explain the Self-Attention mechanism in Transformer models. What computational bottleneck does the standard O(N^2) attention matrix present for long context?',
        context: 'NLP and deep sequence architectures.',
        expectedKeywords: ['Query, Key, Value matrices', 'Softmax scaling', 'Sequence length quadratic complexity', 'FlashAttention / Sparse attention'],
      },
    ],
    Senior: [
      {
        id: 601,
        role: 'Data Scientist',
        level: 'Senior',
        category: 'Production ML (MLOps)',
        questionText: 'How would you architect a real-time recommendation scoring pipeline serving 10M active users with sub-50ms latency, handling feature drift and cold-start problems?',
        context: 'End-to-end production ML system design.',
        expectedKeywords: ['Feature Store (e.g. Feast)', 'Two-stage retrieval (Candidate generation + Ranking)', 'Embedding caching', 'Concept/Data drift monitoring', 'Fallbacks'],
      },
      {
        id: 602,
        role: 'Data Scientist',
        level: 'Senior',
        category: 'LLM Systems & Evaluation',
        questionText: 'How do you design an automated, statistically grounded evaluation framework for a Retrieval-Augmented Generation (RAG) system in an enterprise environment?',
        context: 'LLM evaluation and ground-truth validation.',
        expectedKeywords: ['Faithfulness', 'Answer Relevance', 'Context Precision / Recall', 'Ragas / LLM-as-a-judge', 'Golden benchmark datasets'],
      },
      {
        id: 603,
        role: 'Data Scientist',
        level: 'Senior',
        category: 'Causal Inference',
        questionText: 'When network interference or spillovers violate the SUTVA assumption in a two-sided marketplace (e.g., Uber or Airbnb), how do you design experiment variants to avoid biased treatment effects?',
        context: 'Advanced causal analysis and marketplace experimentation.',
        expectedKeywords: ['Cluster randomized trials', 'Switchback experiments (time-slice randomization)', 'SUTVA violation', 'Synthetic controls'],
      },
    ],
  },
  'DevOps': {
    Junior: [
      {
        id: 701,
        role: 'DevOps',
        level: 'Junior',
        category: 'Containers & Docker',
        questionText: 'What is the difference between a Docker image and a Docker container? How does multi-stage builds help optimize production image size and security?',
        context: 'Container fundamentals.',
        expectedKeywords: ['Immutable layers', 'Running instance', 'Build cache', 'Stripping build tools from runtime image'],
      },
      {
        id: 702,
        role: 'DevOps',
        level: 'Junior',
        category: 'CI/CD Pipelines',
        questionText: 'Describe the key stages of a robust CI/CD pipeline from git push to production release.',
        context: 'Continuous integration and continuous deployment.',
        expectedKeywords: ['Linting/Unit testing', 'Security vulnerability scan', 'Artifact publishing', 'Staging deployment', 'Canary/Blue-Green'],
      },
      {
        id: 703,
        role: 'DevOps',
        level: 'Junior',
        category: 'Linux Networking',
        questionText: 'How do you troubleshoot a connection timeout issue between two servers in a Linux environment using CLI utilities?',
        context: 'Infrastructure troubleshooting.',
        expectedKeywords: ['ping / ICMP', 'traceroute / mtr', 'nc / telnet for port checks', 'netstat / ss', 'iptables / ufw firewall rules'],
      },
    ],
    Mid: [
      {
        id: 801,
        role: 'DevOps',
        level: 'Mid',
        category: 'Kubernetes Architecture',
        questionText: 'Explain the internal lifecycle of a Kubernetes Pod deployment: what happens from the moment a kubectl apply command is run until containers are running on worker nodes?',
        context: 'Kubernetes control plane and worker node interaction.',
        expectedKeywords: ['API Server', 'etcd state write', 'Deployment Controller', 'Kube-Scheduler', 'Kubelet', 'Container Runtime (CRI)'],
      },
      {
        id: 802,
        role: 'DevOps',
        level: 'Mid',
        category: 'Infrastructure as Code',
        questionText: 'In Terraform, how do you handle state file drift, sensitive variables, and state locking when multiple engineers run plans simultaneously?',
        context: 'IaC best practices in team settings.',
        expectedKeywords: ['Remote backend (S3 / GCS)', 'State locking (DynamoDB)', 'terraform refresh / plan', 'HashiCorp Vault / Secret Manager'],
      },
      {
        id: 803,
        role: 'DevOps',
        level: 'Mid',
        category: 'Observability & Monitoring',
        questionText: 'Explain the concept of the 4 Golden Signals in SRE (Site Reliability Engineering). How do you configure Prometheus alert thresholds to avoid alert fatigue?',
        context: 'Monitoring and site reliability engineering.',
        expectedKeywords: ['Latency, Traffic, Errors, Saturation', 'SLI / SLO / SLA', 'Multi-window multi-burn-rate alerts', 'Burn rate alerting'],
      },
    ],
    Senior: [
      {
        id: 901,
        role: 'DevOps',
        level: 'Senior',
        category: 'Zero-Downtime Releases',
        questionText: 'How would you architect a global multi-region Active-Active Kubernetes cluster setup with automated failover, geo-DNS routing, and data replication for zero-downtime compliance?',
        context: 'High availability and disaster recovery architecture.',
        expectedKeywords: ['Anycast Geo-DNS / Cloudflare', 'Cross-region service mesh (Istio/Cilium)', 'Multi-master database replication', 'Split-brain prevention', 'Chaos engineering'],
      },
      {
        id: 902,
        role: 'DevOps',
        level: 'Senior',
        category: 'Cloud Security & DevSecOps',
        questionText: 'How do you enforce Zero-Trust networking and software supply chain security (SLSA, Cosign, SBOM) across a containerized microservice infrastructure?',
        context: 'Enterprise security hardening.',
        expectedKeywords: ['Mutual TLS (mTLS)', 'eBPF / Cilium Network Policies', 'Image signature verification (Cosign)', 'Syft/Grype SBOM scanning', 'Least privilege IAM'],
      },
      {
        id: 903,
        role: 'DevOps',
        level: 'Senior',
        category: 'FinOps & Cloud Scaling',
        questionText: 'Your company cloud bill increased by 40% last quarter. How would you institute an automated FinOps optimization strategy using Kubernetes Karpenter/KEDA and spot instance orchestration?',
        context: 'Cost optimization and elastic workload sizing.',
        expectedKeywords: ['Horizontal Pod Autoscaler (HPA)', 'Vertical Pod Autoscaler (VPA)', 'Karpenter node consolidation', 'Spot interruption handler', 'FinOps tagging'],
      },
    ],
  },
};

// Storage keys
const SESSION_STORAGE_KEY = 'ai_interview_active_session';
const RESULTS_STORAGE_KEY_PREFIX = 'ai_interview_results_';
const HISTORY_STORAGE_KEY = 'ai_interview_past_sessions';

export const interviewService = {
  getPastInterviews(): PastInterviewSummary[] {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing past interviews', e);
      }
    }
    return INITIAL_PAST_INTERVIEWS;
  },

  async fetchLiveAiQuestion(role: Role, level: Level): Promise<Question | null> {
    try {
      const res = await fetch('/api/interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, level }),
      });
      if (res.ok) {
        const data = await res.json();
        return {
          id: Math.floor(Math.random() * 9000) + 1000,
          role,
          level,
          category: data.category || 'System Design & Architecture',
          questionText: data.questionText,
          context: data.context,
          expectedKeywords: data.expectedKeyPoints || [],
        };
      }
    } catch (err) {
      console.warn('Live AI question generation endpoint unavailable, using offline question bank', err);
    }
    return null;
  },

  startSession(role: Role, level: Level): InterviewSession {
    const questions = [...(QUESTION_BANK[role]?.[level] || QUESTION_BANK['Software Engineer']['Senior'])];
    const sessionId = `sess-${Date.now().toString(36)}`;

    const newSession: InterviewSession = {
      sessionId,
      role,
      level,
      createdAt: new Date().toISOString(),
      questions,
      currentQuestionIndex: 0,
      evaluations: {},
      isCompleted: false,
    };

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newSession));

    // Asynchronously attempt to enrich the session with a fresh AI-generated question from Gemini
    this.fetchLiveAiQuestion(role, level).then((aiQ) => {
      if (aiQ) {
        const current = this.getCurrentSession();
        if (current && current.sessionId === sessionId && current.currentQuestionIndex === 0 && Object.keys(current.evaluations).length === 0) {
          current.questions[0] = aiQ;
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(current));
        }
      }
    });

    return newSession;
  },

  getCurrentSession(): InterviewSession | null {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  async evaluateAnswer(
    sessionId: string,
    questionId: number,
    answer: string
  ): Promise<QuestionEvaluation> {
    const session = this.getCurrentSession();
    const question = session?.questions.find((q) => q.id === questionId);
    const questionText = question?.questionText || 'Technical Question';
    const expectedKeywords = question?.expectedKeywords || [];

    // Attempt live evaluation via the Spring Boot / Gemini backend endpoint
    try {
      const response = await fetch('/api/interview/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: String(questionId),
          questionText,
          expectedKeyPoints: expectedKeywords,
          userAnswer: answer,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const score = typeof data.score === 'number' ? Number(data.score.toFixed(1)) : 7.5;
        const evaluation: QuestionEvaluation = {
          questionId,
          questionText,
          userAnswer: answer,
          score,
          recommendation: data.recommendation || (score >= 7.0 ? 'HIRE' : 'LEANING_HIRE'),
          strengths: data.strengths?.length > 0 ? data.strengths : ['Clear articulation of core engineering concepts.'],
          growthAreas: data.improvementAreas?.length > 0 ? data.improvementAreas : ['Consider delving deeper into latency, failure modes, and production observability.'],
          expectedKeyPoints: expectedKeywords,
          feedbackSummary: data.feedbackSummary || `Evaluated score: ${score}/10.`,
        };

        if (session) {
          session.evaluations[questionId] = evaluation;
          if (Object.keys(session.evaluations).length >= session.questions.length) {
            session.isCompleted = true;
          }
          localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        }

        return evaluation;
      }
    } catch (netErr) {
      console.warn('Backend evaluation call failed or offline, falling back to local evaluation heuristic:', netErr);
    }

    // Fallback heuristic evaluation
    await new Promise((resolve) => setTimeout(resolve, 800));

    const answerLower = answer.toLowerCase();
    const keywordsFound = expectedKeywords.filter((kw) =>
      answerLower.includes(kw.toLowerCase().split(' ')[0])
    );

    const lengthScore = Math.min(3.5, (answer.trim().length / 250) * 3.5);
    const keywordScore = Math.min(4.5, (keywordsFound.length / Math.max(1, expectedKeywords.length)) * 4.5);
    const baseScore = 2.0;
    const rawScore = Math.min(9.8, Math.max(3.5, Number((baseScore + lengthScore + keywordScore).toFixed(1))));

    const recommendation =
      rawScore >= 8.5
        ? 'STRONG_HIRE'
        : rawScore >= 7.0
        ? 'HIRE'
        : rawScore >= 5.5
        ? 'LEANING_HIRE'
        : 'LEANING_NO_HIRE';

    const evaluation: QuestionEvaluation = {
      questionId,
      questionText,
      userAnswer: answer,
      score: rawScore,
      recommendation,
      strengths: [
        `Clear articulation of the foundational principles related to ${question?.category || 'the problem space'}.`,
        answer.length > 200
          ? 'Demonstrated structured reasoning with practical context.'
          : 'Concise summary of key technical takeaways.',
        keywordsFound.length > 0
          ? `Accurately identified core technical elements: ${keywordsFound.join(', ')}.`
          : 'Good high-level familiarity with the architectural concept.',
      ],
      growthAreas: [
        'Could elaborate further on edge cases, concurrent failure modes, and performance trade-offs.',
        'Consider linking the solution back to production observability, telemetry, and debugging metrics.',
      ],
      expectedKeyPoints: expectedKeywords,
      feedbackSummary: `Candidate achieved a score of ${rawScore}/10 for this response. The solution demonstrates ${
        rawScore >= 7.5 ? 'solid depth and strong engineering acumen' : 'fundamental familiarity with room for deeper trade-off discussions'
      }.`,
    };

    // Save to active session
    if (session) {
      session.evaluations[questionId] = evaluation;
      if (Object.keys(session.evaluations).length >= session.questions.length) {
        session.isCompleted = true;
      }
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }

    return evaluation;
  },

  finishSession(sessionId: string): SessionResults {
    const session = this.getCurrentSession();
    const evaluations = session ? Object.values(session.evaluations) : [];
    const totalScore = evaluations.reduce((acc, ev) => acc + ev.score, 0);
    const overallScore = evaluations.length > 0 ? Number((totalScore / evaluations.length).toFixed(1)) : 8.0;

    const results: SessionResults = {
      sessionId,
      role: session?.role || 'Software Engineer',
      level: session?.level || 'Senior',
      completedAt: new Date().toISOString(),
      overallScore,
      evaluations,
    };

    // Store in historical records
    localStorage.setItem(`${RESULTS_STORAGE_KEY_PREFIX}${sessionId}`, JSON.stringify(results));

    // Update history list
    const past = this.getPastInterviews();
    const newSummary: PastInterviewSummary = {
      id: sessionId,
      date: new Date().toISOString().split('T')[0],
      role: results.role,
      level: results.level,
      score: overallScore,
      questionsCount: evaluations.length,
      status: 'Completed',
    };

    const updatedHistory = [newSummary, ...past.filter((p) => p.id !== sessionId)];
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));

    return results;
  },

  getSessionResults(sessionId: string): SessionResults | null {
    const stored = localStorage.getItem(`${RESULTS_STORAGE_KEY_PREFIX}${sessionId}`);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
    // If not in specific results key, try current session
    const current = this.getCurrentSession();
    if (current && current.sessionId === sessionId) {
      return this.finishSession(sessionId);
    }
    return null;
  },
};
