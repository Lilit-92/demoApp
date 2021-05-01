import React, {useState} from "react";
import {Form, Button} from "react-bootstrap"

const fefaultValues = {
    name:'',
    email: "",
    phone: "",
    message: ""
}


export default function ContactUs (){

    const [values, setValues] = useState(fefaultValues)

    const handleChange = ({target:{name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const send = () => {
        console.log(values)
        setValues(fefaultValues)
    }

    return(
       <div className="contact_us">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="text">Contact Us</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter your name" 
                            name="name" 
                            value={values.name} 
                            onChange={handleChange} />
                          
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control 
                            type="email" 
                            placeholder="Enter your email" 
                            name="email" 
                            value={values.email} 
                            onChange={handleChange} />
                           
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control 
                            type="phone" 
                            name="phone" 
                            placeholder="Enter your phone" 
                            value={values.phone} 
                            onChange={handleChange} 
                             />
                        </Form.Group>
                       
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control 
                            as="textarea" 
                            rows={3} 
                            name="message" 
                            placeholder="message..." 
                            value={values.message} 
                            onChange={handleChange} 
                            />
                        </Form.Group>
                        <Button 
                         onClick={send}
                        variant="danger" 
                        type="submit">
                            Send
                        </Button>
                    </Form>

       </div>
    )
}