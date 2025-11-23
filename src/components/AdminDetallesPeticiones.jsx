import { useNavigate, useParams } from "react-router-dom";
import "../AdminPeticionesDetalles.css";
import logoUP from "../assets/logoUP.png";
import userIcon from "../assets/user-icon.svg";
import cam5 from "../assets/cam5.png";


export default function AdminPeticionesDetalles() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="details-page-root">

      {/* ---------------- HEADER ---------------- */}
      <header className="details-header">
        <img src={logoUP} className="details-logo" />

        <input
          type="text"
          placeholder="Search..."
          className="details-search"
        />

        <div
          className="details-profile-icon-wrapper"
          onClick={() => navigate("/admin-perfil")}
        >
          <img src={userIcon} className="details-profile-icon" />
        </div>
      </header>

      {/* ---------------- CONTENIDO ---------------- */}
      <main className="details-main">
        <h1 className="details-title">Detalles De La Petición</h1>

        <div className="details-content-wrapper">

          {/* Imagen */}
          <div className="details-left">
            <img
              src={cam5}
              alt="preview"
              className="details-image"
            />
          </div>

          {/* Información */}
          <div className="details-right">
            <p><strong>Producto Solicitado:</strong> Cámara Sony A7S</p>
            <p><strong>Solicitado Por:</strong> Estudiante {id}</p>
            <p><strong>Fechas:</strong> 10 - 12 Febrero</p>
            <p><strong>Motivo:</strong> Grabación para proyecto final</p>
          </div>

        </div>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="details-footer">

        <div className="footer-left">
          <span
            className="footer-back"
            onClick={() => navigate("/admin-peticiones")}
          >
            ←
          </span>

          <img
            src={logoUP}
            className="footer-shield"
          />

          <span className="footer-text">
            Escuela de Comunicación — contacto:
          </span>
        </div>

        <div className="footer-right">
          <div className="footer-email">
            <span>✉️</span>
            <input
              type="email"
              readOnly
              value="prestamocm@up.edu.mx"
            />
          </div>
        </div>

      </footer>
    </div>
  );
}
