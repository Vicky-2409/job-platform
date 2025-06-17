# 🚀 Job Interview Request Platform

A modern, real-time job interview request platform built with Next.js, Express, MongoDB, and Socket.io.

## ✨ Features

- 🔄 **Real-time updates** - Instant notifications using Socket.io
- 📝 **Smart forms** - Validation and success feedback
- 📊 **Live dashboard** - Real-time interview request management
- 🎯 **One-click actions** - Accept/reject requests instantly
- 🔍 **Search & filter** - Find candidates quickly
- 🎨 **Modern UI** - Beautiful, responsive design
- 🔒 **Type-safe** - Full TypeScript implementation

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Socket.io Client
- **Backend**: Express.js, TypeScript, Socket.io, Mongoose
- **Database**: MongoDB
- **Real-time**: Socket.io

## 🚀 Quick Setup

### Prerequisites

- Node.js 18+ installed
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas) account)
- Git

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd job-platform

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Setup Environment Variables

**Backend** - Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-platform
NODE_ENV=development
```

**Frontend** - Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 3. Start the Application

**Terminal 1** - Start Backend:
```bash
cd backend
npm run dev
```
✅ Backend running at `http://localhost:5000`

**Terminal 2** - Start Frontend:
```bash
cd frontend
npm run dev
```
✅ Frontend running at `http://localhost:3000`

### 4. Access the App

- **Home**: http://localhost:3000
- **Apply for Jobs**: http://localhost:3000/apply
- **Recruiter Dashboard**: http://localhost:3000/recruiter

## 🗄️ Database Setup Options

### Option A: Local MongoDB
```bash
# Install MongoDB locally
# macOS (with Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt install mongodb
sudo systemctl start mongodb

# Windows - Download from MongoDB website
```

### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create database user
4. Get connection string
5. Update `MONGODB_URI` in `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/job-platform
```

## 📁 Project Structure

```
job-platform/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Validation & utils
│   │   └── server.ts       # Main server
│   └── package.json
├── frontend/               # Next.js app
│   ├── src/
│   │   ├── app/           # Pages (App Router)
│   │   ├── components/    # React components
│   │   ├── lib/          # Utilities
│   │   └── types/        # TypeScript types
│   └── package.json
└── README.md
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/interview-requests` | Get all requests |
| POST | `/api/interview-requests` | Create new request |
| PUT | `/api/interview-requests/:id/accept` | Accept request |
| GET | `/api/interview-requests/stats` | Get statistics |

## 🎯 Usage

### For Applicants
1. Go to `/apply`
2. Fill out the form (name, email, job title)
3. Submit and get instant confirmation

### For Recruiters
1. Go to `/recruiter`
2. View real-time applications
3. Filter by status or search
4. Accept/reject with one click

## 🚀 Deployment

### Quick Deploy (Free)

**1. Database** - MongoDB Atlas:
- Create free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Get connection string

**2. Backend** - Railway:
- Push code to GitHub
- Connect to [Railway](https://railway.app)
- Add environment variables:
  ```env
  NODE_ENV=production
  MONGODB_URI=your_atlas_connection_string
  CORS_ORIGIN=https://your-frontend-domain.vercel.app
  ```

**3. Frontend** - Vercel:
- Connect GitHub repo to [Vercel](https://vercel.com)
- Set root directory to `frontend/`
- Add environment variables:
  ```env
  NEXT_PUBLIC_API_URL=https://your-backend.railway.app
  NEXT_PUBLIC_SOCKET_URL=https://your-backend.railway.app
  ```

## 🛠 Development Commands

**Backend:**
```bash
npm run dev          # Start development server
npm run build        # Build TypeScript
npm start           # Start production server
```

**Frontend:**
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm start          # Start production server
```

## 🐛 Troubleshooting

### Common Issues

**CORS Errors:**
- Make sure `CORS_ORIGIN` in backend matches your frontend URL

**Database Connection Failed:**
- Check MongoDB is running locally, or
- Verify Atlas connection string and IP whitelist

**Socket.io Not Working:**
- Ensure both frontend and backend URLs match
- Check firewall/network settings

**Build Errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Features Included

- ✅ Real-time updates with Socket.io
- ✅ Form validation and error handling
- ✅ Responsive design for all devices
- ✅ Search and filtering functionality
- ✅ Loading states and user feedback
- ✅ TypeScript for type safety
- ✅ Modern UI with Tailwind CSS
- ✅ Error handling and recovery

## 🔮 Coming Soon

- [ ] User authentication
- [ ] Email notifications
- [ ] File upload for resumes
- [ ] Interview scheduling
- [ ] Analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

- 📧 **Issues**: Open a GitHub issue
- 💬 **Questions**: Start a GitHub discussion
- 📖 **Docs**: Check this README

---

**Built with ❤️ using Next.js, Express, MongoDB, and Socket.io**
