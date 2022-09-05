import React from 'react'

export default function EditPost(props) {

    const handleSubmit = async(e) => {
        e.preventDefault()
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
        )}
        
    return (
        <div>You can't do that because you're not logged in.</div>
    )
}
