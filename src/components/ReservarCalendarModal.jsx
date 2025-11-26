// src/components/ReservarCalendarModal.jsx
import React, { useState, useEffect } from "react";
import "../StudentsPage.css";

export default function ReservaCalendarModal({
  open,
  onClose,
  onConfirm,
}) {
  // Estados para Inicio
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  // Estados para Fin (Devolución)
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (open) {
      // Resetear campos al abrir
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
    }
  }, [open]);

  if (!open) return null;

  const handleConfirm = () => {
    // 1. Validar que todo esté lleno
    if (!startDate || !startTime || !endDate || !endTime) {
      alert("Por favor, completa todas las fechas y horas (inicio y devolución).");
      return;
    }

    const startISO = `${startDate}T${startTime}`;
    const endISO = `${endDate}T${endTime}`;

    // 2. Validar que la fecha de fin sea posterior al inicio
    if (new Date(startISO) >= new Date(endISO)) {
      alert("La fecha de devolución debe ser posterior a la fecha de inicio.");
      return;
    }
    
    // Retornamos un objeto con ambas fechas
    onConfirm({ start: startISO, end: endISO });
  };

  return (
    <div className="reserva-modal-overlay">
      <div className="reserva-modal" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <h2>Agendar Reserva</h2>

        {/* SECCIÓN INICIO */}
        <h3 style={{ fontSize: "1rem", marginTop: "0.5rem", borderBottom: "1px solid #ddd" }}>
          Desde (Recogida):
        </h3>
        <label className="reserva-modal-label">
          Fecha Inicio
          <input
            type="date"
            className="reserva-modal-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className="reserva-modal-label">
          Hora Inicio
          <input
            type="time"
            className="reserva-modal-input"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>

        {/* SECCIÓN FIN */}
        <h3 style={{ fontSize: "1rem", marginTop: "1rem", borderBottom: "1px solid #ddd" }}>
          Hasta (Devolución):
        </h3>
        <label className="reserva-modal-label">
          Fecha Devolución
          <input
            type="date"
            className="reserva-modal-input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label className="reserva-modal-label">
          Hora Devolución
          <input
            type="time"
            className="reserva-modal-input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>

        <div className="reserva-modal-actions" style={{ marginTop: "1.5rem" }}>
          <button className="reserva-modal-btn cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="reserva-modal-btn confirm" onClick={handleConfirm}>
            Confirmar Fechas
          </button>
        </div>
      </div>
    </div>
  );
}