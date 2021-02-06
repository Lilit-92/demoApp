import React,{ Component }  from "react";
import {Container, Nav} from "react-bootstrap"



export default class NavMenu extends Component{
   
    render(){
        return(
            <Container>
            <Nav variant="tabs" defaultActiveKey="/" className="justify-content-end m-2" >
                <Nav.Item>
                    <Nav.Link  href="/">
                        Home
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/about">
                        About
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/contact" > 
                    Contact
                     </Nav.Link>
                </Nav.Item>
            </Nav>
            </Container>
        )
    }
    
}