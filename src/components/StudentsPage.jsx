// src/components/StudentsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../StudentsPage.css";
import Header from "./Header";

// MUI
// MUI imports moved into Header component

// IMPORTA TUS IMÁGENES REALES AQUÍ
import heroImg from "../assets/bannergrande.png";        // banner grande
import cardEquip from "../assets/reservaequipo.png";     // reservar equipo
import cardSalon from "../assets/reservasalones.png";    // reservar salones
import cardMisRes from "../assets/misreservas.png";      // mis reservas
import cardFaq from "../assets/FAQS.png";                // FAQs

export default function StudentsPage() {

  const navigate = useNavigate();

  // esta constante es para dirigirte a otra pagina al momento de darle click en reservar
  const handleNavigate = (path) => () => {
    navigate(path);
  };

  

  return (
    <div className="students-root">
      <Header />





      {/* El drawer ahora se maneja dentro de Header */}

      {/* CONTENIDO PRINCIPAL */}
      <main className="students-main">
        {/* Banner grande */}
        <section className="students-hero">
          <img src={heroImg} alt="Estudiantes en laboratorio" />
        </section>

        {/* Tarjetas */}
        <section className="students-cards">
          <article className="students-card">
            <img src={cardEquip} alt="Cámara de video" />
            <div className="students-card-footer">
              {/*este boton al darle click te va a llevar a la pagina de reservar equipo*/}
              <button onClick={handleNavigate("/reservar-equipo")}> 
              Reservar equipo »»
              </button>
            </div>
          </article>

          <article className="students-card">
            <img src={cardSalon} alt="Set de grabación" />
            <div className="students-card-footer">
              <button>Reservar salones »»</button>
            </div>
          </article>

          <article className="students-card">
            <img src={cardMisRes} alt="Claqueta" />
            <div className="students-card-footer">
              <button>Mis reservas »»</button>
            </div>
          </article>

          <article className="students-card">
            <img src={cardFaq} alt="Frequent Asked Questions" />
            <div className="students-card-footer">
              <button>FAQ’s »»</button>
            </div>
          </article>
        </section>
      </main>




      {/* FOOTER */}
      {/* FOOTER */}
      <footer className="students-footer">
        <div className="students-footer-left">
          <div className="students-shield-placeholder">LOGO</div>
          <div className="students-footer-text">
            <span>Escuela de comunicación contacto:</span>
          </div>
        </div>

        <div className="students-footer-right">
          <div className="students-email-input" title="Enviar correo">
            <span className="students-email-icon">✉️</span>
            <input type="email" placeholder="prestamocom@up.edu.mx" />
          </div>
        </div>
      </footer>
    </div>
  );
}
