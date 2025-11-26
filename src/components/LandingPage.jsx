// src/components/LandingPage.jsx
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

import "../LandingPage.css";
import imgAudiovisual from "../assets/audiovisuales.jpg";

export default function LandingPage() {
  const [role, setRole] = useState(null); // "student" o "admin"
  const [isLoading, setIsLoading] = useState(false); // 🔹 estado de loading
  const navigate = useNavigate();

  const googleBtnRef = useRef(null);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!role) {
        alert("Primero selecciona si eres estudiante o administrador");
        setIsLoading(false);
        return;
      }

      const id_token = credentialResponse.credential;

      const res = await axios.post("http://localhost/api/auth/google", {
        id_token,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", role);

      if (role === "student") {
        navigate("/students");
      } else {
        navigate("/Admin");
      }
    } catch (err) {
      console.error(
        "Error al iniciar sesión con Google / backend:",
        err.response?.data || err.message
      );
      alert("Hubo un problema al iniciar sesión. Intenta de nuevo.");
      setIsLoading(false); // 🔹 salimos de loading si algo falla
    }
  };

  const handleGoogleError = () => {
    console.log("Error al iniciar sesión con Google");
    alert("Falló el inicio de sesión con Google.");
    setIsLoading(false); // 🔹 si el usuario cancela el popup, etc.
  };

  const triggerGoogleLogin = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("role", selectedRole);
    setIsLoading(true); // 🔹 empezamos loading

    const wrapper = googleBtnRef.current;
    if (!wrapper) {
      console.error("No se encontró el contenedor del botón de Google");
      setIsLoading(false);
      return;
    }

    const googleRealButton = wrapper.querySelector('div[role="button"]');
    if (googleRealButton) {
      googleRealButton.click();
    } else {
      console.error("No se encontró el botón interno de Google");
      setIsLoading(false);
    }
  };

  return (
    <div className="landing-root">
      <main className="landing-card">
        <section className="landing-buttons">
          {/* BOTÓN STUDENT */}
          <button
            className="landing-btn"
            onClick={() => triggerGoogleLogin("student")}
            disabled={isLoading}          // 🔹 deshabilitado mientras carga
          >
            {isLoading && role === "student"
              ? "Iniciando sesión..."
              : "Login UP Students"}
          </button>

          {/* BOTÓN ADMIN */}
          <button
            className="landing-btn"
            onClick={() => triggerGoogleLogin("admin")}
            disabled={isLoading}          // 🔹 deshabilitado mientras carga
          >
            {isLoading && role === "admin"
              ? "Iniciando sesión..."
              : "Login Administrators"}
          </button>

          {/* Mensaje general de loading */}
          {isLoading && (
            <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
              Iniciando sesión con Google, espera un momento…
            </p>
          )}

          {/* Botón real de Google (oculto) */}
          <div
            ref={googleBtnRef}
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
            }}
          >
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
