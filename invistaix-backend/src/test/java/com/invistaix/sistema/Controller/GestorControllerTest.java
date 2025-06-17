package com.invistaix.sistema.Controller;

import com.invistaix.sistema.controller.GestorController;
import com.invistaix.sistema.model.Gestor;
import com.invistaix.sistema.service.GestorService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class GestorControllerTest {

    @Mock
    private GestorService gestorService;

    @InjectMocks
    private GestorController gestorController;

    public GestorControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateGestor() {
        Gestor gestor = new Gestor(1, "Teste", "teste@example.com", "12345678901", "senha123");
        when(gestorService.save(any(Gestor.class))).thenReturn(gestor);

        ResponseEntity<Gestor> response = gestorController.createGestor(gestor);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(gestor, response.getBody());
        verify(gestorService, times(1)).save(any(Gestor.class));
    }

    @Test
    void testGetAllGestores() {
        List<Gestor> gestores = Arrays.asList(
            new Gestor(1, "Teste1", "teste1@example.com", "12345678901", "senha123"),
            new Gestor(2, "Teste2", "teste2@example.com", "98765432109", "senha456")
        );
        when(gestorService.findAll()).thenReturn(gestores);

        ResponseEntity<List<Gestor>> response = gestorController.getAllGestores();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(gestores, response.getBody());
        assertEquals(2, response.getBody().size());
        verify(gestorService, times(1)).findAll();
    }

    @Test
    void testGetGestorById() {
        Integer id = 1;
        Gestor gestor = new Gestor(id, "Teste", "teste@example.com", "12345678901", "senha123");
        when(gestorService.findById(id)).thenReturn(gestor);

        ResponseEntity<Gestor> response = gestorController.getGestorById(id);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(gestor, response.getBody());
        verify(gestorService, times(1)).findById(id);
    }

    @Test
    void testUpdateGestor() {
        Integer id = 1;
        Gestor gestor = new Gestor(id, "Teste Atualizado", "teste@update.com", "12345678901", "novaSenha");
        when(gestorService.update(eq(id), any(Gestor.class))).thenReturn(gestor);

        ResponseEntity<Gestor> response = gestorController.updateGestor(id, gestor);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(gestor, response.getBody());
        verify(gestorService, times(1)).update(eq(id), any(Gestor.class));
    }

    @Test
    void testDeleteGestor() {
        Integer id = 1;
        doNothing().when(gestorService).delete(id);

        ResponseEntity<Void> response = gestorController.deleteGestor(id);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(gestorService, times(1)).delete(id);
    }
}