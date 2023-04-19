package com.springboot.apirest.springbootapirest.models.dao;

import org.springframework.data.repository.CrudRepository;

import com.springboot.apirest.springbootapirest.models.entity.Cliente;

public interface iClienteDao extends CrudRepository<Cliente, Long> {

}
