import { useState } from "react";
import styles from "./TaskForm.module.css";

export function TaskForm({ onAddTask }) {
  const [todo, setTodo] = useState("");
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAddTask({ todo });
        }}
      >
        <input
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          type="text"
          name="todo"
          id="todo"
        />
        <button type="submit">Hinzufügen</button>
      </form>
    </>
  );
}
