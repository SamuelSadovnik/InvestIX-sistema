package com.invistaix.sistema.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "AVALIACOES")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "avaliacao_id")
    private Integer id;

    @Column(name = "imovel_id")
    private Integer imovelId;

    @Column(name = "valor_avaliacao", nullable = false)
    private BigDecimal valorAvaliacao;

    @Column(name = "data_avaliacao", nullable = false)
    private LocalDate dataAvaliacao;

    @Column(name = "gestor_id")
    private Integer gestorId;

    // Construtores
    public Avaliacao() {
    }

    public Avaliacao(Integer id, Integer imovelId, BigDecimal valorAvaliacao, LocalDate dataAvaliacao, Integer gestorId) {
        this.id = id;
        this.imovelId = imovelId;
        this.valorAvaliacao = valorAvaliacao;
        this.dataAvaliacao = dataAvaliacao;
        this.gestorId = gestorId;
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getImovelId() {
        return imovelId;
    }

    public void setImovelId(Integer imovelId) {
        this.imovelId = imovelId;
    }

    public BigDecimal getValorAvaliacao() {
        return valorAvaliacao;
    }

    public void setValorAvaliacao(BigDecimal valorAvaliacao) {
        this.valorAvaliacao = valorAvaliacao;
    }

    public LocalDate getDataAvaliacao() {
        return dataAvaliacao;
    }

    public void setDataAvaliacao(LocalDate dataAvaliacao) {
        this.dataAvaliacao = dataAvaliacao;
    }

    public Integer getGestorId() {
        return gestorId;
    }

    public void setGestorId(Integer gestorId) {
        this.gestorId = gestorId;
    }
}