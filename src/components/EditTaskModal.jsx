import { useEffect, useRef, useState } from "react";
import Modal from "./Modal.jsx";

/* modale di modifica task basata sul componente modal riutilizzabile */
export default function EditTaskModal({ show, onClose, task, onSave }) {
  /* ref del form per triggerare requestsubmit dal bottone "salva" della modale */
  const editFormRef = useRef(null);

  /* stato controllato per i campi del form */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To do");

  useEffect(() => {
    /* precompilazione dei campi quando la modale viene aperta o cambia il task */
    if (show && task) {
      setTitle(task.title ?? "");
      setDescription(task.description ?? "");
      setStatus(task.status ?? "To do");
    }
  }, [show, task]);

  function handleSubmit(event) {
    /* prevenzione submit default */
    event.preventDefault();

    /* creazione oggetto aggiornato */
    const updatedTask = {
      id: task.id,
      title: title.trim(),
      description,
      status,
    };

    /* invio al chiamante */
    onSave(updatedTask);
  }

  return (
    <Modal
      title="modifica task"
      show={show}
      onClose={onClose}
      confirmText="salva"
      onConfirm={() => {
        /* trigger del submit del form tramite ref */
        if (editFormRef.current) editFormRef.current.requestSubmit();
      }}
      content={
        /* form interno alla modale */
        <form ref={editFormRef} onSubmit={handleSubmit}>
          {/* campo titolo controllato */}
          <label style={{ display: "block", fontWeight: 600 }}>nome</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          />

          {/* campo descrizione controllato */}
          <label
            style={{ display: "block", fontWeight: 600, marginTop: "12px" }}
          >
            descrizione
          </label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              resize: "vertical",
            }}
          />

          {/* campo status controllato */}
          <label
            style={{ display: "block", fontWeight: 600, marginTop: "12px" }}
          >
            stato
          </label>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "6px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          >
            <option value="To do">to do</option>
            <option value="Doing">doing</option>
            <option value="Done">done</option>
          </select>
        </form>
      }
    />
  );
}
