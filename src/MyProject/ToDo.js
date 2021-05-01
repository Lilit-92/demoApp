import React, {PureComponent} from 'react';
import './ToDo.css';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Task from './tasks';
import AddTask from './addTasks';
import Confirm from './removeModal';
import Search from "./Search"; 
import EditTaskModal from './editTaskModal';
import {connect} from "react-redux";
import { getTasks, removeSelectedTask} from "./action";
// import request from "./request"

class ToDo extends PureComponent {

    state={
       editTask: null,
       selectedTasks: new Set(),
       toggle: false,
       openNewTaskModal: false,
       searchToggle:false,
    }

    componentDidMount() {
        this.props.getTasks()

    }
   

    componentDidUpdate(prevProps) {
        if(!prevProps.addTaskSuccess && this.props.addTaskSuccess){
            this.toggleNewTaskModal()
        }

        if(!prevProps.removeTasksSuccess && this.props.removeTasksSuccess){
           this.setState({
            selectedTasks: new Set(),
            toggle: false,

           })
        }
        if(!prevProps.editTaskSuccess && this.props.editTaskSuccess){
            this.setState({
               editTask: null
    
               })
        }
    }
   
    handleCheck = (taskId) => {
        const selectedTasks= new Set(this.state.selectedTasks)
        if(selectedTasks.has(taskId)){
            selectedTasks.delete(taskId)
        }else{
            selectedTasks.add(taskId)
        }
        this.setState({
            selectedTasks
        })
    }

    toggleConfirm = () => {
        this.setState({
            toggle: !this.state.toggle,
        })
    }

    toggleEditModal = (task) => {
        this.setState({
            editTask: task,
        });
    }

    removeSelected = () => {
        const taskIds = [...this.state.selectedTasks]
        this.props.removeSelectedTask(taskIds)
       
    }

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal,
        })
    }

    showSearch = () => {
        this.setState({
            searchToggle: !this.state.searchToggle,
        })
    }
    
    
  

    render(){
        const { toggle , selectedTasks, editTask, openNewTaskModal, searchToggle } =this.state
        
        const tasksArray=this.props.tasks.map((task,i)=>{
            return(
                <Col key={task._id} xs='12' sm='6' md='4' lg='4' xl='3' className='m-2 p-2'>
                    <Task 
                        data={task}
                        onRemove={this.handleDelete}
                        onCheck={this.handleCheck}
                        onEdit = {() => this.toggleEditModal(task)}
                        disabled={!!this.state.selectedTasks.size}

                    />
                    
                </Col>
            )
        })
        
        return(
            <>
                <Container className="ToDo pt-4 pb-4 ">
                    <Container>
                        {searchToggle && 
                            <Search />
                        }
                   
                    <Row className="justify-content-end m-2">
                        <Button 
                        onClick={this.showSearch}
                        variant="outline-success"
                         >Filter</Button>
                        </Row>
                    <Row className='justify-content-center mb-3 mt-4'>
                        <Col md={8} xl={2} lg={3} sm={6} >
                            <Button
                                variant="outline-primary"
                                onClick={this.toggleNewTaskModal}
                                disabled={!!selectedTasks.size}
                            >
                                Add new task
                            </Button>
                           
                        </Col>
                    </Row>
                    </Container>
                    <Row className="justify-content-center">
                        {tasksArray}
                    </Row>
                    <Row className="justify-content-end" >
                        <Col xs={4}>
                            <Button 
                                variant="danger"
                                onClick={this.toggleConfirm}
                                disabled={this.state.selectedTasks.size === 0 ?true :false}
                            >
                                Remove selected
                            </Button>
                        </Col>
                    </Row>
                </Container>
               
                    {toggle &&
                        <Confirm 
                            onSubmit = {this.removeSelected}
                            onClose = {this.toggleConfirm}
                            count = {selectedTasks.size}
                        />
                     }
                     {
                     !!editTask  &&
                        <EditTaskModal 
                        data = {this.state.editTask}
                        from="tasks"
                        onClose = {() => this.toggleEditModal(null)}
                        />
                     }
                     {
                         openNewTaskModal &&
                         <AddTask
                            disabled={!!selectedTasks.size}
                            onClose={this.toggleNewTaskModal}
                         />

                     }

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        removeTasksSuccess: state.removeTasksSuccess,
        editTaskSuccess: state.editTaskSuccess
    }
}

const mapDispatchToProps = {
        getTasks,
        removeSelectedTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);