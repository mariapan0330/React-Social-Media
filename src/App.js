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
import MyProfile from './components/MyProfile';
import ViewProfile from './components/ViewProfile';

function App() {
    // message useState: message is what will show up in the alerts. 
    const [message, setMessage] = useState(null) // defaults to null because we assume no pop ups need to be shown off the bat.

    // category useState: category dictates the color of the alert message
    const [category, setCategory] = useState(null)

    // loggedIn useState
    // const now = new Date()
    // checks local storage to make sure that you have a token and that it hasn't expired. If so, it marks you as logged in.
    const [loggedIn, setLoggedIn] = useState((localStorage.getItem('token') !== null ? true : false))

    console.log('TOKEN: ',localStorage.getItem('token'));

    // TODO: why does currentUser reset when I reload the page, but loggedIn does not?
    
    const flashMessage = (message, category) => {
        setMessage(message)
        setCategory(category)
    }

    const findCurrentUser = () => {
        var myHeaders = new Headers()
        myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`)
        
        fetch('https://kekambas-blog.herokuapp.com//auth/me', {
            method: 'GET',
            headers: myHeaders})
            .then(res => res.json())
            .then(data => {
                // console.log('App useEffect', data, 'username', data.username);
                setCurrentUser(data.username)
            })
    }
    const [currentUser, setCurrentUser] = useState(findCurrentUser())


    const login = () => {
        setLoggedIn(true);
        console.log('logged in?: ',loggedIn);
        findCurrentUser()
    }
    
    const logout = () => {
        localStorage.removeItem('token')
        console.log('logging out');
        // localStorage.removeItem('expiration')
        setLoggedIn(false)
        setCurrentUser(null)
    }

    
    useEffect(() => {
        console.log('APP: The state of login has changed.', loggedIn);
        console.log('APP: Current user: ', currentUser);
    }, [loggedIn])


    return (
        <>
            <Navbar loggedIn={loggedIn} logout={logout} currentUser={currentUser} />
            <div className="container">
                {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
                <Routes> {/* !!! These routes are not visible to the user. The visible links are in Navbar.js !!! */}
                    <Route path='/' element={<Index loggedIn={loggedIn} currentUser={currentUser} />}/>
                    <Route path='/view-post' element={<ViewPost flashMessage={flashMessage} loggedIn={loggedIn} currentUser={currentUser} />}/>
                    <Route path='/create-post' element={<CreatePost flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/view-profile' element={<ViewProfile flashMessage={flashMessage} loggedIn={loggedIn}/>} />
                    <Route path='/my-profile' element={<MyProfile flashMessage={flashMessage} loggedIn={loggedIn}/>} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} login={login}/>} />
                    <Route path='/signup' element={<Signup flashMessage={flashMessage}/>} />
                </Routes>
            </div>
        </>
    );
}

export default App;