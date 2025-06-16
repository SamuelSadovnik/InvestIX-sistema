package com.invistaix.sistema.Controller;

import com.invistaix.sistema.controller.EnderecoController;
import com.invistaix.sistema.model.Endereco;
import com.invistaix.sistema.service.EnderecoService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EnderecoControllerTest {

    @Mock
    private EnderecoService enderecoService;

    @InjectMocks
    private EnderecoController enderecoController;

    @Test
    void testCreateEndereco() {
        Endereco endereco = new Endereco(
            null, "Rua Teste", "123", "Bairro Teste", "Cidade Teste", 
            "SP", "12345678", new BigDecimal("10.12345678"), new BigDecimal("-20.12345678")
        );
        Endereco savedEndereco = new Endereco(
            1, "Rua Teste", "123", "Bairro Teste", "Cidade Teste", 
            "SP", "12345678", new BigDecimal("10.12345678"), new BigDecimal("-20.12345678")
        );
        
        when(enderecoService.save(any(Endereco.class))).thenReturn(savedEndereco);

        ResponseEntity<Endereco> response = enderecoController.createEndereco(endereco);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(1, response.getBody().getId());
        assertEquals("Rua Teste", response.getBody().getRua());
        verify(enderecoService, times(1)).save(any(Endereco.class));
    }

    @Test
    void testDeleteEndereco() {
        Integer id = 1;
        doNothing().when(enderecoService).delete(id);

        ResponseEntity<Void> response = enderecoController.deleteEndereco(id);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(enderecoService, times(1)).delete(id);
    }

    @Test
    void testGetAllEnderecos() {
        Endereco endereco1 = new Endereco(
            1, "Rua Teste 1", "123", "Bairro 1", "Cidade 1", 
            "SP", "12345678", new BigDecimal("10.12345678"), new BigDecimal("-20.12345678")
        );
        Endereco endereco2 = new Endereco(
            2, "Rua Teste 2", "456", "Bairro 2", "Cidade 2", 
            "RJ", "87654321", new BigDecimal("11.12345678"), new BigDecimal("-21.12345678")
        );
        List<Endereco> enderecos = Arrays.asList(endereco1, endereco2);
        
        when(enderecoService.findAll()).thenReturn(enderecos);

        ResponseEntity<List<Endereco>> response = enderecoController.getAllEnderecos();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        assertEquals("Rua Teste 1", response.getBody().get(0).getRua());
        assertEquals("Rua Teste 2", response.getBody().get(1).getRua());
        verify(enderecoService, times(1)).findAll();
    }

    @Test
    void testGetEnderecoById() {

        Integer id = 1;
        Endereco endereco = new Endereco(
            id, "Rua Teste", "123", "Bairro Teste", "Cidade Teste", 
            "SP", "12345678", new BigDecimal("10.12345678"), new BigDecimal("-20.12345678")
        );
        
        when(enderecoService.findById(id)).thenReturn(endereco);

        ResponseEntity<Endereco> response = enderecoController.getEnderecoById(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(id, response.getBody().getId());
        assertEquals("Rua Teste", response.getBody().getRua());
        verify(enderecoService, times(1)).findById(id);
    }

    @Test
    void testUpdateEndereco() {

        Integer id = 1;
        Endereco endereco = new Endereco(
            id, "Rua Atualizada", "456", "Bairro Novo", "Cidade Nova", 
            "RJ", "87654321", new BigDecimal("11.12345678"), new BigDecimal("-21.12345678")
        );
        
        when(enderecoService.update(eq(id), any(Endereco.class))).thenReturn(endereco);

        ResponseEntity<Endereco> response = enderecoController.updateEndereco(id, endereco);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(id, response.getBody().getId());
        assertEquals("Rua Atualizada", response.getBody().getRua());
        verify(enderecoService, times(1)).update(eq(id), any(Endereco.class));
    }
}