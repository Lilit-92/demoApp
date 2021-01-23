import React, {Component} from 'react';
import { FormControl, Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from "./utils";



export default class AddTask extends Component{

    state = {
        title: "",
        description: "",
        date: new Date(),
        
    }

    handleChange=(event, type)=>{
        this.setState({
            [type]:event.target.value
        })
        
    }

    onKeyDown=(event)=>{
        if(event.key==='Enter'){
            this.addTask()
           
        }
    }
    addTask = () => {
        const {title, description, date} = this.state
        if(!title){
            return
        }
        const task = {
            title,
            description,
            date: formatDate(date.toISOString()),
        }
        this.props.onAdd(task)

    }
    handleDateChange = (date) => {
        this.setState({
            date
        })
    }

    render(){
       const {title, toggle, date} = this.state;
       const {disabled, onClose} = this.props;
        
        return(
            <Modal show={true} onHide={onClose} animation={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title> Add task</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                                    <FormControl
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        onChange={(event) => this.handleChange(event, "title")}
                                        onKeyDown={(event) => this.onKeyDown(event)}
                                        disabled={disabled}
                                    />      
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Control as="textarea" rows={3} 
                                           onChange={(event) => this.handleChange(event, "description")} 
                                        />
                                    </Form.Group>
                                    <DatePicker 
                                        selected={date} 
                                        onChange={(date) => this.handleDateChange(date)} 
                                    />
                        </Modal.Body>
                        <Modal.Footer>
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.addTask}
                                        disabled={!title}
                                    >
                                        Add
                                    </Button>
                                    <Button variant="danger" onClick={onClose}>
                                        Cancel
                                    </Button>
                        </Modal.Footer>
                
                </Modal>

        )
    }
}

AddTask.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onClose:PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    
}