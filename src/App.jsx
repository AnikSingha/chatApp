import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./routes/login"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
