import "./App.css";
import { useState } from "react";
import { Todolist } from "./Todolist";
import { TaskType } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export type FilterValuesType = "all" | "completed" | "active";
export type TaskStateType = {
  [key: string]: Array<TaskType>;
};
export type TodolistType = {
  todolistId: string;
  todolistTitle: string;
  filter: FilterValuesType;
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolist] = useState<Array<TodolistType>>([
    { todolistId: todolistId1, todolistTitle: "What to learn", filter: "active" },
    { todolistId: todolistId2, todolistTitle: "What to buy ", filter: "completed" },
  ]);

  let [tasks, setTasks] = useState<TaskStateType>({
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

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    let task = tasks[todolistId].find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      tasks[todolistId] = [task, ...tasks[todolistId]];
      setTasks({ ...tasks });
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.todolistId === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolist([...todolists]);
    }
  }

  let removeTodolist = (todolistId: string) => {
    let filteredTodolists = todolists.filter((tl) => tl.todolistId !== todolistId);
    setTodolist(filteredTodolists);
    delete tasks[todolistId]; //array of tasks deleted
    setTasks(tasks); // delete in state tasks objest
  };

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      todolistId: v1(),
      filter: "all",
      todolistTitle: title,
    };
    setTodolist([todolist, ...todolists]);
    setTasks({ ...tasks, [todolist.todolistId]: [] });
  }

  function changeTododlistTitle(todolistId: string, newTitle: string) {
    const todolist = todolists.find((tl) => tl.todolistId === todolistId);
    if (todolist) {
      todolist.todolistTitle = newTitle;
      setTodolist([...todolists]);
    }
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={10}>
          {todolists.map((tl) => {
            let tasksForTodolist = tasks[tl.todolistId];
            if (tl.filter === "completed") {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.isDone === true
              );
            }
            if (tl.filter === "active") {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.isDone === false
              );
            }

            return (
              <Grid item>
                <Paper style={{ paddingBlock: "10px" }}>
                  <Todolist
                    key={tl.todolistId}
                    todolistId={tl.todolistId}
                    title={tl.todolistTitle}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTododlistTitle={changeTododlistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
