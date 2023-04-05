import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fields: {
        username: "",
        password: ""
    },
    errorMessage: null
}

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        handleUsernameChange: (state, action) => {
            state.fields.username = action.payload
        },
        handlePasswordChange: (state, action) => {
            state.fields.password = action.payload
        },
        reset: () => initialState
    }
})

export const { handleUsernameChange, handlePasswordChange, reset } = LoginSlice.actions;
export default LoginSlice.reducer;
