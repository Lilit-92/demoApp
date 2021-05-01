// import * as actionTypes from "./actionTypes"


const defaultState = {
    tasks: [],
    task: null,
    error: null,
    loading : false,
    successMessage: null,
    errorMessage: null,
    addTaskSuccess: false,
    removeTasksSuccess: false,
    editTaskSuccess: false
}

export const reducer = (state = defaultState, action) => {

  switch(action.type){
    case "GET_TASKS_SUCCESS": {
      return {
        ...state,
        tasks: action.tasks,
        loading : false,
      }
    }
    case "ERROR": {
        return {
            ...state,
            errorMessage: action.error,
            loading : false,
        }
    }
    case "LOADING": {
      return {
        ...state,
        loading: true,
        addTaskSuccess: false,
        removeTasksSuccess: false,
        editTaskSuccess: false,
        successMessage: null,
        errorMessage: null,
      }
    }
    case "ADD_TASK_SUCCESS": {
      const tasks = [...state.tasks, action.task]
      return {
        ...state,
        tasks: tasks,
        loading : false,
        successMessage: "Task addes successfully!",
        addTaskSuccess: true,
      }
    }
   
    case "REMOVE_TASK_SUCCESS": {
     
          const newTask = state.tasks.filter(task => task._id !== action.taskId)
          return {
            ...state,
            tasks: newTask,
            loading : false,
            successMessage: "Task deleted successfully!",
        
          }
    
    }

    case "REMOVE_SELECTED_TASKS_SUCCESS": {
        let tasks = [...state.tasks]
        action.taskIds.forEach((id)=>{
            tasks = tasks.filter((task)=>task._id !== id)
        })
      return {
        ...state,
        tasks: tasks,
        loading : false,
        successMessage: "Tasks removed successfully!",
        removeTasksSuccess: true
    
      }
    }


    case "EDIT_TASK_SUCCESS": {
      if(action.from === "single"){
        return{
          ...state,
          tasks: action.task,
          loading : false,
          successMessage: "Task edited successfully!",
          editTaskSuccess: true
        }
      }else{

          const tasks = [...state.tasks]
          const fountTaskIndex = tasks.findIndex((task) => task._id === action.task._id)
          tasks[fountTaskIndex] = action.task
        return {
          ...state,
          tasks: tasks,
          loading : false,
          successMessage: "Tasks edited successfully!",
          editTaskSuccess: true
      
        }
  }
  }

  case "REMOVE_SINGLE_TASK_SUCCESS": {
    
      return{
        ...state,
        tasks: action.task,
        loading : false,
        successMessage: "Task deleted successfully!",
      }
  }
  
  case "GET_TASK_SUCCESS": {
   
  return {
    ...state,
    tasks: action.task,
    loading : false,

  }
}
   
   
    default: return state;
  }
  
}
