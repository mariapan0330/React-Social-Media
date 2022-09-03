import React from 'react'

export default function Navbar(props) {
    if (props.loggedIn){
        return (
            <>
            <nav className="navbar navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand ms-4" href="/">pssst</a>
                    <button className='btn btn-outline-light' onClick={() => props.logout()}>Log Out</button>
                </div>
            </nav>
            </>
        )
    }

    return (
        <>
        <nav className="navbar navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand ms-4" href="/">pssst</a>
                <p>Not Logged In</p>
                {/* <a className="navbar-text nav-link me-4" href='/'>Not Logged In</a> */}
            </div>
        </nav>
        </>
    )
}
