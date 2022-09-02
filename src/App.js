import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AlertMessage from './components/AlertMessage';
import CreatePost from './components/CreatePost';
import Index from './components/Index';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';

function App() {
    // message useState: message is what will show up in the alerts. 
    const [message, setMessage] = useState(null) // defaults to null because we assume no pop ups need to be shown off the bat.

    // category useState: category dictates the color of the alert message
    const [category, setCategory] = useState(null)

    // loggedIn useState
    const now = new Date()
    // checks local storage to make sure that you have a token and that it hasn't expired. If so, it marks you as logged in.
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') && new Date(localStorage.getItem('expiration') > now ? true : false)))

    // TODO: does this work
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => { // if the loggedIn state changes, it checks if there is a token that's in an acceptable time range, then sets the current user to that user
        if (localStorage.getItem('token') && new Date(localStorage.getItem('expiration') > now)) {
            var myHeaders = new Headers()
            myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`)

            fetch('https://kekambas-blog.herokuapp.com//auth/me', {
                method: 'GET',
                headers: myHeaders})
                .then(res => res.json())
                .then(data => {
                    console.log('App useEffect', data, 'username', data.username);
                    setCurrentUser(data.username)
                })
        } else { // if they are logged in but their token is expired, set current user to null and logout. (i hope this works)
            setCurrentUser(null)
            logout()
        }
    }, [loggedIn])

    const flashMessage = (message, category) => {
        setMessage(message)
        setCategory(category)
    }

    const login = () => {setLoggedIn(true)}
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('expiration')
        setLoggedIn(false)
    }

    

    return (
        <>
            <Navbar loggedIn={loggedIn} logout={logout} />
            <div className="container">
                <Routes> {/* !!! These routes are not visible to the user. The visible links are in Navbar.js !!! */}
                    {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
                    <Route path='/' element={<Index />} />
                    <Route path='/create-post' element={<CreatePost flashMessage={flashMessage} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} login={login} />} />
                    <Route path='/signup' element={<Signup flashMessage={flashMessage}/>} />
                </Routes>
            </div>
        </>
    );
}

export default App;