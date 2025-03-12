import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './Reducers/tasksReducer'

const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
})

export default store