// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import StudentsPage from "./components/StudentsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/students" element={<StudentsPage />} />
    </Routes>
  );
}

export default App;
