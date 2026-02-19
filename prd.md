Project Name: "Portfolio Website"

Goal: To create a personal portfolio website that showcases my skills, projects, and experience in web development.

Target Audience: Potential employers, clients, and collaborators in the web development industry, as well as anyone interested in learning about my work and background.

Pages:

1. Home: A landing page that introduces myself and provides a brief overview of my skills and experience.
2. About: A page that goes into more detail about my background, education, and work experience.
3. Projects: A page that showcases my projects, including descriptions, technologies used, and links to live demos or github repos.
4. Project details: A page for each project that provides more in-depth information, including the problem it solves, the development process, and any challenges faced.
5. Blog: A page where I can share articles, tutorials, and insights related to web development and my personal experiences in the industry.
6. Blog details: A page for each blog post that provides the full content of the article, along with any relevant images or code snippets.
7. Contact: A page with a contact form and my social media links for visitors to get in touch with me.
8. Admin panel: A secure area where I can create, edit, and delete blog posts.

Core Features:

- Responsive design to ensure the website looks good on all devices.
- A clean and modern aesthetic that reflects my personal brand.
- Easy navigation with a clear menu structure.
- Integration with social media platforms to allow visitors to connect with me.
- Github activity feed to showcase my latest contributions and projects.

Access and Auth Notes:

- Admin panel access is owner-only. The login route is private and not exposed publicly.
- Registration is one-time setup. After the first login, the register route will be removed.
- Login uses the single owner account stored in the database.

Security and Threat Model Notes:

- Treat the admin UI as private. Do not link it publicly; gate it behind a secret path.
- Store access tokens in memory only; rely on refresh token httpOnly cookie for renewals.
- Enable CORS only for the frontend origin defined in `FRONTEND_URL`.
- Rate-limit login attempts and add basic request logging for admin routes.
- Validate file types and sizes for uploads on the server.
- Use `NODE_ENV=production` to enforce secure cookies in production.

Frontend API Usage (Quick Map):

| Page/Feature      | API Route            | Notes                          |
| ----------------- | -------------------- | ------------------------------ |
| Home blog preview | `GET /blogs/all`     | Use newest 3-6 items           |
| Blog listing page | `GET /blogs/all`     | Paginate on the client for now |
| Blog detail page  | `GET /blogs/:id`     | Route param is the DB id       |
| Admin login       | `POST /users/login`  | Owner-only access              |
| Admin create blog | `POST /blogs/create` | multipart/form-data            |
| Admin delete blog | `DELETE /blogs/:id`  | Owner-only access              |

Design Document:

Design Basis:

- Reference 1 (style): https://ramx.in/
- Reference 2 (style): https://notesbuddy.in/
- Reference 3 (style): https://chanhdai.com/
- Note: Color hex values are best-effort approximations based on the live sites.

1. Color Palette (Hex) — based on chanhdai.com (zinc/neutral monochrome)

   Light Mode:
   - Background: #FFFFFF
   - Background secondary: #F4F4F5
   - Elevated surface: #FAFAFA
   - Primary text: #09090B
   - Secondary text: #52525B
   - Muted text: #A1A1AA
   - Border / divider: #E4E4E7
   - Border hover: #D4D4D8
   - Surface (cards): #F4F4F5
   - Surface hover: #E4E4E7

   Dark Mode:
   - Background: #09090B
   - Background secondary: #18181B
   - Elevated surface: #111113
   - Primary text: #FAFAFA
   - Secondary text: #A1A1AA
   - Muted text: #71717A
   - Border / divider: #27272A
   - Border hover: #3F3F46
   - Surface (cards): #18181B
   - Surface hover: #27272A

   Accent Colors (shared):
   - Primary accent (links/CTAs): #FAFAFA (light on dark) / #09090B (dark on light)
   - Note: The palette is intentionally monochrome/neutral, following chanhdai.com's style.

2. Typography (Style + Recommended Fonts)

- Heading font: "General Sans" (600-700). Alternative: "Space Grotesk".
- Body font: "Manrope" (400-500). Alternative: "Inter".
- Code/tech labels: "JetBrains Mono" (500) for tags and metadata.
- Style notes:
  - Headings are bold, tight tracking, large sizes for the hero.
  - Body is readable, slightly spacious with clear hierarchy.
  - Tags/metadata use all-caps or small-caps with mono font.

3. Layout Structure and Grid System

- Global layout: wide content with generous whitespace, sections stacked vertically.
- Max content width: 1100-1200px for main sections.
- Grid: 12-column for desktop; 6-column for tablet; 4-column for mobile.
- Gutter: 24px desktop, 20px tablet, 16px mobile.
- Section rhythm: large hero at top, followed by modular sections (Experience, Projects, About, Blogs, Contact).
- Visual pattern: light background + occasional darker or tinted bands to break sections.
- Alignment: left-aligned text with clear vertical rhythm; icons and badges aligned to a baseline grid.

4. Component Styles
   Buttons

- Primary: filled accent color (#4F6DFF), white text, 12px radius, medium weight.
- Secondary: outline with 1px border (#E6E6E6), text in primary text color, subtle hover fill (#F1F2F4).
- Ghost: no fill, text accent, underline on hover.
- Padding: 12px 20px for normal, 10px 16px for compact.

Cards

- Rounded 16px corners, subtle shadow (0 6px 20px rgba(0,0,0,0.06)).
- Border: 1px solid #E6E6E6 for light cards.
- Internal padding: 20-24px.
- Title + short description + metadata row.
- Hover: slight lift and shadow increase; border shifts to #DADDE3.

Forms

- Input height: 44px, radius 10px.
- Border: 1px solid #E6E6E6; focus border #4F6DFF with soft glow.
- Label: small caps or 12px mono label with muted text.
- Helper text: 12-13px, #8A8F98.

Chips/Tags

- Rounded pill 999px, 10-12px font, background #F1F2F4.
- Accent chips: background #E8EEFF with text #4F6DFF.

5. Overall Visual Mood and Aesthetic

- Clean, modern, and confident with a friendly, personal tone.
- Balanced between professional portfolio and approachable product UI.
- Lots of whitespace, bold section titles, and well-separated content blocks.
- Soft gradients or subtle patterns for hero or section headers.
- Occasional playful accents (icons, doodles) for personality.

6. Spacing and Sizing Guidelines

- Base spacing unit: 8px.
- Section padding: 80px top/bottom on desktop, 56px tablet, 40px mobile.
- Content spacing: 32-48px between major blocks; 16-24px within cards.
- Heading sizes:
  - H1: 44-56px
  - H2: 32-40px
  - H3: 24-28px
- Body text: 16-18px, line-height 1.6.
- Small text: 12-14px, line-height 1.4.
- Icon sizes: 20-24px for inline, 32-40px for section icons.

Notes for Implementation

- Use a light theme by default with a dark footer band.
- Keep navigation minimal with 4-6 items; CTA on the right.
- Use badges for status ("Featured", "Building", "Open to Work") with accent colors.
- Maintain consistent radius across elements: 10-16px.

Tech stack:
-Frontend: React, Tailwind css, vite, JS, Framer Motion for animations, and gsap for scroll-based effects, react-router for routing.
-Backend: Node.js with express for blog and blog will be in markdown format, backend is ready i will serve the readme of the complete backend at the end of this document, MongoDB for database to store the blog posts .
-Deployment: Vercel for frontend, Render for backend.
-Analytics: Google Analytics for tracking visitor behavior and engagement on the website.

Backend Readme:

# Portfolio Website Backend

This is the backend for my personal portfolio website, built with Node.js and Express. It serves blog posts stored in a MongoDB database and provides a secure admin panel for managing content.

# 22 Portfolio Backend

Backend API for a portfolio site with user auth and blog management.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT auth (access + refresh)
- Multer for uploads
- Cloudinary for file storage

## Features

- User registration, login, logout
- JWT access token + refresh token flow
- Blog CRUD (create, list, get by id, delete)
- Image and markdown upload for blogs

## Project Structure

```
.
├─ controllers/
├─ middlewares/
├─ models/
├─ public/
│  └─ temp/
├─ routes/
├─ utils/
├─ connection.js
├─ index.js
└─ package.json
```

## Environment Variables

Create a `.env` file in the root:

```
PORT=4000
FRONTEND_URL=http://localhost:5173
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>/<db>
ACCESS_JWT_SECRET=your_access_secret
REFRESH_JWT_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

## Install & Run

```
npm install
npm start
```

Server starts on `PORT` (default: 4000).

## Auth Flow

- Login returns an access token in JSON response.
- Refresh token is stored in `refreshToken` httpOnly cookie.
- Send access token as `Authorization: Bearer <token>` for protected routes.

## API Routes

Base URL: `/`

### Health

- `GET /` -> "hello world"

### Users (`/users`)

- `POST /users/register`
  - body: `{ name, email, password }`
- `POST /users/login`
  - body: `{ email, password }`
  - response: `{ token }`
- `DELETE /users/logout`
  - clears refresh token cookie
- `GET /users/profile`
  - protected
  - returns authenticated user
- `GET /users/refresh-token`
  - uses refresh token cookie to issue new access token

### Blogs (`/blogs`)

- `POST /blogs/create`
  - protected
  - multipart/form-data
  - fields:
    - `title` (text)
    - `description` (text)
    - `coverImage` (file: jpeg/png/webp)
    - `blogFile` (file: markdown)
- `GET /blogs/all`
  - list all blogs (newest first)
- `GET /blogs/:id`
  - get blog by id
- `DELETE /blogs/:id`
  - protected
  - delete blog by id

Blog Routing Notes:

- Home page and special blog listings will use `GET /blogs/all`.
- Blog details will use `GET /blogs/:id`.
- Update route will be added later as the project evolves.

GitHub Activity:

- Use GitHub official APIs (REST or GraphQL) to fetch activity data.

## Upload Notes

- Files are stored temporarily in `public/temp/` and then uploaded to Cloudinary.
- Allowed types: `image/jpeg`, `image/png`, `image/webp`, `text/markdown`.

## Error Responses

Errors follow this shape:

```
{
  "success": false,
  "message": "..."
}
```