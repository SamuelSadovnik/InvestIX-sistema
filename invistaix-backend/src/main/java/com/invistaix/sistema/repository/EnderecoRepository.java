package com.invistaix.sistema.repository;

import com.invistaix.sistema.model.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnderecoRepository extends JpaRepository<Endereco, Integer> {

    // Buscar endereços por cidade
    List<Endereco> findByCidade(String cidade);

    // Buscar endereços por estado
    List<Endereco> findByEstado(String estado);

    // Buscar endereços por CEP
    List<Endereco> findByCep(String cep);
}