import React, { useEffect } from 'react'

export default function Modal(props) {
    useEffect(() => {}, [props.modalFunction])
    console.log('modal function2:', props.modalFunction, typeof(props.modalFunction));
  return (
    <div className="modalBg mb-4">
        <div className="">
            <div className="modalContainer">
                <div className="modal-header">
                    <h3 className='text-center mb-3'>Are you sure you want to delete {props.modalTitle}?</h3>
                </div>
                <div className="modal-body">
                    <h5>{props.modalMessage}</h5>
                </div>
                <div className="modal-footer">
                    <button type='button' className='btn btn-outline-light me-2 fs-5' onClick={() => {props.setModalShowing(false)}}>Cancel</button>
                    <button type='button' className='btn btn-dark fs-5' onClick={() => {props.modalFunction()}}>Delete</button>
                </div>
            </div>
        </div>
    </div>
  )
}
