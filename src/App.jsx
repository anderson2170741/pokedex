import { HashRouter, Route, Routes } from "react-router-dom";
import CharacterDetail from "./components/CharacterDetail";
import Characters from "./components/Characters";
import InputName from "./components/InputName";
import "./App.css";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<InputName />} />
        
        <Route element={<ProtectedRoutes />}>
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
