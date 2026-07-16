(function () {
  'use strict';

  /* ── Footer year ─────────────────────────────────────── */
  const yearEl = document.querySelector('.footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Translations ────────────────────────────────────── */
  const translations = {
    en: {
      navSummary: 'Summary', navSkills: 'Skills', navExperience: 'Experience', navProjects: 'Projects', navEducation: 'Education', navContact: 'Contact', downloadCv: 'Download CV',
      openToWork: 'Open to Work',
      heroName: 'Huynh Tan Thinh', heroTitle: 'Cloud Engineer & Software Engineer',
      heroKicker: 'CLOUD · INFRASTRUCTURE · AUTOMATION',
      heroT1: 'From code to cluster,', heroT2: 'I own the whole path',
      heroSub: 'Huynh Tan Thinh — Software Engineer with more than 5 years designing, developing, and managing robust, scalable infrastructure on Google Cloud Platform and Amazon Web Services.',
      viewProjects: 'View Projects', contactMe: 'Contact Me', tapLayer: 'tap a layer to explore',
      statYears: 'Years experience', statProjects: 'Major projects', statCerts: 'Certifications', statClouds: 'Cloud platforms',
      summaryKicker: 'SUMMARY', summaryTitle: '5+ years of engineering, end to end',
      summaryBody: 'More than 5 years of working experience in Software Engineering — designing, developing, and managing robust and scalable infrastructure. Proficient in a wide range of DevOps tools and cloud platforms, experienced in both GCP and AWS environments. Proficient in English.',
      c1: 'Infrastructure as Code', c2: 'Containerization & Orchestration', c3: 'CI/CD Pipelines', c4: 'Cloud Platforms', c5: 'Backend Development', c6: 'Database Management', c7: 'Agile Methodologies', c7d: 'Cross-functional team collaboration, Scrum', c8: 'Problem-Solving', c8d: 'Root cause analysis, analytical troubleshooting',
      skillsKicker: 'TECHNICAL SKILLS', skillsTitle: 'The toolbox', dataMsg: 'Data & Messaging',
      sphereHint: 'drag to spin the stack',
      expKicker: 'EXPERIENCE', expTitle: "Where I've worked", now: 'Now',
      fpt1: 'Developed APIs for frontend-backend communication, ensuring security and efficiency.',
      fpt2: 'Set up CI/CD pipelines for automatic code integrations and efficient deployments.',
      fpt3: 'Managed and monitored cloud infrastructure to ensure 99% uptime.',
      fpt4: 'Implemented IaC setups using CloudFormation and AWS CDK to automate infrastructure provisioning.',
      fpt5: 'Designed AWS Step Functions state machines and AWS Glue jobs for complex ETL workflows.',
      inf1: 'Designed scalable, maintainable technical solutions and led technical decision-making for feature implementation.',
      inf2: 'Developed APIs for frontend-backend communication, ensuring security and efficiency.',
      inf3: 'Configured and maintained Kubernetes clusters to optimize application scaling and resilience.',
      inf4: 'Implemented Terraform setups to automate and standardize infrastructure provisioning.',
      inf5: 'Set up CI/CD pipelines and managed cloud infrastructure to ensure 99% uptime.',
      nlRole: 'Technical Support Engineer — onsite Netherlands', nlDur: '3 months',
      nlDesc: 'Facilitated collaboration between Vietnam and Netherlands teams; investigated and resolved technical issues to root cause; guided clients through resolution.',
      smDesc: 'Facilitated sprint ceremonies, kept the backlog well-defined with the product owner, shielded the team from distractions, and coached Agile & Scrum best practices.',
      orc1: 'Managed and monitored cloud infrastructure to ensure 99% uptime.',
      orc2: 'Managed the verification and deployment of systems, ensuring timely updates and roll-outs.',
      orc3: 'Configured and maintained a Kubernetes cluster to optimize application scaling and resilience.',
      orc4: 'Implemented Terraform setups to automate and standardize infrastructure provisioning.',
      amy1: 'Introduced students to foundational programming concepts through lectures and hands-on robotics projects.',
      amy2: 'Designed practical exercises, kept course material current with industry trends, and evaluated students with constructive feedback.',
      dao1: 'Collaborated with developers to design system architectures supporting business requirements.',
      dao2: 'Developed APIs for web portals and integrated third-party APIs to extend service offerings.',
      dao3: 'Configured and maintained Kubernetes clusters for optimized deployment, scaling, and management.',
      dao4: 'Implemented Terraform setups to automate and standardize infrastructure provisioning.',
      dao5: 'Managed verification and deployment processes, ensuring reliable system updates and releases.',
      projKicker: 'PROJECTS', projTitle: 'Selected work', team: 'Team', visit: 'Visit website →',
      pLfs: "Spearheaded development and integration of third-party payment processing using Westpac QuickStream and VisionNext, enhancing real-time financial transaction handling.",
      pPdm: 'Re-architected a legacy predictive maintenance system into a fully AWS-native serverless and containerized solution — two ML models for batch printer lifespan prediction and real-time image diagnostics.',
      pT24: 'Operated and expanded a mature AWS EKS infrastructure for Digital Banking — provisioning new microservices and ensuring reliability of critical banking data pipelines.',
      pFan: 'Enhanced evolution of DTOLink with richer third-party integrations, analytics, and a migration from plain Docker containers to AWS EKS/ECS and GCP Cloud Run.',
      pKik: 'Netherlands-based platform streamlining selling and management of Electrics & Gas services — meter reading, automated billing, commission calculation, and payment processing.',
      pDto: 'Platform for artists and creators to craft music release and bio pages with real-time analytics — integrates Spotify, Apple Music, Deezer, and Songstats.',
      eduKicker: 'EDUCATION & CERTIFICATIONS', eduTitle: 'Credentials', eduLabel: 'EDUCATION', certLabel: 'CERTIFICATIONS', awardLabel: 'HONORS & AWARDS',
      uni: 'Telecommunications University',
      degreeLine: "Bachelor's degree — Computer Software Engineering",
      actTitle: 'Activities & achievements',
      act1: 'Honours scholarship — 4 years (7 semesters)',
      act2: "OLP'18 & OLP'19 — Vietnam Student Informatics Olympiad",
      act3: 'FPT Digital Race 2018 & 2019',
      act4: 'ACM-ICPC — International Collegiate Programming Contest',
      award5: 'University Honors Scholarship — 7 semesters',
      navGallery: 'Gallery', galKicker: 'GALLERY', galTitle: 'Moments along the way', galHint: 'drag to rotate',
      postsTitle: 'Featured posts',
      gal1: 'Technical Support Team — onsite Netherlands, 2024',
      gal2: 'Google Cloud event in Switzerland, 2024',
      gal3: 'Robotech class in action — AMY Hub, 2019',
      gal4: 'FPT Digital Race 2018',
      gal5: "OLP'18 & ACM/ICPC Asia Hanoi 2018",
      gal6: "OLP'19 & ICPC Asia Da Nang 2019",
      gal7: 'Star of the Year 2023 — Infodation',
      gal8: 'ACM/ICPC School-Level 2020 — 2nd Place & Team 3rd Place',
      gal9: 'Certificate of Honor — 2019 Informatics Olympics',
      showMore: 'Show all 11 certifications', showLess: 'Show less',
      fullTimeGroup: 'FULL-TIME', freelanceGroup: 'FREELANCE & PART-TIME',
      view3d: '3D view', viewGrid: 'Grid view',
      fbPostTitle: 'Onsite trip to the Netherlands', liPostTitle: 'Scrum Master course completion',
      fbPostExcerpt: 'The onsite trips make us better in both technical knowledge enhancement and experiences of cross-cultural exposure. A few months of working and living abroad is one of the things Infodation aims for to help IFD-ers broaden horizons in diversity of comprehension.',
      liPostExcerpt: 'As IFDationers we are always offered great employee benefits — including a variety of training courses to update and improve our software development skills. Congratulations to the colleagues who excellently completed the Scrum Master Course, honored in the Certificate of Completion Ceremony.',
      fbPostBtn: 'Read full post on Facebook →', liPostBtn: 'Read full post on LinkedIn →',
      contactKicker: 'CONTACT', contactT1: "Let's build your next", contactT2: 'cloud solution',
      layers: [
        { name: 'Apps & APIs', short: 'Apps & APIs', desc: 'Backend services and APIs powering web and mobile products — secure, efficient frontend-backend communication.' },
        { name: 'CI/CD & Delivery', short: 'CI/CD', desc: 'Automated pipelines for integration and deployment, keeping releases fast, repeatable and reliable.' },
        { name: 'Orchestration', short: 'Orchestration', desc: 'Cluster configuration, scaling and resilience tuning for production workloads.' },
        { name: 'Cloud Platforms', short: 'Cloud', desc: 'Production workloads across both major clouds, managed and monitored for 99% uptime.' },
        { name: 'Infrastructure as Code', short: 'IaC', desc: 'Every environment provisioned from code — reviewable, standardized, automated from scratch.' }
      ]
    },
    vi: {
      navSummary: 'Tóm tắt', navSkills: 'Kỹ năng', navExperience: 'Kinh nghiệm', navProjects: 'Dự án', navEducation: 'Học vấn', navContact: 'Liên hệ', downloadCv: 'Tải CV',
      openToWork: 'Sẵn sàng làm việc',
      heroName: 'Huỳnh Tấn Thịnh', heroTitle: 'Kỹ sư Cloud & Kỹ sư phần mềm',
      heroKicker: 'CLOUD · HẠ TẦNG · TỰ ĐỘNG HÓA',
      heroT1: 'Từ code đến cluster,', heroT2: 'tôi làm chủ toàn bộ hành trình',
      heroSub: 'Huỳnh Tấn Thịnh — Kỹ sư phần mềm với hơn 5 năm kinh nghiệm thiết kế, phát triển và quản lý hạ tầng mạnh mẽ, có khả năng mở rộng trên Google Cloud Platform và Amazon Web Services.',
      viewProjects: 'Xem dự án', contactMe: 'Liên hệ tôi', tapLayer: 'chạm vào một tầng để khám phá',
      statYears: 'Năm kinh nghiệm', statProjects: 'Dự án lớn', statCerts: 'Chứng chỉ', statClouds: 'Nền tảng cloud',
      summaryKicker: 'TÓM TẮT', summaryTitle: '5+ năm kỹ thuật, từ đầu đến cuối',
      summaryBody: 'Hơn 5 năm kinh nghiệm làm việc trong lĩnh vực Kỹ thuật phần mềm — thiết kế, phát triển và quản lý hạ tầng mạnh mẽ, có khả năng mở rộng. Thành thạo nhiều công cụ DevOps và nền tảng cloud, có kinh nghiệm với cả GCP và AWS. Thành thạo tiếng Anh.',
      c1: 'Hạ tầng dạng mã (IaC)', c2: 'Container hóa & Điều phối', c3: 'CI/CD Pipelines', c4: 'Nền tảng Cloud', c5: 'Phát triển Backend', c6: 'Quản lý cơ sở dữ liệu', c7: 'Phương pháp Agile', c7d: 'Cộng tác nhóm đa chức năng, Scrum', c8: 'Giải quyết vấn đề', c8d: 'Phân tích nguyên nhân gốc, xử lý sự cố phân tích',
      skillsKicker: 'KỸ NĂNG CHUYÊN MÔN', skillsTitle: 'Bộ công cụ', dataMsg: 'Dữ liệu & Messaging',
      sphereHint: 'kéo để xoay quả cầu kỹ năng',
      expKicker: 'KINH NGHIỆM', expTitle: 'Nơi tôi đã làm việc', now: 'Nay',
      fpt1: 'Phát triển API cho giao tiếp frontend-backend, đảm bảo bảo mật và hiệu quả.',
      fpt2: 'Thiết lập CI/CD pipeline cho tích hợp mã tự động và triển khai hiệu quả.',
      fpt3: 'Quản lý và giám sát hạ tầng cloud, đảm bảo 99% uptime.',
      fpt4: 'Triển khai IaC bằng CloudFormation và AWS CDK để tự động hóa cung cấp hạ tầng.',
      fpt5: 'Thiết kế AWS Step Functions và AWS Glue jobs cho các luồng ETL phức tạp.',
      inf1: 'Thiết kế giải pháp kỹ thuật có khả năng mở rộng, dễ bảo trì và dẫn dắt quyết định kỹ thuật cho việc triển khai tính năng.',
      inf2: 'Phát triển API cho giao tiếp frontend-backend, đảm bảo bảo mật và hiệu quả.',
      inf3: 'Cấu hình và duy trì Kubernetes cluster để tối ưu mở rộng và độ bền vững của ứng dụng.',
      inf4: 'Triển khai Terraform để tự động hóa và chuẩn hóa cung cấp hạ tầng.',
      inf5: 'Thiết lập CI/CD pipeline và quản lý hạ tầng cloud đảm bảo 99% uptime.',
      nlRole: 'Technical Support Engineer — onsite Hà Lan', nlDur: '3 tháng',
      nlDesc: 'Kết nối và điều phối giữa đội ngũ Việt Nam và Hà Lan; điều tra và xử lý sự cố kỹ thuật đến nguyên nhân gốc; hỗ trợ khách hàng trong suốt quá trình xử lý.',
      smDesc: 'Điều phối các buổi họp Scrum, phối hợp với product owner chuẩn hóa backlog, bảo vệ nhóm khỏi phân tâm và huấn luyện thực hành Agile & Scrum.',
      orc1: 'Quản lý và giám sát hạ tầng cloud, đảm bảo 99% uptime.',
      orc2: 'Quản lý quy trình kiểm duyệt và triển khai hệ thống, đảm bảo cập nhật kịp thời.',
      orc3: 'Cấu hình và duy trì Kubernetes cluster để tối ưu mở rộng và độ bền vững của ứng dụng.',
      orc4: 'Triển khai Terraform để tự động hóa và chuẩn hóa cung cấp hạ tầng.',
      amy1: 'Giới thiệu cho học viên các khái niệm lập trình nền tảng qua bài giảng và dự án robotics thực hành.',
      amy2: 'Thiết kế bài tập thực hành, cập nhật giáo trình theo xu hướng công nghệ và đánh giá học viên với phản hồi mang tính xây dựng.',
      dao1: 'Phối hợp với developer thiết kế kiến trúc hệ thống đáp ứng yêu cầu nghiệp vụ.',
      dao2: 'Phát triển API cho web portal và tích hợp API bên thứ ba để mở rộng dịch vụ.',
      dao3: 'Cấu hình và duy trì Kubernetes cluster cho triển khai, mở rộng và quản lý tối ưu.',
      dao4: 'Triển khai Terraform để tự động hóa và chuẩn hóa cung cấp hạ tầng.',
      dao5: 'Quản lý quy trình kiểm duyệt và triển khai, đảm bảo cập nhật hệ thống ổn định.',
      projKicker: 'DỰ ÁN', projTitle: 'Dự án tiêu biểu', team: 'Nhóm', visit: 'Xem website →',
      pLfs: 'Dẫn dắt phát triển và tích hợp xử lý thanh toán bên thứ ba với Westpac QuickStream và VisionNext, nâng cao khả năng xử lý giao dịch tài chính thời gian thực.',
      pPdm: 'Tái kiến trúc hệ thống bảo trì dự đoán legacy thành giải pháp serverless và container hoàn toàn trên AWS — hai mô hình ML cho dự đoán tuổi thọ máy in theo lô và chẩn đoán hình ảnh thời gian thực.',
      pT24: 'Vận hành và mở rộng hạ tầng AWS EKS cho Digital Banking — cung cấp microservice mới và đảm bảo độ tin cậy của các pipeline dữ liệu ngân hàng trọng yếu.',
      pFan: 'Phát triển tiếp DTOLink với nhiều tích hợp bên thứ ba, analytics, và di chuyển từ Docker container thuần sang AWS EKS/ECS và GCP Cloud Run.',
      pKik: 'Nền tảng Hà Lan tinh gọn việc bán và quản lý dịch vụ Điện & Gas — đọc công tơ, hóa đơn tự động, tính hoa hồng và xử lý thanh toán.',
      pDto: 'Nền tảng cho nghệ sĩ và creator tạo trang phát hành nhạc và bio với analytics thời gian thực — tích hợp Spotify, Apple Music, Deezer và Songstats.',
      eduKicker: 'HỌC VẤN & CHỨNG CHỈ', eduTitle: 'Bằng cấp', eduLabel: 'HỌC VẤN', certLabel: 'CHỨNG CHỈ', awardLabel: 'GIẢI THƯỞNG',
      uni: 'Đại học Thông tin liên lạc',
      degreeLine: 'Cử nhân — Kỹ thuật Phần mềm Máy tính',
      actTitle: 'Hoạt động & thành tích',
      act1: 'Học bổng danh dự — 4 năm (7 học kỳ)',
      act2: "OLP'18 & OLP'19 — Olympic Tin học Sinh viên Việt Nam",
      act3: 'FPT Digital Race 2018 & 2019',
      act4: 'ACM-ICPC — Kỳ thi Lập trình Sinh viên Quốc tế',
      award5: 'Học bổng danh dự của trường — 7 học kỳ',
      navGallery: 'Hình ảnh', galKicker: 'HÌNH ẢNH', galTitle: 'Những khoảnh khắc trên hành trình', galHint: 'kéo để xoay',
      postsTitle: 'Bài viết nổi bật',
      gal1: 'Đội Technical Support — onsite Hà Lan, 2024',
      gal2: 'Sự kiện Google Cloud tại Thụy Sĩ, 2024',
      gal3: 'Lớp học Robotech — AMY Hub, 2019',
      gal4: 'FPT Digital Race 2018',
      gal5: "OLP'18 & ACM/ICPC Asia Hà Nội 2018",
      gal6: "OLP'19 & ICPC Asia Đà Nẵng 2019",
      gal7: 'Star of the Year 2023 — Infodation',
      gal8: 'ACM/ICPC cấp trường 2020 — Giải Nhì & Giải Ba đồng đội',
      gal9: 'Giấy khen — Thành tích cao Olympic Tin học 2019',
      showMore: 'Xem tất cả 11 chứng chỉ', showLess: 'Thu gọn',
      fullTimeGroup: 'TOÀN THỜI GIAN', freelanceGroup: 'FREELANCE & BÁN THỜI GIAN',
      view3d: 'Xem 3D', viewGrid: 'Dạng lưới',
      fbPostTitle: 'Chuyến công tác onsite Hà Lan', liPostTitle: 'Hoàn thành khóa Scrum Master',
      fbPostExcerpt: 'Những chuyến onsite giúp chúng tôi giỏi hơn cả về chuyên môn kỹ thuật lẫn trải nghiệm giao thoa văn hóa. Vài tháng sống và làm việc ở nước ngoài là điều Infodation hướng tới để giúp IFD-ers mở rộng tầm nhìn và sự thấu hiểu đa dạng.',
      liPostExcerpt: 'Là IFDationer, chúng tôi luôn được hưởng phúc lợi tốt — trong đó có các khóa đào tạo đa dạng để cập nhật và nâng cao kỹ năng phát triển phần mềm. Chúc mừng các đồng nghiệp đã xuất sắc hoàn thành khóa Scrum Master và được vinh danh trong Lễ trao Chứng nhận Hoàn thành.',
      fbPostBtn: 'Xem bài viết trên Facebook →', liPostBtn: 'Xem bài viết trên LinkedIn →',
      contactKicker: 'LIÊN HỆ', contactT1: 'Cùng xây dựng giải pháp', contactT2: 'cloud tiếp theo của bạn',
      layers: [
        { name: 'Ứng dụng & API', short: 'Ứng dụng', desc: 'Dịch vụ backend và API cho các sản phẩm web và mobile — giao tiếp frontend-backend an toàn, hiệu quả.' },
        { name: 'CI/CD & Triển khai', short: 'CI/CD', desc: 'Pipeline tự động cho tích hợp và triển khai, giúp phát hành nhanh, lặp lại được và đáng tin cậy.' },
        { name: 'Điều phối container', short: 'Điều phối', desc: 'Cấu hình cluster, mở rộng và tối ưu độ bền vững cho workload production.' },
        { name: 'Nền tảng Cloud', short: 'Cloud', desc: 'Workload production trên cả hai cloud lớn, được quản lý và giám sát với 99% uptime.' },
        { name: 'Hạ tầng dạng mã (IaC)', short: 'IaC', desc: 'Mọi môi trường được cung cấp từ mã — dễ review, chuẩn hóa, tự động hóa từ đầu.' }
      ]
    }
  };

  const techs = [
    '.NET 6/8 · Node.js · Golang · Python',
    'GitHub Actions · Buildkite · ArgoCD · FluxCD',
    'Kubernetes · Helm · Karpenter',
    'AWS (EKS · ECS · Lambda) · GCP (GKE · Cloud Run)',
    'Terraform · CloudFormation · AWS CDK'
  ];

  const OG_META = {
    en: {
      title: 'Huynh Tan Thinh — Software Engineer',
      description: 'Software Engineer & Cloud Engineer with 5+ years experience in backend development, DevOps, and cloud-native infrastructure on GCP and AWS.',
      locale: 'en_US',
      url: 'https://info.keycodemon.org/',
      imageAlt: 'Huynh Tan Thinh — Software Engineer',
    },
    vi: {
      title: 'Huỳnh Tấn Thịnh — Kỹ sư phần mềm',
      description: 'Kỹ sư phần mềm & Kỹ sư đám mây với hơn 5 năm kinh nghiệm về phát triển backend, DevOps và hạ tầng đám mây trên GCP và AWS.',
      locale: 'vi_VN',
      url: 'https://info.keycodemon.org/vi/',
      imageAlt: 'Huỳnh Tấn Thịnh — Kỹ sư phần mềm',
    },
  };

  function updateOGMeta(lang) {
    const t = OG_META[lang] || OG_META.en;
    const set = (sel, val) => document.querySelector(sel)?.setAttribute('content', val);
    document.title = t.title;
    set('meta[property="og:title"]', t.title);
    set('meta[property="og:description"]', t.description);
    set('meta[property="og:locale"]', t.locale);
    set('meta[property="og:url"]', t.url);
    set('meta[property="og:image:alt"]', t.imageAlt);
    set('meta[name="twitter:title"]', t.title);
    set('meta[name="twitter:description"]', t.description);
    set('meta[name="twitter:image:alt"]', t.imageAlt);
    set('meta[name="description"]', t.description);
  }

  /* ── Theme toggle ──────────────────────────────────────── */
  function applyTheme(theme) {
    const t = theme === 'dark' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  }
  applyTheme(localStorage.getItem('theme') || 'light');
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── Hero typewriter ──────────────────────────────────── */
  let _typeTimer = null;
  function startTyping() {
    clearInterval(_typeTimer);
    const t = translations[currentLang];
    const total = (t.heroT1 + t.heroT2).length;
    const line1El = document.getElementById('heroLine1');
    const line2El = document.getElementById('heroLine2');
    const cursor1El = document.getElementById('heroCursor1');
    const cursor2El = document.getElementById('heroCursor2');
    if (!line1El || !line2El) return;
    let typedLen = 0;
    const render = () => {
      line1El.textContent = t.heroT1.slice(0, Math.min(typedLen, t.heroT1.length));
      line2El.textContent = t.heroT2.slice(0, Math.max(0, typedLen - t.heroT1.length));
      cursor1El.classList.toggle('is-visible', typedLen < t.heroT1.length);
      cursor2El.classList.toggle('is-visible', typedLen >= t.heroT1.length && typedLen <= total);
    };
    render();
    _typeTimer = setInterval(() => {
      typedLen++;
      if (typedLen >= total) clearInterval(_typeTimer);
      render();
    }, 32);
  }

  /* ── Isometric layer stack state ─────────────────────── */
  let currentLang = 'en';
  let selectedLayer = 3;

  function renderIsoStack() {
    const t = translations[currentLang];
    const stackEl = document.getElementById('isoStack');
    const legendEl = document.getElementById('isoLegend');
    if (!stackEl || !legendEl) return;

    stackEl.innerHTML = '';
    legendEl.innerHTML = '';

    t.layers.forEach((layer, i) => {
      const active = i === selectedLayer;
      const z = (t.layers.length - 1 - i) * 48 + (active ? 30 : 0);

      const box = document.createElement('div');
      box.className = 'iso-layer' + (active ? ' is-active' : '');
      box.style.setProperty('--iso-z', z + 'px');
      box.innerHTML =
        '<div class="iso-layer-num">0' + (i + 1) + '</div>' +
        '<div class="iso-layer-short">' + layer.short + '</div>';
      box.addEventListener('click', () => selectLayer(i));
      stackEl.appendChild(box);

      const item = document.createElement('div');
      item.className = 'iso-legend-item' + (active ? ' is-active' : '');
      item.innerHTML =
        '<span class="iso-legend-dot"></span>' +
        '<span class="iso-legend-num">0' + (i + 1) + '</span>' +
        '<span class="iso-legend-name">' + layer.name + '</span>';
      item.addEventListener('click', () => selectLayer(i));
      legendEl.appendChild(item);
    });

    const sel = Math.min(selectedLayer, t.layers.length - 1);
    document.getElementById('isoDetailName').textContent = t.layers[sel].name;
    document.getElementById('isoDetailDesc').textContent = t.layers[sel].desc;
    document.getElementById('isoDetailTech').textContent = techs[sel];
  }

  function selectLayer(i) {
    selectedLayer = i;
    renderIsoStack();
  }

  /* ── Language toggle ─────────────────────────────────── */
  function applyLang(lang, pushUrl) {
    currentLang = (lang === 'vi') ? 'vi' : 'en';
    document.documentElement.lang = currentLang;
    localStorage.setItem('lang', currentLang);

    const t = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang-btn') === currentLang);
    });

    renderIsoStack();
    updateOGMeta(currentLang);
    startTyping();

    if (pushUrl !== false) {
      const url = currentLang === 'vi' ? '?lang=vi' : location.pathname;
      history.replaceState(null, '', url);
    }
  }

  /* ── Hero stats count-up ──────────────────────────────── */
  (function initStats() {
    const nums = document.querySelectorAll('.hero-stat-num');
    if (!nums.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    nums.forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const t0 = performance.now(), dur = 1100;
      (function step(t) {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + (p === 1 ? suffix : '');
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  })();

  /* ── Scrollspy — highlight active nav link ────────────── */
  (function initScrollspy() {
    const links = document.querySelectorAll('.nav-link');
    if (!links.length || !('IntersectionObserver' in window)) return;
    const map = {};
    links.forEach(l => { map[l.getAttribute('href')] = l; });
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(l => l.classList.remove('is-active'));
        const link = map['#' + en.target.id];
        if (link) link.classList.add('is-active');
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    ['summary', 'skills', 'experience', 'projects', 'education', 'gallery', 'contact']
      .forEach(id => { const s = document.getElementById(id); if (s) spy.observe(s); });
  })();

  /* ── Scroll progress bar + back-to-top ────────────────── */
  (function initScrollUx() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    const topBtn = document.createElement('button');
    topBtn.type = 'button';
    topBtn.className = 'back-to-top';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(topBtn);
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        topBtn.classList.toggle('is-visible', window.scrollY > 600);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  /* ── Certifications show more/less ────────────────────── */
  (function initCertToggle() {
    const btn = document.getElementById('certToggle');
    const extra = document.getElementById('certExtra');
    if (!btn || !extra) return;
    btn.addEventListener('click', () => {
      const opening = extra.hasAttribute('hidden');
      if (opening) extra.removeAttribute('hidden');
      else extra.setAttribute('hidden', '');
      const key = opening ? 'showLess' : 'showMore';
      btn.setAttribute('data-i18n', key);
      btn.textContent = translations[currentLang][key];
    });
  })();

  /* ── 3D photo gallery carousel ────────────────────────── */
  (function initGallery() {
    const ring = document.getElementById('carousel3d');
    if (!ring) return;
    let lbPaused = false;
    const photos = [
      ['photos/tech-support-team.jpg', 'gal1'],
      ['photos/google-cloud-event.jpg', 'gal2'],
      ['photos/robotech-class.mp4', 'gal3', 'video'],
      ['photos/fpt-digital-race-2018.jpg', 'gal4'],
      ['photos/olp18-icpc2018.jpg', 'gal5'],
      ['photos/olp19-icpc2019.jpg', 'gal6'],
      ['photos/stars-of-the-year-2023.jpg', 'gal7'],
      ['photos/acm-icpc-school-2020.jpg', 'gal8'],
      ['photos/honor-olympics-2019.jpg', 'gal9']
    ];
    photos.forEach(([src, key, kind]) => {
      const card = document.createElement('figure');
      card.className = 'carousel-card';
      const media = kind === 'video'
        ? '<video muted loop playsinline autoplay preload="metadata" poster="photos/robotech-class-poster.jpg"></video>'
        : '<img loading="lazy" alt="">';
      card.innerHTML = '<div class="carousel-ph">📷</div>' + media +
        '<figcaption class="carousel-cap" data-i18n="' + key + '"></figcaption>';
      const el = card.querySelector(kind === 'video' ? 'video' : 'img');
      el.addEventListener('error', () => card.classList.add('is-missing'));
      el.src = src;
      const view = document.createElement('button');
      view.type = 'button';
      view.className = 'carousel-view';
      view.setAttribute('aria-label', 'View fullscreen');
      view.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
      view.addEventListener('pointerdown', e => e.stopPropagation());
      view.addEventListener('click', () => openLightbox(card));
      card.appendChild(view);
      ring.appendChild(card);
    });
    const N = photos.length;
    let angle = 0, vel = 0.05, dragging = false, lx = 0;
    function layout() {
      const w = ring.clientWidth || 300;
      const r = Math.round((w / 2) / Math.tan(Math.PI / N)) + 46;
      Array.prototype.forEach.call(ring.children, (c, i) => {
        c.style.transform = 'rotateY(' + (360 / N * i) + 'deg) translateZ(' + r + 'px)';
      });
    }
    layout();
    window.addEventListener('resize', layout);
    ring.addEventListener('pointerdown', e => {
      dragging = true; lx = e.clientX;
      ring.setPointerCapture(e.pointerId);
      ring.style.cursor = 'grabbing';
    });
    ring.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = e.clientX - lx; lx = e.clientX;
      angle += dx * 0.3; vel = dx * 0.06;
    });
    const endDrag = () => { dragging = false; ring.style.cursor = 'grab'; };
    ring.addEventListener('pointerup', endDrag);
    ring.addEventListener('pointercancel', endDrag);
    /* Gentle slow-down while hovering (easier to hit the view button) */
    let baseVel = 0.05;
    ring.addEventListener('pointerenter', () => { baseVel = 0.012; });
    ring.addEventListener('pointerleave', () => { baseVel = 0.05; });
    let gridMode = false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ring.style.transform = 'rotateY(0deg)';
    } else {
      (function spin() {
        if (!gridMode) {
          if (!dragging && !lbPaused) { vel += (baseVel - vel) * 0.02; angle += vel; }
          ring.style.transform = 'rotateY(' + angle + 'deg)';
        }
        requestAnimationFrame(spin);
      })();
    }

    /* 3D / Grid view toggle */
    const btn3d = document.getElementById('galView3d');
    const btnGrid = document.getElementById('galViewGrid');
    const stageEl = ring.closest('.carousel-3d-stage');
    const hintEl = document.querySelector('.carousel-hint');
    function setGridMode(on) {
      gridMode = on;
      ring.classList.toggle('as-grid', on);
      if (stageEl) stageEl.classList.toggle('as-grid-stage', on);
      if (hintEl) hintEl.hidden = on;
      btn3d.classList.toggle('is-active', !on);
      btnGrid.classList.toggle('is-active', on);
      btn3d.setAttribute('aria-pressed', String(!on));
      btnGrid.setAttribute('aria-pressed', String(on));
      if (!on) layout();
    }
    if (btn3d && btnGrid) {
      btn3d.addEventListener('click', () => setGridMode(false));
      btnGrid.addEventListener('click', () => setGridMode(true));
    }

    /* ── Fullscreen 3D lightbox ─────────────────────────── */
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.hidden = true;
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.innerHTML =
      '<div class="lightbox-backdrop"></div>' +
      '<figure class="lightbox-stage"><div class="lightbox-media-wrap"></div><figcaption class="lightbox-cap"></figcaption><div class="lightbox-count"></div></figure>' +
      '<button type="button" class="lightbox-btn lightbox-close" aria-label="Close">&#10005;</button>' +
      '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Previous">&#8249;</button>' +
      '<button type="button" class="lightbox-btn lightbox-next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(lb);
    const stage = lb.querySelector('.lightbox-stage');
    const mediaWrap = lb.querySelector('.lightbox-media-wrap');
    const capEl = lb.querySelector('.lightbox-cap');
    let items = [], cur = 0;

    function collectItems() {
      items = Array.prototype.filter.call(ring.children, c => !c.classList.contains('is-missing'));
    }
    function renderLbMedia(card, dir) {
      const srcEl = card.querySelector('img,video');
      const isVid = srcEl.tagName === 'VIDEO';
      const el = document.createElement(isVid ? 'video' : 'img');
      el.className = 'lightbox-media';
      if (isVid) {
        el.controls = true; el.autoplay = true; el.loop = true; el.playsInline = true;
        el.poster = srcEl.getAttribute('poster') || '';
      } else {
        el.alt = card.querySelector('.carousel-cap').textContent;
      }
      el.src = srcEl.getAttribute('src');
      mediaWrap.innerHTML = '';
      mediaWrap.appendChild(el);
      capEl.textContent = card.querySelector('.carousel-cap').textContent;
      const countEl = lb.querySelector('.lightbox-count');
      if (countEl) countEl.textContent = (items.indexOf(card) + 1) + ' / ' + items.length;
      stage.classList.remove('lb-in-left', 'lb-in-right');
      if (dir) {
        void stage.offsetWidth; /* restart animation */
        stage.classList.add(dir > 0 ? 'lb-in-right' : 'lb-in-left');
      }
    }
    function openLightbox(card) {
      collectItems();
      cur = Math.max(0, items.indexOf(card));
      lbPaused = true;
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      renderLbMedia(items[cur], 0);
      requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add('is-open')));
      lb.querySelector('.lightbox-close').focus();
    }
    function closeLightbox() {
      lb.classList.remove('is-open');
      lbPaused = false;
      document.body.style.overflow = '';
      setTimeout(() => { lb.hidden = true; mediaWrap.innerHTML = ''; }, 450);
    }
    function navLightbox(dir) {
      collectItems();
      if (!items.length) return;
      cur = (cur + dir + items.length) % items.length;
      renderLbMedia(items[cur], dir);
    }
    lb.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
    lb.querySelector('.lightbox-prev').addEventListener('click', () => navLightbox(-1));
    lb.querySelector('.lightbox-next').addEventListener('click', () => navLightbox(1));
    window.addEventListener('keydown', e => {
      if (lb.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') navLightbox(-1);
      else if (e.key === 'ArrowRight') navLightbox(1);
    });
  })();

  const _urlLang = new URLSearchParams(location.search).get('lang');
  applyLang((_urlLang === 'vi' || _urlLang === 'en') ? _urlLang : (localStorage.getItem('lang') || 'en'), false);

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang-btn')));
  });

  /* ── Mobile nav menu ──────────────────────────────────── */
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobileMenu');
  if (hamburger && mobileMenu) {
    const setMenuOpen = (open) => {
      mobileMenu.classList.toggle('is-open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    };
    hamburger.addEventListener('click', () => setMenuOpen(!mobileMenu.classList.contains('is-open')));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenuOpen(false)));
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 860) setMenuOpen(false);
    });
  }

  /* ── Scroll reveal (+ per-card stagger) ───────────────── */
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
        entry.target.querySelectorAll('.stagger-card').forEach((card, i) => {
          setTimeout(() => card.classList.add('is-visible'), 100 + i * 90);
        });
      }
    });
  }, { threshold: 0.1 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ── 3D tilt on cards ─────────────────────────────────── */
  const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canTilt) {
    const MAX_TILT = 7;
    document.querySelectorAll('.summary-card, .skill-group, .project-card, .edu-card').forEach(card => {
      card.addEventListener('pointerenter', () => {
        card.style.transition = 'transform .16s ease-out, box-shadow .35s, border-color .35s, opacity .6s ease';
        card.style.willChange = 'transform';
      });
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(700px) rotateX(' + (-py * MAX_TILT).toFixed(2) +
          'deg) rotateY(' + (px * MAX_TILT).toFixed(2) + 'deg) translateY(-6px) scale(1.02)';
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
        card.style.transition = '';
        card.style.willChange = '';
      });
    });
  }

  /* ── Legacy 2D wireframe sphere (fallback when WebGL/Three.js is unavailable) ── */
  window.__initHero2D = function () {
  if (window.__hero2DStarted) return;
  window.__hero2DStarted = true;
  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const n = 90, ga = Math.PI * (3 - Math.sqrt(5));
    const pts = [];
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = ga * i;
      const fr = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
      const s = 1 + (fr - 0.5) * 0.4;
      pts.push([Math.cos(th) * r * s, y * s, Math.sin(th) * r * s]);
    }
    const edges = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const a = pts[i], b = pts[j];
        if (Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 0.5) edges.push([i, j]);
      }
    }
    const particles = [];
    for (let i = 0; i < 34; i++) {
      particles.push({ x: Math.random(), y: Math.random(), r: 1 + Math.random() * 1.6, sp: 0.12 + Math.random() * 0.3, ph: Math.random() * Math.PI * 2 });
    }
    const CANVAS_RGB = {
      light: { line: '220,38,38', dot: '28,30,33' },
      dark: { line: '248,113,113', dot: '242,243,245' }
    };

    let ry = 0.5, mx = 0, my = 0, cw = 0, ch = 0, ctx = null;

    window.addEventListener('pointermove', (e) => {
      const w = window.innerWidth || 1, h = window.innerHeight || 1;
      mx = e.clientX / w - 0.5;
      my = e.clientY / h - 0.5;
    });

    function tick() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (w >= 2 && h >= 2) {
        if (cw !== w || ch !== h) {
          const dpr = Math.min(2, window.devicePixelRatio || 1);
          canvas.width = Math.round(w * dpr);
          canvas.height = Math.round(h * dpr);
          ctx = canvas.getContext('2d');
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          cw = w; ch = h;
        }
        ry += 0.0016;
        const rx = -0.3 + my * 0.2;
        const cy = Math.cos(ry), sy = Math.sin(ry);
        const cx = Math.cos(rx), sx = Math.sin(rx);
        const sc = Math.min(w, h) * 0.52;
        ctx.clearRect(0, 0, w, h);
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const rgb = isDark ? CANVAS_RGB.dark : CANVAS_RGB.light;
        const P = pts.map((p) => {
          const x1 = p[0] * cy + p[2] * sy, z1 = -p[0] * sy + p[2] * cy;
          const y1 = p[1] * cx - z1 * sx, z2 = p[1] * sx + z1 * cx;
          const f = 2.7 / (2.7 - z2);
          return [w / 2 + (x1 + mx * 0.1) * sc * f, h / 2 + y1 * sc * f, z2, f];
        });
        ctx.lineWidth = 1;
        for (const [i, j] of edges) {
          const a = P[i], b = P[j];
          const dz = ((a[2] + b[2]) / 2 + 1) / 2;
          ctx.strokeStyle = 'rgba(' + rgb.line + ',' + (0.03 + 0.07 * dz).toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
        }
        for (const q of P) {
          const dz = (q[2] + 1) / 2;
          ctx.beginPath();
          ctx.arc(q[0], q[1], 1.5 * q[3], 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + rgb.dot + ',' + (0.05 + 0.14 * dz).toFixed(3) + ')';
          ctx.fill();
        }
        for (const p of particles) {
          p.y -= p.sp / Math.max(h, 1) * 2.4;
          if (p.y < -0.03) { p.y = 1.03; p.x = Math.random(); }
          const px = p.x * w + Math.sin(p.y * 9 + p.ph) * 7;
          const py = p.y * h;
          const fade = Math.sin(Math.min(1, Math.max(0, p.y)) * Math.PI);
          ctx.beginPath();
          ctx.arc(px, py, p.r, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(' + rgb.line + ',' + (0.16 * fade).toFixed(3) + ')';
          ctx.fill();
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  };

  /* Safety net: if the 3D scene didn't start (CDN blocked, WebGL off), fall back to 2D */
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (!window.__three3DActive) window.__initHero2D();
    }, 900);
  });
})();
