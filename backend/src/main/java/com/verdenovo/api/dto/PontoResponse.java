package com.verdenovo.api.dto;

public class PontoResponse {
    private Long id;
    private String nome;
    private String email;
    private String cep;
    private String numero;
    private String complemento;
    private String telefone;
    private String horaFuncionamento;
    private String material;
    
    public PontoResponse(Long id, String nome, String email, String cep, String numero, 
                        String complemento, String telefone, String horaFuncionamento, 
                        String material) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cep = cep;
        this.numero = numero;
        this.complemento = complemento;
        this.telefone = telefone;
        this.horaFuncionamento = horaFuncionamento;
        this.material = material;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }
    
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    
    public String getComplemento() { return complemento; }
    public void setComplemento(String complemento) { this.complemento = complemento; }
    
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public String getHoraFuncionamento() { return horaFuncionamento; }
    public void setHoraFuncionamento(String horaFuncionamento) { this.horaFuncionamento = horaFuncionamento; }
    
    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }
    

}