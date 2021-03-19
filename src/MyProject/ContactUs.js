import React, {useState} from "react";


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
       <div>
            <div>Contact Us</div>
            <input 
                type="text" 
                name="name" 
                placeholder="Your name" 
                value={values.name} 
                onChange={handleChange} 
            /><br />
            <input 
                type="email" 
                name="email" 
                placeholder="Your email" 
                value={values.email} 
                onChange={handleChange} 
            /><br />
            <input 
                type="phone" 
                name="phone" 
                placeholder="Your phone" 
                value={values.phone} 
                onChange={handleChange} 
                /><br />
            <textarea 
                name="message" 
                placeholder="message..." 
                value={values.message} 
                onChange={handleChange} 
            /><br />
            <button
            onClick={send}
            >Send</button>
       </div>
    )
}