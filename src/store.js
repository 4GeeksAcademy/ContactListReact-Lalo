export const initialStore=()=>{
  return{
    message: null,
    listaContactos:[ ],
    listaAgendas:[]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){

    case 'SaveAgendas':
      return {
        ...store,
        listaAgendas: action.payload
      }
    case 'SaveContacts':
      return {
        ...store,
        listaContactos: action.payload
      }

    default:
      throw Error('Unknown action.');
  }    
};
