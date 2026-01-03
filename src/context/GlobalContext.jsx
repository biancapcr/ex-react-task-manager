import { createContext, useMemo } from "react";
import { useTasks } from "../hooks/useTasks.js";

/* contesto globale per la gestione dei task */
export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  /* url base dell'api letto dal file .env */
  const apiUrl = import.meta.env.VITE_API_URL;

  /* utilizzo del custom hook per recuperare task e funzioni */
  const { tasks, addTask, removeTask, updateTask } = useTasks(apiUrl);

  /* value memorizzato per evitare re-render inutili */
  const value = useMemo(() => {
    return {
      tasks,
      addTask,
      removeTask,
      updateTask,
    };
  }, [tasks]);

  return (
    /* il provider rende disponibili i dati globali a tutta l'app */
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
