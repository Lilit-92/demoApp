import React, {Component} from 'react';
import { Button, Modal, Form, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from "./utils";

export default class EditTaskModal extends Component {
    constructor (props) {
        super(props);
        const {date} = props.data
        this.state = {
            ...props.data,
            date: date ? new Date(date) : new Date()
        }
    }

    handleChange = (event) => {
      const {name, value}= event.target
        this.setState({
            [name]: value
        })
       
    }

    handleSave = () => {
        const {title, date} = this.state
        if(!title){
            return
        }
        this.props.onSave({...this.state, date: formatDate(date.toISOString())})
    }

    handleDateChange = (date) => {
      this.setState({
        date
      })
    }


  render(){
      const {title,description, date} = this.state
      const {props} = this;

    return (
          <Modal show={true} 
          onHide={props.onClose} 
          animation={false}
          centered>
              <Modal.Header closeButton>
                  <Modal.Title> Add task</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                          <FormControl
                              name="title"
                              value={title}
                              placeholder="title"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              onChange={this.handleChange}
                              // onKeyDown={(event) => this.onKeyDown(event)}
                              // disabled={disabled}
                          />      
                          <Form.Group controlId="exampleForm.ControlTextarea1">
                              <Form.Control as="textarea" rows={3} 
                                name="description"
                                value={description}
                                placeholder="description"
                                onChange={this.handleChange} 
                              />
                          </Form.Group>
                          <DatePicker 
                            selected={date} 
                            onChange={this.handleDateChange} 
                          />
              </Modal.Body>
              <Modal.Footer>
                          <Button
                              variant="outline-primary"
                              onClick={this.handleSave}
                              disabled={!title}
                          >
                              Add
                          </Button>
                          <Button variant="danger"
                           onClick={props.onClose}
                           >
                              Cancel
                          </Button>
              </Modal.Footer>
      
      </Modal>
    
        // <Modal show={true} onHide={props.onClose} animation={false}>
        //   <Modal.Header closeButton>
        //     <Modal.Title> Edit task</Modal.Title>
        //   </Modal.Header>
        //   <Modal.Body>
        //       <input 
        //       type="text"
        //       value={title}
        //       onChange={this.handleChange}
        //       />
        //   </Modal.Body>
        //   <Modal.Footer>
        //     <Button variant="primary" onClick={this.handleSave}>
        //       Save
        //     </Button>
        //     <Button variant="danger" onClick={props.onClose}>
        //       Cancel
        //     </Button>
        //   </Modal.Footer>
        // </Modal>
  
    );
  }
}

EditTaskModal.ptopTypes = {
    data: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};



