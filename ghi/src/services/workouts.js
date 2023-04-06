import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const workoutApi = createApi({
    reducerPath: "workoutApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}`,
        credentials: "include"
    }),
    endpoints:(builder) => ({
        getIncompletedWorkouts: builder.query({
            query: () => "/api/workouts/incompleted"


        }),
        getCompletedWorkouts:builder.query({
            query: () => "/api/workouts/completed/",
        }),
    }),
})

export const {useGetCompletedWorkoutsQuery, useGetIncompletedWorkoutsQuery} = workoutApi
