// src/components/Students/ReservarEquipoDetalle.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../StudentsPage.css";
import "../../ReservarEquipoPage.css";
import ReservaCalendarModal from "../ReservarCalendarModal";
import TerminosModal from "../TerminosModal";


import cam1 from "../../assets/cam1.png";
import cam2 from "../../assets/cam2.png";
import cam3 from "../../assets/cam3.png";
import cam4 from "../../assets/cam4.png";
import cam5 from "../../assets/cam5.png";
import cam6 from "../../assets/cam6.png";

const items = [cam1, cam2, cam3, cam4, cam5, cam6];



export default function ReservarEquipoDetalle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [terminosOpen, setTerminosOpen] = useState(false);

    const index = Number(id) || 0;
    const image = items[index] || items[0];

    const nombreEquipo = `Cámara ${index + 1}`;
    const descripcion =
        "Especificaciones del producto. Pasos para reservar: 1. Elige una fecha. 2. Lee y acepta términos y condiciones. 3. Agrega al carrito.";

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
            id: `equipo-${index}-${Date.now()}`,
            kind: "equipo",
            name: nombreEquipo,
            date: selectedDate,
            createdAt: new Date().toISOString(),
        };

        const prev = JSON.parse(localStorage.getItem("reservas") || "[]");
        localStorage.setItem("reservas", JSON.stringify([...prev, nuevaReserva]));

        alert("Equipo agregado a tus reservas.");
    };

    return (
        <div className="students-root">
            <Header />

            <main className="students-main reservar-detalle-root">
                <section className="reservar-detalle-left">
                    <div className="reservar-detalle-image-wrapper">
                        <img
                            src={image}
                            alt={nombreEquipo}
                            className="reservar-detalle-img"
                        />
                    </div>

                    <div className="reservar-detalle-disclaimer">Disclaimer</div>
                </section>

                <section className="reservar-detalle-right">
                    <div className="reservar-detalle-card">
                        <h2>Producto</h2>
                        <p>
                            <strong>{nombreEquipo}</strong>
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
                        onClick={() => navigate("/reservar-equipo")}
                    >
                        ← Volver a equipos
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
