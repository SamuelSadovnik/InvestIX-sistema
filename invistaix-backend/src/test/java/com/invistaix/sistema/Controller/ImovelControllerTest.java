package com.invistaix.sistema.Controller;

import com.invistaix.sistema.controller.ImovelController;
import com.invistaix.sistema.model.Imovel;
import com.invistaix.sistema.service.ImovelService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ImovelControllerTest {

    @InjectMocks
    private ImovelController imovelController;

    @Mock
    private ImovelService imovelService;

    private Imovel imovel;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        imovel = new Imovel();
        imovel.setId(1);
        imovel.setNomeImovel("Casa Teste");
        imovel.setTipoImovel("Casa");

        imovel.setValorMatricula(new BigDecimal("500000.00"));
        imovel.setDataRegistroMatricula(LocalDate.of(2023, 1, 1));
        imovel.setValorAluguelAtual(new BigDecimal("2000.00"));
        imovel.setValorVendaEstimado(new BigDecimal("600000.00"));
        imovel.setValorIptu(new BigDecimal("1000.00"));
        imovel.setArea(new BigDecimal(150));
        imovel.setNumQuartos(3);
        imovel.setNumeroApartamentos(0);
    }

    @Test
    void testCreateImovel() {

        when(imovelService.save(imovel)).thenReturn(imovel);

        ResponseEntity<Imovel> response = imovelController.createImovel(imovel);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(imovel, response.getBody());
        verify(imovelService, times(1)).save(imovel);
    }

    @Test
    void testGetAllImoveis() {
        List<Imovel> imoveis = Arrays.asList(imovel);
        when(imovelService.findAll()).thenReturn(imoveis);

        ResponseEntity<List<Imovel>> response = imovelController.getAllImoveis();


        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(1, response.getBody().size());
        assertEquals(imovel, response.getBody().get(0));
        verify(imovelService, times(1)).findAll();
    }

    @Test
    void testGetImovelById_Success() {
        when(imovelService.findById(1)).thenReturn(imovel);

        ResponseEntity<Imovel> response = imovelController.getImovelById(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(imovel, response.getBody());
        verify(imovelService, times(1)).findById(1);
    }

    @Test
    void testGetImovelById_NotFound() {
        when(imovelService.findById(1)).thenThrow(new RuntimeException("Imóvel com ID 1 não encontrado"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imovelController.getImovelById(1);
        });
        assertEquals("Imóvel com ID 1 não encontrado", exception.getMessage());
        verify(imovelService, times(1)).findById(1);
    }

    @Test
    void testUpdateImovel_Success() {
        Imovel updatedImovel = new Imovel();
        updatedImovel.setId(1);
        updatedImovel.setNomeImovel("Casa Atualizada");
        when(imovelService.update(1, updatedImovel)).thenReturn(updatedImovel);

        ResponseEntity<Imovel> response = imovelController.updateImovel(1, updatedImovel);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedImovel, response.getBody());
        verify(imovelService, times(1)).update(1, updatedImovel);
    }

    @Test
    void testUpdateImovel_NotFound() {
        when(imovelService.update(1, imovel)).thenThrow(new RuntimeException("Imóvel com ID 1 não encontrado"));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imovelController.updateImovel(1, imovel);
        });
        assertEquals("Imóvel com ID 1 não encontrado", exception.getMessage());
        verify(imovelService, times(1)).update(1, imovel);
    }

    @Test
    void testDeleteImovel_Success() {
        doNothing().when(imovelService).delete(1);

        ResponseEntity<Void> response = imovelController.deleteImovel(1);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(imovelService, times(1)).delete(1);
    }

    @Test
    void testDeleteImovel_NotFound() {
        doThrow(new RuntimeException("Imóvel com ID 1 não encontrado")).when(imovelService).delete(1);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imovelController.deleteImovel(1);
        });
        assertEquals("Imóvel com ID 1 não encontrado", exception.getMessage());
        verify(imovelService, times(1)).delete(1);
    }
}