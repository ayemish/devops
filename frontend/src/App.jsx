import { useState } from "react"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Feed from "./components/Feed"

export default function App() {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState("login") // "login" | "signup"

  if (user) return <Feed user={user} onLogout={() => setUser(null)} />

  return (
    <div style={{ maxWidth: 420, margin: "60px auto", padding: "0 16px" }}>
      <h1 style={{ textAlign: "center", marginBottom: 24 }}>Social App</h1>
      {page === "login" ? (
        <>
          <Login onLogin={setUser} />
          <p style={{ textAlign: "center", marginTop: 16 }}>
            No account?{" "}
            <button onClick={() => setPage("signup")} style={linkBtn}>Sign up</button>
          </p>
        </>
      ) : (
        <>
          <Signup onSignup={() => setPage("login")} />
          <p style={{ textAlign: "center", marginTop: 16 }}>
            Have an account?{" "}
            <button onClick={() => setPage("login")} style={linkBtn}>Log in</button>
          </p>
        </>
      )}
    </div>
  )
}

const linkBtn = {
  background: "none", border: "none", color: "#4F46E5",
  cursor: "pointer", padding: 0, fontSize: "inherit"
}