import React from 'react'
import { useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Index(props) {
    let navigate = useNavigate();

    const [posts,setPosts] = useState([])


    useEffect(() => {
        fetch('https://kekambas-blog.herokuapp.com//blog/posts')
            .then(res => res.json())
            .then(data => {
                console.log('index data: ',data)
                setPosts(data)
            })
    }, []) // blank [] at the end makes it run only once

    // console.log('Index Data: POSTS',posts);
    return (
        <>
            {props.loggedIn ? 
                <>
                {/* If you are logged in, view all posts. */}
                {posts.map((post, idx) => {
                    return (
                        <>
                            <div className="d-flex justify-content-center">
                                <div className="card mb-5 p-5 fs-5" id='index-card'>
                                    <div className="card-body">
                                        <div className="d-flex justify-content-center">
                                            <button className="post-title btn card-text text-center fs-5" onClick={() => navigate('/view-post',{state:{post:post}})}>{post.title}</button>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <p className="card-text mb-2">{post.date_created}</p>
                                        </div>
                                        <p className="card-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{post.content}</p>
                                        <div className="d-flex justify-content-end">
                                            {post.author.username === props.currentUser ? 
                                            <>
                                            <button className="post-author btn card-text mb-2 fs-5" onClick={() => navigate('/user')}>{post.author.username} (You!)</button>
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
                </>
                :
                <>
                    {/* If you are not logged in, view the login and signup buttons. */}
                    <div className="d-flex justify-content-center">
                        <div className="row justify-content-center">
                            <button type="button" id='mainPageButt1' className="btn px-5 pt-4 pb-3 mb-4" onClick={() => navigate('/login')}>Log&nbsp;In</button>
                            <button type="button" id='mainPageButt2' className="btn btn-dark form-control w-50 py-3 fs-4" onClick={() => navigate('/signup')}>Sign&nbsp;Up</button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
