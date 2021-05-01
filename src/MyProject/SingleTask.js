import React , { PureComponent } from "react";
import {Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
// import Spinner from "./Spinner";
import {formatDate} from "./utils";
import EditTaskModal from "./editTaskModal";
import {connect} from "react-redux";
import {getSingleTask, removeSingleTask } from "./action"


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
        this.props.history.push("/")
        window.location.reload()
       
    }

    taggleEditModal = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        })
    }


    render(){
        const { openEditModal} = this.state
        const { task } = this.props
        return (
            <>
            {console.log(task, "taskkkkkkkkkkkkk")}
            {console.log(!!task, "taskkkkkkkkkkkkk")}
               { !task.success ?

                        <Card className="single-card">
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
                     <h1 style={{textAlign:"center",color:"grey"}}>Theres no task to show!!</h1>
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
   
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);