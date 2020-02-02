import React from "react"

import "../styles/_modal.scss"

const Modal = ({ isOpen, image, handleClose }) => {
  return (
    <div onClick={handleClose} className={`modal-wrapper ${isOpen ? 'open' : ''}`}>
      <div className="image-container container">
        {isOpen && <img src={image.url} alt={image.name} />}
      </div>
    </div>
  )
}

export default Modal;