const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

// 🔌 connect to PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lead_db",
  password: "",
  port: 5432,
});

// test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ➕ ADD LEAD
app.post("/leads", async (req, res) => {
  const { name, phone, source, notes } = req.body;

  const result = await pool.query(
    "INSERT INTO leads (name, phone, source, notes) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, phone, source, notes]
  );

  res.json(result.rows[0]);
});

// 📥 GET LEADS
app.get("/leads", async (req, res) => {
  const result = await pool.query("SELECT * FROM leads ORDER BY id DESC");
  res.json(result.rows);
});

// 🔄 UPDATE STATUS
app.put("/leads/:id", async (req, res) => {
  const { status } = req.body;

  const result = await pool.query(
    "UPDATE leads SET status=$1 WHERE id=$2 RETURNING *",
    [status, req.params.id]
  );

  res.json(result.rows[0]);
});

// ❌ DELETE
app.delete("/leads/:id", async (req, res) => {
  await pool.query("DELETE FROM leads WHERE id=$1", [req.params.id]);
  res.send("Deleted");
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
