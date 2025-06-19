package com.invistaix.sistema.model;

import jakarta.persistence.*;

@Entity
@Table(name = "PROPRIETARIOS")
public class Proprietario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "proprietario_id")
    private Integer id;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "email", nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "telefone", nullable = false, length = 11, unique = true)
    private String telefone;

    @Column(name = "documento", nullable = false, length = 14, unique = true)
    private String documento;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_documento", nullable = false)
    private TipoDocumento tipoDocumento;
    
    @Column(name = "senha", nullable = false, length = 60)
    private String senha;

    private Long quantidadeImoveis;

    // Construtores
    public Proprietario() {
    }

    public Proprietario(Integer id, String nome, String email, String telefone, String documento, TipoDocumento tipoDocumento, Long quantidadeImoveis) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.documento = documento;
        this.tipoDocumento = tipoDocumento;
        this.quantidadeImoveis = quantidadeImoveis;
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

    public String getSenha(){
        return senha;
    }

    public void setSenha(String senha){
        this.senha = senha;
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

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public TipoDocumento getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(TipoDocumento tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public Long getQuantidadeImoveis() {
        return quantidadeImoveis;
    }

    public void setQuantidadeImoveis(Long quantidadeImoveis) {
        this.quantidadeImoveis = quantidadeImoveis;
    }
}