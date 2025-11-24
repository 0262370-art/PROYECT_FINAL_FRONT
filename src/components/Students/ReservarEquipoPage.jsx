// src/components/ReservarEquipoPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../StudentsPage.css"; // reutiliza estilos de layout/header
import "../../ReservarEquipoPage.css";
import cam1 from "../../assets/cam1.png";
import cam2 from "../../assets/cam2.png";
import cam3 from "../../assets/cam3.png";
import cam4 from "../../assets/cam4.png";
import cam5 from "../../assets/cam5.png";
import cam6 from "../../assets/cam6.png";

export default function ReservarEquipoPage() {
	const navigate = useNavigate();
	const items = [cam1, cam2, cam3, cam4, cam5, cam6];

	return (
		<div className="students-root">
			<Header />

			<main className="students-main">
				<section className="reservar-gallery">
					{items.map((src, idx) => (
						<article className="reservar-card" key={idx}>
							<div className="reservar-card-box">
								<img src={src} alt={`Cam ${idx + 1}`} className="reservar-card-img" />
							</div>

							<div className="reservar-label">Cámara {idx + 1}</div>
						</article>
					))}
				</section>
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

