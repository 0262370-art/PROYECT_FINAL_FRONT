// src/components/Admin/AgregarSalones.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../AgregarSalones.css";
import placeholderImg from "../../assets/salon1.jpg";

export default function AgregarSalones() {
  const navigate = useNavigate();

  const [salones, setSalones] = useState([
    { id: 1, name: "FORO", desc: "Espacio de grabación profesional", img: "" },
    { id: 2, name: "CABINA DE AUDIO", desc: "Aislada, ideal para podcast", img: "" },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteConfirm, setDeleteConfirm] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState(null);

  const openModal = (salon = null) => {
    setSelectedSalon(
      salon || { id: null, name: "", desc: "", img: "" }
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSalon(null);
  };

  const handleInput = (field, value) => {
    setSelectedSalon({ ...selectedSalon, [field]: value });
  };

  const saveSalon = () => {
    if (!selectedSalon.name.trim()) {
      alert("El salón necesita nombre");
      return;
    }

    if (selectedSalon.id) {
      setSalones((prev) =>
        prev.map((s) => (s.id === selectedSalon.id ? selectedSalon : s))
      );
    } else {
      setSalones((prev) => [
        ...prev,
        { ...selectedSalon, id: Date.now() },
      ]);
    }

    closeModal();
  };

  const deleteSalon = () => {
    setSalones((prev) => prev.filter((s) => s.id !== selectedSalon.id));
    setDeleteConfirm(false);
    closeModal();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedSalon({ ...selectedSalon, img: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="agregar-root">
      <Header />

      <main className="agregar-main">
        <section className="agregar-grid">
          {salones.map((s) => (
            <div key={s.id} className="agregar-card">
              <div className="agregar-img-box">
                <img src={s.img || placeholderImg} alt="Salón" />
              </div>

              <p className="agregar-name">{s.name}</p>

              <div className="card-buttons">
                <button className="edit-btn" onClick={() => openModal(s)}>
                  Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    setSelectedSalon(s);
                    setDeleteConfirm(true);
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          {/* NUEVO SALÓN */}
          <div className="agregar-card new-card" onClick={() => openModal()}>
            +
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="agregar-footer">
        <div className="footer-content">
          <span className="footer-back" onClick={() => navigate("/Admin")}>
            ←
          </span>
          <div className="footer-text">Escuela de comunicación contacto:</div>
          <span className="footer-email">prestamocom@up.edu.mx</span>
        </div>
      </footer>

      {/* MODAL SALÓN */}
      {isModalOpen && selectedSalon && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-left">
              <img
                src={selectedSalon.img || placeholderImg}
                alt="preview"
                className="modal-img"
              />
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="modal-right">
              <label>Nombre:</label>
              <input
                type="text"
                value={selectedSalon.name}
                onChange={(e) => handleInput("name", e.target.value)}
              />

              <label>Descripción:</label>
              <textarea
                value={selectedSalon.desc}
                onChange={(e) => handleInput("desc", e.target.value)}
              />

              <div className="modal-actions">
                <button className="save-btn" onClick={saveSalon}>
                  Guardar ✓
                </button>
                <button className="cancel-btn" onClick={closeModal}>
                  Cancelar ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMAR ELIMINACIÓN */}
      {isDeleteConfirm && (
        <div className="modal-overlay">
          <div className="confirm-box">
            <p>¿Eliminar {selectedSalon?.name}?</p>
            <div className="confirm-actions">
              <button className="yes-btn" onClick={deleteSalon}>
                Sí
              </button>
              <button
                className="no-btn"
                onClick={() => setDeleteConfirm(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
