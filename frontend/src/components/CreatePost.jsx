import { useState } from "react"
const API = import.meta.env.VITE_API_URL || "http://localhost:8000"

export default function CreatePost({ user, onPosted }) {
  const [content, setContent] = useState("")

  async function handle(e) {
    e.preventDefault()
    if (!content.trim()) return
    await fetch(`${API}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, content })
    })
    setContent("")
    onPosted()
  }

  return (
    <form onSubmit={handle} style={{ marginBottom: 24 }}>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
        style={{ display: "block", width: "100%", padding: "10px 12px",
          borderRadius: 8, border: "1px solid #ddd", fontSize: 15,
          resize: "vertical", boxSizing: "border-box", marginBottom: 8 }}
        required
      />
      <button type="submit" style={{ padding: "8px 20px", background: "#4F46E5",
        color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>
        Post
      </button>
    </form>
  )
}