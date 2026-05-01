# 🚀 Lead Management System

A full-stack Lead Management Dashboard built with **React, Node.js, Express, and PostgreSQL**.

This project allows you to:

* 📋 Add, update, and delete leads
* 🔍 Search and filter leads
* 📊 View lead stats (Total, Converted, New)
* 🎯 Manage lead status dynamically
* 💎 Experience a modern glassmorphism UI

---

## 🛠 Tech Stack

### Frontend

* React + TypeScript
* Tailwind CSS
* shadcn/ui components
* Lucide Icons

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL (pgAdmin / local or cloud)

---

## 📁 Project Structure

```
project-root/
│
├── client/         # React frontend
├── server/         # Node backend
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have installed:

* Node.js (v18+ recommended)
* npm or yarn
* PostgreSQL
* pgAdmin (optional but helpful)

---

## 🧩 STEP 1 — Clone Repository

```
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

---

## 🗄️ STEP 2 — Setup Database

1. Open PostgreSQL / pgAdmin
2. Create a new database (e.g., `leads_db`)

Run this SQL:

```
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  source TEXT CHECK (source IN ('Call', 'WhatsApp', 'Field')),
  status TEXT DEFAULT 'New',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## ⚙️ STEP 3 — Setup Backend

Go to backend folder:

```
cd server
npm install
```

### Create `.env` file:

```
DATABASE_URL=postgresql://username:password@localhost:5432/leads_db
PORT=5000
```

### Start backend:

```
node index.js
```

You should see:

```
Backend running 🚀
```

Test in browser:

```
http://localhost:5000/leads
```

---

## 💻 STEP 4 — Setup Frontend

Open new terminal:

```
cd client
npm install
```

### Start frontend:

```
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

| Method | Endpoint   | Description        |
| ------ | ---------- | ------------------ |
| GET    | /leads     | Get all leads      |
| POST   | /leads     | Add new lead       |
| PUT    | /leads/:id | Update lead status |
| DELETE | /leads/:id | Delete lead        |

---

## 🧪 Example API Request

### Add Lead

```
POST /leads
```

Body:

```
{
  "name": "Sakshi",
  "phone": "9999999999",
  "source": "Call",
  "notes": "Interested user"
}
```

---

## 🌐 Deployment (Optional)

* Frontend → Netlify
* Backend → Render
* Database → Neon

---

## ⚠️ Common Issues

### ❌ CORS Error

Fix in backend:

```
app.use(cors());
```

### ❌ Database not connecting

* Check DATABASE_URL
* Ensure PostgreSQL is running

### ❌ Port already in use

Change port in `.env`

---

## 💡 Future Improvements

* 🔐 Authentication (JWT)
* 📈 Analytics dashboard
* 📱 Mobile responsiveness improvements
* ⚡ Real-time updates (WebSockets)

---

## 👨‍💻 Author

Sakshi
GitHub: https://github.com/sakshi0921-lab/crm-repo.git

---

## ⭐ If you like this project

Give it a star on GitHub ⭐
