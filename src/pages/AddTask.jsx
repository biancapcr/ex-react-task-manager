import { useContext, useRef, useState } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";

/* costante fornita per la validazione dei simboli vietati */
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

export default function AddTask() {
  /* recupero della funzione addtask dal contesto globale */
  const { addTask } = useContext(GlobalContext);

  /* stato controllato per il titolo del task */
  const [title, setTitle] = useState("");

  /* stato per la gestione del messaggio di errore sul titolo */
  const [titleError, setTitleError] = useState("");

  /* ref per textarea non controllata */
  const descriptionRef = useRef(null);

  /* ref per select non controllata */
  const statusRef = useRef(null);

  function validateTitle(value) {
    /* rimozione degli spazi ai lati per evitare input "vuoti" */
    const trimmed = value.trim();

    /* validazione: non vuoto */
    if (trimmed.length === 0) {
      return "il nome del task non può essere vuoto.";
    }

    /* validazione: assenza di simboli speciali definiti nella costante */
    for (const char of symbols) {
      if (trimmed.includes(char)) {
        return "il nome del task non può contenere simboli speciali.";
      }
    }

    /* input valido */
    return "";
  }

  async function handleSubmit(event) {
    /* prevenzione del refresh della pagina al submit */
    event.preventDefault();

    /* validazione del titolo prima di procedere */
    const errorMessage = validateTitle(title);
    setTitleError(errorMessage);

    /* blocco del submit se la validazione fallisce */
    if (errorMessage) return;

    /* lettura dei valori non controllati tramite ref */
    const description = descriptionRef.current
      ? descriptionRef.current.value
      : "";
    const status = statusRef.current ? statusRef.current.value : "To do";

    /* creazione oggetto task con i valori inseriti */
    const task = {
      title: title.trim(),
      description,
      status,
    };

    try {
      /* esecuzione chiamata api tramite funzione del custom hook */
      await addTask(task);

      /* conferma creazione task */
      alert("task creata con successo.");

      /* reset del campo controllato */
      setTitle("");

      /* reset dei campi non controllati */
      if (descriptionRef.current) descriptionRef.current.value = "";
      if (statusRef.current) statusRef.current.value = "To do";
    } catch (error) {
      /* gestione errore con messaggio ricevuto */
      alert(error.message);
    }
  }

  return (
    <section>
      {/* titolo della pagina */}
      <h1 style={{ margin: 0 }}>aggiungi task</h1>

      {/* form di creazione task */}
      <form
        onSubmit={handleSubmit}
        style={{ marginTop: "12px", maxWidth: "520px" }}
      >
        {/* campo controllato: titolo */}
        <label style={{ display: "block", fontWeight: 600 }}>
          nome del task
        </label>
        <input
          type="text"
          value={title}
          onChange={(event) => {
            /* aggiornamento dello stato controllato */
            setTitle(event.target.value);

            /* rimozione dell'errore mentre si digita */
            if (titleError) setTitleError("");
          }}
          placeholder="es. fare la spesa"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        />

        {/* messaggio di errore per il titolo */}
        {titleError && (
          <p style={{ marginTop: "6px", color: "red" }}>{titleError}</p>
        )}

        {/* campo non controllato: descrizione */}
        <label style={{ display: "block", fontWeight: 600, marginTop: "12px" }}>
          descrizione
        </label>
        <textarea
          ref={descriptionRef}
          rows={4}
          placeholder="aggiungere una descrizione..."
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            resize: "vertical",
          }}
        />

        {/* campo non controllato: status */}
        <label style={{ display: "block", fontWeight: 600, marginTop: "12px" }}>
          stato
        </label>
        <select
          ref={statusRef}
          defaultValue="To do"
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

        {/* bottone submit */}
        <button
          type="submit"
          style={{
            marginTop: "16px",
            padding: "10px 14px",
            borderRadius: "10px",
            border: "0",
            cursor: "pointer",
            background: "#111827",
            color: "white",
            fontWeight: 700,
          }}
        >
          aggiungi task
        </button>
      </form>
    </section>
  );
}
