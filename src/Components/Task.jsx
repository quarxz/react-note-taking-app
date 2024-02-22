import styles from "./task.module.css";

export function Task({ todo, onDeleteTask }) {
  function handleDeleteTask() {
    onDeleteTask(todo);
  }
  return (
    <>
      <div className={styles.task}>
        {todo}
        <span className={styles["btn-edit"]}>Update</span>
        <span className={styles["btn-delete"]} onClick={handleDeleteTask}>
          <svg
            className={styles.highlight}
            width="100"
            height="100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0" y1="100" x2="100" y2="0" />
            <line x1="0" y1="0" x2="100" y2="100" />
          </svg>
        </span>
      </div>
    </>
  );
}
