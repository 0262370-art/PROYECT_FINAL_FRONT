// src/components/ProfilePage.jsx
import "../StudentsPage.css";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="profile-root">
      <main className="profile-layout">
        {/* Columna izquierda: avatar + texto */}
        <section className="profile-left">

          {/* Avatar ORIGINAL hecho con puro CSS */}
          <div className="profile-avatar-big" />

          <div className="profile-details">
            <span className="profile-pencil">✏️</span>
            <h1>Detalles del perfil</h1>
          </div>

          <button
            className="profile-return-btn"
            onClick={() => navigate("/students")}
          >
            ‹‹ Return to main page
          </button>
        </section>

        {/* Columna derecha: tarjeta de “Mis Reservas” */}
        <section className="profile-right">
          <div className="profile-card">
            <header className="profile-card-header">
              Mis Reservas
              <span className="profile-bell">🔔</span>
            </header>

            <div className="profile-section">
              <button className="profile-accordion profile-accordion-open">
                <span>Equipos</span>
                <span className="profile-arrow">⌃</span>
              </button>
              <div className="profile-accordion-body">
                <p>Especificaciones generales</p>
              </div>
            </div>

            <div className="profile-section">
              <button className="profile-accordion">
                <span>Salones</span>
                <span className="profile-plus">＋</span>
              </button>
            </div>

            <div className="profile-section">
              <h2>Advertencias</h2>
              <div className="profile-warning-box">
                <div className="profile-warning-bar" />
                <p>
                  Tincidunt purus at amet, eu nisl urna at. Pellentesque diam
                  dictum consectetur leo ipsum. Lectus gravida id aliquam.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Flechita de salida */}
      <button className="profile-exit-btn" aria-label="Cerrar sesión">
        ↪
      </button>
    </div>
  );
}
