import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import TaskList from "./pages/TaskList.jsx";
import AddTask from "./pages/AddTask.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";

export default function App() {
  return (
    <GlobalProvider>
      {/* browserrouter abilita il routing lato client */}
      <BrowserRouter>
        {/* la barra di navigazione è visibile su tutte le pagine */}
        <Navbar />

        {/* contenitore principale delle pagine */}
        <main style={{ padding: "16px" }}>
          <Routes>
            {/* rotta principale: visualizza la lista dei task */}
            <Route path="/" element={<TaskList />} />

            {/* rotta dedicata all'aggiunta di un nuovo task */}
            <Route path="/add" element={<AddTask />} />

            {/* rotta di fallback per percorsi non validi */}
            {/* l'utente viene reindirizzato alla home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </GlobalProvider>
  );
}
