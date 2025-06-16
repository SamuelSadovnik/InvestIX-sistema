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
    Optional<Proprietario> findByEmail(String email);
    Optional<Proprietario> findByTelefone(String telefone);
    Optional<Proprietario> findByCpfCnpj(String cpfCnpj);
    boolean existsByEmail(String email);

    // Contar quantos registros da entidade `Imovel` estão associados a um proprietário específico
    @Query("SELECT p, COUNT(i) " +
           "FROM Proprietario p " +
           "LEFT JOIN Imovel i ON p.id = i.proprietario.id " +
           "GROUP BY p.id")
    List<Object[]> findAllProprietariosWithImovelCount();

    // Conta o número de registros da entidade `Imovel` associados a cada `Proprietario`
    @Query("SELECT COUNT(i) FROM Imovel i WHERE i.proprietario.id = :proprietarioId")
    Long countByProprietarioId(@Param("proprietarioId") Integer proprietarioId);
}