import { configureStore, combineReducers } from '@reduxjs/toolkit'
import tasksReducer from './Reducers/tasksReducer';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'

const rootPersistConfig = {
    key: "root",
    storage,
};

const userPersistConfig = {
    key: 'user',
    storage: storageSession
}

const userPersistedReducer = persistReducer(userPersistConfig, tasksReducer);
const rootReducer = combineReducers({
    tasks: userPersistedReducer
})
const persistedReducer = persistReducer(rootPersistConfig, rootReducer) 
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
})

export const persistor = persistStore(store);
