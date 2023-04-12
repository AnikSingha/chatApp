import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "reactfire";
import Login from "./routes/login";
import Register from "./routes/register";
import Chat from "./routes/chat";
import Profile from "./routes/profile";
import { useEffect, useState } from "react";

function App() {
  const auth = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(Boolean(user));
      setIsLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/chat"
          element={isLoggedIn ? <Chat /> : <Navigate to="/register" replace={true} />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/register" replace={true} />}
        />
      </Routes>
    </Router>
  );
}

export default App;