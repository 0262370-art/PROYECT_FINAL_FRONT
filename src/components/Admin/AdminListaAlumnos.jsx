import { useNavigate } from "react-router-dom";
import Header from "../Header"       // HEADER DORADO
import userIcon from "../../assets/user-icon.svg";
import "../../AdminListaAlumnos.css";

export default function AdminListaAlumnos() {
  const navigate = useNavigate();

  const students = [
    { id: 1, name: "Estudiante 1" },
    { id: 2, name: "Estudiante 2" },
    { id: 3, name: "Estudiante 3" },
    { id: 4, name: "Estudiante 4" },
  ];

  return (
    <div className="admin-students-page">

      {/* HEADER */}
      <Header />

      {/* BANNER DORADO */}
      <div className="admin-banner"></div>

      {/* CONTENIDO */}
      <div className="admin-students-container">

        <h2 className="admin-students-title">Lista de alumnos</h2>

        <div className="admin-students-list">
          {students.map((student) => (
            <div
              key={student.id}
              className="admin-student-row"
              onClick={() => navigate(`/admin/alumno/${student.id}`)}
            >
              <img src={userIcon} alt="user" className="admin-student-avatar" />
              <span className="admin-student-name">{student.name}</span>
            </div>
          ))}
        </div>

      </div>

      {/* FOOTER */}
        <footer className="admin-footer">

        <div className="admin-footer-left">

          {/* Flecha atrás */}
          <span
            className="admin-footer-back"
            onClick={() => navigate("/Admin")}
          >
            ←
          </span>

          {/* "Escudo" — puedes reemplazarlo luego */}
          <div className="admin-shield-placeholder">LOGO</div>

          <span className="admin-footer-text">
            Escuela de comunicación contacto:
          </span>
        </div>

        {/* Email */}
        <div className="admin-footer-right">
          <div className="admin-email-input">
            <span className="admin-email-icon">✉️</span>
            <input
              type="email"
              value="prestamocom@up.edu.mx"
              readOnly
            />
          </div>
        </div>

      </footer>


    </div>
  );
}
