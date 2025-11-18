// src/components/StudentsPage.jsx
import { useState } from "react";
import "../AdminPage.css";

// MUI
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

// IMPORTA TUS IMÁGENES REALES AQUÍ
import heroImg from "../assets/bannergrande.png";        // banner grande
import cardEquip from "../assets/reservaequipo.png";     // reservar equipo
import cardSalon from "../assets/reservasalones.png";    // reservar salones
import cardMisRes from "../assets/misreservas.png";      // mis reservas
import cardFaq from "../assets/FAQS.png";                // FAQs

export default function AdminPage() {
  // estado para abrir/cerrar el drawer
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setMenuOpen(open);
  };

  // contenido del menú lateral
  const drawerContent = (
    <Box
      sx={{
        width: 220,                // ancho del contenedor
        bgcolor: "#e3dbcf",
        height: "100%",
        pt: 4
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Equipo" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Salones" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="admin-root">
      {/* HEADER */}
      <header className="admin-header">
        <button
          className="admin-menu-btn"
          aria-label="Menú"
          onClick={toggleDrawer(true)}   // 👈 abre el drawer
        >
          <span />
          <span />
          <span />
        </button>

        <div className="admin-search-wrapper">
          <input
            className="admin-search-input"
            type="text"
            placeholder="Search..."
          />
        </div>

        <div className="admin-avatar" aria-label="Perfil" />
      </header>





      {/* DRAWER DE MUI */}
      <Drawer
        anchor="left"          // 👉 si lo quieres del lado derecho, cambia a "right"
        open={menuOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerContent}
      </Drawer>

      {/* CONTENIDO PRINCIPAL */}
      <main className="admin-main">
        {/* Banner grande */}
        <section className="admin-hero">
          <img src={heroImg} alt="Estudiantes en laboratorio" />
        </section>

        {/* Tarjetas */}
        <section className="admin-cards">
          <article className="admin-card">
            <img src={cardEquip} alt="Cámara de video" />
            <div className="admin-card-footer">
              <button>Reservar peticiones »»</button>
            </div>
          </article>

          <article className="admin-card">
            <img src={cardSalon} alt="Set de grabación" />
            <div className="admin-card-footer">
              <button>Agregar productos »»</button>
            </div>
          </article>

          <article className="admin-card">
            <img src={cardMisRes} alt="Claqueta" />
            <div className="admin-card-footer">
              <button>Perfiles »»</button>
            </div>
          </article>

          <article className="admin-card">
            <img src={cardFaq} alt="Frequent Asked Questions" />
            <div className="admin-card-footer">
              <button>Agregar salones »»</button>
            </div>
          </article>
        </section>
      </main>




      {/* FOOTER */}
      <footer className="admin-footer">
        <div className="admin-footer-left">
          <div className="admin-shield-placeholder">LOGO</div>
          <div className="admin-footer-text">
            <span>Escuela de comunicación contacto:</span>
          </div>
        </div>

        <button className="admin-footer-email">
          prestamocom@up.edu.mx
        </button>
      </footer>
    </div>
  );
}
