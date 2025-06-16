package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Despesa;
import com.invistaix.sistema.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {

    @Autowired
    private DespesaRepository despesaRepository;

    // Criar ou atualizar uma despesa
    public Despesa save(Despesa despesa) {
        return despesaRepository.save(despesa);
    }

    // Listar todas as despesas
    public List<Despesa> findAll() {
        return despesaRepository.findAll();
    }

    // Buscar uma despesa por ID
    public Despesa findById(Integer id) {
        Optional<Despesa> despesa = despesaRepository.findById(id);
        if (despesa.isEmpty()) {
            throw new RuntimeException("Despesa com ID " + id + " não encontrada");
        }
        return despesa.get();
    }

    // Atualizar uma despesa existente
    public Despesa update(Integer id, Despesa despesa) {
        // Verifica se a despesa existe
        Despesa existingDespesa = findById(id);
        // Atualiza os campos da despesa existente
        existingDespesa.setValorDespesa(despesa.getValorDespesa());
        existingDespesa.setDataDespesa(despesa.getDataDespesa());
        existingDespesa.setDescricao(despesa.getDescricao());
        existingDespesa.setImoveis(despesa.getImoveis());
        // Salva a despesa atualizada
        return save(existingDespesa);
    }

    // Deletar uma despesa por ID
    public void delete(Integer id) {
        despesaRepository.findById(id); // Verifica se a despesa existe antes de deletar
        despesaRepository.deleteById(id);
    }
}