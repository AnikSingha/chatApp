import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./routes/login"
import Register from "./routes/register"

function App() {
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
