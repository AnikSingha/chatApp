import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./routes/login"
import Register from "./routes/register"
import Chat from "./routes/chat"
import { useAuth } from "reactfire"
import { useEffect } from "react"

function App() {

  const auth = useAuth()

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
