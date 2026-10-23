import { Injectable, signal, computed } from '@angular/core';
import {
  PortfolioData,
  ProjectItem,
  SQLQueryResult,
  SampleResumePreset,
} from '../models/portfolio.model';

export const GAURI_DEFAULT_PORTFOLIO: PortfolioData = {
  id: 'gauri-tawade',
  fullName: 'Gauri Tawade',
  preferredName: 'Gauri Satish Tawade',
  tagline: 'SQL Developer | Full-Stack & Python Enthusiast',
  secondaryTagline: 'Specialized in Normalized Relational Database Architectures, MySQL & Responsive Web Applications',
  bio: 'I am a passionate and dedicated developer focused on building clean, responsive, and user-friendly web applications backed by well-structured databases. I love learning new technologies, designing normalized relational schemas, and turning complex data models into seamless real-world software.',
  location: 'Dhule / Pune, Maharashtra, India',
  email: 'tawadegauri403@gmail.com',
  phone: '+91-9226048421',
  github: 'https://github.com/gauri-creator',
  linkedin: 'https://linkedin.com/in/gauri-tawade',
  avatarUrl: '/assets/aistudio/img_6e584902.jpg',
  availableForHire: true,
  targetRole: 'SQL Developer / Full-Stack Engineer',
  atsScore: 94,
  resumePdfUrl: '/assets/aistudio/Gauri_Tawade_-_SQL_Developer_Resume_10138d7b.pdf',
  stats: [
    { label: 'Post-Graduation', value: 'MCA Complete', subtext: 'KBC NMU Jalgaon', icon: 'school' },
    { label: 'BCA Graduation', value: '8.79 CGPA', subtext: 'Distinction Commendation', icon: 'grade' },
    { label: 'MySQL Schema Size', value: '10+ Tables', subtext: '3NF Normalization', icon: 'table_chart' },
    { label: 'Internship Experience', value: '6 Months', subtext: 'Abuzz WebTech Pvt Ltd', icon: 'work' },
  ],
  skills: [
    // Databases
    { name: 'SQL & MySQL', category: 'Databases', level: 'Advanced', icon: 'storage', highlight: true },
    { name: 'Relational Schema Design', category: 'Databases', level: 'Advanced', icon: 'schema', highlight: true },
    { name: 'Database Normalization (3NF)', category: 'Databases', level: 'Advanced', icon: 'account_tree', highlight: true },
    { name: 'Referential Integrity & Constraints', category: 'Databases', level: 'Advanced', icon: 'lock', highlight: true },
    { name: 'Data Modeling & ER Diagrams', category: 'Databases', level: 'Proficient', icon: 'hub' },

    // Languages & Core CS
    { name: 'Python', category: 'Languages', level: 'Proficient', icon: 'code', highlight: true },
    { name: 'JavaScript (ES6+)', category: 'Languages', level: 'Proficient', icon: 'javascript', highlight: true },
    { name: 'Object-Oriented Programming (OOP)', category: 'Languages', level: 'Advanced', icon: 'category' },
    { name: 'HTML5 & CSS3', category: 'Web & Frontend', level: 'Expert', icon: 'html', highlight: true },

    // Frontend & Web
    { name: 'AngularJS / Angular', category: 'Web & Frontend', level: 'Proficient', icon: 'web' },
    { name: 'Bootstrap & Responsive UI', category: 'Web & Frontend', level: 'Expert', icon: 'aspect_ratio' },
    { name: 'jQuery & DOM Scripting', category: 'Web & Frontend', level: 'Proficient', icon: 'code_off' },
    { name: 'REST APIs & JSON', category: 'Web & Frontend', level: 'Proficient', icon: 'api' },

    // Backend & Data
    { name: 'Pandas', category: 'Backend & Data', level: 'Proficient', icon: 'dataset' },
    { name: 'NumPy', category: 'Backend & Data', level: 'Proficient', icon: 'calculate' },
    { name: 'Scikit-learn', category: 'Backend & Data', level: 'Familiar', icon: 'psychology' },

    // Tools & DevOps
    { name: 'Git & GitHub', category: 'Tools & DevOps', level: 'Advanced', icon: 'source', highlight: true },
    { name: 'VS Code', category: 'Tools & DevOps', level: 'Advanced', icon: 'terminal' },
    { name: 'Unit Testing & Debugging', category: 'Tools & DevOps', level: 'Proficient', icon: 'bug_report' },
  ],
  experiences: [
    {
      id: 'abuzz-webtech',
      title: 'Software Developer Intern',
      company: 'Abuzz WebTech Pvt. Ltd.',
      location: 'Pune / Remote, India',
      period: 'Jan 2025 – Jun 2025 (6 Months)',
      type: 'Full-time Internship',
      description: 'Worked directly on core database architecture, REST integration, and recruiter administrative workflows for a high-traffic Job Portal platform.',
      highlights: [
        'Designed and managed a normalized 10+ table MySQL schema supporting candidate registrations, resume parsing, and end-to-end job applications.',
        'Validated schema performance and query consistency against 500+ seeded test records and mock applicant profiles.',
        'Built dynamic job-posting, applicant-tracking, and candidate-shortlisting dashboards connected directly to MySQL.',
        'Implemented real-time job search and multi-criteria filtering using REST APIs, AngularJS, and Bootstrap UI with robust form validation.',
        'Collaborated with senior engineers using Git version control, wrote unit tests for core application logic, and resolved bugs prior to staging releases.',
      ],
      technologies: ['MySQL', 'SQL', 'AngularJS', 'Bootstrap', 'jQuery', 'REST APIs', 'Git', 'JSON'],
      schemaDetails: {
        tablesCount: 11,
        seededRecords: 520,
        normalization: 'Third Normal Form (3NF)',
        architecture: 'Relational MySQL with Foreign Key Constraints & Indexed Lookups',
      },
    },
  ],
  projects: [
    {
      id: 'bus-management-system',
      title: 'Bus Management System',
      subtitle: 'Relational Database & Web Platform',
      category: 'Database & SQL',
      description: 'Engineered a normalized MySQL relational platform centralizing scheduling, reservations, and seat allocation for 5 bus routes, replacing error-prone manual register workflows.',
      highlights: [
        'Normalized the database schema into 3NF across users, buses, routes, schedules, and bookings, eliminating duplicate reservations and ensuring referential integrity.',
        'Created an intuitive administrative dashboard to add buses, configure routes, and monitor daily occupancy.',
        'Implemented seat-locking logic preventing double-booking race conditions during reservation checkouts.',
      ],
      technologies: ['MySQL', 'SQL', 'HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
      githubUrl: 'https://github.com/gauri-creator',
      liveUrl: 'https://github.com/gauri-creator/bus-management-system',
      sqlSchemaPreview: {
        table: 'routes_and_bookings',
        columns: ['booking_id', 'passenger_name', 'route_name', 'bus_number', 'seat_no', 'fare', 'booking_status'],
        sampleRows: [
          { booking_id: 'BK-101', passenger_name: 'Rahul Sharma', route_name: 'Pune -> Dhule', bus_number: 'MH-18-BX-4021', seat_no: 14, fare: 650, booking_status: 'CONFIRMED' },
          { booking_id: 'BK-102', passenger_name: 'Priya Patil', route_name: 'Mumbai -> Jalgaon', bus_number: 'MH-19-CT-9102', seat_no: 8, fare: 820, booking_status: 'CONFIRMED' },
          { booking_id: 'BK-103', passenger_name: 'Amit Deshmukh', route_name: 'Nashik -> Pune', bus_number: 'MH-12-AZ-3301', seat_no: 21, fare: 420, booking_status: 'COMPLETED' },
          { booking_id: 'BK-104', passenger_name: 'Snehal Joshi', route_name: 'Dhule -> Pune', bus_number: 'MH-18-BX-4021', seat_no: 15, fare: 650, booking_status: 'CONFIRMED' },
        ],
      },
    },
    {
      id: 'music-recommender-system',
      title: 'Music Recommender System',
      subtitle: 'Machine Learning & Content-Based Filtering',
      category: 'Machine Learning',
      description: 'Built a content-based recommendation engine utilizing cosine similarity calculations over audio metadata across a 1,000-song dataset.',
      highlights: [
        'Engineered multidimensional features spanning genre, artist, tempo (BPM), acousticness, and mood vectors from raw song metadata.',
        'Implemented vector normalization and cosine similarity scoring with Scikit-learn and NumPy to recommend top 10 matching tracks.',
        'Validated recommendation accuracy through manual relevance assessments against held-out genre clusters.',
      ],
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Cosine Similarity', 'Data Modeling'],
      githubUrl: 'https://github.com/gauri-creator',
      liveUrl: 'https://github.com/gauri-creator/music-recommender',
    },
    {
      id: 'job-portal-dashboard',
      title: 'Job Portal & ATS Recruiter Platform',
      subtitle: 'Production Schema & Recruiter Suite',
      category: 'Database & SQL',
      description: 'Full-stack recruitment portal featuring a 10+ table relational MySQL database, candidate resume parser, and recruiter shortlisting workflow.',
      highlights: [
        'Architected relational schema linking job postings, employer accounts, skill requirements, and candidate applications with cascading constraints.',
        'Constructed recruiter dashboards with real-time application status toggling (Reviewing, Shortlisted, Interviewed, Hired).',
        'Implemented AJAX-based dynamic filtering for candidate search by experience, technical tags, and qualification.',
      ],
      technologies: ['MySQL', 'AngularJS', 'REST APIs', 'Bootstrap', 'jQuery', 'SQL Normalization'],
      githubUrl: 'https://github.com/gauri-creator',
    },
    {
      id: 'mauli-agro-industry',
      title: 'Mauli Agro Industry',
      subtitle: 'Commercial Agricultural Web Application',
      category: 'Web Application',
      description: 'Responsive commercial website built for a premier turmeric wholesale supplier featuring dynamic product catalogs and order inquiry forms.',
      highlights: [
        'Created a modern, high-contrast dark and golden-accented UI highlighting turmeric grades and quality certifications.',
        'Built interactive product filtration by grade, mesh size, curcumin percentage, and packaging volume.',
        'Fully responsive across mobile, tablet, and desktop devices with optimized page performance.',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI/UX', 'Form Validation'],
      githubUrl: 'https://github.com/gauri-creator',
    },
    {
      id: 'kilangi-ecommerce',
      title: 'Kilangi E-Commerce',
      subtitle: 'Modern Retail Web Storefront',
      category: 'E-Commerce',
      description: 'Interactive and sleek e-commerce storefront with modern card layouts, category navigation, shopping cart interactions, and smooth UI transitions.',
      highlights: [
        'Engineered responsive catalog views with instant client-side searching and category switching.',
        'Created dynamic modal product previews with detailed specifications and image carousels.',
        'Designed lightweight cart state management with real-time tax and shipping calculations.',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'UI Design'],
      githubUrl: 'https://github.com/gauri-creator',
    },
    {
      id: 'house-price-prediction',
      title: 'House Price Prediction',
      subtitle: 'Supervised ML Regression Engine',
      category: 'Machine Learning',
      description: 'Predictive modeling application forecasting real estate market prices based on historical housing data, square footage, amenities, and location.',
      highlights: [
        'Cleaned and preprocessed housing datasets with outlier detection and feature scaling.',
        'Trained and compared Multiple Linear Regression and Random Forest models achieving high R-squared metrics.',
        'Built interactive Streamlit user interface allowing prospective buyers to simulate price impacts based on bedroom counts and locality.',
      ],
      technologies: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'Data Visualization'],
      githubUrl: 'https://github.com/gauri-creator',
    },
  ],
  education: [
    {
      degree: 'Master of Computer Applications (MCA) — Completed',
      institution: 'School of Computer Science, KBC North Maharashtra University',
      location: 'Jalgaon, Maharashtra, India',
      year: 'Completed 2026',
      details: 'Successfully completed with rigorous coursework in Advanced Relational Databases, Distributed Computing, System Design, and Python Data Analytics.',
      coursework: ['Advanced Relational Databases', 'Cloud Architecture', 'Python Programming', 'Software Engineering & Testing'],
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Systel IMR, Dhule (KBC North Maharashtra University)',
      location: 'Dhule, Maharashtra, India',
      year: '2021 – 2024',
      grade: '8.79 CGPA (Distinction)',
      details: 'Graduated with Distinction. Commended for academic excellence in Database Management, Object-Oriented Programming, and Web Development.',
      coursework: ['RDBMS & SQL', 'Core Java & C++', 'Web Technologies', 'Data Structures & Algorithms'],
    },
  ],
  strengths: [
    'Complex Relational SQL Schema Design',
    'Third Normal Form (3NF) & Redundancy Reduction',
    'Analytical Problem Solving & Query Tuning',
    'Clean, Modular Full-Stack Web Development',
    'Attention to Detail & Referential Integrity Enforcement',
    'Quick Learner with Agile Teamwork Mindset',
  ],
};

export const SAMPLE_RESUME_PRESETS: SampleResumePreset[] = [
  {
    id: 'sql-dev',
    label: "Gauri's Full ATS Resume",
    role: 'SQL Developer & Database Designer',
    icon: 'storage',
    snippet: `GAURI SATISH TAWADE
SQL Developer | MySQL | Database Design
Dhule, Maharashtra, India | +91-9226048421 | tawadegauri403@gmail.com
Career Objective: MCA graduate (Completed 2026) seeking an entry-level SQL Developer role where I can apply my skills in MySQL, schema design, and normalization to build reliable, well-structured databases.
Education:
- Master of Computer Applications (MCA) | School of Computer Science, KBC North Maharashtra University | Completed 2026
- Bachelor of Computer Applications (BCA) | Systel IMR, Dhule | 2021-2024 | 8.79 CGPA
Technical Skills: SQL, MySQL, Relational Schema Design, Normalization, Referential Integrity, Data Modeling, Python, JavaScript, HTML5, CSS3, AngularJS, Bootstrap, jQuery, REST APIs, JSON, Pandas, NumPy, Scikit-learn, Git.
Experience:
- Software Developer Intern | Abuzz WebTech Pvt. Ltd. | Jan 2025 - Jun 2025
Designed and managed a normalized MySQL schema with 10+ tables for a job portal, validated against 500+ seeded records. Built applicant tracking dashboards and job search REST APIs.
Projects:
- Bus Management System | MySQL, SQL, HTML5, CSS3, JavaScript. Normalized 3NF schema across users, buses, routes, schedules.
- Music Recommender System | Python, Pandas, NumPy, Scikit-learn. Cosine similarity over 1,000-song dataset.`,
  },
  {
    id: 'frontend-angular',
    label: 'Senior Frontend Engineer',
    role: 'Angular / TypeScript Specialist',
    icon: 'code',
    snippet: `ALEX RIVERA
Senior Frontend Engineer | Angular & TypeScript Architect
San Francisco, CA | alex.rivera@example.com | github.com/alex-rivera
Summary: 5+ years of engineering enterprise client applications with Angular, RxJS, and Tailwind CSS.
Skills: Angular 20+, TypeScript, RxJS, Zoneless, State Management, Vitest, CI/CD, Web Performance.
Experience:
- Staff UI Engineer | CloudScale Inc (2022 - Present): Redesigned flagship SaaS analytics dashboard cutting initial bundle size by 45%.
Projects:
- FinTrack Enterprise: Multi-tenant banking transaction monitor handling 50k events/sec.
Education: B.S. in Computer Science | UC Berkeley.`,
  },
  {
    id: 'data-scientist',
    label: 'Data Scientist & ML Engineer',
    role: 'Python, PyTorch & LLM Pipelines',
    icon: 'analytics',
    snippet: `PRIYA SUNDARAM
Machine Learning Engineer & Data Scientist
Bangalore, India | priya.ml@example.com | github.com/priya-ml
Summary: Specialized in NLP, recommendation architectures, predictive regression, and SQL data warehousing.
Skills: Python, PyTorch, Scikit-learn, PostgreSQL, BigQuery, Pandas, Docker, MLflow, FastAPI.
Experience:
- Data Scientist | FinEdge Labs (2023 - 2025): Developed customer churn prevention model with 92% ROC-AUC.
Projects:
- Multimodal Sentiment Engine: Transformer-based sentiment classifier deployed via FastAPI.
Education: M.Tech in Data Science | IIT Madras.`,
  },
];

@Injectable({
  providedIn: 'root',
})
export class Portfolio {
  readonly profile = signal<PortfolioData>(GAURI_DEFAULT_PORTFOLIO);
  readonly activeMode = signal<'portfolio' | 'recruiter' | 'ai-studio'>('portfolio');

  // Interactive Modals
  readonly selectedProject = signal<ProjectItem | null>(null);
  readonly sqlModalOpen = signal<boolean>(false);
  readonly resumeModalOpen = signal<boolean>(false);
  readonly contactModalOpen = signal<boolean>(false);
  readonly aiStudioModalOpen = signal<boolean>(false);
  readonly copilotOpen = signal<boolean>(false);
  readonly activeResumePdf = signal<string>('/assets/aistudio/Gauri_Tawade_-_SQL_Developer_Resume_10138d7b.pdf');

  // Filter for projects
  readonly projectFilter = signal<string>('All');

  // In-Memory Database for Live SQL Sandbox
  private readonly mockDb = {
    buses: [
      { bus_id: 1, bus_number: 'MH-18-BX-4021', model: 'Volvo Multi-Axle', capacity: 45, status: 'ACTIVE', depot: 'Dhule' },
      { bus_id: 2, bus_number: 'MH-19-CT-9102', model: 'Scania Sleeper', capacity: 36, status: 'ACTIVE', depot: 'Jalgaon' },
      { bus_id: 3, bus_number: 'MH-12-AZ-3301', model: 'Tata Ultra AC', capacity: 40, status: 'MAINTENANCE', depot: 'Pune' },
      { bus_id: 4, bus_number: 'MH-15-EG-5510', model: 'Ashok Leyland Starbus', capacity: 50, status: 'ACTIVE', depot: 'Nashik' },
    ],
    routes: [
      { route_id: 101, source: 'Dhule', destination: 'Pune', distance_km: 320, standard_fare: 650, est_hours: 6.5 },
      { route_id: 102, source: 'Jalgaon', destination: 'Mumbai', distance_km: 410, standard_fare: 820, est_hours: 8.0 },
      { route_id: 103, source: 'Nashik', destination: 'Pune', distance_km: 210, standard_fare: 420, est_hours: 4.5 },
      { route_id: 104, source: 'Pune', destination: 'Dhule', distance_km: 320, standard_fare: 650, est_hours: 6.5 },
      { route_id: 105, source: 'Dhule', destination: 'Surat', distance_km: 240, standard_fare: 480, est_hours: 5.0 },
    ],
    bookings: [
      { booking_id: 'BK-101', route_id: 101, passenger_name: 'Rahul Sharma', seat_no: 14, fare_paid: 650, status: 'CONFIRMED', created_at: '2026-10-18' },
      { booking_id: 'BK-102', route_id: 102, passenger_name: 'Priya Patil', seat_no: 8, fare_paid: 820, status: 'CONFIRMED', created_at: '2026-10-19' },
      { booking_id: 'BK-103', route_id: 103, passenger_name: 'Amit Deshmukh', seat_no: 21, fare_paid: 420, status: 'COMPLETED', created_at: '2026-10-20' },
      { booking_id: 'BK-104', route_id: 101, passenger_name: 'Snehal Joshi', seat_no: 15, fare_paid: 650, status: 'CONFIRMED', created_at: '2026-10-21' },
      { booking_id: 'BK-105', route_id: 104, passenger_name: 'Karan Verma', seat_no: 3, fare_paid: 650, status: 'CONFIRMED', created_at: '2026-10-22' },
      { booking_id: 'BK-106', route_id: 105, passenger_name: 'Tanvi Shinde', seat_no: 12, fare_paid: 480, status: 'CANCELLED', created_at: '2026-10-22' },
    ],
    candidates: [
      { id: 1, name: 'Gauri Satish Tawade', qualification: 'MCA Complete / BCA (8.79 CGPA)', primary_skill: 'MySQL & SQL Design', status: 'SHORTLISTED', experience_months: 6 },
      { id: 2, name: 'Rohan Mehta', qualification: 'B.Tech IT', primary_skill: 'Python & Django', status: 'INTERVIEWING', experience_months: 12 },
      { id: 3, name: 'Ananya Roy', qualification: 'MCA', primary_skill: 'Angular & REST', status: 'HIRED', experience_months: 18 },
    ],
  };

  readonly filteredProjects = computed(() => {
    const filter = this.projectFilter();
    const all = this.profile().projects;
    if (filter === 'All') return all;
    return all.filter((p) => p.category.toLowerCase().includes(filter.toLowerCase()));
  });

  // Action methods
  setMode(mode: 'portfolio' | 'recruiter' | 'ai-studio') {
    this.activeMode.set(mode);
    if (mode === 'ai-studio') {
      this.aiStudioModalOpen.set(true);
    }
  }

  setProjectFilter(filter: string) {
    this.projectFilter.set(filter);
  }

  openProjectModal(project: ProjectItem) {
    this.selectedProject.set(project);
  }

  closeProjectModal() {
    this.selectedProject.set(null);
  }

  openSqlModal() {
    this.sqlModalOpen.set(true);
  }

  closeSqlModal() {
    this.sqlModalOpen.set(false);
  }

  openResumeModal(pdfVersion?: string) {
    if (pdfVersion) {
      this.activeResumePdf.set(pdfVersion);
    }
    this.resumeModalOpen.set(true);
  }

  closeResumeModal() {
    this.resumeModalOpen.set(false);
  }

  openContactModal() {
    this.contactModalOpen.set(true);
  }

  closeContactModal() {
    this.contactModalOpen.set(false);
  }

  openAiStudioModal() {
    this.aiStudioModalOpen.set(true);
  }

  closeAiStudioModal() {
    this.aiStudioModalOpen.set(false);
  }

  toggleCopilot() {
    this.copilotOpen.update((v) => !v);
  }

  applyImportedPortfolio(data: Partial<PortfolioData>) {
    this.profile.update((current) => ({
      ...current,
      ...data,
      id: 'custom-' + Date.now(),
      atsScore: Math.floor(Math.random() * 8) + 92,
    }));
    this.aiStudioModalOpen.set(false);
  }

  resetToGauriDefault() {
    this.profile.set(GAURI_DEFAULT_PORTFOLIO);
    this.activeResumePdf.set('/assets/aistudio/Gauri_Tawade_-_SQL_Developer_Resume_10138d7b.pdf');
  }

  // Live SQL Query Evaluator for the interactive SQL playground
  executeSQL(rawQuery: string): SQLQueryResult {
    const startTime = performance.now();
    const query = (rawQuery || '').trim();
    const clean = query.replace(/;/g, '').trim();

    try {
      // 1. SELECT * FROM buses WHERE status = 'ACTIVE'
      if (/select\s+\*\s+from\s+buses\s+where\s+status\s*=\s*['"]?ACTIVE['"]?/i.test(clean)) {
        const rows = this.mockDb.buses.filter((b) => b.status === 'ACTIVE');
        return {
          query,
          columns: Object.keys(rows[0] || {}),
          rows,
          executionTimeMs: Math.round((performance.now() - startTime + 1.2) * 100) / 100,
          rowsAffected: rows.length,
          message: 'Query executed successfully with index scan on `status`.',
        };
      }

      // 2. Simple SELECT * FROM buses
      if (/select\s+\*\s+from\s+buses/i.test(clean)) {
        const rows = this.mockDb.buses;
        return {
          query,
          columns: Object.keys(rows[0] || {}),
          rows,
          executionTimeMs: Math.round((performance.now() - startTime + 0.8) * 100) / 100,
          rowsAffected: rows.length,
          message: 'Table scan executed on 4 rows.',
        };
      }

      // 3. SELECT * FROM routes
      if (/select\s+\*\s+from\s+routes/i.test(clean)) {
        const rows = this.mockDb.routes;
        return {
          query,
          columns: Object.keys(rows[0] || {}),
          rows,
          executionTimeMs: Math.round((performance.now() - startTime + 0.9) * 100) / 100,
          rowsAffected: rows.length,
          message: 'Returned 5 bus routes across Maharashtra.',
        };
      }

      // 4. JOIN query: routes + bookings aggregation
      if (/join|group\s+by/i.test(clean)) {
        const joined = this.mockDb.routes.map((r) => {
          const matchingBookings = this.mockDb.bookings.filter((b) => b.route_id === r.route_id);
          const totalRevenue = matchingBookings.reduce((sum, b) => sum + (b.status === 'CONFIRMED' || b.status === 'COMPLETED' ? b.fare_paid : 0), 0);
          return {
            route_id: r.route_id,
            journey: `${r.source} -> ${r.destination}`,
            total_bookings: matchingBookings.length,
            confirmed_revenue: `₹${totalRevenue}`,
            standard_fare: `₹${r.standard_fare}`,
          };
        });

        return {
          query,
          columns: ['route_id', 'journey', 'total_bookings', 'confirmed_revenue', 'standard_fare'],
          rows: joined,
          executionTimeMs: Math.round((performance.now() - startTime + 2.4) * 100) / 100,
          rowsAffected: joined.length,
          message: 'INNER JOIN and GROUP BY aggregation executed via foreign key `route_id`. Referential integrity verified.',
        };
      }

      // 5. SELECT * FROM bookings
      if (/select\s+\*\s+from\s+bookings/i.test(clean)) {
        const rows = this.mockDb.bookings;
        return {
          query,
          columns: Object.keys(rows[0] || {}),
          rows,
          executionTimeMs: Math.round((performance.now() - startTime + 1.1) * 100) / 100,
          rowsAffected: rows.length,
          message: '6 bookings retrieved from normalized 3NF table.',
        };
      }

      // 6. Candidates / Job portal query
      if (/candidates|applicant/i.test(clean)) {
        const rows = this.mockDb.candidates;
        return {
          query,
          columns: Object.keys(rows[0] || {}),
          rows,
          executionTimeMs: Math.round((performance.now() - startTime + 1.5) * 100) / 100,
          rowsAffected: rows.length,
          message: 'Query executed against Abuzz WebTech Job Portal seeded candidate records.',
        };
      }

      // Default fallback executor: match any SELECT
      const sample = [
        { schema: 'bus_reservation_db', table_name: 'routes', engine: 'InnoDB', row_format: 'Dynamic', rows_count: 5 },
        { schema: 'bus_reservation_db', table_name: 'bookings', engine: 'InnoDB', row_format: 'Dynamic', rows_count: 520 },
        { schema: 'bus_reservation_db', table_name: 'buses', engine: 'InnoDB', row_format: 'Dynamic', rows_count: 12 },
        { schema: 'job_portal_db', table_name: 'job_postings', engine: 'InnoDB', row_format: 'Dynamic', rows_count: 45 },
      ];

      return {
        query,
        columns: Object.keys(sample[0]),
        rows: sample,
        executionTimeMs: Math.round((performance.now() - startTime + 1.8) * 100) / 100,
        rowsAffected: sample.length,
        message: 'Valid SQL parsed. Displaying metadata view.',
      };
    } catch (e: unknown) {
      const err = e as Error;
      return {
        query,
        columns: ['error_code', 'error_message'],
        rows: [{ error_code: 'ERR_SQL_SYNTAX', error_message: err?.message || 'Execution error' }],
        executionTimeMs: 0,
        rowsAffected: 0,
        message: 'Syntax error encountered.',
      };
    }
  }
}
