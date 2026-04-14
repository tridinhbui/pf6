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

const LINKEDIN = 'https://www.linkedin.com/in/hoanglevu-tony/';
const EMAIL = 'lehoang@bu.edu';
const PHONE_DISPLAY = '470-385-9181';
const PHONE_HREF = 'tel:+14703859181';

const questions = [
  {
    q: 'What problem do you solve for teams?',
    a: 'I turn messy financials into clear repayment signals, defendable valuation ranges, and decks that a credit committee or IC can actually use—without hand-waving.',
  },
  {
    q: 'Vietnam bank internship in one sentence?',
    a: 'SME tape at scale: 100+ files, internal scores, and diligence that cut turnaround time while keeping risk policy intact.',
  },
  {
    q: 'What makes your project work stand out?',
    a: 'Two end-to-end narratives: a multifamily DCF with explicit exit math, and a Goldman Sachs comp + DCF stack with segment-level drivers—not just a template.',
  },
  {
    q: 'Tools you live in?',
    a: 'Excel for structure, SQL when the data gets wide, PowerPoint when the story has to land in one room.',
  },
];

type ChatMessage = { text: string; sender: 'bot' | 'user' };

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: 'Quick prompts below — pick one to see how Hoang frames his work (no login, no tracking).',
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
                <h4>Ask Hoang</h4>
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
        H. L. VU
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
            <span className="nav-brand">H. L. VU</span>
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
                <a href="#leadership">Lead</a>
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
                <span className="hero-eyebrow">Portfolio · Boston University · Finance</span>
                <h1 className="hero-title">
                  Hoang Le
                  <br />
                  <span className="gradient-text">Vu</span>
                </h1>
                <p className="hero-lede">
                  I work at the intersection of{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 600 }}>commercial credit</strong>,{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 600 }}>public-market valuation</strong>, and{' '}
                  <strong style={{ color: 'var(--text)', fontWeight: 600 }}>consumer P&amp;L</strong>—so the same
                  person who stress-tests a loan book can also explain why a target price moved 15%.
                </p>
                <div className="hero-meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <MapPin size={15} strokeWidth={1.75} style={{ opacity: 0.55 }} />
                    33 Buswell St., Boston, MA 02215
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
                  <div className="photo-badge">GPA 3.93</div>
                  <img src={anh1} alt="Hoang Le Vu — portrait" className="main-img" />
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
                    Most of my learning happens where numbers meet judgment: a bank in Haiphong sizing SME exposure, a
                    Chicago desk asking whether macro prints justify a target-price revision, and a Hanoi brand testing
                    price and logistics on a U.S. marketplace.
                  </p>
                  <p>
                    That mix keeps me honest—credit discipline on one side, market storytelling on the other—with BU
                    coursework and club casing as the lab where I pressure-test both.
                  </p>
                </div>
                <figure className="about-figure">
                  <img src={anh2} alt="Hoang Le Vu — context" className="editorial-img" />
                  <figcaption className="figure-caption">Boston · campus &amp; case rhythm</figcaption>
                </figure>
              </div>
              <div className="stat-grid about-stats-row">
                {[
                  { icon: TrendingUp, label: 'North star', val: 'Defensible calls' },
                  { icon: BarChart3, label: 'Builds', val: 'DCF · Comps · 3-statement' },
                  { icon: PieChart, label: 'Verticals touched', val: 'Banking · IB · CPG' },
                  { icon: Globe, label: 'Geography', val: 'U.S. ↔ Vietnam' },
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
                <h3>Boston University</h3>
                <p className="edu-sub">
                  Boston, MA — B.S. Business Administration (Finance) — GPA 3.93 — Aug. 2025 to May 2029
                </p>
                <ul className="edu-list">
                  <li>
                    <strong style={{ color: 'var(--text)' }}>Coursework: </strong>
                    Financial Accounting, Corporate Finance, Micro &amp; Macro, Data &amp; Business Analytics,
                    Information Systems &amp; Technologies
                  </li>
                  <li>
                    <strong style={{ color: 'var(--text)' }}>Credentials: </strong>
                    Corporate Finance (CFI®) · PwC Audit Simulation®
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
                  company="Military Commercial Joint Stock Bank"
                  role="Investor Relation Intern"
                  location="Hai Phong, Vietnam"
                  date="November 2025 – January 2026"
                  descs={[
                    'Analysed financial statements & cashflow of 100+ SME clients to evaluate repayment capacity, supporting loan structuring decisions ranging from 10–50 billion VND and ensuring alignment with risk management policies.',
                    'Assessed SME credit worthiness using internal scoring models to recommend tailored lending terms, managing a client portfolio valued at 200 billion VND.',
                    'Performed financial ratio analyses and audited receipts as part of client due diligence, completing 60% of preliminary assessments and improving evaluation turnaround time by 25%.',
                  ]}
                />
                <ExperienceCard
                  company="FinBud AI"
                  role="Financial Analyst Intern"
                  location="Chicago, IL"
                  date="May 2025 – August 2025"
                  descs={[
                    'Analysed equity valuation of 3 major companies (Tesla, Goldman Sachs, Blackstone) using DCF and comparable company analysis, supporting investment recommendations for a portfolio valued at over $50M.',
                    'Conducted market research across 10+ macroeconomic indicators and sector trends, identifying key valuation drivers that informed a 15% adjustment in target price estimates.',
                    'Designed and presented an investment recommendation deck summarizing valuation insights and strategic outlook, influencing 5 potential investment opportunities and guiding internal investment decisions.',
                  ]}
                />
                <ExperienceCard
                  company="Hermore Cosmetics"
                  role="Financial Analyst Intern"
                  location="Hanoi, Vietnam"
                  date="June 2024 – September 2024"
                  descs={[
                    'Conducted Profit & Loss analyses for 15+ SKUs as part of Amazon U.S. expansion strategy, identifying cost drivers and supporting pricing adjustments that improved projected net margins by 12%.',
                    'Evaluated pricing strategy and margin impact using contribution margin and break-even analysis, informing competitive positioning for products targeting a $200K annual revenue segment.',
                    'Analysed logistics cost structure across cross-border fulfillment channels, proposing efficiency improvements that reduced estimated per-unit shipping costs by 18% and enhanced overall supply chain performance.',
                  ]}
                />
              </div>
            </section>

            <section id="leadership">
              <div className="section-head">
                <span className="section-label">Lead</span>
                <h2 className="section-title">Campus ownership</h2>
              </div>
              <div className="lead-grid">
                <motion.div
                  className="crystal-panel lead-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="lead-meta">Ongoing</div>
                  <h3>Boston University Accounting Association</h3>
                  <p className="lead-role" style={{ color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: 12 }}>
                    Director of Casing
                  </p>
                  <p>
                    Running the Learning Case Program: weekly cadence, member comms at 50+, and tight prep for
                    student-led presentations.
                  </p>
                </motion.div>
                <motion.div
                  className="crystal-panel lead-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 }}
                >
                  <div className="lead-meta">Ongoing</div>
                  <h3>Boston University Financial Modeling Club</h3>
                  <p className="lead-role" style={{ color: 'var(--text-dim)', fontStyle: 'italic', marginBottom: 12 }}>
                    Junior Analyst
                  </p>
                  <p>
                    Deeper valuation drills plus mentorship on recruiting, technical screens, and how to network without
                    sounding rehearsed.
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
                  badge="Real assets"
                  title="Blackstone multifamily housing analysis"
                  bullets={[
                    {
                      label: 'Underwrite:',
                      text: 'Ten-year DCF with rent roll, opex, and exit—IRR and valuation tied to explicit assumptions.',
                    },
                    {
                      label: 'Risk:',
                      text: 'Sensitivities on cap rate, occupancy, and rent growth to show where the thesis breaks.',
                    },
                  ]}
                />
                <ProjectCard
                  badge="Markets"
                  title="Goldman Sachs equity research analysis"
                  bullets={[
                    {
                      label: 'Price:',
                      text: 'DCF plus comps with implied bands and a clean bull / bear framing.',
                    },
                    {
                      label: 'Context:',
                      text: 'Segment revenue bridges (IB, markets, AM) with macro links to margin and growth.',
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
                  <h4>Financial modeling</h4>
                  <ul className="skill-list">
                    <li>DCF</li>
                    <li>Three-statement model</li>
                    <li>Comparable company analysis</li>
                    <li>Valuation</li>
                    <li>Sensitivity analysis</li>
                  </ul>
                </div>
                <div className="crystal-panel skill-category">
                  <h4>Financial statement analysis</h4>
                  <ul className="skill-list">
                    <li>Ratio analysis</li>
                    <li>Cash flow analysis</li>
                    <li>Profitability analysis</li>
                    <li>Liquidity analysis</li>
                  </ul>
                </div>
                <div className="crystal-panel skill-category">
                  <h4>Tools</h4>
                  <ul className="skill-list">
                    <li>Microsoft Excel (Pivot Tables, VLOOKUP)</li>
                    <li>PowerPoint</li>
                    <li>SQL</li>
                  </ul>
                </div>
                <div className="crystal-panel skill-category">
                  <h4>Client &amp; professional</h4>
                  <ul className="skill-list">
                    <li>Presentation deck creation</li>
                    <li>Stakeholder communication</li>
                    <li>Data-driven decision making</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="contact" style={{ paddingBottom: 120 }}>
              <div className="contact-layout">
                <div className="contact-photo">
                  <img src={anh4} alt="Hoang Le Vu" />
                </div>
                <div className="contact-inner">
                  <span className="section-label">Contact</span>
                  <h2>Let&apos;s talk</h2>
                  <p className="contact-lede">
                    Internships, case collaborations, or a straight coffee chat about credit vs. equity workflows—I read
                    every note.
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
                      linkedin.com/in/hoanglevu-tony
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <footer className="site-footer">
              © 2026 Hoang Le Vu — single-page portfolio · built for clarity, not noise
            </footer>
          </main>

          <ChatBot />
        </motion.div>
      )}
    </div>
  );
}

export default App;
