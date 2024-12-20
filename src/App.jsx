import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Counter from "./components/Counter/Counter";
import TodoApp from "./components/Todo/TodoApp";

function App() {
  const nav = useNavigate();

  return (
    <div className="app">
      <div className="btnBox">
        <button onClick={() => nav("/counter")}>Counter App</button>
        <button onClick={() => nav("/todo")}>Todo App</button>
      </div>
      <hr />
      <Routes>
        <Route path="/counter" element={<Counter />} />
        <Route path="/todo" element={<TodoApp />} />
      </Routes>
    </div>
  );
}

export default App;
