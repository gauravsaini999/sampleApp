import { ADD_TASK, EDIT_TASK, GET_ALL_PERSISTED_TASKS, DELETE_TASK, CLEAR_TASKS, PERSIST_ALL_TASKS } from "./tasksConstants";

const initialState = [];

export default function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK: {
            return [...state, action.payload];
        }
            break;
        case EDIT_TASK: {
            const index = state.findIndex((task) => task.id == action.payload.taskId);
            let temp;
            if (index !== -1) {
                temp = [...state];
                temp[index] = action.payload.newData
            }
            return [...temp];
        }
            break;
        case GET_ALL_PERSISTED_TASKS: {
            let persistedTasks = JSON.parse(localStorage.getItem("tasks"));
            return [...persistedTasks];
        }
            break;
        case DELETE_TASK: {
            const index = state.indexOf((task) => task.id == action.payload.taskId);
            let temp;
            if (index !== -1) {
                temp = [...state];
                temp.splice(index, 1);
            }
            return [...temp];
        }
            break;
        case CLEAR_TASKS: {
            return [];
        }
            break;
        case PERSIST_ALL_TASKS: {
            localStorage.setItem("tasks", JSON.stringify(state));
        }
            break;
        default:
            return state;
    }
}