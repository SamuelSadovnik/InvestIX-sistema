package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Avaliacao;
import com.invistaix.sistema.repository.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    // Criar ou atualizar uma avaliação
    public Avaliacao save(Avaliacao avaliacao) {
        return avaliacaoRepository.save(avaliacao);
    }

    // Listar todas as avaliações
    public List<Avaliacao> findAll() {
        return avaliacaoRepository.findAll();
    }

    // Buscar uma avaliação por ID
    public Avaliacao findById(Integer id) {
        Optional<Avaliacao> avaliacao = avaliacaoRepository.findById(id);
        if (avaliacao.isEmpty()) {
            throw new RuntimeException("Avaliação com ID " + id + " não encontrada");
        }
        return avaliacao.get();
    }

    // Atualizar uma avaliação existente
    public Avaliacao update(Integer id, Avaliacao avaliacao) {
        // Verifica se a avaliação existe
        Avaliacao existingAvaliacao = findById(id);
        // Atualiza os campos da avaliação existente
        existingAvaliacao.setImovel(avaliacao.getImovel());
        existingAvaliacao.setValorAvaliacao(avaliacao.getValorAvaliacao());
        existingAvaliacao.setDataAvaliacao(avaliacao.getDataAvaliacao());
        // Salva a avaliação atualizada
        return save(existingAvaliacao);
    }

    // Deletar uma avaliação por ID
    public void delete(Integer id) {
        avaliacaoRepository.findById(id); // Verifica se a avaliação existe antes de deletar
        avaliacaoRepository.deleteById(id);
    }
}