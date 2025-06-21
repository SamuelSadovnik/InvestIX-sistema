package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Avaliacao;
import com.invistaix.sistema.repository.AvaliacaoRepository;
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
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AvaliacaoServiceTest {

    @Mock
    private AvaliacaoRepository avaliacaoRepository;

    @InjectMocks
    private AvaliacaoService avaliacaoService;

    private Avaliacao avaliacao;
    private final Integer validId = 1;
    private final Integer invalidId = 999;

    @BeforeEach
    void setUp() {
        avaliacao = new Avaliacao();
        avaliacao.setId(validId);
        avaliacao.setValorAvaliacao(new BigDecimal("500000.0"));
        avaliacao.setDataAvaliacao(LocalDate.now());
    }

    @Test
    void testSave_Avaliacao_Success() {
        when(avaliacaoRepository.save(eq(avaliacao))).thenReturn(avaliacao);

        Avaliacao result = avaliacaoService.save(avaliacao);

        assertNotNull(result, "O resultado não deve ser nulo");
        assertEquals(validId, result.getId(), "O ID deve corresponder");
        assertEquals(new BigDecimal("500000.0"), result.getValorAvaliacao(), "O valor da avaliação deve corresponder");
        verify(avaliacaoRepository, times(1)).save(eq(avaliacao));
    }

    @Test
    void testFindAll_ReturnsList() {
        List<Avaliacao> avaliacoes = Arrays.asList(avaliacao, new Avaliacao());
        when(avaliacaoRepository.findAll()).thenReturn(avaliacoes);

        List<Avaliacao> result = avaliacaoService.findAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(avaliacaoRepository).findAll();
    }

    @Test
    void testFindById_Success() {
        when(avaliacaoRepository.findById(validId)).thenReturn(Optional.of(avaliacao));

        Avaliacao result = avaliacaoService.findById(validId);

        assertNotNull(result);
        assertEquals(validId, result.getId());
        verify(avaliacaoRepository).findById(validId);
    }

    @Test
    void testFindById_NotFound_ThrowsException() {
        when(avaliacaoRepository.findById(invalidId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            avaliacaoService.findById(invalidId);
        });
        assertEquals("Avaliação com ID " + invalidId + " não encontrada", exception.getMessage());
        verify(avaliacaoRepository).findById(invalidId);
    }

    @Test
    void testUpdate_Success() {
        Avaliacao updatedAvaliacao = new Avaliacao();
        updatedAvaliacao.setValorAvaliacao(new BigDecimal("600000.0"));
        updatedAvaliacao.setDataAvaliacao(LocalDate.now().minusDays(1));

        when(avaliacaoRepository.findById(validId)).thenReturn(Optional.of(avaliacao));
        when(avaliacaoRepository.save(any(Avaliacao.class))).thenReturn(avaliacao);

        Avaliacao result = avaliacaoService.update(validId, updatedAvaliacao);

        assertNotNull(result);
        assertEquals(updatedAvaliacao.getImovel(), result.getImovel());
        assertEquals(updatedAvaliacao.getValorAvaliacao(), result.getValorAvaliacao());
        assertEquals(updatedAvaliacao.getDataAvaliacao(), result.getDataAvaliacao());
        verify(avaliacaoRepository).findById(validId);
        verify(avaliacaoRepository).save(any(Avaliacao.class));
    }

    @Test
    void testUpdate_NotFound_ThrowsException() {
        when(avaliacaoRepository.findById(invalidId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            avaliacaoService.update(invalidId, avaliacao);
        });
        assertEquals("Avaliação com ID " + invalidId + " não encontrada", exception.getMessage());
        verify(avaliacaoRepository).findById(invalidId);
        verify(avaliacaoRepository, never()).save(any());
    }

    @Test
    void testDelete_Success() {
        when(avaliacaoRepository.findById(validId)).thenReturn(Optional.of(avaliacao));
        doNothing().when(avaliacaoRepository).deleteById(validId);

        avaliacaoService.delete(validId);

        verify(avaliacaoRepository).findById(validId);
        verify(avaliacaoRepository).deleteById(validId);
    }

}