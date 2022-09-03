import React from 'react'

export default function AlertMessage(props) {
    return (
        <div class={`alert alert-${props.category} alert-dismissible fade show`} role="alert">
            <strong>Holy guacamole!</strong> {props.message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" />
        </div>
    )
}
