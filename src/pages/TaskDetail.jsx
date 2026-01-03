import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext.jsx";

export default function TaskDetail() {
  /* lettura dell'id dalla rotta dinamica */
  const { id } = useParams();

  /* lettura lista task dal contesto globale */
  const { tasks } = useContext(GlobalContext);

  /* ricerca del task corrispondente all'id */
  const task = useMemo(() => {
    return tasks.find((t) => String(t.id) === String(id));
  }, [tasks, id]);

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

        {/* bottone elimina (placeholder per milestone successive) */}
        <button
          type="button"
          onClick={() => {
            console.log("elimino task");
          }}
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
    </section>
  );
}
