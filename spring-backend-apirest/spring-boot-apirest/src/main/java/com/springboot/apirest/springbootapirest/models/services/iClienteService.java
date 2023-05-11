package com.springboot.apirest.springbootapirest.models.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.springboot.apirest.springbootapirest.models.entity.Cliente;
import com.springboot.apirest.springbootapirest.models.entity.Factura;
import com.springboot.apirest.springbootapirest.models.entity.Region;

public interface iClienteService {

  public List<Cliente> findAll();

  public Page<Cliente> findAll(Pageable pageable);

  public Cliente findById(Long id);

  public Cliente save(Cliente cliente);

  public void delete(Long id);

  public List<Region> findAllRegiones();

  public Factura findFacturaById(Long id);

  public Factura saveFactura(Factura factura);

  public void deleteFacturaById(Long id);
}
