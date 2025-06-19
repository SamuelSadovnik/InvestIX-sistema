package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Proprietario;
import com.invistaix.sistema.repository.ProprietarioRepository;
import com.invistaix.sistema.util.PasswordEncoderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProprietarioService {

    @Autowired
    private ProprietarioRepository proprietarioRepository;

    @Autowired
    private PasswordEncoderUtil passwordEncoder;

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

        // Se o proprietário já existe, verifica se a senha foi alterada
        if (proprietario.getId() != null) {
            Proprietario existing = proprietarioRepository.findById(proprietario.getId())
                .orElseThrow(() -> new RuntimeException("Proprietário não encontrado"));
            
            // Se a senha foi fornecida e é diferente da existente, aplica hash
            if (proprietario.getSenha() != null && !proprietario.getSenha().isEmpty()) {
                proprietario.setSenha(passwordEncoder.encodePassword(proprietario.getSenha()));
            } else {
                // Mantém a senha existente se não foi fornecida
                proprietario.setSenha(existing.getSenha());
            }
        } else {
            // Para novo proprietário, aplica hash na senha
            if (proprietario.getSenha() == null || proprietario.getSenha().isEmpty()) {
                throw new IllegalArgumentException("Senha é obrigatória");
            }
            proprietario.setSenha(passwordEncoder.encodePassword(proprietario.getSenha()));
        }

        return proprietarioRepository.save(proprietario);
    }

    // Listar todos os proprietários (admin) ou proprietários associados ao gestor
    public List<Proprietario> findAll(Integer gestorId) {
        if (gestorId != null) {
            return proprietarioRepository.findByGestorId(gestorId);
        }
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
        
        // Atualiza a senha apenas se for fornecida
        if (proprietario.getSenha() != null && !proprietario.getSenha().isEmpty()) {
            existingProprietario.setSenha(passwordEncoder.encodePassword(proprietario.getSenha()));
        }
        
        // Salva o proprietário atualizado
        return save(existingProprietario);
    }

    // Deletar um proprietário por ID
    public void delete(Integer id) {        // Verifica se o proprietário existe antes de deletar
        findById(id);
        
        // Check if the owner has any properties
        Long propertyCount = proprietarioRepository.countByProprietarioId(id);
        if (propertyCount > 0) {
            throw new RuntimeException("Não é possível excluir o proprietário pois ele possui imóveis associados");
        }
        
        proprietarioRepository.deleteById(id);
    }
}