const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read MONGODB_URI from the environment, then .env.local, then .env
let MONGODB_URI = process.env.MONGODB_URI || '';
for (const file of ['.env.local', '.env']) {
  if (MONGODB_URI) break;
  try {
    const envContent = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
    const match = envContent.match(/^MONGODB_URI=(.+)$/m);
    if (match) MONGODB_URI = match[1].trim();
  } catch {
    // file not present, try the next one
  }
}

// ─── Schemas ────────────────────────────────────────────────────────────────

const ServiceSchema = new mongoose.Schema({
  serviceId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'Cpu' },
  gradient: { type: String, default: 'from-blue-600 to-indigo-600' },
  features: [{ name: { type: String }, details: { type: String } }],
  stats: { success: { type: String }, speed: { type: String } },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Undergraduate', 'Postgraduate', 'Specialized'] },
  duration: { type: String },
  fees: String,
  eligibility: String,
  curriculum: String,
  careerOpportunities: String,
  admissionProcess: String,
  examPattern: String,
  studyMaterials: String,
  facultySupport: String,
  placementAssistance: String,
  certificationDetails: String,
  prerequisites: String,
  learningOutcomes: String
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

// ─── Services Data ───────────────────────────────────────────────────────────

const services = [
  {
    serviceId: 'SERV_001',
    icon: 'GraduationCap',
    title: 'SSLC / +2',
    description: 'Direct academic pathways for completing Secondary (10th) and Senior Secondary (12th) certifications with recognized boards like Jamia, NIOS, and BOSSE.',
    features: [
      { name: 'Jamia Admissions', details: 'Official support for Jamia Millia Islamia school admissions and board enrollment.' },
      { name: 'NIOS Stream Execution', details: 'End-to-end guidance for NIOS 10th/12th stream registration and examination.' },
      { name: 'BOSSE Board Selection', details: 'State board equivalency programs through Board of Open Schooling and Skill Education.' },
      { name: 'Document Verification', details: 'Assistance in authenticating previous academic records for smooth admission.' }
    ],
    stats: { success: '100%', speed: 'Verified Nodes' },
    gradient: 'from-blue-600 to-indigo-600',
    isActive: true,
    order: 1
  },
  {
    serviceId: 'SERV_002',
    icon: 'Plane',
    title: 'Study Abroad',
    description: 'End-to-end data processing for international academic deployment across Tier-1 institutions globally.',
    features: [
      { name: 'University Filtering', details: 'Algorithmic matching of student profile with global institutional requirements.' },
      { name: 'Visa Logic Processing', details: 'Expert handling of student visa documentation and interview preparation.' },
      { name: 'International Discovery', details: 'Mapping global career market trends for optimal course selection.' },
      { name: 'Arrival Protocols', details: 'Pre-departure briefings and on-ground landing support for international students.' }
    ],
    stats: { success: '95%', speed: 'Optimized' },
    gradient: 'from-indigo-600 to-violet-600',
    isActive: true,
    order: 2
  },
  {
    serviceId: 'SERV_003',
    icon: 'Award',
    title: 'Online Degree',
    description: 'Activating flexible digital academic protocols for recognized undergraduate and postgraduate programs.',
    features: [
      { name: 'UGC Approved Nodes', details: 'Ensuring all degree programs are fully recognized by University Grants Commission.' },
      { name: 'Flexible Learning', details: 'Access to recorded sessions and digital modules for self-paced graduation.' },
      { name: 'Distance Calibration', details: 'Optimizing communication between student and university for remote exams.' },
      { name: 'Digital Certification', details: 'Verified electronic certificates issued directly by parent universities.' }
    ],
    stats: { success: '98%', speed: 'Rapid Access' },
    gradient: 'from-violet-600 to-purple-600',
    isActive: true,
    order: 3
  },
  {
    serviceId: 'SERV_004',
    icon: 'Zap',
    title: 'Scholarships',
    description: 'Activating financial aid protocols and scholarship discovery modules for academic funding and excellence.',
    features: [
      { name: 'Merit Identification', details: 'Identifying scholarship eligibility based on academic and sports excellence.' },
      { name: 'Asset Management', details: 'Guidance on managing grants and tuition fee waivers efficiently.' },
      { name: 'Sponsorship Links', details: 'Connecting students with corporate and NGO educational sponsors.' },
      { name: 'Document Auditing', details: 'Compiling financial and identity proof for scholarship applications.' }
    ],
    stats: { success: '92%', speed: 'Accelerated' },
    gradient: 'from-purple-600 to-fuchsia-600',
    isActive: true,
    order: 4
  },
  {
    serviceId: 'SERV_005',
    icon: 'UserCheck',
    title: 'Admission Support',
    description: 'Comprehensive end-to-end assistance for navigating complex university admission protocols and documentation.',
    features: [
      { name: 'Form Submission', details: 'Expert handling of university application forms to ensure zero-error submissions.' },
      { name: 'SOP Assistance', details: 'Guidance on drafting compelling Statements of Purpose for top-tier institutions.' },
      { name: 'Document Audit', details: 'Thorough verification of all academic and identity proofs before application.' },
      { name: 'Follow-up Logic', details: 'Persistent coordination with university admission desks for status updates.' }
    ],
    stats: { success: '100%', speed: 'Reliable' },
    gradient: 'from-blue-500 to-cyan-500',
    isActive: true,
    order: 5
  },
  {
    serviceId: 'SERV_006',
    icon: 'Sparkles',
    title: 'Career Guidance',
    description: 'Expert mentorship and psychological mapping to align student passion with industry demand (Provided Free of Cost).',
    features: [
      { name: 'Psychometric Testing', details: 'Advanced aptitude mapping to identify the most suitable career streams.' },
      { name: 'One-on-One Mentoring', details: 'Personalized sessions with industry leaders for strategic career planning.' },
      { name: 'Free Consultation', details: 'Initial roadmap planning and career path discovery at zero cost.' },
      { name: 'Market Trend Audit', details: 'Real-time updates on emerging high-growth industries and job roles.' }
    ],
    stats: { success: '96%', speed: 'Deep-Analysis' },
    gradient: 'from-emerald-500 to-teal-500',
    isActive: true,
    order: 6
  }
];

// ─── Courses Data ────────────────────────────────────────────────────────────

const courses = [
  {
    name: 'Bachelor of Arts (BA)',
    url: '/courses/ba',
    description: 'A comprehensive undergraduate program covering humanities, social sciences, and liberal arts. Build critical thinking and communication skills valued across industries.',
    category: 'Undergraduate',
    duration: '3 Years',
    fees: '₹15,000 - ₹40,000/year',
    eligibility: '10+2 in any stream with minimum 45% marks',
    curriculum: 'English, History, Political Science, Sociology, Economics, Psychology and elective subjects',
    careerOpportunities: 'Civil Services, Teaching, Journalism, Content Writing, HR, Administration',
    admissionProcess: 'Merit-based admission or entrance exam depending on university. Apply online and submit 10+2 marksheet.',
    learningOutcomes: 'Critical analysis, research skills, effective communication, cultural awareness'
  },
  {
    name: 'Bachelor of Commerce (B.Com)',
    url: '/courses/bcom',
    description: 'A professional undergraduate degree focused on commerce, accounting, economics and business management. Ideal for students targeting finance and corporate careers.',
    category: 'Undergraduate',
    duration: '3 Years',
    fees: '₹20,000 - ₹50,000/year',
    eligibility: '10+2 with Commerce/Math with minimum 45% marks',
    curriculum: 'Financial Accounting, Business Law, Economics, Taxation, Cost Accounting, Corporate Finance',
    careerOpportunities: 'CA, Accountant, Financial Analyst, Tax Consultant, Banking, Auditing',
    admissionProcess: 'Merit-based admission. Submit 10+2 marksheet and complete online application.',
    learningOutcomes: 'Financial literacy, business acumen, accounting proficiency, taxation knowledge'
  },
  {
    name: 'Bachelor of Business Administration (BBA)',
    url: '/courses/bba',
    description: 'An undergraduate business management program that prepares students for corporate leadership and entrepreneurship.',
    category: 'Undergraduate',
    duration: '3 Years',
    fees: '₹30,000 - ₹80,000/year',
    eligibility: '10+2 in any stream with minimum 50% marks',
    curriculum: 'Marketing, Finance, HR Management, Operations, Business Strategy, Entrepreneurship',
    careerOpportunities: 'Manager, Business Analyst, Entrepreneur, Marketing Executive, Operations Head',
    admissionProcess: 'Entrance exam or merit-based. Some universities conduct GD/PI rounds.',
    learningOutcomes: 'Leadership skills, strategic thinking, business management, team collaboration'
  },
  {
    name: 'Master of Arts (MA)',
    url: '/courses/ma',
    description: 'A postgraduate academic program for in-depth study of humanities and social sciences. Ideal for research and academic careers.',
    category: 'Postgraduate',
    duration: '2 Years',
    fees: '₹20,000 - ₹60,000/year',
    eligibility: 'Bachelor\'s degree in relevant subject with minimum 50% marks',
    curriculum: 'Advanced research methodology, specialized subject papers, dissertation',
    careerOpportunities: 'Researcher, Professor, Civil Services, NGO, Social Work, Journalism',
    admissionProcess: 'Entrance exam (DUET, CUET, etc.) or merit-based. Requires graduation certificate.',
    learningOutcomes: 'Advanced research skills, subject mastery, analytical writing, academic proficiency'
  },
  {
    name: 'Master of Commerce (M.Com)',
    url: '/courses/mcom',
    description: 'Advanced postgraduate program in commerce, accounting, and financial management for specialized professional roles.',
    category: 'Postgraduate',
    duration: '2 Years',
    fees: '₹25,000 - ₹70,000/year',
    eligibility: 'B.Com or equivalent with minimum 50% marks',
    curriculum: 'Advanced Accounting, Financial Markets, Business Statistics, Corporate Law, Research Methods',
    careerOpportunities: 'Senior Accountant, Finance Manager, Lecturer, CFO, Investment Analyst',
    admissionProcess: 'Merit-based or entrance exam. B.Com degree and marksheets required.',
    learningOutcomes: 'Advanced financial knowledge, research capabilities, managerial accounting'
  },
  {
    name: 'Master of Business Administration (MBA)',
    url: '/courses/mba',
    description: 'India\'s most sought-after postgraduate management degree. Develop executive leadership, strategy, and business acumen for top corporate roles.',
    category: 'Postgraduate',
    duration: '2 Years',
    fees: '₹60,000 - ₹2,00,000/year',
    eligibility: 'Bachelor\'s degree in any discipline with minimum 50% marks',
    curriculum: 'Strategic Management, Finance, Marketing, Operations, Human Resources, Entrepreneurship',
    careerOpportunities: 'CEO, Manager, Business Consultant, Investment Banker, Marketing Director',
    admissionProcess: 'CAT/MAT/CMAT score required. Followed by GD and PI rounds.',
    learningOutcomes: 'Executive leadership, strategic decision-making, business management, networking'
  },
  {
    name: 'Bachelor of Technology (B.Tech)',
    url: '/courses/btech',
    description: 'A premier 4-year undergraduate engineering degree for students pursuing careers in technology and innovation.',
    category: 'Undergraduate',
    duration: '4 Years',
    fees: '₹50,000 - ₹1,50,000/year',
    eligibility: '10+2 with Physics, Chemistry, Math and JEE score or direct admission',
    curriculum: 'Core engineering subjects, programming, mathematics, elective specializations (CS, IT, ECE, ME, CE)',
    careerOpportunities: 'Software Engineer, Data Scientist, AI Engineer, Product Manager, Researcher',
    admissionProcess: 'JEE Main/Advanced or state entrance exam. Merit-based for private universities.',
    learningOutcomes: 'Technical problem-solving, programming, engineering design, innovation'
  },
  {
    name: 'Diploma in Digital Marketing',
    url: '/courses/digital-marketing',
    description: 'A specialized certification program covering all aspects of modern digital marketing including SEO, social media, paid ads, and analytics.',
    category: 'Specialized',
    duration: '6-12 Months',
    fees: '₹15,000 - ₹40,000',
    eligibility: '10+2 or equivalent. No age bar.',
    curriculum: 'SEO, SEM, Social Media Marketing, Email Marketing, Content Strategy, Google Analytics',
    careerOpportunities: 'Digital Marketer, SEO Analyst, Social Media Manager, Content Strategist, Growth Hacker',
    admissionProcess: 'Direct admission. Online application with basic eligibility verification.',
    learningOutcomes: 'Digital campaign management, SEO expertise, data-driven marketing, brand building'
  }
];

// ─── Seed Function ───────────────────────────────────────────────────────────

async function seedAll() {
  try {
    if (!MONGODB_URI) throw new Error('MONGODB_URI not found in environment, .env.local or .env');

    console.log('🔗 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected successfully.\n');

    // Seed Services
    console.log('📦 Seeding services...');
    for (const svc of services) {
      await Service.findOneAndUpdate({ serviceId: svc.serviceId }, svc, { upsert: true, new: true });
      console.log('  ✓ Upserted service:', svc.title);
    }

    // Seed Courses
    console.log('\n📚 Seeding courses...');
    for (const course of courses) {
      await Course.findOneAndUpdate({ url: course.url }, course, { upsert: true, new: true });
      console.log('  ✓ Upserted course:', course.name);
    }

    console.log('\n🎉 All data seeded successfully!');
  } catch (err) {
    console.error('❌ Error during seeding:', err.message);
  } finally {
    if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
    process.exit(0);
  }
}

seedAll();
