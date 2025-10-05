package com.verdenovo.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "pontos_coleta")
public class PontoColeta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nome;

    @Email
    @NotBlank
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank
    @Column(nullable = false)
    private String senha;

    @Column(unique = true)
    private String codigo;

    private String endereco;
    private String cidade;
    private String cep;
    private String telefone;
    private String horario;
    
    @Column(columnDefinition = "TEXT")
    private String descricao;
    
    @Column(name = "imagem_ponto", columnDefinition = "TEXT")
    private String imagemPonto;

    private Boolean papel = false;
    private Boolean plastico = false;
    private Boolean vidro = false;
    private Boolean metal = false;

    @Column(name = "ativo")
    private Boolean ativo = true;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public String getCodigo() { return codigo; }
    public void setCodigo(String codigo) { this.codigo = codigo; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getCidade() { return cidade; }
    public void setCidade(String cidade) { this.cidade = cidade; }

    public String getCep() { return cep; }
    public void setCep(String cep) { this.cep = cep; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getHorario() { return horario; }
    public void setHorario(String horario) { this.horario = horario; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getImagemPonto() { return imagemPonto; }
    public void setImagemPonto(String imagemPonto) { this.imagemPonto = imagemPonto; }

    public Boolean getPapel() { return papel; }
    public void setPapel(Boolean papel) { this.papel = papel; }

    public Boolean getPlastico() { return plastico; }
    public void setPlastico(Boolean plastico) { this.plastico = plastico; }

    public Boolean getVidro() { return vidro; }
    public void setVidro(Boolean vidro) { this.vidro = vidro; }

    public Boolean getMetal() { return metal; }
    public void setMetal(Boolean metal) { this.metal = metal; }

    public Boolean getAtivo() { return ativo; }
    public void setAtivo(Boolean ativo) { this.ativo = ativo; }
}