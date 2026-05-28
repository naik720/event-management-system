# 🚀 Event Management System - Setup & Launch Guide

## ✨ What's New

You now have a complete **4-step event creation and management system** that was successfully implemented!

When users click the **"CREATE AN EVENT"** button on your home page, they go through this workflow:

1. **Step 1 - Event Category** - Select type (Wedding, Corporate, Concert, etc.)
2. **Step 2 - Event Details** - Set dates, venue, and milestones  
3. **Step 3 - Assign Resources** - Add staff, vendors, equipment
4. **Step 4 - Event Dashboard** - Manage and monitor the event

---

## 📋 All Files Created

### Backend Files
```
✅ backend/models/Event.js
✅ backend/models/EventSchedule.js
✅ backend/models/EventResource.js
✅ backend/controllers/eventController.js
✅ backend/routes/events.js
✅ backend/middleware/auth.js (updated)
```

### Frontend Files
```
✅ frontend/src/pages/events/EventCategory.jsx
✅ frontend/src/pages/events/EventDetails.jsx
✅ frontend/src/pages/events/EventResources.jsx
✅ frontend/src/pages/events/EventDashboard.jsx
✅ frontend/src/services/eventApi.js
✅ frontend/src/App.jsx (updated with routing)
```

### Documentation Files
```
✅ EVENT_MANAGEMENT_IMPLEMENTATION.md
✅ QUICK_REFERENCE.md
✅ SETUP_GUIDE.md (this file)
```

---

## 🔧 Prerequisites

Make sure you have installed:
- Node.js (v14 or higher)
- MongoDB (local or Atlas connection string)
- npm or yarn

---

## 📦 Installation & Setup

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already installed)
npm install

# Create .env file with these variables:
cat > .env << EOF
MONGODB_URI=mongodb://localhost:27017/event-management
JWT_SECRET=your-super-secret-jwt-key-here
PORT=5000
EOF

# Start the backend server
npm run dev
# Backend will run on http://localhost:5000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Create .env file (optional, defaults to localhost:5000)
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF

# Start the frontend
npm start
# Frontend will run on http://localhost:3000
```

---

## ✅ Verification Checklist

After starting both servers, verify everything works:

### Backend Check
```bash
# Test API endpoint in terminal:
curl http://localhost:5000/api/events/user-events \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Frontend Check
1. Open http://localhost:3000 in browser
2. Click "LOGIN" and sign in with your account
3. Navigate back to home
4. Click "CREATE AN EVENT" button
5. You should see Step 1: Category Selection page

### Test Full Workflow
- [ ] Select a category on Step 1
- [ ] Enter event title and description
- [ ] Click "Next Step"
- [ ] Fill in dates and venue on Step 2
- [ ] Click "Continue to Resources"
- [ ] Add some resources on Step 3
- [ ] Click "Complete Setup & View Dashboard"
- [ ] View event dashboard with all details

---

## 🌐 API Endpoints Reference

### Event Operations
```
POST   /api/events/create              - Create new event
GET    /api/events/user-events         - Get your events
GET    /api/events/:eventId            - Get event details
PUT    /api/events/:eventId            - Update event
DELETE /api/events/:eventId            - Delete event
```

### Schedule Management
```
POST   /api/events/schedule/save       - Save event schedule
```

### Resource Management
```
POST   /api/events/resource/add        - Add resource
PUT    /api/events/resource/:id        - Update resource
DELETE /api/events/resource/:id        - Delete resource
```

### Statistics
```
GET    /api/events/stats/overview      - Get event stats
```

---

## 📱 Testing with Postman/API Client

### 1. Create Event
```json
POST http://localhost:5000/api/events/create
Authorization: Bearer [YOUR_TOKEN]

{
  "title": "Tech Conference 2024",
  "category": "Conference",
  "description": "Annual tech conference",
  "maxAttendees": 500
}
```

### 2. Save Schedule
```json
POST http://localhost:5000/api/events/schedule/save
Authorization: Bearer [YOUR_TOKEN]

{
  "eventId": "[EVENT_ID_FROM_RESPONSE]",
  "startDate": "2024-06-15T09:00:00Z",
  "endDate": "2024-06-15T17:00:00Z",
  "startTime": "09:00",
  "endTime": "17:00",
  "venue": {
    "name": "Convention Center",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "capacity": 500
  },
  "timezone": "EST",
  "milestones": [
    {
      "title": "Venue Selection",
      "dueDate": "2024-06-01T00:00:00Z",
      "status": "Pending"
    }
  ]
}
```

### 3. Add Resource
```json
POST http://localhost:5000/api/events/resource/add
Authorization: Bearer [YOUR_TOKEN]

{
  "eventId": "[EVENT_ID]",
  "resourceType": "Staff",
  "name": "Event Coordinator",
  "description": "Main event coordinator",
  "quantity": 1,
  "cost": 1000,
  "notes": "Full time coordinator"
}
```

---

## 🎨 Features Overview

### Event Categories
- 🎂 Birthday Party
- 💍 Wedding
- 💼 Corporate Event
- 🎤 Conference
- 🎵 Concert
- 🖼️ Exhibition

### Resource Types
- 👥 Staff
- 🏪 Vendor
- ⚙️ Equipment
- 🍽️ Catering
- 🏟️ Venue
- 📦 Other

### Event Status Flow
```
Planning → Scheduled → Ongoing → Completed
                    ↘ Cancelled (anytime)
```

### Milestone Tracking
- Venue Selection
- Vendor Confirmation
- Staff Assignment
- Event Execution

---

## 🐛 Troubleshooting

### "Cannot POST /api/events/create"
- Check if backend is running on port 5000
- Verify event routes are imported in server.js
- Check server logs for errors

### "401 Unauthorized"
- JWT token expired or invalid
- Log out and log back in
- Check localStorage for token

### "Cannot find module 'eventController'"
- Verify file path is correct
- Check if file exists in backend/controllers/

### Frontend can't connect to backend
- Check CORS is enabled: `app.use(cors())`
- Verify backend URL in frontend .env
- Check if ports are correct (frontend:3000, backend:5000)

### Event not saving
- Check MongoDB connection
- Verify organizerId is set correctly from JWT
- Check browser console for error messages

---

## 📊 Database Verification

### Check if events collection exists
```javascript
// In MongoDB client
use event-management
db.events.find()
db.eventschedules.find()
db.eventresources.find()
```

---

## 🔐 Security Notes

1. **Always use HTTPS in production**
2. **Keep JWT_SECRET secure** - don't commit to git
3. **Validate all user inputs** on backend
4. **Use environment variables** for sensitive data
5. **Implement rate limiting** for API endpoints

---

## 📈 Performance Tips

1. Add pagination for large event lists
2. Implement caching for frequently accessed data
3. Use database indexes on eventId and organizerId
4. Lazy load images and components
5. Minify frontend assets for production

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Update all environment variables
- [ ] Enable HTTPS/SSL
- [ ] Configure MongoDB Atlas connection
- [ ] Set up proper error logging
- [ ] Enable CORS properly (not wildcard)
- [ ] Test all API endpoints
- [ ] Test full user workflow
- [ ] Set up database backups
- [ ] Configure CDN for static assets
- [ ] Set up monitoring/alerts

---

## 📞 Need Help?

### Check These Files First
1. `EVENT_MANAGEMENT_IMPLEMENTATION.md` - Complete feature overview
2. `QUICK_REFERENCE.md` - Developer quick reference
3. Backend logs - `npm run dev` output
4. Browser console - Frontend errors

### Common Issues
- Check that both frontend and backend are running
- Clear browser cache and localStorage
- Verify MongoDB is running
- Check network tab in browser DevTools
- Review backend console for error messages

---

## ✨ Next Steps

1. **Start the servers:**
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   cd frontend && npm start
   ```

2. **Test the workflow:**
   - Navigate to http://localhost:3000
   - Login/Register
   - Click "CREATE AN EVENT"
   - Complete all 4 steps

3. **Customize as needed:**
   - Add more event categories
   - Modify UI styling (Tailwind CSS)
   - Add more resource types
   - Extend milestone tracking

4. **Deploy when ready:**
   - Backend to Heroku/Vercel/Railway
   - Frontend to Netlify/Vercel
   - Database to MongoDB Atlas

---

**🎉 Your event management system is ready to use!**

Start creating events and managing them seamlessly! 🚀
