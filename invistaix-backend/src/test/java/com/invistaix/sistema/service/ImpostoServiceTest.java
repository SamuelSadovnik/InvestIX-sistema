package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Imposto;
import com.invistaix.sistema.repository.ImpostoRepository;
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
public class ImpostoServiceTest {

    @Mock
    private ImpostoRepository impostoRepository;

    @InjectMocks
    private ImpostoService impostoService;

    private Imposto imposto;

    @BeforeEach
    void setUp() {
        imposto = new Imposto();
        imposto.setId(1);
        imposto.setValorImposto(BigDecimal.valueOf(1500.0));
        imposto.setDataImposto(LocalDate.of(2025, 6, 16));
        imposto.setDescricao("IPTU 2025");
        imposto.setImoveis(null); 
    }

    @Test
    void testSave_Success() {
        when(impostoRepository.save(any(Imposto.class))).thenReturn(imposto);

        Imposto saved = impostoService.save(imposto);

        assertNotNull(saved);
        assertEquals(imposto.getValorImposto(), saved.getValorImposto());
        assertEquals(imposto.getDescricao(), saved.getDescricao());
        verify(impostoRepository, times(1)).save(imposto);
    }

    @Test
    void testFindAll_Success() {
        List<Imposto> impostos = Arrays.asList(imposto);
        when(impostoRepository.findAll()).thenReturn(impostos);

        List<Imposto> result = impostoService.findAll();

        assertEquals(1, result.size());
        assertEquals(imposto.getDescricao(), result.get(0).getDescricao());
        verify(impostoRepository, times(1)).findAll();
    }

    @Test
    void testFindById_Success() {
        when(impostoRepository.findById(1)).thenReturn(Optional.of(imposto));

        Imposto found = impostoService.findById(1);

        assertNotNull(found);
        assertEquals(imposto.getValorImposto(), found.getValorImposto());
        verify(impostoRepository, times(1)).findById(1);
    }

    @Test
    void testFindById_NotFound_ThrowsException() {
        when(impostoRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            impostoService.findById(1);
        });
        assertEquals("Imposto com ID 1 não encontrado", exception.getMessage());
        verify(impostoRepository, times(1)).findById(1);
    }

    @Test
    void testUpdate_Success() {
        Imposto updatedImposto = new Imposto();
        updatedImposto.setValorImposto(BigDecimal.valueOf(1500.0));
        updatedImposto.setDataImposto(LocalDate.of(2025, 7, 1));
        updatedImposto.setDescricao("IPTU Atualizado");
        updatedImposto.setImoveis(null);

        when(impostoRepository.findById(1)).thenReturn(Optional.of(imposto));
        when(impostoRepository.save(any(Imposto.class))).thenReturn(imposto);

        Imposto result = impostoService.update(1, updatedImposto);

        assertNotNull(result);
        assertEquals(updatedImposto.getValorImposto(), result.getValorImposto());
        assertEquals(updatedImposto.getDescricao(), result.getDescricao());
        verify(impostoRepository, times(1)).findById(1);
        verify(impostoRepository, times(1)).save(any(Imposto.class));
    }

    @Test
    void testUpdate_NotFound_ThrowsException() {
        Imposto updatedImposto = new Imposto();
        when(impostoRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            impostoService.update(1, updatedImposto);
        });
        assertEquals("Imposto com ID 1 não encontrado", exception.getMessage());
        verify(impostoRepository, times(1)).findById(1);
        verify(impostoRepository, never()).save(any(Imposto.class));
    }

    @Test
    void testDelete_Success() {
        when(impostoRepository.findById(1)).thenReturn(Optional.of(imposto));
        doNothing().when(impostoRepository).deleteById(1);

        impostoService.delete(1);

        verify(impostoRepository, times(1)).findById(1);
        verify(impostoRepository, times(1)).deleteById(1);
    }

    @Test
    void testDelete_NotFound_DoesNotThrow() {
        when(impostoRepository.findById(1)).thenReturn(Optional.empty());
        doNothing().when(impostoRepository).deleteById(1);

        impostoService.delete(1);

        verify(impostoRepository, times(1)).findById(1);
        verify(impostoRepository, times(1)).deleteById(1);
    }
}