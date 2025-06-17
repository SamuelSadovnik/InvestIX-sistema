package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Despesa;
import com.invistaix.sistema.repository.DespesaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DespesaServiceTest {

    @Mock
    private DespesaRepository despesaRepository;

    @InjectMocks
    private DespesaService despesaService;

    private Despesa despesa;
    private final Integer despesaId = 1;

    @BeforeEach
    void setUp() {
        despesa = new Despesa();
        despesa.setId(despesaId);
        despesa.setValorDespesa(new BigDecimal("100.00"));
        despesa.setDataDespesa(LocalDate.of(2025, 6, 16));
        despesa.setDescricao("Teste de despesa");
        despesa.setImoveis(null); 
    }

    @Test
    void testSave() {
        when(despesaRepository.save(any(Despesa.class))).thenReturn(despesa);

        Despesa savedDespesa = despesaService.save(despesa);

        assertNotNull(savedDespesa);
        assertEquals(despesa.getValorDespesa(), savedDespesa.getValorDespesa());
        assertEquals(despesa.getDescricao(), savedDespesa.getDescricao());
        verify(despesaRepository, times(1)).save(despesa);
    }

    @Test
    void testFindAll() {
        List<Despesa> despesas = Arrays.asList(despesa, new Despesa());
        when(despesaRepository.findAll()).thenReturn(despesas);

        List<Despesa> result = despesaService.findAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(despesaRepository, times(1)).findAll();
    }

    @Test
    void testFindById_Success() {
        when(despesaRepository.findById(despesaId)).thenReturn(Optional.of(despesa));

        Despesa foundDespesa = despesaService.findById(despesaId);

        assertNotNull(foundDespesa);
        assertEquals(despesaId, foundDespesa.getId());
        assertEquals(despesa.getDescricao(), foundDespesa.getDescricao());
        verify(despesaRepository, times(1)).findById(despesaId);
    }

    @Test
    void testFindById_NotFound() {
        when(despesaRepository.findById(despesaId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            despesaService.findById(despesaId);
        });
        assertEquals("Despesa com ID " + despesaId + " não encontrada", exception.getMessage());
        verify(despesaRepository, times(1)).findById(despesaId);
    }

    @Test
    void testUpdate_Success() {
        Despesa updatedDespesa = new Despesa();
        updatedDespesa.setValorDespesa(new BigDecimal("200.00"));
        updatedDespesa.setDataDespesa(LocalDate.of(2025, 6, 17));
        updatedDespesa.setDescricao("Despesa atualizada");
        updatedDespesa.setImoveis(null);

        when(despesaRepository.findById(despesaId)).thenReturn(Optional.of(despesa));
        when(despesaRepository.save(any(Despesa.class))).thenReturn(despesa);

        Despesa result = despesaService.update(despesaId, updatedDespesa);

        assertNotNull(result);
        assertEquals(updatedDespesa.getValorDespesa(), result.getValorDespesa());
        assertEquals(updatedDespesa.getDescricao(), result.getDescricao());
        assertEquals(updatedDespesa.getDataDespesa(), result.getDataDespesa());
        verify(despesaRepository, times(1)).findById(despesaId);
        verify(despesaRepository, times(1)).save(despesa);
    }

    @Test
    void testUpdate_NotFound() {
        Despesa updatedDespesa = new Despesa();
        when(despesaRepository.findById(despesaId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            despesaService.update(despesaId, updatedDespesa);
        });
        assertEquals("Despesa com ID " + despesaId + " não encontrada", exception.getMessage());
        verify(despesaRepository, times(1)).findById(despesaId);
        verify(despesaRepository, never()).save(any());
    }

    @Test
    void testDelete_Success() {
        when(despesaRepository.findById(despesaId)).thenReturn(Optional.of(despesa));
        doNothing().when(despesaRepository).deleteById(despesaId);

        despesaService.delete(despesaId);

        verify(despesaRepository, times(1)).findById(despesaId);
        verify(despesaRepository, times(1)).deleteById(despesaId);
    }

    @Test
    void testDelete_NotFound() {
        when(despesaRepository.findById(despesaId)).thenReturn(Optional.empty());

        despesaService.delete(despesaId);

        verify(despesaRepository, times(1)).findById(despesaId);
        verify(despesaRepository, times(1)).deleteById(despesaId);
    }
}