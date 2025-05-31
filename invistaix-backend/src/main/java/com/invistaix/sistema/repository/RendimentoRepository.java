package com.invistaix.sistema.repository;

import com.invistaix.sistema.model.Rendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RendimentoRepository extends JpaRepository<Rendimento, Integer> {
}