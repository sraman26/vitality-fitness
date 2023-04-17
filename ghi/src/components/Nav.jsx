import React from 'react'
import { NavLink } from "react-router-dom"
import { useLogoutMutation } from "../services/workout"
import '../App.css'


function Nav() {
    const [logout] = useLogoutMutation()

    return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark navgradient" style={{ backgroundColor: "#FFA624"}}>
        <div className="container-fluid">
            <div id="logo">
                    <NavLink aria-current="page" to="/">
                        <img src={require('../images/turtleicon.png')} style={{width: "50px", height: "50px"}}/>
                    </NavLink>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/Login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" onClick={logout}>Logout</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/Signup">Sign Up!</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/Workouts">My Workouts</NavLink>
                    </li>
                      <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="Workouts/CardioForm">New Cardio Workout</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
    }

export default Nav
