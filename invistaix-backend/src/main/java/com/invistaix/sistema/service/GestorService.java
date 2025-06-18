package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Gestor;
import com.invistaix.sistema.repository.GestorRepository;
import com.invistaix.sistema.repository.ImovelRepository;
import com.invistaix.sistema.util.PasswordEncoderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GestorService {    @Autowired
    private GestorRepository gestorRepository;
    
    @Autowired
    private ImovelRepository imovelRepository;
    
    @Autowired
    private PasswordEncoderUtil passwordEncoderUtil;    // Criar ou atualizar um gestor
    public Gestor save(Gestor gestor) {
        // Verifica se já existe um gestor com o mesmo email ou CPF
        Optional<Gestor> existingByEmail = gestorRepository.findByEmail(gestor.getEmail());
        if (existingByEmail.isPresent() && !existingByEmail.get().getId().equals(gestor.getId())) {
            throw new RuntimeException("Email " + gestor.getEmail() + " já está em uso");
        }
        Optional<Gestor> existingByCpf = gestorRepository.findByCpf(gestor.getCpf());
        if (existingByCpf.isPresent() && !existingByCpf.get().getId().equals(gestor.getId())) {
            throw new RuntimeException("CPF " + gestor.getCpf() + " já está em uso");
        }
        
        // Criptografar a senha antes de salvar (apenas se for um novo gestor ou se a senha foi modificada)
        if (gestor.getId() == null) {
            gestor.setSenha(passwordEncoderUtil.encodePassword(gestor.getSenha()));
        } else if (existingByEmail.isPresent()) {
            // Para atualizações, só criptografa se a senha foi alterada
            Gestor existingGestor = existingByEmail.get();
            if (!existingGestor.getSenha().equals(gestor.getSenha())) {
                gestor.setSenha(passwordEncoderUtil.encodePassword(gestor.getSenha()));
            }
        }
        
        return gestorRepository.save(gestor);
    }

    // Listar todos os gestores com contagem de imóveis
    public List<Gestor> findAll() {
        List<Gestor> gestores = gestorRepository.findAll();
        for (Gestor gestor : gestores) {
            int propertyCount = imovelRepository.countByGestorId(gestor.getId());
            gestor.setPropertyCount(propertyCount);
        }
        return gestores;
    }

    // Buscar um gestor por ID
    public Gestor findById(Integer id) {
        Optional<Gestor> gestor = gestorRepository.findById(id);
        if (gestor.isEmpty()) {
            throw new RuntimeException("Gestor com ID " + id + " não encontrado");
        }
        return gestor.get();
    }    // Atualizar um gestor existente
    public Gestor update(Integer id, Gestor gestor) {
        // Verifica se o gestor existe
        Gestor existingGestor = findById(id);
        // Atualiza os campos do gestor existente
        existingGestor.setNome(gestor.getNome());
        existingGestor.setEmail(gestor.getEmail());
        existingGestor.setTelefone(gestor.getTelefone());
        existingGestor.setCpf(gestor.getCpf());
        
        // Se a senha foi alterada, aplica a nova senha
        if (!gestor.getSenha().equals(existingGestor.getSenha())) {
            existingGestor.setSenha(gestor.getSenha());
            // A criptografia será feita no método save
        }
        
        // Salva o gestor atualizado (a validação de unicidade é feita no save)
        return save(existingGestor);
    }

    // Deletar um gestor por ID
    public void delete(Integer id) {
        // Verifica se o gestor existe antes de deletar
        gestorRepository.findById(id);
        gestorRepository.deleteById(id);
    }
}