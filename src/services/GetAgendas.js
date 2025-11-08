const urlBase = "https://playground.4geeks.com/contact/agendas/"

const userName = 'LaloNimo'

export const createAgenda = async () => {
    try {
        const response = await fetch(`${urlBase}${userName}`,{
            method: "POST",
            headers: {
        "Content-Type": "application/json"
    }
        });
        if (!response.ok) {
            throw new Error (`Error ${response.status}`);
        }
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.log("Error al crear la agenda", error.message);
    }
};

export const getAgendas = async (distpatch) => {
    try {
        const response = await fetch(`${urlBase}`);
        if (!response.ok) {
            throw new Error (`Error ${response.status}`);
        }
        const data = await response.json();
        distpatch ({
            type: "SaveAgendas" ,
            payload: data.agendas
        });
        return data;
    } catch (error) {
        console.log("Error al caragar las agendas", error.message);
    }
};

export const getContactos = async (distpatch) => {
    try {
        const response = await fetch(`${urlBase}${userName}/contacts`);
        if (!response.ok) {
            throw new Error (`Error ${response.status}`);
        }
        const data = await response.json();
        distpatch ({
            type: "SaveContacts" ,
            payload: data.contacts
        });
        return data.contacts;
    } catch (error) {
        console.log(`Error al caragar los contactos de: ${userName} `, error.message);
    }
};

export const createContact = async (contact) => {
    const contactoAEnviar  = {
        "name":contact.name,
        "address":contact.address, 
        "phone":contact.phone,
        "email":contact.email
    }
    try {
        const response = await fetch(`${urlBase}${userName}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactoAEnviar)
        });
        if (!response.ok){
            let errorDetails = await response.text();
            throw new Error(`Error al crear el contacto. Estatus: ${response.status}. Detalles: ${errorDetails.substring(0, 100)}...`);
        }
        const data = await response.json()
        console.log("Contacto creado:", contactoAEnviar);
        
        return data;
        
    } catch (error) {
        console.log(`Error al crear el contacto`, error)
        throw error; 
    }
};

export const updateContacts = async (id, contact) => {
    
    const contactoAEnviar  = {
        "name":contact.name,
        "address":contact.address,
        "phone":contact.phone,
        "email":contact.email
    }
    
    try {
        const response = await fetch (`${urlBase}${userName}/contacts/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(contactoAEnviar)
        });
        
        if (!response.ok){
            let errorDetails = await response.text();
            throw new Error(`Error al editar el contacto. Estatus: ${response.status}. Detalles: ${errorDetails.substring(0, 100)}...`);
        }
        
        return await response.json();

    } catch (error) {
        console.log(`Error al editar el contacto`, error);
        throw error; 
    }
};

export const deleteContacts = async (id) => {
    try {
        const response = await fetch (`${urlBase}${userName}/contacts/${id}`,{
            method: "DELETE",
        });
        
        if (!response.ok){
            let errorDetails = await response.text();
            throw new Error(`Error al eliminar el contacto. Estatus: ${response.status}. Detalles: ${errorDetails.substring(0, 100)}...`);
        }
        if (response.status === 204) {
            return { message: "Contacto eliminado con éxito" };
        }
        return await response.json();
    } catch (error) {
        console.log(`Error al eliminar el contacto`, error);
        throw error; 
    }
};