import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreatePost(props) {

    let navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()

        var myHeaders = new Headers()
        myHeaders.append('Authorization',`Bearer ${localStorage.getItem('token')}`)
        myHeaders.append('Content-Type','application/json')

        var formData = JSON.stringify({
            title: e.target.title.value,
            content: e.target.content.value
        });

        fetch("https://kekambas-blog.herokuapp.com//blog/posts", {
            method: 'POST',
            headers: myHeaders,
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log('you tried to submit a post')
                if (!data.error){
                    props.flashMessage("Post successfully created.", 'success')
                    navigate('/')
                    console.log('no errors:', data);
                }
            })
    }

    if (props.loggedIn){
        return (
        <>
            <h1 className='text-center text-light mb-3 fs-1' id='formTitle'>Create Post</h1>
            <form id='formForm' onSubmit={handleSubmit}>
                    <input type="text" className="createPostFields form-control fs-5 py-3 px-4 mb-4" placeholder="Title" name='title' />
                    <input type="text" className="createPostFields form-control fs-5 py-3 px-4 mb-4" placeholder="Content" name='content'/>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-light fs-4 py-3 px-4" id='submitPost'>&nbsp;Post&nbsp;</button>
                </div>
            </form>
        </>
    )} else {
        props.flashMessage('You can\'t do that because you\'re not logged in.','danger')
        navigate('/')
    }
}
