import { ADD_TASK, EDIT_TASK, GET_ALL_PERSISTED_TASKS, DELETE_TASK, CLEAR_TASKS, ADD_MULTIPLE_TASKS } from "./tasksConstants";

export const addTask = (task) => {
    return {
        type: ADD_TASK,
        payload: task
    }
}

export const addMultipleTasks = (tasks) => {
    return {
        type: ADD_MULTIPLE_TASKS,
        payload: tasks
    }
}

export const editTask = (taskId, newData) => {
    return {
        type: EDIT_TASK,
        payload: { taskId, newData }
    }
}

export const getAllPersistedTasks = () => {
    return {
        type: GET_ALL_PERSISTED_TASKS
    }
}

export const deleteTasks = (taskId) => {
    return {
        type: DELETE_TASK,
        payload: { taskId }
    }
}

export const clearTasks = () => {
    return {
        type: CLEAR_TASKS
    }
}