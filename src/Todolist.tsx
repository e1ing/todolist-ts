import { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodolistPropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (taskTitle: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export function Todolist(props: TodolistPropsType) {
  let [taskTitle, setTaskTitle] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.keyCode === 13) {
      props.addTask(taskTitle);
      setTaskTitle("");
    }
  };
  const addTask = () => {
    props.addTask(taskTitle);
    setTaskTitle("");
  };
  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyDownHandler}
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id);
          };
          const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked);
          };
          return (
            <li key={task.id}>
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
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
