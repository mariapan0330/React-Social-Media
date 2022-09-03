import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(props) {
    let navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        console.log('You tried to log in.');
        console.log(e);

        // TODO: on submit, make a get request to the API to get a new token
        // It will use a token which you can only get if you're already a user in the db??
        let username = e.target.username.value
        let password = e.target.password.value

        let myHeaders = new Headers()
        // myHeaders.append('Authorization', `Basic bWFyaWE6bWFyMTIz`)
        myHeaders.append('Authorization', `Basic ${btoa(`${username}:${password}`)}`)

        let response = await fetch('http://kekambas-blog.herokuapp.com//auth/token', {
            method: "POST",
            headers: myHeaders})
        console.log('got past fetch')
        // console.log(response);
        // let dat = await response.text()
        // console.log(dat)
        if (response.ok){
            let data = await response.json()
            localStorage.setItem('token', data.token)
            localStorage.setItem('expiration', data.token_expiration)
            
            console.log('response is okay, token: ',localStorage.getItem('token'))
            props.login()
            props.flashMessage('You have successfully logged in!', 'success')
            navigate('/')
        }

    }


    return (
        <>
        <h1 className='text-center text-light mb-3 fs-1' id='formTitle'>Login</h1>
        <form id='formForm' onSubmit={handleSubmit}>
                <input type="username" className="formComponents form-control fs-3 py-3 px-4 mb-4" placeholder="Username" name='username' />
                <input type="password" className="formComponents form-control fs-3 py-3 px-4 mb-4" placeholder="Password" name='password'/>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark fs-4 py-3 px-4" id='submitLogin' >Submit</button>
            </div>
        </form>
        </>
    )
}
