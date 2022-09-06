import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AlertMessage from './components/AlertMessage';
import CreatePost from './components/CreatePost';
import Index from './components/Index';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import ViewPost from './components/ViewPost';
import EditPost from './components/EditPost';
import MyProfile from './components/MyProfile';
import ViewProfile from './components/ViewProfile';
import Modal from './components/Modal';

function App() {
    let navigate = useNavigate()

    // message useState: message is what will show up in the alerts. 
    const [message, setMessage] = useState(null) // defaults to null because we assume no pop ups need to be shown off the bat.
    const [category, setCategory] = useState(null)

    // modal: shows up to confirm you want to delete something.
    const [modalMessage, setModalMessage] = useState(null)
    const [modalTitle, setModalTitle] = useState(null)
    const [modalShowing, setModalShowing] = useState(false)
    const [modalFunction, setModalFunction] = useState(null)
    
    const [currPostId, setCurrPostId] = useState()
    const [currUserId, setCurrUserId] = useState(null)

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

    // TODO: flash modal does not work
    const flashModal = (modalTitle, modalMessage, modalFunction) => {
        setModalTitle(modalTitle)
        setModalMessage(modalMessage)
        setModalShowing(true)
        setModalFunction(modalFunction)
        console.log('modal function1:', modalFunction, typeof(modalFunction));
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
        navigate('/')
    }

    
    useEffect(() => {
        console.log('APP: The state of login has changed.', loggedIn);
        console.log('APP: Current user: ', currentUser);
        console.log('APP: Modal Fn: ', modalFunction);
    }, [loggedIn, currentUser, modalFunction])




    return (
        <>
            <Navbar loggedIn={loggedIn} logout={logout} currentUser={currentUser} />
            <div className="container">
                {message ? <AlertMessage message={message} category={category} flashMessage={flashMessage} /> : null}
                {/* {modalShowing ? <Modal modalTitle={modalTitle} modalMessage={modalMessage} flashModal={flashModal} setModalShowing={setModalShowing} modalFunction={modalFunction} 
                // handleDeletePost={handleDeletePost}
                /> : null} */}
                <Routes> {/* !!! These routes are not visible to the user. The visible links are in Navbar.js !!! */}
                    <Route path='/' element={<Index loggedIn={loggedIn} currentUser={currentUser} setCurrPostId={setCurrPostId} />}/>
                    <Route path='/view-post' element={<ViewPost 
                                                        flashMessage={flashMessage} 
                                                        loggedIn={loggedIn} 
                                                        currentUser={currentUser} 
                                                        flashModal={flashModal} 
                                                        // handleDeletePost={handleDeletePost} 
                                                        currPostId={currPostId} 
                                                        setCurrPostId={setCurrPostId} />}/>
                    <Route path='/create-post' element={<CreatePost flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/edit-post' element={<EditPost flashMessage={flashMessage} loggedIn={loggedIn} currentUser={currentUser} />} />
                    <Route path='/view-profile' element={<ViewProfile flashMessage={flashMessage} loggedIn={loggedIn} />} />
                    <Route path='/my-profile' element={<MyProfile flashMessage={flashMessage} loggedIn={loggedIn} logout={logout} flashModal={flashModal}/>} />
                    <Route path='/login' element={<Login flashMessage={flashMessage} login={login}/>} />
                    <Route path='/signup' element={<Signup flashMessage={flashMessage}/>} />
                </Routes>
            </div>
        </>
    );
}

export default App;