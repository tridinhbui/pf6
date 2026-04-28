import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  BarChart3,
  PieChart,
  Globe,
  Phone,
  Mail,
  ExternalLink,
  MapPin,
  MessageSquare,
  X,
} from 'lucide-react';

import anh1 from './assets/anh1.jpeg';
import anh2 from './assets/anh2.jpeg';
import anh3 from './assets/anh3.jpeg';
import anh4 from './assets/anh4.jpeg';
import './index.css';

const LINKEDIN = 'https://www.linkedin.com/in/chilannguyen02';
const EMAIL = 'chilannguyen02@gmail.com';
const PHONE_DISPLAY = '+84 705 166 875';
const PHONE_HREF = 'tel:+84705166875';

const questions = [
  {
    q: 'What do you focus on at work?',
    a: 'Banking strategy, financial modeling, and market sizing—from sustainable lending opportunities and wealth banking forecasts to IB pitch decks and cross-border market entry.',
  },
  {
    q: 'McKinsey experience in one line?',
    a: '$14B sustainable lending sizing, peer benchmarking, customer interviews, bank-wide strategy, and risk-framework diagnostics adopted by the CRO.',
  },
  {
    q: 'What stands out in your projects?',
    a: 'A full acquisition proposal using EBITDA multiples ($33.3Mn narrative) and a Tesla DCF plus comparables with sensitivities and a football field.',
  },
  {
    q: 'Tools you use daily?',
    a: 'Excel for models, SQL and Python when datasets scale, Power BI for dashboards, plus Bloomberg Terminal when markets matter.',
  },
];

type ChatMessage = { text: string; sender: 'bot' | 'user' };

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: 'Quick prompts below — pick one to see how Chi Lan frames her work (no login, no tracking).',
      sender: 'bot',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleApplyQuestion = (qObj: (typeof questions)[number]) => {
    setMessages((prev) => [...prev, { text: qObj.q, sender: 'user' }]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: qObj.a, sender: 'bot' }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      <motion.div
        className="chat-bubble"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X size={22} strokeWidth={2} /> : <MessageSquare size={22} strokeWidth={2} />}
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-container"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
          >
            <div className="chat-window">
              <div className="chat-header">
                <h4>Ask Chi Lan</h4>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    background: 'var(--text)',
                    borderRadius: '50%',
                    opacity: 0.85,
                  }}
                />
              </div>
              <div className="chat-body">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    className={`msg msg-${m.sender}`}
                    initial={{ opacity: 0, x: m.sender === 'bot' ? -8 : 8 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {m.text}
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="msg msg-bot" style={{ opacity: 0.65 }}>
                    …
                  </div>
                )}
              </div>
              <div className="chat-footer">
                {questions.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    className="suggestion-chip"
                    onClick={() => handleApplyQuestion(q)}
                  >
                    {q.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 14);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div className="loading-screen" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <motion.div
        className="loader-logo"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        C. L. NGUYEN
      </motion.div>
      <div className="loader-bar-bg">
        <motion.div
          className="loader-bar-fill"
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>
      <div className="loader-number">{progress}%</div>
    </motion.div>
  );
};

type ExpProps = {
  company: string;
  role: string;
  location: string;
  date: string;
  descs: string[];
};

const ExperienceCard = ({ company, role, location, date, descs }: ExpProps) => (
  <motion.div
    initial={{ opacity: 0, x: -16 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="exp-card"
  >
    <div className="exp-date">
      {date}
      <span className="exp-loc">{location}</span>
    </div>
    <div className="exp-info">
      <h3>{company}</h3>
      <div className="exp-role">{role}</div>
      <div className="exp-desc">
        <ul>
          {descs.map((desc, i) => (
            <li key={i}>{desc}</li>
          ))}
        </ul>
      </div>
    </div>
  </motion.div>
);

type ProjectProps = {
  title: string;
  badge: string;
  bullets: { label: string; text: string }[];
};

const ProjectCard = ({ title, badge, bullets }: ProjectProps) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="crystal-panel card-3d"
  >
    <span className="badge">{badge}</span>
    <h3 className="project-card-title">{title}</h3>
    <ul className="project-bullets">
      {bullets.map((b, i) => (
        <li key={i}>
          <strong>{b.label}</strong> {b.text}
        </li>
      ))}
    </ul>
    <motion.a href="#contact" className="project-link" whileHover={{ x: 6 }}>
      Start a conversation <ArrowRight size={14} strokeWidth={2.5} />
    </motion.a>
  </motion.div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 32 });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(timer);
  }, []);

  const iconColor = 'var(--text)';

  return (
    <div className="app-main">
      <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>

      <div className="mesh-gradient" />

      <motion.div className="scroll-progress" style={{ scaleX, transformOrigin: '0%' }} />

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
          <nav>
            <span className="nav-brand">C. L. NGUYEN</span>
            <ul className="nav-links">
              <li>
                <a href="#about">Method</a>
              </li>
              <li>
                <a href="#education">Study</a>
              </li>
              <li>
                <a href="#experience">Roles</a>
              </li>
              <li>
                <a href="#credentials">Cred.</a>
              </li>
              <li>
                <a href="#projects">Cases</a>
              </li>
              <li>
                <a href="#skills">Stack</a>
              </li>
            </ul>
            <div className="nav-actions">
              <a className="nav-icon-btn" href={`mailto:${EMAIL}`} aria-label="Email">
                <Mail size={18} strokeWidth={1.75} />
              </a>
              <a
                className="nav-icon-btn"
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <ExternalLink size={18} strokeWidth={1.75} />
              </a>
            </div>
          </nav>

          <main>
            <section className="hero">
              <motion.div
                className="hero-content"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.05 }}
              >
                <span className="hero-eyebrow">Portfolio · National Economics University · Banking &amp; Strategy</span>
                <h1 className="hero-title">
                  Chi Lan
                  <br />
                  <span className="gradient-text">Nguyen</span>
                </h1>
                <p className="hero-lede">
                  I bridge{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 600 }}>consulting-grade modeling</strong>,{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 600 }}>banking strategy</strong>, and{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 600 }}>risk-aware diligence</strong>
                  —from sizing sustainable lending opportunities and wealth-banking forecasts to IB pitches and
                  cross-border market entry for healthcare platforms.
                </p>
                <div className="hero-meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <MapPin size={15} strokeWidth={1.75} style={{ opacity: 0.55 }} />
                    Ho Chi Minh City · Hanoi · Vietnam
                  </span>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                    Profile
                  </a>
                </div>
                <div className="hero-cta-row">
                  <motion.a href={`mailto:${EMAIL}`} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <span className="btn-primary" style={{ display: 'inline-block' }}>
                      Email
                    </span>
                  </motion.a>
                  <motion.a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="btn-ghost" style={{ display: 'inline-block' }}>
                      LinkedIn
                    </span>
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                className="hero-visual"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.15 }}
              >
                <div className="hero-frame">
                  <div className="photo-badge">Graduated with Distinction</div>
                  <img src={anh1} alt="Chi Lan Nguyen — portrait" className="main-img" />
                </div>
              </motion.div>
            </section>

            <section id="about" style={{ borderTop: '1px solid var(--line)' }}>
              <div className="section-head">
                <span className="section-label">Method</span>
                <h2 className="section-title">Evidence first, narrative second</h2>
              </div>
              <div className="about-split">
                <div className="about-copy">
                  <p>
                    My work sits at the intersection of actuarial rigor and front-office judgment: McKinsey engagements
                    spanning sustainable finance and bank-wide strategy, EY on early-warning systems and Basel-linked
                    analytics, VC due diligence in Hong Kong, and IB-style models for medical tourism and hospital
                    market entry.
                  </p>
                  <p>
                    Whether the question is a $14B lending opportunity, a five-year commercial-bank roadmap, or a
                    cross-border go-to-market plan, I anchor the story in models and peer benchmarks others can audit.
                  </p>
                </div>
                <figure className="about-figure">
                  <img src={anh2} alt="Chi Lan Nguyen — context" className="editorial-img" />
                  <figcaption className="figure-caption">Vietnam · consulting &amp; finance</figcaption>
                </figure>
              </div>
              <div className="stat-grid about-stats-row">
                {[
                  { icon: TrendingUp, label: 'North star', val: 'Client-ready insights' },
                  { icon: BarChart3, label: 'Builds', val: 'DCF · Comps · Forecasts' },
                  { icon: PieChart, label: 'Sectors', val: 'Banking · IB · VC' },
                  { icon: Globe, label: 'Geography', val: 'VN · HK · regional' },
                ].map((item, i) => (
                  <div key={i} className="crystal-panel stat-cell">
                    <item.icon size={22} color={iconColor} strokeWidth={1.75} style={{ marginBottom: 14 }} />
                    <div className="stat-label">{item.label}</div>
                    <div className="stat-value">{item.val}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="education">
              <div className="section-head">
                <span className="section-label">Study</span>
                <h2 className="section-title">Academic core</h2>
              </div>
              <div className="crystal-panel edu-card">
                <h3>National Economics University</h3>
                <p className="edu-sub">
                  Hanoi, Vietnam — Bachelor of Actuarial Science and Risk Management — Graduated with Distinction —
                  Sep 2020 – Aug 2024
                </p>
                <ul className="edu-list">
                  <li>
                    <strong style={{ color: 'var(--text)' }}>Candidate &amp; coursework: </strong>
                    CFA Level I Candidate · Financial Asset Valuation, Mathematical Finance, Corporate Finance, Portfolio
                    Management
                  </li>
                  <li>
                    <strong style={{ color: 'var(--text)' }}>Recognition: </strong>
                    SOA VEE credits (Mathematical Finance &amp; Economics) · Academic Excellence Scholarship (5
                    semesters)
                  </li>
                </ul>
              </div>
            </section>

            <section className="strip-section" aria-label="Editorial photograph">
              <div className="strip-inner">
                <img src={anh3} alt="Editorial — between study and practice" className="strip-img" />
                <div className="strip-caption">
                  <span>Models are only useful when someone else can audit the logic.</span>
                  <span>Field note</span>
                </div>
              </div>
            </section>

            <section id="experience">
              <div className="section-head">
                <span className="section-label">Roles</span>
                <h2 className="section-title">Where I shipped work</h2>
              </div>
              <div>
                <ExperienceCard
                  company="Delta West Group"
                  role="Investment Banking Analyst"
                  location="Ho Chi Minh City, Vietnam"
                  date="Mar 2026 – Present"
                  descs={[
                    'Financial Modeling & Investor Materials: Built comprehensive financial models and pitch decks for a cross-border medical tourism platform, highlighting ~$200K revenue potential and growth roadmap.',
                    'Market Entry Strategy Assessment: Evaluated go-to-market strategy for a leading Japanese hospital entering Vietnam, USA and Indonesia, assessing demand, competitive landscape, channels and revenue potential.',
                  ]}
                />
                <ExperienceCard
                  company="McKinsey & Company"
                  role="Project Consultant · Banking & Financial Services"
                  location="Ho Chi Minh City · Hanoi, Vietnam"
                  date="Jan 2024 – Sep 2025"
                  descs={[
                    'Financial Modeling: Developed a market evaluation model to identify a $14B opportunity in sustainable lending; benchmarked 11 peers and conducted 10+ customer interviews to inform sustainable finance offerings.',
                    'Industry Sizing, Research & Insights: Built a revenue forecasting model for the bank’s Wealth Banking division to support strategic planning and growth.',
                    'Conducted extensive industry research, market sizing, and financial statement analysis for multiple banks, including TOI diagnostics, performance benchmarking, and TOI forecasting.',
                    'Bank-Wide Process Assessment / Strategy: Conducted current-state assessment and developed 5-year strategy for a commercial bank.',
                    'Conducted profitability and performance diagnostics, benchmarking ROE/ROTE, NIM, CASA, and non-interest income against peers to identify gaps and revenue–cost drivers.',
                    'Evaluated the client’s comprehensive risk framework (credit models, risk appetite, etc.); identified 3 key gaps and recommended actions adopted by the client’s CRO.',
                  ]}
                />
                <ExperienceCard
                  company="Ernst & Young"
                  role="Financial Risk Analyst Intern"
                  location="Vietnam"
                  date="2024"
                  descs={[
                    'Forecasting & Risk Modeling: Contributed to development of an Early Warning System (EWS) and the criteria set for customer credit scoring for a commercial bank.',
                    'Risk Analysis: Extracted and analyzed financial and risk metrics data from 6 Asian markets to support client reporting; assessed Basel frameworks and regulatory compliance.',
                    'Contractual Obligations: Handled technical documents on debt collection, ESG, and Internal Ratings-Based approach.',
                  ]}
                />
                <ExperienceCard
                  company="Rouge International & Rouge Ventures"
                  role="Venture Capital Intern"
                  location="Hong Kong SAR"
                  date="Oct 2023 – Jan 2024"
                  descs={[
                    'Due Diligence: Conducted due diligence on business models, financial statements, cost structures, and unit economics to support valuation and portfolio monitoring.',
                    'Executive Reporting: Prepared financial summaries, dashboards, and insight reports to support investment committee decision-making.',
                  ]}
                />
              </div>
            </section>

            <section id="credentials">
              <div className="section-head">
                <span className="section-label">Cred.</span>
                <h2 className="section-title">Credentials & highlights</h2>
              </div>
              <div className="lead-grid">
                <motion.div
                  className="crystal-panel lead-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="lead-meta">Professional</div>
                  <h3>CFA Program</h3>
                  <p className="lead-role" style={{ color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: 12 }}>
                    Level I Candidate
                  </p>
                  <p>
                    Aligning coursework and practice with investment analysis and ethics standards alongside banking and
                    consulting work.
                  </p>
                </motion.div>
                <motion.div
                  className="crystal-panel lead-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 }}
                >
                  <div className="lead-meta">Academic</div>
                  <h3>National Economics University</h3>
                  <p className="lead-role" style={{ color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: 12 }}>
                    SOA VEE · Scholarships
                  </p>
                  <p>
                    Earned SOA VEE credits in Mathematical Finance &amp; Economics; Academic Excellence Scholarship for
                    five semesters.
                  </p>
                </motion.div>
              </div>
            </section>

            <section id="projects">
              <div className="section-head">
                <span className="section-label">Cases</span>
                <h2 className="section-title">Long-form builds</h2>
              </div>
              <div className="project-grid">
                <ProjectCard
                  badge="Proposal deck"
                  title="Vietnam Float Glass acquisition proposal"
                  bullets={[
                    {
                      label: 'Transaction:',
                      text: '$33.3Mn model and proposal for hypothetical Lumina Glaze’s acquisition of a leading glass manufacturer using the EBITDA multiple method.',
                    },
                    {
                      label: 'Deliverable:',
                      text: 'Structured narrative tying valuation assumptions to strategic rationale for stakeholders.',
                    },
                  ]}
                />
                <ProjectCard
                  badge="Valuation model"
                  title="Tesla enterprise valuation model"
                  bullets={[
                    {
                      label: 'Model:',
                      text: 'Five-year company valuation using DCF and comparables, with financial statement analysis.',
                    },
                    {
                      label: 'Outputs:',
                      text: 'DCF sensitivities and football field chart to summarize valuation ranges.',
                    },
                  ]}
                />
              </div>
            </section>

            <section id="skills">
              <div className="section-head">
                <span className="section-label">Stack</span>
                <h2 className="section-title">Technical skills</h2>
              </div>
              <div className="skills-container">
                <div className="crystal-panel skill-category">
                  <h4>Financial modeling &amp; valuation</h4>
                  <ul className="skill-list">
                    <li>DCF</li>
                    <li>Comparables</li>
                    <li>Sensitivity analysis</li>
                    <li>Capital structure</li>
                    <li>Investment evaluation</li>
                  </ul>
                </div>
                <div className="crystal-panel skill-category">
                  <h4>Market analysis &amp; strategy</h4>
                  <ul className="skill-list">
                    <li>Macroeconomic tracking</li>
                    <li>Sector trends</li>
                    <li>Investment analysis</li>
                    <li>Asset positioning</li>
                  </ul>
                </div>
                <div className="crystal-panel skill-category">
                  <h4>Technical tools</h4>
                  <ul className="skill-list">
                    <li>Excel (financial modeling)</li>
                    <li>SQL</li>
                    <li>Python</li>
                    <li>R</li>
                    <li>Power BI</li>
                    <li>Bloomberg Terminal</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="contact" style={{ paddingBottom: 120 }}>
              <div className="contact-layout">
                <div className="contact-photo">
                  <img src={anh4} alt="Chi Lan Nguyen" />
                </div>
                <div className="contact-inner">
                  <span className="section-label">Contact</span>
                  <h2>Let&apos;s talk</h2>
                  <p className="contact-lede">
                    Opportunities in consulting, banking strategy, investment banking, or risk—send a note with context
                    and timeline.
                  </p>
                  <div className="contact-info">
                    <a href={`mailto:${EMAIL}`}>
                      <Mail size={18} color={iconColor} strokeWidth={1.75} />
                      {EMAIL}
                    </a>
                    <span className="contact-sep">·</span>
                    <a href={PHONE_HREF}>
                      <Phone size={18} color={iconColor} strokeWidth={1.75} />
                      {PHONE_DISPLAY}
                    </a>
                    <span className="contact-sep">·</span>
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} color={iconColor} strokeWidth={1.75} />
                      LinkedIn profile
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <footer className="site-footer">
              © 2026 Chi Lan Nguyen — single-page portfolio · built for clarity, not noise
            </footer>
          </main>

          <ChatBot />
        </motion.div>
      )}
    </div>
  );
}

export default App;
