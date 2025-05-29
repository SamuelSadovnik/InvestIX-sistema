package com.invistaix.sistema.Controller;

import com.invistaix.sistema.model.Imovel;
import com.invistaix.sistema.service.ImovelService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
class ImovelControllerTest {

    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private ImovelService imovelService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testCreateImovel() throws Exception {
        Imovel imovel = new Imovel();
        imovel.setId(1);
        imovel.setNomeImovel("Apartamento");

        Mockito.when(imovelService.save(any(Imovel.class))).thenReturn(imovel);

        mockMvc.perform(post("/api/imoveis")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(imovel)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nome").value("Apartamento"));
    }

    @Test
    void testGetAllImoveis() throws Exception {
        Imovel imovel1 = new Imovel();
        imovel1.setId(1);
        imovel1.setNomeImovel("Casa");

        Imovel imovel2 = new Imovel();
        imovel2.setId(2);
        imovel2.setNomeImovel("Apartamento");

        List<Imovel> imoveis = Arrays.asList(imovel1, imovel2);

        Mockito.when(imovelService.findAll()).thenReturn(imoveis);

        mockMvc.perform(get("/api/imoveis"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].nome").value("Apartamento"));
    }

    @Test
    void testGetImovelById() throws Exception {
        Imovel imovel = new Imovel();
        imovel.setId(1);
        imovel.setNomeImovel("Casa");

        Mockito.when(imovelService.findById(1)).thenReturn(imovel);

        mockMvc.perform(get("/api/imoveis/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nome").value("Casa"));
    }

    @Test
    void testUpdateImovel() throws Exception {
        Imovel imovel = new Imovel();
        imovel.setId(1);
        imovel.setNomeImovel("Casa Atualizada");

        Mockito.when(imovelService.update(eq(1), any(Imovel.class))).thenReturn(imovel);

        mockMvc.perform(put("/api/imoveis/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(imovel)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nome").value("Casa Atualizada"));
    }

    @Test
    void testDeleteImovel() throws Exception {
        Mockito.doNothing().when(imovelService).delete(1);

        mockMvc.perform(delete("/api/imoveis/1"))
                .andExpect(status().isNoContent());
    }
}