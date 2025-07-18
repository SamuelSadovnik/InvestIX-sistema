package com.invistaix.sistema.model;

import com.invistaix.sistema.enums.UserType;

public class AuthenticatedUser {
    private Integer id;
    private String nome;
    private String email;
    private UserType userType;

    // Construtores
    public AuthenticatedUser() {
    }

    public AuthenticatedUser(Gestor gestor) {
        this.id = gestor.getId();
        this.nome = gestor.getNome();
        this.email = gestor.getEmail();
        this.userType = UserType.GESTOR;
    }

    public AuthenticatedUser(Proprietario proprietario) {
        this.id = proprietario.getId();
        this.nome = proprietario.getNome();
        this.email = proprietario.getEmail();
        this.userType = UserType.PROPRIETARIO;
    }

    public AuthenticatedUser(Admin admin) {
        this.id = admin.getId();
        this.nome = admin.getNome();
        this.email = admin.getEmail();
        this.userType = UserType.ADMIN;
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

    public UserType getUserType() {
        return userType;
    }
    public void setUserType(UserType userType) {
        this.userType = userType;
    }
}