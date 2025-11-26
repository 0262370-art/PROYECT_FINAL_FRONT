// src/components/Students/MisReservasPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../StudentsPage.css";

export default function MisReservasPage() {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  
  // Estado para controlar qué reserva se quiere eliminar
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reservas") || "[]");
    setReservas(stored);
  }, []);

  const handleRequestDelete = (index) => {
    setItemToDelete(index);
  };

  const confirmDelete = () => {
    if (itemToDelete === null) return;
    
    const updatedReservas = reservas.filter((_, i) => i !== itemToDelete);
    setReservas(updatedReservas);
    localStorage.setItem("reservas", JSON.stringify(updatedReservas));
    
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setItemToDelete(null);
  };

  return (
    <div className="students-root">
      <Header />

      <main className="students-main" style={{ color: "black" }}>
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
                  color: "black",
                  position: "relative"
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
                      color: "black",
                      marginBottom: "0.25rem",
                      fontWeight: "bold"
                    }}
                  >
                    {item.tipo === "equipo" ? "Equipo" : "Salón"}
                  </div>

                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      marginBottom: "0.4rem",
                      color: "black"
                    }}
                  >
                    {item.nombre}
                  </div>

                  {item.creadoEn && (
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "black",
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

                  <div style={{ fontSize: "0.8rem", color: "black", marginBottom: "1rem" }}>
                    Detalles de la reserva: pendiente de confirmar horario.
                  </div>

                  {/* BOTÓN DE CANCELAR INDIVIDUAL */}
                  <button
                    onClick={() => handleRequestDelete(idx)}
                    style={{
                      backgroundColor: "#ffdddd",
                      color: "#d32f2f",
                      border: "1px solid #d32f2f",
                      borderRadius: "4px",
                      padding: "0.4rem 0.8rem",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      fontWeight: "bold",
                      width: "100%"
                    }}
                  >
                    Cancelar reserva
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* MODAL DE CONFIRMACIÓN */}
      {itemToDelete !== null && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: "#f4eee3",
              padding: "2rem",
              borderRadius: "15px",
              textAlign: "center",
              width: "380px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              color: "black"
            }}
          >
            <h3 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: "600" }}>
              Seguro que quieres<br />cancelar reserva?
            </h3>
            
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              
              {/* Botón NO (VERDE = Conservar) */}
              <button
                onClick={cancelDelete}
                style={{
                  background: "#dcedc8", // Verde claro
                  border: "1px solid #7cb342",
                  color: "#000",
                  padding: "0.6rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "500"
                }}
              >
                No, conservar<br />reserva
              </button>

              {/* Botón SI (ROJO = Cancelar) */}
              <button
                onClick={confirmDelete}
                style={{
                  background: "#ffcdd2", // Rojo claro
                  border: "1px solid #ef5350",
                  color: "#000",
                  padding: "0.6rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: "500"
                }}
              >
                Si, cancelar
              </button>

            </div>
          </div>
        </div>
      )}

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