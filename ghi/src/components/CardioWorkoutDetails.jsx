import React from 'react'
import { useGetCardioWorkoutDetailsQuery, useDeleteCardioWorkoutMutation } from '../services/workout'
import { NavLink, useParams, useNavigate } from 'react-router-dom'

const WorkoutDetail = () => {

    let {workoutId} = useParams()
    console.log("AAAAAAAAAAA", workoutId)

    let navigate = useNavigate()

      
    
    const {data:details, isLoading:Loading} = useGetCardioWorkoutDetailsQuery(workoutId);
    const[deleteWorkout] = useDeleteCardioWorkoutMutation(); 


    if(Loading) return <div>Loading the page--just a moment</div>
    if(details?.length===0) return <div>This workout does not exist</div>

    function handleDelete(workoutId){
        deleteWorkout(workoutId)
        navigate("/Workouts")
    }
    function handleUpdate(workoutId){
        navigate(`/Workouts/${workoutId}/Update`)
    }
    

    return (
        <div className="container">
            <div>
                <div className="shadow p-4 mt-4">
                    <h1>{details.workout_name}</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Exercise</th>
                                <th>Duration/ Distance</th>
                                <th>Notes</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={details.id}>
                                <td>{ details.exercise }</td>
                                <td>{ details.duration }</td>
                                <td>{ details.notes }</td>
                                <td><button className="btn btn-danger" onClick = {() => {handleDelete(workoutId)}} >Delete</button></td>
                                <td><button className="btn btn-success" onClick = {() => {handleUpdate(workoutId)}} >Update</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default WorkoutDetail