package com.springboot.apirest.springbootapirest.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.springboot.apirest.springbootapirest.models.entity.Cliente;

public interface iClienteService {

  public List<Cliente> findAll();

  public Page<Cliente> findAll(Pageable pageable);

  public Cliente findById(Long id);

  public Cliente save(Cliente cliente);

  public void delete(Long id);
}
