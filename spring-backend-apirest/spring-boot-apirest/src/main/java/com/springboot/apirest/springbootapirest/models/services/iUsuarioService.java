package com.springboot.apirest.springbootapirest.models.services;

import com.springboot.apirest.springbootapirest.models.entity.Usuario;

public interface iUsuarioService {

  public Usuario findByUsername(String username);
}
