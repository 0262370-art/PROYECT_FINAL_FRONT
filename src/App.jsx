// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import StudentsPage from "./components/StudentsPage";
import AdminPage from "./components/AdminPage";
import ReservarEquipoPage from "./components/ReservarEquipoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/Admin" element={<AdminPage/>} />
        <Route path="/reservar-equipo" element={<ReservarEquipoPage />} />

    </Routes>
  );
}

export default App;
