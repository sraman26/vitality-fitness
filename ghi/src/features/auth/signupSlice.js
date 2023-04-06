import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fields: {
        email: "",
        password: "",
        full_name: "",
    },
    errorMessage: null
}

const signupSlice = createSlice({
    name: "signup",
    initialState,
    reducers:{
        handleEmailChange: (state, action) => {
            state.fields.email = action.payload
        },
        handlePasswordChange: (state, action) => {
            state.fields.password = action.payload
        },
        handleFullNameChange: (state, action) => {
            state.fields.full_name = action.payload
        },
        error: (state, action) => {
            state.errorMessage = action.payload
        },
        reset: () => initialState
    }
})

export const {handleEmailChange, handlePasswordChange, handleFullNameChange, error, reset} = signupSlice.actions
export default signupSlice.reducer
