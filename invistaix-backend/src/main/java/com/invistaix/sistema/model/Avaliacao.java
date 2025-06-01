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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "imovel_id")
    private Imovel imovel;

    @Column(name = "valor_avaliacao", nullable = false)
    private BigDecimal valorAvaliacao;

    @Column(name = "data_avaliacao", nullable = false)
    private LocalDate dataAvaliacao;

    // Construtores
    public Avaliacao() {
    }

    public Avaliacao(Integer id, Imovel imovel, BigDecimal valorAvaliacao, LocalDate dataAvaliacao) {
        this.id = id;
        this.imovel = imovel;
        this.valorAvaliacao = valorAvaliacao;
        this.dataAvaliacao = dataAvaliacao;
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Imovel getImovel() {
        return imovel;
    }

    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
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
}