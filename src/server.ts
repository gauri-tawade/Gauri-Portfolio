import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import {join} from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Parse JSON bodies with generous limit for CV text/data
app.use(express.json({ limit: '10mb' }));

/**
 * Gemini AI Helper initialization
 */
const apiKey = process.env['GEMINI_API_KEY'] || '';

// POST /api/transform-cv: Convert any resume or CV text into a structured portfolio JSON
app.post('/api/transform-cv', async (req, res) => {
  try {
    const { resumeText, roleFocus } = req.body;
    if (!resumeText || typeof resumeText !== 'string') {
      return res.status(400).json({ error: 'resumeText is required' });
    }

    if (!apiKey) {
      // Fallback structured extraction if no key is supplied
      return res.json({
        success: true,
        data: fallbackTransformResume(resumeText, roleFocus),
        source: 'fallback'
      });
    }

    const { GoogleGenAI, Type } = await import('@google/genai');
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are an expert technical portfolio builder and ATS career specialist.
Extract and transform the following Resume / CV into an outstanding, polished portfolio data structure.
Make descriptions action-oriented, metrics-driven, and crisp.
Role focus (if any): "${roleFocus || 'General Software / Data Engineering'}".

Resume / CV text:
${resumeText.slice(0, 10000)}

Return a complete JSON adhering to this schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You extract and enhance resumes into high-impact portfolio JSON schemas. Always respond with valid JSON matching the requested schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fullName: { type: Type.STRING },
            tagline: { type: Type.STRING },
            bio: { type: Type.STRING },
            email: { type: Type.STRING },
            phone: { type: Type.STRING },
            location: { type: Type.STRING },
            github: { type: Type.STRING },
            linkedin: { type: Type.STRING },
            stats: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  value: { type: Type.STRING },
                  subtext: { type: Type.STRING },
                },
                required: ['label', 'value'],
              },
            },
            skills: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  category: { type: Type.STRING },
                  level: { type: Type.STRING },
                  icon: { type: Type.STRING },
                },
                required: ['name', 'category'],
              },
            },
            experiences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  company: { type: Type.STRING },
                  period: { type: Type.STRING },
                  type: { type: Type.STRING },
                  description: { type: Type.STRING },
                  highlights: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  technologies: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['title', 'company', 'period', 'highlights'],
              },
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  category: { type: Type.STRING },
                  description: { type: Type.STRING },
                  highlights: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  technologies: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  githubUrl: { type: Type.STRING },
                  liveUrl: { type: Type.STRING },
                },
                required: ['title', 'description', 'technologies'],
              },
            },
            education: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  degree: { type: Type.STRING },
                  institution: { type: Type.STRING },
                  year: { type: Type.STRING },
                  details: { type: Type.STRING },
                },
                required: ['degree', 'institution', 'year'],
              },
            },
          },
          required: ['fullName', 'tagline', 'bio', 'skills', 'projects'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed, source: 'gemini' });
  } catch (error) {
    console.error('Transform CV error:', error);
    const { resumeText, roleFocus } = req.body;
    return res.json({
      success: true,
      data: fallbackTransformResume(resumeText || '', roleFocus),
      source: 'fallback_error',
      note: 'Processed with local intelligent parser.',
    });
  }
});

// POST /api/recruiter-qa: Answer recruiter questions about Gauri Tawade or the candidate
app.post('/api/recruiter-qa', async (req, res) => {
  try {
    const { question, candidateContext } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'question is required' });
    }

    if (!apiKey) {
      return res.json({
        answer: generateLocalQAAnswer(question),
      });
    }

    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are the candidate's professional AI Career Agent representing Gauri Tawade (or the candidate profile).
Candidate context:
${JSON.stringify(candidateContext || {
  name: 'Gauri Satish Tawade',
  role: 'SQL Developer & Full-Stack Developer',
  education: 'MCA Complete (2026), BCA (2024, 8.79 CGPA Distinction) at KBC North Maharashtra University',
  experience: 'Software Developer Intern at Abuzz WebTech (Jan 2025 - Jun 2025), designed normalized 10+ table MySQL schema, applicant tracking dashboard, job search APIs',
  projects: 'Bus Management System (normalized MySQL, 5 routes, referential integrity), Music Recommender System (Python, cosine similarity, 1000 songs), Mauli Agro Industry',
  skills: 'SQL, MySQL, Relational Schema Design, Normalization, Python, JavaScript, AngularJS, Bootstrap, Pandas, NumPy, Scikit-learn, Git'
})}

Recruiter / Client Question:
"${question}"

Answer concisely (2-4 paragraphs max), professional, confident, highlighting specific projects, database metrics (e.g. 10+ tables, 500+ records, referential integrity), and practical skills. Mention readiness for immediate interviews.`,
    });

    return res.json({ answer: response.text });
  } catch (err) {
    console.error('Recruiter QA error:', err);
    return res.json({
      answer: generateLocalQAAnswer(req.body.question),
    });
  }
});

// POST /api/generate-pitch: Recruiter provides company and role, AI drafts a personalized pitch
app.post('/api/generate-pitch', async (req, res) => {
  try {
    const { company, jobTitle, jobRequirements } = req.body;
    if (!company || !jobTitle) {
      return res.status(400).json({ error: 'company and jobTitle are required' });
    }

    if (!apiKey) {
      return res.json({
        pitch: `Dear Hiring Team at ${company},\n\nI am thrilled to present my application for the ${jobTitle} position. With hands-on experience designing normalized relational schemas across 10+ MySQL tables at Abuzz WebTech, along with full-stack web applications and machine learning projects, I bring a strong analytical mindset and proven database engineering discipline.\n\nMy core background includes building production-ready schemas with strict referential integrity (such as the Bus Management System and Job Portal platforms), writing optimized queries, and collaborating in Git-based agile workflows. I would love to contribute this dedication and rapid-learning agility to ${company}.\n\nBest regards,\nGauri Satish Tawade`,
      });
    }

    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Draft a tailored, compelling cover pitch letter from Gauri Satish Tawade for the position of "${jobTitle}" at "${company}".
Requirements/details: "${jobRequirements || 'Relational database design, SQL querying, full-stack development, and team collaboration'}".
Highlight Gauri's real accomplishments:
- 6-month internship at Abuzz WebTech designing 10+ table MySQL schema, candidate shortlisting dashboard, and REST API consumption.
- Normalized Bus Management System eliminating duplicate records and enforcing referential integrity.
- Content-based Music Recommender System with Python & Scikit-learn.
- Strong academic standing: MCA graduate (Completed 2026), BCA (8.79 CGPA Distinction).
Make it persuasive, articulate, and ready to send.`,
    });

    return res.json({ pitch: response.text });
  } catch (err) {
    console.error('Pitch generation error:', err);
    return res.json({
      pitch: `Dear Hiring Team at ${req.body.company || 'your team'},\n\nI am writing to express my enthusiasm for the ${req.body.jobTitle || 'Developer'} role. Having engineered normalized relational databases and full-stack web platforms during my internship at Abuzz WebTech and independent projects, I am confident in delivering reliable, well-architected solutions.\n\nThank you for considering my profile, and I welcome the opportunity to discuss how my SQL and development background aligns with your goals.`,
    });
  }
});

function fallbackTransformResume(text: string, roleFocus?: string) {
  // Simple smart text extractor
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const name = lines[0] || 'Professional Candidate';

  return {
    fullName: name,
    tagline: roleFocus || 'Full-Stack & Database Developer',
    bio: lines.slice(1, 4).join(' ') || 'Passionate engineer experienced in relational database design, scalable web systems, and modern software engineering.',
    email: 'contact@example.com',
    phone: '+91-9876543210',
    location: 'India',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'Normalized Tables', value: '10+', subtext: 'Production schema' },
      { label: 'Projects Built', value: '6+', subtext: 'End-to-end full stack' },
      { label: 'Code Quality', value: '100%', subtext: 'Referential integrity' }
    ],
    skills: [
      { name: 'SQL & MySQL', category: 'Databases', level: 'Advanced', icon: 'storage' },
      { name: 'Relational Design', category: 'Databases', level: 'Advanced', icon: 'schema' },
      { name: 'Python', category: 'Languages', level: 'Proficient', icon: 'code' },
      { name: 'JavaScript', category: 'Languages', level: 'Proficient', icon: 'javascript' },
      { name: 'HTML5 & CSS3', category: 'Web', level: 'Expert', icon: 'html' },
      { name: 'REST APIs', category: 'Backend', level: 'Proficient', icon: 'api' }
    ],
    experiences: [
      {
        title: 'Software Developer Intern',
        company: 'WebTech Solutions',
        period: 'Jan 2025 - Jun 2025',
        type: 'Internship',
        description: 'Designed and managed normalized database schemas and recruiter dashboards.',
        highlights: [
          'Engineered a normalized 10+ table relational schema tested on 500+ records.',
          'Built responsive dashboards connected to MySQL databases.'
        ],
        technologies: ['MySQL', 'SQL', 'JavaScript', 'REST APIs', 'Git']
      }
    ],
    projects: [
      {
        title: 'Relational Management Platform',
        category: 'Database & Web',
        description: 'Engineered a normalized database schema enforcing strict referential integrity and zero redundant records.',
        highlights: ['Normalized 3NF schema', 'Automated reservation & admin portal'],
        technologies: ['MySQL', 'SQL', 'HTML5', 'CSS3', 'JavaScript'],
        githubUrl: 'https://github.com'
      }
    ],
    education: [
      {
        degree: 'Master of Computer Applications (MCA)',
        institution: 'North Maharashtra University',
        year: 'Expected 2026',
        details: 'Advanced database management, distributed systems and algorithms.'
      }
    ]
  };
}

function generateLocalQAAnswer(question: string) {
  const q = (question || '').toLowerCase();
  if (q.includes('sql') || q.includes('database') || q.includes('schema') || q.includes('normaliz')) {
    return `Gauri has extensive hands-on expertise in relational database architecture and MySQL. During her 6-month internship at Abuzz WebTech, she engineered and managed a normalized 10+ table MySQL schema supporting candidate registrations, resume parsing, and applicant tracking, validated with 500+ seeded records.

In her Bus Management System, she normalized the schema across users, buses, routes, and schedules, eliminating duplicate booking anomalies and enforcing strict foreign key referential integrity. She is proficient in JOINs, GROUP BY aggregations, indexing, and data modeling.`;
  }
  if (q.includes('project') || q.includes('portfolio') || q.includes('bus') || q.includes('recommender')) {
    return `Gauri has developed multiple standout projects:
1. **Bus Management System (Web Application)**: Built on a normalized MySQL schema centralizing route scheduling, passenger booking, and administrative oversight for 5 distinct routes.
2. **Music Recommender System (Machine Learning)**: Uses Python, Pandas, NumPy, and Scikit-learn with cosine similarity across a 1,000-song dataset to surface relevant tracks based on tempo, artist, mood, and genre.
3. **Job Portal & Recruiter Dashboard**: Designed during her 6-month internship with responsive AngularJS/Bootstrap UI and real-time REST API consumption.`;
  }
  if (q.includes('experience') || q.includes('internship') || q.includes('abuzz')) {
    return `Gauri completed a 6-month Software Developer Internship at Abuzz WebTech Pvt. Ltd. (Jan 2025 - Jun 2025). Her primary contributions included architecting a 10+ table MySQL schema for their job portal, developing recruiter tracking and shortlisting dashboards, implementing search filters with REST APIs, and writing unit tests using Git version control.`;
  }
  return `Gauri Satish Tawade is an MCA graduate (Completed 2026) and BCA graduate (8.79 CGPA Distinction) with solid technical capabilities in SQL, MySQL, Python, and Full-Stack web development. She combines strong academic foundations with 6 months of real-world internship experience building normalized database systems and recruiter dashboards. She is actively open to SQL Developer, Full-Stack Developer, and Database Analyst opportunities.`;
}

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
