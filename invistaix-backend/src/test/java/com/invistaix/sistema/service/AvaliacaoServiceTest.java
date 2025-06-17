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
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AvaliacaoServiceTest {

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
        avaliacao.setValorAvaliacao(new BigDecimal("500000.00"));
        avaliacao.setDataAvaliacao(LocalDate.of(2025, 6, 16));
    }

    @Test
    void testSave() {
        when(avaliacaoRepository.save(any(Avaliacao.class))).thenReturn(avaliacao);

        Avaliacao savedAvaliacao = avaliacaoService.save(avaliacao);

        assertNotNull(savedAvaliacao);
        assertEquals(validId, savedAvaliacao.getId());
        assertEquals("Apartamento 101", savedAvaliacao.getImovel());
        assertEquals(new BigDecimal("500000.00"), savedAvaliacao.getValorAvaliacao());
        assertEquals(LocalDate.of(2025, 6, 16), savedAvaliacao.getDataAvaliacao());
        verify(avaliacaoRepository, times(1)).save(avaliacao);
    }

    @Test
    void testFindAll() {
        List<Avaliacao> avaliacoes = Arrays.asList(avaliacao);
        when(avaliacaoRepository.findAll()).thenReturn(avaliacoes);

        List<Avaliacao> result = avaliacaoService.findAll();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(avaliacao, result.get(0));
        verify(avaliacaoRepository, times(1)).findAll();
    }

    @Test
    void testFindById_Success() {
        when(avaliacaoRepository.findById(validId)).thenReturn(Optional.of(avaliacao));

        Avaliacao foundAvaliacao = avaliacaoService.findById(validId);

        assertNotNull(foundAvaliacao);
        assertEquals(validId, foundAvaliacao.getId());
        assertEquals("Apartamento 101", foundAvaliacao.getImovel());
        verify(avaliacaoRepository, times(1)).findById(validId);
    }

    @Test
    void testFindById_NotFound() {
        when(avaliacaoRepository.findById(invalidId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            avaliacaoService.findById(invalidId);
        });
        assertEquals("Avaliação com ID " + invalidId + " não encontrada", exception.getMessage());
        verify(avaliacaoRepository, times(1)).findById(invalidId);
    }

    @Test
    void testUpdate_Success() {
        Avaliacao updatedAvaliacao = new Avaliacao();
        updatedAvaliacao.setValorAvaliacao(new BigDecimal("750000.00"));
        updatedAvaliacao.setDataAvaliacao(LocalDate.of(2025, 6, 17));

        when(avaliacaoRepository.findById(validId)).thenReturn(Optional.of(avaliacao));
        when(avaliacaoRepository.save(any(Avaliacao.class))).thenReturn(avaliacao);

        Avaliacao result = avaliacaoService.update(validId, updatedAvaliacao);

        assertNotNull(result);
        assertEquals("Casa 202", result.getImovel());
        assertEquals(new BigDecimal("750000.00"), result.getValorAvaliacao());
        assertEquals(LocalDate.of(2025, 6, 17), result.getDataAvaliacao());
        verify(avaliacaoRepository, times(1)).findById(validId);
        verify(avaliacaoRepository, times(1)).save(any(Avaliacao.class));
    }

    @Test
    void testUpdate_NotFound() {
        Avaliacao updatedAvaliacao = new Avaliacao();
        when(avaliacaoRepository.findById(invalidId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            avaliacaoService.update(invalidId, updatedAvaliacao);
        });
        assertEquals("Avaliação com ID " + invalidId + " não encontrada", exception.getMessage());
        verify(avaliacaoRepository, times(1)).findById(invalidId);
        verify(avaliacaoRepository, never()).save(any(Avaliacao.class));
    }

    @Test
    void testDelete_Success() {
        when(avaliacaoRepository.findById(validId)).thenReturn(Optional.of(avaliacao));
        doNothing().when(avaliacaoRepository).deleteById(validId);

        avaliacaoService.delete(validId);

        verify(avaliacaoRepository, times(1)).findById(validId);
        verify(avaliacaoRepository, times(1)).deleteById(validId);
    }

    @Test
    void testDelete_NotFound() {
        when(avaliacaoRepository.findById(invalidId)).thenReturn(Optional.empty());

        avaliacaoService.delete(invalidId);

        verify(avaliacaoRepository, times(1)).findById(invalidId);
        verify(avaliacaoRepository, times(1)).deleteById(invalidId);
    }
}