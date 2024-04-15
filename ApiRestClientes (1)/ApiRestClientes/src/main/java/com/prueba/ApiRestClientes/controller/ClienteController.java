package com.prueba.ApiRestClientes.controller;

import com.prueba.ApiRestClientes.modelo.Cliente;
import com.prueba.ApiRestClientes.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/clientes")
    public List<Cliente> listarClientes() {
        return clienteService.listarClientes();
    }

    @PostMapping("/clientes")
    public Cliente guardarCliente(@RequestBody Cliente cliente) {
        return clienteService.guardarCliente(cliente);
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> obtenerClientePorId(@PathVariable Long id) {
        Cliente cliente = clienteService.obtenerClientePorId(id);
        return ResponseEntity.ok(cliente);
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> actualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteRequest) {
        Cliente clienteActualizado = clienteService.actualizarCliente(id, clienteRequest);
        return ResponseEntity.ok(clienteActualizado);
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarCliente(@PathVariable Long id) {
        clienteService.eliminarCliente(id);
        Map<String, Boolean> response = Map.of("deleted", true);
        return ResponseEntity.ok(response);
    }
}
