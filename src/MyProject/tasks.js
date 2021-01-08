import React, {Component} from 'react';
import './ToDo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import {Button,Card } from 'react-bootstrap';
import PropTypes from 'prop-types';



export default class Task extends Component{
    state = {
        checked : false,
    }

    

    handleCheck = () => {
        this.setState({
            checked: !this.state.checked,
        })
        const {onCheck, data} = this.props
        onCheck(data._id)
    }
   


    render(){
        const task = this.props.data
        const {checked} = this.state
        const {disabled} = this.props
        return(
            <>
            <Card>
              <div className={checked ? "task" : ""}> 
                        <Card.Body>
                            <input 
                                type='checkbox'
                                onClick={this.handleCheck}
                               
                                
                            ></input>
                            <Card.Title>{task.title}</Card.Title>
                            <Card.Text>{task.descriptioin}</Card.Text>
                            <Button href="#" 
                                variant="danger"
                                onClick={() => this.props.onRemove(task._id)}
                                disabled={disabled}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            <Button href="#" 
                                variant="success"
                                onClick={() => this.props.onEdit(task)}
                                disabled={disabled}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </Card.Body>
                </div>
            </Card>
           
            </>
        )
    }
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};