# Taksh Patel - Personal Portfolio Website

A modern, responsive personal portfolio website built with React and Tailwind CSS. Features dark/light theme support, project showcase, integrated blogging platform, and smooth animations powered by GSAP and Framer Motion.

**Live Demo:** [takshpatel.vercel.app](https://takshpatel.vercel.app)

---

## 🌟 Features

- **🎨 Dark/Light Theme Support** - Seamless theme toggle with persistent storage
- **📱 Fully Responsive Design** - Optimized for mobile, tablet, and desktop
- **⚡ Lightning Fast** - Built with Vite for optimal performance
- **🔍 Smart Search** - Real-time search across blog posts and projects
- **🎬 Smooth Animations** - GSAP and Framer Motion for polished interactions
- **📝 Blog Platform** - Integrated blogging system with markdown support
- **🛠️ Project Showcase** - Display projects with filtering by status
- **💡 Tech Stack Display** - Interactive tooltips showing technologies
- **🔧 Centralized Management** - Easy-to-update data files for content
- **📊 GitHub Activity** - Display your GitHub contributions and activity
- **🎯 Responsive Grid Layouts** - Professional card-based design system

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/TakshPatel02/takshpatel-portfolio.git

# Navigate to project directory
cd takshpatel-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory.

---

## 📁 Project Structure

```
Portfolio/
├── src/
│   ├── components/
│   │   ├── Home Components/
│   │   │   ├── AboutSection.jsx
│   │   │   ├── Bio.jsx
│   │   │   ├── BlogSection.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── GithubActivity.jsx
│   │   │   ├── HeroPanel.jsx
│   │   │   ├── InfoCard.jsx
│   │   │   └── ProjectsSection.jsx
│   │   ├── Blog Components/
│   │   │   ├── BlogCard.jsx
│   │   │   ├── BlogGrid.jsx
│   │   │   └── BlogHeader.jsx
│   │   ├── Project Components/
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectGrid.jsx
│   │   │   └── ProjectHeader.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── SectionDivider.jsx
│   ├── Pages/
│   │   ├── HomePage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── BlogDetailPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   └── ProjectDetailPage.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── blogsData.js
│   │   └── projectsData.js
│   ├── assets/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next-generation build tool
- **React Router** - Client-side routing

### Animations & Interactions

- **GSAP** - Professional animation library
- **Framer Motion** - Animation library for React
- **Lucide React** - Beautiful icon components

### Theme & Context

- **React Context API** - State management for theme

### Development Tools

- **ESLint** - Code quality and consistency

---

## 📝 Content Management & Dynamic Data

The portfolio website features **dynamic content management** powered by **Firebase Realtime Database**. Projects and blog posts are loaded live from the database, eliminating the need for rebuilding the site when content changes.

### 🗄️ Reference Schema & Seed Data

The schema and reference dataset are located in:
- [latest-portfolio-data.json](file:///c:/Users/Taksh%20Patel/Desktop/Portfolio/latest-portfolio-data.json)

To update projects or blogs, you can edit the JSON structure in the Firebase Console under the `projects` and `blogs` keys, or import/update them using `latest-portfolio-data.json`.

### 🔑 Environment Setup

Configure the following Firebase environment variables in your `.env` file (or Vercel deployment dashboard):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 🤖 LLM Crawler Support (llms.txt)

We support the `/llms.txt` convention for clean, token-efficient parsing by AI crawlers and assistants:
- Located at [public/llms.txt](file:///c:/Users/Taksh%20Patel/Desktop/Portfolio/public/llms.txt) (served at domain root).
- Linked inside [index.html](file:///c:/Users/Taksh%20Patel/Desktop/Portfolio/index.html) and [public/robots.txt](file:///c:/Users/Taksh%20Patel/Desktop/Portfolio/public/robots.txt).

---

## 🎨 Theme System

The portfolio includes a built-in light/dark theme system using CSS tokens. The theme preference is saved in localStorage.

**Theme Features:**

- Primary text color
- Secondary text color
- Muted text color
- Background colors
- Border colors
- Button styles

All colors automatically adapt to dark mode using Tailwind's `dark:` prefix.

---

## 🔍 Search Functionality

- **Blog Search** - Search by blog title
- **Project Search** - Search by project title, description, or technologies
- Real-time filtering with instant results

---

## 🌐 Pages

### Home Page

- Hero section with introduction
- About section with tech stack tooltips
- GitHub activity feed
- Featured projects
- Blog highlights
- Contact information

### Projects Page

- All projects with filtering by status
- Real-time search functionality
- Project cards with technology tags
- Direct links to live demos and GitHub repos

### Blog Page

- All blog posts with search
- Blog cards with reading time estimates
- Markdown content integration
- Individual blog post pages

---

## 📱 Responsive Breakpoints

The portfolio is designed mobile-first with these breakpoints:

- **SM** - 640px+
- **MD** - 768px+
- **LG** - 1024px+
- **XL** - 1280px+

---

## 🎯 Customization

### Change Color Scheme

Update the CSS variables in your theme configuration or Tailwind CSS file.

### Update Personal Information

1. Edit content in `src/data/` files
2. Update component text in `src/components/`
3. Replace image URLs with your own

### Add New Pages

1. Create component in `src/Pages/`
2. Add route in `App.jsx`
3. Update navigation in `Navbar.jsx`

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### Deploy to GitHub Pages

```bash
npm run build
# Upload the dist/ folder content to GitHub Pages
```

---

## 📊 Performance

- **Lazy Loading** - Components load on demand
- **Code Splitting** - Optimized bundle size with Vite
- **Image Optimization** - Use CDN for images
- **CSS Minification** - Production-ready stylesheets

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Fork the repository
- Create a feature branch
- Make your changes
- Submit a pull request

---

## 📄 License

This project is open source and available under the **MIT License**. Feel free to use it as a template for your own portfolio.

---

## 👨‍💻 Author

**Taksh Patel**

- 🌐 Website: [takshpatel.vercel.app](https://takshpatel.vercel.app)
- 💼 GitHub: [@TakshPatel02](https://github.com/TakshPatel02)
- 📧 Email: takshpatel022@gmail.com
- 💼 LinkedIn: [Taksh Patel](https://linkedin.com/in/taksh-patel20)

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please [create an issue](https://github.com/TakshPatel02/takshpatel-portfolio/issues) on GitHub.

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [GSAP Documentation](https://gsap.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ by Taksh Patel**
