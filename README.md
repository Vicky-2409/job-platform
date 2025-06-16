# 🚀 Job Interview Request Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express.js-4.18-green?style=for-the-badge&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-7.0-brightgreen?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Socket.io-4.7-orange?style=for-the-badge&logo=socket.io" alt="Socket.io" />
</p>

<p align="center">
  A modern, real-time job interview request platform that connects candidates with recruiters instantly.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features

- 🔄 **Real-time updates** - Instant notifications using Socket.io
- 📝 **Smart forms** - Validation, error handling, and success feedback
- 📊 **Live dashboard** - Real-time interview request management
- 🎯 **One-click actions** - Accept/reject requests instantly
- 🔍 **Advanced filtering** - Search and filter by status, name, email
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔒 **Type-safe** - Full TypeScript implementation
- 📱 **Mobile-first** - Responsive across all devices
- ⚡ **Performance** - Optimized with Next.js 14 App Router

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Real-time**: Socket.io Client
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.io
- **Security**: Helmet, CORS, Rate Limiting

### Infrastructure
- **Database**: MongoDB (Local/Atlas)
- **Deployment**: Vercel (Frontend) + Render/Railway (Backend)
- **Version Control**: Git + GitHub

## 📁 Project Structure

```
job-platform/
├── 📁 backend/                 # Express.js API server
│   ├── 📁 src/
│   │   ├── 📁 controllers/      # Business logic
│   │   ├── 📁 models/          # MongoDB schemas
│   │   ├── 📁 routes/          # API endpoints
│   │   ├── 📁 middleware/      # Validation & error handling
│   │   ├── 📁 types/           # TypeScript definitions
│   │   └── 📄 server.ts        # Main server file
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   └── 📄 .env                 # Environment variables
├── 📁 frontend/                # Next.js client app
│   ├── 📁 src/
│   │   ├── 📁 app/             # Next.js App Router pages
│   │   │   ├── 📁 apply/       # Application form page
│   │   │   ├── 📁 recruiter/   # Recruiter dashboard page
│   │   │   ├── 📄 layout.tsx   # Root layout
│   │   │   ├── 📄 page.tsx     # Home page
│   │   │   └── 📄 globals.css  # Global styles
│   │   ├── 📁 components/      # Reusable React components
│   │   ├── 📁 lib/            # Utilities (Socket.io client)
│   │   └── 📁 types/          # TypeScript definitions
│   ├── 📄 package.json
│   ├── 📄 tsconfig.json
│   ├── 📄 tailwind.config.js
│   └── 📄 .env.local          # Environment variables
└── 📄 README.md
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.0 or higher
- **MongoDB** (local installation or Atlas account)
- **Git** for version control
- **Code editor** (VS Code recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/job-platform.git
cd job-platform
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/job-platform

# For MongoDB Atlas (replace with your credentials):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-platform

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:3000
```

Start the backend development server:

```bash
npm run dev
```

✅ Backend running at `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

✅ Frontend running at `http://localhost:3000`

### 4. Access the Application

- **Home Page**: http://localhost:3000
- **Apply for Jobs**: http://localhost:3000/apply
- **Recruiter Dashboard**: http://localhost:3000/recruiter

## 🔗 API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/interview-requests` | Fetch all requests | - | Array of requests |
| `GET` | `/api/interview-requests/:id` | Get single request | - | Request object |
| `POST` | `/api/interview-requests` | Submit new request | `{ name, email, jobTitle }` | Created request |
| `PUT` | `/api/interview-requests/:id/accept` | Accept request | - | Updated request |
| `PUT` | `/api/interview-requests/:id/reject` | Reject request | `{ reason? }` | Updated request |
| `DELETE` | `/api/interview-requests/:id` | Delete request | - | Success message |
| `GET` | `/api/interview-requests/stats` | Get statistics | - | Stats object |

### Example API Usage

**Submit a new interview request:**

```bash
curl -X POST http://localhost:5000/api/interview-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "jobTitle": "Frontend Developer"
  }'
```

**Accept an interview request:**

```bash
curl -X PUT http://localhost:5000/api/interview-requests/64f8a1b2c3d4e5f6789012ab/accept \
  -H "Content-Type: application/json"
```

## 🎯 Usage Guide

### For Job Applicants

1. **Navigate** to `/apply` page
2. **Fill out** the interview request form:
   - Full name
   - Email address
   - Desired job position
3. **Submit** your application
4. **Receive** instant confirmation
5. **Wait** for recruiter response (typically within 24 hours)

### For Recruiters

1. **Access** the `/recruiter` dashboard
2. **View** real-time interview requests
3. **Filter** applications by status:
   - All applications
   - Pending review
   - Accepted
   - Rejected
4. **Search** candidates by name, email, or position
5. **Take action**:
   - ✅ Accept applications
   - ❌ Reject applications
   - 📧 Contact candidates directly
6. **Monitor** live updates without refreshing

## 🔄 Real-time Features

The platform leverages **Socket.io** for instant communication:

### For Recruiters
- 📩 **New applications** appear automatically
- 🔄 **Status updates** sync across all tabs
- 🔔 **Toast notifications** for important events
- 📊 **Live statistics** update in real-time

### For Applicants
- ✅ **Instant confirmation** when application is submitted
- 📧 **Real-time status updates** (when implemented)

### Technical Implementation
- **Efficient data transfer** with minimal payload
- **Automatic reconnection** on network issues
- **Room-based updates** for targeted notifications
- **Fallback polling** for unsupported browsers

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. **Create account** on [Render](https://render.com) or [Railway](https://railway.app)

2. **Connect repository** to your deployment platform

3. **Configure environment variables**:
   ```env
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-platform
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```

4. **Set build commands**:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`

5. **Deploy** and note your backend URL

### Frontend Deployment (Vercel)

1. **Connect repository** to [Vercel](https://vercel.com)

2. **Configure environment variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   NEXT_PUBLIC_SOCKET_URL=https://your-backend-url.onrender.com
   ```

3. **Deploy automatically** with Vercel's GitHub integration

### MongoDB Setup

**Option 1: MongoDB Atlas (Recommended)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Add database user and IP whitelist
4. Get connection string and update `MONGODB_URI`

**Option 2: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/job-platform`

## 📝 Environment Variables

### Backend (.env)

```env
# Required
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development

# Optional
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
JWT_SECRET=your_jwt_secret_here
```

### Frontend (.env.local)

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Optional
NEXT_PUBLIC_APP_NAME=Job Platform
NEXT_PUBLIC_COMPANY_NAME=Your Company
```

## 🧪 Development

### Available Scripts

**Backend:**
```bash
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript to JavaScript
npm start           # Start production server
npm run type-check  # Check TypeScript types
npm run lint        # Run ESLint
npm test            # Run tests
```

**Frontend:**
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm start          # Start production server
npm run lint       # Run ESLint and Next.js linting
npm run type-check # Check TypeScript types
```

### Code Quality Tools

- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **Prettier** - Code formatting (recommended)
- **Husky** - Git hooks (recommended)

## 📊 Features Implemented

- ✅ **Real-time updates** with Socket.io
- ✅ **Form validation** and error handling
- ✅ **Responsive design** for all devices
- ✅ **Search and filtering** functionality
- ✅ **Loading states** and user feedback
- ✅ **Type safety** with TypeScript
- ✅ **Modern UI/UX** with Tailwind CSS
- ✅ **API documentation** and examples
- ✅ **Error boundaries** and exception handling
- ✅ **Performance optimization**
- ✅ **Security best practices**
- ✅ **Accessibility features**

## 🔮 Roadmap

### Phase 1 (Current)
- [x] Basic CRUD operations
- [x] Real-time updates
- [x] Modern UI design
- [x] Form validation

### Phase 2 (Upcoming)
- [ ] **User authentication** for recruiters
- [ ] **Email notifications** for status updates
- [ ] **File upload** for resumes/CVs
- [ ] **Advanced search** with filters

### Phase 3 (Future)
- [ ] **Interview scheduling** system
- [ ] **Video interview** integration
- [ ] **Analytics dashboard** with metrics
- [ ] **Multi-language support**
- [ ] **Mobile app** (React Native)

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### 1. Fork the Repository

```bash
git clone https://github.com/your-username/job-platform.git
cd job-platform
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Make Your Changes

- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 4. Commit Your Changes

```bash
git commit -m 'Add some amazing feature'
```

### 5. Push and Create PR

```bash
git push origin feature/amazing-feature
```

Then create a Pull Request on GitHub.

### Development Guidelines

- **Code Style**: Follow TypeScript and React best practices
- **Commits**: Use conventional commit messages
- **Testing**: Add tests for new functionality
- **Documentation**: Update README and code comments

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using Next.js, Express, MongoDB, and Socket.io**#   j o b - p l a t f o r m 
 
 #   j o b - p l a t f o r m 
 
 
Need help? Here are your options:

- 📧 **Email**: support@jobplatform.com
- 💬 **GitHub Issues**: [Open an issue](https://github.com/your-username/job-platform/issues)
- 📖 **Documentation**: Check this README and code comments
- 💡 **Feature Requests**: Use GitHub Discussions

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Socket.io Team** - For real-time communication
- **MongoDB Team** - For the flexible database
- **Tailwind CSS** - For the utility-first CSS framework
- **TypeScript Team** - For type safety and better DX

---

<p align="center">
  <strong>Built with ❤️ by developers, for developers</strong>
</p>

<p align="center">
  <a href="https://nextjs.org">Next.js</a> •
  <a href="https://expressjs.com">Express</a> •
  <a href="https://mongodb.com">MongoDB</a> •
  <a href="https://socket.io">Socket.io</a>
</p>
#   j o b - p l a t f o r m  
 