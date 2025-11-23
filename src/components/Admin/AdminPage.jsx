// src/components/StudentsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../AdminPage.css";
import Header from "../Header";

// MUI
// MUI imports moved into Header component

// IMPORTA TUS IMÁGENES REALES AQUÍ
import heroImg from "../../assets/bannergrande.png";        // banner grande
import cardEquip from "../../assets/reservaequipo.png";     // reservar equipo
import cardSalon from "../../assets/reservasalones.png";    // reservar salones
import cardMisRes from "../../assets/misreservas.png";      // mis reservas
import cardFaq from "../../assets/FAQS.png";                // FAQs

export default function StudentsPage() {

  const navigate = useNavigate();

  // esta constante es para dirigirte a otra pagina al momento de darle click en reservar
  const handleNavigate = (path) => () => {
    navigate(path);
  };

  

  return (
    <div className="admin-root">
      <Header />





      {/* El drawer ahora se maneja dentro de Header */}

      {/* CONTENIDO PRINCIPAL */}
      <main className="admin-main">
        {/* Banner grande */}
        <section className="admin-hero">
          <img src={heroImg} alt="Estudiantes en laboratorio" />
        </section>

        {/* Tarjetas */}
        <section className="admin-cards">
          <article className="admin-card">
            <img src={cardEquip} alt="Cámara de video" />
            <div className="admin-card-footer">
              {/*este boton al darle click te va a llevar a la pagina de reservar equipo*/}
              <button onClick={handleNavigate("/admin-peticiones")}> 
                Reservar Peticiones »»
              </button>
            </div>
          </article>

          <article className="admin-card">
            <img src={cardSalon} alt="Set de grabación" />
            <div className="admin-card-footer">
              <button onClick={handleNavigate("/reservar-salones")}> Agregar productos »»</button>
            </div>
          </article>

          <article className="admin-card">
            <img src={cardMisRes} alt="Claqueta" />
            <div className="admin-card-footer">
              <button onClick={handleNavigate("/mis-reservas")}>Perfiles »»</button>
            </div>
          </article>

          <article className="admin-card">
            <img src={cardFaq} alt="Frequent Asked Questions" />
            <div className="admin-card-footer">
              <button onClick={handleNavigate("/faqs")}>Agregar salones »»</button>
            </div>
          </article>
        </section>
      </main>




      {/* FOOTER */}
      {/* FOOTER */}
      <footer className="admin-footer">
        <div className="admin-footer-left">
          <div className="admin-shield-placeholder">LOGO</div>
          <div className="admin-footer-text">
            <span>Escuela de comunicación contacto:</span>
          </div>
        </div>

        <div className="admin-footer-right">
          <div className="admin-email-input" title="Enviar correo">
            <span className="admin-email-icon">✉️</span>
            <input type="email" placeholder="prestamocom@up.edu.mx" />
          </div>
        </div>
      </footer>
    </div>
  );
}
