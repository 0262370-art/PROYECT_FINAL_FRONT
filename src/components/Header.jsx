import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import "../StudentsPage.css"; // reutilizamos estilos del header

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="students-header">
      <button
        className="students-menu-btn"
        aria-label="Menú"
        onClick={toggleDrawer(true)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="students-search-wrapper">
        <span className="students-search-icon" aria-hidden>🔍</span>
        <input
          className="students-search-input"
          type="text"
          placeholder="Search..."
          aria-label="Buscar"
        />
      </div>

      <div className="students-avatar" aria-label="Perfil" />

      <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </header>
  );
}
