import { ADD_TASK, ADD_MULTIPLE_TASKS, EDIT_TASK, GET_ALL_PERSISTED_TASKS, DELETE_TASK, CLEAR_TASKS } from "./tasksConstants";
import { addTask as addTaskService } from '../../Utilities/services';
import { createReducer } from "@reduxjs/toolkit";
import { addMultipleTasks } from "./tasksActions";


const initialState = {
    tasks: [],
    status: "idle",
    error: null,
}

const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("ADD_TASK", (state, action) => {
            state.tasks.push(action.payload);
        })
        .addCase("CLEAR_TASKS", (state, action) => {
            state.tasks = [];
        })
        .addCase(addMultipleTasks.pending, (state) => {
            state.status = "loading";
        })
        .addCase(addMultipleTasks.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.tasks = [...state.tasks, ...action.payload];
        })
        .addCase(addMultipleTasks.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
});

export default tasksReducer;

// export default function tasksReducer(state = initialState, action) {
//     switch (action.type) {
//         case ADD_TASK: {
//             return { tasks: [...state.tasks, action.payload] };
//         }
//         case ADD_MULTIPLE_TASKS: {
//             let tmp = [...state.tasks];
//             action.payload.forEach(async (message, i) => {
//                 await addTaskService(message, (id_or_err, type) => {
//                     if (type == 'success') {
//                         console.log(tmp[i], 'tmp[i]')
//                         message["firebaseId"] = id_or_err
//                     }
//                     else if (type == 'error') {
//                         message["firebaseId"] = "errored_state"
//                     }
//                 });
//                 tmp.push(message);
//             })
//             console.log(tmp, 'tmp filled state...')
//             return { tasks: [...tmp] };
//         }
//         case EDIT_TASK: {
//             const index = state.findIndex((task) => task.id == action.payload.taskId);
//             let temp;
//             if (index !== -1) {
//                 temp = [...state];
//                 temp[index] = action.payload.newData
//             }
//             return [...temp];
//         }
//         case GET_ALL_PERSISTED_TASKS: {
//             let persistedTasks = [...state, ...JSON.parse(localStorage.getItem("tasks"))];
//             return [...persistedTasks];
//         }
//         case DELETE_TASK: {
//             const index = state.indexOf((task) => task.id == action.payload.taskId);
//             let temp;
//             if (index !== -1) {
//                 temp = [...state];
//                 temp.splice(index, 1);
//             }
//             return [...temp];
//         }
//         case CLEAR_TASKS: {
//             return {tasks: []};
//         }
//         default:
//             return state;
//     }
// }