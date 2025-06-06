package com.invistaix.sistema.repository;

import com.invistaix.sistema.model.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProprietarioRepository extends JpaRepository<Proprietario, Integer> {
    Optional<Proprietario> findByEmail(String email);
    Optional<Proprietario> findByTelefone(String telefone);
    Optional<Proprietario> findByCpfCnpj(String cpfCnpj);
    boolean existsByEmail(String email);
}