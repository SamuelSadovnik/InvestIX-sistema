package com.invistaix.sistema.repository;

import com.invistaix.sistema.model.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProprietarioRepository extends JpaRepository<Proprietario, Integer> {

    // Buscar proprietário por email
    Optional<Proprietario> findByEmail(String email);

    // Buscar proprietário por telefone
    Optional<Proprietario> findByTelefone(String telefone);

    // Buscar proprietário por CPF/CNPJ
    Optional<Proprietario> findByCpfCnpj(String cpfCnpj);
}