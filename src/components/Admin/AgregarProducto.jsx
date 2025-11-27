import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { API_URL } from "../../api/config.js";
import "../../AgregarProducto.css";
import placeholderImg from "../../assets/cam5.png";

export default function AgregarProductos() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteConfirm, setDeleteConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ================ 1️⃣ Cargar productos desde Mongo =================
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/equipment`);
      const data = await res.json();
      const normalized = data.map(item => ({ ...item, id: item._id }));
      setProducts(normalized);
    } catch (err) {
      console.error("Error fetchProducts:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product = null) => {
    setSelectedProduct(
      product || { _id: null, name: "", quantity: 1, desc: "", img: "" }
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

  // ================ 2️⃣ Guardar producto en backend =================
  const saveProduct = async () => {
    if (!selectedProduct.name.trim()) return alert("Nombre requerido");

    const payload = {
      name: selectedProduct.name,
      description: selectedProduct.desc,
      qtty: Number(selectedProduct.quantity),
      img: selectedProduct.img || ""
    };

    try {
      let res;
      if (selectedProduct._id) {
        res = await fetch(`${API_URL}/equipment/${selectedProduct._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_URL}/equipment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      await fetchProducts();
      closeModal();
    } catch (err) {
      console.error("Error saveProduct:", err);
    }
  };

  // ================ 3️⃣ Eliminar producto =================
  const deleteProduct = async () => {
    try {
      await fetch(`${API_URL}/equipment/${selectedProduct._id}`, {
        method: "DELETE"
      });

      await fetchProducts();
      setDeleteConfirm(false);
      closeModal();
    } catch (err) {
      console.error("Error deleteProduct:", err);
    }
  };

  // ================ Imagen (base64) =================
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
            <div key={p._id} className="agregar-card">
              <div className="agregar-img-box">
                <img src={p.img || placeholderImg} alt="Producto" />
              </div>
              <p className="agregar-name">{p.name}</p>

              <div className="card-buttons">
                <button className="edit-btn" onClick={() => openModal(p)}>Edit</button>
                <button className="delete-btn" onClick={() => { setSelectedProduct(p); setDeleteConfirm(true); }}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
          <div className="agregar-card new-card" onClick={() => openModal()}> + </div>
        </section>
      </main>

      <footer className="agregar-footer">
        <div className="footer-content">
          <span className="footer-back" onClick={() => navigate("/Admin")}>←</span>
          <div className="footer-text">Escuela de comunicación contacto:</div>
          <span className="footer-email">prestamocom@up.edu.mx</span>
        </div>
      </footer>

      {isModalOpen && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-left">
              <img src={selectedProduct.img || placeholderImg} className="modal-img" />
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            <div className="modal-right">
              <label>Nombre:</label>
              <input type="text" value={selectedProduct.name}
                onChange={(e) => handleInput("name", e.target.value)} />

              <label>Cantidad:</label>
              <input type="number" min="1" value={selectedProduct.quantity}
                onChange={(e) => handleInput("quantity", e.target.value)} />

              <label>Descripción:</label>
              <textarea value={selectedProduct.desc}
                onChange={(e) => handleInput("desc", e.target.value)} />

              <div className="modal-actions">
                <button className="save-btn" onClick={saveProduct}>Guardar ✓</button>
                <button className="cancel-btn" onClick={closeModal}>Cancelar ✕</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirm && (
        <div className="modal-overlay">
          <div className="confirm-box">
            <p>¿Eliminar {selectedProduct?.name}?</p>
            <div className="confirm-actions">
              <button className="yes-btn" onClick={deleteProduct}>Sí</button>
              <button className="no-btn" onClick={() => setDeleteConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
