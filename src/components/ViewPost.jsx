import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

//////////////////////
// View Single Post //
//////////////////////

export default function ViewPost(props) {
    const location = useLocation(); // takes state arguements from whatever used useNavigate to get here
    const navigate = useNavigate();

    if (props.loggedIn === false) {
        return (
            <>
            {props.flashMessage('You must be logged in to view posts!', 'danger')}
            {navigate('/')}
            </>
        )
    }

    function handleEditButton(){
        console.log('CLICKED: edit post');
        navigate('/edit-post', {state:{post: location.state.post}})
    }
    
    function handleDeleteButton(){
        // DELETE BUTTON
        console.log("CLICKED: delete post");
        var myHeaders = new Headers
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)

        fetch(`https://kekambas-blog.herokuapp.com//blog/posts/${location.state.post.id}`, {
            method: 'DELETE',
            headers: myHeaders
        })
            .then(res => res.json())
            .then(data => {
                console.log('post successfully deleted')
                if (!data.error){
                    props.flashMessage("Post successfully deleted.", 'success')
                    navigate('/')
                }
            })
    }


    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="card mb-5 p-5 fs-5" id='index-card'>
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <p className="card-text text-center fs-5" >{location.state.post.title}</p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <p className="card-text mb-2">{location.state.post.date_created}</p>
                        </div>
                        <p className="card-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{location.state.post.content}</p>
                        {props.currentUser === location.state.post.author.username ? 
                        <>
                        <div className="d-flex justify-content-end col">
                                <button className="btn btn-dark card-text me-2 pt-2 fs-5" onClick={() => handleEditButton()}>Edit</button>
                                <button className="btn btn-outline-dark card-text pt-2 fs-5" onClick={() => handleDeleteButton()}>Delete</button>
                        </div>
                        </>
                        :
                        <>
                        <div className="d-flex justify-content-end">
                            <button className="post-author btn card-text mb-2 fs-5" onClick={() => navigate('/user')}>{location.state.post.author.username}</button>
                        </div>
                        </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
