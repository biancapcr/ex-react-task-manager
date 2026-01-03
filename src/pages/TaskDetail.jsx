import { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext.jsx";
import Modal from "../components/Modal.jsx";
import EditTaskModal from "../components/EditTaskModal.jsx";

export default function TaskDetail() {
  /* lettura dell'id dalla rotta dinamica */
  const { id } = useParams();

  /* navigazione programmatica dopo eliminazione */
  const navigate = useNavigate();

  /* lettura lista task e funzioni dal contesto globale */
  const { tasks, removeTask, updateTask } = useContext(GlobalContext);

  /* stato per mostrare o nascondere la modale di eliminazione */
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /* stato per mostrare o nascondere la modale di modifica */
  const [showEditModal, setShowEditModal] = useState(false);

  /* ricerca del task corrispondente all'id */
  const task = useMemo(() => {
    return tasks.find((t) => String(t.id) === String(id));
  }, [tasks, id]);

  async function handleConfirmDelete() {
    try {
      await removeTask(id);
      setShowDeleteModal(false);
      alert("task eliminata con successo.");
      navigate("/");
    } catch (error) {
      setShowDeleteModal(false);
      alert(error.message);
    }
  }

  async function handleSave(updatedTask) {
    try {
      /* esecuzione update tramite api */
      await updateTask(updatedTask);

      /* conferma modifica */
      alert("task modificata con successo.");

      /* chiusura modale */
      setShowEditModal(false);
    } catch (error) {
      /* gestione errore con messaggio ricevuto */
      alert(error.message);
    }
  }

  if (!task) {
    return (
      <section>
        {/* gestione caso task non trovato */}
        <h1 style={{ margin: 0 }}>dettaglio task</h1>
        <p style={{ marginTop: "8px" }}>task non trovato.</p>
      </section>
    );
  }

  return (
    <section>
      {/* titolo pagina */}
      <h1 style={{ margin: 0 }}>dettaglio task</h1>

      {/* dettagli task */}
      <div style={{ marginTop: "12px", maxWidth: "700px" }}>
        <p>
          <strong>nome:</strong> {task.title}
        </p>

        <p>
          <strong>descrizione:</strong> {task.description}
        </p>

        <p>
          <strong>stato:</strong> {task.status}
        </p>

        <p>
          <strong>data di creazione:</strong> {task.createdAt}
        </p>

        {/* azioni dettaglio */}
        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          {/* bottone modifica che apre la modale */}
          <button
            type="button"
            onClick={() => setShowEditModal(true)}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              background: "white",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            modifica task
          </button>

          {/* bottone elimina che apre la modale */}
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            style={{
              padding: "10px 14px",
              borderRadius: "10px",
              border: "0",
              cursor: "pointer",
              background: "red",
              color: "white",
              fontWeight: 700,
            }}
          >
            elimina task
          </button>
        </div>
      </div>

      {/* modale di conferma eliminazione */}
      <Modal
        title="conferma eliminazione"
        content={
          <p style={{ margin: 0 }}>eliminare definitivamente questa task?</p>
        }
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        confirmText="conferma"
      />

      {/* modale di modifica task */}
      <EditTaskModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={task}
        onSave={handleSave}
      />
    </section>
  );
}
