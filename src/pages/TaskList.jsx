import { useContext, useMemo, useState } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import TaskRow from "../components/TaskRow.jsx";

export default function TaskList() {
  /* lettura della lista task dallo stato globale */
  const { tasks } = useContext(GlobalContext);

  /* stato criterio ordinamento */
  const [sortBy, setSortBy] = useState("createdAt");

  /* stato direzione ordinamento: 1 crescente, -1 decrescente */
  const [sortOrder, setSortOrder] = useState(1);

  function handleSort(column) {
    /* se la colonna è già selezionata, invertire il verso */
    if (sortBy === column) {
      setSortOrder((prev) => prev * -1);
      return;
    }

    /* se la colonna cambia, impostare nuovo criterio e verso crescente */
    setSortBy(column);
    setSortOrder(1);
  }

  const sortedTasks = useMemo(() => {
    /* copia dell'array per evitare mutazioni dello stato */
    const copy = [...tasks];

    /* mappa per l'ordinamento custom dello status */
    const statusRank = {
      "To do": 0,
      Doing: 1,
      Done: 2,
    };

    copy.sort((a, b) => {
      /* ordinamento alfabetico per title */
      if (sortBy === "title") {
        const result = String(a.title).localeCompare(String(b.title));
        return result * sortOrder;
      }

      /* ordinamento per status secondo ordine predefinito */
      if (sortBy === "status") {
        const aRank = statusRank[a.status] ?? 999;
        const bRank = statusRank[b.status] ?? 999;
        const result = aRank - bRank;
        return result * sortOrder;
      }

      /* ordinamento per createdat tramite confronto numerico */
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      const result = aTime - bTime;
      return result * sortOrder;
    });

    return copy;
  }, [tasks, sortBy, sortOrder]);

  function getHeaderLabel(column, label) {
    /* aggiunta indicatore visivo per colonna attiva e verso */
    if (sortBy !== column) return label;
    return `${label} ${sortOrder === 1 ? "▲" : "▼"}`;
  }

  return (
    <section>
      {/* titolo della pagina */}
      <h1 style={{ margin: 0 }}>lista dei task</h1>

      {/* tabella task */}
      <div style={{ marginTop: "12px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {/* intestazione cliccabile: title */}
              <th
                onClick={() => handleSort("title")}
                style={{
                  textAlign: "left",
                  padding: "10px",
                  borderBottom: "2px solid #111827",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {getHeaderLabel("title", "nome")}
              </th>

              {/* intestazione cliccabile: status */}
              <th
                onClick={() => handleSort("status")}
                style={{
                  textAlign: "left",
                  padding: "10px",
                  borderBottom: "2px solid #111827",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {getHeaderLabel("status", "stato")}
              </th>

              {/* intestazione cliccabile: createdat */}
              <th
                onClick={() => handleSort("createdAt")}
                style={{
                  textAlign: "left",
                  padding: "10px",
                  borderBottom: "2px solid #111827",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {getHeaderLabel("createdAt", "data di creazione")}
              </th>
            </tr>
          </thead>

          <tbody>
            {/* gestione caso lista vuota */}
            {sortedTasks.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: "10px" }}>
                  nessun task disponibile.
                </td>
              </tr>
            ) : (
              /* rendering righe tramite componente dedicato */
              sortedTasks.map((task) => (
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
