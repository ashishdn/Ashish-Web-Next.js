export const projectsData = {
  eyebrow: "SELECTED WORK",
  heading: "Featured Production Work",
  subtitle:
    "Selected WordPress and web development work featuring responsive interfaces, dynamic content, e-commerce functionality, and custom integrations.",

  projects: [
    {
      id: "real-estate-development",
      slug: "real-estate-development-advisory",
      category: "Commercial Real Estate & Construction Advisory",
      title: "Real Estate Development & Construction Advisory",
      demoDomain: "estate-demo.example",
      description:
        "WordPress real estate consultancy site with property listings, an investor calculator, and searchable project content.",
      technologies: ["Elementor", "Elementor Pro", "Redesign", "WordPress"],
      featured: true,
      accentColor: "var(--accent-primary)",
      themeColor: "from-[var(--accent-primary)] to-[var(--accent-secondary)]",
      client: "Skyline Holdings Ltd.",
      year: "2024",
      duration: "4 Weeks",
      role: "Lead WordPress & Frontend Architect",
      metrics: [
        { label: "PageSpeed Score", value: "98/100" },
        { label: "Load Time", value: "0.74s" },
        { label: "Lead Conversion", value: "+145%" },
        { label: "Mobile Bounce Rate", value: "-38%" },
      ],
      caseStudy: {
        summary:
          "The client needed to reposition their commercial advisory brand to attract institutional investors while replacing a sluggish legacy WordPress installation that took over 6 seconds to load.",
        challenge:
          "The previous site suffered from 45+ inactive plugins, uncompressed visual media, and broken responsive layouts on tablet and ultra-wide displays. Lead capture forms had an abandonment rate above 70%.",
        solution:
          "Engineered a bespoke, zero-bloat Elementor Pro layout backed by custom PHP template hooks, optimized CSS Grid, and dynamic CPT queries via JetEngine. Implemented LiteSpeed Cache, WebP image serving, and converted multi-step inquiry funnels.",
        features: [
          "Interactive commercial project showcase with instant category filtering",
          "Dynamic investor ROI calculator with clean client-side React logic",
          "Custom SVG blueprint viewer with smooth zoom and pan controls",
          "Bilingual capability with complete SEO metadata localization",
        ],
      },
    },
    {
      id: "global-travel-agency",
      slug: "global-travel-agency-visa-consultancy",
      category: "Travel Agency & Visa Consultancy Services",
      title: "Global Travel Agency & Visa Consultancy",
      demoDomain: "travel-demo.example",
      description:
        "Travel and visa consultancy site with destination discovery, visa information, and inquiry workflows.",
      technologies: ["Elementor", "Elementor Pro", "JetEngine", "WordPress"],
      featured: true,
      accentColor: "var(--accent-primary)",
      themeColor: "from-[var(--accent-primary)] to-[var(--accent-secondary)]",
      client: "AeroVoyage Travel Group",
      year: "2024",
      duration: "5 Weeks",
      role: "Full-Stack WordPress Developer",
      metrics: [
        { label: "Google PageSpeed", value: "96/100" },
        { label: "Booking Inquiries", value: "+210%" },
        { label: "CLS (Cumulative Shift)", value: "0.00" },
        { label: "Mobile Traffic", value: "68%" },
      ],
      caseStudy: {
        summary:
          "AeroVoyage required an enterprise-grade travel and immigration portal capable of guiding travelers through complex visa regulations across 40+ countries.",
        challenge:
          "The agency managed over 150 unique visa types manually via PDF brochures. Visitors were overwhelmed by outdated tables, leading to overwhelmed customer support lines.",
        solution:
          "Created a relational database using JetEngine Custom Post Types and Taxonomies. Designed a dynamic visa assessment wizard that filters visa requirements based on passport nationality and destination in real time.",
        features: [
          "Dynamic visa requirements wizard with live document checklist generator",
          "Tour packages catalog with automated date-based pricing and availability",
          "WhatsApp direct click-to-chat integration tagged with destination query",
          "Automated review collection funnel linked to Google Business profile",
        ],
      },
    },
    {
      id: "iso-certification",
      slug: "iso-certification-corporate-compliance",
      category: "Professional Corporate Services & Compliance",
      title: "ISO Certification & Corporate Compliance Services",
      demoDomain: "compliance-demo.example",
      description:
        "Corporate compliance site presenting ISO services, audit preparation resources, and training information.",
      technologies: ["Elementor", "Elementor Pro", "Redesign", "WordPress"],
      featured: true,
      accentColor: "var(--accent-secondary)",
      themeColor: "from-[var(--accent-primary)] to-[var(--accent-secondary)]",
      client: "Global Standard Certifications",
      year: "2024",
      duration: "3 Weeks",
      role: "WordPress Specialist & UI Designer",
      metrics: [
        { label: "Lighthouse Performance", value: "99/100" },
        { label: "LCP (Largest Contentful)", value: "0.68s" },
        { label: "Audit Bookings", value: "+82%" },
        { label: "Enterprise Inquiries", value: "3.4x" },
      ],
      caseStudy: {
        summary:
          "Global Standard Certifications needed to modernize their corporate image to win ISO auditing contracts against Big Four consultancy competitors.",
        challenge:
          "An outdated 2017 theme failed to convey trust, lacked SSL compliance badges, and scored 34/100 on mobile Core Web Vitals.",
        solution:
          "Complete UX redesign in Figma translated 1:1 into lightweight Elementor Pro templates. Stripped all redundant scripts, implemented CSS variables for enterprise branding, and structured ISO standard service pages for top organic SEO ranking.",
        features: [
          "Clean compliance roadmap generator illustrating step-by-step audit phases",
          "Secure client documentation intake form with file encryption",
          "Interactive accreditation validator search widget",
          "WCAG 2.1 AA accessibility compliance across all contrast and typography ratios",
        ],
      },
    },
    {
      id: "automobile-marketplace",
      slug: "classic-exotic-automobile-marketplace",
      category: "Automotive & Marketplace",
      title: "Classic, Exotic & Collectible Automobile Marketplace",
      demoDomain: "automotive-demo.example",
      description:
        "Automotive marketplace concept featuring vehicle listings, image galleries, and consignment inquiry flows.",
      technologies: ["Elementor", "Elementor Pro", "Redesign", "WordPress"],
      featured: true,
      accentColor: "var(--accent-primary)",
      themeColor: "from-[var(--accent-primary)] to-[var(--accent-secondary)]",
      client: "Apex Vintage Motors",
      year: "2023",
      duration: "6 Weeks",
      role: "Lead CMS & Performance Developer",
      metrics: [
        { label: "Mobile PageSpeed", value: "95/100" },
        { label: "Avg Session Duration", value: "+3m 40s" },
        { label: "Consignment Submissions", value: "+175%" },
        { label: "Inventory Turnover", value: "-25% days" },
      ],
      caseStudy: {
        summary:
          "Apex Vintage Motors required an ultra-clean, museum-quality website to present rare sports cars valued upwards of $500,000 each.",
        challenge:
          "High-resolution vehicle imagery was slowing page loads down to 8 seconds. The previous marketplace plugin caused severe layout shifts and erratic filtering bugs.",
        solution:
          "Developed custom listing templates with lazy-loaded WebP galleries, dynamic facet search for make/model/year, and integrated asynchronous inquiry modals that preserve scroll position.",
        features: [
          "Zero-CLS vehicle photo viewer with retina zoom and audio engine preview",
          "Custom vehicle specification grid linked to historical provenance records",
          "Private consignment appraisal inquiry system with automated email digests",
          "Instant search filter with URL query persistence for bookmarking",
        ],
      },
    },
    {
      id: "structural-engineering",
      slug: "general-contracting-modern-building",
      category: "Construction & Structural Engineering",
      title: "General Contracting & Modern Building Design",
      demoDomain: "construction-demo.example",
      description:
        "Construction portfolio presenting project archives, company information, and tender inquiry details.",
      technologies: ["Elementor", "Elementor Pro", "Redesign", "WordPress"],
      featured: true,
      accentColor: "var(--accent-primary)",
      themeColor: "from-[var(--accent-primary)] to-[var(--accent-secondary)]",
      client: "Vanguard Structural Engineering",
      year: "2023",
      duration: "4 Weeks",
      role: "WordPress Developer & Technical SEO",
      metrics: [
        { label: "PageSpeed Insights", value: "97/100" },
        { label: "RFP Submissions", value: "+95%" },
        { label: "Organic Search Reach", value: "+240%" },
        { label: "Server Response (TTFB)", value: "120ms" },
      ],
      caseStudy: {
        summary:
          "Vanguard required an authoritative digital headquarters to support multi-million dollar public and private structural engineering tenders.",
        challenge:
          "The company had no cohesive brand presence online, losing municipal bids to competitors with transparent case study portfolios and safety certifications.",
        solution:
          "Built a robust corporate site with customized project archive grids, interactive sector breakdowns (Commercial, Residential, Civil), and downloadable verified compliance dossiers.",
        features: [
          "Filterable project archive categorized by construction sector and structural type",
          "Live safety statistics counter showing zero-incident operational hours",
          "Interactive BIM / 3D model embed capability with lazy loading",
          "Encrypted RFP document portal for municipal procurement officers",
        ],
      },
    },
    {
      id: "certified-translation",
      slug: "certified-translation-interpreting-services",
      category: "Certified Language & Legal Translation",
      title: "Certified Translation & Interpreting Services",
      demoDomain: "translation-demo.example",
      description:
        "Translation services site with language information, a word-count pricing estimator, and verification tools.",
      technologies: ["Elementor", "Elementor Pro", "Redesign", "WordPress"],
      featured: true,
      accentColor: "var(--accent-secondary)",
      themeColor: "from-[var(--accent-primary)] to-[var(--accent-secondary)]",
      client: "Veritas Language Solutions",
      year: "2023",
      duration: "3 Weeks",
      role: "WordPress Architect",
      metrics: [
        { label: "Speed Score", value: "99/100" },
        { label: "Instant Quote Conversions", value: "+160%" },
        { label: "Client Return Rate", value: "48%" },
        { label: "Checkout Drop-off", value: "-52%" },
      ],
      caseStudy: {
        summary:
          "Veritas provides court-certified translations in 85+ language pairs and needed a streamlined customer onboarding system that gives immediate transparent pricing.",
        challenge:
          "Customers were forced to email document scans and wait 24 hours for a quote, resulting in 60% of potential legal clients choosing automated competitors.",
        solution:
          "Engineered an interactive Word-Count & Document Type estimator in pure JavaScript integrated directly into the Elementor checkout flow, reducing the quote-to-order cycle from 24 hours to 3 minutes.",
        features: [
          "Instant price & delivery calculator supporting 85 language pairs",
          "Secure drag-and-drop document upload with automatic page estimation",
          "Certification seal authentication lookup widget for legal authorities",
          "Automated PDF invoice generation with EU VAT compliance",
        ],
      },
    },
  ],
};
