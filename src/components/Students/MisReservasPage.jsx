// src/components/Students/MisReservasPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../StudentsPage.css";

export default function MisReservasPage() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reservas") || "[]");
    setReservas(stored);
  }, []);

  const handleClear = () => {
    localStorage.removeItem("reservas");
    setReservas([]);
  };

  return (
    <div className="students-root">
      <Header />

      <main className="students-main">
        <h2>Mis Reservas</h2>

        {reservas.length === 0 ? (
          <p style={{ marginTop: "1rem" }}>No tienes reservas todavía.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.2rem",
              marginTop: "1.2rem",
            }}
          >
            {reservas.map((item, idx) => (
              <article
                key={idx}
                style={{
                  background: "#f7f1e5",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Imagen arriba */}
                {item.img && (
                  <div style={{ width: "100%", height: "180px", overflow: "hidden" }}>
                    <img
                      src={item.img}
                      alt={item.nombre}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                {/* Detalles abajo */}
                <div style={{ padding: "0.9rem 1rem 1.1rem" }}>
                  <div
                    style={{
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "#7a6a4b",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {item.tipo === "equipo" ? "Equipo" : "Salón"}
                  </div>

                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.nombre}
                  </div>

                  {item.creadoEn && (
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#555",
                        marginBottom: "0.4rem",
                      }}
                    >
                      Añadido el{" "}
                      {new Date(item.creadoEn).toLocaleString("es-MX", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#666",
                    }}
                  >
                    Detalles de la reserva: pendiente de confirmar horario y
                    disponibilidad.
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {reservas.length > 0 && (
          <button
            onClick={handleClear}
            style={{
              marginTop: "1.5rem",
              padding: "0.5rem 1.2rem",
              borderRadius: "4px",
              border: "none",
              background: "#c49545",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Vaciar reservas
          </button>
        )}
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
