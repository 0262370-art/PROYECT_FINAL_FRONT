// src/components/LandingPage.jsx
import "../LandingPage.css";
import imgAudiovisual from "../assets/audiovisuales.jpg";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function LandingPage() {
  const [role, setRole] = useState(null); // "student" o "admin"
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!role) {
        alert("Primero selecciona si eres estudiante o administrador 🙂");
        return;
      }

      const id_token = credentialResponse.credential;

      const res = await axios.post("http://localhost/api/auth/google", {
        id_token,
      });

      // guarda cosas en localStorage para usarlas en el resto de la app
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", role);

      // redirige según el rol elegido
      if (role === "student") {
        navigate("/students");
      } else {
        navigate("/Admin");
      }
    } catch (err) {
      console.error("Error al iniciar sesión con Google / backend:", err);
      alert("Hubo un problema al iniciar sesión. Intenta de nuevo.");
    }
  };

  const handleGoogleError = () => {
    console.log("Error al iniciar sesión con Google");
    alert("Falló el inicio de sesión con Google.");
  };

  return (
    <div className="landing-root">
      <main className="landing-card">
        <section className="landing-buttons">
          {/* Selección de rol */}
          <button
            className={
              "landing-btn" + (role === "student" ? " landing-btn--active" : "")
            }
            onClick={() => setRole("student")}
          >
            Login UP Students
          </button>

          <button
            className={
              "landing-btn" + (role === "admin" ? " landing-btn--active" : "")
            }
            onClick={() => setRole("admin")}
          >
            Login Administrators
          </button>

          {/* Botón real de Google */}
          <div style={{ marginTop: "1.5rem" }}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          </div>
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
