import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../StudentsPage.css";
import ReservaCalendarModal from "../ReservarCalendarModal";
import TerminosModal from "../TerminosModal";


import salon1 from "../../assets/salon1.jpg";
import salon2 from "../../assets/salon2.jpg";
import salon3 from "../../assets/salon3.jpg";

const salones = [salon1, salon2, salon3];



export default function ReservarSalonesDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [terminosOpen, setTerminosOpen] = useState(false);

    const index = Number(id) || 0;
    const image = salones[index] || salones[0];

    const nombreSalon = `Salón ${index + 1}`;
    const descripcion =
        "Información del salón. Elige una fecha, revisa términos y condiciones y agrega al carrito.";

    const [calendarOpen, setCalendarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    const handleConfirmDate = (dateString) => {
        setSelectedDate(dateString);
        setCalendarOpen(false);
    };

    const handleAddToCart = () => {
        if (!selectedDate) {
            alert("Primero selecciona una fecha en el calendario.");
            return;
        }

        const nuevaReserva = {
            id: `salon-${index}-${Date.now()}`,
            kind: "salon",
            name: nombreSalon,
            date: selectedDate,
            createdAt: new Date().toISOString(),
        };

        const prev = JSON.parse(localStorage.getItem("reservas") || "[]");
        localStorage.setItem("reservas", JSON.stringify([...prev, nuevaReserva]));

        alert("Salón agregado a tus reservas.");
    };

    return (
        <div className="students-root">
            <Header />

            <main className="students-main reservar-detalle-root">
                <section className="reservar-detalle-left">
                    <div className="reservar-detalle-image-wrapper">
                        <img
                            src={image}
                            alt={nombreSalon}
                            className="reservar-detalle-img"
                        />
                    </div>

                    <div className="reservar-detalle-disclaimer">Disclaimer</div>
                </section>

                <section className="reservar-detalle-right">
                    <div className="reservar-detalle-card">
                        <h2>Salón</h2>
                        <p>
                            <strong>{nombreSalon}</strong>
                        </p>
                        <p>{descripcion}</p>

                        {selectedDate && (
                            <p style={{ marginTop: "0.6rem", fontSize: "0.9rem" }}>
                                <strong>Fecha seleccionada:</strong> {selectedDate}
                            </p>
                        )}
                    </div>

                    <div className="reservar-detalle-buttons-row">
                        <button
                            className="reservar-detalle-btn"
                            onClick={() => setCalendarOpen(true)}
                        >
                            Calendario de Reservas »
                        </button>

                        <button
                            className="reservar-detalle-btn"
                            onClick={handleAddToCart}
                        >
                            Agregar a carrito »
                        </button>
                    </div>

                    <button
                        className="reservar-detalle-btn-secondary"
                        onClick={() => setTerminosOpen(true)}
                    >
                        Leer términos y condiciones »
                    </button>


                    <button
                        className="reservar-detalle-back"
                        onClick={() => navigate("/reservar-salones")}
                    >
                        ← Volver a salones
                    </button>
                </section>
            </main>

            <ReservaCalendarModal
                open={calendarOpen}
                onClose={() => setCalendarOpen(false)}
                onConfirm={handleConfirmDate}
                initialDate={selectedDate}
            />

            <TerminosModal
                open={terminosOpen}
                onClose={() => setTerminosOpen(false)}
            />

        </div>
    );
}
