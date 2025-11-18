// src/components/StudentsPage.jsx
import { useState } from "react";
import "../StudentsPage.css";

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

export default function StudentsPage() {
  // estado para abrir/cerrar el drawer
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setMenuOpen(open);
  };

  // esta constante es para dirigirte a otra pagina al momento de darle click en reservar
  const handleNavigate = (path) => () => {
    window.location.href = path;
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
    <div className="students-root">
      {/* HEADER */}
      <header className="students-header">
        <button
          className="students-menu-btn"
          aria-label="Menú"
          onClick={toggleDrawer(true)}   // 👈 abre el drawer
        >
          <span />
          <span />
          <span />
        </button>

        <div className="students-search-wrapper">
          <input
            className="students-search-input"
            type="text"
            placeholder="Search..."
          />
        </div>

        <div className="students-avatar" aria-label="Perfil" />
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
      <main className="students-main">
        {/* Banner grande */}
        <section className="students-hero">
          <img src={heroImg} alt="Estudiantes en laboratorio" />
        </section>

        {/* Tarjetas */}
        <section className="students-cards">
          <article className="students-card">
            <img src={cardEquip} alt="Cámara de video" />
            <div className="students-card-footer">
              {/*este boton al darle click te va a llevar a la pagina de reservar equipo*/}
              <button onClick={handleNavigate("/reservar-equipo")}> 
              Reservar equipo »»
              </button>
            </div>
          </article>

          <article className="students-card">
            <img src={cardSalon} alt="Set de grabación" />
            <div className="students-card-footer">
              <button>Reservar salones »»</button>
            </div>
          </article>

          <article className="students-card">
            <img src={cardMisRes} alt="Claqueta" />
            <div className="students-card-footer">
              <button>Mis reservas »»</button>
            </div>
          </article>

          <article className="students-card">
            <img src={cardFaq} alt="Frequent Asked Questions" />
            <div className="students-card-footer">
              <button>FAQ’s »»</button>
            </div>
          </article>
        </section>
      </main>




      {/* FOOTER */}
      <footer className="students-footer">
        <div className="students-footer-left">
          <div className="students-shield-placeholder">LOGO</div>
          <div className="students-footer-text">
            <span>Escuela de comunicación contacto:</span>
          </div>
        </div>

        <button className="students-footer-email">
          prestamocom@up.edu.mx
        </button>
      </footer>
    </div>
  );
}
