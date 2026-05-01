🚀 Lead Management System

A full-stack Lead Management Dashboard built with React, Node.js, Express, and PostgreSQL.

It helps you capture, manage, and track leads with a modern UI and a scalable backend.

✨ Features
📋 Add, update, and delete leads
🔍 Search and filter leads
📊 Stats dashboard (Total, New, Converted)
🎯 Dynamic lead status updates
💎 Glassmorphism UI + Dark/Light theme
⚡ Fast and responsive interface
🛠 Tech Stack
Frontend
React + TypeScript
Tailwind CSS
shadcn/ui
Lucide Icons
Backend
Node.js
Express.js
Database
PostgreSQL
📁 Project Structure
project-root/
│
├── client/             # React frontend
├── server/             # Node backend
│   ├── index.js
│   └── setup.sql       # Database setup
│
└── README.md
⚙️ Prerequisites

Make sure you have installed:

Node.js (v18+ recommended)
npm or yarn
PostgreSQL
pgAdmin (optional)
🧩 STEP 1 — Clone Repository
git clone https://github.com/sakshi0921-lab/crm-repo.git
cd crm-repo
🗄️ STEP 2 — Setup PostgreSQL Database
🔹 Create Database

Open PostgreSQL / pgAdmin and create:

leads_db
🔹 Create Table

Create a file:

server/setup.sql

Paste:

CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  source TEXT CHECK (source IN ('Call', 'WhatsApp', 'Field')),
  status TEXT DEFAULT 'New',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🔹 Run SQL File
psql -U postgres -d leads_db -f server/setup.sql
⚙️ STEP 3 — Setup Backend
cd server
npm install
Create .env file
DATABASE_URL=postgresql://username:password@localhost:5432/leads_db
PORT=5000
Start Backend
node index.js

You should see:

Server running on http://localhost:5000 🚀

Test API:

👉 http://localhost:5000/leads

💻 STEP 4 — Setup Frontend

Open a new terminal:

cd client
npm install
npm run dev

Open:

👉 http://localhost:5173

🔗 API Endpoints
Method	Endpoint	Description
GET	/leads	Get all leads
POST	/leads	Add new lead
PUT	/leads/:id	Update lead status
DELETE	/leads/:id	Delete lead
🧪 Example API Request
Add Lead
POST /leads
{
  "name": "XYZ",
  "phone": "9999999999",
  "source": "Call",
  "notes": "Interested user"
}
🌐 Deployment

You can deploy like this:

Frontend → Netlify / Vercel
Backend → Render / Railway
Database → Neon / Supabase
⚠️ Common Issues
❌ Database not connecting
Check DATABASE_URL
Ensure PostgreSQL is running
Verify username/password
❌ CORS Error

Fix in backend:

app.use(cors());
❌ Port already in use

Change port in .env:

PORT=5001
💡 Future Improvements
🔐 Authentication (JWT)
📈 Advanced analytics dashboard
📱 Better mobile responsiveness
⚡ Real-time updates (WebSockets)
👨‍💻 Author

Sakshi
GitHub: https://github.com/sakshi0921-lab/crm-repo.git
