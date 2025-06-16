package com.invistaix.sistema.controller;

import com.invistaix.sistema.model.Gestor;
import com.invistaix.sistema.service.GestorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gestores")
public class GestorController {

    @Autowired
    private GestorService gestorService;

    // Criar um novo gestor
    @PostMapping
    public ResponseEntity<Gestor> createGestor(@RequestBody Gestor gestor) {
        Gestor savedGestor = gestorService.save(gestor);
        return ResponseEntity.ok(savedGestor);
    }

    // Listar todos os gestores
    @GetMapping
    public ResponseEntity<List<Gestor>> getAllGestores() {
        List<Gestor> gestores = gestorService.findAll();
        return ResponseEntity.ok(gestores);
    }

    // Buscar um gestor por ID
    @GetMapping("/{id}")
    public ResponseEntity<Gestor> getGestorById(@PathVariable Integer id) {
        Gestor gestor = gestorService.findById(id);
        return ResponseEntity.ok(gestor);
    }

    // Atualizar um gestor existente
    @PutMapping("/{id}")
    public ResponseEntity<Gestor> updateGestor(@PathVariable Integer id, @RequestBody Gestor gestor) {
        Gestor updatedGestor = gestorService.update(id, gestor);
        return ResponseEntity.ok(updatedGestor);
    }

    // Deletar um gestor
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGestor(@PathVariable Integer id) {
        gestorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}