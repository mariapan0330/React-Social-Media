import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {

    let navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        let password = e.target.password.value
        let confirmPassword = e.target.confirmPassword.value
        if (password !== confirmPassword){
            props.flashMessage('Your passwords don\'t match', 'danger')
        } else {
            console.log('Trying to post to api');
            let myHeaders = new Headers()
            myHeaders.append('Content-Type', 'application/json')

            let formData = JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: password
            })

            fetch("https://kekambas-blog.herokuapp.com//auth/users", {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (!data.error){
                        props.flashMessage("Congrats! You've registered! Login now to start creating!", 'success')
                        navigate('/')
                    }
                })
        }
    }



    return (
        <>
        <h1 className='text-center text-light mb-3 fs-1' id='formTitle'>Sign Up</h1>
        <form id='formForm' onSubmit={handleSubmit}>
                <input type="email" className="formComponents form-control fs-3 py-3 px-4 mb-4" placeholder="Email" name='email' />
                <input type="username" className="formComponents form-control fs-3 py-3 px-4 mb-4" placeholder="Username" name='username' />
                <input type="password" className="formComponents form-control fs-3 py-3 px-4 mb-4" placeholder="Password" name='password'/>
                <input type="password" className="formComponents form-control fs-3 py-3 px-4 mb-4" placeholder="Confirm Password" name='confirmPassword'/>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-dark fs-4 py-3 px-4" id='submitSignup'>Submit</button>
            </div>
        </form>
        </>
    )
}
