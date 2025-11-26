// src/components/Students/ReservarSalonesPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../StudentsPage.css";
import "../../ReservarEquipoPage.css"; // reutilizamos misma galería que equipos

import salon1 from "../../assets/salon1.jpg";
import salon2 from "../../assets/salon2.jpg";
import salon3 from "../../assets/salon3.jpg";

export default function ReservarSalonesPage() {
  const navigate = useNavigate();

  // aquí podrías meter info distinta por salón si quieres
  const salones = [
    { id: 0, nombre: "Salón 1", img: salon1 },
    { id: 1, nombre: "Salón 2", img: salon2 },
    { id: 2, nombre: "Salón 3", img: salon3 },
  ];


  const handleClickSalon = (id) => {
    navigate(`/reservar-salones/${id}`);
  };

  return (
    <div className="students-root">
      <Header />

      <main className="students-main">
        <section className="reservar-gallery">
          {salones.map((salon) => (
            <article
              key={salon.id}
              className="reservar-card"
              onClick={() => handleClickSalon(salon.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="reservar-card-box">
                {/* 🔹 AQUI puedes meter tu <img src=... /> cuando tengas las fotos */}
                <img
                  src={salon.img}
                  className="reservar-card-img"
                  alt={salon.nombre}
                />

              </div>

              <div className="reservar-label">{salon.nombre}</div>
            </article>
          ))}
        </section>
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
