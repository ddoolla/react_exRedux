import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { saveNewTodo } from "./todosSlice";

const Header = () => {
  const [text, setText] = useState("");
  const idRef = useRef(0);
  const [status, setStatus] = useState("idle");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = async (e) => {
    const trimmedText = text.trim();

    if (e.which === 13 && trimmedText) {
      setStatus("loading");
      await dispatch(saveNewTodo({ id: idRef.current++, text: trimmedText }));

      setText("");
      setStatus("idle");
    }
  };

  let isLoading = status === "loading";
  let loader = isLoading ? <div>loading...</div> : null;

  return (
    <header>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  );
};

export default Header;
