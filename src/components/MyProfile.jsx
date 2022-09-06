import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MyProfile(props) {
    let navigate = useNavigate()

    // const [modal, setModal] = useState(<></>)
    const [username, setUsername] = useState(<></>)
    const [showUserEdit, setShowUserEdit] = useState(<i className="fa-sharp fa-solid fa-pencil" />)
    // const [showEmailEdit, setShowEmailEdit] = useState(<i className="fa-sharp fa-solid fa-pencil" />)
    const [email, setEmail] = useState(<></>)
    const [posts, setPosts] = useState([])

    
    useEffect(() => {
        var myHeaders = new Headers()
        myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`)
        
        fetch('https://kekambas-blog.herokuapp.com//auth/me', {
            method: 'GET',
            headers: myHeaders})
            .then(res => res.json())
            .then(data => {
                // console.log('App useEffect', data, 'username', data.username);
                console.log('My Profile: ', data.username, data.email);
                setUsername(data.username)
                setEmail(data.email)
        })
    }, [])
        
    useEffect(() => {
        fetch('https://kekambas-blog.herokuapp.com//blog/posts')
            .then(res => res.json())
            .then(data => {
                let result = data.filter(filterMyPosts)
                console.log('my posts: ', result)
                setPosts(result)
        })
    }, [username])

    function filterMyPosts(post){
        return post.author.username === username
    }

    function editUsername(e){
        
    }


    if(!props.loggedIn){
        props.flashMessage('You can\'t do that because you\'re not logged in.', 'danger')
        navigate('/')
    }


    return (
        <>
        {/* PROFILE CARD */}
        <div className="my-profile row align-items-start">
            <div className="profile-card-col col-4 sticky-top">
                <div className="profile-card card mt-5">
                    <div className="card-body text-center">
                        <h1 className="card-title pt-4"><i className="fa-solid fa-user" /></h1>
                        <h2 className="card-text">{username} &nbsp;
                            {/* <span className='edit-pencil fs-4' onClick={() => {
                                setShowUserEdit(<span/>)
                                setUsername(
                                    <form onSubmit={editUsername} className="d-flex justify-content-center">
                                        <input type="text" className="form-control fs-5 w-50" placeholder="username" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                                        <span type="submit" className="edit-pencil" id='submitUsername'><i className="fa-sharp fa-solid fa-pencil" /></span>
                                    </form>
                                )}}>{showUserEdit}</span> */}
                        </h2>
                        <h5 className="card-text">{email}</h5>
                        <br></br>
                        <button className="btn btn-dark mb-2" onClick={() => props.logout()}>Logout &nbsp;&nbsp;<i className="fa-solid fa-right-from-bracket fs-5 pt-1" /></button>
                        {/* <button className='btn btn-light me-3 fs-4' onClick={() => props.logout()}><i className="fa-solid fa-right-from-bracket"></i></button> */}
                        {/* <br /> */}
                        {/* <button className="btn btn-outline-danger mb-1" onClick={() => 
                            // props.flashModal('your account','This will delete your profile and all your posts. This action CANNOT be undone!')
                            handleDeleteUser()
                            }>Delete Account &nbsp;&nbsp;<i className="pt-1 fs-5 fa-solid fa-trash" /></button> */}
                        {/* <p>Deletes your profile and all your posts. <strong>WARNING! This action cannot be undone.</strong></p> */}
                    </div>
                </div>
            </div>

            {/* YOUR POSTS */}
            <div className="profile-col col-8">
            {posts.map((post, idx) => {
                    return (
                        <>
                            <div className="d-flex justify-content-center">
                                <div className="card mb-5 p-5 fs-5" id='index-card'>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-center">
                                            <button className="post-title btn card-text text-center fs-5" onClick={() =>{
                                                // post.setCurrPostId(post.id)
                                                navigate('/view-post',{state:{post:post}})
                                        }}>{post.title}</button>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <p className="card-text mb-2">{post.date_created}</p>
                                        </div>
                                        <p className="card-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{post.content}</p>
                                        <div className="d-flex justify-content-end">
                                            {post.author.username === props.currentUser ? 
                                                <>
                                                <button className="post-author btn card-text mb-2 fs-5" onClick={() => navigate('/my-profile')}>{post.author.username} (You!)</button>
                                                </>
                                                :
                                                <button className="post-author btn card-text mb-2 fs-5" onClick={() => navigate('/user')}>{post.author.username}</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }).reverse()}
            </div>
        </div>
        </>
    )
}
