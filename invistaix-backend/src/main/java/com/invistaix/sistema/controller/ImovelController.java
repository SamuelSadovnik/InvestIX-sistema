package com.invistaix.sistema.controller;

import com.invistaix.sistema.model.Imovel;
import com.invistaix.sistema.service.ImovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/imoveis")
public class ImovelController {

    @Autowired
    private ImovelService imovelService;

    // Criar um novo imóvel
    @PostMapping
    public ResponseEntity<Imovel> createImovel(@RequestBody Imovel imovel) {
        Imovel savedImovel = imovelService.save(imovel);
        return ResponseEntity.ok(savedImovel);
    }

    // Listar todos os imóveis
    @GetMapping
    public ResponseEntity<List<Imovel>> getAllImoveis() {
        List<Imovel> imoveis = imovelService.findAll();
        return ResponseEntity.ok(imoveis);
    }

    // Buscar um imóvel por ID
    @GetMapping("/{id}")
    public ResponseEntity<Imovel> getImovelById(@PathVariable Integer id) {
        Imovel imovel = imovelService.findById(id);
        return ResponseEntity.ok(imovel);
    }

    // Atualizar um imóvel existente
    @PutMapping("/{id}")
    public ResponseEntity<Imovel> updateImovel(@PathVariable Integer id, @RequestBody Imovel imovel) {
        Imovel updatedImovel = imovelService.update(id, imovel);
        return ResponseEntity.ok(updatedImovel);
    }

    // Deletar um imóvel
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImovel(@PathVariable Integer id) {
        imovelService.delete(id);
        return ResponseEntity.noContent().build();
    }
}