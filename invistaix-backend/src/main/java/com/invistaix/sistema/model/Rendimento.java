package com.invistaix.sistema.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "RENDIMENTOS")
public class Rendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rendimento_id")
    private Integer id;

    @Column(name = "valor_rendimento", nullable = false)
    private BigDecimal valorRendimento;

    @Column(name = "data_rendimento", nullable = false)
    private LocalDate dataRendimento;

    @Column(name = "descricao", length = 255)
    private String descricao;

    @ManyToMany(mappedBy = "rendimentos")
    private Set<Imovel> imoveis;

    // Construtores
    public Rendimento() {
    }

    public Rendimento(Integer id, BigDecimal valorRendimento, LocalDate dataRendimento, String descricao) {
        this.id = id;
        this.valorRendimento = valorRendimento;
        this.dataRendimento = dataRendimento;
        this.descricao = descricao;
    }

    // Getters e Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getValorRendimento() {
        return valorRendimento;
    }

    public void setValorRendimento(BigDecimal valorRendimento) {
        this.valorRendimento = valorRendimento;
    }

    public LocalDate getDataRendimento() {
        return dataRendimento;
    }

    public void setDataRendimento(LocalDate dataRendimento) {
        this.dataRendimento = dataRendimento;
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