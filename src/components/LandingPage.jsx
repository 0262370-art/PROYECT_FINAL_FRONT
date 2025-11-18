// src/components/LandingPage.jsx
import "../LandingPage.css";
import { Link } from "react-router-dom";
import imgAudiovisual from "../assets/audiovisuales.jpg";

export default function LandingPage() {
  return (
    <div className="landing-root">
      <main className="landing-card">
        <section className="landing-buttons">
          <Link to="/students">
            <button className="landing-btn">Login UP Students</button>
          </Link>

          <Link to="/Admin">
            <button className="landing-btn">Login Administrators</button>
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