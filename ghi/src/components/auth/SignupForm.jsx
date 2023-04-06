import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    handleEmailChange
    , handlePasswordChange
    , handleFullNameChange
    , error
    , reset
} from '../../features/auth/signupSlice'
import { useSignupMutation } from '../../services/auth'

// Check error message import that Riley had



const Signup = () => {
    const dispatch = useDispatch()
    const [signup] = useSignupMutation()
    const {fields} = useSelector(state => state.signup)


    const handleSubmit = (e) => {
        e.preventDefault()
        // const {email, password, full_name} = fields
        console.log({fields})
        signup(fields)
        dispatch(reset())
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Signup</h5>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Signup__email" className='form-label'>
                            Email:
                        </label>
                        <input
                        className="form-control form-control-sm"
                        type={`text`}
                        id='Signup__email'
                        value={fields.email}
                        onChange={e => dispatch(handleEmailChange(e.target.value))} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__password" className='form-label'>
                            Password:
                        </label>
                        <input
                        className="form-control form-control-sm"
                        type={`password`}
                        id='Signup__password'
                        value={fields.password}
                        onChange={e => dispatch(handlePasswordChange(e.target.value))} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__fullName" className='form-label'>
                            Full Name:
                        </label>
                        <input
                        className="form-control form-control-sm"
                        type={`text`}
                        id='Signup__fullName'
                        value={fields.full_name}
                        onChange={e => dispatch(handleFullNameChange(e.target.value))}  />
                    </div>
                    <button type="submit" className="btn btn-success">Signup</button>
                </form>
            </div>
        </div>
    )
}
export default Signup;
