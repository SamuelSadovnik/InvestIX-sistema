package com.invistaix.sistema.controller;

import com.invistaix.sistema.model.Rendimento;
import com.invistaix.sistema.service.RendimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rendimentos")
public class RendimentoController {

    @Autowired
    private RendimentoService rendimentoService;

    // Criar um novo rendimento
    @PostMapping
    public ResponseEntity<Rendimento> createRendimento(@RequestBody Rendimento rendimento) {
        Rendimento savedRendimento = rendimentoService.save(rendimento);
        return ResponseEntity.ok(savedRendimento);
    }

    // Listar todos os rendimentos
    @GetMapping
    public ResponseEntity<List<Rendimento>> getAllRendimentos() {
        List<Rendimento> rendimentos = rendimentoService.findAll();
        return ResponseEntity.ok(rendimentos);
    }

    // Buscar um rendimento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Rendimento> getRendimentoById(@PathVariable Integer id) {
        Rendimento rendimento = rendimentoService.findById(id);
        return ResponseEntity.ok(rendimento);
    }

    // Atualizar um rendimento existente
    @PutMapping("/{id}")
    public ResponseEntity<Rendimento> updateRendimento(@PathVariable Integer id, @RequestBody Rendimento rendimento) {
        Rendimento updatedRendimento = rendimentoService.update(id, rendimento);
        return ResponseEntity.ok(updatedRendimento);
    }

    // Deletar um rendimento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRendimento(@PathVariable Integer id) {
        rendimentoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}