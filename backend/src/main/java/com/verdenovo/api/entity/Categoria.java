package com.verdenovo.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Categoria")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 50)
    private String nome;
    
    @Column(nullable = false, length = 200)
    private String descricao;
    
    @Column(nullable = false, length = 20)
    private String statusCategoria;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    
    public String getStatusCategoria() { return statusCategoria; }
    public void setStatusCategoria(String statusCategoria) { this.statusCategoria = statusCategoria; }
}