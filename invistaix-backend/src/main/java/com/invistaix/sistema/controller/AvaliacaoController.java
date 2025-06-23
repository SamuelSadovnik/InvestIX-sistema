package com.invistaix.sistema.controller;

import com.invistaix.sistema.model.Avaliacao;
import com.invistaix.sistema.service.AvaliacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    // Criar uma nova avaliação
    @PostMapping
    public ResponseEntity<?> createAvaliacao(@RequestBody Avaliacao avaliacao) {
        try {
            // Basic validation
            if (avaliacao.getImovel() == null || avaliacao.getImovel().getId() == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Property ID is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            if (avaliacao.getValorAvaliacao() == null || avaliacao.getValorAvaliacao().compareTo(BigDecimal.ZERO) <= 0) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Assessment value must be positive");
                return ResponseEntity.badRequest().body(error);
            }
            
            Avaliacao savedAvaliacao = avaliacaoService.save(avaliacao);
            return ResponseEntity.ok(savedAvaliacao);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to create assessment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // Listar todas as avaliações
    @GetMapping
    public ResponseEntity<List<Avaliacao>> getAllAvaliacoes() {
        List<Avaliacao> avaliacoes = avaliacaoService.findAll();
        return ResponseEntity.ok(avaliacoes);
    }

    // Buscar uma avaliação por ID
    @GetMapping("/{id}")
    public ResponseEntity<Avaliacao> getAvaliacaoById(@PathVariable Integer id) {
        Avaliacao avaliacao = avaliacaoService.findById(id);
        return ResponseEntity.ok(avaliacao);
    }

    // Atualizar uma avaliação existente
    @PutMapping("/{id}")
    public ResponseEntity<Avaliacao> updateAvaliacao(@PathVariable Integer id, @RequestBody Avaliacao avaliacao) {
        Avaliacao updatedAvaliacao = avaliacaoService.update(id, avaliacao);
        return ResponseEntity.ok(updatedAvaliacao);
    }

    // Deletar uma avaliação
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvaliacao(@PathVariable Integer id) {
        avaliacaoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}