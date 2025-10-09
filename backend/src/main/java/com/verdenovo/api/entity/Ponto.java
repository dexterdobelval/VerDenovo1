package com.verdenovo.api.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Ponto")
public class Ponto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 50)
    private String nome;
    
    @Column(nullable = false, length = 8)
    private String cep;
    
    @Column(nullable = false, length = 10)
    private String numero;
    
    @Column(length = 50)
    private String complemento;
    
    @Column(length = 20)
    private String telefone;
    
    @Column(length = 50)
    private String email;
    
    @Column(nullable = false, length = 200)
    private String horaFuncionamento;
    
    @Column(nullable = false, length = 400)
    private String material;
    
    @Column(nullable = false, length = 100)
    private String senha;
    
    @Column
    private LocalDateTime dataCadastro;
    
    @Column(nullable = false, length = 20)
    private String statusPonto;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }
    
    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }
    
    public String getComplemento() { return complemento; }
    public void setComplemento(String complemento) { this.complemento = complemento; }
    
    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getHoraFuncionamento() { return horaFuncionamento; }
    public void setHoraFuncionamento(String horaFuncionamento) { this.horaFuncionamento = horaFuncionamento; }
    
    public String getMaterial() { return material; }
    public void setMaterial(String material) { this.material = material; }
    
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
    
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
    
    public String getStatusPonto() { return statusPonto; }
    public void setStatusPonto(String statusPonto) { this.statusPonto = statusPonto; }
}