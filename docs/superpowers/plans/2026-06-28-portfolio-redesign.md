# Portfolio Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely rewrite the three static files (index.html, style.css, script.js) to deliver a modern-light, sidebar-nav portfolio matching the approved design spec.

**Architecture:** Single-page static site. Fixed 260px sidebar on desktop (icons-only at 56px on tablet, hidden on mobile with slide-in drawer). Main content is a scrollable sequence of white card sections. No build step — files are served directly by GitHub Pages.

**Tech Stack:** Vanilla HTML5, CSS3 (custom properties, grid, flexbox), Vanilla JS (IntersectionObserver, classList), Inter via Google Fonts, Font Awesome 6 CDN.

## Global Constraints

- Static files only — no Node, no bundler, no framework
- External resources allowed: `https://fonts.googleapis.com` (Inter), `https://cdnjs.cloudflare.com` (Font Awesome 6)
- `profile-photo.jpeg` and `SoftwareEngineer_HuynhTanThinh.pdf` are unchanged
- Must degrade gracefully without JS — links work, content readable
- GitHub Pages root — no subdirectory, all asset paths relative

---

## File Map

| File | Role |
|---|---|
| `index.html` | Full rewrite — all HTML structure and content |
| `style.css` | Full rewrite — all visual styles |
| `script.js` | Full rewrite — scroll-spy + mobile drawer |

---

### Task 1: Base HTML skeleton + CSS foundation

**Files:**
- Modify: `index.html` (full rewrite — sidebar + main scaffold, sections empty)
- Modify: `style.css` (full rewrite — CSS variables, reset, two-column layout)

**Interfaces:**
- Produces: `#summary`, `#skills`, `#experience`, `#projects`, `#education`, `#contact` section IDs used by all later tasks and by JS scroll-spy

- [ ] **Step 1: Rewrite `index.html` with the layout skeleton**

Replace the entire file with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Huynh Tan Thinh — Software Engineer</title>
  <meta name="description" content="Software Engineer & Cloud Engineer with 5+ years experience in backend development, DevOps, and cloud-native infrastructure on GCP and AWS.">
  <meta name="author" content="Huynh Tan Thinh">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://htthinh1999.github.io/">
  <meta property="og:title" content="Huynh Tan Thinh — Software Engineer">
  <meta property="og:description" content="Software Engineer & Cloud Engineer with 5+ years experience.">
  <meta property="og:image" content="https://htthinh1999.github.io/profile-photo.jpeg">
  <meta name="theme-color" content="#2563eb">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <link rel="manifest" href="site.webmanifest">
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>

  <!-- Mobile top bar (hidden on desktop) -->
  <div class="mobile-topbar">
    <span class="mobile-name">Huynh Tan Thinh</span>
    <button class="hamburger" id="hamburger" aria-label="Open navigation menu">
      <i class="fas fa-bars"></i>
    </button>
  </div>

  <!-- Drawer backdrop -->
  <div class="drawer-backdrop" id="drawerBackdrop"></div>

  <!-- Sidebar -->
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-inner">
      <!-- Profile block — Task 2 fills this -->
      <div class="sidebar-profile"></div>
      <!-- Nav — Task 2 fills this -->
      <nav class="sidebar-nav" aria-label="Page sections"></nav>
      <!-- Download CV — Task 2 fills this -->
    </div>
  </aside>

  <!-- Main scrollable content -->
  <main class="main-content">
    <section id="summary" class="section-card">
      <h2 class="section-title">Summary</h2>
    </section>

    <section id="skills" class="section-card">
      <h2 class="section-title">Skills</h2>
    </section>

    <section id="experience" class="section-card">
      <h2 class="section-title">Experience</h2>
    </section>

    <section id="projects" class="section-card">
      <h2 class="section-title">Projects</h2>
    </section>

    <section id="education" class="section-card">
      <h2 class="section-title">Education & Certifications</h2>
    </section>

    <section id="contact" class="section-card">
      <h2 class="section-title">Contact</h2>
    </section>
  </main>

  <footer class="site-footer">
    <p>© <span class="footer-year">2026</span> Huynh Tan Thinh. All rights reserved.</p>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Rewrite `style.css` with CSS variables and two-column layout**

Replace the entire file with:

```css
/* ── Variables ──────────────────────────────────────────── */
:root {
  --sidebar-width: 260px;
  --sidebar-narrow: 56px;
  --bg: #f8fafc;
  --surface: #ffffff;
  --accent: #2563eb;
  --accent-dark: #1d4ed8;
  --accent-light: #eff6ff;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --border: #e2e8f0;
  --tag-bg: #eff6ff;
  --tag-text: #1d4ed8;
  --timeline-line: #e2e8f0;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.10);
  --radius: 12px;
  --radius-sm: 8px;
  --transition: 0.2s ease;
}

/* ── Reset ──────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg);
  display: flex;
  min-height: 100vh;
}
a { color: inherit; text-decoration: none; }
ul { list-style: none; }
img { max-width: 100%; display: block; }
button { cursor: pointer; border: none; background: none; font-family: inherit; }

/* ── Layout ─────────────────────────────────────────────── */
.sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: var(--surface);
  border-right: 1px solid var(--border);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 200;
  transition: width var(--transition);
}
.sidebar-inner {
  width: var(--sidebar-width);
  padding: 1.5rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 100vh;
}

.main-content {
  margin-left: var(--sidebar-width);
  flex: 1;
  padding: 2rem;
  max-width: 1060px;
}

.section-card {
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  padding: 2rem;
  margin-bottom: 1.5rem;
}
.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-light);
}

/* ── Mobile top bar (hidden on desktop) ─────────────────── */
.mobile-topbar {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 56px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 300;
  box-shadow: var(--shadow-sm);
}
.mobile-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--text-primary);
}
.hamburger {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 1.1rem;
  transition: background var(--transition);
}
.hamburger:hover { background: var(--bg); }

/* ── Drawer backdrop ────────────────────────────────────── */
.drawer-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 190;
  opacity: 0;
  transition: opacity var(--transition);
}
.drawer-backdrop.active {
  display: block;
  opacity: 1;
}

/* ── Footer ─────────────────────────────────────────────── */
.site-footer {
  margin-left: var(--sidebar-width);
  text-align: center;
  padding: 1.5rem 2rem;
  color: var(--text-secondary);
  font-size: 0.85rem;
  border-top: 1px solid var(--border);
}
```

- [ ] **Step 3: Verify layout renders**

Open `index.html` in a browser (e.g. `open index.html` on macOS or drag into browser).

Expected: White sidebar (~260px) on the left, light gray page to the right, six section cards each showing their heading, footer text at bottom. No horizontal overflow.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add layout skeleton with sidebar and section cards"
```

---

### Task 2: Sidebar content + styling

**Files:**
- Modify: `index.html` — fill in `<aside class="sidebar">` content
- Modify: `style.css` — add sidebar component styles (append to existing file)

**Interfaces:**
- Produces: `.nav-link[href="#<id>"]` elements consumed by Task 7 scroll-spy
- Consumes: section IDs `#summary #skills #experience #projects #education #contact` from Task 1

- [ ] **Step 1: Replace the sidebar `<aside>` element in `index.html`**

Find `<aside class="sidebar" id="sidebar">` and replace the entire element with:

```html
<aside class="sidebar" id="sidebar">
  <div class="sidebar-inner">

    <!-- Profile -->
    <div class="sidebar-profile">
      <div class="sidebar-photo-wrap">
        <img src="profile-photo.jpeg" alt="Huynh Tan Thinh" class="sidebar-photo">
      </div>
      <h1 class="sidebar-name">Huynh Tan Thinh</h1>
      <p class="sidebar-role">Software Engineer</p>
      <span class="open-badge"><i class="fas fa-circle"></i> Open to Work</span>
    </div>

    <!-- Contact info -->
    <div class="sidebar-contact">
      <a href="tel:+84977393641" class="contact-row">
        <i class="fas fa-phone"></i><span>(+84) 977 393 641</span>
      </a>
      <a href="mailto:htthinh1999@gmail.com" class="contact-row">
        <i class="fas fa-envelope"></i><span>htthinh1999@gmail.com</span>
      </a>
      <div class="contact-row">
        <i class="fas fa-map-marker-alt"></i><span>Nha Trang, Vietnam</span>
      </div>
    </div>

    <!-- Social links -->
    <div class="sidebar-social">
      <a href="https://linkedin.com/in/htthinh1999" target="_blank" rel="noopener noreferrer" class="social-link">
        <i class="fab fa-linkedin"></i><span>LinkedIn</span>
      </a>
      <a href="https://github.com/htthinh1999" target="_blank" rel="noopener noreferrer" class="social-link">
        <i class="fab fa-github"></i><span>GitHub</span>
      </a>
      <a href="https://facebook.com/htthinh1999" target="_blank" rel="noopener noreferrer" class="social-link">
        <i class="fab fa-facebook"></i><span>Facebook</span>
      </a>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav" aria-label="Page sections">
      <a href="#summary"    class="nav-link" data-section="summary">    <i class="fas fa-user"></i>           <span>Summary</span></a>
      <a href="#skills"     class="nav-link" data-section="skills">     <i class="fas fa-code"></i>            <span>Skills</span></a>
      <a href="#experience" class="nav-link" data-section="experience"> <i class="fas fa-briefcase"></i>       <span>Experience</span></a>
      <a href="#projects"   class="nav-link" data-section="projects">   <i class="fas fa-layer-group"></i>     <span>Projects</span></a>
      <a href="#education"  class="nav-link" data-section="education">  <i class="fas fa-graduation-cap"></i>  <span>Education</span></a>
      <a href="#contact"    class="nav-link" data-section="contact">    <i class="fas fa-envelope"></i>        <span>Contact</span></a>
    </nav>

    <!-- Download CV -->
    <a href="SoftwareEngineer_HuynhTanThinh.pdf" class="download-cv-btn" download>
      <i class="fas fa-download"></i><span>Download CV</span>
    </a>

  </div>
</aside>
```

- [ ] **Step 2: Append sidebar component styles to `style.css`**

```css
/* ── Sidebar: profile ───────────────────────────────────── */
.sidebar-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.4rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}
.sidebar-photo-wrap {
  width: 88px; height: 88px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent-light);
  margin-bottom: 0.25rem;
}
.sidebar-photo { width: 100%; height: 100%; object-fit: cover; }
.sidebar-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}
.sidebar-role {
  font-size: 0.8rem;
  color: var(--accent);
  font-weight: 500;
}
.open-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
  font-weight: 500;
  color: #16a34a;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
  margin-top: 0.2rem;
}
.open-badge i { font-size: 0.45rem; }

/* ── Sidebar: contact ───────────────────────────────────── */
.sidebar-contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.contact-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.78rem;
  color: var(--text-secondary);
  transition: color var(--transition);
  word-break: break-all;
}
a.contact-row:hover { color: var(--accent); }
.contact-row i {
  width: 16px;
  flex-shrink: 0;
  color: var(--accent);
  font-size: 0.8rem;
}

/* ── Sidebar: social ────────────────────────────────────── */
.sidebar-social {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.social-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.45rem 0.6rem;
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  color: var(--text-secondary);
  transition: background var(--transition), color var(--transition);
}
.social-link:hover { background: var(--accent-light); color: var(--accent); }
.social-link i { width: 16px; text-align: center; font-size: 0.9rem; }

/* ── Sidebar: nav ───────────────────────────────────────── */
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.55rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: background var(--transition), color var(--transition);
}
.nav-link i { width: 16px; text-align: center; font-size: 0.85rem; flex-shrink: 0; }
.nav-link:hover { background: var(--accent-light); color: var(--accent); }
.nav-link.active { background: var(--accent-light); color: var(--accent); font-weight: 600; }

/* ── Sidebar: download button ───────────────────────────── */
.download-cv-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-sm);
  font-size: 0.88rem;
  font-weight: 600;
  transition: background var(--transition), transform var(--transition);
  margin-top: auto;
}
.download-cv-btn:hover { background: var(--accent-dark); transform: translateY(-1px); }
.download-cv-btn i { font-size: 0.85rem; }
```

- [ ] **Step 3: Verify sidebar renders**

Open `index.html` in a browser.

Expected: Profile photo (circular), name, "Software Engineer", green "Open to Work" badge, phone/email/location rows, LinkedIn/GitHub/Facebook links, six nav items, blue "Download CV" button at the bottom of the sidebar.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add sidebar profile, contact, social, nav, and download button"
```

---

### Task 3: Summary section

**Files:**
- Modify: `index.html` — fill `<section id="summary">`
- Modify: `style.css` — append summary styles

- [ ] **Step 1: Replace the `<section id="summary">` element in `index.html`**

```html
<section id="summary" class="section-card">
  <h2 class="section-title">Summary</h2>
  <p class="summary-intro">
    More than 5 years of working experience in Software Engineering — designing, developing, and managing
    robust and scalable infrastructure. Proficient in a wide range of DevOps tools and cloud platforms.
    Experienced in both Google Cloud Platform (GCP) and Amazon Web Service (AWS) environments.
    Proficient in English.
  </p>
  <div class="specialties-grid">
    <div class="specialty-item">
      <i class="fas fa-server"></i>
      <div>
        <strong>Infrastructure as Code</strong>
        <p>Terraform, AWS CloudFormation, AWS CDK</p>
      </div>
    </div>
    <div class="specialty-item">
      <i class="fas fa-cubes"></i>
      <div>
        <strong>Containerization & Orchestration</strong>
        <p>Docker, Kubernetes, Helm</p>
      </div>
    </div>
    <div class="specialty-item">
      <i class="fas fa-infinity"></i>
      <div>
        <strong>CI/CD Pipelines</strong>
        <p>GitHub Actions, Buildkite, FluxCD, ArgoCD</p>
      </div>
    </div>
    <div class="specialty-item">
      <i class="fas fa-cloud"></i>
      <div>
        <strong>Cloud Platforms</strong>
        <p>GCP (GKE, Cloud Run, Pub/Sub) · AWS (EKS, ECS, Lambda)</p>
      </div>
    </div>
    <div class="specialty-item">
      <i class="fas fa-code"></i>
      <div>
        <strong>Backend Development</strong>
        <p>C#, .NET 6/8, Node.js, Golang, Python, Microservices</p>
      </div>
    </div>
    <div class="specialty-item">
      <i class="fas fa-database"></i>
      <div>
        <strong>Database Management</strong>
        <p>MySQL, MongoDB, AWS DynamoDB</p>
      </div>
    </div>
    <div class="specialty-item">
      <i class="fas fa-users"></i>
      <div>
        <strong>Agile Methodologies</strong>
        <p>Cross-functional team collaboration, Scrum</p>
      </div>
    </div>
    <div class="specialty-item">
      <i class="fas fa-search"></i>
      <div>
        <strong>Problem-Solving</strong>
        <p>Root cause analysis, analytical troubleshooting</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append summary styles to `style.css`**

```css
/* ── Summary ────────────────────────────────────────────── */
.summary-intro {
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.75;
  margin-bottom: 1.25rem;
}
.specialties-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}
.specialty-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.85rem;
  background: var(--bg);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
}
.specialty-item i {
  color: var(--accent);
  font-size: 1rem;
  margin-top: 0.15rem;
  flex-shrink: 0;
  width: 18px;
  text-align: center;
}
.specialty-item strong {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-primary);
  display: block;
  margin-bottom: 0.15rem;
}
.specialty-item p {
  font-size: 0.76rem;
  color: var(--text-secondary);
  line-height: 1.4;
}
```

- [ ] **Step 3: Verify summary section**

Open in browser. Expected: intro paragraph, 8 specialty cards in a 2-column grid with icons, each with a bold title and description.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add summary section with specialties grid"
```

---

### Task 4: Skills section

**Files:**
- Modify: `index.html` — fill `<section id="skills">`
- Modify: `style.css` — append skills styles

- [ ] **Step 1: Replace the `<section id="skills">` element in `index.html`**

```html
<section id="skills" class="section-card">
  <h2 class="section-title">Technical Skills</h2>
  <div class="skills-list">

    <div class="skill-group">
      <h3 class="skill-group-label">DevOps</h3>
      <div class="tag-row">
        <span class="tag">Docker</span><span class="tag">Helm</span><span class="tag">Kubernetes</span>
        <span class="tag">Terraform</span><span class="tag">Terragrunt</span><span class="tag">CloudFormation</span>
        <span class="tag">AWS CDK</span><span class="tag">CI/CD</span><span class="tag">FluxCD</span>
        <span class="tag">ArgoCD</span><span class="tag">Buildkite</span>
      </div>
    </div>

    <div class="skill-group">
      <h3 class="skill-group-label">Cloud — GCP</h3>
      <div class="tag-row">
        <span class="tag">GKE</span><span class="tag">Cloud Run</span><span class="tag">Cloud Function</span>
        <span class="tag">Pub/Sub</span><span class="tag">Cloud Storage</span><span class="tag">Cloud Scheduler</span>
        <span class="tag">Cloud Task</span>
      </div>
    </div>

    <div class="skill-group">
      <h3 class="skill-group-label">Cloud — AWS</h3>
      <div class="tag-row">
        <span class="tag">EKS</span><span class="tag">ECS (Fargate)</span><span class="tag">Lambda</span>
        <span class="tag">ECR</span><span class="tag">S3</span><span class="tag">DynamoDB</span>
        <span class="tag">SQS</span><span class="tag">StepFunction</span><span class="tag">Glue</span>
        <span class="tag">CloudFormation</span><span class="tag">CDK</span><span class="tag">Code Series</span>
        <span class="tag">Karpenter</span>
      </div>
    </div>

    <div class="skill-group">
      <h3 class="skill-group-label">Backend</h3>
      <div class="tag-row">
        <span class="tag">C#</span><span class="tag">.NET Core 3.1</span><span class="tag">.NET 6/8</span>
        <span class="tag">Node.js</span><span class="tag">NestJS</span><span class="tag">Strapi</span>
        <span class="tag">Golang</span><span class="tag">Python</span><span class="tag">Microservices</span>
      </div>
    </div>

    <div class="skill-group">
      <h3 class="skill-group-label">Frontend</h3>
      <div class="tag-row">
        <span class="tag">HTML</span><span class="tag">CSS</span><span class="tag">JavaScript</span>
        <span class="tag">jQuery</span><span class="tag">Bootstrap</span>
      </div>
    </div>

    <div class="skill-group">
      <h3 class="skill-group-label">Mobile</h3>
      <div class="tag-row">
        <span class="tag">Flutter</span>
      </div>
    </div>

    <div class="skill-group">
      <h3 class="skill-group-label">Databases</h3>
      <div class="tag-row">
        <span class="tag">MySQL</span><span class="tag">MongoDB</span><span class="tag">AWS DynamoDB</span>
      </div>
    </div>

    <div class="skill-group">
      <h3 class="skill-group-label">Messaging</h3>
      <div class="tag-row">
        <span class="tag">RabbitMQ</span><span class="tag">Google Pub/Sub</span><span class="tag">AWS SQS</span>
      </div>
    </div>

    <div class="skill-group">
      <h3 class="skill-group-label">Version Control</h3>
      <div class="tag-row">
        <span class="tag">GitHub</span><span class="tag">GitLab</span>
      </div>
    </div>

  </div>
</section>
```

- [ ] **Step 2: Append skills styles to `style.css`**

```css
/* ── Skills ─────────────────────────────────────────────── */
.skills-list { display: flex; flex-direction: column; gap: 1rem; }
.skill-group { display: flex; flex-direction: column; gap: 0.5rem; }
.skill-group-label {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}
.tag-row { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.tag {
  display: inline-block;
  padding: 0.25rem 0.7rem;
  background: var(--tag-bg);
  color: var(--tag-text);
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 500;
  transition: background var(--transition), color var(--transition);
}
.tag:hover { background: var(--accent); color: #fff; }
```

- [ ] **Step 3: Verify skills section**

Expected: 9 skill groups, each with a gray uppercase label and a row of blue pill tags that darken on hover.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add skills section with categorized tag groups"
```

---

### Task 5: Experience section

**Files:**
- Modify: `index.html` — fill `<section id="experience">`
- Modify: `style.css` — append experience/timeline styles

- [ ] **Step 1: Replace `<section id="experience">` in `index.html`**

```html
<section id="experience" class="section-card">
  <h2 class="section-title">Experience</h2>
  <div class="timeline">

    <!-- FPT Software -->
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-body">
        <div class="timeline-header">
          <div>
            <h3 class="company-name">FPT Software</h3>
            <span class="company-period">Aug 2025 – Now</span>
          </div>
        </div>

        <div class="role-block">
          <div class="role-header">
            <span class="role-title">Cloud Engineer</span>
            <span class="role-period">Aug 2025 – Now</span>
          </div>
          <ul class="duty-list">
            <li>Developed APIs for frontend-backend communication, ensuring security and efficiency.</li>
            <li>Set up CI/CD pipelines for automatic code integrations and efficient deployments.</li>
            <li>Managed and monitored cloud infrastructure to ensure 99% uptime.</li>
            <li>Implemented IaC setups using CloudFormation and AWS CDK to automate infrastructure provisioning.</li>
            <li>Designed AWS Step Functions state machines and AWS Glue jobs for complex ETL workflows.</li>
          </ul>
          <div class="tech-row">
            <span class="tag">Golang</span><span class="tag">Python</span><span class="tag">Docker</span>
            <span class="tag">AWS DynamoDB</span><span class="tag">Microservices</span><span class="tag">AWS Lambda</span>
            <span class="tag">AWS CloudFormation</span><span class="tag">AWS StepFunction</span><span class="tag">AWS CDK</span>
            <span class="tag">Buildkite</span><span class="tag">AWS EKS</span><span class="tag">ArgoCD</span>
            <span class="tag">Helm</span><span class="tag">AWS Code Series</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Infodation Viet Nam -->
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-body">
        <div class="timeline-header">
          <div>
            <h3 class="company-name">Infodation Viet Nam</h3>
            <span class="company-period">May 2021 – Jun 2025</span>
          </div>
        </div>

        <div class="role-block">
          <div class="role-header">
            <span class="role-title">Software Engineer — Vietnam</span>
            <span class="role-period">May 2021 – Jun 2025</span>
          </div>
          <ul class="duty-list">
            <li>Designed scalable, maintainable technical solutions and led technical decision-making for feature implementation.</li>
            <li>Developed APIs for frontend-backend communication, ensuring security and efficiency.</li>
            <li>Configured and maintained Kubernetes clusters to optimize application scaling and resilience.</li>
            <li>Implemented Terraform setups to automate and standardize infrastructure provisioning.</li>
            <li>Set up CI/CD pipelines and managed cloud infrastructure to ensure 99% uptime.</li>
          </ul>
        </div>

        <div class="role-block role-block--secondary">
          <div class="role-header">
            <span class="role-title">Technical Support Engineer — onsite Netherlands</span>
            <span class="role-period">May 2024 – Aug 2024 · 3 months</span>
          </div>
          <ul class="duty-list">
            <li>Facilitated communication and collaboration between Vietnam and Netherlands teams.</li>
            <li>Investigated and resolved technical issues, identifying root causes and implementing solutions.</li>
            <li>Provided guidance and support to clients throughout the issue resolution process.</li>
          </ul>
        </div>

        <div class="tech-row">
          <span class="tag">.NET 6</span><span class="tag">.NET Core 3.1</span><span class="tag">MySQL</span>
          <span class="tag">MongoDB</span><span class="tag">Docker</span><span class="tag">Kubernetes</span>
          <span class="tag">Helm</span><span class="tag">FluxCD</span><span class="tag">Microservices</span>
          <span class="tag">Terraform</span><span class="tag">GCP</span>
        </div>
      </div>
    </div>

    <!-- DAO Entertainment -->
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-body">
        <div class="timeline-header">
          <div>
            <h3 class="company-name">DAO Entertainment</h3>
            <span class="company-period">Nov 2021 – Now</span>
          </div>
        </div>

        <div class="role-block">
          <div class="role-header">
            <span class="role-title">Cloud Engineer</span>
            <span class="role-period">Nov 2021 – Now</span>
          </div>
          <ul class="duty-list">
            <li>Collaborated with developers to design system architectures supporting business requirements.</li>
            <li>Developed APIs for web portals and integrated third-party APIs to extend service offerings.</li>
            <li>Configured and maintained Kubernetes clusters for optimized deployment, scaling, and management.</li>
            <li>Implemented Terraform setups to automate and standardize infrastructure provisioning.</li>
            <li>Managed verification and deployment processes, ensuring reliable system updates and releases.</li>
          </ul>
          <div class="tech-row">
            <span class="tag">.NET 6</span><span class="tag">Node.js</span><span class="tag">Strapi</span>
            <span class="tag">NestJS</span><span class="tag">MongoDB</span><span class="tag">Microservices</span>
            <span class="tag">Docker</span><span class="tag">AWS EKS</span><span class="tag">AWS ECS</span>
            <span class="tag">Helm</span><span class="tag">FluxCD</span><span class="tag">Kubernetes</span>
            <span class="tag">GCP Cloud Run</span><span class="tag">GCP Scheduler</span><span class="tag">GCP Pub/Sub</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>
```

- [ ] **Step 2: Append experience/timeline styles to `style.css`**

```css
/* ── Experience / Timeline ──────────────────────────────── */
.timeline { display: flex; flex-direction: column; gap: 0; }
.timeline-item {
  display: flex;
  gap: 1rem;
  position: relative;
  padding-bottom: 2rem;
}
.timeline-item:last-child { padding-bottom: 0; }
.timeline-item::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 16px;
  bottom: 0;
  width: 2px;
  background: var(--timeline-line);
}
.timeline-item:last-child::before { display: none; }
.timeline-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--surface);
  outline: 2px solid var(--accent);
  flex-shrink: 0;
  margin-top: 0.2rem;
  z-index: 1;
}
.timeline-body { flex: 1; min-width: 0; }
.timeline-header { margin-bottom: 0.75rem; }
.company-name { font-size: 1rem; font-weight: 700; color: var(--text-primary); }
.company-period { font-size: 0.78rem; color: var(--text-secondary); display: block; margin-top: 0.1rem; }

.role-block { margin-bottom: 1rem; }
.role-block--secondary {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px dashed var(--border);
}
.role-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}
.role-title { font-size: 0.88rem; font-weight: 600; color: var(--accent); }
.role-period { font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap; }
.duty-list {
  list-style: disc;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.duty-list li { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.55; }
.tech-row { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.75rem; }
```

- [ ] **Step 3: Verify experience section**

Expected: Three timeline entries connected by a left vertical line with blue dots. Each shows company name, period, role(s), duties, and tech tags. Infodation has two role blocks separated by a dashed line.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add experience section with three-employer timeline"
```

---

### Task 6: Projects section

**Files:**
- Modify: `index.html` — fill `<section id="projects">`
- Modify: `style.css` — append projects styles

- [ ] **Step 1: Replace `<section id="projects">` in `index.html`**

```html
<section id="projects" class="section-card">
  <h2 class="section-title">Projects</h2>
  <div class="projects-grid">

    <!-- LFS – Realtime Payments -->
    <div class="project-card">
      <div class="project-card-header">
        <div>
          <h3 class="project-name">LFS – Realtime Payments</h3>
          <span class="project-period">Aug 2025 – Now</span>
        </div>
        <span class="project-role-badge">Cloud Engineer</span>
      </div>
      <div class="project-meta-row">
        <span class="project-meta-item"><i class="fas fa-building"></i> Latitude Financial Services</span>
        <span class="project-meta-item"><i class="fas fa-users"></i> Team: 15</span>
      </div>
      <p class="project-desc">
        Spearheaded the development and integration of third-party payment processing using Westpac QuickStream,
        enhancing the platform's real-time financial transaction handling.
      </p>
      <ul class="project-duties">
        <li>Integrated Westpac QuickStream 3rd-party payment API.</li>
        <li>Implemented AWS CloudFormation setups to automate infrastructure provisioning.</li>
        <li>Set up CI/CD pipelines via Buildkite for automated deployments.</li>
        <li>Managed and monitored AWS infrastructure to ensure 99% uptime.</li>
      </ul>
      <div class="tag-row">
        <span class="tag">Golang</span><span class="tag">Docker</span><span class="tag">AWS DynamoDB</span>
        <span class="tag">AWS Lambda</span><span class="tag">AWS ECS</span><span class="tag">AWS SQS</span>
        <span class="tag">AWS CloudFormation</span><span class="tag">AWS CDK</span><span class="tag">Buildkite</span>
      </div>
      <a href="https://www.latitudefinancial.com.au" target="_blank" rel="noopener noreferrer" class="project-link">
        <i class="fas fa-external-link-alt"></i> Visit Website
      </a>
    </div>

    <!-- PdM Cloud -->
    <div class="project-card">
      <div class="project-card-header">
        <div>
          <h3 class="project-name">PdM Cloud</h3>
          <span class="project-period">Dec 2025 – Now</span>
        </div>
        <span class="project-role-badge">Cloud Engineer</span>
      </div>
      <div class="project-meta-row">
        <span class="project-meta-item"><i class="fas fa-building"></i> Konica Minolta</span>
        <span class="project-meta-item"><i class="fas fa-users"></i> Team: 5</span>
      </div>
      <p class="project-desc">
        Re-architected a legacy predictive maintenance system into a fully AWS-native serverless and containerized solution,
        using two ML models for batch printer lifespan prediction and real-time image diagnostics.
      </p>
      <ul class="project-duties">
        <li>Architected and provisioned entire AWS infrastructure from scratch using CloudFormation.</li>
        <li>Designed AWS Step Functions state machines to orchestrate ETL workflows and Glue jobs.</li>
        <li>Deployed real-time image diagnostics model on Amazon ECS (Fargate) for low-latency inference.</li>
        <li>Built CI/CD pipeline using AWS Code Series (CodeCommit, CodeBuild, CodeDeploy, CodePipeline).</li>
      </ul>
      <div class="tag-row">
        <span class="tag">Python</span><span class="tag">Docker</span><span class="tag">AWS ECS</span>
        <span class="tag">AWS Lambda</span><span class="tag">AWS SQS</span><span class="tag">AWS CloudFormation</span>
        <span class="tag">AWS StepFunction</span><span class="tag">AWS Glue</span><span class="tag">AWS Code Series</span>
        <span class="tag">AWS S3</span>
      </div>
      <a href="https://www.konicaminolta.com" target="_blank" rel="noopener noreferrer" class="project-link">
        <i class="fas fa-external-link-alt"></i> Visit Website
      </a>
    </div>

    <!-- T24Parsing -->
    <div class="project-card">
      <div class="project-card-header">
        <div>
          <h3 class="project-name">T24Parsing</h3>
          <span class="project-period">Aug 2025 – Nov 2025</span>
        </div>
        <span class="project-role-badge">DevOps Engineer</span>
      </div>
      <div class="project-meta-row">
        <span class="project-meta-item"><i class="fas fa-building"></i> VPBank</span>
        <span class="project-meta-item"><i class="fas fa-users"></i> Team: 10</span>
      </div>
      <p class="project-desc">
        Joined the Digital Banking team to operate and expand a mature AWS EKS infrastructure, provisioning new microservices
        and ensuring reliability of critical banking data pipelines.
      </p>
      <ul class="project-duties">
        <li>Managed and expanded Terragrunt codebase to provision resources for new banking features.</li>
        <li>Administered production Amazon EKS clusters and tuned Karpenter autoscaling profiles.</li>
        <li>Optimized the Temenos T24 data ingestion pipeline for accurate parsing into DynamoDB and S3.</li>
        <li>Maintained CI/CD pipelines to ensure smooth deployment of new versions and infrastructure patches.</li>
      </ul>
      <div class="tag-row">
        <span class="tag">Python</span><span class="tag">Docker</span><span class="tag">AWS EKS</span>
        <span class="tag">AWS Lambda</span><span class="tag">AWS CloudFormation</span><span class="tag">AWS DynamoDB</span>
        <span class="tag">AWS S3</span><span class="tag">Terragrunt</span><span class="tag">Karpenter</span>
      </div>
      <a href="https://www.vpbank.com.vn" target="_blank" rel="noopener noreferrer" class="project-link">
        <i class="fas fa-external-link-alt"></i> Visit Website
      </a>
    </div>

    <!-- Fanvibe -->
    <div class="project-card">
      <div class="project-card-header">
        <div>
          <h3 class="project-name">Fanvibe</h3>
          <span class="project-period">Nov 2022 – Now</span>
        </div>
        <span class="project-role-badge">Cloud Engineer</span>
      </div>
      <div class="project-meta-row">
        <span class="project-meta-item"><i class="fas fa-building"></i> DAO Entertainment</span>
        <span class="project-meta-item"><i class="fas fa-users"></i> Team: 3</span>
      </div>
      <p class="project-desc">
        Enhanced evolution of DTOLink with richer third-party integrations, analytics, and a migration from plain Docker
        containers to AWS EKS/ECS and GCP Cloud Run.
      </p>
      <ul class="project-duties">
        <li>Migrated old environment from Docker containers to AWS EKS and AWS ECS.</li>
        <li>Set up environment on Google Cloud Run and Google Cloud Task.</li>
        <li>Implemented Terraform setups to automate infrastructure provisioning.</li>
        <li>Configured CI/CD for automated deployments across environments.</li>
      </ul>
      <div class="tag-row">
        <span class="tag">MongoDB</span><span class="tag">Microservices</span><span class="tag">Docker</span>
        <span class="tag">Kubernetes</span><span class="tag">Terraform</span><span class="tag">AWS EKS</span>
        <span class="tag">AWS ECS</span><span class="tag">AWS Lambda</span><span class="tag">GCP Cloud Run</span>
        <span class="tag">GCP Cloud Task</span>
      </div>
    </div>

    <!-- Kikker -->
    <div class="project-card">
      <div class="project-card-header">
        <div>
          <h3 class="project-name">Kikker</h3>
          <span class="project-period">May 2021 – Jun 2025</span>
        </div>
        <span class="project-role-badge">Software Engineer</span>
      </div>
      <div class="project-meta-row">
        <span class="project-meta-item"><i class="fas fa-building"></i> Kikker Energie B.V.</span>
        <span class="project-meta-item"><i class="fas fa-users"></i> Team: 25</span>
      </div>
      <p class="project-desc">
        Netherlands-based platform streamlining the selling and management of Electrics &amp; Gas services, including
        meter reading, automated billing, commission calculation, and payment processing.
      </p>
      <ul class="project-duties">
        <li>Designed scalable technical solutions and led feature implementation decision-making.</li>
        <li>Developed APIs and maintained database schema with performance optimizations.</li>
        <li>Configured and maintained Kubernetes cluster and implemented Terraform IaC.</li>
        <li>Set up CI/CD pipelines and managed cloud infrastructure for 99% uptime.</li>
      </ul>
      <div class="tag-row">
        <span class="tag">.NET 6</span><span class="tag">.NET Core 3.1</span><span class="tag">MySQL</span>
        <span class="tag">MongoDB</span><span class="tag">Docker</span><span class="tag">Kubernetes</span>
        <span class="tag">Helm</span><span class="tag">FluxCD</span><span class="tag">Terraform</span><span class="tag">GCP</span>
      </div>
      <a href="https://kikker.nl" target="_blank" rel="noopener noreferrer" class="project-link">
        <i class="fas fa-external-link-alt"></i> Visit Website
      </a>
    </div>

    <!-- DTOLink -->
    <div class="project-card">
      <div class="project-card-header">
        <div>
          <h3 class="project-name">DTOLink</h3>
          <span class="project-period">Nov 2020 – Nov 2022</span>
        </div>
        <span class="project-role-badge">Cloud Engineer</span>
      </div>
      <div class="project-meta-row">
        <span class="project-meta-item"><i class="fas fa-building"></i> DAO Entertainment</span>
        <span class="project-meta-item"><i class="fas fa-users"></i> Team: 3</span>
      </div>
      <p class="project-desc">
        Platform for artists and creators to craft music release and bio pages with real-time analytics.
        Integrates with Spotify, Apple Music, Deezer, and Songstats for rich audience insights.
      </p>
      <ul class="project-duties">
        <li>Designed system architecture supporting business requirements and user needs.</li>
        <li>Developed APIs for web portals and integrated third-party music service APIs.</li>
        <li>Set up environment for service deployment and CI/CD for automated deploys.</li>
        <li>Reviewed colleagues' code to maintain coding standards.</li>
      </ul>
      <div class="tag-row">
        <span class="tag">Node.js</span><span class="tag">Strapi</span><span class="tag">MongoDB</span>
        <span class="tag">RabbitMQ</span><span class="tag">Microservices</span><span class="tag">Docker</span>
      </div>
      <div class="project-links-row">
        <a href="https://dtolink.com" target="_blank" rel="noopener noreferrer" class="project-link">
          <i class="fas fa-external-link-alt"></i> dtolink.com
        </a>
        <a href="https://dbio.to/daoentertainment" target="_blank" rel="noopener noreferrer" class="project-link">
          <i class="fas fa-external-link-alt"></i> Example Bio
        </a>
      </div>
    </div>

  </div>
</section>
```

- [ ] **Step 2: Append project card styles to `style.css`**

```css
/* ── Projects ───────────────────────────────────────────── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.project-card {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 1.25rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: transform var(--transition), box-shadow var(--transition);
}
.project-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.project-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
}
.project-name { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); }
.project-period { font-size: 0.73rem; color: var(--text-secondary); display: block; margin-top: 0.15rem; }
.project-role-badge {
  flex-shrink: 0;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: 999px;
  white-space: nowrap;
}
.project-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.project-meta-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.76rem;
  color: var(--text-secondary);
}
.project-meta-item i { color: var(--accent); font-size: 0.7rem; }
.project-desc { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.6; }
.project-duties {
  list-style: disc;
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}
.project-duties li { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; }
.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--accent);
  transition: color var(--transition);
}
.project-link:hover { color: var(--accent-dark); }
.project-link i { font-size: 0.7rem; }
.project-links-row { display: flex; gap: 0.75rem; flex-wrap: wrap; }
```

- [ ] **Step 3: Verify projects section**

Expected: 6 project cards in a 2-column grid. Each card has project name, period, role badge (top right), customer and team size row, description, 4 duties, tech tags, and a link where applicable. Cards lift slightly on hover.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add projects section with six project cards"
```

---

### Task 7: Education, Certifications, Honors, Contact sections

**Files:**
- Modify: `index.html` — fill `<section id="education">` and `<section id="contact">`
- Modify: `style.css` — append styles for these sections

- [ ] **Step 1: Replace `<section id="education">` in `index.html`**

```html
<section id="education" class="section-card">
  <h2 class="section-title">Education & Certifications</h2>

  <!-- Education -->
  <div class="edu-block">
    <h3 class="edu-org">Telecommunication University</h3>
    <div class="edu-detail-row">
      <span class="edu-detail">Major: Software Engineering</span>
      <span class="edu-period">Oct 2017 – May 2021</span>
    </div>
    <span class="gpa-badge">GPA: 3.6 / 4.0</span>
  </div>

  <!-- Certifications -->
  <h3 class="subsection-title">Certifications</h3>
  <div class="cert-list">
    <div class="cert-item">
      <div class="cert-icon"><i class="fas fa-certificate"></i></div>
      <div class="cert-body">
        <span class="cert-name">Certified DevOps Generalist™ (DevOps-GEN™)</span>
        <span class="cert-year">2025</span>
      </div>
    </div>
    <div class="cert-item">
      <div class="cert-icon"><i class="fas fa-certificate"></i></div>
      <div class="cert-body">
        <span class="cert-name">Infodation Scrum Master</span>
        <span class="cert-year">2023</span>
      </div>
    </div>
  </div>

  <!-- Honors -->
  <h3 class="subsection-title">Honors & Awards</h3>
  <div class="cert-list">
    <div class="cert-item">
      <div class="cert-icon cert-icon--gold"><i class="fas fa-trophy"></i></div>
      <div class="cert-body">
        <span class="cert-name">Star of the Year</span>
        <span class="cert-year">Infodation · 2023</span>
      </div>
    </div>
  </div>

</section>
```

- [ ] **Step 2: Replace `<section id="contact">` in `index.html`**

```html
<section id="contact" class="section-card">
  <h2 class="section-title">Contact</h2>
  <div class="contact-grid">

    <a href="mailto:htthinh1999@gmail.com" class="contact-card">
      <div class="contact-card-icon"><i class="fas fa-envelope"></i></div>
      <div class="contact-card-body">
        <span class="contact-card-label">Email</span>
        <span class="contact-card-value">htthinh1999@gmail.com</span>
      </div>
    </a>

    <a href="tel:+84977393641" class="contact-card">
      <div class="contact-card-icon"><i class="fas fa-phone"></i></div>
      <div class="contact-card-body">
        <span class="contact-card-label">Phone</span>
        <span class="contact-card-value">(+84) 977 393 641</span>
      </div>
    </a>

    <div class="contact-card contact-card--no-link">
      <div class="contact-card-icon"><i class="fas fa-map-marker-alt"></i></div>
      <div class="contact-card-body">
        <span class="contact-card-label">Location</span>
        <span class="contact-card-value">Nha Trang, Vietnam</span>
      </div>
    </div>

  </div>

  <div class="social-buttons">
    <a href="https://linkedin.com/in/htthinh1999" target="_blank" rel="noopener noreferrer" class="social-btn social-btn--linkedin">
      <i class="fab fa-linkedin"></i> LinkedIn
    </a>
    <a href="https://github.com/htthinh1999" target="_blank" rel="noopener noreferrer" class="social-btn social-btn--github">
      <i class="fab fa-github"></i> GitHub
    </a>
    <a href="https://facebook.com/htthinh1999" target="_blank" rel="noopener noreferrer" class="social-btn social-btn--facebook">
      <i class="fab fa-facebook"></i> Facebook
    </a>
  </div>
</section>
```

- [ ] **Step 3: Append education + contact styles to `style.css`**

```css
/* ── Education ──────────────────────────────────────────── */
.edu-block {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  margin-bottom: 1.25rem;
}
.edu-org { font-size: 0.95rem; font-weight: 700; color: var(--text-primary); }
.edu-detail-row { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.25rem; }
.edu-detail { font-size: 0.82rem; color: var(--text-secondary); }
.edu-period { font-size: 0.78rem; color: var(--text-secondary); }
.gpa-badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: var(--accent-light);
  color: var(--accent);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  align-self: flex-start;
}

.subsection-title {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 1rem 0 0.6rem;
}
.cert-list { display: flex; flex-direction: column; gap: 0.5rem; }
.cert-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
}
.cert-icon {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: var(--accent-light);
  color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem;
  flex-shrink: 0;
}
.cert-icon--gold { background: #fef9c3; color: #ca8a04; }
.cert-body { display: flex; flex-direction: column; gap: 0.1rem; }
.cert-name { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.cert-year { font-size: 0.75rem; color: var(--text-secondary); }

/* ── Contact ────────────────────────────────────────────── */
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;
  margin-bottom: 1.25rem;
}
.contact-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: border-color var(--transition), box-shadow var(--transition);
}
a.contact-card:hover { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-light); }
.contact-card-icon {
  width: 38px; height: 38px;
  border-radius: 50%;
  background: var(--accent-light);
  color: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.contact-card-body { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
.contact-card-label { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); }
.contact-card-value { font-size: 0.82rem; font-weight: 500; color: var(--text-primary); word-break: break-all; }

.social-buttons { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.social-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 600;
  transition: opacity var(--transition), transform var(--transition);
  color: #fff;
}
.social-btn:hover { opacity: 0.88; transform: translateY(-1px); }
.social-btn--linkedin { background: #0a66c2; }
.social-btn--github   { background: #24292e; }
.social-btn--facebook { background: #1877f2; }
```

- [ ] **Step 4: Verify education + contact**

Expected: Education card with GPA badge, two certification items, one award item with gold trophy icon. Contact section has 3 contact cards in a row, email/phone cards have hover glow. Three colored social buttons below.

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: add education, certifications, honors, and contact sections"
```

---

### Task 8: JavaScript — scroll-spy + mobile drawer

**Files:**
- Modify: `script.js` (full rewrite)

- [ ] **Step 1: Rewrite `script.js`**

```js
(function () {
  'use strict';

  /* ── Footer year ─────────────────────────────────────── */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Smooth scroll for nav links ─────────────────────── */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      const offset = window.innerWidth < 768 ? 64 : 0;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      // Close mobile drawer on nav click
      closeSidebar();
    });
  });

  /* ── Scroll-spy via IntersectionObserver ─────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));

  /* ── Mobile drawer ───────────────────────────────────── */
  const sidebar      = document.getElementById('sidebar');
  const hamburger    = document.getElementById('hamburger');
  const backdrop     = document.getElementById('drawerBackdrop');

  function openSidebar() {
    sidebar.classList.add('sidebar--open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('sidebar--open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openSidebar);
  if (backdrop)  backdrop.addEventListener('click', closeSidebar);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSidebar();
  });
})();
```

- [ ] **Step 2: Verify scroll-spy**

Scroll down through all sections slowly. Expected: the active `.nav-link` in the sidebar highlights as each section enters view. The highlight changes as you cross section boundaries.

- [ ] **Step 3: Verify smooth scroll**

Click each nav link. Expected: smooth animated scroll to the target section.

- [ ] **Step 4: Commit**

```bash
git add script.js
git commit -m "feat: add scroll-spy via IntersectionObserver and mobile drawer logic"
```

---

### Task 9: Responsive styles — tablet + mobile

**Files:**
- Modify: `style.css` — append responsive breakpoints

- [ ] **Step 1: Append responsive styles to `style.css`**

```css
/* ── Responsive: tablet (768px – 1023px) ────────────────── */
@media (max-width: 1023px) {
  .sidebar { width: var(--sidebar-narrow); }
  .sidebar-inner {
    width: var(--sidebar-narrow);
    padding: 1rem 0.5rem;
    align-items: center;
  }
  .sidebar-name, .sidebar-role, .open-badge,
  .contact-row span, .social-link span,
  .nav-link span, .download-cv-btn span {
    display: none;
  }
  .sidebar-profile { padding-bottom: 0.75rem; }
  .sidebar-photo-wrap { width: 38px; height: 38px; }
  .contact-row, .social-link {
    justify-content: center;
    padding: 0.4rem 0;
  }
  .contact-row i, .social-link i { width: auto; }
  .nav-link { justify-content: center; padding: 0.6rem 0; }
  .nav-link i { width: auto; font-size: 1rem; }
  .download-cv-btn { padding: 0.6rem 0; justify-content: center; }
  .download-cv-btn i { font-size: 1rem; }

  .main-content { margin-left: var(--sidebar-narrow); padding: 1.5rem; }
  .site-footer { margin-left: var(--sidebar-narrow); }

  .projects-grid { grid-template-columns: repeat(2, 1fr); }
  .specialties-grid { grid-template-columns: repeat(2, 1fr); }
}

/* ── Responsive: mobile (<768px) ────────────────────────── */
@media (max-width: 767px) {
  .mobile-topbar { display: flex; }

  .sidebar {
    width: var(--sidebar-width);
    top: 56px;
    height: calc(100vh - 56px);
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    box-shadow: none;
  }
  .sidebar.sidebar--open {
    transform: translateX(0);
    box-shadow: var(--shadow-md);
  }
  .sidebar-inner {
    width: var(--sidebar-width);
    padding: 1.5rem 1rem 2rem;
    align-items: unset;
  }
  /* Show all text again in open mobile drawer */
  .sidebar-name, .sidebar-role, .open-badge,
  .contact-row span, .social-link span,
  .nav-link span, .download-cv-btn span {
    display: unset;
  }
  .sidebar-photo-wrap { width: 88px; height: 88px; }
  .sidebar-profile { align-items: center; }

  .drawer-backdrop { display: block; opacity: 0; pointer-events: none; transition: opacity 0.25s ease; }
  .drawer-backdrop.active { opacity: 1; pointer-events: auto; }

  .main-content { margin-left: 0; padding: 1rem; padding-top: calc(56px + 1rem); }
  .site-footer { margin-left: 0; }

  .projects-grid { grid-template-columns: 1fr; }
  .specialties-grid { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; }

  .role-header { flex-direction: column; gap: 0.1rem; }
}

/* ── Responsive: large desktop (≥1280px) ────────────────── */
@media (min-width: 1280px) {
  .main-content { padding: 2.5rem 3rem; }
}
```

- [ ] **Step 2: Verify tablet layout**

Resize browser to 900px wide. Expected: sidebar collapses to ~56px icon strip — only icons visible (no text). Main content fills remaining space. Hovering nav icons still shows cursor pointer. Projects remain in 2-column grid.

- [ ] **Step 3: Verify mobile layout**

Resize browser to 375px wide. Expected: mobile top bar appears ("Huynh Tan Thinh" + hamburger). Sidebar hidden. Tap hamburger → drawer slides in from left. Tap backdrop → drawer closes. Projects become 1-column.

- [ ] **Step 4: Commit**

```bash
git add style.css
git commit -m "feat: add responsive styles for tablet and mobile breakpoints"
```

---

### Task 10: Entrance animations + final polish

**Files:**
- Modify: `style.css` — append animation + polish styles
- Modify: `index.html` — update JSON-LD structured data

- [ ] **Step 1: Append animation styles to `style.css`**

```css
/* ── Entrance animations ─────────────────────────────────── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.section-card {
  animation: fadeInUp 0.4s ease both;
}
.section-card:nth-child(1) { animation-delay: 0.05s; }
.section-card:nth-child(2) { animation-delay: 0.10s; }
.section-card:nth-child(3) { animation-delay: 0.15s; }
.section-card:nth-child(4) { animation-delay: 0.20s; }
.section-card:nth-child(5) { animation-delay: 0.25s; }
.section-card:nth-child(6) { animation-delay: 0.30s; }

/* ── Scrollbar styling ───────────────────────────────────── */
.sidebar::-webkit-scrollbar { width: 4px; }
.sidebar::-webkit-scrollbar-track { background: transparent; }
.sidebar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

/* ── Focus accessibility ─────────────────────────────────── */
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

/* ── Selection color ─────────────────────────────────────── */
::selection { background: var(--accent-light); color: var(--accent-dark); }
```

- [ ] **Step 2: Update JSON-LD in `index.html` `<head>`**

Find the existing `<script type="application/ld+json">` block (if present from old site) or add after the `<meta name="theme-color">` line:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Huynh Tan Thinh",
  "jobTitle": "Software Engineer",
  "url": "https://htthinh1999.github.io/",
  "image": "https://htthinh1999.github.io/profile-photo.jpeg",
  "email": "htthinh1999@gmail.com",
  "telephone": "+84977393641",
  "sameAs": [
    "https://linkedin.com/in/htthinh1999",
    "https://github.com/htthinh1999",
    "https://facebook.com/htthinh1999"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "FPT Software"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Telecommunication University"
  }
}
</script>
```

- [ ] **Step 3: Final visual check — full page review**

Open `index.html` in a browser and verify:
- [ ] Sidebar profile photo is circular and crisp
- [ ] "Open to Work" green badge visible
- [ ] All 6 nav links scroll to correct sections
- [ ] Active nav link highlights when scrolling
- [ ] Summary: 8 specialty cards in 2-column grid
- [ ] Skills: 9 groups with tags, tags change color on hover
- [ ] Experience: 3 timeline entries, Infodation has 2 role blocks
- [ ] Projects: 6 cards in 2-column grid, cards lift on hover
- [ ] Education: university card + 2 certs + 1 award
- [ ] Contact: 3 contact cards + 3 social buttons
- [ ] Footer shows current year
- [ ] Resize to 900px: sidebar icon-strip mode
- [ ] Resize to 375px: mobile top bar + hamburger drawer
- [ ] Download CV button opens/downloads the PDF

- [ ] **Step 4: Final commit**

```bash
git add index.html style.css
git commit -m "feat: add entrance animations, accessibility, and structured data polish"
```

---

### Task 11: Deploy to GitHub Pages

**Files:** None modified — push existing commits.

- [ ] **Step 1: Verify git log looks clean**

```bash
git log --oneline -10
```

Expected: 10 commits showing each task's feature commit.

- [ ] **Step 2: Push to main**

```bash
git push origin main
```

- [ ] **Step 3: Verify live site**

Open `https://htthinh1999.github.io` in a browser (allow 1–2 minutes for GitHub Pages to rebuild).

Expected: Live site matches the local version — sidebar layout, all sections visible, responsive behavior works on mobile.
