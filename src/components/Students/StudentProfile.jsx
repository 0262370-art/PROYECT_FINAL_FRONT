// src/components/Students/StudentProfile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatarPlaceholder from "../../assets/user-icon.svg";
import "../../StudentProfile.css";

export default function StudentProfile() {
  const navigate = useNavigate();

  // nombre y avatar
  const [name, setName] = useState("Nombre del alumno");
  const [avatar, setAvatar] = useState(avatarPlaceholder);

  // reservas
  const [equipos, setEquipos] = useState([]);
  const [salones, setSalones] = useState([]);
  const [selectedSection, setSelectedSection] = useState("equipos"); // "equipos" | "salones"

  // modal editar perfil
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("Nombre del alumno");
  const [tempAvatar, setTempAvatar] = useState(avatarPlaceholder);

  useEffect(() => {
    // ---- 1) Cargar perfil de Google (userProfile o user) ----
    const rawProfile =
      localStorage.getItem("userProfile") || localStorage.getItem("user");
    console.log("StudentProfile -> valor crudo en localStorage:", rawProfile);

    if (rawProfile) {
      try {
        const profile = JSON.parse(rawProfile);
        const nombre = profile.name || "Nombre del alumno";
        const foto = profile.picture || avatarPlaceholder;

        setName(nombre);
        setAvatar(foto);
        setTempName(nombre);
        setTempAvatar(foto);
      } catch (err) {
        console.error("Error al parsear perfil:", err);
        setName("Nombre del alumno");
        setAvatar(avatarPlaceholder);
        setTempName("Nombre del alumno");
        setTempAvatar(avatarPlaceholder);
      }
    }

    // ---- 2) Cargar reservas ----
    const stored = JSON.parse(localStorage.getItem("reservas") || "[]");
    const eq = stored.filter((r) => r.tipo === "equipo");
    const sa = stored.filter((r) => r.tipo === "salon");

    setEquipos(eq);
    setSalones(sa);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setTempAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setName(tempName);
    setAvatar(tempAvatar);
    setIsEditing(false);
  };

  const currentList = selectedSection === "equipos" ? equipos : salones;

  return (
    <>
      {/* HEADER fijo dorado */}
      <header className="profile-header"></header>

      {/* CONTENIDO PRINCIPAL */}
      <div className="profile-root">
        {/* COLUMNA IZQUIERDA */}
        <div className="profile-left">
          <div className="profile-avatar-wrapper">
            <img src={avatar} alt="avatar" className="profile-avatar" />
          </div>

          <div className="profile-name">{name}</div>

          <button
            className="profile-edit-btn"
            onClick={() => setIsEditing(true)}
          >
            Editar perfil
          </button>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="profile-right">
          <div className="profile-card">
            <div className="profile-card-title">Mis Reservas</div>

            {/* Bloque Equipos */}
            <div
              className="profile-card-block"
              onClick={() => setSelectedSection("equipos")}
              style={{ cursor: "pointer" }}
            >
              <div className="profile-card-block-title">
                Equipos ({equipos.length})
              </div>
              <div className="profile-card-text">
                Haz clic para ver tus equipos reservados.
              </div>
            </div>

            {/* Bloque Salones */}
            <div
              className="profile-card-block"
              onClick={() => setSelectedSection("salones")}
              style={{ cursor: "pointer" }}
            >
              <div className="profile-card-block-title">
                Salones ({salones.length})
              </div>
              <div className="profile-card-text">
                Haz clic para ver tus salones reservados.
              </div>
            </div>

            {/* Bloque Advertencias */}
            <div className="profile-card-block">
              <div className="profile-card-block-title">Advertencias</div>
              <div className="profile-card-text">
                Tincidunt purus at amet, eu nisl urna at. Pellentesque diam
                dictum consectetur.
              </div>
            </div>

            {/* LISTA FILTRADA */}
            <div className="profile-reservas-list">
              <div className="profile-reservas-title">
                {selectedSection === "equipos"
                  ? "Equipos reservados"
                  : "Salones reservados"}
              </div>

              {currentList.length === 0 ? (
                <div className="profile-reservas-empty">
                  {selectedSection === "equipos"
                    ? "No tienes equipos reservados."
                    : "No tienes salones reservados."}
                </div>
              ) : (
                currentList.map((item, idx) => (
                  <div key={idx} className="profile-reservas-item">
                    <div>
                      <strong>{item.nombre}</strong>
                      {item.creadoEn && (
                        <div className="profile-reservas-date">
                          Añadido el{" "}
                          {new Date(item.creadoEn).toLocaleString("es-MX", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </div>
                      )}
                    </div>
                    <span className="profile-reservas-tag">
                      {selectedSection === "equipos" ? "Equipo" : "Salón"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER fijo tinto */}
      <footer className="profile-footer">
        <button className="footer-back" onClick={() => navigate("/students")}>
          ←
        </button>
        <button className="footer-logout" onClick={() => navigate("/")}>
          Cerrar sesión
        </button>
      </footer>

      {/* MODAL EDITAR PERFIL */}
      {isEditing && (
        <div className="profile-modal-overlay">
          <div className="profile-modal">
            <h2>Editar perfil</h2>

            <label className="modal-label">Cambiar foto</label>
            <img src={tempAvatar} className="modal-avatar-preview" />
            <input type="file" accept="image/*" onChange={handleAvatarChange} />

            <label className="modal-label">Cambiar nombre</label>
            <input
              className="modal-input"
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />

            <div className="modal-actions">
              <button className="modal-save" onClick={handleSave}>
                Guardar
              </button>
              <button
                className="modal-cancel"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
