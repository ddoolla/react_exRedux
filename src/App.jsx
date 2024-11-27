import "./App.css";
import { Routes, Route } from "react-router-dom";
import Counter from "./components/Counter/Counter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </>
  );
}

export default App;
