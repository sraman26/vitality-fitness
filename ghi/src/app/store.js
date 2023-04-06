import {configureStore} from "@reduxjs/toolkit"
import loginReducer from "../features/auth/loginSlice"
import signupReducer from "../features/auth/signupSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { authApi } from "../services/auth"
import { workoutApi } from "../services/workouts"


export const store=configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
        [authApi.reducerPath]: authApi.reducer,
        [workoutApi.reducerPath]: workoutApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, workoutApi.middleware])
})

setupListeners(store.dispatch)
