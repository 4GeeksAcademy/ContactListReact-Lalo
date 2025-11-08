import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createContact } from "../services/GetAgendas.js";
import { useNavigate } from "react-router-dom";


export const NuevoContacto = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    
    
   const navigate = useNavigate()
  
   
    const contact = {
        "name":name,
        "address":address,
        "email":email,
        "phone":phone
    }
    
    const saveContact = async (event) => {
    event.preventDefault(); 

    try {
        await createContact(contact);
        alert("Contacto guardado con éxito!");

        setName("");
        setAddress("");
        setEmail("");
        setPhone("");

        navigate('/'); 
    } catch (error) {
        console.error("Error al guardar el contacto:", error);
        alert("Error al guardar el contacto.");
    }
    }
 
    

console.log(contact);


    return (
        <div className="container mb-5">
        <form onSubmit={saveContact}>
         <h1 className="display-1 text-center">Añadir Contacto Nuevo</h1>    
         <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre Completo</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="name" autoComplete="off" placeholder="Escriba su nombre completo"/>
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Dirección</label>
                <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" className="form-control" id="address" autoComplete="off" placeholder="Escriba su dirección"/>
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Número de teléfono</label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} type="text" className="form-control" id="phone" autoComplete="off" placeholder="Escriba su número de teléfono"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-Mail</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" id="email" autoComplete="off" placeholder="Escriba su e-mail"/>
            </div>
            <button className="btn btn-success d-grid col-6 mx-auto mb-3" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-add d-grid mx-auto" viewBox="0 0 16 16">
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                    <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                </svg>
            </button>
            <Link to="/"><p className="text-center">Vuelve a la lista de contactos</p></Link>
       </form>
       </div>  
    )}

