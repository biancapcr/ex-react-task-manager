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

    /* invio richiesta post per creare un nuovo task */
    const response = await fetch(`${apiUrl}/tasks`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    /* gestione esplicita degli errori http */
    if (!response.ok) {
      throw new Error(`errore http: ${response.status}`);
    }

    const data = await response.json();

    /* controllo della struttura prevista dal backend */
    if (data.success === true) {
      /* aggiornamento dello stato aggiungendo la task creata */
      setTasks((prev) => [data.task, ...prev]);
      return data.task;
    }

    /* gestione errore applicativo restituito dal backend */
    throw new Error(data.message || "errore durante la creazione della task.");
  }

  /* rimozione task: */
  function removeTask() {}

  /* modifica task: */
  function updateTask() {}

  /* esposizione di stato e funzioni per l'utilizzo nei componenti */
  return { tasks, addTask, removeTask, updateTask };
}
