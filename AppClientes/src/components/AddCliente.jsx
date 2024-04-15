import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ClienteService from "../servicio/ClienteService";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from 'formik';

function AddCliente() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [salario, setSalario] = useState(0); 
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await ClienteService.getClienteById(id);
          setNombre(response.data.nombre);
          setApellido(response.data.apellido);
          setSalario(response.data.salario);
        }
      } catch (error) {
        console.log("Error al cargar el cliente:", error);
      }
    };
  
    fetchData();
  }, [id]);

  const saveOrUpdateCliente = async (values) => {
    try {
      const cliente = { nombre: values.nombre, apellido: values.apellido, salario: values.salario }; // Se incluye el salario en el objeto cliente
      if (id) {
        await ClienteService.updateCliente(id, cliente);
      } else {
        await ClienteService.createCliente(cliente);
      }
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="card">
            <h2 className="text center">{id ? "Actualizar cliente" : "Agregar cliente"}</h2>
            <div className="card-body">
              <Formik
                initialValues={{ nombre: nombre, apellido: apellido, salario: salario }} // Se inicializa el salario en los valores del estado
                onSubmit={(values, actions) => {
                  saveOrUpdateCliente(values);
                  actions.setSubmitting(false);
                }}
              >
                <Form>
                  <div className="form-group mb-2">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <Field
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Ingrese su nombre"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <Field
                      type="text"
                      id="apellido"
                      name="apellido"
                      placeholder="Ingrese su apellido"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="salario" className="form-label">Salario</label>
                    <Field
                      type="number"
                      id="salario"
                      name="salario"
                      placeholder="Ingrese su salario"
                      className="form-control"
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                  &nbsp;&nbsp;
                  <Link to="/clientes" className="btn btn-danger">
                    Cancelar
                  </Link>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCliente;
