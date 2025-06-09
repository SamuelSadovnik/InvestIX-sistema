package com.invistaix.sistema.repository;

import com.invistaix.sistema.model.Proprietario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProprietarioRepository extends JpaRepository<Proprietario, Integer> {

    @Query("SELECT p, COUNT(i) " +
           "FROM Proprietario p " +
           "LEFT JOIN Imovel i ON p.id = i.proprietario.id " +
           "GROUP BY p.id")
    List<Object[]> findAllProprietariosWithImovelCount();

    @Query("SELECT COUNT(i) FROM Imovel i WHERE i.proprietario.id = :proprietarioId")
    Long countByProprietarioId(@Param("proprietarioId") Long proprietarioId);
    // Buscar proprietário por email
    Optional<Proprietario> findByEmail(String email);

    // Buscar proprietário por telefone
    Optional<Proprietario> findByTelefone(String telefone);

    // Buscar proprietário por CPF/CNPJ
    Optional<Proprietario> findByCpfCnpj(String cpfCnpj);
}