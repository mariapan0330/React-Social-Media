import React from 'react'

export default function CreatePost(props) {
    if (props.loggedIn){
        return (
            <div>Create Post</div>
            )
        }
        
    return (
        <div>You can't do that because you're not logged in.</div>
    )
}
