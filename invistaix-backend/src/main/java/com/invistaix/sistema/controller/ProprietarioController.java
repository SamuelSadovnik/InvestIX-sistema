package com.invistaix.sistema.controller;

import com.invistaix.sistema.model.Proprietario;
import com.invistaix.sistema.model.AuthenticatedUser;
import com.invistaix.sistema.service.ProprietarioService;
import com.invistaix.sistema.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/proprietarios")
public class ProprietarioController {
    
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ProprietarioService proprietarioService;

    // Criar um novo proprietário
    @PostMapping
    public ResponseEntity<Proprietario> createProprietario(@RequestBody Proprietario proprietario) {
        if (proprietario.getSenha() == null || proprietario.getSenha().isEmpty()) {
            throw new IllegalArgumentException("Senha é obrigatória");
        }
        Proprietario savedProprietario = proprietarioService.save(proprietario);
        return ResponseEntity.ok(savedProprietario);
    }

    @GetMapping("/gestor")
    public ResponseEntity<List<Proprietario>> listarProprietariosDoGestor(Authentication authentication) {
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();
        Integer gestorId = user.getId();

        List<Proprietario> proprietarios = proprietarioService.listarPorGestor(gestorId);

        return ResponseEntity.ok(proprietarios);
    }


    // Listar todos os proprietários (admin) ou proprietários associados ao gestor
    @GetMapping
    public ResponseEntity<List<Proprietario>> getAllProprietarios(Authentication authentication) {
        Integer gestorId = null;
        
        // Check if user is a gestor
        if (authentication != null && authentication.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_GESTOR"))) {
            // Get gestor ID from authentication principal
            gestorId = ((AuthenticatedUser) authentication.getPrincipal()).getId();
        }
        
        List<Proprietario> proprietarios = proprietarioService.findAll(gestorId);
        return ResponseEntity.ok(proprietarios);
    }

    // Buscar um proprietário por ID
    @GetMapping("/{id}")
    public ResponseEntity<Proprietario> getProprietarioById(@PathVariable Integer id) {
        Proprietario proprietario = proprietarioService.findById(id);
        return ResponseEntity.ok(proprietario);
    }

    // Atualizar um proprietário existente
    @PutMapping("/{id}")
    public ResponseEntity<Proprietario> updateProprietario(@PathVariable Integer id, @RequestBody Proprietario proprietario) {
        Proprietario updatedProprietario = proprietarioService.update(id, proprietario);
        return ResponseEntity.ok(updatedProprietario);
    }

    // Deletar um proprietário
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProprietario(@PathVariable Integer id) {
        proprietarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}