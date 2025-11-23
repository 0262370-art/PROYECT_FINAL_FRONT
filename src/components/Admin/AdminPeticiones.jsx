import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../AdminPeticiones.css";
import Header from "../Header";

// IMPORTA TODAS LAS IMÁGENES CORRECTAMENTE

import userIcon from "../../assets/user-icon.svg";

export default function AdminPeticiones() {
  const navigate = useNavigate();
  const petitions = [1, 2, 3, 4, 5, 6];

  // Estado Accept/Deny
  const [status, setStatus] = useState({});

  const handleAccept = (id) => {
    setStatus((prev) => ({ ...prev, [id]: "accepted" }));
  };

  const handleDeny = (id) => {
    setStatus((prev) => ({ ...prev, [id]: "denied" }));
  };

  return (
    <div className="page-container">
      <Header />
 

      {/* ------------ CONTENIDO ------------ */}
      <main className="content-area">
        <div className="wrapper">

          {petitions.map((id) => (
            <div key={id} className="petition-row">

              {/* Avatar */}
              <div className="petition-avatar">
                <img src={userIcon} className="petition-avatar-img" alt="user" />
              </div>

              {/* Tarjeta */}
              <div
                className="petition-box"
                onClick={() => navigate(`/admin/petition/${id}`)}
              >
                <span>Petition {id}</span>
                <span className="arrow">›</span>
              </div>

              {/* Botones dinámicos */}
              <div className="petition-actions">

                {status[id] === undefined && (
                  <>
                    <button className="btn accept" onClick={() => handleAccept(id)}>
                      Accept
                    </button>

                    <button className="btn deny" onClick={() => handleDeny(id)}>
                      Deny
                    </button>
                  </>
                )}

                {status[id] === "accepted" && (
                  <button className="btn accept active">
                    Accepted
                  </button>
                )}

                {status[id] === "denied" && (
                  <button className="btn deny active">
                    Denied
                  </button>
                )}

              </div>
            </div>
          ))}

        </div>
      </main>

      {/* ------------ FOOTER ------------ */}
      <footer className="admin-footer">

        <div className="admin-footer-left">

          {/* Flecha atrás */}
          <span
            className="admin-footer-back"
            onClick={() => navigate("/Admin")}
          >
            ←
          </span>

          {/* "Escudo" — puedes reemplazarlo luego */}
          <div className="admin-shield-placeholder">LOGO</div>

          <span className="admin-footer-text">
            Escuela de comunicación contacto:
          </span>
        </div>

        {/* Email */}
        <div className="admin-footer-right">
          <div className="admin-email-input">
            <span className="admin-email-icon">✉️</span>
            <input
              type="email"
              value="prestamocom@up.edu.mx"
              readOnly
            />
          </div>
        </div>

      </footer>

    </div>
  );
}
