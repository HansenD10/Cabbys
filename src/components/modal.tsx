import React, { SFC } from "react"

import "../styles/_modal.scss"
import { Asset } from "../models/KenticoModels";

interface ModalProps {
  isOpen: boolean;
  image: Asset | undefined;
  handleClose: () => void;
}

const Modal: SFC<ModalProps> = ({ isOpen, image, handleClose }: ModalProps) => {
  return (
    <div onClick={handleClose} className={`modal-wrapper ${isOpen ? 'open' : ''}`}>
      <div className="image-container container">
        {isOpen && image && <img src={image.url} alt={image.name} />}
      </div>
    </div>
  )
}

export default Modal;