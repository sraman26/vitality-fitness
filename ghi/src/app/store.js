import {configureStore} from "@reduxjs/toolkit"
import loginReducer from "../features/auth/loginSlice"
import signupReducer from "../features/auth/signupSlice"
import cardioSliceReducer from "../features/cardio/CreateCardioWorkoutSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { workoutApi } from "../services/workout"
import updateCardioSliceReducer from "../features/cardio/UpdateCardioWorkoutSlice"


export const store=configureStore({
    reducer: {
        login: loginReducer,
        signup: signupReducer,
        cardioForm: cardioSliceReducer,
        [workoutApi.reducerPath]: workoutApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([workoutApi.middleware])
})

setupListeners(store.dispatch)
