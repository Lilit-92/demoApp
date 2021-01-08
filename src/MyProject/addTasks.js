import React, {Component} from 'react';
import {InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';




export default class AddTask extends Component{

    state = {
        inputValue: '',
        toggle: false,
    }

    handleChange=(event)=>{
        this.setState({
            inputValue:event.target.value
        })
        
    }

    onKeyDown=(event)=>{
        if(event.key==='Enter'){
            this.addTask()
           
        }
    }
    addTask = () => {
        const {inputValue} = this.state
        if(!inputValue){
            return
        }
        const task = {
            title:inputValue,
        }
        this.props.onAdd(task)

        this.setState({
            inputValue: '',
        });
        this.toggleAddModal()
    }

    toggleAddModal = () => {
        
        this.setState({
            toggle: !this.state.toggle,
        });
 
    }

    render(){
       const {inputValue, toggle} = this.state;
       const {disabled} = this.props;
        
        return(
            <>
                <Button
                    variant="outline-primary"
                    onClick={this.toggleAddModal}
                    // disabled={!inputValue}
                   
                >
                    Add
                </Button>
            
           {toggle &&   
            <Modal show={true} onHide={this.toggleAddModal} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title> Add task</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <InputGroup className='mb-3'>
                                    <FormControl
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                        onChange={(event) => this.handleChange(event)}
                                        value={inputValue}
                                        onKeyDown={(event) => this.onKeyDown(event)}
                                        disabled={disabled}
                                    />      
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.addTask}
                                        disabled={!inputValue}
                                    
                                    >
                                        Add
                                    </Button>
                                    <Button variant="danger" onClick={this.toggleAddModal}>
                                        Cancel
                                    </Button>
                                </InputGroup>
                        </Modal.Body>
                
                </Modal>
                }
            </>

        )
    }
}

AddTask.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    
}