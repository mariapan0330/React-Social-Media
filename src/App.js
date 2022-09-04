import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AlertMessage from './components/AlertMessage';
import CreatePost from './components/CreatePost';
import Index from './components/Index';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import ViewPost from './components/ViewPost';

function App() {
    // message useState: message is what will show up in the alerts. 
    const [message, setMessage] = useState(null) // defaults to null because we assume no pop ups need to be shown off the bat.

    // category useState: category dictates the color of the alert message
    const [category, setCategory] = useState(null)

    // loggedIn useState
    const now = new Date()
    // checks local storage to make sure that you have a token and that it hasn't expired. If so, it marks you as logged in.
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') !== null && new Date(localStorage.getItem('expiration') > now ? true : false)))

    console.log('TOKEN: ',localStorage.getItem('token'));
    console.log('EXPIRATION: ',localStorage.getItem('expiration'));

    // TODO: does this work
    const [currentUser, setCurrentUser] = useState(null)

    const flashMessage = (message, category) => {
        setMessage(message)
        setCategory(category)
    }

    const login = () => {
        setLoggedIn(true);
        console.log('logged in?: ',loggedIn);
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
    }
    
    const logout = () => {
        localStorage.removeItem('token')
        console.log('logging out');
        // localStorage.removeItem('expiration')
        setLoggedIn(false)
        setCurrentUser(null)
    }

    
    useEffect(() => {
        console.log('The state of login has changed.', loggedIn);
    }, [loggedIn])


    return (
        <>
            <Navbar loggedIn={loggedIn} logout={logout} currentUser={currentUser} />
            <div className="container">
                {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
                <Routes> {/* !!! These routes are not visible to the user. The visible links are in Navbar.js !!! */}
                    <Route path='/' element={<Index loggedIn={loggedIn} />}/>
                    <Route path='/view-post' element={<ViewPost flashMessage={flashMessage} loggedIn={loggedIn} />}/>
                    <Route path='/create-post' element={<CreatePost flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} login={login}/>} />
                    <Route path='/signup' element={<Signup flashMessage={flashMessage}/>} />
                </Routes>
            </div>
        </>
    );
}

export default App;