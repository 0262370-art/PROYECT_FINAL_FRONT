import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AdminPage from "./components/Admin//AdminPage";
import ReservarEquipoPage from "./components/Students/ReservarEquipoPage";
import ReservarEquipoDetalle from "./components/Students/ReservarEquipoDetalle";
import ReservarSalonesPage from "./components/Students//ReservarSalonesPage";
import ReservarSalonesDetalle from "./components/Students/ReservarSalonesDetalle";
import MisReservasPage from "./components/Students//MisReservasPage";
import FaqsPage from "./components/Students/FaqsPage";
import StudentProfile from "./components/Students/StudentProfile";
import AdminDetallesPeticiones from "./components/Admin/AdminDetallesPeticiones";
import AdminPeticiones from "./components/Admin/AdminPeticiones";
import AdminProfilePage from "./components/Admin/AdminProfilePage";
import StudentsPage from "./components/Students/StudentsPage";
import AdminListaAlumnos from "./components/Admin/AdminListaAlumnos";
import AdminVStudent from "./components/Admin/AdminVStudent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/student-perfil" element={<StudentProfile />} />
      <Route path="/admin-perfil" element={<AdminProfilePage />} />
      <Route path="/Admin" element={<AdminPage />} />

      <Route path="/reservar-equipo" element={<ReservarEquipoPage />} />
      <Route path="/reservar-equipo/:id" element={<ReservarEquipoDetalle />} /> {/* 👈 NUEVA */}

      <Route path="/reservar-salones" element={<ReservarSalonesPage />} />
      <Route path="/reservar-salones/:id" element={<ReservarSalonesDetalle />} />

      <Route path="/mis-reservas" element={<MisReservasPage />} />
      <Route path="/faqs" element={<FaqsPage />} />
      <Route path="/admin-peticiones" element={<AdminPeticiones />} />
      <Route path="/admin/petition/:id" element={<AdminDetallesPeticiones />} />

      {/* lista */}
      <Route path="/admin/alumnos" element={<AdminListaAlumnos />} />

      {/* perfil dinámico */}
      <Route path="/admin/alumno/:id" element={<AdminVStudent />} />
    </Routes>
  );
}

export default App;

