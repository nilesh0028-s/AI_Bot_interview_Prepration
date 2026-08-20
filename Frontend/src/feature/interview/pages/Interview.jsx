import { useState } from "react";
import "../style/interview.scss";

const REPORT = {
  title: "Senior Backend Engineer – Node.js",
  matchScore: 88,
  technicalQuestions: [
    {
      question: "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
      intention: "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
      answer: "The candidate should explain the different phases of the event loop (timers, pending callbacks, idle/prepare, poll, check, close). They should mention how Libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread.",
    },
    {
      question: "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
      intention: "To evaluate practical experience with MongoDB performance tuning.",
      answer: "Discuss using $match and $project early in the pipeline to reduce documents, leveraging indexes, avoiding $lookup on large collections, and using allowDiskUse for memory-intensive operations.",
    },
    {
      question: "Can you describe the Cache-Aside pattern and when you would use Redis in a Node.js application?",
      intention: "To test knowledge of caching strategies and distributed systems.",
      answer: "Explain the read-through pattern where the app checks cache first, falls back to DB on miss, then populates cache. Mention TTL, cache invalidation strategies, and Redis data structures like hashes and sorted sets.",
    },
    {
      question: "What are the challenges of migrating a monolithic application to a modular service-based architecture?",
      intention: "To gauge system design experience and understanding of microservices trade-offs.",
      answer: "Cover data consistency across services, distributed tracing, inter-service communication (REST vs gRPC vs message queues), deployment complexity, and the strangler fig pattern for incremental migration.",
    },
  ],
  behavioralQuestions: [
    {
      question: "Tell me about a time you had to debug a critical production issue under pressure.",
      intention: "To assess problem-solving under stress and incident management skills.",
      answer: "Use the STAR method. Describe the situation, your systematic debugging approach (logs, metrics, tracing), how you communicated with stakeholders, the resolution, and what post-mortem actions you took.",
    },
    {
      question: "Describe a situation where you disagreed with a technical decision made by your team.",
      intention: "To evaluate communication, collaboration, and professional maturity.",
      answer: "Show that you raised concerns constructively with data, listened to others' perspectives, and ultimately supported the team decision while documenting your concerns for future reference.",
    },
    {
      question: "How do you handle technical debt in a fast-moving product team?",
      intention: "To understand how the candidate balances delivery speed with code quality.",
      answer: "Discuss tracking debt in a backlog, negotiating dedicated refactor sprints, writing tests before refactoring, and communicating the business impact of unaddressed debt to non-technical stakeholders.",
    },
  ],
  skillGaps: [
    { skill: "Message Queues (Kafka/RabbitMQ)", severity: "high" },
    { skill: "Advanced Docker & CI/CD Pipelines", severity: "medium" },
    { skill: "Distributed Systems Design", severity: "medium" },
    { skill: "Production-level Redis management", severity: "low" },
  ],
  preparationPlan: [
    {
      day: 1,
      focus: "Node.js Internals & Streams",
      tasks: [
        "Deep dive into the Event Loop phases and process.nextTick vs setImmediate.",
        "Practice implementing Node.js Streams for handling large data sets.",
      ],
    },
    {
      day: 2,
      focus: "Advanced MongoDB & Indexing",
      tasks: [
        "Study Compound Indexes, TTL Indexes, and Text Indexes.",
        "Practice writing complex Aggregation pipelines and using the .explain('executionStats') method.",
      ],
    },
    {
      day: 3,
      focus: "Caching & Redis Strategies",
      tasks: [
        "Read about Redis data types beyond strings (Sets, Hashes, Sorted Sets).",
        "Implement a Redis-based rate limiter or a caching layer for a sample API.",
      ],
    },
    {
      day: 4,
      focus: "System Design & Microservices",
      tasks: [
        "Study Microservices communication patterns (Synchronous vs Asynchronous).",
        "Learn about the API Gateway pattern and Circuit Breakers.",
      ],
    },
    {
      day: 5,
      focus: "Message Queues & DevOps Basics",
      tasks: [
        "Watch introductory tutorials on RabbitMQ or Kafka.",
        "Set up a simple producer-consumer with a message queue locally.",
      ],
    },
    {
      day: 6,
      focus: "System Design Mock",
      tasks: [
        "Design a URL shortener system end-to-end.",
        "Design a notification service using queues and workers.",
      ],
    },
    {
      day: 7,
      focus: "Mock Interviews & Review",
      tasks: [
        "Do a full mock technical interview covering all topics.",
        "Review all behavioral answers using the STAR framework.",
      ],
    },
  ],
};

const SECTIONS = [
  { id: "technical", label: "Technical Questions", icon: "code" },
  { id: "behavioral", label: "Behavioral Questions", icon: "chat" },
  { id: "roadmap", label: "Road Map", icon: "near_me" },
];

const severityColor = {
  high: "ir-gap--high",
  medium: "ir-gap--medium",
  low: "ir-gap--low",
};

function ScoreRing({ score }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="ir-score-ring">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#1e1e32" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke="#4ade80" strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
        />
      </svg>
      <div className="ir-score-text">
        <span className="ir-score-num">{score}</span>
        <span className="ir-score-pct">%</span>
      </div>
    </div>
  );
}

function TechnicalSection({ questions }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="ir-section">
      <div className="ir-section-title">
        Technical Questions
        <span className="ir-count-badge">{questions.length} questions</span>
      </div>
      <div className="ir-questions">
        {questions.map((q, i) => (
          <div key={i} className={`ir-question-card ${open === i ? "ir-question-card--open" : ""}`}>
            <button className="ir-question-header" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="ir-q-num">Q{i + 1}</span>
              <span className="ir-q-text">{q.question}</span>
              <span className="material-symbols-outlined ir-chevron">
                {open === i ? "expand_less" : "expand_more"}
              </span>
            </button>
            {open === i && (
              <div className="ir-question-body">
                <div className="ir-tag ir-tag--intention">INTENTION</div>
                <p className="ir-body-text">{q.intention}</p>
                <div className="ir-tag ir-tag--answer">MODEL ANSWER</div>
                <p className="ir-body-text">{q.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BehavioralSection({ questions }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="ir-section">
      <div className="ir-section-title">
        Behavioral Questions
        <span className="ir-count-badge">{questions.length} questions</span>
      </div>
      <div className="ir-questions">
        {questions.map((q, i) => (
          <div key={i} className={`ir-question-card ${open === i ? "ir-question-card--open" : ""}`}>
            <button className="ir-question-header" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="ir-q-num ir-q-num--behavioral">B{i + 1}</span>
              <span className="ir-q-text">{q.question}</span>
              <span className="material-symbols-outlined ir-chevron">
                {open === i ? "expand_less" : "expand_more"}
              </span>
            </button>
            {open === i && (
              <div className="ir-question-body">
                <div className="ir-tag ir-tag--intention">INTENTION</div>
                <p className="ir-body-text">{q.intention}</p>
                <div className="ir-tag ir-tag--answer">MODEL ANSWER</div>
                <p className="ir-body-text">{q.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapSection({ plan }) {
  return (
    <div className="ir-section">
      <div className="ir-section-title">
        Preparation Road Map
        <span className="ir-count-badge">{plan.length}-day plan</span>
      </div>
      <div className="ir-timeline">
        {plan.map((item, i) => (
          <div key={i} className="ir-timeline-item">
            <div className="ir-timeline-dot" />
            {i < plan.length - 1 && <div className="ir-timeline-line" />}
            <div className="ir-timeline-content">
              <div className="ir-day-header">
                <span className="ir-day-badge">Day {item.day}</span>
                <span className="ir-day-focus">{item.focus}</span>
              </div>
              <ul className="ir-task-list">
                {item.tasks.map((task, j) => (
                  <li key={j}>{task}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Interview() {
  const [active, setActive] = useState("technical");

  return (
    <div className="ir-root">
      {/* Sidebar */}
      <aside className="ir-sidebar">
        <div className="ir-sidebar-label">SECTIONS</div>
        <nav className="ir-nav">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              className={`ir-nav-item ${active === s.id ? "ir-nav-item--active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              <span className="material-symbols-outlined">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="ir-main">
        {active === "technical" && <TechnicalSection questions={REPORT.technicalQuestions} />}
        {active === "behavioral" && <BehavioralSection questions={REPORT.behavioralQuestions} />}
        {active === "roadmap" && <RoadmapSection plan={REPORT.preparationPlan} />}
      </main>

      {/* Right Panel */}
      <aside className="ir-right">
        <div className="ir-right-label">MATCH SCORE</div>
        <ScoreRing score={REPORT.matchScore} />
        <p className="ir-score-caption">Strong match for this role</p>

        <div className="ir-right-label ir-right-label--gap">SKILL GAPS</div>
        <div className="ir-gaps">
          {REPORT.skillGaps.map((g, i) => (
            <div key={i} className={`ir-gap-tag ${severityColor[g.severity]}`}>
              {g.skill}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
