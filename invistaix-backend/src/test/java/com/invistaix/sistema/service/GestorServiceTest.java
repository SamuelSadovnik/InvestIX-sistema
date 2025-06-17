package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Gestor;
import com.invistaix.sistema.repository.GestorRepository;
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
public class GestorServiceTest {

    @Mock
    private GestorRepository gestorRepository;

    @InjectMocks
    private GestorService gestorService;

    private Gestor gestor;

    @BeforeEach
    void setUp() {
        gestor = new Gestor();
        gestor.setId(1);
        gestor.setNome("João Silva");
        gestor.setEmail("joao.silva@example.com");
        gestor.setCpf("12345678901");
        gestor.setSenha("password123");
    }

    @Test
    void testSave_Success() {
        when(gestorRepository.findByEmail(gestor.getEmail())).thenReturn(Optional.empty());
        when(gestorRepository.findByCpf(gestor.getCpf())).thenReturn(Optional.empty());
        when(gestorRepository.save(any(Gestor.class))).thenReturn(gestor);

        Gestor savedGestor = gestorService.save(gestor);

        assertNotNull(savedGestor);
        assertEquals(gestor.getNome(), savedGestor.getNome());
        assertEquals(gestor.getEmail(), savedGestor.getEmail());
        assertEquals(gestor.getCpf(), savedGestor.getCpf());
        verify(gestorRepository, times(1)).findByEmail(gestor.getEmail());
        verify(gestorRepository, times(1)).findByCpf(gestor.getCpf());
        verify(gestorRepository, times(1)).save(gestor);
    }

    @Test
    void testSave_EmailAlreadyInUse() {
        Gestor existingGestor = new Gestor();
        existingGestor.setId(2); 
        existingGestor.setEmail(gestor.getEmail());
        when(gestorRepository.findByEmail(gestor.getEmail())).thenReturn(Optional.of(existingGestor));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            gestorService.save(gestor);
        });
        assertEquals("Email " + gestor.getEmail() + " já está em uso", exception.getMessage());
        verify(gestorRepository, times(1)).findByEmail(gestor.getEmail());
        verify(gestorRepository, never()).save(any(Gestor.class));
    }

    @Test
    void testSave_CpfAlreadyInUse() {
        Gestor existingGestor = new Gestor();
        existingGestor.setId(2); 
        existingGestor.setCpf(gestor.getCpf());
        when(gestorRepository.findByEmail(gestor.getEmail())).thenReturn(Optional.empty());
        when(gestorRepository.findByCpf(gestor.getCpf())).thenReturn(Optional.of(existingGestor));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            gestorService.save(gestor);
        });
        assertEquals("CPF " + gestor.getCpf() + " já está em uso", exception.getMessage());
        verify(gestorRepository, times(1)).findByEmail(gestor.getEmail());
        verify(gestorRepository, times(1)).findByCpf(gestor.getCpf());
        verify(gestorRepository, never()).save(any(Gestor.class));
    }

    @Test
    void testFindAll_Success() {
        Gestor gestor2 = new Gestor();
        gestor2.setId(2);
        gestor2.setNome("Maria Souza");
        gestor2.setEmail("maria.souza@example.com");
        gestor2.setCpf("98765432100");
        List<Gestor> gestores = Arrays.asList(gestor, gestor2);
        when(gestorRepository.findAll()).thenReturn(gestores);

        List<Gestor> result = gestorService.findAll();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals(gestor.getNome(), result.get(0).getNome());
        assertEquals(gestor2.getNome(), result.get(1).getNome());
        verify(gestorRepository, times(1)).findAll();
    }

    @Test
    void testFindById_Success() {
        when(gestorRepository.findById(1)).thenReturn(Optional.of(gestor));

        Gestor foundGestor = gestorService.findById(1);

        assertNotNull(foundGestor);
        assertEquals(gestor.getId(), foundGestor.getId());
        assertEquals(gestor.getNome(), foundGestor.getNome());
        verify(gestorRepository, times(1)).findById(1);
    }

    @Test
    void testFindById_NotFound() {
        when(gestorRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            gestorService.findById(1);
        });
        assertEquals("Gestor com ID 1 não encontrado", exception.getMessage());
        verify(gestorRepository, times(1)).findById(1);
    }

    @Test
    void testUpdate_Success() {
        Gestor updatedGestor = new Gestor();
        updatedGestor.setNome("João Atualizado");
        updatedGestor.setEmail("joao.atualizado@example.com");
        updatedGestor.setCpf("11122233344");
        updatedGestor.setSenha("newpassword");
        when(gestorRepository.findById(1)).thenReturn(Optional.of(gestor));
        when(gestorRepository.findByEmail(updatedGestor.getEmail())).thenReturn(Optional.empty());
        when(gestorRepository.findByCpf(updatedGestor.getCpf())).thenReturn(Optional.empty());
        when(gestorRepository.save(any(Gestor.class))).thenReturn(gestor);

        Gestor result = gestorService.update(1, updatedGestor);

        assertNotNull(result);
        assertEquals(updatedGestor.getNome(), result.getNome());
        assertEquals(updatedGestor.getEmail(), result.getEmail());
        assertEquals(updatedGestor.getCpf(), result.getCpf());
        assertEquals(updatedGestor.getSenha(), result.getSenha());
        verify(gestorRepository, times(1)).findById(1);
        verify(gestorRepository, times(1)).findByEmail(updatedGestor.getEmail());
        verify(gestorRepository, times(1)).findByCpf(updatedGestor.getCpf());
        verify(gestorRepository, times(1)).save(any(Gestor.class));
    }

    @Test
    void testUpdate_NotFound() {
        when(gestorRepository.findById(1)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            gestorService.update(1, gestor);
        });
        assertEquals("Gestor com ID 1 não encontrado", exception.getMessage());
        verify(gestorRepository, times(1)).findById(1);
        verify(gestorRepository, never()).save(any(Gestor.class));
    }

    @Test
    void testUpdate_EmailAlreadyInUse() {
        Gestor updatedGestor = new Gestor();
        updatedGestor.setEmail("existing@example.com");
        Gestor existingGestor = new Gestor();
        existingGestor.setId(2);
        when(gestorRepository.findById(1)).thenReturn(Optional.of(gestor));
        when(gestorRepository.findByEmail(updatedGestor.getEmail())).thenReturn(Optional.of(existingGestor));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            gestorService.update(1, updatedGestor);
        });
        assertEquals("Email " + updatedGestor.getEmail() + " já está em uso", exception.getMessage());
        verify(gestorRepository, times(1)).findById(1);
        verify(gestorRepository, times(1)).findByEmail(updatedGestor.getEmail());
        verify(gestorRepository, never()).save(any(Gestor.class));
    }

    @Test
    void testDelete_Success() {
        when(gestorRepository.findById(1)).thenReturn(Optional.of(gestor));
        doNothing().when(gestorRepository).deleteById(1);

        gestorService.delete(1);

        verify(gestorRepository, times(1)).findById(1);
        verify(gestorRepository, times(1)).deleteById(1);
    }

    @Test
    void testDelete_NotFound() {
        when(gestorRepository.findById(1)).thenReturn(Optional.empty());
        doNothing().when(gestorRepository).deleteById(1);

        gestorService.delete(1);


        verify(gestorRepository, times(1)).findById(1);
        verify(gestorRepository, times(1)).deleteById(1);
    }
}