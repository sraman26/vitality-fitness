import React from 'react'
import { useGetCompletedWorkoutsQuery, useGetIncompletedWorkoutsQuery } from '../services/workout'
import { NavLink } from 'react-router-dom'
import '../App.css'// function WorkoutList()
const Workouts = () => {
    const { data:incompleted_workouts, isLoading:IncompleteLoading } = useGetIncompletedWorkoutsQuery()
    const { data:completed_workouts, isLoading:CompleteLoading } = useGetCompletedWorkoutsQuery()
    if (IncompleteLoading) return <div>Loading...</div>
    if (incompleted_workouts?.length === 0) return <div>No things</div>
    if (CompleteLoading) return <div>Loading...</div>
    if (completed_workouts?.length === 0) return <div>No things</div>


    return (
        <>
        <div className="container">
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
                                    if (workout.type === "Cardio"){
                                        var path = `Cardio/${workout.id}`
                                    }else{
                                        path = `Strength/${workout.id}`
                                    }
                                    return (
                                    <tr key={workout.id}>
                                        <td ><NavLink to={path}><button type="button" className="btn btn-outline-dark workoutLink">{ workout.workout_name }</button></NavLink></td>
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
                                    if (workout.type === "Cardio"){
                                        var path = `Cardio/${workout.id}`
                                    } else {
                                        path = `Strength/${workout.id}`
                                    }
                                    return (
                                    <tr key={workout.id}>
                                        <td ><NavLink to={path}><button type="button" className="btn btn-outline-dark workoutLink">{ workout.workout_name }</button></NavLink></td>
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
