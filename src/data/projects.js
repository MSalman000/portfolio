/**
 * Project data — single source of truth.
 * Add a new project: append an entry. The Index renders from this array.
 */

export const projects = [
  {
    num: '01',
    year: '2025',
    title: 'Noir Cabs',
    category: 'FULL-STACK CAB BOOKING PLATFORM',
    description:
      'A production-style ride-hailing application supporting three user roles — customer, driver, admin — with stateless JWT authentication, a nearest-driver dispatch algorithm using OpenStreetMap geocoding and the Haversine formula, and a complete trip lifecycle managed as a state machine. Built end-to-end on Spring Boot 3 and React 18.',
    detail: [
      {
        key: 'Architecture',
        // Plain HTML in val so we can inject <code> tags safely.
        val:
          'Layered monolith, feature-packaged. REST API on :8081, React SPA on :5173. Stateless JWT auth via custom <code>JwtAuthFilter</code>.',
      },
      {
        key: 'Notable',
        val:
          'Booking state machine <code>PENDING → BOOKED → ON_TRIP → COMPLETED</code> · nearest-driver dispatch via Haversine over Nominatim geocodes (20 km radius) · soft-orphan deletion preserving trip history',
      },
    ],
    stack: 'Java 17 · Spring Boot 3 · Spring Security · JPA · MySQL · JWT · React 18 · Vite · OpenStreetMap Nominatim',
    href: '#',
    status: 'open',
  },
  {
    num: '02',
    year: '2025',
    title: 'Resume Match Analyzer',
    category: 'RAG / RETRIEVAL',
    description:
      'A retrieval-augmented evaluator scoring resumes against job descriptions semantically rather than by keyword. Document chunking, vector embeddings, FAISS retrieval, and per-requirement scoring with explanations. Built end-to-end in Python with LangChain and OpenAI.',
    detail: [
      {
        key: 'Architecture',
        val:
          'RAG pipeline — document chunker, embedding store (FAISS), retrieval layer, requirement-mapped scoring with structured explanations.',
      },
      {
        key: 'Notable',
        val:
          'Per-requirement scoring instead of single global score · matched skills, missing skills, and improvement suggestions returned as structured output',
      },
    ],
    stack: 'Python · LangChain · FAISS · OpenAI · RAG',
    href: '#',
    status: 'open',
  },
  {
    num: '03',
    year: '2025',
    title: 'HyperLocal Events',
    category: 'FULL-STACK PLATFORM',
    description:
      'A full-stack platform for creating, managing, and discovering events at a local level. Spring Boot MVC backend with REST APIs, JPA-backed persistence, and server-rendered Thymeleaf views, with a complete CRUD layer covered by unit tests.',
    detail: [
      {
        key: 'Architecture',
        val:
          'Spring Boot MVC monolith with REST endpoints and Thymeleaf SSR. JPA-backed persistence over MySQL.',
      },
      {
        key: 'Notable',
        val:
          'Complete CRUD coverage with unit tests · clean separation of controller, service, and repository layers',
      },
    ],
    stack: 'Java · Spring Boot · JPA · Thymeleaf · MySQL',
    href: '#',
    status: 'open',
  },
  {
    num: '04',
    year: '2026',
    title: 'Cognizant',
    category: 'FULL-STACK ENGINEERING ENGAGEMENT',
    description:
      'Twelve-week engagement building enterprise web applications. Designed and shipped REST APIs in Spring Boot, integrated React frontends, and deployed services to Google Cloud Platform with relational persistence handled through JPA.',
    detail: [
      {
        key: 'Architecture',
        val:
          'Spring Boot service layer exposing REST APIs, React SPA frontend, deployed and managed on Google Cloud Platform.',
      },
      {
        key: 'Notable',
        val:
          'Production-grade enterprise codebase exposure · cloud deployment workflow · MySQL persistence via JPA',
      },
    ],
    stack: 'Java · Spring Boot · React · GCP · MySQL',
    href: null,
    status: 'closed',
  },
];
