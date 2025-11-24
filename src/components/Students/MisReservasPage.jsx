// src/components/MisReservasPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../StudentsPage.css"; // reutiliza estilos de layout/header

export default function MisReservasPage() {
  const navigate = useNavigate();

  return (
    <div className="students-root">
      <Header />

      <main className="students-main">
       
      </main>

      <footer className="students-footer">
        <div className="students-footer-left">
          <button
            className="students-back-btn"
            aria-label="Volver a estudiantes"
            onClick={() => navigate("/students")}
          >
            ←
          </button>
          <div className="students-shield-placeholder">LOGO</div>
          <div className="students-footer-text">
            <span>Escuela de comunicación contacto:</span>
          </div>
        </div>

        <div className="students-footer-right">
          <div className="students-email-input" title="Enviar correo">
            <span className="students-email-icon">✉️</span>
            <span className="students-email-text">prestamocom@up.edu.mx</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
