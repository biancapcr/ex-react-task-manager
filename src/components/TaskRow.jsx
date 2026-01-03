import React from "react";
import { Link } from "react-router-dom";

/* componente riga tabella */
function TaskRow({ id, title, status, createdAt }) {
  /* definizione stile della cella status in base al valore */
  const statusStyle = (() => {
    if (status === "To do") return { backgroundColor: "red", color: "white" };
    if (status === "Doing")
      return { backgroundColor: "yellow", color: "black" };
    if (status === "Done") return { backgroundColor: "green", color: "white" };
    return {};
  })();

  return (
    <tr>
      {/* colonna nome task con link alla pagina dettaglio */}
      <td style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }}>
        <Link to={`/task/${id}`} style={{ color: "inherit" }}>
          {title}
        </Link>
      </td>

      {/* colonna status con colore di sfondo */}
      <td
        style={{
          padding: "10px",
          borderBottom: "1px solid #e5e7eb",
          ...statusStyle,
        }}
      >
        {status}
      </td>

      {/* colonna data creazione */}
      <td style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }}>
        {createdAt}
      </td>
    </tr>
  );
}

/* react.memo per ottimizzare il rendering */
export default React.memo(TaskRow);
