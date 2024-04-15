package com.prueba.ApiRestClientes.service;

import com.prueba.ApiRestClientes.exception.ResourceNotFoundException;
import com.prueba.ApiRestClientes.modelo.Cliente;
import com.prueba.ApiRestClientes.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    public Cliente guardarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente obtenerClientePorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El cliente con ese ID no existe: " + id));
    }


    public Cliente actualizarCliente(Long id, Cliente clienteRequest) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El cliente con ese ID no existe: " + id));
        cliente.setNombre(clienteRequest.getNombre());
        cliente.setApellido(clienteRequest.getApellido());
        cliente.setSalario(clienteRequest.getSalario());
//        cliente.setFechaNacimiento(clienteRequest.getFechaNacimiento());
        return clienteRepository.save(cliente);
    }

    public void eliminarCliente(Long id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El cliente con ese ID no existe: " + id));
        clienteRepository.delete(cliente);
    }
}
