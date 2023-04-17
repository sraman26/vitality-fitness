import React from 'react'
import { useGetCompletedWorkoutsQuery, useGetIncompletedWorkoutsQuery } from '../services/workout'

// function WorkoutList()
const Workouts = () => {
    const { data:incompleted_workouts, isLoading:IncompleteLoading } = useGetIncompletedWorkoutsQuery()
    const { data:completed_workouts, isLoading:CompleteLoading } = useGetCompletedWorkoutsQuery()

    console.log(incompleted_workouts)
    if (IncompleteLoading) return <div>Loading...</div>
    if (incompleted_workouts?.length === 0) return <div>No things</div>
    if (CompleteLoading) return <div>Loading...</div>
    if (completed_workouts?.length === 0) return <div>No things</div>


    return (
        <>
        <div className="">
            <div className="row row-cols-2">
                <div className="shadow p-4 mt-4">
                    <h1>Upcoming Workouts</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Workout Name</th>
                                <th>Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                incompleted_workouts.workouts.map(workout => {
                                    return (
                                    <tr key={workout.id}>
                                        <td>{ workout.workout_name }</td>
                                        <td>{ workout.type }</td>
                                        <td>{ workout.date }</td>
                                    </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="shadow p-4 mt-4">
                    <h1>Completed Workouts</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Workout Name</th>
                                <th>Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                completed_workouts.workouts.map(workout => {
                                    return (
                                    <tr key={workout.id}>
                                        <td>{ workout.workout_name }</td>
                                        <td>{ workout.type }</td>
                                        <td>{ workout.date }</td>
                                    </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>

    )
}


export default Workouts
