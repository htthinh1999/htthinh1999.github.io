(function () {
  'use strict';

  /* ── Footer year ─────────────────────────────────────── */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Translations ────────────────────────────────────── */
  const translations = {
    en: {
      'nav.summary': 'Summary', 'nav.skills': 'Skills', 'nav.experience': 'Experience',
      'nav.projects': 'Projects', 'nav.education': 'Education', 'nav.contact': 'Contact',
      'sidebar.role': 'Software Engineer', 'sidebar.openToWork': 'Open to Work',
      'sidebar.downloadCV': 'Download CV', 'mobile.role': 'Software Engineer',
      'section.summary': 'Summary', 'section.skills': 'Technical Skills',
      'section.experience': 'Experience', 'section.projects': 'Projects',
      'section.education': 'Education & Certifications', 'section.contact': 'Contact',
      'summary.intro': 'More than 5 years of working experience in Software Engineering — designing, developing, and managing robust and scalable infrastructure. Proficient in a wide range of DevOps tools and cloud platforms. Experienced in both Google Cloud Platform (GCP) and Amazon Web Service (AWS) environments. Proficient in English.',
      'specialty.iac': 'Infrastructure as Code',
      'specialty.iac.desc': 'Terraform, AWS CloudFormation, AWS CDK',
      'specialty.container': 'Containerization & Orchestration',
      'specialty.container.desc': 'Docker, Kubernetes, Helm',
      'specialty.cicd': 'CI/CD Pipelines',
      'specialty.cicd.desc': 'GitHub Actions, Buildkite, FluxCD, ArgoCD',
      'specialty.cloud': 'Cloud Platforms',
      'specialty.cloud.desc': 'GCP (GKE, Cloud Run, Pub/Sub) · AWS (EKS, ECS, Lambda)',
      'specialty.backend': 'Backend Development',
      'specialty.backend.desc': 'C#, .NET 6/8, Node.js, Golang, Python, Microservices',
      'specialty.database': 'Database Management',
      'specialty.database.desc': 'MySQL, MongoDB, AWS DynamoDB',
      'specialty.agile': 'Agile Methodologies',
      'specialty.agile.desc': 'Cross-functional team collaboration, Scrum',
      'specialty.problem': 'Problem-Solving',
      'specialty.problem.desc': 'Root cause analysis, analytical troubleshooting',
      'edu.certs': 'Certifications', 'edu.honors': 'Honors & Awards',
      'contact.email': 'Email', 'contact.phone': 'Phone', 'contact.location': 'Location',
      'contact.location.value': 'Nha Trang, Vietnam',
      'footer.copy': 'Huynh Tan Thinh. All rights reserved.',
    },
    vi: {
      'nav.summary': 'Giới thiệu', 'nav.skills': 'Kỹ năng', 'nav.experience': 'Kinh nghiệm',
      'nav.projects': 'Dự án', 'nav.education': 'Học vấn', 'nav.contact': 'Liên hệ',
      'sidebar.role': 'Kỹ sư phần mềm', 'sidebar.openToWork': 'Sẵn sàng làm việc',
      'sidebar.downloadCV': 'Tải CV', 'mobile.role': 'Kỹ sư phần mềm',
      'section.summary': 'Giới thiệu', 'section.skills': 'Kỹ năng kỹ thuật',
      'section.experience': 'Kinh nghiệm làm việc', 'section.projects': 'Dự án',
      'section.education': 'Học vấn & Chứng chỉ', 'section.contact': 'Liên hệ',
      'summary.intro': 'Hơn 5 năm kinh nghiệm trong lĩnh vực Kỹ thuật phần mềm — thiết kế, phát triển và quản lý hạ tầng bền vững và có khả năng mở rộng. Thành thạo nhiều công cụ DevOps và nền tảng đám mây. Có kinh nghiệm làm việc với cả Google Cloud Platform (GCP) và Amazon Web Service (AWS). Thành thạo tiếng Anh.',
      'specialty.iac': 'Hạ tầng dưới dạng mã (IaC)',
      'specialty.iac.desc': 'Terraform, AWS CloudFormation, AWS CDK',
      'specialty.container': 'Container hóa & Điều phối',
      'specialty.container.desc': 'Docker, Kubernetes, Helm',
      'specialty.cicd': 'Quy trình CI/CD',
      'specialty.cicd.desc': 'GitHub Actions, Buildkite, FluxCD, ArgoCD',
      'specialty.cloud': 'Nền tảng đám mây',
      'specialty.cloud.desc': 'GCP (GKE, Cloud Run, Pub/Sub) · AWS (EKS, ECS, Lambda)',
      'specialty.backend': 'Phát triển Backend',
      'specialty.backend.desc': 'C#, .NET 6/8, Node.js, Golang, Python, Microservices',
      'specialty.database': 'Quản lý cơ sở dữ liệu',
      'specialty.database.desc': 'MySQL, MongoDB, AWS DynamoDB',
      'specialty.agile': 'Phương pháp Agile',
      'specialty.agile.desc': 'Làm việc nhóm liên chức năng, Scrum',
      'specialty.problem': 'Giải quyết vấn đề',
      'specialty.problem.desc': 'Phân tích nguyên nhân gốc, xử lý sự cố',
      'edu.certs': 'Chứng chỉ', 'edu.honors': 'Thành tích & Giải thưởng',
      'contact.email': 'Email', 'contact.phone': 'Điện thoại', 'contact.location': 'Địa chỉ',
      'contact.location.value': 'Nha Trang, Việt Nam',
      'footer.copy': 'Huynh Tan Thinh. Bảo lưu mọi quyền.',
    }
  };

  /* ── Theme toggle ────────────────────────────────────── */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const isDark = theme === 'dark';
    document.querySelectorAll('.theme-icon').forEach(el => {
      el.className = isDark ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon';
    });
  }

  applyTheme(localStorage.getItem('theme') || 'light');

  document.addEventListener('click', e => {
    if (e.target.closest('[data-theme-toggle]')) {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    }
  });

  /* ── Language toggle ─────────────────────────────────── */
  function applyLang(lang) {
    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = translations[lang] && translations[lang][key];
      if (val !== undefined) el.textContent = val;
    });
    document.querySelectorAll('.lang-label').forEach(el => {
      el.textContent = lang === 'en' ? 'VI' : 'EN';
    });
  }

  applyLang(localStorage.getItem('lang') || 'en');

  document.addEventListener('click', e => {
    if (e.target.closest('[data-lang-toggle]')) {
      const current = localStorage.getItem('lang') || 'en';
      applyLang(current === 'en' ? 'vi' : 'en');
    }
  });

  /* ── Smooth scroll for nav links ─────────────────────── */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      const offset = window.innerWidth < 768 ? 64 : 0;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
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
  const sidebar   = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const backdrop  = document.getElementById('drawerBackdrop');

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
