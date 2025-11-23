// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import StudentsPage from "./components/StudentsPage";
import AdminPage from "./components/AdminPage";
import ReservarEquipoPage from "./components/ReservarEquipoPage";
import ReservarSalonesPage from "./components/ReservarSalonesPage";
import MisReservasPage from "./components/MisReservasPage";
import FaqsPage from "./components/FaqsPage";
import StudentProfile from "./components/StudentProfile";
import AdminDetallesPeticiones from "./components/AdminDetallesPeticiones";
import AdminPeticiones from "./components/AdminPeticiones";
import AdminProfilePage from "./components/AdminProfilePage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/student-perfil" element={<StudentProfile />} />
      <Route path="/admin-perfil" element={<AdminProfilePage />} />
      <Route path="/Admin" element={<AdminPage />} />
      <Route path="/reservar-equipo" element={<ReservarEquipoPage />} />
      <Route path="/reservar-salones" element={<ReservarSalonesPage />} />
      <Route path="/mis-reservas" element={<MisReservasPage />} />
      <Route path="/faqs" element={<FaqsPage />} />
      <Route path="/admin-peticiones" element={<AdminPeticiones />} />
      <Route path="/admin/petition/:id" element={<AdminDetallesPeticiones />} />




    </Routes>
  );
}

export default App;
