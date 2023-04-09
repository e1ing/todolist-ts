import { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  todolistId: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (taskTitle: string,  todolistId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
};

export function Todolist(props: TodolistPropsType) {
  let [taskTitle, setTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.ctrlKey && e.keyCode === 13) {
      props.addTask(taskTitle, props.todolistId);
      setTaskTitle("");
    }
  };
  const addTask = () => {
    if (taskTitle.trim() !== "") {
      props.addTask(taskTitle.trim(), props.todolistId);
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };
  const onAllClickHandler = () => props.changeFilter("all", props.todolistId);
  const onActiveClickHandler = () => props.changeFilter("active", props.todolistId);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistId);

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
          className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id, props.todolistId);
          };
          const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked,  props.todolistId);
          };
          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeTaskHandler}
                checked={task.isDone}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
