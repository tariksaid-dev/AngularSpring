package com.springboot.apirest.springbootapirest.models.services;

import java.util.List;

import com.springboot.apirest.springbootapirest.models.entity.Cliente;

public interface iClienteService {
  public List<Cliente> findAll();
}
