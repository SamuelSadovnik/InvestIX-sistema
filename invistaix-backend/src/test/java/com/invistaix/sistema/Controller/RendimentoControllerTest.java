package com.invistaix.sistema.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.invistaix.sistema.controller.RendimentoController;
import com.invistaix.sistema.model.Rendimento;
import com.invistaix.sistema.service.RendimentoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RendimentoController.class)
public class RendimentoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RendimentoService rendimentoService;

    @Autowired
    private ObjectMapper objectMapper;

    private Rendimento rendimento;
    private List<Rendimento> rendimentos;

    @BeforeEach
    void setUp() {
        // Initialize test data
        rendimento = new Rendimento(1, new BigDecimal("1000.00"), LocalDate.of(2025, 6, 16), "Aluguel mensal");
        rendimentos = Arrays.asList(
            rendimento,
            new Rendimento(2, new BigDecimal("1500.00"), LocalDate.of(2025, 6, 15), "Rendimento extra")
        );
    }

    @Test
    void testCreateRendimento() throws Exception {
        // Arrange
        when(rendimentoService.save(any(Rendimento.class))).thenReturn(rendimento);

        // Act & Assert
        mockMvc.perform(post("/api/rendimentos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(rendimento)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.valorRendimento").value(1000.00))
                .andExpect(jsonPath("$.dataRendimento").value("2025-06-16"))
                .andExpect(jsonPath("$.descricao").value("Aluguel mensal"));

        verify(rendimentoService, times(1)).save(any(Rendimento.class));
    }

    @Test
    void testGetAllRendimentos() throws Exception {
        // Arrange
        when(rendimentoService.findAll()).thenReturn(rendimentos);

        // Act & Assert
        mockMvc.perform(get("/api/rendimentos")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].valorRendimento").value(1000.00))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].valorRendimento").value(1500.00));

        verify(rendimentoService, times(1)).findAll();
    }

    @Test
    void testGetRendimentoById() throws Exception {
        // Arrange
        when(rendimentoService.findById(1)).thenReturn(rendimento);

        // Act & Assert
        mockMvc.perform(get("/api/rendimentos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.valorRendimento").value(1000.00))
                .andExpect(jsonPath("$.dataRendimento").value("2025-06-16"))
                .andExpect(jsonPath("$.descricao").value("Aluguel mensal"));

        verify(rendimentoService, times(1)).findById(1);
    }

    @Test
    void testUpdateRendimento() throws Exception {
        // Arrange
        Rendimento updatedRendimento = new Rendimento(1, new BigDecimal("1200.00"), LocalDate.of(2025, 6, 16), "Aluguel ajustado");
        when(rendimentoService.update(eq(1), any(Rendimento.class))).thenReturn(updatedRendimento);

        // Act & Assert
        mockMvc.perform(put("/api/rendimentos/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedRendimento)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.valorRendimento").value(1200.00))
                .andExpect(jsonPath("$.dataRendimento").value("2025-06-16"))
                .andExpect(jsonPath("$.descricao").value("Aluguel ajustado"));

        verify(rendimentoService, times(1)).update(eq(1), any(Rendimento.class));
    }

    @Test
    void testDeleteRendimento() throws Exception {
        // Arrange
        doNothing().when(rendimentoService).delete(1);

        // Act & Assert
        mockMvc.perform(delete("/api/rendimentos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(rendimentoService, times(1)).delete(1);
    }
}