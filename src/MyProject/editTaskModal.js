import React, {Component, createRef} from 'react';
import { Button, Modal, Form, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from "./utils";
import { connect } from "react-redux";
import  {editTask} from "./action"

 class EditTaskModal extends Component {
    constructor (props) {
        super(props);
        const {date} = props.data
        this.state = {
            ...props.data,
            date: date ? new Date(date) : new Date()
        }
        this.titleRef = createRef(null)
    }
    componentDidMount(){
      this.titleRef.current.focus()
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
        const editedTask = {
          ...this.state,
          date:  formatDate(date.toISOString())
        }
        this.props.editTask(editedTask, this.props.from)
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
                              ref= {this.titleRef}
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
    );
  }
}

const mapDispatchToProps = {
  editTask
}

export default connect(null, mapDispatchToProps )(EditTaskModal)

EditTaskModal.ptopTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};



