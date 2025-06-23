package com.invistaix.sistema.dto;

import com.invistaix.sistema.model.Avaliacao;
import com.invistaix.sistema.model.Imovel;
import com.invistaix.sistema.model.Proprietario;

import java.math.BigDecimal;
import java.util.List;

public class PropertyDetailsDTO {
    private Imovel imovel;
    private String proprietarioNome;
    private BigDecimal valorAtualizadoINCC;
    private List<Avaliacao> avaliacoes;

    public PropertyDetailsDTO(Imovel imovel, Proprietario proprietario, 
                             BigDecimal valorAtualizadoINCC, List<Avaliacao> avaliacoes) {
        this.imovel = imovel;
        this.proprietarioNome = proprietario.getNome();
        this.valorAtualizadoINCC = valorAtualizadoINCC;
        this.avaliacoes = avaliacoes;
    }

    // Getters
    public Imovel getImovel() {
        return imovel;
    }

    public String getProprietarioNome() {
        return proprietarioNome;
    }

    public BigDecimal getValorAtualizadoINCC() {
        return valorAtualizadoINCC;
    }

    public List<Avaliacao> getAvaliacoes() {
        return avaliacoes;
    }
}