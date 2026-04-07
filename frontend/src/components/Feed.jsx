import { useEffect, useState } from "react"
import CreatePost from "./CreatePost"
const API = import.meta.env.VITE_API_URL || "http://4.187.188.157:8000"

export default function Feed({ user, onLogout }) {
  const [posts, setPosts] = useState([])

  async function loadPosts() {
    const res = await fetch(`${API}/posts`)
    setPosts(await res.json())
  }

  useEffect(() => { loadPosts() }, [])

  return (
    <div style={{ maxWidth: 540, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2>Hello, {user}</h2>
        <button onClick={onLogout} style={{ background: "none", border: "1px solid #ddd",
          borderRadius: 8, padding: "6px 14px", cursor: "pointer" }}>
          Logout
        </button>
      </div>
      <CreatePost user={user} onPosted={loadPosts} />
      {posts.map(p => (
        <div key={p.id} style={{ border: "1px solid #eee", borderRadius: 10,
          padding: "14px 16px", marginBottom: 12 }}>
          <strong>{p.username}</strong>
          <span style={{ fontSize: 12, color: "#888", marginLeft: 10 }}>{p.created_at.slice(0, 10)}</span>
          <p style={{ margin: "8px 0 0" }}>{p.content}</p>
        </div>
      ))}
    </div>
  )
}