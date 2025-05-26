package com.invistaix.sistema.repository;

import com.invistaix.sistema.model.Gestor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GestorRepository extends JpaRepository<Gestor, Integer> {

    // Buscar gestor por email
    Optional<Gestor> findByEmail(String email);

    // Buscar gestor por CPF
    Optional<Gestor> findByCpf(String cpf);
}