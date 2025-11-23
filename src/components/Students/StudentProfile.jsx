import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatarPlaceholder from "../../assets/user-icon.svg"; 
import "../../StudentProfile.css";

export default function StudentProfile() {
  const navigate = useNavigate();

  const [name, setName] = useState("Nombre del alumno");
  const [avatar, setAvatar] = useState(avatarPlaceholder);

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempAvatar, setTempAvatar] = useState(avatar);

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

  return (
    <>
      {/* ---------------------- HEADER ---------------------- */}
      <header className="profile-header"></header>

      {/* ---------------------- CONTENIDO ---------------------- */}
      <div className="profile-root">
        
        {/* ----------------- COLUMNA IZQUIERDA ----------------- */}
        <div className="profile-left">

          <div className="profile-avatar-wrapper">
            <img src={avatar} alt="avatar" className="profile-avatar" />
          </div>

          <div className="profile-name">{name}</div>

          <button className="profile-edit-btn" onClick={() => setIsEditing(true)}>
            Editar perfil ✏️
          </button>

        </div>

        {/* ----------------- COLUMNA DERECHA ----------------- */}
        <div className="profile-right">
          <div className="profile-card">
            <div className="profile-card-title">Mis Reservas</div>

            <div className="profile-card-block">
              <div className="profile-card-block-title">Equipos</div>
              <div className="profile-card-text">Especificaciones generales</div>
            </div>

            <div className="profile-card-block">
              <div className="profile-card-block-title">Salones</div>
              <div className="profile-card-text">Información general</div>
            </div>

            <div className="profile-card-block">
              <div className="profile-card-block-title">Advertencias</div>
              <div className="profile-card-text">
                Tincidunt purus at amet, eu nisl urna at. Pellentesque diam dictum consectetur.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------- FOOTER ---------------------- */}
      <footer className="profile-footer">

        {/* Flecha a /students */}
        <button className="footer-back" onClick={() => navigate("/students")}>
          ←
        </button>

        {/* Botón cerrar sesión → landing page */}
        <button className="footer-logout" onClick={() => navigate("/")}>
          Cerrar sesión
        </button>

      </footer>

      {/* ---------------------- MODAL EDITAR PERFIL ---------------------- */}
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

              <button className="modal-cancel" onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
