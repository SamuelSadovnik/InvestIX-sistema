package com.invistaix.sistema.controller;

import com.invistaix.sistema.model.Despesa;
import com.invistaix.sistema.service.DespesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/despesas")
public class DespesaController {

    @Autowired
    private DespesaService despesaService;

    // Criar uma nova despesa
    @PostMapping
    public ResponseEntity<Despesa> createDespesa(@RequestBody Despesa despesa) {
        Despesa savedDespesa = despesaService.save(despesa);
        return ResponseEntity.ok(savedDespesa);
    }

    // Listar todas as despesas
    @GetMapping
    public ResponseEntity<List<Despesa>> getAllDespesas() {
        List<Despesa> despesas = despesaService.findAll();
        return ResponseEntity.ok(despesas);
    }

    // Buscar uma despesa por ID
    @GetMapping("/{id}")
    public ResponseEntity<Despesa> getDespesaById(@PathVariable Integer id) {
        Despesa despesa = despesaService.findById(id);
        return ResponseEntity.ok(despesa);
    }

    // Atualizar uma despesa existente
    @PutMapping("/{id}")
    public ResponseEntity<Despesa> updateDespesa(@PathVariable Integer id, @RequestBody Despesa despesa) {
        Despesa updatedDespesa = despesaService.update(id, despesa);
        return ResponseEntity.ok(updatedDespesa);
    }

    // Deletar uma despesa
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDespesa(@PathVariable Integer id) {
        despesaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}