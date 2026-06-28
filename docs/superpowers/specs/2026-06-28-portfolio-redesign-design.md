# Portfolio Website Redesign — Design Spec

**Date:** 2026-06-28  
**Author:** Huynh Tan Thinh  
**Status:** Approved

---

## Overview

Full redesign of the GitHub Pages portfolio at `htthinh1999.github.io` to reflect the updated CV (FPT Software role, 4 new projects, expanded skills, new certification). The site is a static single-file deployment (HTML + CSS + JS) with no build step.

---

## Visual Style

- **Background:** `#f8fafc` (light gray page)
- **Sidebar + cards:** `#ffffff` with `box-shadow: 0 1px 3px rgba(0,0,0,0.08)`
- **Primary accent:** `#2563eb` (blue) — buttons, active nav, links, timeline dots
- **Text primary:** `#0f172a`
- **Text secondary:** `#64748b` — dates, subtitles, metadata
- **Tech tags:** `#eff6ff` background + `#1d4ed8` text (soft blue pills)
- **Timeline line:** `#e2e8f0`
- **Font:** Inter (Google Fonts) — 700 for name, 600 for section headings, 400 for body
- **Body size:** 14–15px; Section headings: 20px; Name: 22px

---

## Layout

### Desktop (≥1024px)

```
┌──────────────────────┬────────────────────────────────────────┐
│  SIDEBAR (260px)     │  MAIN CONTENT (scrollable)             │
│  fixed, full height  │  max-width 800px, centered, padding    │
│                      │                                        │
│  [profile photo]     │  ┌──────────────────────────────────┐  │
│  Huynh Tan Thinh     │  │  SUMMARY SECTION (card)          │  │
│  Software Engineer   │  └──────────────────────────────────┘  │
│  Open to Work badge  │  ┌──────────────────────────────────┐  │
│                      │  │  SKILLS SECTION (card)           │  │
│  📞 phone            │  └──────────────────────────────────┘  │
│  ✉  email            │  ┌──────────────────────────────────┐  │
│  📍 location         │  │  EXPERIENCE (card, timeline)     │  │
│                      │  └──────────────────────────────────┘  │
│  [LinkedIn]          │  ┌──────────────────────────────────┐  │
│  [GitHub]            │  │  PROJECTS (card grid)            │  │
│  [Facebook]          │  └──────────────────────────────────┘  │
│                      │  ┌──────────────────────────────────┐  │
│  ── Navigation ──    │  │  EDUCATION / CERTS / HONORS      │  │
│  Summary             │  └──────────────────────────────────┘  │
│  Skills              │  ┌──────────────────────────────────┐  │
│  Experience          │  │  CONTACT                         │  │
│  Projects            │  └──────────────────────────────────┘  │
│  Education           │                                        │
│  Contact             │                                        │
│                      │                                        │
│  [↓ Download CV]     │                                        │
└──────────────────────┴────────────────────────────────────────┘
```

### Tablet (768px–1023px)

Sidebar narrows to icons-only (56px), hovering expands it as an overlay tooltip. Main content fills remaining space.

### Mobile (<768px)

Sidebar hidden. Fixed top bar shows name + hamburger button. Tapping hamburger opens a full-height slide-in drawer containing the sidebar content.

---

## Sections & Content

### 1. Summary

- Intro paragraph: "More than 5 years of experience in Software Engineering, designing, developing, and managing robust and scalable infrastructure."
- Specialties as icon-tagged highlight items (6–8 items): IaC, Containerization & Orchestration, CI/CD, Cloud Platforms, Backend Development, Database Management, Agile, Problem-Solving

### 2. Skills

Grouped tag-cloud layout. Each group has a label and a row of pill tags.

| Category | Tags |
|---|---|
| DevOps | Docker, Helm, Kubernetes, Terraform, CloudFormation, CI/CD, FluxCD, ArgoCD, Buildkite |
| Cloud | GCP (GKE, Cloud Run, Cloud Function, Pub/Sub, Cloud Storage), AWS (EKS, ECS, Lambda, ECR, S3, CDK, DynamoDB, StepFunction, Glue, SQS) |
| Backend | C#, .NET Core 3.1, .NET 6/8, Node.js, NestJS, Strapi, Golang, Python, Microservices |
| Frontend | HTML, CSS, JS, jQuery, Bootstrap |
| Mobile | Flutter |
| Databases | MySQL, MongoDB, AWS DynamoDB |
| Messaging | RabbitMQ, Google Pub/Sub, AWS SQS |
| Version Control | GitHub, GitLab |

### 3. Experience

Vertical timeline (left-aligned line with dot markers).

**FPT Software** · Aug 2025 – Now  
Role: Cloud Engineer  
Technologies: Golang · Python · Docker · AWS DynamoDB · Microservices · AWS Lambda · AWS CloudFormation · AWS StepFunction · AWS CDK · Buildkite · AWS EKS · ArgoCD · Helm · AWS Code Series

**Infodation Viet Nam** · May 2021 – Jun 2025  
Roles:
- Software Engineer – Vietnam (May 2021 – Jun 2025)
- Technical Support Engineer – onsite Netherlands (May 2024 – Aug 2024, 3 months)

Technologies: .NET 6 · .NET Core 3.1 · MySQL · MongoDB · Docker · Kubernetes · Helm · FluxCD · Microservices · Terraform · GCP

**DAO Entertainment** · Nov 2021 – Now  
Role: Cloud Engineer  
Technologies: .NET 6 · Node.js · Strapi · NestJS · MongoDB · Microservices · Docker · AWS EKS · AWS ECS · Helm · FluxCD · Kubernetes · GCP Cloud Run · GCP Scheduler · GCP Pub/Sub

### 4. Projects

2-column card grid on desktop, 1-column on mobile. Each card contains: project name, date range, customer, team size, role badge, description, key duties (4–5 bullet points shown directly), tech tags row, optional "Visit Website" link.

| Project | Customer | Period | Role | Link |
|---|---|---|---|---|
| LFS – Realtime Payments | Latitude Financial Services | Aug 2025 – Now | Cloud Engineer | latitudefinancial.com.au |
| PdM Cloud | Konica Minolta | Dec 2025 – Now | Cloud Engineer | konicaminolta.com |
| T24Parsing | VPBank | Aug 2025 – Nov 2025 | DevOps Engineer | vpbank.com.vn |
| Fanvibe | DAO Entertainment | Nov 2022 – Now | Cloud Engineer | — |
| Kikker | Kikker Energie B.V. | May 2021 – Jun 2025 | Software Engineer | kikker.nl |
| DTOLink | DAO Entertainment | Nov 2020 – Nov 2022 | Cloud Engineer | dtolink.com |

### 5. Education

**Telecommunication University** · Oct 2017 – May 2021  
Major: Software Engineering · GPA: 3.6/4

### 6. Certifications

- Certified DevOps Generalist™ (DevOps-GEN™) · 2025
- Infodation Scrum Master · 2023

### 7. Honors & Awards

- Star of the Year · Infodation · 2023

### 8. Contact

- Email: htthinh1999@gmail.com
- Phone: (+84) 977 393 641
- Location: Nha Trang, Vietnam
- Social: LinkedIn, GitHub, Facebook

---

## Interactions

- **Smooth scroll** — clicking nav links scrolls to target section
- **Scroll-spy** — active nav item updates as section enters viewport (IntersectionObserver)
- **Fade-in-up** — CSS `@keyframes` entrance animation per section (no heavy JS library)
- **Project card hover** — `transform: translateY(-2px)` + shadow deepens
- **Tech tag hover** — slight darkening of background
- **Mobile drawer** — slide-in sidebar, backdrop overlay closes it on tap

---

## File Structure

All changes are in the existing three files — no new files needed:

```
index.html     ← full rewrite of HTML structure
style.css      ← full rewrite of styles
script.js      ← scroll-spy + mobile drawer logic
profile-photo.jpeg  ← unchanged
SoftwareEngineer_HuynhTanThinh.pdf  ← unchanged
```

---

## Constraints

- Static files only (GitHub Pages — no build step, no Node, no bundler)
- External resources allowed: Google Fonts (Inter), Font Awesome CDN
- Must work without JavaScript for basic readability (progressive enhancement)
- No contact form (static site — email/phone links only)
