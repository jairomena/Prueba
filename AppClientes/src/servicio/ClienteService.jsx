import axios from "axios";

const CLIENTE_BASE_URL_API = "http://localhost:8080/api/v1/clientes";

class ClienteService{
    getAllClientes(){
        return axios.get(CLIENTE_BASE_URL_API);
    }

    createCliente(cliente){
        return axios.post(CLIENTE_BASE_URL_API, cliente);
    
    }

    getClienteById(clienteId){
        return axios.get(CLIENTE_BASE_URL_API + '/' + clienteId);
    }

    updateCliente(clienteId,cliente){
        return axios.put(CLIENTE_BASE_URL_API + '/' + clienteId,cliente);
    }

    deleteCliente(clienteId){
        return axios.delete(CLIENTE_BASE_URL_API + '/' + clienteId);
    }
}

export default new ClienteService();