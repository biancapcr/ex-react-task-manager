import { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext.jsx";
import Modal from "../components/Modal.jsx";

export default function TaskDetail() {
  /* lettura dell'id dalla rotta dinamica */
  const { id } = useParams();

  /* navigazione programmatica dopo eliminazione */
  const navigate = useNavigate();

  /* lettura lista task e funzione remove dal contesto globale */
  const { tasks, removeTask } = useContext(GlobalContext);

  /* stato per mostrare o nascondere la modale */
  const [showModal, setShowModal] = useState(false);

  /* ricerca del task corrispondente all'id */
  const task = useMemo(() => {
    return tasks.find((t) => String(t.id) === String(id));
  }, [tasks, id]);

  async function handleConfirmDelete() {
    try {
      /* esecuzione eliminazione tramite funzione del custom hook */
      await removeTask(id);

      /* chiusura modale dopo successo */
      setShowModal(false);

      /* conferma eliminazione */
      alert("task eliminata con successo.");

      /* reindirizzamento alla lista task */
      navigate("/");
    } catch (error) {
      /* chiusura modale e gestione errore con messaggio ricevuto */
      setShowModal(false);
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

      {/* dettagli richiesti */}
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

        {/* bottone elimina che apre la modale */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          style={{
            marginTop: "12px",
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

      {/* modale di conferma eliminazione */}
      <Modal
        title="conferma eliminazione"
        content={
          <p style={{ margin: 0 }}>eliminare definitivamente questa task?</p>
        }
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        confirmText="conferma"
      />
    </section>
  );
}
