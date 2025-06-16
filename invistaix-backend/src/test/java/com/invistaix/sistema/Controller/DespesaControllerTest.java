package com.invistaix.sistema.Controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import com.invistaix.sistema.controller.DespesaController;
import com.invistaix.sistema.model.Despesa;
import com.invistaix.sistema.service.DespesaService;

@ExtendWith(MockitoExtension.class)
public class DespesaControllerTest {

    @Mock
    private DespesaService despesaService;

    @InjectMocks
    private DespesaController despesaController;

    @Test
    void testCreateDespesa() {
        Despesa despesaInput = new Despesa();
        despesaInput.setValorDespesa(new BigDecimal("100.00"));
        despesaInput.setDataDespesa(LocalDate.of(2025, 6, 16));
        despesaInput.setDescricao("Teste de despesa");

        Despesa despesaSaved = new Despesa();
        despesaSaved.setId(1);
        despesaSaved.setValorDespesa(new BigDecimal("100.00"));
        despesaSaved.setDataDespesa(LocalDate.of(2025, 6, 16));
        despesaSaved.setDescricao("Teste de despesa");

        when(despesaService.save(any(Despesa.class))).thenReturn(despesaSaved);
        ResponseEntity<Despesa> response = despesaController.createDespesa(despesaInput);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(despesaSaved, response.getBody());
        assertEquals(1, response.getBody().getId());
        assertEquals(new BigDecimal("100.00"), response.getBody().getValorDespesa());
        assertEquals(LocalDate.of(2025, 6, 16), response.getBody().getDataDespesa());
        assertEquals("Teste de despesa", response.getBody().getDescricao());
    }

    @Test
    void testDeleteDespesa() {

        Integer id = 1;
        doNothing().when(despesaService).delete(id);
        ResponseEntity<Void> response = despesaController.deleteDespesa(id);

        assertEquals(204, response.getStatusCodeValue());
        verify(despesaService).delete(id);
    }

    @Test
    void testGetAllDespesas() {
        Despesa despesa1 = new Despesa(1, new BigDecimal("100.00"), LocalDate.of(2025, 6, 16), "Despesa 1");
        Despesa despesa2 = new Despesa(2, new BigDecimal("200.00"), LocalDate.of(2025, 6, 17), "Despesa 2");
        List<Despesa> despesas = Arrays.asList(despesa1, despesa2);

        when(despesaService.findAll()).thenReturn(despesas);

        ResponseEntity<List<Despesa>> response = despesaController.getAllDespesas();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(despesas, response.getBody());
        assertEquals(2, response.getBody().size());
        assertEquals("Despesa 1", response.getBody().get(0).getDescricao());
        assertEquals("Despesa 2", response.getBody().get(1).getDescricao());
    }

    @Test
    void testGetDespesaById() {
                Integer id = 1;
        Despesa despesa = new Despesa(id, new BigDecimal("150.00"), LocalDate.of(2025, 6, 16), "Teste de despesa");

        when(despesaService.findById(id)).thenReturn(despesa);

        ResponseEntity<Despesa> response = despesaController.getDespesaById(id);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(despesa, response.getBody());
        assertEquals(id, response.getBody().getId());
        assertEquals(new BigDecimal("150.00"), response.getBody().getValorDespesa());
        assertEquals(LocalDate.of(2025, 6, 16), response.getBody().getDataDespesa());
        assertEquals("Teste de despesa", response.getBody().getDescricao());
    }

    @Test
    void testUpdateDespesa() {
Integer id = 1;
        Despesa despesaInput = new Despesa();
        despesaInput.setValorDespesa(new BigDecimal("200.00"));
        despesaInput.setDataDespesa(LocalDate.of(2025, 6, 17));
        despesaInput.setDescricao("Despesa atualizada");

        Despesa despesaUpdated = new Despesa();
        despesaUpdated.setId(id);
        despesaUpdated.setValorDespesa(new BigDecimal("200.00"));
        despesaUpdated.setDataDespesa(LocalDate.of(2025, 6, 17));
        despesaUpdated.setDescricao("Despesa atualizada");

        when(despesaService.update(eq(id), any(Despesa.class))).thenReturn(despesaUpdated);

        ResponseEntity<Despesa> response = despesaController.updateDespesa(id, despesaInput);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(despesaUpdated, response.getBody());
        assertEquals(id, response.getBody().getId());
        assertEquals(new BigDecimal("200.00"), response.getBody().getValorDespesa());
        assertEquals(LocalDate.of(2025, 6, 17), response.getBody().getDataDespesa());
        assertEquals("Despesa atualizada", response.getBody().getDescricao());
    }
}
