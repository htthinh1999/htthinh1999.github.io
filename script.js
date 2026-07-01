(function () {
  'use strict';

  /* ── Footer year ─────────────────────────────────────── */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Translations ────────────────────────────────────── */
  const translations = {
    en: {
      /* Sidebar / nav */
      'sidebar.name': 'Huynh Tan Thinh',
      'mobile.name': 'Huynh Tan Thinh',
      'sidebar.role': 'Software Engineer',
      'sidebar.openToWork': 'Open to Work',
      'sidebar.downloadCV': 'Download CV',
      'mobile.role': 'Software Engineer',
      'nav.summary': 'Summary', 'nav.skills': 'Skills', 'nav.experience': 'Experience',
      'nav.projects': 'Projects', 'nav.education': 'Education', 'nav.contact': 'Contact',

      /* Section titles */
      'section.summary': 'Summary', 'section.skills': 'Technical Skills',
      'section.experience': 'Experience', 'section.projects': 'Projects',
      'section.education': 'Education & Certifications', 'section.contact': 'Contact',

      /* Summary */
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

      /* Experience — FPT Software */
      'exp.fpt.duty1': 'Developed APIs for frontend-backend communication, ensuring security and efficiency.',
      'exp.fpt.duty2': 'Set up CI/CD pipelines for automatic code integrations and efficient deployments.',
      'exp.fpt.duty3': 'Managed and monitored cloud infrastructure to ensure 99% uptime.',
      'exp.fpt.duty4': 'Implemented IaC setups using CloudFormation and AWS CDK to automate infrastructure provisioning.',
      'exp.fpt.duty5': 'Designed AWS Step Functions state machines and AWS Glue jobs for complex ETL workflows.',

      /* Experience — Infodation Vietnam */
      'exp.info.duty1': 'Designed scalable, maintainable technical solutions and led technical decision-making for feature implementation.',
      'exp.info.duty2': 'Developed APIs for frontend-backend communication, ensuring security and efficiency.',
      'exp.info.duty3': 'Configured and maintained Kubernetes clusters to optimize application scaling and resilience.',
      'exp.info.duty4': 'Implemented Terraform setups to automate and standardize infrastructure provisioning.',
      'exp.info.duty5': 'Set up CI/CD pipelines and managed cloud infrastructure to ensure 99% uptime.',

      /* Experience — Infodation Netherlands */
      'exp.info.nl.duty1': 'Facilitated communication and collaboration between Vietnam and Netherlands teams.',
      'exp.info.nl.duty2': 'Investigated and resolved technical issues, identifying root causes and implementing solutions.',
      'exp.info.nl.duty3': 'Provided guidance and support to clients throughout the issue resolution process.',

      /* Experience — DAO Entertainment */
      'exp.dao.duty1': 'Collaborated with developers to design system architectures supporting business requirements.',
      'exp.dao.duty2': 'Developed APIs for web portals and integrated third-party APIs to extend service offerings.',
      'exp.dao.duty3': 'Configured and maintained Kubernetes clusters for optimized deployment, scaling, and management.',
      'exp.dao.duty4': 'Implemented Terraform setups to automate and standardize infrastructure provisioning.',
      'exp.dao.duty5': 'Managed verification and deployment processes, ensuring reliable system updates and releases.',

      /* Projects — LFS */
      'proj.lfs.desc': 'Spearheaded the development and integration of third-party payment processing using Westpac QuickStream and VisionNext, enhancing the platform\'s real-time financial transaction handling.',
      'proj.lfs.duty1': 'Integrated Westpac QuickStream and VisionNext 3rd-party payment APIs.',
      'proj.lfs.duty2': 'Implemented AWS CloudFormation setups to automate infrastructure provisioning.',
      'proj.lfs.duty3': 'Set up CI/CD pipelines via Buildkite for automated deployments.',
      'proj.lfs.duty4': 'Managed and monitored AWS infrastructure to ensure 99% uptime.',

      /* Projects — PdM Cloud */
      'proj.pdm.desc': 'Re-architected a legacy predictive maintenance system into a fully AWS-native serverless and containerized solution, using two ML models for batch printer lifespan prediction and real-time image diagnostics.',
      'proj.pdm.duty1': 'Architected and provisioned entire AWS infrastructure from scratch using CloudFormation.',
      'proj.pdm.duty2': 'Designed AWS Step Functions state machines to orchestrate ETL workflows and Glue jobs.',
      'proj.pdm.duty3': 'Deployed real-time image diagnostics model on Amazon ECS (Fargate) for low-latency inference.',
      'proj.pdm.duty4': 'Built CI/CD pipeline using AWS Code Series (CodeCommit, CodeBuild, CodeDeploy, CodePipeline).',

      /* Projects — T24Parsing */
      'proj.t24.desc': 'Joined the Digital Banking team to operate and expand a mature AWS EKS infrastructure, provisioning new microservices and ensuring reliability of critical banking data pipelines.',
      'proj.t24.duty1': 'Managed and expanded Terragrunt codebase to provision resources for new banking features.',
      'proj.t24.duty2': 'Administered production Amazon EKS clusters and tuned Karpenter autoscaling profiles.',
      'proj.t24.duty3': 'Optimized the Temenos T24 data ingestion pipeline for accurate parsing into DynamoDB and S3.',
      'proj.t24.duty4': 'Maintained CI/CD pipelines to ensure smooth deployment of new versions and infrastructure patches.',

      /* Projects — Fanvibe */
      'proj.fanvibe.desc': 'Enhanced evolution of DTOLink with richer third-party integrations, analytics, and a migration from plain Docker containers to AWS EKS/ECS and GCP Cloud Run.',
      'proj.fanvibe.duty1': 'Migrated old environment from Docker containers to AWS EKS and AWS ECS.',
      'proj.fanvibe.duty2': 'Set up environment on Google Cloud Run and Google Cloud Task.',
      'proj.fanvibe.duty3': 'Implemented Terraform setups to automate infrastructure provisioning.',
      'proj.fanvibe.duty4': 'Configured CI/CD for automated deployments across environments.',

      /* Projects — Kikker */
      'proj.kikker.desc': 'Netherlands-based platform streamlining the selling and management of Electrics & Gas services, including meter reading, automated billing, commission calculation, and payment processing.',
      'proj.kikker.duty1': 'Designed scalable technical solutions and led feature implementation decision-making.',
      'proj.kikker.duty2': 'Developed APIs and maintained database schema with performance optimizations.',
      'proj.kikker.duty3': 'Configured and maintained Kubernetes cluster and implemented Terraform IaC.',
      'proj.kikker.duty4': 'Set up CI/CD pipelines and managed cloud infrastructure for 99% uptime.',

      /* Projects — DTOLink */
      'proj.dto.desc': 'Platform for artists and creators to craft music release and bio pages with real-time analytics. Integrates with Spotify, Apple Music, Deezer, and Songstats for rich audience insights.',
      'proj.dto.duty1': 'Designed system architecture supporting business requirements and user needs.',
      'proj.dto.duty2': 'Developed APIs for web portals and integrated third-party music service APIs.',
      'proj.dto.duty3': 'Set up environment for service deployment and CI/CD for automated deploys.',
      'proj.dto.duty4': 'Reviewed colleagues\' code to maintain coding standards.',

      /* Education */
      'edu.certs': 'Certifications', 'edu.honors': 'Honors & Awards',

      /* Contact */
      'contact.email': 'Email', 'contact.phone': 'Phone', 'contact.location': 'Location',
      'contact.location.value': 'Nha Trang, Vietnam',
      'proj.visit': 'Visit Website',
      /* Education */
      'edu.org': 'Telecommunication University',
      'edu.major': 'Major: Software Engineering',
      /* Periods */
      'period.fpt':      'Aug 2025 – Now',
      'period.info':     'May 2021 – Jun 2025',
      'period.info.nl':  'May 2024 – Aug 2024 · 3 months',
      'period.dao':      'Nov 2021 – Now',
      'period.lfs':      'Aug 2025 – Now',
      'period.pdm':      'Dec 2025 – Now',
      'period.t24':      'Aug 2025 – Nov 2025',
      'period.fanvibe':  'Nov 2022 – Now',
      'period.kikker':   'May 2021 – Jun 2025',
      'period.dto':      'Nov 2020 – Nov 2022',
      'period.edu':      'Oct 2017 – May 2021',
    },

    vi: {
      /* Sidebar / nav */
      'sidebar.name': 'Huỳnh Tấn Thịnh',
      'mobile.name': 'Huỳnh Tấn Thịnh',
      'sidebar.role': 'Kỹ sư phần mềm',
      'sidebar.openToWork': 'Sẵn sàng làm việc',
      'sidebar.downloadCV': 'Tải CV',
      'mobile.role': 'Kỹ sư phần mềm',
      'nav.summary': 'Giới thiệu', 'nav.skills': 'Kỹ năng', 'nav.experience': 'Kinh nghiệm',
      'nav.projects': 'Dự án', 'nav.education': 'Học vấn', 'nav.contact': 'Liên hệ',

      /* Section titles */
      'section.summary': 'Giới thiệu', 'section.skills': 'Kỹ năng kỹ thuật',
      'section.experience': 'Kinh nghiệm làm việc', 'section.projects': 'Dự án',
      'section.education': 'Học vấn & Chứng chỉ', 'section.contact': 'Liên hệ',

      /* Summary */
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

      /* Experience — FPT Software */
      'exp.fpt.duty1': 'Phát triển API cho giao tiếp frontend-backend, đảm bảo bảo mật và hiệu quả.',
      'exp.fpt.duty2': 'Thiết lập pipeline CI/CD để tự động hóa tích hợp mã nguồn và triển khai hiệu quả.',
      'exp.fpt.duty3': 'Quản lý và giám sát hạ tầng đám mây để đảm bảo uptime 99%.',
      'exp.fpt.duty4': 'Triển khai IaC bằng CloudFormation và AWS CDK để tự động hóa cung cấp hạ tầng.',
      'exp.fpt.duty5': 'Thiết kế state machine AWS Step Functions và Glue jobs cho các luồng ETL phức tạp.',

      /* Experience — Infodation Vietnam */
      'exp.info.duty1': 'Thiết kế giải pháp kỹ thuật có khả năng mở rộng và dẫn dắt quyết định kỹ thuật khi triển khai tính năng.',
      'exp.info.duty2': 'Phát triển API cho giao tiếp frontend-backend, đảm bảo bảo mật và hiệu quả.',
      'exp.info.duty3': 'Cấu hình và duy trì Kubernetes cluster để tối ưu hóa khả năng mở rộng và độ phục hồi.',
      'exp.info.duty4': 'Triển khai Terraform để tự động hóa và chuẩn hóa việc cung cấp hạ tầng.',
      'exp.info.duty5': 'Thiết lập pipeline CI/CD và quản lý hạ tầng đám mây để đảm bảo uptime 99%.',

      /* Experience — Infodation Netherlands */
      'exp.info.nl.duty1': 'Hỗ trợ giao tiếp và cộng tác giữa đội Việt Nam và Hà Lan.',
      'exp.info.nl.duty2': 'Điều tra và giải quyết các vấn đề kỹ thuật, xác định nguyên nhân và triển khai giải pháp.',
      'exp.info.nl.duty3': 'Hướng dẫn và hỗ trợ khách hàng trong suốt quá trình giải quyết sự cố.',

      /* Experience — DAO Entertainment */
      'exp.dao.duty1': 'Phối hợp với nhà phát triển để thiết kế kiến trúc hệ thống đáp ứng yêu cầu kinh doanh.',
      'exp.dao.duty2': 'Phát triển API cho cổng web và tích hợp API bên thứ ba để mở rộng dịch vụ.',
      'exp.dao.duty3': 'Cấu hình và duy trì Kubernetes cluster để tối ưu hóa triển khai, mở rộng và quản lý.',
      'exp.dao.duty4': 'Triển khai Terraform để tự động hóa và chuẩn hóa việc cung cấp hạ tầng.',
      'exp.dao.duty5': 'Quản lý quy trình xác minh và triển khai, đảm bảo cập nhật hệ thống đáng tin cậy.',

      /* Projects — LFS */
      'proj.lfs.desc': 'Dẫn dắt phát triển và tích hợp xử lý thanh toán bên thứ ba bằng Westpac QuickStream và VisionNext, nâng cao khả năng xử lý giao dịch tài chính theo thời gian thực của nền tảng.',
      'proj.lfs.duty1': 'Tích hợp API thanh toán Westpac QuickStream và VisionNext từ bên thứ ba.',
      'proj.lfs.duty2': 'Triển khai AWS CloudFormation để tự động hóa cung cấp hạ tầng.',
      'proj.lfs.duty3': 'Thiết lập pipeline CI/CD qua Buildkite cho triển khai tự động.',
      'proj.lfs.duty4': 'Quản lý và giám sát hạ tầng AWS để đảm bảo uptime 99%.',

      /* Projects — PdM Cloud */
      'proj.pdm.desc': 'Tái kiến trúc hệ thống bảo trì dự đoán cũ thành giải pháp AWS serverless và container hóa hoàn toàn, sử dụng hai mô hình ML cho dự đoán tuổi thọ máy in theo lô và chẩn đoán hình ảnh thời gian thực.',
      'proj.pdm.duty1': 'Thiết kế và cung cấp toàn bộ hạ tầng AWS từ đầu bằng CloudFormation.',
      'proj.pdm.duty2': 'Thiết kế state machine AWS Step Functions để điều phối luồng ETL và Glue jobs.',
      'proj.pdm.duty3': 'Triển khai mô hình chẩn đoán hình ảnh thời gian thực trên Amazon ECS (Fargate) với độ trễ thấp.',
      'proj.pdm.duty4': 'Xây dựng pipeline CI/CD bằng AWS Code Series (CodeCommit, CodeBuild, CodeDeploy, CodePipeline).',

      /* Projects — T24Parsing */
      'proj.t24.desc': 'Tham gia nhóm Ngân hàng Số để vận hành và mở rộng hạ tầng AWS EKS trưởng thành, cung cấp microservice mới và đảm bảo độ tin cậy của pipeline dữ liệu ngân hàng quan trọng.',
      'proj.t24.duty1': 'Quản lý và mở rộng codebase Terragrunt để cung cấp tài nguyên cho tính năng ngân hàng mới.',
      'proj.t24.duty2': 'Quản trị cluster Amazon EKS production và tinh chỉnh profile autoscaling Karpenter.',
      'proj.t24.duty3': 'Tối ưu hóa pipeline nhập dữ liệu Temenos T24 để phân tích chính xác vào DynamoDB và S3.',
      'proj.t24.duty4': 'Duy trì pipeline CI/CD để đảm bảo triển khai phiên bản mới và bản vá hạ tầng suôn sẻ.',

      /* Projects — Fanvibe */
      'proj.fanvibe.desc': 'Phát triển DTOLink với tích hợp bên thứ ba phong phú hơn, analytics và di chuyển từ Docker thuần sang AWS EKS/ECS và GCP Cloud Run.',
      'proj.fanvibe.duty1': 'Di chuyển môi trường cũ từ Docker containers sang AWS EKS và AWS ECS.',
      'proj.fanvibe.duty2': 'Thiết lập môi trường trên Google Cloud Run và Google Cloud Task.',
      'proj.fanvibe.duty3': 'Triển khai Terraform để tự động hóa cung cấp hạ tầng.',
      'proj.fanvibe.duty4': 'Cấu hình CI/CD cho triển khai tự động qua các môi trường.',

      /* Projects — Kikker */
      'proj.kikker.desc': 'Nền tảng tại Hà Lan hỗ trợ bán và quản lý dịch vụ Điện & Gas, bao gồm đọc đồng hồ, lập hóa đơn tự động, tính hoa hồng và xử lý thanh toán.',
      'proj.kikker.duty1': 'Thiết kế giải pháp kỹ thuật có khả năng mở rộng và dẫn dắt quyết định triển khai tính năng.',
      'proj.kikker.duty2': 'Phát triển API và duy trì schema cơ sở dữ liệu với tối ưu hóa hiệu suất.',
      'proj.kikker.duty3': 'Cấu hình và duy trì Kubernetes cluster và triển khai Terraform IaC.',
      'proj.kikker.duty4': 'Thiết lập pipeline CI/CD và quản lý hạ tầng đám mây đảm bảo uptime 99%.',

      /* Projects — DTOLink */
      'proj.dto.desc': 'Nền tảng cho nghệ sĩ và nhà sáng tạo để tạo trang phát hành nhạc và trang bio với analytics thời gian thực. Tích hợp với Spotify, Apple Music, Deezer và Songstats.',
      'proj.dto.duty1': 'Thiết kế kiến trúc hệ thống đáp ứng yêu cầu kinh doanh và người dùng.',
      'proj.dto.duty2': 'Phát triển API cho cổng web và tích hợp API dịch vụ nhạc bên thứ ba.',
      'proj.dto.duty3': 'Thiết lập môi trường triển khai dịch vụ và CI/CD cho triển khai tự động.',
      'proj.dto.duty4': 'Review code của đồng nghiệp để duy trì chuẩn mực lập trình.',

      /* Education */
      'edu.certs': 'Chứng chỉ', 'edu.honors': 'Thành tích & Giải thưởng',

      /* Contact */
      'contact.email': 'Email', 'contact.phone': 'Điện thoại', 'contact.location': 'Địa chỉ',
      'contact.location.value': 'Nha Trang, Việt Nam',
      'proj.visit': 'Truy cập trang web',
      /* Education */
      'edu.org': 'Trường Đại học Thông tin liên lạc',
      'edu.major': 'Chuyên ngành: Kỹ thuật phần mềm',
      /* Periods */
      'period.fpt':      'Tháng 8, 2025 – Nay',
      'period.info':     'Tháng 5, 2021 – Tháng 6, 2025',
      'period.info.nl':  'Tháng 5, 2024 – Tháng 8, 2024 · 3 tháng',
      'period.dao':      'Tháng 11, 2021 – Nay',
      'period.lfs':      'Tháng 8, 2025 – Nay',
      'period.pdm':      'Tháng 12, 2025 – Nay',
      'period.t24':      'Tháng 8, 2025 – Tháng 11, 2025',
      'period.fanvibe':  'Tháng 11, 2022 – Nay',
      'period.kikker':   'Tháng 5, 2021 – Tháng 6, 2025',
      'period.dto':      'Tháng 11, 2020 – Tháng 11, 2022',
      'period.edu':      'Tháng 10, 2017 – Tháng 5, 2021',
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
