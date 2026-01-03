import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import TaskRow from "../components/TaskRow.jsx";

export default function TaskList() {
  /* lettura della lista task dallo stato globale */
  const { tasks } = useContext(GlobalContext);

  /* stato criterio ordinamento */
  const [sortBy, setSortBy] = useState("createdAt");

  /* stato direzione ordinamento: 1 crescente, -1 decrescente */
  const [sortOrder, setSortOrder] = useState(1);

  /* stato query di ricerca usato per filtrare */
  const [searchQuery, setSearchQuery] = useState("");

  /* ref per gestire il timeout del debounce */
  const debounceRef = useRef(null);

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

  const debouncedSearch = useCallback((value) => {
    /* annullamento del timeout precedente se presente */
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    /* ritardo aggiornamento dello stato per ridurre i ricalcoli */
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  }, []);

  const visibleTasks = useMemo(() => {
    /* normalizzazione query per ricerca case insensitive */
    const q = searchQuery.trim().toLowerCase();

    /* filtraggio per titolo, case insensitive */
    const filtered =
      q.length === 0
        ? [...tasks]
        : tasks.filter((t) => String(t.title).toLowerCase().includes(q));

    /* mappa per l'ordinamento custom dello status */
    const statusRank = {
      "To do": 0,
      Doing: 1,
      Done: 2,
    };

    /* ordinamento dei risultati filtrati */
    filtered.sort((a, b) => {
      if (sortBy === "title") {
        const result = String(a.title).localeCompare(String(b.title));
        return result * sortOrder;
      }

      if (sortBy === "status") {
        const aRank = statusRank[a.status] ?? 999;
        const bRank = statusRank[b.status] ?? 999;
        const result = aRank - bRank;
        return result * sortOrder;
      }

      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      const result = aTime - bTime;
      return result * sortOrder;
    });

    return filtered;
  }, [tasks, searchQuery, sortBy, sortOrder]);

  function getHeaderLabel(column, label) {
    /* aggiunta indicatore visivo per colonna attiva e verso */
    if (sortBy !== column) return label;
    return `${label} ${sortOrder === 1 ? ">" : "<"}`;
  }

  return (
    <section>
      {/* titolo della pagina */}
      <h1 style={{ margin: 0 }}>lista dei task</h1>

      {/* input ricerca non controllato per supportare debounce */}
      <div style={{ marginTop: "12px", maxWidth: "520px" }}>
        <label style={{ display: "block", fontWeight: 600 }}>
          cerca per nome
        </label>
        <input
          type="text"
          placeholder="scrivere il nome del task..."
          onChange={(event) => {
            /* aggiornamento debounced della query senza controllare il value */
            debouncedSearch(event.target.value);
          }}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        />
      </div>

      {/* tabella task */}
      <div style={{ marginTop: "12px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
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
            {/* gestione caso lista vuota o nessun risultato */}
            {visibleTasks.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: "10px" }}>
                  nessun task trovato.
                </td>
              </tr>
            ) : (
              visibleTasks.map((task) => (
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
