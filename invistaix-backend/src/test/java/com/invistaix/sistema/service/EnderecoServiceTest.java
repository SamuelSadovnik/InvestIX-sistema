package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Endereco;
import com.invistaix.sistema.repository.EnderecoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EnderecoServiceTest {

    @Mock
    private EnderecoRepository enderecoRepository;

    @InjectMocks
    private EnderecoService enderecoService;

    private Endereco endereco;

    @BeforeEach
    void setUp() {
        // Initialize a sample Endereco object for tests
        endereco = new Endereco();
        endereco.setId(1);
        endereco.setRua("Rua Principal");
        endereco.setNumero("123");
        endereco.setBairro("Centro");
        endereco.setCidade("São Paulo");
        endereco.setEstado("SP");
        endereco.setCep("01000-000");
        endereco.setLatitude(BigDecimal.valueOf(-23.5505));
        endereco.setLongitude(BigDecimal.valueOf(-46.6333));
    }

    @Test
    void testSave_Success() {
        // Arrange
        when(enderecoRepository.save(any(Endereco.class))).thenReturn(endereco);

        // Act
        Endereco savedEndereco = enderecoService.save(endereco);

        // Assert
        assertNotNull(savedEndereco);
        assertEquals(endereco.getRua(), savedEndereco.getRua());
        assertEquals(endereco.getCep(), savedEndereco.getCep());
        verify(enderecoRepository, times(1)).save(endereco);
    }

    @Test
    void testFindAll_Success() {
        // Arrange
        Endereco endereco2 = new Endereco();
        endereco2.setId(2);
        endereco2.setRua("Rua Secundária");
        endereco2.setNumero("456");
        endereco2.setBairro("Vila Nova");
        endereco2.setCidade("Rio de Janeiro");
        endereco2.setEstado("RJ");
        endereco2.setCep("20000-000");
        List<Endereco> enderecos = Arrays.asList(endereco, endereco2);
        when(enderecoRepository.findAll()).thenReturn(enderecos);

        // Act
        List<Endereco> result = enderecoService.findAll();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(endereco.getRua(), result.get(0).getRua());
        assertEquals(endereco2.getRua(), result.get(1).getRua());
        verify(enderecoRepository, times(1)).findAll();
    }

    @Test
    void testFindById_Success() {
        // Arrange
        when(enderecoRepository.findById(1)).thenReturn(Optional.of(endereco));

        // Act
        Endereco foundEndereco = enderecoService.findById(1);

        // Assert
        assertNotNull(foundEndereco);
        assertEquals(endereco.getId(), foundEndereco.getId());
        assertEquals(endereco.getCep(), foundEndereco.getCep());
        verify(enderecoRepository, times(1)).findById(1);
    }

    @Test
    void testFindById_NotFound() {
        // Arrange
        when(enderecoRepository.findById(1)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            enderecoService.findById(1);
        });
        assertEquals("Endereço com ID 1 não encontrado", exception.getMessage());
        verify(enderecoRepository, times(1)).findById(1);
    }

    @Test
    void testUpdate_Success() {
        // Arrange
        Endereco updatedEndereco = new Endereco();
        updatedEndereco.setRua("Rua Nova");
        updatedEndereco.setNumero("789");
        updatedEndereco.setBairro("Jardim");
        updatedEndereco.setCidade("Curitiba");
        updatedEndereco.setEstado("PR");
        updatedEndereco.setCep("80000-000");
        updatedEndereco.setLatitude(BigDecimal.valueOf(-25.4284));
        updatedEndereco.setLongitude(BigDecimal.valueOf(-49.2733));
        when(enderecoRepository.findById(1)).thenReturn(Optional.of(endereco));
        when(enderecoRepository.save(any(Endereco.class))).thenReturn(endereco);

        // Act
        Endereco result = enderecoService.update(1, updatedEndereco);

        // Assert
        assertNotNull(result);
        assertEquals(updatedEndereco.getRua(), result.getRua());
        assertEquals(updatedEndereco.getNumero(), result.getNumero());
        assertEquals(updatedEndereco.getBairro(), result.getBairro());
        assertEquals(updatedEndereco.getCidade(), result.getCidade());
        assertEquals(updatedEndereco.getEstado(), result.getEstado());
        assertEquals(updatedEndereco.getCep(), result.getCep());
        assertEquals(updatedEndereco.getLatitude(), result.getLatitude() );
        assertEquals(updatedEndereco.getLongitude(), result.getLongitude() );
        verify(enderecoRepository, times(1)).findById(1);
        verify(enderecoRepository, times(1)).save(any(Endereco.class));
    }

    @Test
    void testUpdate_NotFound() {
        // Arrange
        when(enderecoRepository.findById(1)).thenReturn(Optional.empty());

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            enderecoService.update(1, endereco);
        });
        assertEquals("Endereço com ID 1 não encontrado", exception.getMessage());
        verify(enderecoRepository, times(1)).findById(1);
        verify(enderecoRepository, never()).save(any(Endereco.class));
    }

    @Test
    void testDelete_Success() {
        // Arrange
        when(enderecoRepository.findById(1)).thenReturn(Optional.of(endereco));
        doNothing().when(enderecoRepository).deleteById(1);

        // Act
        enderecoService.delete(1);

        // Assert
        verify(enderecoRepository, times(1)).findById(1);
        verify(enderecoRepository, times(1)).deleteById(1);
    }

    @Test
    void testDelete_NotFound() {
        // Arrange
        when(enderecoRepository.findById(1)).thenReturn(Optional.empty());
        doNothing().when(enderecoRepository).deleteById(1);

        // Act
        enderecoService.delete(1);

        // Assert
        verify(enderecoRepository, times(1)).findById(1);
        verify(enderecoRepository, times(1)).deleteById(1);
    }
}