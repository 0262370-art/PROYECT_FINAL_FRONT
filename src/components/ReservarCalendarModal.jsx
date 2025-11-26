// src/components/ReservaCalendarModal.jsx
import React, { useState, useEffect } from "react";
import "../StudentsPage.css"; // para no hacer otro css, usamos el mismo

export default function ReservaCalendarModal({
  open,
  onClose,
  onConfirm,
  initialDate,
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (!open) return;

    // si viene una fecha inicial, separamos fecha y hora
    if (initialDate) {
      const [d, t] = initialDate.split(" ");
      setDate(d || "");
      setTime(t || "");
    } else {
      setDate("");
      setTime("");
    }
  }, [open, initialDate]);

  if (!open) return null;

  const handleConfirm = () => {
    if (!date) {
      alert("Elige al menos una fecha.");
      return;
    }
    const finalString = time ? `${date} ${time}` : date;
    onConfirm(finalString);
  };

  return (
    <div className="reserva-modal-overlay">
      <div className="reserva-modal">
        <h2>Seleccionar fecha de reserva</h2>

        <label className="reserva-modal-label">
          Fecha
          <input
            type="date"
            className="reserva-modal-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label className="reserva-modal-label">
          Hora (opcional)
          <input
            type="time"
            className="reserva-modal-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <div className="reserva-modal-actions">
          <button className="reserva-modal-btn cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="reserva-modal-btn confirm" onClick={handleConfirm}>
            Guardar fecha
          </button>
        </div>
      </div>
    </div>
  );
}
