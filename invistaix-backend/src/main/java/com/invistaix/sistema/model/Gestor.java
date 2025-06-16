package com.invistaix.sistema.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "GESTORES")
public class Gestor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gestor_id")
    private Integer id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "email", nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "telefone", length = 20)
    private String telefone;

    @Transient
    @JsonProperty("propertyCount")
    private int propertyCount;

    @Column(name = "CPF", nullable = false, length = 11, unique = true)
    private String cpf;

    @Column(name = "senha", nullable = false, length = 60)
    private String senha;

    // Construtores
    public Gestor() {
    }

    public Gestor(Integer id, String nome, String email, String telefone, String cpf, String senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
        this.senha = senha;
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public int getPropertyCount() {
        return propertyCount;
    }

    public void setPropertyCount(int propertyCount) {
        this.propertyCount = propertyCount;
    }
}