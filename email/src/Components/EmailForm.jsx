import { useState } from "react"
import React from 'react'
import emailjs from 'emailjs-com';


const EmailForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit =(e)=>{
    e.preventDefault();

    const serviceId = "service_your_id"
    const templateId = "template_ypur_id"
    const publicKey = "public_key_id"


    const templateParams = {
        from_name:name,
        from_email:email,
        to_name:"Kurangu",
        message:message
    }
emailjs.send(serviceId,templateId,templateParams,publicKey).then((response) =>{
    console.log("Emailsend succesfully !",response)
    setName('')
    setEmail('')
    setMessage('')
})
.catch((error) =>{
    console.error("Enter the email fail",error)
});

  }

    return (



        <form onSubmit={handleSubmit} className='emailForm'>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            cols="30"
            rows="10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          >
          </textarea>
          <button type="submit">Send Email</button>
        </form>
      )
}

export default EmailForm