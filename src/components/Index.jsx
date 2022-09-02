import React from 'react'
import { useNavigate} from 'react-router-dom'

export default function Index(props) {
    let navigate = useNavigate();
    return (
        <>
            {props.loggedIn ? 
                <></>
                :
                <>
                    <div className="d-flex justify-content-center">
                        <div className="row justify-content-center">
                            <button type="button" id='mainPageButt1' className="btn btn-light px-5 pt-4 pb-3 mb-4"
                            onClick={() => navigate('/login')}
                            >Log&nbsp;In</button>
                            <button type="button" id='mainPageButt2' className="btn btn-dark form-control w-50 py-3 fs-4">Sign&nbsp;Up</button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
