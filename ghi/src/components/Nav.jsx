import React from 'react'
import { NavLink, Link } from "react-router-dom"
import { NavDropdown} from 'react-bootstrap'
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
                                <NavDropdown.Item eventKey="4.1" className="nav-link active dropdown-Nav" onClick={logout} exact="true" as={Link} to="/">Logout</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown className="navhead" title="Workouts" id="nav-dropdown">
                                <NavDropdown.Item eventKey="4.1" className="nav-link active dropdown-Nav" aria-current="page" as={Link} to="/Workouts">My Workouts</NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.2" className="nav-link active dropdown-Nav" aria-current="page" as={Link} to="Workouts/CardioForm">New Cardio Workout</NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.3" className="nav-link active dropdown-Nav" aria-current="page" as={Link} to="Workouts/StrengthForm">New Strength Workout</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) :
                    (
                        <NavDropdown className="navhead" title="Account" id="nav-dropdown">
                            <NavDropdown.Item eventKey="4.1" className="nav-link active dropdown-Nav" aria-current="page" as={Link} to="/Login">Login</NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.2" className="nav-link active dropdown-Nav" aria-current="page" as={Link} to="/Signup">Sign Up</NavDropdown.Item>
                        </NavDropdown>
                    )}
                </ul>
            </div>
        </div>
    </nav>
    )
    }

export default Nav
