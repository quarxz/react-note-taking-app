import { useEffect, useState } from "react";

import styles from "./App.module.css";

function App() {
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

  useEffect(() => {
    function saveToLocalStorage() {
      localStorage.setItem("user", JSON.stringify(user));
    }
    saveToLocalStorage();
  }, [user]);

  return (
    <main>
      <section className={styles.card}>
        {user.name ? <h1>Note Taking App</h1> : <h1>Login</h1>}
        {user.name ? <h2>Logged User:</h2> : undefined}
        {user.name ? <p>User: {user.name}</p> : undefined}
        {user.name ? <p>eMial: {user.email}</p> : undefined}
        {user.name ? undefined : (
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

        {user.name ? (
          <button
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
