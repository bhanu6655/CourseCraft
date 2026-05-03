# CourseCraft.ai 🚀

An AI-powered curriculum and assessment builder tailored for educators, tutors, and content creators. Built for the House of Edtech Fullstack Developer Assignment.

## 📖 Project Overview

**CourseCraft.ai** is an innovative learning management tool designed to go beyond a basic CRUD application. It allows educators to structure curriculums, organize modules/topics, and leverage AI to instantly convert topic notes into engaging multiple-choice quizzes for students.

## ✨ Key Features

- **Dynamic Curriculum Builder:** Create and manage courses and topics effortlessly.
- **AI Quiz Generation:** One-click integration with Google Gemini AI to auto-generate context-aware assessments from your learning materials.
- **Modern Glassmorphic UI:** A premium, aesthetic dark-mode interface built with Tailwind CSS.
- **Full CRUD Functionality:** Read, Create, Update, and Delete operations seamlessly connected to the database.
- **Relational Integrity:** Cascading deletes ensure clean data management (deleting a course removes nested topics automatically).

## 🛠️ Technology Stack

- **Frontend/Backend:** Next.js 15 (App Router & API Routes)
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Database Engine:** SQLite (Pre-configured for zero-setup local dev. Compatible with PostgreSQL/MongoDB)
- **Styling:** Tailwind CSS + Lucide Icons
- **AI Integration:** `@google/generative-ai` (Gemini Flash Model)

## 💻 Running Locally

Follow these steps to get the project running on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/bhanu6655/CourseCraft.git
cd edtech-assignment
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root of the project and add your database URL and Google Gemini API key:
```env
DATABASE_URL="file:./dev.db"
GEMINI_API_KEY="your_gemini_api_key_here"
```

### 4. Database Initialization
Ensure your Prisma schema is synced with the database:
```bash
npx prisma db push
npx prisma generate
```

### 5. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## 🌐 Deployment

This application is ready for production deployment on platforms like [Vercel](https://vercel.com).
If you are moving to a production environment, simply update `provider = "sqlite"` to `postgresql` or `mongodb` in `prisma/schema.prisma` and supply your remote database URL in your deployment environment variables.

---
*Developed by Bhanuprakash for the House of Edtech Assignment.*
