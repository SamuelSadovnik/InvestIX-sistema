package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Proprietario;
import com.invistaix.sistema.repository.ProprietarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProprietarioService {

    @Autowired
    private ProprietarioRepository proprietarioRepository;

    // Criar ou atualizar um proprietário
    public Proprietario save(Proprietario proprietario) {
        // Verifica se já existe um proprietário com o mesmo email, telefone ou CPF/CNPJ
        Optional<Proprietario> existingByEmail = proprietarioRepository.findByEmail(proprietario.getEmail());
        if (existingByEmail.isPresent() && !existingByEmail.get().getId().equals(proprietario.getId())) {
            throw new RuntimeException("Email " + proprietario.getEmail() + " já está em uso");
        }
        Optional<Proprietario> existingByTelefone = proprietarioRepository.findByTelefone(proprietario.getTelefone());
        if (existingByTelefone.isPresent() && !existingByTelefone.get().getId().equals(proprietario.getId())) {
            throw new RuntimeException("Telefone " + proprietario.getTelefone() + " já está em uso");
        }
        Optional<Proprietario> existingByCpfCnpj = proprietarioRepository.findByCpfCnpj(proprietario.getCpfCnpj());
        if (existingByCpfCnpj.isPresent() && !existingByCpfCnpj.get().getId().equals(proprietario.getId())) {
            throw new RuntimeException("CPF/CNPJ " + proprietario.getCpfCnpj() + " já está em uso");
        }
        return proprietarioRepository.save(proprietario);
    }

    // Listar todos os proprietários
    public List<Proprietario> findAll() {
        return proprietarioRepository.findAll();
    }

    // Buscar um proprietário por ID
    public Proprietario findById(Integer id) {
        Optional<Proprietario> proprietario = proprietarioRepository.findById(id);
        if (proprietario.isEmpty()) {
            throw new RuntimeException("Proprietário com ID " + id + " não encontrado");
        }
        return proprietario.get();
    }

    // Atualizar um proprietário existente
    public Proprietario update(Integer id, Proprietario proprietario) {
        // Verifica se o proprietário existe
        Proprietario existingProprietario = findById(id);
        // Atualiza os campos do proprietário existente
        existingProprietario.setNome(proprietario.getNome());
        existingProprietario.setEmail(proprietario.getEmail());
        existingProprietario.setTelefone(proprietario.getTelefone());
        existingProprietario.setCpfCnpj(proprietario.getCpfCnpj());
        existingProprietario.setSenha(proprietario.getSenha());
        // Salva o proprietário atualizado (a validação de unicidade é feita no save)
        return save(existingProprietario);
    }

    // Deletar um proprietário por ID
    public void delete(Integer id) {
        proprietarioRepository.findById(id); // Verifica se o proprietário existe antes de deletar
        proprietarioRepository.deleteById(id);
    }
}