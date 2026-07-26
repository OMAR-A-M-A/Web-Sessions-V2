<div align="center">

# Web-Sessions-V2

[![Live Demo](https://img.shields.io/badge/LIVE%20DEMO-CLICK%20HERE-brightgreen?style=for-the-badge)](#)

<br />

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

**A full-stack platform for managing learning content, coding assignments, and community interaction for the Front-End Team.**

</div>

> **Admin Access (Protected Dashboard)**
> The `/admin` routes are strictly protected via Supabase Auth, reserved exclusively for the platform owner to manage global content, feedback, and personal portfolio data.

---

## About The Project

**Web-Sessions-V2** is a modern, full-stack single-page web application built to be the official learning platform for the Front-End Team, entirely replacing the old static website with a fully dynamic content management system powered by **React 19**, **TypeScript**, and **Supabase**.

The platform serves two purposes at once:

- **A centralized learning hub** for team members — bringing together technical sessions, documentation links, coding/research assignments, and top student solutions in one organized place, grouped by technology (HTML, CSS, JavaScript, TypeScript, React, Git & GitHub).
- **A personal portfolio** for the platform owner — a professional digital resume showcasing experience, projects, skills, and certifications.

Every piece of content — sessions, tasks, portfolio data, feedback, and global site settings — is fully editable through a secure, custom-built **Admin Dashboard**, with no need to ever touch the source code.

---

## Key Features

### For Visitors & Team Members
- **Theme Switcher** — seamless Dark / Light mode toggle
- **Smart Search & Filters** — search and filter content by technology
- **Organized Learning Paths** — sessions grouped by technology
- **Notion Integration** — direct links to detailed documentation for every session
- **Task Management** — browse coding & research assignments related to each session
- **Top Solutions** — the best submissions are highlighted per assignment, promoting recognition based on merit rather than a global leaderboard
- **Dynamic Portfolio** — a full "About" page acting as a digital resume (experience, projects, skills, certifications)
- **Interactive Feedback** — submit suggestions, bug reports, feature requests, or ratings

### For the Administrator
- **Comprehensive Dashboard** — platform statistics (total sessions, tasks, feedback, recent activity)
- **Total Content Control** — full CRUD, reordering, and visibility toggles for sessions, tasks, categories, and top solutions
- **Portfolio Management** — edit every section of the portfolio (Hero, About, Experience, Projects, Skills) dynamically
- **Feedback Inbox** — read, manage, delete, or publish feedback as public testimonials on the homepage
- **Global Settings** — site title, logo, favicon, contact info, and SEO metadata, all editable on the fly
- **Secure Access** — Supabase Auth protecting all `/admin` routes

---

## Platform Pages

| Page | Description |
|---|---|
| **Home** | Landing page featuring top sessions, latest tasks, technologies, and testimonials |
| **Sessions** | Learning library, sessions grouped by technology |
| **Tasks** | Coding & research assignments, each with a Top Solutions section |
| **About** | Full personal portfolio of the platform owner |
| **Feedback** | Form for visitors to submit feedback and ratings |
| **Admin** *(protected)* | Full dashboard for managing all site content |

---

## Architecture & Tech Stack

This project implements a modern front-end architecture with robust state-management patterns.

### Frontend
| Tool | Purpose |
|---|---|
| **React 19 (Vite)** | Core UI library powering a fast, highly-responsive SPA |
| **TypeScript** | Strict type safety and predictable code architecture |
| **Tailwind CSS v4** | Utility-first styling with modern performance features |
| **React Router v7** | Advanced declarative routing between public and protected areas |
| **TanStack React Query v5** | Remote state management, data fetching, and automatic caching |
| **React Hook Form & Zod** | Performant form state management and schema-based validation |
| **shadcn/ui & Base UI** | Accessible, customizable UI components |
| **Lucide React / React Icons** | Clean, modern iconography |
| **React Hot Toast** | Lightweight toast notifications |

### Backend / Infrastructure
| Tool | Purpose |
|---|---|
| **Supabase** | Complete Backend-as-a-Service (Database, Auth, Storage) |
| **PostgreSQL** | Robust relational database powering the platform |
| **Supabase Auth** | Secure admin authentication and session handling |
| **Supabase Storage** | File storage divided into dedicated buckets (see below) |

---

## Database, Auth & Storage

The backend relies entirely on the Supabase ecosystem — database, authentication, and storage — to power the platform dynamically.

### 1. Database Schema (PostgreSQL)

Core application data is structured relationally across seven tables: `categories`, `sessions`, `tasks`, `task_solutions`, `feedbacks`, `portfolio_sections`, and `settings`.

![Database Schema](/public/supabase-schema.png)

<details>
<summary><strong>View table details</strong></summary>

**`categories`** — one row per supported technology
| Column | Type |
|---|---|
| `id` (PK) | uuid |
| `name` (unique) | text |
| `description` | text |
| `displayOrder` | int4 |
| `isVisible` | bool |
| `categoryColor` | text |
| `slug` (unique) | text |
| `created_at` | timestamptz |

**`sessions`** — learning sessions, linked to a category
| Column | Type |
|---|---|
| `id` (PK) | uuid |
| `category_id` (FK → categories) | uuid |
| `title` | text |
| `description` | text |
| `notion_url` | text |
| `cover_image` | text |
| `display_order` | int4 |
| `is_visible` | bool |
| `estimated_reading_time` | int4 |
| `created_at` | timestamptz |

**`tasks`** — coding/research assignments, linked to a category and a session
| Column | Type |
|---|---|
| `id` (PK) | uuid |
| `category_id` (FK → categories) | uuid |
| `task_type` | enum (`task_type`) |
| `session_id` (FK → sessions) | uuid |
| `title` | text |
| `summary` | text |
| `description` | text |
| `deadline` | timestamptz |
| `attachment` | text |
| `is_visible` | bool |
| `created_at` | timestamptz |

**`task_solutions`** — best submissions per task
| Column | Type |
|---|---|
| `id` (PK) | uuid |
| `task_id` (FK → tasks) | uuid |
| `rank` | int4 |
| `student_name` | text |
| `solution_url` | text |
| `notes` | text |
| `created_at` | timestamptz |

**`feedbacks`** — visitor feedback, optionally published as testimonials
| Column | Type |
|---|---|
| `id` (PK) | uuid |
| `name` | text |
| `email` | text |
| `rating` | int4 |
| `category` | enum (`feedback_type`) |
| `message` | text |
| `is_read` | bool |
| `is_published` | bool |
| `created_at` | timestamptz |

**`portfolio_sections`** — editable content blocks for the "About" page
| Column | Type |
|---|---|
| `id` (PK) | uuid |
| `section` | text |
| `title` | text |
| `content` | text |
| `image` | text |
| `display_order` | int4 |

**`settings`** — global site configuration
| Column | Type |
|---|---|
| `id` (PK) | uuid |
| `website_name` | text |
| `logo` | text |
| `favicon` | text |
| `hero_title` | text |
| `hero_description` | text |
| `footer_text` | text |
| `github` | text |
| `linkedin` | text |
| `email` | text |
| `resume_url` | text |

**Relationships**
`categories` 1→N `sessions` · `categories` 1→N `tasks` · `sessions` 1→N `tasks` · `tasks` 1→N `task_solutions`

</details>

### 2. User Authentication (Supabase Auth)

Authentication is exclusively reserved for the platform's Administrator. The admin account is securely managed via **Supabase Auth**, granting protected access to the `/admin` routes for full platform management. All learning and portfolio pages remain public, with no login required for visitors.

### 3. Media Storage (Supabase Buckets)

All media and image uploads are securely hosted and served via **Supabase Storage**, organized into dedicated, purpose-driven buckets:

| Bucket | Used for |
|---|---|
| `covers` | High-quality cover images for learning sessions |
| `attachments` | Task-related files, research materials, and assignment resources |
| `avatars` | Admin profile pictures |

---

## Project Structure

The application follows a **Feature-Based Architecture**, ensuring high modularity, scalability, and separation of concerns. Every feature lives in its own isolated folder containing its specific logic, hooks, and components. Shared UI elements are centralized in `src/ui/`, while `src/pages/` composes features into routed views.

```text
src/
├── context/        # React Context API providers (Global app state)
├── features/        # Feature-specific components and hooks (Core business logic)
│   ├── authentication/
│   ├── categories/
│   ├── dashboard/
│   ├── feedbacks/
│   ├── portfolio/
│   ├── sessions/
│   ├── settings/
│   └── tasks/
├── hooks/           # Global custom React hooks (e.g., useBreadcrumbs)
├── pages/           # Route components
│   ├── admin/        # Protected dashboard pages
│   ├── auth/          # Login page
│   └── clientSide/    # Public-facing pages
├── services/        # External APIs and Supabase client configurations
├── types/           # TypeScript type definitions and interfaces
├── ui/              # Global, reusable UI components (shadcn elements, layouts)
├── utils/           # Pure helper functions and generic utilities
├── App.tsx          # Root component containing routing definitions
└── main.tsx         # Application entry point
```

---

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- A [Supabase](https://supabase.com) project

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/OMAR-A-M-A/Web-Sessions-V2.git
cd Web-Sessions-V2

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env file in the project root with your Supabase project credentials:
```

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

```bash
# 4. Run the development server
npm run dev

# 5. Build for production
npm run build
```

---

## Note

This project is under **active development**. The tech stack and schema listed above reflect the current state of the project and may evolve as it progresses.

---

<div align="center">

Built with ❤️ by Omar Ayoub

</div>