package com.verdenovo.api.dto;

public class LoginResponse {
    private String token;
    private UsuarioResponse usuario;

    public LoginResponse(String token, UsuarioResponse usuario) {
        this.token = token;
        this.usuario = usuario;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public UsuarioResponse getUsuario() { return usuario; }
    public void setUsuario(UsuarioResponse usuario) { this.usuario = usuario; }
}