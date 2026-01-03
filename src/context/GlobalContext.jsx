import { createContext, useEffect, useMemo, useState } from "react";

/* contesto globale per condividere dati e funzioni tra componenti */
export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  /* stato globale che memorizza la lista dei task */
  const [tasks, setTasks] = useState([]);

  /* url base dell'api letto dal file .env */
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    /* recupero iniziale dei task al caricamento dell'app */
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

        /* salvataggio dei dati nello stato globale */
        setTasks(data);
      } catch (error) {
        /* log di errore utile in fase di sviluppo */
        console.log("errore fetch tasks:", error);
      }
    }

    fetchTasks();
  }, [apiUrl]);

  /* value memorizzato per evitare re-render inutili dei consumer */
  const value = useMemo(() => {
    return { tasks, setTasks };
  }, [tasks]);

  return (
    /* il provider rende disponibili i dati globali a tutta l'app */
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
