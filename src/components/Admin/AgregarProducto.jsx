// src/components/Admin/AgregarProductos.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../AgregarProducto.css";
import placeholderImg from "../../assets/cam5.png";

export default function AgregarProductos() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([
    { id: 1, name: "Cámara 1", quantity: 2, desc: "Full HD", img: "" },
    { id: 2, name: "Cámara 2", quantity: 3, desc: "4K UHD", img: "" },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteConfirm, setDeleteConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product = null) => {
    setSelectedProduct(
      product || { id: null, name: "", quantity: 1, desc: "", img: "" }
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInput = (field, value) => {
    setSelectedProduct({ ...selectedProduct, [field]: value });
  };

  const saveProduct = () => {
    if (!selectedProduct.name.trim()) {
      alert("El producto necesita un nombre");
      return;
    }

    if (selectedProduct.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { ...selectedProduct, id: Date.now() },
      ]);
    }

    closeModal();
  };

  const deleteProduct = () => {
    setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
    setDeleteConfirm(false);
    closeModal();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedProduct({ ...selectedProduct, img: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="agregar-root">
      <Header />

      <main className="agregar-main">
        <section className="agregar-grid">
          {products.map((p) => (
            <div key={p.id} className="agregar-card">
              <div className="agregar-img-box">
                <img src={p.img || placeholderImg} alt="Producto" />
              </div>

              <p className="agregar-name">{p.name}</p>

              <div className="card-buttons">
                <button className="edit-btn" onClick={() => openModal(p)}>
                  Editar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    setSelectedProduct(p);
                    setDeleteConfirm(true);
                  }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          {/* AGREGAR NUEVO */}
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

      {/* MODAL EDITAR/AGREGAR */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-left">
              <img
                src={selectedProduct.img || placeholderImg}
                alt="preview"
                className="modal-img"
              />
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="modal-right">
              <label>Nombre:</label>
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) => handleInput("name", e.target.value)}
              />

              <label>Cantidad:</label>
              <input
                type="number"
                min="1"
                value={selectedProduct.quantity}
                onChange={(e) => handleInput("quantity", e.target.value)}
              />

              <label>Descripción:</label>
              <textarea
                value={selectedProduct.desc}
                onChange={(e) => handleInput("desc", e.target.value)}
              />

              <div className="modal-actions">
                <button className="save-btn" onClick={saveProduct}>
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
            <p>¿Eliminar {selectedProduct?.name}?</p>
            <div className="confirm-actions">
              <button className="yes-btn" onClick={deleteProduct}>
                Sí
              </button>
              <button className="no-btn" onClick={() => setDeleteConfirm(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
