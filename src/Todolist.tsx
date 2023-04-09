import { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";

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
  addTask: (taskTitle: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: TodolistPropsType) {
  const onAllClickHandler = () => props.changeFilter("all", props.todolistId);
  const onActiveClickHandler = () =>
    props.changeFilter("active", props.todolistId);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.todolistId);

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistId);
  };

  const addTask = (title: string) => {
   props.addTask(title, props.todolistId)
  }

  return (
    <div>
      <h3>
        {props.title} <button onClick={removeTodolistHandler}>X</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id, props.todolistId);
          };
          const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(
              task.id,
              e.currentTarget.checked,
              props.todolistId
            );
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
