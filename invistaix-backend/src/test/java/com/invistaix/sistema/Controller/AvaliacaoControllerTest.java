package com.invistaix.sistema.Controller;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.MediaType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.invistaix.sistema.controller.AvaliacaoController;
import com.invistaix.sistema.model.Avaliacao;
import com.invistaix.sistema.model.Imovel;
import com.invistaix.sistema.service.AvaliacaoService;



@WebMvcTest(AvaliacaoController.class)
public class AvaliacaoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AvaliacaoService avaliacaoService;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
    }

    @Test
    void testCreateAvaliacao() throws Exception {
        
        Imovel imovel = new Imovel();
        imovel.setId(1);
        
        Avaliacao avaliacaoRequest = new Avaliacao();
        avaliacaoRequest.setValorAvaliacao(BigDecimal.valueOf(250000.00));
        avaliacaoRequest.setImovel(imovel);
        avaliacaoRequest.setDataAvaliacao(LocalDate.now());

        Avaliacao avaliacaoResponse = new Avaliacao();
        avaliacaoResponse.setId(1);
        avaliacaoResponse.setValorAvaliacao(BigDecimal.valueOf(250000.00));
        avaliacaoResponse.setImovel(imovel);
        avaliacaoResponse.setDataAvaliacao(LocalDate.now());

        when(avaliacaoService.save(any(Avaliacao.class))).thenReturn(avaliacaoResponse);

        mockMvc.perform(post("/api/avaliacoes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(avaliacaoRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.valorAvaliacao").value(250000.00))
                .andExpect(jsonPath("$.imovel.id").value(1));
    }

    @Test
    void testCreateAvaliacaoWithValidData() {
        Imovel imovel = new Imovel();
        imovel.setId(1);
        
        Avaliacao avaliacao = new Avaliacao();
        avaliacao.setId(1);
        avaliacao.setValorAvaliacao(BigDecimal.valueOf(250000.00));
        avaliacao.setImovel(imovel);
        avaliacao.setDataAvaliacao(LocalDate.of(2024, 6, 15));

        assertEquals(Integer.valueOf(1), avaliacao.getId());
        assertEquals(BigDecimal.valueOf(250000.00), avaliacao.getValorAvaliacao());
        assertEquals(imovel, avaliacao.getImovel());
        assertEquals(LocalDate.of(2024, 6, 15), avaliacao.getDataAvaliacao());
    }

    @Test
    void testCreateAvaliacaoWithInvalidData() {
        Avaliacao avaliacao = new Avaliacao();

        assertNull(avaliacao.getValorAvaliacao());
        assertNull(avaliacao.getImovel());
        assertNull(avaliacao.getDataAvaliacao());
    }



    @Test
    void testDeleteAvaliacao() throws Exception {

        Integer avaliacaoId = 1;
        doNothing().when(avaliacaoService).delete(avaliacaoId);

        mockMvc.perform(delete("/api/avaliacoes/{id}", avaliacaoId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }
    

    @Test
    void testGetAllAvaliacoes() throws Exception {
        Imovel imovel = new Imovel();
        Avaliacao avaliacao1 = new Avaliacao(1, imovel, new BigDecimal("500000.00"), LocalDate.of(2025, 6, 1));
        Avaliacao avaliacao2 = new Avaliacao(2, imovel, new BigDecimal("750000.00"), LocalDate.of(2025, 6, 2));
        List<Avaliacao> avaliacoes = Arrays.asList(avaliacao1, avaliacao2);

        when(avaliacaoService.findAll()).thenReturn(avaliacoes);

        mockMvc.perform(get("/api/avaliacoes")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[0].valorAvaliacao", is(500000.00)))
                .andExpect(jsonPath("$[0].dataAvaliacao", is("2025-06-01")))
                .andExpect(jsonPath("$[1].id", is(2)))
                .andExpect(jsonPath("$[1].valorAvaliacao", is(750000.00)))
                .andExpect(jsonPath("$[1].dataAvaliacao", is("2025-06-02")));
    }

    @Test
    void testGetAvaliacaoById() throws Exception {
        Integer avaliacaoId = 1;
        Imovel imovel = new Imovel(); 
        Avaliacao avaliacao = new Avaliacao(avaliacaoId, imovel, new BigDecimal("500000.00"), LocalDate.of(2025, 6, 1));

        when(avaliacaoService.findById(avaliacaoId)).thenReturn(avaliacao);

        mockMvc.perform(get("/api/avaliacoes/{id}", avaliacaoId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.valorAvaliacao", is(500000.00)))
                .andExpect(jsonPath("$.dataAvaliacao", is("2025-06-01")));
    }

}
