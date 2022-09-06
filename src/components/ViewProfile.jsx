import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function ViewProfile(props) {
    let navigate = useNavigate()
    let location = useLocation()

    // const [modal, setModal] = useState(<></>)
    // const [username, setUsername] = useState(location.state.user)
    let username = location.state.user
    let email = location.state.email
    const [posts, setPosts] = useState([])

    
    // useEffect(() => {
    //     var myHeaders = new Headers()
    //     myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`)
        
    //     fetch('https://kekambas-blog.herokuapp.com//auth/me', {
    //         method: 'GET',
    //         headers: myHeaders})
    //         .then(res => res.json())
    //         .then(data => {
    //             // console.log('App useEffect', data, 'username', data.username);
    //             console.log('My Profile: ', data.username, data.email);
    //             setUsername(data.username)
    //             setEmail(data.email)
    //     })
    // }, [])
        
    useEffect(() => {
        fetch('https://kekambas-blog.herokuapp.com//blog/posts')
            .then(res => res.json())
            .then(data => {
                let result = data.filter(filterUserPosts)
                console.log('my posts: ', result)
                setPosts(result)
        })
    }, [username])

    function filterUserPosts(post){
        return post.author.username === username
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
                        <h2 className="card-text">{username}</h2>
                        <h5 className="card-text">{email}</h5>
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
                                                <button className="post-author btn card-text mb-2 fs-5" onClick={() => navigate('/view-profile', {state:{user:post.author.username, email:post.author.email}})}>{post.author.username}</button>
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
