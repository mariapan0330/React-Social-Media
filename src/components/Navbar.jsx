import React from 'react'

export default function Navbar(props) {
  return (
    <>
    <nav className="navbar navbar-dark">
        <div className="container-fluid">
            <a className="navbar-brand ms-4" href="/">pssst</a>
            {props.loggedIn ?
            <button className='btn btn-outline-light' onClick={props.logout()}>Log Out</button>
            :
            <>You are not logged in</>
            // <a className="navbar-text nav-link me-4" href='/'>Not Logged In</a>
            }
        </div>
    </nav>
    </>
  )
}
