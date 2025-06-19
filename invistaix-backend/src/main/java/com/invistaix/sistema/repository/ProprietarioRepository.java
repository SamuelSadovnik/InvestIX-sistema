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
    Long countByProprietarioId(@Param("proprietarioId") Integer proprietarioId);

    Optional<Proprietario> findByEmail(String email);
    Optional<Proprietario> findByTelefone(String telefone);
    Optional<Proprietario> findByDocumento(String documento);
    boolean existsByEmail(String email);
    
    @Query("SELECT DISTINCT p FROM Proprietario p " +
           "JOIN Imovel i ON i.proprietario.id = p.id " +
           "WHERE i.gestor.id = :gestorId")
    List<Proprietario> findByGestorId(@Param("gestorId") Integer gestorId);
}