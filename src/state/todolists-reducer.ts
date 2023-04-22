import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

//action types 
export type RemoveTodolistAT = {
   type:  'REMOVE-TODOLIST',
   todolistId: string
}

export type AddTodolistAT ={
   type: 'ADD-TODOLIST',
   todolistTitle: string
}

export type ChangeTodolistTitleAT = {
type: 'CHANGE-TODOLIST-TITLE',
todolistId: string,
todolistTitle: string
}

export type ChangeTodolistFilterAT = {
   type: 'CHANGE-TODOLIST-FILTER',
   todolistId: string
   filter: FilterValuesType
}

type ActionsType = RemoveTodolistAT|AddTodolistAT|ChangeTodolistTitleAT|ChangeTodolistFilterAT


export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
switch (action.type) {
   case 'REMOVE-TODOLIST': {
      return state.filter((tl) => tl.todolistId !== action.todolistId)
   }
      case 'ADD-TODOLIST': {
      return [...state, {
         todolistId: v1(),
         todolistTitle: action.todolistTitle,
         filter: 'all'
      }]
   }
   case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.todolistId === action.todolistId)
      if(todolist){
         // если нашёлся, измени ему зоголовок
         todolist.todolistTitle = action.todolistTitle
      }
      return [...state]
   }
   case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.todolistId === action.todolistId)
      if(todolist){
         // если нашёлся, измени ему зоголовок
         todolist.filter = action.filter
      }
      return [...state]
   }
         default: return state
}
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
   return {type:  'REMOVE-TODOLIST', todolistId: todolistId}
}


export const AddTodolistAC = (todolistTitle: string): AddTodolistAT => {
   return {type: 'ADD-TODOLIST', todolistTitle: todolistTitle}
}

export const ChangeTodolistTitleAC = (todolistId: string, todolistTitle: string): ChangeTodolistTitleAT => {
   return {type: 'CHANGE-TODOLIST-TITLE', todolistId: todolistId, todolistTitle:todolistTitle}
}


export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
   return {type:  'CHANGE-TODOLIST-FILTER', todolistId: todolistId, filter: filter}
}