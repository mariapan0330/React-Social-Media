import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function EditPost(props) {
    let navigate = useNavigate()
    let location = useLocation()
    // let titleTest = location.state.post.title
    const [formTitle, setFormTitle] = useState(location.state.post.title)
    const [formContent, setFormContent] = useState(location.state.post.content)

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        var myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`)
        myHeaders.append('Content-Type', 'application/json')

        var formData = JSON.stringify({
            title: formTitle,
            content: formContent
        })

        fetch(`https://kekambas-blog.herokuapp.com//blog/posts/${location.state.post.id}`, {
            method: "PUT",
            headers: myHeaders,
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (!data.error){
                    console.log('Post successfully updated.')
                    props.flashMessage('Post successfully updated', 'success')
                    navigate('/')
                }
            })
    }

    if (props.loggedIn){
        return (
        <>
            <h1 className='text-center text-light mb-3 fs-1' id='formTitle'>Edit Post</h1>
            <form id='formForm' onSubmit={handleSubmit}>
                    <input type="text" className="createPostFields form-control fs-5 py-3 px-4 mb-4" placeholder="Title" name='title' value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
                    <input type="text" className="createPostFields form-control fs-5 py-3 px-4 mb-4" placeholder="Content" name='content' value={formContent} onChange={(e) => setFormContent(e.target.value)} />
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-light fs-4 py-3 px-4" id='submitPost'>&nbsp;Post&nbsp;</button>
                </div>
            </form>
        </>
        )}
        
    return (
        <div>You can't do that because you're not logged in.</div>
    )
}
