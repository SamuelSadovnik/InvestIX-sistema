package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Gestor;
import com.invistaix.sistema.repository.GestorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GestorService {

    @Autowired
    private GestorRepository gestorRepository;

    // Criar ou atualizar um gestor
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
        return gestorRepository.save(gestor);
    }

    // Listar todos os gestores
    public List<Gestor> findAll() {
        return gestorRepository.findAll();
    }

    // Buscar um gestor por ID
    public Gestor findById(Integer id) {
        Optional<Gestor> gestor = gestorRepository.findById(id);
        if (gestor.isEmpty()) {
            throw new RuntimeException("Gestor com ID " + id + " não encontrado");
        }
        return gestor.get();
    }

    // Atualizar um gestor existente
    public Gestor update(Integer id, Gestor gestor) {
        // Verifica se o gestor existe
        Gestor existingGestor = findById(id);
        // Atualiza os campos do gestor existente
        existingGestor.setNome(gestor.getNome());
        existingGestor.setEmail(gestor.getEmail());
        existingGestor.setCpf(gestor.getCpf());
        existingGestor.setSenha(gestor.getSenha());
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