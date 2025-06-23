package com.invistaix.sistema.controller;

import com.invistaix.sistema.dto.PropertyDetailsDTO;
import com.invistaix.sistema.model.Imovel;
import com.invistaix.sistema.service.ImovelService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import com.invistaix.sistema.model.AuthenticatedUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/imoveis")
public class ImovelController {

    @Autowired
    private ImovelService imovelService;

    // Criar um novo imóvel com upload de imagem
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, Object>> createImovel(
            @RequestPart("imovel") Imovel imovel,
            @RequestPart(value = "foto", required = false) MultipartFile foto) throws IOException {
        
        try {
            if (foto != null && !foto.isEmpty()) {
                imovel.setFotoImovel(foto.getBytes());
            }
            
            Imovel savedImovel = imovelService.save(imovel);
            
            // Return minimal response to avoid serialization issues
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedImovel.getId());
            response.put("nomeImovel", savedImovel.getNomeImovel());
            response.put("status", "success");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Log the full error for debugging
            System.err.println("Error creating property: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to create property: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    // Listar todos os imóveis com base no papel do usuário
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getImoveis(Authentication authentication) {
        try {
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();
            Integer userId = user.getId();
            
            List<Imovel> imoveis;
            
            if (authorities.stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))) {
                imoveis = imovelService.findAll();
            } else if (authorities.stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_GESTOR"))) {
                imoveis = imovelService.findByGestorId(userId);
            } else {
                imoveis = imovelService.findByProprietarioId(userId);
            }

            List<Map<String, Object>> response = new ArrayList<>();
            for (Imovel imovel : imoveis) {
                Map<String, Object> dto = new HashMap<>();
                dto.put("id", imovel.getId());
                dto.put("nomeImovel", imovel.getNomeImovel());
                dto.put("tipoImovel", imovel.getTipoImovel());
                dto.put("endereco", imovel.getEndereco());
                dto.put("valorAluguelAtual", imovel.getValorAluguelAtual());
                dto.put("valorVendaEstimado", imovel.getValorVendaEstimado());
                dto.put("numQuartos", imovel.getNumQuartos());
                dto.put("area", imovel.getArea());
                
                if (imovel.getFotoImovel() != null) {
                    dto.put("fotoImovel", Base64.getEncoder().encodeToString(imovel.getFotoImovel()));
                }
                response.add(dto);
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("Error in getImoveis: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.emptyList());
        }
    }

    // Buscar um imóvel por ID
    @GetMapping("/{id}")
    public ResponseEntity<Imovel> getImovelById(@PathVariable Integer id) {
        Imovel imovel = imovelService.findById(id);
        return ResponseEntity.ok(imovel);
    }

    // Buscar detalhes completos do imóvel por ID
    @GetMapping("/properties/{id}")
    public ResponseEntity<?> getPropertyDetails(@PathVariable Integer id, Authentication authentication) {
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();
        Integer userId = user.getId();
        
        // Admin can access any property
        if (authorities.stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"))) {
            PropertyDetailsDTO propertyDetails = imovelService.getPropertyDetails(id);
            return ResponseEntity.ok(propertyDetails);
        }
        
        // Gestor can access properties they manage
        if (authorities.stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_GESTOR"))) {
            List<Imovel> gestorProperties = imovelService.findByGestorId(userId);
            boolean hasAccess = gestorProperties.stream().anyMatch(p -> p.getId().equals(id));
            
            if (hasAccess) {
                PropertyDetailsDTO propertyDetails = imovelService.getPropertyDetails(id);
                return ResponseEntity.ok(propertyDetails);
            }
        }
        
        // Proprietario can access their own properties
        if (authorities.stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_PROPRIETARIO"))) {
            List<Imovel> ownerProperties = imovelService.findByProprietarioId(userId);
            boolean hasAccess = ownerProperties.stream().anyMatch(p -> p.getId().equals(id));
            
            if (hasAccess) {
                PropertyDetailsDTO propertyDetails = imovelService.getPropertyDetails(id);
                return ResponseEntity.ok(propertyDetails);
            }
        }
        
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
            Map.of("error", "Acesso negado. Você não tem permissão para visualizar este imóvel")
        );
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