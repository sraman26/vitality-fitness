const Signup = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Signup</h5>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Signup__username" className='form-label'>
                            Username:
                        </label>
                        <input className="form-control form-control-sm" type={`text`} id='Signup__username' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__password" className='form-label'>
                            Password:
                        </label>
                        <input className="form-control form-control-sm" type={`password`} id='Signup__password' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Signup__password_confirm" className='form-label'>
                            Confirm Password:
                        </label>
                        <input className="form-control form-control-sm" type={`password`} id='Signup__password_confirm' />
                    </div>
                    <button type="submit" className="btn btn-success">Signup</button>
                </form>
            </div>
        </div>
    )
}
export default Signup;
