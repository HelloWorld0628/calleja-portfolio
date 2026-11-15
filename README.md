# Calleja Portfolio

Kevin Calleja's full-stack developer portfolio - built with React, Express, Prisma, and MySQL.

## Structure

```
calleja-portfolio/
├── backend/                 # Express + Prisma API
│   ├── config.js           # Environment config
│   ├── server.js           # Entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── src/
│   │   ├── controllers/    # HTTP handlers
│   │   ├── middleware/     # Auth, validation, errors
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helpers
│   └── .env.example
│
├── frontend/               # React + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/         # Preloader, shared UI
│   │   │   ├── layout/     # Navbar, Footer, MobileMenu
│   │   │   ├── sections/   # Hero, About, Stack, Projects, Contact
│   │   │   └── forms/      # ContactForm, ResumeModal
│   │   ├── hooks/          # useReveal, useScrollSpy, etc.
│   │   ├── services/       # API client
│   │   ├── styles/         # Global CSS
│   │   └── App.jsx
│   └── vite.config.js
│
└── package.json            # Root scripts (concurrently)
```

## Quick Start

### Prerequisites
- Node.js 20+
- MySQL 8+ (or MariaDB 10.6+)

### 1. Install dependencies
```bash
npm run install:all
```

### 2. Configure environment
```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL connection and email settings
```

Required `.env` values:
```env
DATABASE_URL=mysql://root@localhost:3306/portfolio
FRONTEND_ORIGIN=http://localhost:5173
# Optional for contact form emails:
# SMTP_HOST=smtp.gmail.com
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
```

### 3. Setup database
```bash
npm run db:setup
# Runs: prisma generate + prisma migrate deploy
```

### 4. Start development
```bash
# From root - runs both frontend (5173) and backend (3001)
npm run dev
```

Visit: http://localhost:5173

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/admin/messages` | List messages (paginated) |
| GET | `/api/admin/messages/stats` | Message statistics |
| GET | `/api/admin/messages/:id` | Get single message |
| PATCH | `/api/admin/messages/:id/status` | Update status |
| DELETE | `/api/admin/messages/:id` | Delete message |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both servers (dev) |
| `npm run dev:frontend` | Frontend only |
| `npm run dev:backend` | Backend only |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:setup` | Generate Prisma + run migrations |
| `npm run db:studio` | Open Prisma Studio |

## Deployment

### Backend (Railway, Render, VPS)
1. Set `NODE_ENV=production`
2. Set `DATABASE_URL` to production MySQL
3. Set `FRONTEND_ORIGIN` to your frontend URL
4. Run `npm run build` (Prisma generates client)
5. Start with `npm start`

### Frontend (Vercel, Netlify)
1. Build command: `npm run build`
2. Output directory: `dist`
3. Set `VITE_API_BASE_URL` to your backend URL

## Tech Stack

- **Frontend**: React 18, Vite 5, Vanilla CSS
- **Backend**: Express 4, Prisma 5, MySQL
- **Email**: Nodemailer (optional)
- **Dev**: Concurrently, Prisma Studio

## License

MIT
