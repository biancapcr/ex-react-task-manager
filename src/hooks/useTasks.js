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

  /* aggiunta task */
  function addTask() {}

  /* rimozione task */
  function removeTask() {}

  /* modifica task */
  function updateTask() {}

  /* esposizione di stato e funzioni per l'utilizzo nei componenti */
  return { tasks, addTask, removeTask, updateTask };
}
