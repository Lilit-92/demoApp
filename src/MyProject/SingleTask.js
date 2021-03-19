import React , { PureComponent } from "react";
import {Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
// import Spinner from "./Spinner";
import {formatDate} from "./utils";
import EditTaskModal from "./editTaskModal";
import {connect} from "react-redux";
import {getSingleTask, removeSingleTask, removeTask} from "./action"


class SingleTask extends PureComponent{
    state= {
        openEditModal: false
    }

    componentDidMount () {
        const taskId= this.props.match.params.id
        this.props.getSingleTask(taskId)
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.editTaskSuccess && this.props.editTaskSuccess){
            this.setState({
                openEditModal: false
    
               })
        }
    }
   

    onRemove = () => {
        const taskId= this.props.match.params.id
        this.props.removeSingleTask(taskId)
        // this.props.history.push("/")

        // fetch(`http://localhost:3001/task/${taskId}`,{
        //     method:'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json'
                
        //       },
            
        // })
        // .then((res) => res.json())
        // .then((response)=> {
        //     if(response.error){
        //         throw response.error
        //     }
        //    this.props.history.push("/")
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
    }

    taggleEditModal = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        })
    }

    saveTask = (data) => {
       
    } 


    render(){
        const { openEditModal} = this.state
        const { task } = this.props
        return(
            <>
            
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
                     <p>Theres no task to show!!</p>
               }
               { openEditModal &&
                  <EditTaskModal
                    from="single"
                    data={task}
                    onClose={this.taggleEditModal}
                  />  
               }
            </>
        )
    }
}



const mapStateToProps = (state) => {
    return {
        task: state.tasks,
        editTaskSuccess: state.editTaskSuccess
    }
}

const mapDispatchToProps = {
    getSingleTask,
    removeSingleTask,
    removeTask
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);