import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <div className="phone">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
