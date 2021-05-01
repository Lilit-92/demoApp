import React, {Component} from 'react';
import './ToDo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import {Button,Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {formatDate} from "./utils";
import { Link } from "react-router-dom"
import {connect} from "react-redux"
import { removeTask } from "./action"



class Task extends Component{
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
                            <Card.Title>
                                <Link className="card-text-hover"
                                    to={`/task/${task._id}`}>
                                        {task.title}
                                
                                </Link>
                            </Card.Title>
                            <Card.Text>
                                Description: {task.description}
                            </Card.Text>
                            <Card.Text>
                                Date: {formatDate(task.date)}
                            </Card.Text>
                            <Card.Text>
                                Created At: {formatDate(task.created_at)}
                            </Card.Text>
                            <Button href="#" 
                                variant="danger"
                                onClick={() => this.props.removeTask(task._id)}
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
const mapDispatchToProps = {
    removeTask
}


export default connect(null, mapDispatchToProps)(Task)

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onCheck: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};