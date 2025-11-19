// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import StudentsPage from "./components/StudentsPage";
import AdminPage from "./components/AdminPage";
import ReservarEquipoPage from "./components/ReservarEquipoPage";
import ReservarSalonesPage from "./components/ReservarSalonesPage";
import MisReservasPage from "./components/MisReservasPage";
import FaqsPage from "./components/FaqsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/Admin" element={<AdminPage/>} />
        <Route path="/reservar-equipo" element={<ReservarEquipoPage />} />
        <Route path="/reservar-salones" element={<ReservarSalonesPage />} />
        <Route path="/mis-reservas" element={<MisReservasPage />} />
        <Route path="/faqs" element={<FaqsPage />} />

    </Routes>
  );
}

export default App;
