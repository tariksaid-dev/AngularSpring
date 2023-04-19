package com.springboot.apirest.springbootapirest.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.apirest.springbootapirest.models.dao.iClienteDao;
import com.springboot.apirest.springbootapirest.models.entity.Cliente;

@Service
public class ClienteServiceImpl implements iClienteService {

  @Autowired
  private iClienteDao clienteDao;

  @Override
  @Transactional(readOnly = true)
  public List<Cliente> findAll() {
    return (List<Cliente>) clienteDao.findAll();
  }
}
