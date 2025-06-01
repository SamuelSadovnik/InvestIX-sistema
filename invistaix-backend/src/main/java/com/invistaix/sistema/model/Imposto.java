package com.invistaix.sistema.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "IMPOSTOS")
public class Imposto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "imposto_id")
    private Integer id;

    @Column(name = "valor_imposto", nullable = false)
    private BigDecimal valorImposto;

    @Column(name = "data_imposto", nullable = false)
    private LocalDate dataImposto;

    @Column(name = "descricao", length = 255)
    private String descricao;

    @ManyToMany(mappedBy = "impostos")
    private Set<Imovel> imoveis;

    // Construtores
    public Imposto() {
    }

    public Imposto(Integer id, BigDecimal valorImposto, LocalDate dataImposto, String descricao) {
        this.id = id;
        this.valorImposto = valorImposto;
        this.dataImposto = dataImposto;
        this.descricao = descricao;
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getValorImposto() {
        return valorImposto;
    }

    public void setValorImposto(BigDecimal valorImposto) {
        this.valorImposto = valorImposto;
    }

    public LocalDate getDataImposto() {
        return dataImposto;
    }

    public void setDataImposto(LocalDate dataImposto) {
        this.dataImposto = dataImposto;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Imovel> getImoveis() {
        return imoveis;
    }

    public void setImoveis(Set<Imovel> imoveis) {
        this.imoveis = imoveis;
    }
}