// src/components/Admin/AdminVStudent.jsx
import { useNavigate } from "react-router-dom";
import avatarPlaceholder from "../../assets/user-icon.svg";
import "../../StudentProfile.css";
import Header from "../Header"   

export default function AdminVStudent() {
  const navigate = useNavigate();

  // Estos datos luego vendrán del backend ↓
  const name = "Nombre del alumno";
  const avatar = avatarPlaceholder;
  const warningText =
    "Tincidunt purus at amet, eu nisl urna at. Pellentesque diam dictum consectetur leo ipsum.";

  return (
    <>
      <Header />

      {/* ---------------------- CONTENIDO ---------------------- */}
      <div className="profile-root">
        
        {/* ----------------- COLUMNA IZQUIERDA ----------------- */}
        <div className="profile-left">

          {/* Avatar */}
          <div className="profile-avatar-wrapper">
            <img src={avatar} alt="avatar" className="profile-avatar" />
          </div>

          {/* Nombre */}
          <div className="profile-name">{name}</div>

          {/* NOTA: Aquí NO hay botón de editar */}
        </div>

        {/* ----------------- COLUMNA DERECHA ----------------- */}
        <div className="profile-right">
          <div className="profile-card">

            {/* Título */}
            <div className="profile-card-title">Mis Reservas</div>

            {/* Equipos */}
            <div className="profile-card-block">
              <div className="profile-card-block-title">Equipos</div>
              <div className="profile-card-text">Especificaciones generales</div>
            </div>

            {/* Salones */}
            <div className="profile-card-block">
              <div className="profile-card-block-title">Salones</div>
              <div className="profile-card-text">Información general</div>
            </div>

            {/* Advertencias */}
            <div className="profile-card-block">
              <div className="profile-card-block-title">Advertencias</div>
              <div className="profile-card-text">{warningText}</div>
            </div>

            {/* BOTÓN AGREGAR WARNING */}
            <button
              className="warning-btn"
              onClick={() => alert("Abrir modal de advertencia")}
            >
              Add Warning
            </button>

          </div>
        </div>
      </div>

      {/* ---------------------- FOOTER ---------------------- */}
      <footer className="admin-footer">

        <div className="admin-footer-left">

          {/* Flecha atrás */}
          <span
            className="admin-footer-back"
            onClick={() => navigate("/admin/alumnos")}
          >
            ←
          </span>

          {/* "Escudo" — puedes reemplazarlo luego */}
          <div className="admin-shield-placeholder">LOGO</div>

          <span className="admin-footer-text">
            Escuela de comunicación contacto:
          </span>
        </div>

        {/* Email */}
        <div className="admin-footer-right">
          <div className="admin-email-input">
            <span className="admin-email-icon">✉️</span>
            <input
              type="email"
              value="prestamocom@up.edu.mx"
              readOnly
            />
          </div>
        </div>

      </footer>

    </>
  );
}
