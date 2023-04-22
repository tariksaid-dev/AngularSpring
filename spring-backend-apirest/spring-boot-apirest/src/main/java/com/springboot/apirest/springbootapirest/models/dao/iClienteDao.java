package com.springboot.apirest.springbootapirest.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springboot.apirest.springbootapirest.models.entity.Cliente;

public interface iClienteDao extends JpaRepository<Cliente, Long> {

}
