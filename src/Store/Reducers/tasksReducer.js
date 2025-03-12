import { ADD_TASK, EDIT_TASK, GET_TASKS, DELETE_TASK } from "./tasksConstants";

const initialState = [];

export default function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK: {
            state.push(action.payload)
        }
        case EDIT_TASK: {
            const index = state.findIndex((task) => task.id == action.payload.taskId);
            if (index !== -1) {
                state[index] = action.payload.newData
            }
        }
        case GET_TASKS: {
            state = [...action.payload]
        }
        case DELETE_TASK: {
            const index = state.findIndex((task) => task.id == action.payload.taskId);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
        default:
            return state;
    }
}