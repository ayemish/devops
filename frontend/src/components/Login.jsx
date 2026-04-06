import { useState } from "react"
const API = import.meta.env.VITE_API_URL || "http://localhost:8000"

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" })
  const [msg, setMsg] = useState("")

  async function handle(e) {
    e.preventDefault()
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
    const data = await res.json()
    if (res.ok) onLogin(data.username)
    else setMsg(data.detail)
  }

  return (
    <form onSubmit={handle}>
      <h2>Log in</h2>
      <input placeholder="Username" value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        style={inputStyle} required />
      <input placeholder="Password" type="password" value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        style={inputStyle} required />
      <button type="submit" style={btnStyle}>Log in</button>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </form>
  )
}

const inputStyle = { display: "block", width: "100%", marginBottom: 12,
  padding: "10px 12px", borderRadius: 8, border: "1px solid #ddd",
  fontSize: 15, boxSizing: "border-box" }
const btnStyle = { width: "100%", padding: "10px", background: "#4F46E5",
  color: "#fff", border: "none", borderRadius: 8, fontSize: 15, cursor: "pointer" }