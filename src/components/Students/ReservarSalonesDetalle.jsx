// src/components/Students/ReservarSalonesDetalle.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../StudentsPage.css";
import "../../ReservarEquipoPage.css";
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
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isAdded, setIsAdded] = useState(false); 

    // NUEVO: Estado de fechas
    const [rDates, setRDates] = useState(null);

    const index = Number(id) || 0;
    const image = salones[index] || salones[0];
    const nombreSalon = `Salón ${index + 1}`;
    const descripcion = "Información del salón. Selecciona hora de entrada y salida.";

    const handleConfirmDates = (datesObj) => {
        setRDates(datesObj);
        setCalendarOpen(false);
    };

    const handleAddToCart = () => {
        if (!rDates) {
            alert("Primero selecciona las fechas de reserva.");
            return;
        }
        if (!termsAccepted) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        const nuevaReserva = {
            id: `salon-${index}-${Date.now()}`,
            tipo: "salon",
            img: image,
            name: nombreSalon,
            startDate: rDates.start,
            endDate: rDates.end,
            date: `${rDates.start.replace("T", " ")}  AL  ${rDates.end.replace("T", " ")}`,
            createdAt: new Date().toISOString(),
        };

        const prev = JSON.parse(localStorage.getItem("carrito") || "[]");
        localStorage.setItem("carrito", JSON.stringify([...prev, nuevaReserva]));

        setIsAdded(true);
    };

    return (
        <div className="students-root">
            <Header />

            <main className="students-main reservar-detalle-root">
                <section className="reservar-detalle-left">
                    <div className="reservar-detalle-image-wrapper">
                        <img src={image} alt={nombreSalon} className="reservar-detalle-img" />
                    </div>
                    <div className="reservar-detalle-disclaimer">Disclaimer</div>
                </section>

                <section className="reservar-detalle-right">
                    {isAdded ? (
                        <>
                            <div className="success-box">Artículo en el carrito!</div>
                            <div className="success-buttons-row">
                                <button className="success-btn" onClick={() => navigate("/reservar-salones")}>
                                    Volver al catálogo »
                                </button>
                                <button className="success-btn" onClick={() => navigate("/carrito-reservas")}>
                                    Ir al carrito »
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="reservar-detalle-card">
                                <h2>Salón</h2>
                                <p><strong>{nombreSalon}</strong></p>
                                <p>{descripcion}</p>

                                {rDates && (
                                    <div style={{ marginTop: "0.8rem", fontSize: "0.9rem", background: "#fff", padding: "8px", borderRadius: "4px" }}>
                                        <p style={{margin: "4px 0"}}><strong>Inicio:</strong> {rDates.start.replace("T", " ")}</p>
                                        <p style={{margin: "4px 0"}}><strong>Fin:</strong> {rDates.end.replace("T", " ")}</p>
                                    </div>
                                )}

                                {termsAccepted && (
                                    <p style={{ marginTop: "0.4rem", fontSize: "0.9rem", color: "green" }}>
                                        ✅ Términos aceptados
                                    </p>
                                )}
                            </div>

                            <div className="reservar-detalle-buttons-row">
                                <button className="reservar-detalle-btn" onClick={() => setCalendarOpen(true)}>
                                    {rDates ? "Cambiar Fechas »" : "Seleccionar Fechas »"}
                                </button>

                                <button className="reservar-detalle-btn" onClick={handleAddToCart}>
                                    Agregar a carrito »
                                </button>
                            </div>

                            <button className="reservar-detalle-btn-secondary" onClick={() => setTerminosOpen(true)}>
                                {termsAccepted ? "Ver términos y condiciones »" : "Leer términos y condiciones »"}
                            </button>

                            <button className="reservar-detalle-back" onClick={() => navigate("/reservar-salones")}>
                                ← Volver a salones
                            </button>
                        </>
                    )}
                </section>
            </main>

            <ReservaCalendarModal
                open={calendarOpen}
                onClose={() => setCalendarOpen(false)}
                onConfirm={handleConfirmDates}
            />

            <TerminosModal
                open={terminosOpen}
                onClose={() => setTerminosOpen(false)}
                onAccept={() => setTermsAccepted(true)}
            />
        </div>
    );
}