import { NavLink } from "react-router-dom";

export default function Navbar() {
  /* stile applicato ai link in base allo stato attivo */
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    fontWeight: 600,
    background: isActive ? "#63666cff" : "transparent",
    color: isActive ? "#ffffff" : "#111827",
  });

  return (
    /* intestazione dell'applicazione */
    <header style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
      {/* navigazione principale tra le pagine */}
      <nav style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* link alla pagina della lista dei task */}
        <NavLink to="/" style={linkStyle} end>
          lista task
        </NavLink>

        {/* link alla pagina di aggiunta di un task */}
        <NavLink to="/add" style={linkStyle}>
          aggiungi task
        </NavLink>
      </nav>
    </header>
  );
}
