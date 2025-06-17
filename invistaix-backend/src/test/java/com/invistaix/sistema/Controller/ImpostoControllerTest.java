package com.invistaix.sistema.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.invistaix.sistema.controller.ImpostoController;
import com.invistaix.sistema.model.Imposto;
import com.invistaix.sistema.service.ImpostoService;
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

@WebMvcTest(ImpostoController.class)
public class ImpostoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ImpostoService impostoService;

    @Autowired
    private ObjectMapper objectMapper;

    private Imposto imposto;
    private List<Imposto> impostos;

    @BeforeEach
    void setUp() {
        imposto = new Imposto(1, new BigDecimal("500.00"), LocalDate.of(2025, 6, 16), "IPTU 2025");
        impostos = Arrays.asList(
            imposto,
            new Imposto(2, new BigDecimal("300.00"), LocalDate.of(2025, 6, 15), "Taxa de condomínio")
        );
    }

    @Test
    void testCreateImposto() throws Exception {
        when(impostoService.save(any(Imposto.class))).thenReturn(imposto);

        mockMvc.perform(post("/api/impostos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(imposto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.valorImposto").value(500.00))
                .andExpect(jsonPath("$.dataImposto").value("2025-06-16"))
                .andExpect(jsonPath("$.descricao").value("IPTU 2025"));

        verify(impostoService, times(1)).save(any(Imposto.class));
    }

    @Test
    void testGetAllImpostos() throws Exception {
        when(impostoService.findAll()).thenReturn(impostos);

        mockMvc.perform(get("/api/impostos")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].valorImposto").value(500.00))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].valorImposto").value(300.00));

        verify(impostoService, times(1)).findAll();
    }

    @Test
    void testGetImpostoById() throws Exception {
        when(impostoService.findById(1)).thenReturn(imposto);

        mockMvc.perform(get("/api/impostos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.valorImposto").value(500.00))
                .andExpect(jsonPath("$.dataImposto").value("2025-06-16"))
                .andExpect(jsonPath("$.descricao").value("IPTU 2025"));

        verify(impostoService, times(1)).findById(1);
    }

    @Test
    void testUpdateImposto() throws Exception {
        Imposto updatedImposto = new Imposto(1, new BigDecimal("600.00"), LocalDate.of(2025, 6, 16), "IPTU ajustado");
        when(impostoService.update(eq(1), any(Imposto.class))).thenReturn(updatedImposto);

        mockMvc.perform(put("/api/impostos/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedImposto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.valorImposto").value(600.00))
                .andExpect(jsonPath("$.dataImposto").value("2025-06-16"))
                .andExpect(jsonPath("$.descricao").value("IPTU ajustado"));

        verify(impostoService, times(1)).update(eq(1), any(Imposto.class));
    }

    @Test
    void testDeleteImposto() throws Exception {
        doNothing().when(impostoService).delete(1);

        mockMvc.perform(delete("/api/impostos/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(impostoService, times(1)).delete(1);
    }
}
