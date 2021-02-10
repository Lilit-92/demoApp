import React , { PureComponent } from "react";
import {Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Spinner from "./Spinner";
import {formatDate} from "./utils";
import EditTaskModal from "./editTaskModal";


export default class SingleTask extends PureComponent{
    state= {
        task: null,
        openEditModal: false
    }

    componentDidMount () {
        const taskId= this.props.match.params.id
        fetch(`http://localhost:3001/task/${taskId}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
                
              },
            
        })
        .then((res) => res.json())
        .then((response)=> {
            if(response.error){
                throw response.error
            }
            this.setState({
                task: response
            })
           
           
        })
        .catch((error) => {
            console.log(error)
        })
    }

    onRemove = () => {
        const taskId= this.state.task._id
        fetch(`http://localhost:3001/task/${taskId}`,{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
                
              },
            
        })
        .then((res) => res.json())
        .then((response)=> {
            if(response.error){
                throw response.error
            }
           this.props.history.push("/")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    taggleEditModal = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        })
    }

    saveTask = (data) => {
        const taskId=this.state.task._id
        fetch(`http://localhost:3001/task/${taskId}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
                
              },
             body: JSON.stringify(data) 
            
        })
        .then((res) => res.json())
        .then((response)=> {
            if(response.error){
                throw response.error
            }
           
            this.setState({
                task:response,
                openEditModal: false
            })
           
           
        })
        .catch((error) => {
            console.log(error)
        })

       
    } 


    render(){
        const {task, openEditModal} = this.state
        return(
            <div>
               {!!task ?

                        <Card>
                                <div> 
                                        <Card.Body>
                                            <Card.Title>
                                                        {task.title}
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
                                                onClick={this.onRemove}
                                                
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                            <Button href="#" 
                                                variant="success"
                                                onClick={this.taggleEditModal}
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </Card.Body>
                                </div>
                        </Card>
                     :
                     <Spinner />
               }
               { openEditModal &&
                  <EditTaskModal
                    data={task}
                    onSave={this.saveTask}
                    onClose={this.taggleEditModal}
                  />  
               }
            </div>
        )
    }
}