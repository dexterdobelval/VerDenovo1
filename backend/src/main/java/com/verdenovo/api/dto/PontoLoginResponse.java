package com.verdenovo.api.dto;

public class PontoLoginResponse {
    private String token;
    private PontoResponse ponto;
    
    public PontoLoginResponse(String token, PontoResponse ponto) {
        this.token = token;
        this.ponto = ponto;
    }
    
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    
    public PontoResponse getPonto() { return ponto; }
    public void setPonto(PontoResponse ponto) { this.ponto = ponto; }
}