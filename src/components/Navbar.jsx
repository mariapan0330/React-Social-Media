import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar(props) {
    let navigate = useNavigate()

    if (props.loggedIn){
        // if logged in, view the log out button and the create post button
        return (
            <>
            <nav className="navbar navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand ms-4" href="/">pssst</a>
                    <div>{/* This is all at the right end of the nav bar. */}
                        <button className='btn btn-light me-3 fs-4' onClick={() => navigate('/create-post')}><i className="fa-solid fa-plus" /></button>
                        {/* <button className='nav-logout btn btn-outline-light me-3' onClick={() => props.logout()}>Log Out</button> */}
                        <button className='btn btn-light me-3 fs-4' onClick={() => navigate('/my-profile')}><i className="fa-solid fa-user"></i></button>
                    </div>

                </div>
            </nav>
            </>
        )
    }

    return (
        // if not logged in, view only the logo
        <>
        <nav className="navbar navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand ms-4" href="/">pssst</a>
            </div>
        </nav>
        </>
    )
}
