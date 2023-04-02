import { useState } from "react";
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
};

export function Todolist(props: TodolistPropsType) {
  let [taskTitle, setTaskTitle] = useState("");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.keyCode === 13) {
              props.addTask(taskTitle);
              setTaskTitle("");
            }
          }}
        />
        <button
          onClick={() => {
            props.addTask(taskTitle);
            setTaskTitle("");
          }}
        >
          +
        </button>
      </div>
      <ul>
        {props.tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
            <button
              onClick={() => {
                props.removeTask(task.id);
              }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => {
            props.changeFilter("all");
          }}
        >
          All
        </button>
        <button
          onClick={() => {
            props.changeFilter("active");
          }}
        >
          Active
        </button>
        <button
          onClick={() => {
            props.changeFilter("completed");
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
}
