package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Endereco;
import com.invistaix.sistema.repository.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    // Criar ou atualizar um endereço
    public Endereco save(Endereco endereco) {
        return enderecoRepository.save(endereco);
    }

    // Listar todos os endereços
    public List<Endereco> findAll() {
        return enderecoRepository.findAll();
    }

    // Buscar um endereço por ID
    public Endereco findById(Integer id) {
        Optional<Endereco> endereco = enderecoRepository.findById(id);
        if (endereco.isEmpty()) {
            throw new RuntimeException("Endereço com ID " + id + " não encontrado");
        }
        return endereco.get();
    }

    // Atualizar um endereço existente
    public Endereco update(Integer id, Endereco endereco) {
        // Verifica se o endereço existe
        Endereco existingEndereco = findById(id);
        // Atualiza os campos do endereço existente
        existingEndereco.setRua(endereco.getRua());
        existingEndereco.setNumero(endereco.getNumero());
        existingEndereco.setBairro(endereco.getBairro());
        existingEndereco.setCidade(endereco.getCidade());
        existingEndereco.setEstado(endereco.getEstado());
        existingEndereco.setCep(endereco.getCep());
        existingEndereco.setLatitude(endereco.getLatitude());
        existingEndereco.setLongitude(endereco.getLongitude());
        return enderecoRepository.save(existingEndereco);
    }

    // Deletar um endereço por ID
    public void delete(Integer id) {
        // Verifica se o endereço existe antes de deletar
        Endereco endereco = findById(id);
        enderecoRepository.deleteById(id);
    }
}