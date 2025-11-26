// src/components/TerminosModal.jsx
import React from "react";
import "../StudentsPage.css";

export default function TerminosModal({ open, onClose, onAccept }) {
  if (!open) return null;

  return (
    <div className="reserva-modal-overlay">
      <div className="terminos-modal">
        <h2>Términos y Condiciones</h2>

        <div className="terminos-content">
          <p>
            • El usuario es responsable del equipo o salón durante el periodo de
            reserva. <br /><br />
            • Cualquier daño, desperfecto o pérdida deberá ser cubierto. <br /><br />
            • Se debe entregar el equipo en las mismas condiciones en las que fue recibido. <br /><br />
            • El uso de los salones debe respetar el reglamento interno de la universidad. <br /><br />
            • Las reservas deben realizarse con anticipación. <br /><br />
            • El incumplimiento de las normas puede resultar en sanciones o suspensión del préstamo.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button 
            className="terminos-close-btn" 
            onClick={onClose}
            style={{ backgroundColor: "#e0e0e0" }} // Color gris para cancelar
          >
            Cancelar
          </button>
          
          <button 
            className="terminos-close-btn" 
            onClick={() => {
              onAccept();
              onClose();
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}