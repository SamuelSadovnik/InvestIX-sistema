package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Imposto;
import com.invistaix.sistema.repository.ImpostoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImpostoService {

    @Autowired
    private ImpostoRepository impostoRepository;

    // Criar ou atualizar um imposto
    public Imposto save(Imposto imposto) {
        return impostoRepository.save(imposto);
    }

    // Listar todos os impostos
    public List<Imposto> findAll() {
        return impostoRepository.findAll();
    }

    // Buscar um imposto por ID
    public Imposto findById(Integer id) {
        Optional<Imposto> imposto = impostoRepository.findById(id);
        if (imposto.isEmpty()) {
            throw new RuntimeException("Imposto com ID " + id + " não encontrado");
        }
        return imposto.get();
    }

    // Atualizar um imposto existente
    public Imposto update(Integer id, Imposto imposto) {
        // Verifica se o imposto existe
        Imposto existingImposto = findById(id);
        // Atualiza os campos do imposto existente
        existingImposto.setValorImposto(imposto.getValorImposto());
        existingImposto.setDataImposto(imposto.getDataImposto());
        existingImposto.setDescricao(imposto.getDescricao());
        existingImposto.setImoveis(imposto.getImoveis());
        // Salva o imposto atualizado
        return save(existingImposto);
    }

    // Deletar um imposto por ID
    public void delete(Integer id) {
        impostoRepository.findById(id); // Verifica se o imposto existe antes de deletar
        impostoRepository.deleteById(id);
    }
}