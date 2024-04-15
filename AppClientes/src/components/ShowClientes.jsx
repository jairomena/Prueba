import { useEffect, useState } from "react";
import ClienteService from "../servicio/ClienteService";
import { Link } from "react-router-dom";

const ShowClientes = () => {
  const [clientes, setClientes] = useState([]);

  const fetchData = async () => {
    try {
      const response = await ClienteService.getAllClientes();
      setClientes(response.data);
    } catch (error) {
      console.log("Error al cargar los clientes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteCliente = async (clienteId) => {
    try {
      await ClienteService.deleteCliente(clienteId);
      // Una vez eliminado el cliente, volvemos a llamar a fetchData para actualizar la lista
      fetchData();
    } catch (error) {
      console.log("Error al eliminar el cliente:", error);
    }
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <h2 className="text-center"> Lista de Clientes</h2>
        <Link to="/add-cliente" className="btn btn-primary mb-2">
          Agregar cliente
        </Link>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Salario</th> {/* Agregado el encabezado de la columna Salario */}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.salario}</td> {/* Mostrar el salario */}
                <td className="d-flex">
                  <Link
                    to={`/edit-cliente/${cliente.id}`}
                    className="btn btn-info mr-auto"
                  >
                    Actualizar
                  </Link>
                  <button
                    className="btn btn-danger ml-auto"
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteCliente(cliente.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowClientes;
