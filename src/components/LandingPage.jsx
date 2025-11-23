// src/components/LandingPage.jsx
import "../LandingPage.css";
import { Link } from "react-router-dom";
import imgAudiovisual from "../assets/audiovisuales.jpg";

export default function LandingPage() {
  return (
    <div className="landing-root">
      <main className="landing-card">

        <section className="landing-buttons">

          {/* STUDENT LOGIN */}
          <Link to="/students">
            <button
              className="landing-btn"
              onClick={() => localStorage.setItem("role", "student")}
            >
              Login UP Students
            </button>
          </Link>

          {/* ADMIN LOGIN */}
          <Link to="/Admin">
            <button
              className="landing-btn"
              onClick={() => localStorage.setItem("role", "admin")}
            >
              Login Administrators
            </button>
          </Link>

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
