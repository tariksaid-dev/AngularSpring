package com.springboot.apirest.springbootapirest.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

import com.springboot.apirest.springbootapirest.models.entity.Cliente;
import com.springboot.apirest.springbootapirest.models.entity.Region;

public interface iClienteDao extends JpaRepository<Cliente, Long> {

  @Query("from Region")
  public List<Region> findAllRegiones();
}
