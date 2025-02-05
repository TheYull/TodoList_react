import { useState } from "react";
import s from "./TodoList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  toggleTask,
  deleteTask,
  deleteSetTask,
} from "../../features/tasksSlice";

export const TodoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [title, setTitle] = useState("");

  const addTaskHandler = () => {
    if (!title.trim()) return;
    dispatch(addTask(title));
    setTitle("");
  };

  const deleteSetTaskHandler = () => {
    dispatch(deleteSetTask());
  };

  return (
    <div className={s.container}>
      <h1>To Do List</h1>
      <div className={s.wrapper_main}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTaskHandler}>Add</button>
        <button onClick={deleteSetTaskHandler}>Delete</button>
      </div>
      <div>
        <ol className={s.task_list}>
          {tasks.map((task) => (
            <li key={task.id} className={task.isDone ? "done" : ""}>
              <p>{task.title}</p>
              <div className={s.wrapper_title_menu}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => dispatch(toggleTask(task.id))}
                />
                <button onClick={() => dispatch(deleteTask(task.id))}>X</button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
