import "./App.css";
import { useState } from "react";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  let [todolists, setTodolist] = useState<Array<TodolistType>>([
    { id: v1(), title: "What to learn", filter: "active" },
    { id: v1(), title: "What to buy ", filter: "completed" },
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(taskTitle: string) {
    if (taskTitle.trim() === "") {
      return;
    }
    let newTask = { id: v1(), title: taskTitle, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id===todolistId);
    if(todolist) {
      todolist.filter = value;
      setTodolist([...todolists])
    }
  }

  function changeTaskStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodolist = tasks;
        if (tl.filter === "completed") {
          tasksForTodolist = tasks.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodolist = tasks.filter((t) => t.isDone === false);
        }

        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            changeFilter={changeFilter}
            filter={tl.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
