# EduPath AI - Quick Start Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js v16+ installed
- MongoDB running locally or MongoDB Atlas account
- Git installed
- A code editor (VS Code recommended)

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/Justine1v1/EduPath-AI.git
cd EduPath-AI
```

#### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Backend will run on `http://localhost:5000`

#### 3. Frontend Setup (new terminal)
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

Frontend will run on `http://localhost:3000`

---

## 📋 Demo Credentials

### Admin Login
```
Email: admin@edupath.ai
Password: admin123
```

### Student Login
```
Email: student1@example.com
Password: student123
```

---

## 🎯 Key Features to Try

### 1. Student Registration
- Go to http://localhost:3000/register
- Create a new account
- Login with your credentials

### 2. Check Eligibility
1. Click "Check Eligibility" on dashboard
2. Select University: **University of Lagos**
3. Select Course: **Medicine**
4. Enter JAMB Score: **285**
5. Enter O'Level Grades
6. View eligibility result

### 3. AI Chat Assistant
1. Click "Chat with AI"
2. Ask questions like:
   - "What documents do I need?"
   - "What is the JAMB cutoff?"
   - "How long is the admission process?"

### 4. Generate Checklist
1. Click "Generate My Checklist"
2. System creates personalized document list
3. Track document submission progress

### 5. Submit Application
1. Complete document checklist (min 5/8 items)
2. Click "Submit Application"
3. View automatically created case
4. Receive notifications

### 6. Admin Review (Login as Admin)
1. Navigate to Admin Dashboard
2. View all applications
3. Select an application
4. Update status to "Under Review"
5. Student receives notification

---

## 🗄️ Database Seeding

The `npm run seed` command creates:

### 5 Universities
- University of Lagos (UNILAG)
- University of Ibadan (UI)
- Ahmadu Bello University (ABU)
- Obafemi Awolowo University (OAU)
- University of Nigeria (UNN)

### 6 Courses
- Medicine (UNILAG)
- Law (UNILAG)
- Engineering (UI)
- Computer Science (UI)
- Business Administration (ABU)
- Pharmacy (OAU)

### Sample Users
- 1 Admin user
- 2 Student accounts pre-populated with JAMB scores

---

## 🔑 API Endpoints (Sample)

### Authentication
```bash
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

### Eligibility
```bash
POST /api/eligibility/check
GET /api/eligibility/universities
GET /api/eligibility/courses
```

### Cases
```bash
POST /api/cases
GET /api/cases
GET /api/cases/:id
PUT /api/cases/:id/status
```

### Chat
```bash
POST /api/chat/send
GET /api/chat/history/:conversationId
GET /api/chat/faq
```

### Notifications
```bash
GET /api/notifications
PUT /api/notifications/:id/read
```

### Admin
```bash
GET /api/admin/applications
GET /api/admin/dashboard
PUT /api/admin/cases/:id/status
```

---

## 🧪 Testing the Complete Flow

### Step 1: Register as Student (2 min)
```
1. Navigate to http://localhost:3000
2. Click "Register as Student"
3. Fill in details
4. Create account
```

### Step 2: Check Eligibility (1 min)
```
1. Click "Check Eligibility"
2. Follow wizard to check eligibility
3. View detailed results
```

### Step 3: Chat with AI (1 min)
```
1. Ask about documents
2. Ask about deadlines
3. Ask about process
```

### Step 4: Generate Checklist (1 min)
```
1. Generate personalized checklist
2. View required documents
3. Track completion
```

### Step 5: Submit Application (1 min)
```
1. Upload documents (use any PDF)
2. Submit application
3. View case and timeline
```

### Step 6: Admin Review (1 min)
```
1. Logout and login as admin@edupath.ai
2. View all applications
3. Select student application
4. Update status to "Under Review"
5. Switch back to student - check notification
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas connection string in .env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/edupath-ai
```

### Port Already in Use
```bash
# Change port in backend .env
PORT=5001

# Frontend will auto-detect and adjust
```

### CORS Error
```bash
# Ensure FRONTEND_URL in backend .env matches frontend URL
FRONTEND_URL=http://localhost:3000
```

### Dependencies Issue
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Documentation

- **INSTALLATION.md** - Detailed setup guide
- **DEMO.md** - Full feature walkthrough
- **API.md** - API endpoint documentation
- **ARCHITECTURE.md** - System design and architecture
- **PROJECT_STRUCTURE.md** - File structure overview

---

## 🚢 Deployment

### Heroku (Backend)
```bash
heroku create edupath-ai-backend
git push heroku main
```

### Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker-compose up -d
```

---

## 📞 Support

**Issues?** Check these resources:
1. INSTALLATION.md for setup problems
2. DEMO.md for feature walkthrough
3. API.md for API issues
4. GitHub Issues for bug reports

---

## 🎓 Learn More

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Docs](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

---

**Ready to start?** 🚀

```bash
# Backend
cd backend && npm install && npm run seed && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm start
```

Visit http://localhost:3000 and enjoy!
