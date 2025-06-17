package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Imovel;
import com.invistaix.sistema.repository.ImovelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith({MockitoExtension.class, SpringExtension.class})
public class ImovelServiceTest {

    @Mock
    private ImovelRepository imovelRepository;

    @InjectMocks
    private ImovelService imovelService;

    private Imovel imovel;

    @BeforeEach
    void setUp() {
        imovel = new Imovel();
        imovel.setId(1);
        imovel.setNomeImovel("Casa Teste");
        imovel.setTipoImovel("Casa");
        imovel.setValorMatricula(new BigDecimal("100000.00"));
        imovel.setDataRegistroMatricula(LocalDate.of(2023, 1, 1));
        imovel.setValorAluguelAtual(new BigDecimal("1500.00"));
        imovel.setValorVendaEstimado(new BigDecimal("200000.00"));
        imovel.setValorIptu(new BigDecimal("500.00"));
        imovel.setNumQuartos(3);
        imovel.setNumeroApartamentos(0);
    }

    @Test
    void testFindAll() {
        List<Imovel> imoveis = Arrays.asList(imovel);
        when(imovelRepository.findAll()).thenReturn(imoveis);

        List<Imovel> result = imovelService.findAll();

        assertEquals(1, result.size());
        assertEquals("Casa Teste", result.get(0).getNomeImovel());
        verify(imovelRepository, times(1)).findAll();
    }

    @Test
    void testFindById_Success() {
        when(imovelRepository.findById(1)).thenReturn(Optional.of(imovel));

        Imovel result = imovelService.findById(1);

        assertNotNull(result);
        assertEquals("Casa Teste", result.getNomeImovel());
        verify(imovelRepository, times(1)).findById(1);
    }

    @Test
    void testFindById_NotFound() {
        when(imovelRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imovelService.findById(1);
        });
        assertEquals("Imóvel com ID 1 não encontrado", exception.getMessage());
        verify(imovelRepository, times(1)).findById(1);
    }

    @Test
    void testSave() {
        when(imovelRepository.save(any(Imovel.class))).thenReturn(imovel);

        Imovel result = imovelService.save(imovel);

        assertNotNull(result);
        assertEquals("Casa Teste", result.getNomeImovel());
        verify(imovelRepository, times(1)).save(imovel);
    }

    @Test
    void testUpdate_Success() {
        Imovel updatedImovel = new Imovel();
        updatedImovel.setNomeImovel("Casa Atualizada");
        updatedImovel.setTipoImovel("Apartamento");
        updatedImovel.setValorMatricula(new BigDecimal("150000.00"));
        updatedImovel.setDataRegistroMatricula(LocalDate.of(2024, 2, 1));
        updatedImovel.setValorAluguelAtual(new BigDecimal("2000.00"));
        updatedImovel.setValorVendaEstimado(new BigDecimal("250000.00"));
        updatedImovel.setValorIptu(new BigDecimal("600.00"));
        updatedImovel.setNumQuartos(4);
        updatedImovel.setNumeroApartamentos(1);

        when(imovelRepository.findById(1)).thenReturn(Optional.of(imovel));
        when(imovelRepository.save(any(Imovel.class))).thenReturn(imovel);

        Imovel result = imovelService.update(1, updatedImovel);

        assertNotNull(result);
        assertEquals("Casa Atualizada", result.getNomeImovel());
        assertEquals("Apartamento", result.getTipoImovel());
        assertEquals(4, result.getNumQuartos());
        verify(imovelRepository, times(1)).findById(1);
        verify(imovelRepository, times(1)).save(any(Imovel.class));
    }

    @Test
    void testUpdate_NotFound() {
        when(imovelRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            imovelService.update(1, imovel);
        });
        assertEquals("Imóvel com ID 1 não encontrado", exception.getMessage());
        verify(imovelRepository, times(1)).findById(1);
        verify(imovelRepository, never()).save(any(Imovel.class));
    }

    @Test
    void testDelete() {
        when(imovelRepository.findById(1)).thenReturn(Optional.of(imovel));
        doNothing().when(imovelRepository).deleteById(1);

        imovelService.delete(1);

        verify(imovelRepository, times(1)).findById(1);
        verify(imovelRepository, times(1)).deleteById(1);
    }
}