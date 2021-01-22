import React, {Component} from 'react';
import {InputGroup, FormControl, Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";




export default class AddTask extends Component{

    state = {
        // inputValue: '',
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
        const {title, description} = this.state
        if(!title){
            return
        }
        const task = {
            title,
            description,
        }
        this.props.onAdd(task)

    }

    render(){
       const {title, toggle, date} = this.state;
       const {disabled, onClose} = this.props;
        
        return(
            <>
            <Modal show={true} onHide={onClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title> Add task</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                          
                                    <FormControl
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        onChange={(event) => this.handleChange(event, "title")}
                                        // value={title}
                                        onKeyDown={(event) => this.onKeyDown(event)}
                                        disabled={disabled}
                                    />      
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        
                                        <Form.Control as="textarea" rows={3} 
                                           onChange={(event) => this.handleChange(event, "description")} 
                                        />
                                    </Form.Group>
                                    <DatePicker selected={date} onChange={date => console.log(date)} />
                        
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

            </>

        )
    }
}

AddTask.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    
}