import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminProfilePage.css";

// Avatar default (MISMO que estudiante)
import avatarPlaceholder from "../assets/user-icon.svg";

export default function AdminProfilePage() {
  const navigate = useNavigate();

  // Perfil admin
  const [name, setName] = useState("Administrador CM");
  const [avatar, setAvatar] = useState(avatarPlaceholder);

  // Modal editar
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempAvatar, setTempAvatar] = useState(avatar);

  // Mock data (luego lo conectas a backend)
  const stats = [
    { label: "Reservas activas", value: 23 },
    { label: "Peticiones por aprobar", value: 7 },
    { label: "Usuarios con advertencias", value: 4 },
    { label: "Equipos disponibles", value: 128 },
    { label: "Salones ocupados hoy", value: 3 },
    { label: "Salones libres", value: 12 },
  ];

  const quickActions = [
    { label: "Gestionar peticiones", path: "/admin-peticiones" },
    { label: "Inventario equipos", path: "/reservar-equipo" },
    { label: "Inventario salones", path: "/reservar-salones" },
    { label: "Perfiles estudiantes", path: "/students" },
    { label: "Historial préstamos", path: "/mis-reservas" },
    { label: "FAQs / Ayuda", path: "/faqs" },
  ];

  const activity = [
    "Aprobó petición #324 de Juan Pérez",
    "Registró advertencia para María López",
    "Editó inventario: Cámara Sony A7",
    "Rechazó petición #318 por falta de equipo",
  ];

  const warnings = [
    "Juan Pérez — 2 advertencias (no devolvió equipo a tiempo)",
    "María López — 1 advertencia (uso indebido de salón)",
  ];

  // Cargar foto nueva
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setTempAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  // Guardar cambios modal
  const handleSave = () => {
    setName(tempName.trim() || "Administrador CM");
    setAvatar(tempAvatar);
    setIsEditing(false);
  };

  return (
    <>
      {/* ===== HEADER DORADO SIMPLE ===== */}
      <header className="adminp-header" />

      {/* ===== CONTENIDO ===== */}
      <div className="adminp-root">
        {/* Columna izquierda: perfil + accesos */}
        <aside className="adminp-left">
          {/* Avatar */}
          <div className="adminp-avatar-wrap">
            <img src={avatar} alt="avatar admin" className="adminp-avatar" />
          </div>

          {/* Nombre */}
          <div className="adminp-name">{name}</div>

          {/* Editar perfil */}
          <button
            className="adminp-edit-btn"
            onClick={() => {
              setTempName(name);
              setTempAvatar(avatar);
              setIsEditing(true);
            }}
          >
            Editar perfil ✏️
          </button>

          {/* Accesos rápidos */}
          <div className="adminp-section">
            <h3 className="adminp-section-title">Accesos rápidos</h3>

            <div className="adminp-actions">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  className="adminp-action-card"
                  onClick={() => navigate(a.path)}
                >
                  {a.label} →
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Columna derecha: dashboard + actividad + advertencias */}
        <main className="adminp-right">
          {/* Dashboard */}
          <section className="adminp-card">
            <h2 className="adminp-card-title">Panel de control</h2>

            <div className="adminp-stats-grid">
              {stats.map((s) => (
                <div key={s.label} className="adminp-stat">
                  <div className="adminp-stat-value">{s.value}</div>
                  <div className="adminp-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Actividad reciente */}
          <section className="adminp-card">
            <h2 className="adminp-card-title">Actividad reciente</h2>
            <ul className="adminp-list">
              {activity.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Advertencias */}
          <section className="adminp-card">
            <h2 className="adminp-card-title">Advertencias / sanciones</h2>

            {warnings.length === 0 ? (
              <p className="adminp-muted">Sin advertencias registradas.</p>
            ) : (
              <ul className="adminp-list">
                {warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>

      {/* ===== FOOTER TINTO ===== */}
      <footer className="adminp-footer">
        <button
          className="adminp-footer-back"
          onClick={() => navigate("/Admin")}
          aria-label="Regresar"
        >
          ←
        </button>

        <button
          className="adminp-footer-logout"
          onClick={() => navigate("/")}
        >
          Cerrar sesión
        </button>
      </footer>

      {/* ===== MODAL EDITAR PERFIL ===== */}
      {isEditing && (
        <div className="adminp-modal-overlay" onClick={() => setIsEditing(false)}>
          <div
            className="adminp-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="adminp-modal-title">Editar perfil</h2>

            <label className="adminp-modal-label">Editar foto</label>
            <div className="adminp-modal-avatar-preview">
              <img src={tempAvatar} alt="preview" />
            </div>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />

            <label className="adminp-modal-label">Editar nombre</label>
            <input
              className="adminp-modal-input"
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Nombre del administrador"
            />

            <div className="adminp-modal-actions">
              <button className="adminp-modal-save" onClick={handleSave}>
                Guardar
              </button>
              <button
                className="adminp-modal-cancel"
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
