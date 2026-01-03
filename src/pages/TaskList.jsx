import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import TaskRow from "../components/TaskRow.jsx";

export default function TaskList() {
  /* lettura della lista task dallo stato globale */
  const { tasks } = useContext(GlobalContext);

  return (
    <section>
      {/* titolo della pagina */}
      <h1 style={{ margin: 0 }}>lista dei task</h1>

      {/* tabella task */}
      <div style={{ marginTop: "12px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {/* intestazione colonna titolo */}
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  borderBottom: "2px solid #111827",
                }}
              >
                nome
              </th>

              {/* intestazione colonna status */}
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  borderBottom: "2px solid #111827",
                }}
              >
                stato
              </th>

              {/* intestazione colonna data creazione */}
              <th
                style={{
                  textAlign: "left",
                  padding: "10px",
                  borderBottom: "2px solid #111827",
                }}
              >
                data di creazione
              </th>
            </tr>
          </thead>

          <tbody>
            {/* gestione caso lista vuota */}
            {tasks.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: "10px" }}>
                  nessun task disponibile.
                </td>
              </tr>
            ) : (
              /* rendering righe tramite componente dedicato */
              tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  status={task.status}
                  createdAt={task.createdAt}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
