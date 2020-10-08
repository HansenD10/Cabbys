import React, { SFC } from 'react';

import '../styles/_modal.scss';
import { ElementModels } from '@kentico/kontent-delivery';

interface ModalProps {
  isOpen: boolean;
  image: ElementModels.AssetModel | undefined;
  handleClose: () => void;
}

const Modal: SFC<ModalProps> = ({
  isOpen,
  image,
  handleClose
}: ModalProps): React.ReactElement => (
  <div
    onClick={handleClose}
    className={`modal-wrapper ${isOpen ? 'open' : ''}`}
  >
    <div className="image-container container">
      {isOpen && image && <img src={image.url} alt={image.name} />}
    </div>
  </div>
);

export default Modal;
