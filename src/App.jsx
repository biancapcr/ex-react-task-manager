import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import TaskList from "./pages/TaskList.jsx";
import AddTask from "./pages/AddTask.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import TaskDetail from "./pages/TaskDetail.jsx";

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
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />

            {/* rotta dinamica per la pagina dettaglio */}
            <Route path="/task/:id" element={<TaskDetail />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </GlobalProvider>
  );
}
