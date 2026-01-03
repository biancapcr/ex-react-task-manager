import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import TaskList from "./pages/TaskList.jsx";
import AddTask from "./pages/AddTask.jsx";

export default function App() {
  return (
    /* browserrouter abilita il routing lato client */
    <BrowserRouter>
      {/* la navbar resta visibile su tutte le rotte */}
      <Navbar />

      {/* contenitore principale delle pagine */}
      <main style={{ padding: "16px" }}>
        <Routes>
          {/* rotta principale: visualizza la lista dei task */}
          <Route path="/" element={<TaskList />} />

          {/* rotta dedicata alla creazione di un nuovo task */}
          <Route path="/add" element={<AddTask />} />

          {/* rotta di fallback per url non validi */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
