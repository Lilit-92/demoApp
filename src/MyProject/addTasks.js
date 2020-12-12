import React, {Component} from 'react';
import {InputGroup, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';



export default class AddTask extends Component{

    state = {
        inputValue: '',
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
        this.props.onAdd(inputValue)

        this.setState({
            inputValue: '',
        });
    }

    render(){
       const {inputValue} = this.state;
       const {disabled} = this.props;
        
        return(
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
            </InputGroup>

        )
    }
}

AddTask.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
    
}