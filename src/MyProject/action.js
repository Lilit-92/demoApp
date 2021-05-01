import request from "./request";
// import * as actionTypes from "./actionTypes";

export function getTasks(data={}) {
    let url = "http://localhost:3001/task"
    let query = "?"
    for(let key in data){
        let value = data[key]
        query = `${query}${key}=${value}&`
    }
    url =  url+query

    console.log(data)
    return (dispatch) => {

        dispatch({type: "LOADING"})

        request(url)
        .then(res => {
            dispatch({type: "GET_TASKS_SUCCESS", tasks:res})
        })
        .catch((error) => {
            dispatch({type:"ERROR", error:error.message})
            
        })
    }
}



export function addTask(data) {
    return (dispatch) => {
        dispatch({type:"LOADING"})
        request('http://localhost:3001/task',"POST",data)
        .then(res => {
            dispatch({type:"ADD_TASK_SUCCESS", task:res})
        })
        .catch((error) => {
            dispatch({type:"ERROR", error:error.message})
            
        })
    }
}




export function removeTask(taskId) {
    return (dispatch) => {

        dispatch({type:"LOADING"})
        
        request(`http://localhost:3001/task/${taskId}`, "DELETE" )
        .then(res => {
            dispatch({type:"REMOVE_TASK_SUCCESS", taskId})
            
        })
        .catch((error) => {
            dispatch({type:"ERROR", error:error.message})
            
        })
    }
}



export function removeSelectedTask(taskIds) {
    return (dispatch) => {

        dispatch({type:"LOADING"})

        request(`http://localhost:3001/task`, "PATCH", {tasks: taskIds} )
        .then(res => {
            dispatch({type:"REMOVE_SELECTED_TASKS_SUCCESS", taskIds})
        })
        .catch((error) => {
            dispatch({type:"ERROR", error:error.message})
            
        })
    }
}



export function editTask(data, from) {
    return (dispatch) => {

        dispatch({type:"LOADING"})

        request(`http://localhost:3001/task/${data._id}`, "PUT", data )
        .then(editedTask => {
            dispatch({type:"EDIT_TASK_SUCCESS", task: editedTask, from })
        })
        .catch((error) => {
            dispatch({type:"ERROR", error:error.message})
            
        })
    }
}



export function getSingleTask(taskId) {
    return (dispatch) => {

        dispatch({type:"LOADING"})

        request(`http://localhost:3001/task/${taskId}` )
        .then(res => {
            dispatch({type:"GET_TASK_SUCCESS", task: res })
        })
        .catch((error) => {
            dispatch({type:"ERROR", error:error.message})
            
        })
    }
}


export function removeSingleTask(taskId) {
    return (dispatch) => {

        dispatch({type:"LOADING"})

        request(`http://localhost:3001/task/${taskId}`, "DELETE" )
        .then(res => {
            dispatch({type:"REMOVE_SINGLE_TASK_SUCCESS", task: res})
            
        })
        .catch((error) => {
            dispatch({type:"ERROR", error:error.message})
            
        })
    }
}


