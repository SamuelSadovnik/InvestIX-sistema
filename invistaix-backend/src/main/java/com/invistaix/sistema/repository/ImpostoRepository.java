package com.invistaix.sistema.repository;

import com.invistaix.sistema.model.Imposto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImpostoRepository extends JpaRepository<Imposto, Integer> {
}