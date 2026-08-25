# 🚀 Full-Stack Portfolio REST API (5 Core Modules)

An enterprise-grade, modular Node.js & Express REST API with MongoDB database integration for portfolio management, dynamic project showcasing, capabilities, work history, and contact inbox pipelines.

---

## 🏗️ Backend Architecture & 5 Modules

The backend application is structured into **5 Core Resource Modules** plus a dedicated **Authentication Module**:

| Module # | Resource Module | Endpoints Base Path | Key Functionality |
|---|---|---|---|
| **01** | **Messages** | `/api/messages` | Contact form inbox submission, mark as read, and admin deletion |
| **02** | **Posts / Projects** | `/api/posts` | Full CRUD operations for portfolio projects, tags, and links |
| **03** | **Profile** | `/api/profile` | Developer profile details, bio, links, and CV metadata |
| **04** | **Skills** | `/api/skills` | Programming skills, categorization, and proficiency levels |
| **05** | **Experiences** | `/api/experiences` | Work history, job roles, duration, and key tech stack used |
| **06** | **Auth (Bonus)** | `/api/auth` | Admin JWT login and identity verification |

---

## 📂 Project Directory Structure

```text
backend/
├── controllers/          # Business logic handlers
│   ├── authController.js
│   ├── experienceController.js
│   ├── messageController.js
│   ├── postController.js
│   ├── profileController.js
│   └── skillController.js
├── middleware/           # Express middlewares
│   ├── authMiddleware.js # JWT verification
│   └── errorHandler.js   # Central error handling
├── models/               # Mongoose database schemas
│   ├── Experience.js
│   ├── Message.js
│   ├── Post.js
│   ├── Profile.js
│   ├── Skill.js
│   └── User.js
├── routes/               # API route definitions
│   ├── authRoutes.js
│   ├── experienceRoutes.js
│   ├── messageRoutes.js
│   ├── postRoutes.js
│   ├── profileRoutes.js
│   └── skillRoutes.js
├── public/               # Static assets & web files
├── seed.js               # Database auto-seeder script
├── server.js             # Express application entry point
├── package.json
└── README.md
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio_db
JWT_SECRET=supersecretkey
```

### 3. Seed Initial Database Content
Populate MongoDB with default initial data for all 5 modules:
```bash
npm run seed
```

### 4. Start Development Server
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

---

## 🌐 API Route Specification

### 1. Messages Module (`/api/messages`)
- `GET /api/messages` - Fetch all contact messages
- `POST /api/messages` - Submit contact message from frontend
- `PUT /api/messages/:id/read` - Mark message as read (Admin protected)
- `DELETE /api/messages/:id` - Delete message (Admin protected)

### 2. Posts Module (`/api/posts`)
- `GET /api/posts` - Retrieve list of projects/posts
- `GET /api/posts/:id` - Retrieve single project details
- `POST /api/posts` - Create new project (Admin protected)
- `PUT /api/posts/:id` - Update existing project (Admin protected)
- `DELETE /api/posts/:id` - Delete project (Admin protected)

### 3. Profile Module (`/api/profile`)
- `GET /api/profile` - Fetch developer profile metadata
- `PUT /api/profile` - Update profile information (Admin protected)

### 4. Skills Module (`/api/skills`)
- `GET /api/skills` - Fetch all categorized skills
- `POST /api/skills` - Add new skill (Admin protected)
- `PUT /api/skills/:id` - Update skill level/category (Admin protected)
- `DELETE /api/skills/:id` - Delete skill (Admin protected)

### 5. Experiences Module (`/api/experiences`)
- `GET /api/experiences` - Fetch work experience timeline
- `POST /api/experiences` - Add work experience record (Admin protected)
- `PUT /api/experiences/:id` - Update work experience (Admin protected)
- `DELETE /api/experiences/:id` - Delete work experience record (Admin protected)

### 6. Authentication (`/api/auth`)
- `POST /api/auth/login` - Admin login endpoint returning JWT token
- `GET /api/auth/me` - Verify current admin token session

---

## 👨‍💻 Author
**Ziad Omar** — Full-Stack Engineer  
GitHub: [@zezobnomar55-sudo](https://github.com/zezobnomar55-sudo)
