import React from 'react';
import {Modal} from 'react-bootstrap';

const ModalComponent = (props) => {
    return(
        <Modal className={props.className}  show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
    <Modal.Footer className={props.footerClass}>{props.footer}</Modal.Footer>
        </Modal>
    )
    
}

export default ModalComponent;