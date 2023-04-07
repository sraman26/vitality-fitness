import React from 'react'
import '../App.css'
import { useSelector, useDispatch } from 'react-redux'
import {
    handleDateChange,
    handleDurationChange,
    handleExerciseChange,
    handleNotesChange,
    handleStatusChange,
    handleWorkoutNameChange,
    reset
}
from '../features/cardio/CreateCardioWorkoutSlice'
import { useCreateCardioWorkoutsMutation } from '../services/workout'

const CardioWorkoutForm = () =>
{
    const dispatch = useDispatch()
    const [cardioworkoutform] = useCreateCardioWorkoutsMutation()
    const {fields} = useSelector(state => state.cardioForm)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({fields})
        cardioworkoutform(fields)
        dispatch(reset())
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">New Cardio Workout</h5>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="workout_name" className='form-label'>
                            Workout Name:
                        </label>
                        <input
                        className="form-control form-control-sm"
                        type={`text`}
                        id='workoutName'
                        value={fields.workout_name}
                        onChange={e => dispatch(handleWorkoutNameChange(e.target.value))} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exercise" className='form-label'>
                            Exercise:
                        </label>
                        <input
                        className="form-control form-control-sm"
                        type={`text`}
                        id='exercise'
                        value={fields.exercise}
                        onChange={e => dispatch(handleExerciseChange(e.target.value))} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className='form-label'>
                            Date:
                        </label>
                        <input
                        className="form-control form-control-sm"
                        type={`date`}
                        id='date'
                        value={fields.date}
                        onChange={e => dispatch(handleDateChange(e.target.value))}  />
                    </div>
                        <div className="mb-3">
                        <label htmlFor="duration" className='form-label'>
                            Duration:
                        </label>
                        <input
                        className="form-control form-control-sm"
                        type={`text`}
                        id='duration'
                        value={fields.duration}
                        onChange={e => dispatch(handleDurationChange(e.target.value))}  />
                    </div>
                        <div className="mb-3">
                        <label htmlFor="notes" className='form-label'>
                            Notes:
                        </label>
                        <textarea
                        className="form-control form-control-sm"
                        type={`text`}
                        id='notes'
                        value={fields.notes}
                        onChange={e => dispatch(handleNotesChange(e.target.value))}  />
                    </div>
                        <div className="mb-3">
                        <label htmlFor="status" className='form-label'>
                            Status:
                        </label>
                        <input
                        className="form-control form-control-sm"
                        type={`text`}
                        id='status'
                        value={fields.status}
                        onChange={e => dispatch(handleStatusChange(e.target.value))}  />
                    </div>
                    <button type="submit" className="btn btn-success">Create</button>
                </form>
            </div>
        </div>
    )
}
export default CardioWorkoutForm
