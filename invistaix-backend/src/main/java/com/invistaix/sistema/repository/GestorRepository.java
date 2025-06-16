package com.invistaix.sistema.repository;

import com.invistaix.sistema.model.Gestor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GestorRepository extends JpaRepository<Gestor, Integer> {
    Optional<Gestor> findByEmail(String email);
    Optional<Gestor> findByCpf(String cpf);
    boolean existsByEmail(String email);
}