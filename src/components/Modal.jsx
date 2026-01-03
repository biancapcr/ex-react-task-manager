import ReactDOM from "react-dom";

/* componente modale riutilizzabile renderizzato tramite portal */
export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "conferma",
}) {
  /* blocco rendering se la modale non deve essere mostrata */
  if (!show) return null;

  /* selezione del nodo dedicato alla portal */
  const modalRoot = document.getElementById("modal-root");

  /* fallback di sicurezza nel caso il nodo non esista */
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    /* overlay semi-trasparente */
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      {/* contenitore modale */}
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "white",
          borderRadius: "14px",
          padding: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
        onClick={(event) => {
          /* prevenzione chiusura cliccando dentro la modale */
          event.stopPropagation();
        }}
      >
        {/* titolo modale */}
        <h2 style={{ margin: 0 }}>{title}</h2>

        {/* contenuto principale */}
        <div style={{ marginTop: "10px" }}>{content}</div>

        {/* azioni */}
        <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
          {/* bottone annulla */}
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              background: "white",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            annulla
          </button>

          {/* bottone conferma */}
          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: 0,
              background: "#111827",
              color: "white",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
