package com.invistaix.sistema.controller;

import com.invistaix.sistema.model.Imposto;
import com.invistaix.sistema.service.ImpostoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/impostos")
public class ImpostoController {

    @Autowired
    private ImpostoService impostoService;

    // Criar um novo imposto
    @PostMapping
    public ResponseEntity<Imposto> createImposto(@RequestBody Imposto imposto) {
        Imposto savedImposto = impostoService.save(imposto);
        return ResponseEntity.ok(savedImposto);
    }

    // Listar todos os impostos
    @GetMapping
    public ResponseEntity<List<Imposto>> getAllImpostos() {
        List<Imposto> impostos = impostoService.findAll();
        return ResponseEntity.ok(impostos);
    }

    // Buscar um imposto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Imposto> getImpostoById(@PathVariable Integer id) {
        Imposto imposto = impostoService.findById(id);
        return ResponseEntity.ok(imposto);
    }

    // Atualizar um imposto existente
    @PutMapping("/{id}")
    public ResponseEntity<Imposto> updateImposto(@PathVariable Integer id, @RequestBody Imposto imposto) {
        Imposto updatedImposto = impostoService.update(id, imposto);
        return ResponseEntity.ok(updatedImposto);
    }

    // Deletar um imposto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImposto(@PathVariable Integer id) {
        impostoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}