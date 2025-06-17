package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Rendimento;
import com.invistaix.sistema.repository.RendimentoRepository;
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
public class RendimentoServiceTest {

    @Mock
    private RendimentoRepository rendimentoRepository;

    @InjectMocks
    private RendimentoService rendimentoService;

    private Rendimento rendimento;
    private final Integer VALID_ID = 1;
    private final Integer INVALID_ID = 999;

    @BeforeEach
    void setUp() {
        rendimento = new Rendimento();
        rendimento.setId(VALID_ID);
        rendimento.setValorRendimento(new BigDecimal("1000.00"));
        rendimento.setDataRendimento(LocalDate.of(2025, 6, 16));
        rendimento.setDescricao("Rendimento de aluguel");
        rendimento.setImoveis(null); 
    }

    @Test
    void testSave() {
        when(rendimentoRepository.save(any(Rendimento.class))).thenReturn(rendimento);

        Rendimento savedRendimento = rendimentoService.save(rendimento);

        assertNotNull(savedRendimento);
        assertEquals(rendimento.getId(), savedRendimento.getId());
        assertEquals(rendimento.getValorRendimento(), savedRendimento.getValorRendimento());
        verify(rendimentoRepository, times(1)).save(rendimento);
    }

    @Test
    void testFindAll() {
        List<Rendimento> rendimentos = Arrays.asList(rendimento, new Rendimento());
        when(rendimentoRepository.findAll()).thenReturn(rendimentos);

        List<Rendimento> result = rendimentoService.findAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(rendimentoRepository, times(1)).findAll();
    }

    @Test
    void testFindById_Success() {
        when(rendimentoRepository.findById(VALID_ID)).thenReturn(Optional.of(rendimento));

        Rendimento foundRendimento = rendimentoService.findById(VALID_ID);

        assertNotNull(foundRendimento);
        assertEquals(VALID_ID, foundRendimento.getId());
        assertEquals(rendimento.getDescricao(), foundRendimento.getDescricao());
        verify(rendimentoRepository, times(1)).findById(VALID_ID);
    }

    @Test
    void testFindById_NotFound() {
        when(rendimentoRepository.findById(INVALID_ID)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            rendimentoService.findById(INVALID_ID);
        });
        assertEquals("Rendimento com ID " + INVALID_ID + " não encontrado", exception.getMessage());
        verify(rendimentoRepository, times(1)).findById(INVALID_ID);
    }

    @Test
    void testUpdate_Success() {
        Rendimento updatedRendimento = new Rendimento();
        updatedRendimento.setValorRendimento(new BigDecimal("2000.00"));
        updatedRendimento.setDataRendimento(LocalDate.of(2025, 7, 1));
        updatedRendimento.setDescricao("Rendimento atualizado");
        updatedRendimento.setImoveis(null);

        when(rendimentoRepository.findById(VALID_ID)).thenReturn(Optional.of(rendimento));
        when(rendimentoRepository.save(any(Rendimento.class))).thenReturn(rendimento);

        Rendimento result = rendimentoService.update(VALID_ID, updatedRendimento);

        assertNotNull(result);
        assertEquals(updatedRendimento.getValorRendimento(), result.getValorRendimento());
        assertEquals(updatedRendimento.getDataRendimento(), result.getDataRendimento());
        assertEquals(updatedRendimento.getDescricao(), result.getDescricao());
        verify(rendimentoRepository, times(1)).findById(VALID_ID);
        verify(rendimentoRepository, times(1)).save(any(Rendimento.class));
    }

    @Test
    void testUpdate_NotFound() {
        when(rendimentoRepository.findById(INVALID_ID)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            rendimentoService.update(INVALID_ID, rendimento);
        });
        assertEquals("Rendimento com ID " + INVALID_ID + " não encontrado", exception.getMessage());
        verify(rendimentoRepository, times(1)).findById(INVALID_ID);
        verify(rendimentoRepository, never()).save(any(Rendimento.class));
    }

    @Test
    void testDelete_Success() {
        when(rendimentoRepository.findById(VALID_ID)).thenReturn(Optional.of(rendimento));
        doNothing().when(rendimentoRepository).deleteById(VALID_ID);

        rendimentoService.delete(VALID_ID);

        verify(rendimentoRepository, times(1)).findById(VALID_ID);
        verify(rendimentoRepository, times(1)).deleteById(VALID_ID);
    }

    @Test
    void testDelete_NotFound() {
        when(rendimentoRepository.findById(INVALID_ID)).thenReturn(Optional.empty());
        doNothing().when(rendimentoRepository).deleteById(INVALID_ID);

        rendimentoService.delete(INVALID_ID);

        verify(rendimentoRepository, times(1)).findById(INVALID_ID);
        verify(rendimentoRepository, times(1)).deleteById(INVALID_ID);
    }
}
