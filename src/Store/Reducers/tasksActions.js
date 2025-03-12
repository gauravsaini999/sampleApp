import { ADD_TASK, EDIT_TASK, GET_TASKS, DELETE_TASK } from "./tasksConstants";

export const addTask = (task) => {
    return {
        type: ADD_TASK,
        payload: task
    }
}

export const editTask = (taskId, newData) => {
    return {
        type: EDIT_TASK,
        payload: {taskId, newData}
    }
}

export const getTasks = (tasks) => {
    return { 
        type: GET_TASKS,
        payload: tasks
    }
}

export const deleteTasks = (taskId) => {
    return {
        type: DELETE_TASK,
        payload: { taskId }
    }
}