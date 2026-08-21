import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportById } from "../../redux/interview/interviewThunks";
import "../style/interview.scss";

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
  const { interviewId } = useParams();
  const dispatch = useDispatch();
  const { report, loading, error } = useSelector((state) => state.interview);

  useEffect(() => {
    dispatch(fetchReportById(interviewId));
  }, [interviewId]);

  if (loading) return <div className="ir-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Loading report...</p></div>;
  if (error) return <div className="ir-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>Error: {error}</p></div>;
  if (!report) return null;

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
        {active === "technical" && <TechnicalSection questions={report.technicalQuestion} />}
        {active === "behavioral" && <BehavioralSection questions={report.behavioralQuestion} />}
        {active === "roadmap" && <RoadmapSection plan={report.preparationPlan} />}
      </main>

      {/* Right Panel */}
      <aside className="ir-right">
        <div className="ir-right-label">MATCH SCORE</div>
        <ScoreRing score={report.matchScore} />
        <p className="ir-score-caption">Strong match for this role</p>

        <div className="ir-right-label ir-right-label--gap">SKILL GAPS</div>
        <div className="ir-gaps">
          {report.skillGap.map((g, i) => (
            <div key={i} className={`ir-gap-tag ${severityColor[g.severity]}`}>
              {g.skill}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
