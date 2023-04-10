import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useAuth } from "reactfire"
import Login from "./routes/login"
import Register from "./routes/register"
import Chat from "./routes/chat"
import Profile from "./routes/profile"

function App() {

  const auth = useAuth()

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
