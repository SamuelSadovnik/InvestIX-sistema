package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Rendimento;
import com.invistaix.sistema.repository.RendimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RendimentoService {

    @Autowired
    private RendimentoRepository rendimentoRepository;

    // Criar ou atualizar um rendimento
    public Rendimento save(Rendimento rendimento) {
        return rendimentoRepository.save(rendimento);
    }

    // Listar todos os rendimentos
    public List<Rendimento> findAll() {
        return rendimentoRepository.findAll();
    }

    // Buscar um rendimento por ID
    public Rendimento findById(Integer id) {
        Optional<Rendimento> rendimento = rendimentoRepository.findById(id);
        if (rendimento.isEmpty()) {
            throw new RuntimeException("Rendimento com ID " + id + " não encontrado");
        }
        return rendimento.get();
    }

    // Atualizar um rendimento existente
    public Rendimento update(Integer id, Rendimento rendimento) {
        // Verifica se o rendimento existe
        Rendimento existingRendimento = findById(id);
        // Atualiza os campos do rendimento existente
        existingRendimento.setValorRendimento(rendimento.getValorRendimento());
        existingRendimento.setDataRendimento(rendimento.getDataRendimento());
        existingRendimento.setDescricao(rendimento.getDescricao());
        existingRendimento.setImoveis(rendimento.getImoveis());
        // Salva o rendimento atualizado
        return save(existingRendimento);
    }

    // Deletar um rendimento por ID
    public void delete(Integer id) {
        rendimentoRepository.findById(id); // Verifica se o rendimento existe antes de deletar
        rendimentoRepository.deleteById(id);
    }
}