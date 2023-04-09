import "./App.css";
import { useState } from "react";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active";

type TodolistType = {
  id: string;
  todolistTitle: string;
  filter: FilterValuesType;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolist] = useState<Array<TodolistType>>([
    { id: todolistId1, todolistTitle: "What to learn", filter: "active" },
    { id: todolistId2, todolistTitle: "What to buy ", filter: "completed" },
  ]);

  let [tasks, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Flavour", isDone: true },
      { id: v1(), title: "Baked powder", isDone: false },
    ],
  });

  function removeTask(taskId: string, todolistId: string) {
    tasks[todolistId] = tasks[todolistId].filter((t) => t.id !== taskId);
    setTasks({ ...tasks });
  }

  function addTask(taskTitle: string, todolistId: string) {
    if (taskTitle.trim() === "") {
      return;
    }
    let newTask = { id: v1(), title: taskTitle, isDone: false };
    let newTasks = [newTask, ...tasks[todolistId]];
    tasks[todolistId] = newTasks;
    setTasks({ ...tasks });
  }

  function changeTaskStatus(
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) {
    let task = tasks[todolistId].find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      tasks[todolistId] = [task, ...tasks[todolistId]];
      setTasks({ ...tasks });
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolist([...todolists]);
    }
  }

  let removeTodolist = (todolistId: string) => {
    let filteredTodolists = todolists.filter((tl) => tl.id !== todolistId);
    setTodolist(filteredTodolists);
    delete tasks[todolistId]; //array of tasks deleted
    setTasks(tasks); // delete in state tasks objest
  };

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      todolistTitle: title,
    };
    setTodolist([todolist, ...todolists]);
    setTasks({...tasks, [todolist.id]: []})
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map((tl) => {
        let tasksForTodolist = tasks[tl.id];
        if (tl.filter === "completed") {
          tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === true);
        }
        if (tl.filter === "active") {
          tasksForTodolist = tasksForTodolist.filter((t) => t.isDone === false);
        }

        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.todolistTitle}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            changeFilter={changeFilter}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
