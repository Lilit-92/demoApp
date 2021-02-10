import React,{ Component }  from "react";
import {Container, Nav, Navbar} from "react-bootstrap"
import {BrowserRouter as Router } from "react-router-dom"
import { Link } from "react-router-dom"


export default class NavMenu extends Component{
   
    render(){
        return(
           
            <header className="bg-dark" >
                <Container>
                    <Navbar expand="md" variant="dark"> 
                        <Navbar.Brand href="/">Tasks</Navbar.Brand>
                        <Navbar.Toggle area-controls="navbarResponsive" />
                        <Navbar.Collapse id="navbarResponsive">
                            <Nav as="ul" className="ml-auto">
                                <Nav.Item as="li">
                                    <Router>
                                        {/* <Link to="/" className="nav-link" activeClassName="active">Home</Link> */}
                                        <Nav.Link  href="/"> Home</Nav.Link>
                                    </Router>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Router>
                                        {/* <Link to="/about" className="nav-link" activeClassName="active">About</Link> */}
                                        <Nav.Link  href="/about"> About</Nav.Link>
                                    </Router>
                                </Nav.Item>
                                <Nav.Item as="li">
                                    <Router>
                                        <Link to="/contact" className="nav-link" activeClassName="active">Contact</Link>
                                    </Router>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </header>
        )
    }
    
}