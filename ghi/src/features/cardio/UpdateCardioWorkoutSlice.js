import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fields: {
        workout_name: "",
        exercise: "",
        date: "",
        type: "Cardio",
        duration: "",
        notes: "",
        status: "Incomplete",
        id: ""
    },
    errorMessage: null
}

const updateCardioSlice = createSlice( {
    name: "updateCardioWorkout",
    initialState,
    reducers: {
        handleWorkoutNameUpdate: (state, action) => {
            state.fields.workout_name = action.payload
        },
        handleExerciseUpdate: (state, action) => {
            state.fields.exercise = action.payload
        },
        handleDateUpdate: (state, action) => {
            state.fields.date = action.payload
        },
        handleDurationUpdate: (state, action) => {
            state.fields.duration = action.payload
        },
        handleNotesUpdate: (state, action) => {
            state.fields.notes = action.payload
        },
        handleStatusUpdate: (state, action) => {
            state.fields.status = action.payload
        },
        handleIdUpdate: (state, action) => {
            state.fields.id = action.payload
        },
        resetUpdate: () => initialState
    }
})

export const {
    handleWorkoutNameUpdate,
    handleExerciseUpdate,
    handleDateUpdate,
    handleDurationUpdate,
    handleNotesUpdate,
    handleStatusUpdate,
    handleIdUpdate,
    resetUpdate
    } = updateCardioSlice.actions
export default updateCardioSlice.reducer