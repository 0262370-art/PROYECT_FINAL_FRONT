// src/components/Students/ReservarEquipoDetalle.jsx
import React, { useState, useEffect } from "react";
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
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const [quantity, setQuantity] = useState(1);
    const [availableStock, setAvailableStock] = useState(5);

    // NUEVO: Estado para guardar ambas fechas
    const [rDates, setRDates] = useState(null); // { start: string, end: string }

    const index = Number(id) || 0;
    const image = items[index] || items[0];
    const nombreEquipo = `Cámara ${index + 1}`;
    const descripcion = "Especificaciones del producto. Elige fechas de inicio y fin, acepta términos y agrega al carrito.";
    const maxStockTotal = 5; 

    useEffect(() => {
        const reservasGuardadas = JSON.parse(localStorage.getItem("reservas") || "[]");
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito") || "[]");

        const contarOcupados = (lista) => {
            return lista.reduce((total, item) => {
                if (item.name === nombreEquipo) {
                    return total + (item.cantidad || 1);
                }
                return total;
            }, 0);
        };

        const ocupados = contarOcupados(reservasGuardadas) + contarOcupados(carritoGuardado);
        const restantes = Math.max(0, maxStockTotal - ocupados);
        setAvailableStock(restantes);

        if (quantity > restantes) {
            setQuantity(restantes > 0 ? 1 : 0);
        } else if (restantes === 0) {
            setQuantity(0);
        }
    }, [nombreEquipo]);

    // Callback que recibe el objeto { start, end } del Modal
    const handleConfirmDates = (datesObj) => {
        setRDates(datesObj);
        setCalendarOpen(false);
    };

    const increaseQty = () => {
        if (quantity < availableStock) setQuantity(quantity + 1);
    };
    const decreaseQty = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        if (availableStock === 0) {
            alert("Lo sentimos, no hay stock disponible.");
            return;
        }
        // Validamos que existan las fechas
        if (!rDates) {
            alert("Primero selecciona las fechas de reserva (inicio y fin).");
            return;
        }
        if (!termsAccepted) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        const nuevaReserva = {
            id: `equipo-${index}-${Date.now()}`,
            tipo: "equipo",
            img: image,
            name: nombreEquipo,
            // Guardamos ambas fechas para el backend
            startDate: rDates.start,
            endDate: rDates.end,
            // Guardamos un string legible para mostrar en el carrito
            date: `${rDates.start.replace("T", " ")}  AL  ${rDates.end.replace("T", " ")}`,
            cantidad: quantity, 
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
                        <img src={image} alt={nombreEquipo} className="reservar-detalle-img" />
                    </div>
                    <div className="reservar-detalle-disclaimer">Disclaimer</div>
                </section>

                <section className="reservar-detalle-right">
                    {isAdded ? (
                        <>
                            <div className="success-box">Artículo en el carrito!</div>
                            <div className="success-buttons-row">
                                <button className="success-btn" onClick={() => navigate("/reservar-equipo")}>
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
                                <h2>Producto</h2>
                                <p><strong>{nombreEquipo}</strong></p>
                                <p>{descripcion}</p>

                                <div className="quantity-container">
                                    <span className="quantity-label">Cantidad:</span>
                                    <button className="qty-btn" onClick={decreaseQty} disabled={quantity <= 1 || availableStock === 0}>-</button>
                                    <span className="qty-value">{quantity}</span>
                                    <button className="qty-btn" onClick={increaseQty} disabled={quantity >= availableStock || availableStock === 0}>+</button>
                                    <span className="stock-info" style={{color: availableStock === 0 ? "red" : "#666"}}>
                                        (Disp: {availableStock})
                                        {availableStock === 0 && " ¡AGOTADO!"}
                                    </span>
                                </div>

                                {/* Muestra las fechas seleccionadas */}
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

                                <button 
                                    className="reservar-detalle-btn" 
                                    onClick={handleAddToCart}
                                    disabled={availableStock === 0}
                                    style={{ opacity: availableStock === 0 ? 0.5 : 1 }}
                                >
                                    {availableStock === 0 ? "Agotado" : "Agregar a carrito »"}
                                </button>
                            </div>

                            <button className="reservar-detalle-btn-secondary" onClick={() => setTerminosOpen(true)}>
                                {termsAccepted ? "Ver términos y condiciones »" : "Leer términos y condiciones »"}
                            </button>

                            <button className="reservar-detalle-back" onClick={() => navigate("/reservar-equipo")}>
                                ← Volver a equipos
                            </button>
                        </>
                    )}
                </section>
            </main>

            <ReservaCalendarModal
                open={calendarOpen}
                onClose={() => setCalendarOpen(false)}
                onConfirm={handleConfirmDates} // Usamos la nueva función
            />

            <TerminosModal
                open={terminosOpen}
                onClose={() => setTerminosOpen(false)}
                onAccept={() => setTermsAccepted(true)}
            />
        </div>
    );
}