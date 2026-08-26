import ContactForm from "./contact-form";

const ArrowUpRight = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="icon">
    <path d="M5 15 15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const GithubMark = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
    <path fill="currentColor" d="M12 .8a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.2.8-.5v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.5A11.4 11.4 0 0 0 12 .8Z" />
  </svg>
);

const resumeUrl = "https://drive.google.com/file/d/16SeveW5-zfBs2WhhwhWIBs0xYsRBuNSl/view?usp=sharing";

const projects = [
  {
    number: "01",
    eyebrow: "Agentic commerce · Active build",
    title: "PayPilot AI",
    description: "An autonomous commerce agent where an LLM can browse products, manage a cart, and orchestrate checkout—while every purchase pauses at a persisted human-consent gate the model cannot bypass.",
    impact: ["91 tests · 14 suites", "27 mapped endpoints", "17-table schema"],
    stack: ["Java 21", "Spring Boot 3.4", "React 19", "PostgreSQL", "Redis"],
    href: "https://github.com/space0032/PayPilotAi",
    linkLabel: "Explore repository",
    className: "project-card project-card-featured",
  },
  {
    number: "02",
    eyebrow: "Education infrastructure",
    title: "College Management System",
    description: "A hybrid ERP spanning JavaFX desktop and React web, with feature parity across attendance, timetabling, hostel, library, and placement workflows.",
    impact: ["50+ modules", "243+ live records", "4 RBAC tiers"],
    stack: ["Java 17", "React", "PostgreSQL", "JWT", "BCrypt"],
    href: "https://github.com/space0032/College-Management-2",
    linkLabel: "Explore repository",
    className: "project-card",
  },
  {
    number: "03",
    eyebrow: "Civic technology",
    title: "CivicBridge AI",
    description: "A multilingual civic-access platform across web, PWA, and Flutter, with geospatial resource discovery and offline-first synchronization for low-connectivity regions.",
    impact: ["Web + PWA + mobile", "PostGIS search", "Offline-first sync"],
    stack: ["Spring Boot", "React", "Flutter", "PostGIS", "Docker"],
    href: "https://github.com/space0032",
    linkLabel: "View GitHub",
    className: "project-card",
  },
];

const moreProjects = [
  {
    index: "04",
    title: "SynapseCityOS",
    kind: "Smart-city platform",
    description: "A modular civic operating layer combining AI-assisted services, event-driven data pipelines, and automated decisions behind a unified Spring Boot microservices backend.",
    stack: "Java · Spring Boot · React · AI/ML · REST",
  },
  {
    index: "05",
    title: "GrowFund",
    kind: "Social-impact fintech",
    description: "Gamified financial education for Indian farmers, translating investments and government schemes into farm-specific scenarios with multilingual support.",
    stack: "Spring Boot · React · PostgreSQL · Firebase",
    href: "https://github.com/space0032/GrowFund",
  },
  {
    index: "06",
    title: "Smart Attendance",
    kind: "Computer vision",
    description: "Real-time face-detection attendance capture with a Flask API, SQL reporting, and role-based access for faculty and administrators.",
    stack: "Python · OpenCV · Flask · SQL",
  },
];

const stackGroups = [
  { title: "Core languages", index: "01", items: ["Java", "Python", "JavaScript", "SQL", "C++", "Bash"] },
  { title: "Backend", index: "02", items: ["Spring Boot", "Spring MVC", "Hibernate", "REST APIs", "Maven", "JUnit"] },
  { title: "Data", index: "03", items: ["PostgreSQL", "MySQL", "MongoDB", "PostGIS", "Redis", "Flyway"] },
  { title: "Cloud & delivery", index: "04", items: ["Docker", "Kubernetes", "GitHub Actions", "Azure DevOps", "CI/CD", "Linux"] },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Antariksh Mankar, back to top">
          <span className="brand-mark">AM</span>
          <span className="brand-copy"><strong>Antariksh Mankar</strong><span>Backend Engineer</span></span>
        </a>
        <nav aria-label="Primary navigation" className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#stack">Stack</a>
          <a href="https://www.linkedin.com/in/antariksh-mankar/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>
          <a className="nav-cta" href={resumeUrl} target="_blank" rel="noreferrer">Resume <ArrowUpRight /></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-kicker reveal reveal-one"><span className="availability-dot" />Open to backend engineering internships<span className="kicker-location">Gandhinagar, India</span></div>
        <div className="hero-copy">
          <p className="hero-index reveal reveal-two">01 / INTRODUCTION</p>
          <h1 className="reveal reveal-two">I engineer the<span>systems behind</span>the interface.</h1>
          <p className="hero-summary reveal reveal-three">Backend developer focused on scalable Java and Spring Boot systems, AI-integrated platforms, and delivery pipelines that hold up beyond the demo.</p>
          <div className="hero-actions reveal reveal-three">
            <a className="button button-primary" href="#work">Explore selected work <ArrowUpRight /></a>
            <a className="button button-ghost" href="mailto:antariksh.mankar43@gmail.com">Start a conversation</a>
          </div>
        </div>
        <aside className="system-card reveal reveal-four" aria-label="Backend system overview">
          <div className="system-card-header"><span>REQUEST_LIFECYCLE.LOG</span><span className="live-badge"><i /> LIVE</span></div>
          <div className="system-flow">
            <div className="flow-node"><span>01</span><div><strong>Client</strong><small>authenticated request</small></div></div>
            <div className="flow-line"><i /></div>
            <div className="flow-node flow-node-active"><span>02</span><div><strong>API layer</strong><small>validate · route · secure</small></div></div>
            <div className="flow-line"><i /></div>
            <div className="flow-node"><span>03</span><div><strong>Domain</strong><small>business rules · events</small></div></div>
            <div className="flow-line"><i /></div>
            <div className="flow-node"><span>04</span><div><strong>Data</strong><small>persist · cache · observe</small></div></div>
          </div>
          <div className="system-card-footer"><span><i className="status-green" /> service healthy</span><code>HTTP 200</code></div>
        </aside>
        <div className="metric-strip reveal reveal-four">
          <div><strong>200+</strong><span>real users served</span></div><div><strong>50+</strong><span>ERP modules shipped</span></div><div><strong>2025</strong><span>SIH national participant</span></div><div><strong>6</strong><span>production-minded builds</span></div>
        </div>
      </section>

      <div className="ticker" aria-label="Core technologies"><div className="ticker-track">
        {["Java", "Spring Boot", "Microservices", "PostgreSQL", "Docker", "CI/CD", "AI integrations", "System design", "Java", "Spring Boot", "Microservices", "PostgreSQL", "Docker", "CI/CD", "AI integrations", "System design"].map((item, index) => <span key={`${item}-${index}`}><i />{item}</span>)}
      </div></div>

      <section className="work-section" id="work">
        <div className="section-heading"><p>02 / SELECTED SYSTEMS</p><h2>Built around real constraints,<br />not just feature lists.</h2><span className="section-note">Selected work · 2025—2026</span></div>
        <div className="projects-grid">
          {projects.map((project) => (
            <article className={project.className} key={project.title}>
              <div className="project-topline"><span>{project.number}</span><span>{project.eyebrow}</span></div>
              <div className="project-visual" aria-hidden="true"><div className="visual-orbit visual-orbit-one" /><div className="visual-orbit visual-orbit-two" /><div className="visual-core">{project.number}</div><span className="visual-label visual-label-a">API</span><span className="visual-label visual-label-b">DATA</span><span className="visual-label visual-label-c">AUTH</span></div>
              <div className="project-content">
                <h3>{project.title}</h3><p>{project.description}</p>
                <ul className="impact-list" aria-label={`${project.title} highlights`}>{project.impact.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="project-footer"><div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer" aria-label={`${project.linkLabel}: ${project.title}`}>{project.linkLabel} <ArrowUpRight /></a></div>
              </div>
            </article>
          ))}
        </div>
        <a className="github-band" href="https://github.com/space0032" target="_blank" rel="noreferrer"><span><GithubMark /> 31 public repositories and counting</span><strong>Explore the build archive <ArrowUpRight /></strong></a>

        <div className="more-projects">
          {moreProjects.map((project) => (
            <article className="compact-project" key={project.title}>
              <div className="compact-project-index">{project.index}</div>
              <p>{project.kind}</p>
              <h3>{project.title}</h3>
              <div className="compact-rule" />
              <p className="compact-description">{project.description}</p>
              <div className="compact-footer">
                <span>{project.stack}</span>
                {project.href ? <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} on GitHub`}><ArrowUpRight /></a> : <i>Case study</i>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-intro">
          <p className="section-label">03 / ENGINEERING APPROACH</p>
          <p className="about-statement">
            I care about the part users never see: the request path, the data model,
            the failure mode, and the deployment that makes a product dependable.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-profile">
            <span className="profile-monogram">AM</span>
            <div>
              <h2>Backend-first.<br />Outcome-focused.</h2>
              <p>I’m a Computer Engineering student and independent developer building full product systems from API contract to deployment. My strongest work sits where Java backend engineering, pragmatic DevOps, and applied AI meet.</p>
              <a href={resumeUrl} target="_blank" rel="noreferrer">Read full resume <ArrowUpRight /></a>
            </div>
          </div>
          <div className="principles-grid">
            <article><span>01</span><h3>Design the boundary</h3><p>Clear APIs, explicit contracts, and business rules that stay out of transport code.</p></article>
            <article><span>02</span><h3>Protect the data</h3><p>Authentication, role-aware access, safe migrations, and query paths built for real use.</p></article>
            <article><span>03</span><h3>Expect failure</h3><p>Tests, useful logs, fallback behavior, and operational signals before the system is stressed.</p></article>
            <article><span>04</span><h3>Ship repeatably</h3><p>Containerized environments and delivery pipelines that turn releases into a routine.</p></article>
          </div>
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="section-heading experience-heading">
          <p>04 / EXPERIENCE</p>
          <h2>Learning by shipping<br />complete systems.</h2>
        </div>
        <div className="experience-layout">
          <div className="experience-aside">
            <span>Current focus</span>
            <strong>Scalable backend<br />& distributed systems</strong>
            <p>Building toward production-grade engineering depth: designing, securing, debugging, monitoring, and evolving services—not only implementing endpoints.</p>
          </div>
          <article className="timeline-entry">
            <div className="timeline-date">AUG 2025 — PRESENT</div>
            <div className="timeline-body">
              <div className="timeline-role"><span>Independent Software Developer</span><span>Self-directed product work · India</span></div>
              <p>Designed and delivered backend-heavy products across civic technology, education infrastructure, fintech, computer vision, and local AI. Work spans domain modeling, API security, relational data, offline synchronization, automated testing, and containerized delivery.</p>
              <div className="timeline-proof">
                <div><strong>6</strong><span>substantial systems</span></div>
                <div><strong>200+</strong><span>real users</span></div>
                <div><strong>91</strong><span>PayPilot automated tests</span></div>
              </div>
            </div>
          </article>
          <article className="timeline-entry education-entry">
            <div className="timeline-date">2025 — 2029</div>
            <div className="timeline-body">
              <div className="timeline-role"><span>B.Tech, Computer Engineering</span><span>Swarnim Startup & Innovation University</span></div>
              <p>Developing the computer science foundations behind the systems work: data structures, algorithms, databases, networking, object-oriented design, and software engineering.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="stack-section" id="stack">
        <div className="stack-intro">
          <p className="section-label">05 / TECHNICAL ARSENAL</p>
          <h2>Tools chosen for<br /><span>the system at hand.</span></h2>
          <p>A backend-centered toolkit with enough frontend and infrastructure fluency to own the path from idea to running service.</p>
        </div>
        <div className="stack-groups">
          {stackGroups.map((group) => (
            <article key={group.title}>
              <div className="stack-group-title"><span>{group.index}</span><h3>{group.title}</h3></div>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-section" aria-labelledby="proof-title">
        <div className="proof-title-wrap">
          <p className="section-label">06 / SIGNALS</p>
          <h2 id="proof-title">Proof beyond<br />the code.</h2>
        </div>
        <div className="proof-list">
          <article><span>01</span><div><p>National selection</p><h3>Smart India Hackathon</h3><small>Ministry of Education · 2025</small></div></article>
          <article><span>02</span><div><p>Cloud foundation</p><h3>Google Cloud Fundamentals</h3><small>Core Infrastructure · 2025</small></div></article>
          <article><span>03</span><div><p>Cloud & AI foundation</p><h3>Oracle OCI AI Foundations</h3><small>Oracle · 2025</small></div></article>
          <article><span>04</span><div><p>Software engineering</p><h3>IBM Professional Certificate</h3><small>IBM / Coursera · 2025</small></div></article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <p className="section-label">07 / LET’S BUILD</p>
        <h2>Have a backend problem<br />worth solving?</h2>
        <p>I’m open to backend engineering internships, ambitious product builds, and conversations about scalable systems.</p>
        <div className="contact-layout">
          <ContactForm />
          <aside className="contact-aside">
            <span>Prefer a direct route?</span>
            <a href="mailto:antariksh.mankar43@gmail.com">antariksh.mankar43@gmail.com <ArrowUpRight /></a>
            <a href="https://www.linkedin.com/in/antariksh-mankar/" target="_blank" rel="noreferrer">Connect on LinkedIn <ArrowUpRight /></a>
            <p>Based in Gandhinagar, Gujarat. Open to backend engineering internships and ambitious product collaborations.</p>
          </aside>
        </div>
        <div className="contact-meta"><span><i /> Available for the right opportunity</span><span>Gandhinagar · Gujarat · India</span></div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Antariksh Mankar</span>
        <div><a href="https://github.com/space0032" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/antariksh-mankar/" target="_blank" rel="noreferrer">LinkedIn</a><a href="#top">Back to top ↑</a></div>
        <span>Built with intent, not a template.</span>
      </footer>
    </main>
  );
}
