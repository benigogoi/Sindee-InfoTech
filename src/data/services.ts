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
    id: 'business-websites',
    number: '01',
    title: 'Business Websites',
    shortDescription: 'Professional websites that make your business look credible and accessible.',
    description:
      'Your website is often the first impression customers have of your business. We design and build professional, responsive websites that communicate your brand story clearly and create trust from the first visit. Every element is crafted to serve a purpose — from clear navigation to compelling calls-to-action.',
    features: [
      'Custom responsive design',
      'Mobile-first development',
      'Contact and enquiry forms',
      'WhatsApp integration',
      'Google Maps integration',
      'On-page SEO optimisation',
      'Performance optimisation',
      'Content management guidance',
    ],
    idealFor: [
      'Restaurants and cafes',
      'Hotels and resorts',
      'Clinics and healthcare providers',
      'Car rental businesses',
      'Professional services',
      'Local service providers',
    ],
    deliverables: [
      'Fully responsive website',
      'Domain and hosting setup assistance',
      'Basic SEO configuration',
      'Google Analytics integration',
      'Post-launch support period',
    ],
    slug: 'business-websites',
    image: '/images/services/business-websites.jpg',
  },
  {
    id: 'ecommerce',
    number: '02',
    title: 'E-commerce Websites',
    shortDescription: 'Digital storefronts designed to showcase products and simplify online shopping.',
    description:
      'Bring your products online with a digital storefront that looks great and works flawlessly. We build e-commerce experiences that make browsing enjoyable and purchasing simple. From product catalogues to secure checkout flows, every aspect is designed to convert visitors into customers.',
    features: [
      'Product catalogue and management',
      'Shopping cart and checkout',
      'Payment gateway integration',
      'Order management system',
      'Inventory tracking',
      'Customer accounts',
      'Product search and filters',
      'Mobile-optimised shopping',
    ],
    idealFor: [
      'Retail businesses',
      'Fashion and apparel brands',
      'Food and beverage producers',
      'Handicraft and artisan sellers',
      'Any product-based business',
    ],
    deliverables: [
      'Complete e-commerce website',
      'Payment integration setup',
      'Product upload assistance',
      'Order management training',
      'Post-launch support period',
    ],
    slug: 'ecommerce',
    image: '/images/services/ecommerce.jpg',
  },
  {
    id: 'website-redesign',
    number: '03',
    title: 'Website Redesign',
    shortDescription: 'Transform outdated websites into modern, effective digital experiences.',
    description:
      'If your current website feels dated, loads slowly, or doesn\'t reflect the quality of your business, it\'s time for a transformation. We take existing websites and reimagine them — improving design, performance, usability and mobile responsiveness. The result is a modern digital presence that you\'re proud to share.',
    features: [
      'Comprehensive design audit',
      'Modern visual redesign',
      'Performance optimisation',
      'Mobile responsiveness',
      'Improved navigation and UX',
      'Content restructuring',
      'SEO improvements',
      'Analytics setup',
    ],
    idealFor: [
      'Businesses with outdated websites',
      'Companies experiencing low conversions',
      'Brands undergoing repositioning',
      'Businesses expanding their services',
    ],
    deliverables: [
      'Design audit report',
      'Redesigned responsive website',
      'Performance benchmarks',
      'SEO migration',
      'Post-launch monitoring',
    ],
    slug: 'website-redesign',
    image: '/images/services/website-redesign.jpg',
  },
  {
    id: 'custom-solutions',
    number: '04',
    title: 'Custom Web Solutions',
    shortDescription: 'Purpose-built functionality and integrations for specific business requirements.',
    description:
      'Some businesses need more than a standard website. We build custom web solutions tailored to your specific requirements — whether that\'s a booking system, a customer portal, custom integrations with existing tools, or a bespoke web application. We work closely with you to understand the problem and build the right solution.',
    features: [
      'Custom booking and reservation systems',
      'Client portals and dashboards',
      'Third-party API integrations',
      'Custom forms and workflows',
      'Database-driven applications',
      'Automation and notifications',
      'Role-based access control',
      'Scalable architecture',
    ],
    idealFor: [
      'Businesses with unique requirements',
      'Service providers needing booking systems',
      'Companies requiring internal tools',
      'Businesses integrating multiple platforms',
    ],
    deliverables: [
      'Custom-built solution',
      'Technical documentation',
      'User training',
      'Integration testing',
      'Extended support period',
    ],
    slug: 'custom-solutions',
    image: '/images/services/custom-solutions.jpg',
  },
  {
    id: 'website-maintenance',
    number: '05',
    title: 'Website Maintenance',
    shortDescription: 'Keep your website secure, updated and performing at its best.',
    description:
      'A website is not a one-time project — it needs ongoing care to stay secure, fast and effective. We offer maintenance plans that keep your website running smoothly, handle updates, fix issues and make improvements as your business evolves.',
    features: [
      'Regular security updates',
      'Performance monitoring',
      'Content updates',
      'Backup management',
      'Bug fixes and troubleshooting',
      'Uptime monitoring',
      'Monthly reports',
      'Priority support',
    ],
    idealFor: [
      'Any business with an active website',
      'E-commerce stores',
      'Businesses without in-house technical support',
    ],
    deliverables: [
      'Monthly maintenance report',
      'Security audit',
      'Performance optimisation',
      'Priority technical support',
      'Regular backups',
    ],
    slug: 'website-maintenance',
    image: '/images/services/website-maintenance.jpg',
  },
]
