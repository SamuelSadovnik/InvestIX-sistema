package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Proprietario;
import com.invistaix.sistema.repository.ProprietarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProprietarioServiceTest {

    @Mock
    private ProprietarioRepository proprietarioRepository;

    @InjectMocks
    private ProprietarioService proprietarioService;

    private Proprietario proprietario;

    @BeforeEach
    void setUp() {
        proprietario = new Proprietario();
        proprietario.setId(1);
        proprietario.setNome("João Silva");
        proprietario.setEmail("joao@example.com");
        proprietario.setTelefone("123456789");
        proprietario.setCpfCnpj("123.456.789-00");
        proprietario.setSenha("senha123");
    }

    @Test
    void testSave_Success() {
        when(proprietarioRepository.findByEmail(proprietario.getEmail())).thenReturn(Optional.empty());
        when(proprietarioRepository.findByTelefone(proprietario.getTelefone())).thenReturn(Optional.empty());
        when(proprietarioRepository.findByCpfCnpj(proprietario.getCpfCnpj())).thenReturn(Optional.empty());
        when(proprietarioRepository.save(any(Proprietario.class))).thenReturn(proprietario);

        Proprietario saved = proprietarioService.save(proprietario);

        assertNotNull(saved);
        assertEquals(proprietario.getEmail(), saved.getEmail());
        verify(proprietarioRepository, times(1)).save(proprietario);
    }

    @Test
    void testSave_DuplicateEmail_ThrowsException() {
        Proprietario existing = new Proprietario();
        existing.setId(2);
        existing.setEmail(proprietario.getEmail());
        when(proprietarioRepository.findByEmail(proprietario.getEmail())).thenReturn(Optional.of(existing));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            proprietarioService.save(proprietario);
        });
        assertEquals("Email " + proprietario.getEmail() + " já está em uso", exception.getMessage());
        verify(proprietarioRepository, never()).save(any(Proprietario.class));
    }

    @Test
    void testSave_DuplicateTelefone_ThrowsException() {
        Proprietario existing = new Proprietario();
        existing.setId(2);
        existing.setTelefone(proprietario.getTelefone());
        when(proprietarioRepository.findByEmail(proprietario.getEmail())).thenReturn(Optional.empty());
        when(proprietarioRepository.findByTelefone(proprietario.getTelefone())).thenReturn(Optional.of(existing));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            proprietarioService.save(proprietario);
        });
        assertEquals("Telefone " + proprietario.getTelefone() + " já está em uso", exception.getMessage());
        verify(proprietarioRepository, never()).save(any(Proprietario.class));
    }

    @Test
    void testSave_DuplicateCpfCnpj_ThrowsException() {
        Proprietario existing = new Proprietario();
        existing.setId(2);
        existing.setCpfCnpj(proprietario.getCpfCnpj());
        when(proprietarioRepository.findByEmail(proprietario.getEmail())).thenReturn(Optional.empty());
        when(proprietarioRepository.findByTelefone(proprietario.getTelefone())).thenReturn(Optional.empty());
        when(proprietarioRepository.findByCpfCnpj(proprietario.getCpfCnpj())).thenReturn(Optional.of(existing));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            proprietarioService.save(proprietario);
        });
        assertEquals("CPF/CNPJ " + proprietario.getCpfCnpj() + " já está em uso", exception.getMessage());
        verify(proprietarioRepository, never()).save(any(Proprietario.class));
    }

    @Test
    void testFindAll_Success() {
        List<Proprietario> proprietarios = Arrays.asList(proprietario);
        when(proprietarioRepository.findAll()).thenReturn(proprietarios);

        List<Proprietario> result = proprietarioService.findAll();

        assertEquals(1, result.size());
        assertEquals(proprietario.getEmail(), result.get(0).getEmail());
        verify(proprietarioRepository, times(1)).findAll();
    }

    @Test
    void testFindById_Success() {
        when(proprietarioRepository.findById(1)).thenReturn(Optional.of(proprietario));

        Proprietario found = proprietarioService.findById(1);

        assertNotNull(found);
        assertEquals(proprietario.getEmail(), found.getEmail());
        verify(proprietarioRepository, times(1)).findById(1);
    }

    @Test
    void testFindById_NotFound_ThrowsException() {
        when(proprietarioRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            proprietarioService.findById(1);
        });
        assertEquals("Proprietário com ID 1 não encontrado", exception.getMessage());
        verify(proprietarioRepository, times(1)).findById(1);
    }

    @Test
    void testUpdate_Success() {
        Proprietario updatedProprietario = new Proprietario();
        updatedProprietario.setNome("Maria Souza");
        updatedProprietario.setEmail("maria@example.com");
        updatedProprietario.setTelefone("987654321");
        updatedProprietario.setCpfCnpj("987.654.321-00");
        updatedProprietario.setSenha("novaSenha");

        when(proprietarioRepository.findById(1)).thenReturn(Optional.of(proprietario));
        when(proprietarioRepository.findByEmail(updatedProprietario.getEmail())).thenReturn(Optional.empty());
        when(proprietarioRepository.findByTelefone(updatedProprietario.getTelefone())).thenReturn(Optional.empty());
        when(proprietarioRepository.findByCpfCnpj(updatedProprietario.getCpfCnpj())).thenReturn(Optional.empty());
        when(proprietarioRepository.save(any(Proprietario.class))).thenReturn(proprietario);

        Proprietario result = proprietarioService.update(1, updatedProprietario);

        assertNotNull(result);
        assertEquals(updatedProprietario.getEmail(), result.getEmail());
        assertEquals(updatedProprietario.getNome(), result.getNome());
        verify(proprietarioRepository, times(1)).findById(1);
        verify(proprietarioRepository, times(1)).save(any(Proprietario.class));
    }

    @Test
    void testUpdate_NotFound_ThrowsException() {
        Proprietario updatedProprietario = new Proprietario();
        when(proprietarioRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            proprietarioService.update(1, updatedProprietario);
        });
        assertEquals("Proprietário com ID 1 não encontrado", exception.getMessage());
        verify(proprietarioRepository, times(1)).findById(1);
        verify(proprietarioRepository, never()).save(any(Proprietario.class));
    }

    @Test
    void testDelete_Success() {
        when(proprietarioRepository.findById(1)).thenReturn(Optional.of(proprietario));
        doNothing().when(proprietarioRepository).deleteById(1);

        proprietarioService.delete(1);

        verify(proprietarioRepository, times(1)).findById(1);
        verify(proprietarioRepository, times(1)).deleteById(1);
    }

    @Test
    void testDelete_NotFound_DoesNotThrow() {
        when(proprietarioRepository.findById(1)).thenReturn(Optional.empty());
        doNothing().when(proprietarioRepository).deleteById(1);

        proprietarioService.delete(1);

        verify(proprietarioRepository, times(1)).findById(1);
        verify(proprietarioRepository, times(1)).deleteById(1);
    }
}