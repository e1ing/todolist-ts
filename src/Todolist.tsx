import { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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
  changeTaskTitle: (todolistId: string, newTitle: string, taskId: string)=> void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTododlistTitle: (todolistId: string, newTitle: string) => void
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

  const changeTododlistTitle = (newTitle: string) => {
    props.changeTododlistTitle(props.todolistId, newTitle)
  }

  return (
    <div>
      <h3>
       <EditableSpan title={props.title} onChange={()=>{}}/>  <button onClick={removeTodolistHandler}>X</button>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul>
        {props.tasks.map((task) => {
          const onRemoveHandler = () => {
            props.removeTask(task.id, props.todolistId);
          };
          const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id,  e.currentTarget.checked,  props.todolistId);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.todolistId )
          };
          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                onChange={onChangeTaskStatusHandler}
                checked={task.isDone}
              />
              <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
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
