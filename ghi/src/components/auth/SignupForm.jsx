import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  handleEmailChange,
  handlePasswordChange,
  handleFullNameChange,
  reset,
} from "../../features/auth/signupSlice";
import { useSignupMutation } from "../../services/workout";
import { useNavigate, NavLink } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup] = useSignupMutation();
  const { fields } = useSelector((state) => state.signup);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(fields)
      .unwrap()
      .then((e) => {
        dispatch(reset());
        navigate("/");
      })
      .catch((e) => {
        alert("Account already exists");
      });
  };
  return (
    <div className="auth-container">
      <video
        className="signup-video"
        src={require("../../images/authsplash.mp4")}
        autoPlay
        loop
        muted
      />
      <div className="card auth-form-cards">
        <div className="card-body">
          <h5 className="card-title">Signup</h5>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Signup__email" className="form-label">
                Email:
              </label>
              <input
                className="form-control form-control-sm"
                type={`text`}
                id="Signup__email"
                value={fields.email}
                onChange={(e) => dispatch(handleEmailChange(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Signup__password" className="form-label">
                Password:
              </label>
              <input
                className="form-control form-control-sm"
                type={`password`}
                id="Signup__password"
                value={fields.password}
                onChange={(e) => dispatch(handlePasswordChange(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Signup__fullName" className="form-label">
                Full Name:
              </label>
              <input
                className="form-control form-control-sm"
                type={`text`}
                id="Signup__fullName"
                value={fields.full_name}
                onChange={(e) => dispatch(handleFullNameChange(e.target.value))}
              />
            </div>
            <div className="createorupdate-button-container">
              <button type="submit" className="btn btn-success signup-button">
                Signup
              </button>
            </div>
            <div className="row existingaccount-container">
              <p>
                Already have an account?&nbsp;&nbsp;
                <NavLink className="existingaccount" to="/login">
                  Login
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
