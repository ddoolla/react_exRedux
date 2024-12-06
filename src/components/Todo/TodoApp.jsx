import Header from "./Header";
import TodoList from "./TodoList";
import Footer from "./Footer";
import "./TodoApp.css";

const TodoApp = () => {
  return (
    <div className="todoApp">
      <Header />
      <TodoList />
      <Footer />
    </div>
  );
};

export default TodoApp;
