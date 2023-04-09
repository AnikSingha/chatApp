import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./routes/login"
import Register from "./routes/register"
import { useAuth } from "reactfire"
import { useEffect } from "react"

function App() {

  const auth = useAuth()

  useEffect(() => {
    console.log(auth.currentUser)
  },[])

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
