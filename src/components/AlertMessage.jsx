import React from 'react'

export default function AlertMessage(props) {
    return (
        <div className={`alert alert-${props.category} alert-dismissible fade show`} role="alert">
            <strong>Holy guacamole!</strong> {props.message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" />
        </div>
    )
}