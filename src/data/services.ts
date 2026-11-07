export interface Service {
  id: string
  number: string
  title: string
  shortDescription: string
  description: string
  features: string[]
  idealFor: string[]
  deliverables: string[]
  slug: string
  image: string
}

export const services: Service[] = [
  {
    id: 'website-development',
    number: '01',
    title: 'Website Development',
    shortDescription: 'Modern, high-performance websites built to establish credibility and convert visitors.',
    description:
      'We design and develop fast, secure and responsive websites tailored to your commercial objectives. From corporate business websites and high-converting landing pages to modern e-commerce storefronts and portfolio platforms, we create digital experiences that set your brand apart.',
    features: [
      'Business & corporate websites',
      'High-converting landing pages',
      'E-commerce platforms & online stores',
      'Portfolio & showcase websites',
      'Mobile-first responsive architecture',
      'Custom web development & animations',
      'On-page SEO & speed optimization',
      'Content management & domain setup',
    ],
    idealFor: [
      'Enterprises & corporate firms',
      'Growing commercial businesses',
      'Retail & e-commerce brands',
      'Professional service providers',
      'Hospitality, healthcare & dining',
    ],
    deliverables: [
      'Production-ready responsive website',
      'Domain, DNS & hosting deployment',
      'Search engine meta & sitemap setup',
      'Analytics & tracking integration',
      'Handover guide & post-launch support',
    ],
    slug: 'website-development',
    image: '/images/services/business-websites.jpg',
  },
  {
    id: 'web-applications',
    number: '02',
    title: 'Web Application Development',
    shortDescription: 'Purpose-built web apps, SaaS platforms and customer portals that solve complex workflows.',
    description:
      'When your business demands more than a static brochure, we build rich, interactive web applications. From custom SaaS products and subscription platforms to reservation engines and client dashboards, we engineer reliable cloud software built around your exact business logic.',
    features: [
      'Custom web applications & SaaS products',
      'Booking & reservation workflows',
      'Customer portals & self-service dashboards',
      'Business management & ops platforms',
      'Database-driven application architecture',
      'Third-party API & webhook integrations',
      'Authentication & role-based access control',
      'Automated email & notification triggers',
    ],
    idealFor: [
      'SaaS startups & founders',
      'Service providers needing booking systems',
      'Companies requiring client portals',
      'Platforms with recurring memberships',
      'Businesses digitizing operational workflows',
    ],
    deliverables: [
      'Scalable web application codebase',
      'Secure database & API architecture',
      'Staging & production environments',
      'Technical architecture documentation',
      'Comprehensive testing & warranty support',
    ],
    slug: 'web-applications',
    image: '/images/services/custom-solutions.jpg',
  },
  {
    id: 'android-apps',
    number: '03',
    title: 'Android Application Development',
    shortDescription: 'Native, intuitive Android apps designed for speed, reliability and seamless mobile experiences.',
    description:
      'Reach millions of mobile users with native Android applications engineered for fluid performance. Whether you are building a consumer product, an internal business utility, or a mobile-first digital tool, we guide your app from initial interface architecture through to testing and deployment.',
    features: [
      'Native Android application development',
      'Business & enterprise mobile tools',
      'Custom consumer utility applications',
      'Mobile-first digital products & MVPs',
      'Offline storage & background synchronization',
      'Push notification & messaging integration',
      'Secure payment & authentication flows',
      'Google Play Store deployment readiness',
    ],
    idealFor: [
      'Consumer-facing mobile startups',
      'Field service & logistics operations',
      'Retailers offering mobile shopping',
      'Community & membership platforms',
      'Businesses requiring dedicated mobile utilities',
    ],
    deliverables: [
      'Native Android APK / App Bundle',
      'Tested UI/UX mobile flow',
      'Backend API integration',
      'Play Store asset preparation',
      'Deployment assistance & maintenance',
    ],
    slug: 'android-apps',
    image: '/images/portfolio/az-self-drive.jpg',
  },
  {
    id: 'custom-software',
    number: '04',
    title: 'Custom Software Development',
    shortDescription: 'Tailored software, ERP and CRM solutions engineered to automate operations and drive scale.',
    description:
      'Off-the-shelf software rarely fits specialized business operations. We build bespoke software solutions, internal ERP tools, custom CRM workflows, and automation pipelines designed to eliminate friction, reduce manual errors, and scale seamlessly with your organizational growth.',
    features: [
      'Custom ERP systems & operational tools',
      'Tailored CRM & client pipeline solutions',
      'Business management & inventory software',
      'Workflow automation & process optimization',
      'Custom business tools & internal utilities',
      'Relational & NoSQL database management',
      'Legacy system modernization & migration',
      'Enterprise data reporting & analytics',
    ],
    idealFor: [
      'Growing mid-market enterprises',
      'Supply chain & inventory operations',
      'Organizations with complex data workflows',
      'Businesses outgrowing standard spreadsheets',
      'Teams seeking internal process automation',
    ],
    deliverables: [
      'Custom software solution',
      'Database schema & migration scripts',
      'Role-based permissions & security audit',
      'Staff onboarding & documentation',
      'Extended maintenance & SLA support',
    ],
    slug: 'custom-software',
    image: '/images/about/design-process.jpg',
  },
  {
    id: 'branding-design',
    number: '05',
    title: 'Branding & Creative Design',
    shortDescription: 'Distinctive brand identity, UI/UX systems and digital creative direction that build lasting trust.',
    description:
      'Great digital products begin with strong design fundamentals. We develop cohesive visual identities, brand systems, marketing creatives, and intuitive UI/UX design that elevate your brand and ensure memorable interactions across every customer touchpoint.',
    features: [
      'Logo design & visual brand systems',
      'Comprehensive brand identity guidelines',
      'UI/UX design & interactive prototyping',
      'Design systems & component libraries',
      'Marketing creatives & digital collateral',
      'Product packaging & graphic design',
      'Typography & color strategy',
      'Design handoff specifications',
    ],
    idealFor: [
      'New ventures creating their initial identity',
      'Established brands seeking modern repositioning',
      'Digital products needing cohesive UI systems',
      'Marketing campaigns requiring creative assets',
      'Companies demanding a premium digital aesthetic',
    ],
    deliverables: [
      'Vector logo packages (SVG, PNG, EPS)',
      'Brand guidelines & typography hierarchy',
      'Interactive Figma UI/UX prototypes',
      'Design token specifications',
      'Marketing collateral & presentation assets',
    ],
    slug: 'branding-design',
    image: '/images/about/studio.jpg',
  },
  {
    id: 'digital-marketing-seo',
    number: '06',
    title: 'Digital Marketing & SEO',
    shortDescription: 'Organic search visibility, performance optimization and strategic digital acquisition.',
    description:
      'A powerful website needs to be discovered by the right customers. We implement technical search engine optimization, on-page content structures, speed enhancements, and targeted digital marketing campaigns that drive qualified traffic and sustainable commercial growth.',
    features: [
      'Technical search engine optimization (SEO)',
      'On-page content architecture & keyword strategy',
      'Website speed & Core Web Vitals optimization',
      'Local search & Google Business optimization',
      'Search visibility & crawlability audits',
      'Targeted digital advertising & ad management',
      'Online brand growth & conversion optimization',
      'Analytics reporting & attribution tracking',
    ],
    idealFor: [
      'Businesses seeking qualified inbound leads',
      'E-commerce brands expanding customer reach',
      'Local businesses targeting geographic dominance',
      'Websites suffering from poor search rankings',
      'Companies seeking measurable marketing ROI',
    ],
    deliverables: [
      'Technical SEO audit & implementation',
      'Optimized meta, schema & sitemap tags',
      'Speed optimization & benchmark report',
      'Analytics dashboard & conversion goals',
      'Monthly search visibility monitoring',
    ],
    slug: 'digital-marketing-seo',
    image: '/images/services/website-redesign.jpg',
  },
]
