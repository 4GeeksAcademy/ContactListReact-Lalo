import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { updateContacts } from "../services/GetAgendas.js"; 

export const EditarContacto = () => {

    const { contact_id } = useParams();
    const navigate = useNavigate();
    const { store } = useGlobalReducer();

    const idToEdit = parseInt(contact_id)

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    
    useEffect(() => {
        const contactData = store.listaContactos.find(c => c.id === idToEdit);

        if (contactData) {
            setName(contactData.name || "");
            setAddress(contactData.address || ""); 
            setEmail(contactData.email || "");
            setPhone(contactData.phone || "");
        } else {
            console.warn(`Contacto con ID ${idToEdit} no encontrado en la lista.`);
            navigate('/'); 
        }
        
    }, [idToEdit, store.listaContactos]);

    const saveEdit = async (event) => {
        event.preventDefault(); 

        const updatedContact = { name, address, email, phone };
        
        try {
            await updateContacts(contact_id, updatedContact);
            
            alert("Contacto editado con éxito!");
            navigate('/'); 
        } catch (error) {
            console.error("Error al editar el contacto:", error);
            alert("Error al editar el contacto.");
        }
    };

    return (
        <div className="container mb-5">
        <form onSubmit={saveEdit}>
         <h1 className="display-1 text-center">Editar Contacto</h1>    
         <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre Completo</label>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" className="form-control" id="name" placeholder="Escriba su nombre completo"/>
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label">Dirección</label>
                <input value={address} onChange={(e)=>setAddress(e.target.value)}type="text" className="form-control" id="address" placeholder="Escriba su dirección"/>
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Número de teléfono</label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)}type="text" className="form-control" id="phone" placeholder="Escriba su número de teléfono"/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-Mail</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)}type="text" className="form-control" id="email" placeholder="Escriba su e-mail"/>
            </div>
            <button type="submit" className="btn btn-success d-grid col-6 mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-person-add d-grid mx-auto" viewBox="0 0 16 16">
                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                    <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                </svg>
            </button>
            <Link to="/"><p className="text-center">Vuelve a la lista de contactos</p></Link>
       </form>
       </div>  
    )}

