package com.springboot.apirest.springbootapirest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.apirest.springbootapirest.models.entity.Factura;
import com.springboot.apirest.springbootapirest.models.services.iClienteService;

@CrossOrigin(origins = { "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class FacturaRestController {

  @Autowired
  private iClienteService clienteService;

  @GetMapping("/facturas/{id}")
  @ResponseStatus(code = HttpStatus.OK)
  public Factura show(@PathVariable Long id) {
    return clienteService.findFacturaById(id);
  }

  @DeleteMapping("facturas/{id}")
  @ResponseStatus(code = HttpStatus.NO_CONTENT)
  public void delete(@PathVariable Long id) {
    clienteService.deleteFacturaById(id);
  }
}
