import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google"; // 👈 Hook oficial
import axios from "axios";

// Tus estilos e imágenes se quedan igual
import "../LandingPage.css";
import imgAudiovisual from "../assets/audiovisuales.jpg";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // --- LÓGICA DE LOGIN (NUEVA) ---
  const handleLoginSuccess = async (tokenResponse) => {
    setIsLoading(true);
    const roleTarget = localStorage.getItem("temp_role"); 

    try {
      // CAMBIO AQUÍ: Apuntamos al puerto 80
      const res = await axios.post("http://localhost:80/api/auth/google", {
        token: tokenResponse.access_token, 
      });

      // Guardamos sesión
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", roleTarget); 

      // Redireccionamos según el botón que apretó
      if (roleTarget === "student") {
        navigate("/students");
      } else {
        navigate("/Admin");
      }

    } catch (err) {
      console.error("Error login:", err);
      alert("No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  // Hook que abre la ventana de Google
  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: () => {
      console.log("Login fallido");
      setIsLoading(false);
    }
  });

  // Función intermedia para recordar qué botón se presionó
  const triggerLogin = (role) => {
    localStorage.setItem("temp_role", role);
    login();
  };
  // -------------------------------

  return (
    <div className="landing-root">
      <main className="landing-card">
        <section className="landing-buttons">
          
          {/* Botones conectados a la nueva función */}
          <button
            className="landing-btn"
            onClick={() => triggerLogin("student")}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Login UP Students"}
          </button>

          <button
            className="landing-btn"
            onClick={() => triggerLogin("admin")}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Login Administrators"}
          </button>

        </section>

        <figure className="landing-image-wrapper">
          <img
            src={imgAudiovisual}
            alt="Film camera"
            className="landing-image"
          />
        </figure>
      </main>
    </div>
  );
}