import React from 'react';
import { Button, Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Confirm (props) {

    return (
    
          <Modal show={true} onHide={props.onClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to delete this {props.count} tasks</Modal.Title>
            </Modal.Header>
           
            <Modal.Footer>
              <Button variant="primary" onClick={props.onClose}>
                Cancle
              </Button>
              <Button variant="danger" onClick={props.onSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
    
      );
}

Confirm.ptopTypes = {
    count: PropTypes.number,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
};



