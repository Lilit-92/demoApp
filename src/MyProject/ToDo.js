import React, {Component} from 'react';
import './ToDo.css';
import { Row, Col, Button, Container } from 'react-bootstrap';
import idGenerator from './idGenerator';
import Task from './tasks';
import AddTask from './addTasks';
import Confirm from './removeModal';



class ToDo extends Component {

    state={
       tasks:[] ,
       selectedTasks: new Set(),
       toggle: false,
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

    addTask=(value)=>{
       
        const newTask={
            text: value,
            _id: idGenerator()
        }

        const tasksArray=[newTask, ...this.state.tasks]

            this.setState({
                tasks: tasksArray,
            })
       
    }

    handleDelete = (taskId) =>{
        const newTasks= this.state.tasks.filter(task => task._id !== taskId)
        this.setState({
            tasks: newTasks
        })
    }

    toggleConfirm = () => {
        this.setState({
            toggle: !this.state.toggle,
        })
    }

    removeSelected = () => {
        let tasks= [...this.state.tasks]

        this.state.selectedTasks.forEach((id) => {
           tasks = tasks.filter((task) => task._id !== id)
        })
        this.setState({
            tasks,
            selectedTasks: new Set(),
            toggle: false,
        })
       
    }

  

    render(){
        const { toggle , selectedTasks } =this.state
        const tasksArray=this.state.tasks.map((task,i)=>{
            return(
                <Col key={task._id} xs='12' sm='6' md='4' lg='3' xl='2' className='m-2 p-2'>
                    <Task 
                        data={task}
                        onRemove={this.handleDelete}
                        onCheck={this.handleCheck}
                        disabled={!!this.state.selectedTasks.size}

                    />
                </Col>
            )
        })
        
        return(
            <div>
                <Container className="ToDo">
                    <Container>
                    
                    <Row className='justify-content-center mb-3'>
                        <Col md={8} xl={2} lg={3} sm={6} >
                            <AddTask 
                                onAdd={this.addTask}
                                disabled = {!!this.state.selectedTasks.size}
                            />
                        </Col>
                    </Row>
                    </Container>
                    <Row className="justify-content-center">
                        {tasksArray}
                    </Row>
                    <Row>
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
            </div>
        )
    }
}

export default ToDo;