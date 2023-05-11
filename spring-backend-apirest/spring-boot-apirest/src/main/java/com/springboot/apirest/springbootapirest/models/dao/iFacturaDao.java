package com.springboot.apirest.springbootapirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.springboot.apirest.springbootapirest.models.entity.Factura;

public interface iFacturaDao extends CrudRepository<Factura, Long> {

}
