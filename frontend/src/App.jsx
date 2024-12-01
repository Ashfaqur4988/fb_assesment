import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import WorkFlowPage from "./pages/WorkFlowPage";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Signup from "./pages/signup";

function App() {
  const { user, checkingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="h-screen w-screen">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={!user ? <Login /> : <WorkFlowPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
