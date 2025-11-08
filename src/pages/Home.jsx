import { useEffect, useState, useRef } from "react";
import rigoImageUrl from "../assets/img/contact.png";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {  createAgenda, deleteContacts, getAgendas, getContactos } from "../services/GetAgendas.js";
import { useNavigate } from "react-router-dom";


export const Home = () => {

	const {store, dispatch} =useGlobalReducer()
	const {listaAgendas} = store
	const {listaContactos} = store
	const [contactToDelete, setContactToDelete] = useState(null);

	const modalRef = useRef(null);

	useEffect (() => {
		getAgendas(dispatch)
	}, [dispatch]);

		useEffect(() => {
			const condicional = async() =>{
			if (listaAgendas && listaAgendas.length > 0){
				const existe = listaAgendas.some((agenda) =>agenda.slug==='LaloNimo')
				if (existe === false){
					await createAgenda()
				}
					await getContactos(dispatch)
			}	
			}
		condicional()	
		}, [listaAgendas, dispatch]);


	const navigate = useNavigate()
	const navegacion = (ruta, id = null) => {
		const finalRuta =id !== null ? ruta.replace(':contact_id', id) : ruta;
		navigate(finalRuta);
	}

	const handleDeleteContact = async () => {
        if (!contactToDelete) return;
        try {
            await deleteContacts(contactToDelete);
            alert("Contacto eliminado con éxito!");
			
			const modalElement = modalRef.current;
        	if (modalElement) {
            const modal = new window.bootstrap.Modal(modalElement);
            modal.hide(); 

            document.querySelector('.modal-backdrop')?.remove();
        }
            await getContactos(dispatch); 

            setContactToDelete(null);

        } catch (error) {
            console.error("Error al eliminar el contacto:", error);
            alert("Error al eliminar el contacto. Revisa la consola.");
        }
    }


	return (
		<div className="container mt-5 mb-5">
			<div className="text-center">
			<h1 className="display-1 gap-2">Contactos de LaloNimo</h1>
			</div>
			<div className="d-grid gap-2 d-md-flex justify-content-md-end mb-4">
				<button className="btn btn-success me-md-2" type="button" onClick={()=>navegacion('/nuevo-contacto')}>Agregar Contacto Nuevo</button>
			</div>			
			{listaContactos && listaContactos.map((contact) => (
			<div key={contact.id} className="card mb-3 shadow-sm">
				<div className="row g-0">
					<div className="col-md-4 col-xl-3">
						<img src={rigoImageUrl} />
					</div>
					<div className="col-md-8 col-xl-9">
						<div className="d-flex justify-content-end p-2 p-md-4">
							<button className="btn btn-outline-success me-1 me-md-2" type="button" onClick={()=>navegacion('/editar-contacto/:contact_id', contact.id)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square " viewBox="0 0 16 16">
									<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
									<path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
								</svg>
							</button>
							<button className="btn btn-outline-danger" type="button" data-bs-toggle="modal" data-bs-target="#confirmDeleteModal" onClick={()=>setContactToDelete(contact.id)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-dash" viewBox="0 0 16 16">
									<path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
									<path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
								</svg>
							</button>
						</div>
						<div className="modal fade" id="confirmDeleteModal" tabIndex="-1" ref={modalRef} aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
								<div className="modal-header">
									<h1 className="modal-title fs-5" id="exampleModalLabel">¡HEY! Espera...</h1>
									<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div className="modal-body">
									<p className="text-body-primary">Estas a punto de eliminar a {contact.name}. Esta acción no se puede deshacer, ¿quieres continuar?</p>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No,Vuelve a lista.</button>
									<button type="button" className="btn btn-danger" onClick={handleDeleteContact}>Si, elimina.</button>
								</div>
								</div>
							</div>
						</div>

						<div className="card-body">
							<h3 className="card-title mb-2">{contact.name}</h3>
	
							<p className="card-text text-body-primary fs-5">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pin-map me-2" viewBox="0 0 16 16">
									<path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"/>
									<path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
								</svg>
								{contact.address}</p>
							<p className="card-text text-body-primary fs-5">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-phone-vibrate me-2" viewBox="0 0 16 16">
									<path d="M10 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM6 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
									<path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2M1.599 4.058a.5.5 0 0 1 .208.676A7 7 0 0 0 1 8c0 1.18.292 2.292.807 3.266a.5.5 0 0 1-.884.468A8 8 0 0 1 0 8c0-1.347.334-2.619.923-3.734a.5.5 0 0 1 .676-.208m12.802 0a.5.5 0 0 1 .676.208A8 8 0 0 1 16 8a8 8 0 0 1-.923 3.734.5.5 0 0 1-.884-.468A7 7 0 0 0 15 8c0-1.18-.292-2.292-.807-3.266a.5.5 0 0 1 .208-.676M3.057 5.534a.5.5 0 0 1 .284.648A5 5 0 0 0 3 8c0 .642.12 1.255.34 1.818a.5.5 0 1 1-.93.364A6 6 0 0 1 2 8c0-.769.145-1.505.41-2.182a.5.5 0 0 1 .647-.284m9.886 0a.5.5 0 0 1 .648.284C13.855 6.495 14 7.231 14 8s-.145 1.505-.41 2.182a.5.5 0 0 1-.93-.364C12.88 9.255 13 8.642 13 8s-.12-1.255-.34-1.818a.5.5 0 0 1 .283-.648"/>
								</svg>
								{contact.phone}</p>
							<p className="card-text text-body-primary fs-5 mb-4">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-envelope-at me-2" viewBox="0 0 16 16">
									<path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
									<path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
								</svg>
								{contact.email}</p>
						</div>
					</div>

				</div>
			</div>
			))}
		</div>
			
	);
}; 