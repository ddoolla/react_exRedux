import "./App.css";
import { Routes, Route } from "react-router-dom";
import Counter from "./components/Counter/Counter";
import TodoApp from "./components/Todo/TodoApp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/todoApp" element={<TodoApp />} />
      </Routes>
    </>
  );
}

export default App;
