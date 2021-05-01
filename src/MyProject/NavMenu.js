import React,{ Component }  from "react";
import {Container, Nav, Navbar} from "react-bootstrap"
import { NavLink } from "react-router-dom"


export default class NavMenu extends Component{
   
    render(){
        return(
           
            <header className="header" style={{backgroundColor:"#993333"}}>
                <Container>
                    <Navbar expand="md" variant="dark"> 
                        <Navbar.Brand href="/">Tasks</Navbar.Brand>
                        <Navbar.Toggle area-controls="navbarResponsive" />
                        <Navbar.Collapse id="navbarResponsive">
                            <Nav as="ul" className="ml-auto">
                                <Nav.Item as="li">
                                        <NavLink className="nav-link" exact activeStyle={{color:"white"}}  to="/"> Home</NavLink>
                                </Nav.Item>
                                <Nav.Item as="li">
                                        <NavLink className="nav-link" exact activeStyle={{color:"white"}}  to="/about"> About</NavLink>
                                </Nav.Item>
                                <Nav.Item as="li">
                                        <NavLink className="nav-link" exact activeStyle={{color:"white"}}  to="/contact"> Contact Us</NavLink>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </header>
        )
    }
    
}