import "./App.css";
import { useState } from "react";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
  ]);

  let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  }

  function addTask(taskTitle: string) {
    if(taskTitle.trim() === ""){
      return
    }
    let newTask = { id: v1(), title: taskTitle, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value);
  }

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }
  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }

  function changeTaskStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks])
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus = {changeTaskStatus}
      />
    </div>
  );
}

export default App;
