import {configureStore} from "@reduxjs/toolkit"
import loginReducer from "../features/auth/LoginSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { authApi } from "../services/auth"


export const store=configureStore({
    reducer: {
        login: loginReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware])
})

setupListeners(store.dispatch)
