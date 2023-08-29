import React, { useState } from 'react'
import './Contact.modules.css'

// eslint-disable-next-line
const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export default function Contact() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });


  const handleChange = (evento) => {
      setInputs({
        ...inputs,
        [evento.target.name]: evento.target.value
      });
      setErrors(
        validate({
          ...inputs,
          [evento.target.name]: evento.target.value,
        })
      );
  }

  const handleSubmit = (evento) => {
    evento.preventDefault();
    const errorsLength = Object.keys(errors).filter(error => error !== "").length;
    if(errorsLength === 0) {
      alert("Datos completos");
      setInputs({
        name: '',
        email: '',
        message: ''
      })
      setErrors({
        name: '',
        email: '',
        message: ''
      })
    } else {
      alert("Debe llenar todos los campos");
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Nombre:</label>
      <input name="name" value={inputs.name} type="text" className={errors.name && 'warning'} placeholder="Escribe tu nombre..." onChange={handleChange}/>
      <p className='danger'>{errors.name}</p>
      <label htmlFor="email">Correo Electrónico:</label>
      <input name="email" value={inputs.email} type="text" className={errors.email && 'warning'} placeholder="Escribe tu email..." onChange={handleChange}/>
      <p className='danger'>{errors.email}</p>
      <label htmlFor="message">Mensaje:</label>
      <textarea name="message" value={inputs.message} type="text" className={errors.message && 'warning'} placeholder="Escribe tu mensaje..." onChange={handleChange}/>
      <p className='danger'>{errors.message}</p>
      <button type="submit">Enviar</button>
    </form>
  )
}

export function validate(inputs) {
  const errors = {};
  if (!inputs.name) {
    errors.name = 'Se requiere un nombre';
  }
  if (!regexEmail.test(inputs.email)) {
    errors.email = 'Debe ser un correo electrónico';
  }
  if (!inputs.message) {
    errors.message = 'Se requiere un mensaje';
  }
  return errors;
}