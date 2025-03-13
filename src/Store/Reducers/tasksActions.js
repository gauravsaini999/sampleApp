import { ADD_TASK, EDIT_TASK, GET_ALL_PERSISTED_TASKS, DELETE_TASK, CLEAR_TASKS, ADD_MULTIPLE_TASKS } from "./tasksConstants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTask as addTaskService } from "../../Utilities/services"

export const addTask = (task) => {
    return {
        type: ADD_TASK,
        payload: task
    }
}

export const addMultipleTasks = createAsyncThunk(
    "tasks/addMultipleTasks",
    async (messages, { rejectWithValue }) => {
        try {
            const results = await Promise.all(
                messages.map(
                    (message) =>
                        new Promise((resolve) => {
                            addTaskService(message, (id_or_err, type) => {
                                if (type === "success") {
                                    resolve({ ...message, firebaseId: id_or_err });
                                } else {
                                    resolve({ ...message, firebaseId: "errored_state" });
                                }
                            });
                        })
                )
            );

            return results; // This will be passed to the reducer
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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