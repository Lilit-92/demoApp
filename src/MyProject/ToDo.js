import React, {PureComponent} from 'react';
import './ToDo.css';
import { Row, Col, Button, Container } from 'react-bootstrap';
import Task from './tasks';
import AddTask from './addTasks';
import Confirm from './removeModal';
import EditTaskModal from './editTaskModal';


class ToDo extends PureComponent {

    state={
        editTask: null,
       tasks:[] ,
       selectedTasks: new Set(),
       toggle: false,
       openNewTaskModal: false,
    }

    componentDidMount() {
        fetch("http://localhost:3001/task",{
            method:'GET',
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
                tasks:response.reverse(),
            })
        })
        .catch((error) => {
            console.log(error)
        })
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

    addTask=(data)=>{
        
        fetch("http://localhost:3001/task",{
            method:'POST',
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
            const tasks = [response, ...this.state.tasks]
            this.setState({
                tasks,
                openNewTaskModal: false,
            })
        })
        .catch((error) => {
            console.log(error)
        })
        // this.setState({
        //     tasks
        // })
        // const newTask={
        //     text: value,
        //     _id: idGenerator()
        // }

        // const tasksArray=[newTask, ...this.state.tasks]

        //     this.setState({
        //         tasks: tasksArray,
        //     })
       
    }

    handleDelete = (taskId) =>{

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
            const newTasks= this.state.tasks.filter(task => task._id !== taskId)
        
            this.setState({
                tasks: newTasks
            })
           
        })
        .catch((error) => {
            console.log(error)
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
        const body = {
            tasks: [...this.state.selectedTasks],
        }

        fetch("http://localhost:3001/task",{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
                
              },
              body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((response)=> {
            if(response.error){
                throw response.error
            }
            let tasks= [...this.state.tasks]
            this.state.selectedTasks.forEach((id) => {
                tasks = tasks.filter((task) => task._id !== id)
             })
            this.setState({
                tasks,
                selectedTasks: new Set(),
                toggle: false,
            })
        })
        .catch((error) => {
            console.log(error)
        })
        

       

       
    }

    saveTask = (editedTask) => {
        console.log(editedTask)
        fetch(`http://localhost:3001/task/${editedTask._id}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
                
              },
             body: JSON.stringify(editedTask) 
            
        })
        .then((res) => res.json())
        .then((response)=> {
            if(response.error){
                throw response.error
            }
            const tasks = [...this.state.tasks]
            const foundTaskIndex = tasks.findIndex((task) => task._id === editedTask._id)
            tasks[foundTaskIndex] = response
            this.setState({
                tasks,
                editTask: null,
            })
           
           
        })
        .catch((error) => {
            console.log(error)
        })

       
    } 

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal,
        })
    }
    
    
  

    render(){
        const { toggle , selectedTasks, editTask, openNewTaskModal } =this.state
        const tasksArray=this.state.tasks.map((task,i)=>{
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
            <div>
                <Container className="ToDo pt-4 pb-4 mt-2 mb-2">
                    <Container>
                    
                    <Row className='justify-content-center mb-3'>
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
                     {
                     !!editTask  &&
                        <EditTaskModal 
                        data = {this.state.editTask}
                        onSave = { this.saveTask}
                        onClose = {() => this.toggleEditModal(null)}
                        />
                     }
                     {
                         openNewTaskModal &&
                         <AddTask
                            onAdd={this.addTask}
                            disabled={!!selectedTasks.size}
                            onClose={this.toggleNewTaskModal}
                         />

                     }
            </div>
        )
    }
}

export default ToDo;