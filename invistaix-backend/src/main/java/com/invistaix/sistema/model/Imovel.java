package com.invistaix.sistema.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "IMOVEIS")
public class Imovel {

    @Id
    @Column(name = "imovel_id")
    private Integer id;

    @Column(name = "nome_imovel", nullable = false, length = 100)
    private String nomeImovel;

    @Column(name = "tipo_imovel", nullable = false, length = 50)
    private String tipoImovel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "endereco_id", nullable = false)
    private Endereco endereco;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proprietario_id", nullable = false)
    private Proprietario proprietario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gestor_id")
    private Gestor gestor;

    @Column(name = "valor_matricula", nullable = false, precision = 10, scale = 2)
    private BigDecimal valorMatricula;

    @Column(name = "data_registro_matricula", nullable = false)
    private LocalDate dataRegistroMatricula;

    @Column(name = "valor_aluguel_atual", precision = 10, scale = 2)
    private BigDecimal valorAluguelAtual;

    @Column(name = "valor_venda_estimado", precision = 10, scale = 2)
    private BigDecimal valorVendaEstimado;

    @Column(name = "valor_iptu", precision = 10, scale = 2)
    private BigDecimal valorIptu;

    @Column(name = "area", precision = 10, scale = 2)
    private BigDecimal area;

    @Column(name = "num_quartos")
    private Integer numQuartos;

    @Column(name = "numero_apartamentos")
    private Integer numeroApartamentos;

    // Construtores
    public Imovel() {
    }

    public Imovel(Integer id, String nomeImovel, String tipoImovel, Endereco endereco, Proprietario proprietario,
                  Gestor gestor, BigDecimal valorMatricula, LocalDate dataRegistroMatricula,
                  BigDecimal valorAluguelAtual, BigDecimal valorVendaEstimado, BigDecimal valorIptu,
                  BigDecimal area, Integer numQuartos, Integer numeroApartamentos) {
        this.id = id;
        this.nomeImovel = nomeImovel;
        this.tipoImovel = tipoImovel;
        this.endereco = endereco;
        this.proprietario = proprietario;
        this.gestor = gestor;
        this.valorMatricula = valorMatricula;
        this.dataRegistroMatricula = dataRegistroMatricula;
        this.valorAluguelAtual = valorAluguelAtual;
        this.valorVendaEstimado = valorVendaEstimado;
        this.valorIptu = valorIptu;
        this.area = area;
        this.numQuartos = numQuartos;
        this.numeroApartamentos = numeroApartamentos;
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNomeImovel() {
        return nomeImovel;
    }

    public void setNomeImovel(String nomeImovel) {
        this.nomeImovel = nomeImovel;
    }

    public String getTipoImovel() {
        return tipoImovel;
    }

    public void setTipoImovel(String tipoImovel) {
        this.tipoImovel = tipoImovel;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Proprietario getProprietario() {
        return proprietario;
    }

    public void setProprietario(Proprietario proprietario) {
        this.proprietario = proprietario;
    }

    public Gestor getGestor() {
        return gestor;
    }

    public void setGestor(Gestor gestor) {
        this.gestor = gestor;
    }

    public BigDecimal getValorMatricula() {
        return valorMatricula;
    }

    public void setValorMatricula(BigDecimal valorMatricula) {
        this.valorMatricula = valorMatricula;
    }

    public LocalDate getDataRegistroMatricula() {
        return dataRegistroMatricula;
    }

    public void setDataRegistroMatricula(LocalDate dataRegistroMatricula) {
        this.dataRegistroMatricula = dataRegistroMatricula;
    }

    public BigDecimal getValorAluguelAtual() {
        return valorAluguelAtual;
    }

    public void setValorAluguelAtual(BigDecimal valorAluguelAtual) {
        this.valorAluguelAtual = valorAluguelAtual;
    }

    public BigDecimal getValorVendaEstimado() {
        return valorVendaEstimado;
    }

    public void setValorVendaEstimado(BigDecimal valorVendaEstimado) {
        this.valorVendaEstimado = valorVendaEstimado;
    }

    public BigDecimal getValorIptu() {
        return valorIptu;
    }

    public void setValorIptu(BigDecimal valorIptu) {
        this.valorIptu = valorIptu;
    }

    public BigDecimal getArea() {
        return area;
    }

    public void setArea(BigDecimal area) {
        this.area = area;
    }

    public Integer getNumQuartos() {
        return numQuartos;
    }

    public void setNumQuartos(Integer numQuartos) {
        this.numQuartos = numQuartos;
    }

    public Integer getNumeroApartamentos() {
        return numeroApartamentos;
    }

    public void setNumeroApartamentos(Integer numeroApartamentos) {
        this.numeroApartamentos = numeroApartamentos;
    }
}