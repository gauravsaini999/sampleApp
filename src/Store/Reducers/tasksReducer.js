import { ADD_TASK, ADD_MULTIPLE_TASKS, EDIT_TASK, GET_ALL_PERSISTED_TASKS, DELETE_TASK, CLEAR_TASKS } from "./tasksConstants";
import { addTask as addTaskService } from '../../Utilities/services';

const initialState = [];

export default function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK: {
            return [...state, action.payload];
        }
        case ADD_MULTIPLE_TASKS: {
            let tmp = [...state];
            action.payload.forEach((message) => {
                tmp.push(message);
                let successfulUploads = [];
                let erroredUploads = [];
                addTaskService(message, (id_or_err, type) => {
                    if (type == 'success') {
                        successfulUploads.push({ firebaseId: id_or_err, id: message.id });
                    }
                    else if (type == 'error') {
                        erroredUploads.push({ errorMsg: id_or_err, id: message.id })
                    }
                });
            })
            localStorage.setItem("tasks", JSON.stringify(tmp));
            return [...tmp];
        }
        case EDIT_TASK: {
            const index = state.findIndex((task) => task.id == action.payload.taskId);
            let temp;
            if (index !== -1) {
                temp = [...state];
                temp[index] = action.payload.newData
            }
            return [...temp];
        }
        case GET_ALL_PERSISTED_TASKS: {
            let persistedTasks = [...state, ...JSON.parse(localStorage.getItem("tasks"))];
            return [...persistedTasks];
        }
        case DELETE_TASK: {
            const index = state.indexOf((task) => task.id == action.payload.taskId);
            let temp;
            if (index !== -1) {
                temp = [...state];
                temp.splice(index, 1);
            }
            return [...temp];
        }
        case CLEAR_TASKS: {
            return [];
        }
        default:
            return state;
    }
}