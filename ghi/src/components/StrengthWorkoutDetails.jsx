import React from 'react'
import { useGetStrengthWorkoutDetailsQuery, useDeleteStrengthWorkoutMutation } from '../services/workout'
import { NavLink, useParams, useNavigate } from 'react-router-dom'


const StrengthWorkoutDetail = () => {

    let {workoutId} = useParams()

    let navigate = useNavigate()

    const{data: details, isLoading:Loading} = useGetStrengthWorkoutDetailsQuery(workoutId)
    const[deleteWorkout] = useDeleteStrengthWorkoutMutation();

    if(Loading) return <div>Loading the page--just a moment</div>
    if(details?.length===0) return <div>This workout does not exist</div>

    function handleDelete(workoutId){
        deleteWorkout(workoutId)
        navigate("/Workouts")
    }
    function handleUpdate(workoutId){
        navigate(`/Workouts/Strength/${workoutId}/Update`)
    }

    return(
        <>
            <div className="container">
                <div>
                    <div className="shadow p-4 mt-4">
                        <h1>{details.workout_name} - {details.date} - {details.status}</h1>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Exercise</th>
                                    <th>Muscle</th>
                                    <th>Reps</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {details.exercises.map((exercise, i) =>{
                                return(
                                <tr key={i}>
                                    <td>{ exercise.name }</td>
                                    <td>{ exercise.muscle }</td>
                                    <td>{ exercise.reps }</td>
                                    <td>{ exercise.notes }</td>
                                </tr>
                                )

                                })}
                            </tbody>
                        </table>
                        <button className="btn btn-danger" onClick = {() => {handleDelete(workoutId)}} >Delete</button>
                        <button className="btn btn-success" onClick = {() => {handleUpdate(workoutId)}} >Update</button>
                    </div>
                </div>
            </div>
        </>
    )
}



export default StrengthWorkoutDetail
