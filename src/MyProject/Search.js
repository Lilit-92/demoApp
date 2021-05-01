import React , {useState} from 'react'
import {Navbar, Nav, Form ,FormControl, Button, NavDropdown} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { getTasks} from "./action"

const statusOpions = [
    {
        label: 'Reset',
        value: ''
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Done',
        value: 'done'
    }
]


const sortOpions = [
    {
        label: 'Reset',
        value: ''
    },
    {
        label: 'A-Z',
        value: 'a-z'
    },
    {
        label: 'Z-A',
        value: 'z-a'
    },
    {
        label: 'Creation date oldest',
        value: 'creation-date-oldest'
    },
    {
        label: 'Creation date newest',
        value: 'creation-date-newest'
    },
    {
        label: 'Complation date oldest',
        value: 'complation-date-oldest'
    },
    {
        label: 'Complation date newest',
        value: 'complation-date-newest'
    }
]

const dateOptions = [
    {
        label: 'Create later than',
        value: 'create_lte'
    },
    {
        label: 'Create earlier than',
        value: 'create_gte'
    },
    {
        label: 'Complete later than',
        value: 'complete_lte'
    },
    {
        label: 'Complete earlier than',
        value: 'complete_gte'
    }
]



 function Search (props){

    const [search, setSearch] = useState('')

     const [status, setStatus] = useState({
         label: '',
         value: ''
     })

     const [sort, setSort] = useState({
        label: '',
        value: ''
     })

     const [dates, setDates] = useState({
        create_lte: null, 
        create_gte: null,
        complete_lte: null,
        complete_gte: null
     })

     const handleSubmit = () => {
         const data = {}
        const {create_lte, create_gte, complete_lte, complete_gte} = dates
        if(create_lte) data.create_lte =create_lte.toLocaleDateString();
        if(create_gte) data.create_gte =create_gte.toLocaleDateString();
        if(complete_lte) data.complete_lte =complete_lte.toLocaleDateString();
        if(complete_gte) data.complete_gte =complete_gte.toLocaleDateString();
        if(search) data.search = search;
        if(sort) data.sort = sort.value;
        if(status) data.status = status.value;
        console.log(data)
        props.getTasks(data)

     }

     return (
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Search-Bar</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <NavDropdown title={status.value ? status.label : "Status"}>
                    {
                        statusOpions.map((item, index) => {
                          return(
                            <NavDropdown.Item 
                            key={index}
                            active={status.value === item.value}
                            onClick={() => setStatus(item)}
                            >{item.label}</NavDropdown.Item>
                          )
                        })
                    }
                </NavDropdown>
                <NavDropdown title={sort.value ? sort.label : "Sort"}>
                    {
                        sortOpions.map((item, index) => {
                          return(
                            <NavDropdown.Item 
                            key={index}
                            active={sort.value === item.value}
                            onClick={() => setSort(item)}
                            >{item.label}</NavDropdown.Item>
                          )
                        })
                    }
                </NavDropdown>
                </Nav>
                <div>
                    {
                        dateOptions.map((item, index) => {
                            return(
                                <div key={index} style={{padding:"4px",textAlign:"right",margin:"2px"}}>
                                    <span style={{}}>
                                     {item.label } { }
                                        <DatePicker 
                                            selected={dates[item.value]}
                                            onChange={(date) =>{
                                                setDates({
                                                    ...dates,
                                                    [item.value]: date
                                                })
                                            }}
                                        />

                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
                <Form inline>
                <FormControl 
                    type="text" 
                    placeholder="Search" 
                    className="mr-sm-2"
                    value={search}
                    onChange={(event)=>setSearch(event.target.value)}
                 />
                <Button 
                    variant="outline-success"
                    onClick={() => handleSubmit()}
                >
                    Search
                </Button>
                </Form>
            </Navbar.Collapse>
            </Navbar>
     )
 }

 const mapDispatchToProps = {
     getTasks
 }


 export default connect(null, mapDispatchToProps)(Search);