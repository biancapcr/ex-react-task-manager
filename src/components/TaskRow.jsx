import React from "react";

/* componente riga tabella */
function TaskRow({ title, status, createdAt }) {
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
      {/* colonna nome task */}
      <td style={{ padding: "10px", borderBottom: "1px solid #e5e7eb" }}>
        {title}
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

/* applicazione react.memo per ottimizzare il rendering */
export default React.memo(TaskRow);
