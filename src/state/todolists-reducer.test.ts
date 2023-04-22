​import { AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistFilterAT, RemoveTodolistAC, todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { FilterValuesType, TodolistType } from '../App'

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {todolistId: todolistId1, todolistTitle: 'What to learn', filter: 'all'},
        {todolistId: todolistId2, todolistTitle: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].todolistId).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolitTitle = "New Todolit";

    const startState: Array<TodolistType> = [
        {todolistId: todolistId1, todolistTitle: 'What to learn', filter: 'all'},
        {todolistId: todolistId2, todolistTitle: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolitTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].todolistId).toBe(newTodolitTitle)
    expect(endState[2].filter).toBe("all")
})


test('correct todolist title should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolitTitle = "New Todolit";

    const startState: Array<TodolistType> = [
        {todolistId: todolistId1, todolistTitle: 'What to learn', filter: 'all'},
        {todolistId: todolistId2, todolistTitle: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, AddTodolistAC(newTodolitTitle))

    expect(endState[0].todolistTitle).toBe("What to learn")
    expect(endState[2].todolistTitle).toBe(newTodolitTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodolistType> = [
        {todolistId: todolistId1, todolistTitle: 'What to learn', filter: 'all'},
        {todolistId: todolistId2, todolistTitle: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilter))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe("newFilter")
})