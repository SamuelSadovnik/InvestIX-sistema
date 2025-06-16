package com.invistaix.sistema.controller;

import com.invistaix.sistema.model.Avaliacao;
import com.invistaix.sistema.service.AvaliacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    // Criar uma nova avaliação
    @PostMapping
    public ResponseEntity<Avaliacao> createAvaliacao(@RequestBody Avaliacao avaliacao) {
        Avaliacao savedAvaliacao = avaliacaoService.save(avaliacao);
        return ResponseEntity.ok(savedAvaliacao);
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