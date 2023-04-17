import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fields: {
        workout_name: "",
        exercise: "",
        date: "",
        type: "Cardio",
        duration: "",
        notes: "",
        status: "Incomplete"
    },
    errorMessage: null
}

const cardioSlice = createSlice( {
    name: "cardioForm",
    initialState,
    reducers: {
        handleWorkoutNameChange: (state, action) => {
            state.fields.workout_name = action.payload
        },
        handleExerciseChange: (state, action) => {
            state.fields.exercise = action.payload
        },
        handleDateChange: (state, action) => {
            state.fields.date = action.payload
        },
        handleDurationChange: (state, action) => {
            state.fields.duration = action.payload
        },
        handleNotesChange: (state, action) => {
            state.fields.notes = action.payload
        },
        handleStatusChange: (state, action) => {
            state.fields.status = action.payload
        },
        reset: () => initialState
    }
})

export const {
    handleWorkoutNameChange,
    handleExerciseChange,
    handleDateChange,
    handleDurationChange,
    handleNotesChange,
    handleStatusChange,
    reset
    } = cardioSlice.actions
export default cardioSlice.reducer
