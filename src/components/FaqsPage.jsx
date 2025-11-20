// src/components/FaqsPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "../StudentsPage.css";
import "../FAQPage.css";

export default function FaqsPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const toggle = (idx) => {
    setOpen(open === idx ? null : idx);
  };

  const faqs = [
    {
      q: "Cómo Funciona Nuestro Sitio?",
      a: "Nuestro sitio permite reservar equipo siguiendo tres pasos: elige tu fecha, acepta términos y agrega al carrito."
    },
    {
      q: "Is There Any Warranty Exclusions?",
      a: "Elementum ullamcorper felis nulla scelerisque. Nunc enim nunc mattis leo massa."
    },
    {
      q: "Are There Any Return Exclusions?",
      a: "Las devoluciones deben cumplir con los lineamientos establecidos por la universidad."
    },
    {
      q: "Will I Be Charged For A Replacement Item?",
      a: "Si existe daño por mal uso, se cobrará el costo total de la reposición."
    },
    {
      q: "How Can I Track My Orders & Payment?",
      a: "Puedes revisarlo en la sección 'Mis Reservas' desde tu perfil."
    }
  ];

  return (
    <div className="students-root">
      <Header />

      <main className="students-main faq-container">

        <div className="faq-left">
          <h1 className="faq-title">Frequent Ask Questions</h1>
          <p className="faq-description">
            Pellentesque Cras Adipiscing Tempus Libero Vel Nullam Mauris Tellus.
            Aliquam Ultrices Tellus Consequat Amet, Lectus Aliquam Est In Neque.
          </p>
        </div>

        <div className="faq-right">
          {faqs.map((item, idx) => (
            <div 
              key={idx}
              className="faq-item"
              onClick={() => toggle(idx)}
            >
              <div className="faq-question">
                <span className="faq-question-text">{item.q}</span>
                <span className="faq-arrow">{open === idx ? "▾" : "▸"}</span>
              </div>

              {open === idx && (
                <div className="faq-answer">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
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
            <input type="email" placeholder="prestamocom@up.edu.mx" />
          </div>
        </div>
      </footer>
    </div>
  );
}