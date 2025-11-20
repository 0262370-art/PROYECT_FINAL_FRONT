// src/components/Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "../StudentsPage.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setMenuOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{
        width: 220,
        bgcolor: "#e3dbcf",
        height: "100%",
        pt: 4,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/reservar-equipo")}>
            <ListItemText primary="Equipo" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/reservar-salones")}>
            <ListItemText primary="Salones" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <header className="students-header">
      {/* HAMBURGUESA */}
      <button
        className="students-menu-btn"
        aria-label="Menú"
        onClick={toggleDrawer(true)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* BUSCADOR */}
      <div className="students-search-wrapper">
        <span className="students-search-icon">🔍</span>
        <input
          className="students-search-input"
          type="text"
          placeholder="Search..."
        />
      </div>

      {/* AVATAR ORIGINAL (FUNCIONA) */}
      <button
        className="students-avatar-btn"
        onClick={() => navigate("/perfil")}
      >
        <div className="students-avatar" />
      </button>

      <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </header>
  );
}
