import React from 'react'
import { NavLink } from "react-router-dom"
import { NavDropdown } from 'react-bootstrap'
import { useLogoutMutation, useGetAccountQuery } from "../services/workout"
import '../App.css'


function Nav() {
    const [logout] = useLogoutMutation()
    const {data:account, isLoading} = useGetAccountQuery()
    if(isLoading)
    {
        return
    }



    return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark navgradient" style={{ backgroundColor: "#FFA624"}}>
        <div className="container-fluid">
            <div id="logo">
                <NavLink aria-current="page" to="/">
                    <img src={require('../images/turtleicon.png')} style={{width: "50px", height: "50px"}}/>
                </NavLink>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {(account) ?
                    (
                        <>
                            <NavDropdown className="navhead" title="Account" id="nav-dropdown">
                                <NavDropdown.Item eventKey="4.1">
                                    <NavLink className="nav-link active dropdown-potato" onClick={logout} exact="true" to="/">Logout</NavLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown className="navhead" title="Workouts" id="nav-dropdown">
                                <NavDropdown.Item eventKey="4.1">
                                    <NavLink className="nav-link active dropdown-potato" aria-current="page" to="/Workouts">My Workouts</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.2">
                                    <NavLink className="nav-link active dropdown-potato" aria-current="page" to="Workouts/CardioForm">New Cardio Workout</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.3">
                                    <NavLink className="nav-link active dropdown-potato" aria-current="page" to="Workouts/StrengthForm">New Strength Workout</NavLink>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) :
                    (
                        <NavDropdown className="navhead" title="Account" id="nav-dropdown">
                            <NavDropdown.Item eventKey="4.1">
                                <NavLink className="nav-link active dropdown-potato" aria-current="page" to="/Login">Login</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.2">
                                <NavLink className="nav-link active dropdown-potato" aria-current="page" to="/Signup">Sign Up</NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                </ul>
            </div>
        </div>
    </nav>
    )
    }

export default Nav
