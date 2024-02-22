import { useEffect, useState } from "react";

import styles from "./App.module.css";

import { Task } from "./Components/Task";
import { TaskForm } from "./Components/TaskForm";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), todo: "Oma erschrecken" },
    { id: uuidv4(), todo: "Katze färben" },
    { id: uuidv4(), todo: "Klo putzen" },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [user, setUser] = useState(() => {
    const newUser = localStorage.getItem("user");
    if (newUser) {
      return JSON.parse(newUser);
    } else
      ({
        name: "",
        email: "",
      });
  });
  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
  });

  function handleDeleteTask(task) {
    setTasks(
      tasks.filter((item) => {
        return item.todo !== task;
      })
    );
  }
  function handleAddTask(newTask) {
    setTasks([{ ...newTask, id: uuidv4() }, ...tasks]);
    setIsFormOpen(false);
  }

  useEffect(() => {
    function saveToLocalStorage() {
      localStorage.setItem("user", JSON.stringify(user));
    }
    saveToLocalStorage();
  }, [user]);

  return (
    <main>
      <section className={styles.card}>
        {user?.name ? <h1>Note Taking App</h1> : <h1>Login</h1>}
        {user?.name ? <h2>Logged User:</h2> : undefined}
        {user?.name ? <p>User: {user.name}</p> : undefined}
        {user?.name ? <p>eMail: {user.email}</p> : undefined}
        {user?.name ? (
          <button
            className={styles["btn-login"]}
            onClick={() => {
              setIsFormOpen((prevIsFormOpen) => !prevIsFormOpen);
            }}
          >
            Add ToDo
          </button>
        ) : undefined}
        {isFormOpen && user?.name ? (
          <TaskForm onAddTask={handleAddTask} />
        ) : (
          <></>
        )}
        {user?.name
          ? tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  onUpdateTask={(editTask) => {
                    setEditableToDoId(task.id);
                    !isFormOpen
                      ? handleUpdateTask(editTask, task.id)
                      : undefined;
                  }}
                  onDeleteTask={(task) => {
                    handleDeleteTask(task);
                  }}
                  todo={task.todo}
                />
              );
            })
          : undefined}
        {user?.name ? undefined : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUser({ ...inputUser });
              setInputUser({ name: "", email: "" });
            }}
          >
            <label>Name:</label>
            <input
              id="name"
              type="text"
              value={inputUser.name}
              onChange={(e) => {
                setInputUser({ ...inputUser, name: e.target.value });
              }}
            />
            <label>eMail:</label>
            <input
              id="email"
              type="email"
              value={inputUser.email}
              onChange={(e) => {
                setInputUser({ ...inputUser, email: e.target.value });
              }}
            />
            <button typeof="submit">Login</button>
          </form>
        )}

        {user?.name ? (
          <button
            className={styles["btn-logout"]}
            onClick={() => {
              setUser({ name: "", email: "" });
            }}
          >
            Logout
          </button>
        ) : undefined}
      </section>
    </main>
  );
}

export default App;
