# Project Structure

```
EduPath-AI/
│
├── 📄 README.md                          # Project overview
├── 📄 INSTALLATION.md                    # Setup and installation guide
├── 📄 DEMO.md                            # Demo workflow walkthrough
├── 📄 ARCHITECTURE.md                    # System architecture documentation
├── 📄 API.md                             # API endpoints documentation
├── 📄 .gitignore                         # Git ignore rules
├── 📄 LICENSE                            # MIT License
│
├── 📁 backend/                           # Backend Node.js server
│   ├── 📄 server.js                      # Main application entry point
│   ├── 📄 package.json                   # Backend dependencies
│   ├── 📄 .env.example                   # Environment variables template
│   ├── 📄 .gitignore                     # Backend git ignore
│   │
│   ├── 📁 config/                        # Configuration files
│   │   ├── database.js                   # MongoDB connection config
│   │   ├── jwt.js                        # JWT configuration
│   │   └── email.js                      # Email service config
│   │
│   ├── 📁 models/                        # Mongoose schemas
│   │   ├── User.js                       # User schema
│   │   ├── Case.js                       # Admission case schema
│   │   ├── University.js                 # University schema
│   │   ├── Course.js                     # Course schema
│   │   ├── ChatMessage.js                # Chat message schema
│   │   ├── Notification.js               # Notification schema
│   │   └── DocumentChecklist.js          # Document checklist schema
│   │
│   ├── 📁 routes/                        # API route handlers
│   │   ├── auth.js                       # Authentication routes
│   │   ├── eligibility.js                # Eligibility checker routes
│   │   ├── cases.js                      # Case management routes
│   │   ├── chat.js                       # AI chat routes
│   │   ├── checklist.js                  # Document checklist routes
│   │   ├── notifications.js              # Notification routes
│   │   ├── admin.js                      # Admin dashboard routes
│   │   └── universities.js               # University listing routes
│   │
│   ├── 📁 controllers/                   # Business logic
│   │   ├── authController.js             # Authentication logic
│   │   ├── caseController.js             # Case management logic
│   │   ├── eligibilityController.js      # Eligibility checking logic
│   │   ├── chatController.js             # AI chat logic
│   │   └── adminController.js            # Admin logic
│   │
│   ├── 📁 middleware/                    # Custom middleware
│   │   ├── auth.js                       # JWT verification
│   │   ├── errorHandler.js               # Global error handler
│   │   ├── validation.js                 # Input validation
│   │   ├── logging.js                    # Request logging
│   │   └── rateLimit.js                  # Rate limiting
│   │
│   ├── 📁 services/                      # Business services
│   │   ├── emailService.js               # Email sending service
│   │   ├── aiService.js                  # AI assistant service
│   │   ├── eligibilityService.js         # Eligibility checking service
│   │   ├── notificationService.js        # Notification service
│   │   └── uploadService.js              # File upload service
│   │
│   ├── 📁 data/                          # Database scripts
│   │   ├── seedData.js                   # Database seeding script
│   │   ├── resetDatabase.js              # Database reset script
│   │   └── sample-data.json              # Sample data
│   │
│   ├── 📁 uploads/                       # User uploads directory
│   │   ├── documents/                    # Application documents
│   │   └── profiles/                     # Profile images
│   │
│   ├── 📁 logs/                          # Application logs
│   │   └── app.log
│   │
│   └── 📁 utils/                         # Utility functions
│       ├── validators.js                 # Validation helpers
│       ├── helpers.js                    # General helpers
│       ├── constants.js                  # Application constants
│       └── errors.js                     # Custom error classes
│
├── 📁 frontend/                          # React frontend application
│   ├── 📄 package.json                   # Frontend dependencies
│   ├── 📄 .env.example                   # Environment variables template
│   ├── 📄 .gitignore                     # Frontend git ignore
│   ├── 📄 vite.config.js                 # Vite configuration
│   ├── 📄 tailwind.config.js             # Tailwind CSS config
│   ├── 📄 postcss.config.js              # PostCSS config
│   │
│   ├── 📁 public/                        # Static assets
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   └── index.html
│   │
│   ├── 📁 src/                           # Source code
│   │   ├── 📄 main.jsx                   # React entry point
│   │   ├── 📄 App.jsx                    # Main App component
│   │   ├── 📄 index.css                  # Global styles
│   │
│   │   ├── 📁 pages/                     # Page components
│   │   │   ├── LoginPage.jsx             # Login page
│   │   │   ├── RegisterPage.jsx          # Registration page
│   │   │   ├── StudentDashboard.jsx      # Student dashboard
│   │   │   ├── AdminDashboard.jsx        # Admin dashboard
│   │   │   ├── EligibilityPage.jsx       # Eligibility checker
│   │   │   ├── ChatPage.jsx              # AI chat page
│   │   │   ├── DocumentsPage.jsx         # Document management
│   │   │   ├── CasesPage.jsx             # Cases listing
│   │   │   └── NotFoundPage.jsx          # 404 page
│   │
│   │   ├── 📁 components/                # Reusable components
│   │   │   ├── Header.jsx                # Header/Navigation
│   │   │   ├── Sidebar.jsx               # Sidebar navigation
│   │   │   ├── NavBar.jsx                # Top navigation bar
│   │   │   ├── Footer.jsx                # Footer
│   │   │   ├── Button.jsx                # Button component
│   │   │   ├── Modal.jsx                 # Modal component
│   │   │   ├── Card.jsx                  # Card component
│   │   │   ├── Spinner.jsx               # Loading spinner
│   │   │   ├── Toast.jsx                 # Toast notification
│   │   │   ├── Notification.jsx          # Notification badge
│   │   │   ├── StatCard.jsx              # Statistics card
│   │   │   ├── Table.jsx                 # Data table
│   │   │   └── Form/
│   │   │       ├── Input.jsx             # Input field
│   │   │       ├── Select.jsx            # Select dropdown
│   │   │       └── Textarea.jsx          # Textarea field
│   │
│   │   ├── 📁 hooks/                     # Custom React hooks
│   │   │   ├── useAuth.js                # Authentication hook
│   │   │   ├── useApi.js                 # API call hook
│   │   │   ├── useFetch.js               # Fetch data hook
│   │   │   ├── useLocalStorage.js        # Local storage hook
│   │   │   └── useNotification.js        # Notification hook
│   │
│   │   ├── 📁 context/                   # Context API
│   │   │   ├── AuthContext.js            # Auth context
│   │   │   ├── NotificationContext.js    # Notification context
│   │   │   └── ThemeContext.js           # Theme context
│   │
│   │   ├── 📁 services/                  # API services
│   │   │   ├── api.js                    # Axios instance
│   │   │   ├── authService.js            # Auth API calls
│   │   │   ├── caseService.js            # Case API calls
│   │   │   ├── eligibilityService.js     # Eligibility API calls
│   │   │   ├── chatService.js            # Chat API calls
│   │   │   ├── checklistService.js       # Checklist API calls
│   │   │   ├── notificationService.js    # Notification API calls
│   │   │   └── adminService.js           # Admin API calls
│   │
│   │   ├── 📁 utils/                     # Utility functions
│   │   │   ├── helpers.js                # Helper functions
│   │   │   ├── validators.js             # Form validators
│   │   │   ├── constants.js              # Constants
│   │   │   ├── formatters.js             # Data formatters
│   │   │   └── storage.js                # Local storage utils
│   │
│   │   ├── 📁 styles/                    # Global styles
│   │   │   ├── variables.css             # CSS variables
│   │   │   ├── globals.css               # Global styles
│   │   │   └── animations.css            # Animations
│   │
│   │   └── 📁 assets/                    # Static assets
│   │       ├── images/
│   │       ├── icons/
│   │       └── fonts/
│
├── 📁 sample-data/                       # Sample data for testing
│   ├── universities.json                 # University data
│   ├── courses.json                      # Course data
│   ├── requirements.json                 # Admission requirements
│   ├── users.json                        # Sample users
│   └── cases.json                        # Sample cases
│
├── 📁 docker/                            # Docker configuration
│   ├── Dockerfile.backend                # Backend Dockerfile
│   ├── Dockerfile.frontend               # Frontend Dockerfile
│   ├── docker-compose.yml                # Docker compose config
│   └── nginx.conf                        # Nginx configuration
│
├── 📁 scripts/                           # Utility scripts
│   ├── deploy.sh                         # Deployment script
│   ├── backup.sh                         # Backup script
│   └── test.sh                           # Test runner script
│
├── 📁 docs/                              # Additional documentation
│   ├── FEATURES.md                       # Feature documentation
│   ├── TROUBLESHOOTING.md                # Troubleshooting guide
│   ├── DEPLOYMENT.md                     # Deployment guide
│   ├── TESTING.md                        # Testing guide
│   ├── CONTRIBUTING.md                   # Contributing guide
│   └── ROADMAP.md                        # Project roadmap
│
└── 📁 .github/                           # GitHub configuration
    ├── workflows/
    │   ├── ci.yml                        # CI/CD pipeline
    │   └── deploy.yml                    # Deployment pipeline
    └── ISSUE_TEMPLATE.md                 # Issue template

```

## File Descriptions

### Root Files
- **README.md** - Main project documentation with features and quick start
- **INSTALLATION.md** - Detailed installation and setup instructions
- **DEMO.md** - Complete demo workflow showing all features
- **ARCHITECTURE.md** - System design, data flow, and technical architecture
- **API.md** - Comprehensive API endpoint documentation
- **.gitignore** - Git configuration to ignore sensitive files
- **LICENSE** - MIT license file

### Backend Structure

#### Core Files
- **server.js** - Express server initialization, routes, and Socket.io setup
- **package.json** - Node.js dependencies and scripts

#### Models (Database Schemas)
- **User.js** - User account information and authentication
- **Case.js** - Admission case tracking and timeline
- **University.js** - University information and requirements
- **Course.js** - Course details and eligibility criteria
- **ChatMessage.js** - AI chat conversation history
- **Notification.js** - User notifications (email, SMS, in-app)
- **DocumentChecklist.js** - Application document tracking

#### Routes (API Endpoints)
- **auth.js** - Login, registration, profile management
- **eligibility.js** - Eligibility checking, universities, courses
- **cases.js** - Case creation, status updates, documents
- **chat.js** - AI assistant, FAQ, message rating
- **checklist.js** - Document generation, status tracking
- **notifications.js** - Notification management
- **admin.js** - Admin dashboard, case review
- **universities.js** - University listing and search

#### Services
- **emailService.js** - Send transactional emails
- **aiService.js** - AI chat logic and knowledge base
- **eligibilityService.js** - Admission eligibility calculation
- **notificationService.js** - Notification orchestration
- **uploadService.js** - File upload and storage management

#### Middleware
- **auth.js** - JWT token verification
- **errorHandler.js** - Global error handling
- **validation.js** - Request validation
- **logging.js** - Request/response logging
- **rateLimit.js** - API rate limiting

#### Data Scripts
- **seedData.js** - Populate database with sample data
- **resetDatabase.js** - Clear and reset database
- **sample-data.json** - Sample data for seeding

### Frontend Structure

#### Pages
- **LoginPage.jsx** - User authentication page
- **StudentDashboard.jsx** - Main student dashboard
- **AdminDashboard.jsx** - Admin panel
- **EligibilityPage.jsx** - Eligibility checker
- **ChatPage.jsx** - AI assistant chat interface
- **DocumentsPage.jsx** - Document management
- **CasesPage.jsx** - Application cases list

#### Components
- **Header/Footer** - Navigation components
- **Button/Modal/Card** - Reusable UI components
- **StatCard** - Statistics display
- **Table** - Data table component
- **Form inputs** - Form field components

#### Hooks
- **useAuth** - Authentication state management
- **useApi** - API call management
- **useFetch** - Data fetching
- **useLocalStorage** - Local storage management

#### Services
- **api.js** - Configured Axios instance
- **authService.js** - Auth API calls
- **caseService.js** - Case management API
- **eligibilityService.js** - Eligibility checking API
- **chatService.js** - Chat API calls

### Configuration Files
- **.env.example** - Environment variables template (backend & frontend)
- **vite.config.js** - Vite build configuration
- **tailwind.config.js** - Tailwind CSS configuration
- **docker-compose.yml** - Docker services configuration

### Documentation
- **FEATURES.md** - Detailed feature documentation
- **DEPLOYMENT.md** - Production deployment guide
- **TESTING.md** - Testing and QA procedures
- **TROUBLESHOOTING.md** - Common issues and solutions
- **ROADMAP.md** - Future enhancements and features

## Key Directories

### /backend
Main backend application with Node.js, Express, and MongoDB

### /frontend
React application with Tailwind CSS styling

### /sample-data
JSON files with sample universities, courses, and admission data

### /docs
Extended documentation for features, deployment, and troubleshooting

### /docker
Docker configurations for containerized deployment

### /scripts
Automation scripts for deployment and maintenance

### /.github
GitHub Actions CI/CD pipeline configurations

---

**Total Files:** 100+  
**Backend Routes:** 40+ endpoints  
**Frontend Components:** 30+ reusable components  
**Database Collections:** 7 main collections  
**Deployment:** Docker, Heroku, AWS, DigitalOcean ready

---

Last Updated: June 2026
