import { useEffect, useState } from "react";

/* hook dedicato alla gestione dei task */
/* centralizza fetch iniziale e funzioni di modifica */
export function useTasks(apiUrl) {
  /* stato locale che memorizza la lista dei task */
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    /* recupero iniziale dei task al mount */
    async function fetchTasks() {
      try {
        const response = await fetch(`${apiUrl}/tasks`);

        /* gestione esplicita degli errori http */
        if (!response.ok) {
          throw new Error(`errore http: ${response.status}`);
        }

        const data = await response.json();

        /* stampa di debug per verificare i dati ricevuti */
        console.log("task ricevuti:", data);

        /* salvataggio dei task nello stato locale dell'hook */
        setTasks(data);
      } catch (error) {
        /* log di errore utile in fase di sviluppo */
        console.log("errore fetch tasks:", error);
      }
    }

    fetchTasks();
  }, [apiUrl]);

  async function addTask(task) {
    /* validazione minima: presenza delle proprietà richieste */
    if (!task || !task.title || !task.status) {
      throw new Error("dati task non validi.");
    }

    const response = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`errore http: ${response.status}`);
    }

    const data = await response.json();

    if (data.success === true) {
      setTasks((prev) => [data.task, ...prev]);
      return data.task;
    }

    throw new Error(data.message || "errore durante la creazione della task.");
  }

  async function removeTask(taskId) {
    if (taskId === undefined || taskId === null) {
      throw new Error("id task non valido.");
    }

    const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`errore http: ${response.status}`);
    }

    const data = await response.json();

    if (data.success === true) {
      setTasks((prev) => prev.filter((t) => String(t.id) !== String(taskId)));
      return;
    }

    throw new Error(
      data.message || "errore durante l'eliminazione della task."
    );
  }

  async function updateTask(updatedTask) {
    /* validazione minima: presenza id e campi essenziali */
    if (
      !updatedTask ||
      updatedTask.id === undefined ||
      updatedTask.id === null
    ) {
      throw new Error("id task non valido.");
    }
    if (!updatedTask.title || !updatedTask.status) {
      throw new Error("dati task non validi.");
    }

    /* invio richiesta put per aggiornare il task */
    const response = await fetch(`${apiUrl}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    /* gestione esplicita degli errori http */
    if (!response.ok) {
      throw new Error(`errore http: ${response.status}`);
    }

    const data = await response.json();

    /* controllo della struttura prevista dal backend */
    if (data.success === true) {
      /* aggiornamento del task nello stato globale */
      setTasks((prev) =>
        prev.map((t) =>
          String(t.id) === String(updatedTask.id) ? data.task : t
        )
      );
      return data.task;
    }

    /* gestione errore applicativo restituito dal backend */
    throw new Error(data.message || "errore durante la modifica della task.");
  }

  /* esposizione di stato e funzioni per l'utilizzo nei componenti */
  return { tasks, addTask, removeTask, updateTask };
}
