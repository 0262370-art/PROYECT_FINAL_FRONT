// src/components/Students/CarritoReservasPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../StudentsPage.css";
import "../../CarritoReservas.css";

// ÍCONO EXACTO DE TU IMAGEN (Bote con rayas verticales)
const TrashIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 448 512" 
    width="18" 
    height="18" 
    fill="black"
  >
    {/* Este dibujo crea el bote con tapa y las 3 rayitas verticales */}
    <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/>
  </svg>
);

export default function CarritoReservasPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("carrito") || "[]");
    setCartItems(stored);
  }, []);

  const requestDelete = (index) => setItemToDelete(index);
  const cancelDelete = () => setItemToDelete(null);

  const confirmDelete = () => {
    if (itemToDelete === null) return;
    const updated = cartItems.filter((_, i) => i !== itemToDelete);
    setCartItems(updated);
    localStorage.setItem("carrito", JSON.stringify(updated));
    setItemToDelete(null);
  };

  const handleConfirmReservation = () => {
    if (cartItems.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    // Mover de carrito a reservas
    const historialPrevio = JSON.parse(localStorage.getItem("reservas") || "[]");
    const nuevoHistorial = [...historialPrevio, ...cartItems];
    localStorage.setItem("reservas", JSON.stringify(nuevoHistorial));
    
    // Vaciar carrito
    localStorage.removeItem("carrito");
    setCartItems([]);

    setShowSuccess(true);
    setTimeout(() => {
        navigate("/mis-reservas");
    }, 2000);
  };

  return (
    <div className="students-root">
      <Header />

      <main className="students-main carrito-container">
        <div className="carrito-box">
            <h2 className="carrito-title">Mi carrito de reservas</h2>

            <div className="carrito-list">
            {cartItems.length === 0 ? (
                <p style={{ color: "#666", fontSize: "1.2rem", fontStyle: "italic" }}>
                    Tu carrito está vacío.
                </p>
            ) : (
                cartItems.map((item, idx) => (
                <div key={idx} className="carrito-item">
                    <button 
                      className="carrito-delete-btn" 
                      onClick={() => requestDelete(idx)}
                      title="Eliminar artículo"
                    >
                      <TrashIcon />
                    </button>

                    <div className="carrito-img-wrapper">
                      <img src={item.img} alt={item.name} />
                    </div>

                    <div className="carrito-details">
                      <p className="carrito-detail-title">Detalles de producto:</p>
                      <p><strong>- {item.tipo === "equipo" ? "Cámara" : "Salón"}:</strong> {item.name}</p>
                      <p><strong>- Fecha:</strong> {item.date}</p>
                      {/* Si quieres mostrar la cantidad guardada también: */}
                      {item.cantidad && <p><strong>- Cantidad:</strong> {item.cantidad}</p>}
                    </div>
                </div>
                ))
            )}
            </div>

            {cartItems.length > 0 && (
            <div className="carrito-footer">
                <button className="carrito-confirm-btn" onClick={handleConfirmReservation}>
                Reservar artículos
                </button>
            </div>
            )}
        </div>
      </main>

      {/* MODAL CONFIRMACIÓN (Estilo exacto) */}
      {itemToDelete !== null && (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)", display: "flex",
            justifyContent: "center", alignItems: "center", zIndex: 1100
          }}>
          <div style={{
              backgroundColor: "#f4eee3", padding: "2.5rem 2rem",
              borderRadius: "12px", textAlign: "center", width: "420px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.25)", color: "black"
            }}>
            <h3 style={{ marginBottom: "1.5rem", fontSize: "1.3rem", fontWeight: "700", lineHeight: "1.4" }}>
              ¿Está seguro que quiere borrar<br/>este artículo de su carrito?
            </h3>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button onClick={confirmDelete} style={{
                  background: "#dcedc8", border: "1px solid #7cb342", color: "#000",
                  padding: "0.6rem 1.8rem", borderRadius: "4px", cursor: "pointer", fontWeight: "500"
                }}>Si, borrar</button>
              <button onClick={cancelDelete} style={{
                  background: "#ffcdd2", border: "1px solid #ef5350", color: "#000",
                  padding: "0.6rem 1.8rem", borderRadius: "4px", cursor: "pointer", fontWeight: "500"
                }}>No, conservar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ÉXITO */}
      {showSuccess && (
        <div className="reserva-modal-overlay">
          <div className="reserva-modal" style={{ textAlign: "center", alignItems: "center", padding: "2rem" }}>
            <h2 style={{ color: "#2e7d32", marginBottom: "1rem" }}>¡Éxito!</h2>
            <p style={{ fontSize: "1.1rem", color: "#000" }}>Artículos reservados exitosamente.</p>
            <p style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>Redirigiendo a tus reservas...</p>
          </div>
        </div>
      )}

      <footer className="students-footer">
        <div className="students-footer-left">
          <button className="students-back-btn" onClick={() => navigate("/students")}>←</button>
          <div className="students-shield-placeholder">LOGO</div>
          <div className="students-footer-text">Escuela de comunicación contacto:</div>
        </div>
        <div className="students-footer-right">
          <div className="students-email-input">
            <span className="students-email-icon">✉️</span>
            <span className="students-email-text">prestamocom@up.edu.mx</span>
          </div>
        </div>
      </footer>
    </div>
  );
}