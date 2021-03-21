import React from 'react';

import Button from './FormElements/Button';
import Modal from '../../components/Modal';

const ErrorModal = props => {
  return (
    
    <Modal 
    onHide={props.onClear}
    title="Otkrivena greska"
    show={!!props.error}
    body={props.error}
    footer={<Button onClick={props.onClear}>Ok</Button>} />

  );
};

export default ErrorModal;
