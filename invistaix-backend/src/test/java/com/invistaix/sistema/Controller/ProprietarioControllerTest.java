package com.invistaix.sistema.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.invistaix.sistema.controller.ProprietarioController;
import com.invistaix.sistema.model.Proprietario;
import com.invistaix.sistema.service.ProprietarioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProprietarioController.class)
class ProprietarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProprietarioService proprietarioService;

    @InjectMocks
    private ProprietarioController proprietarioController;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(proprietarioController)
                .setControllerAdvice(new Object())
                .build();
    }

    @Test
    void createProprietario_shouldReturnOkAndBody() throws Exception {
        Proprietario in = new Proprietario();
        in.setNome("Ana");
        in.setEmail("ana@example.com");
        in.setTelefone("11223344");
        in.setCpfCnpj("12345678900");

        Proprietario out = new Proprietario();
        out.setId(1);
        out.setNome(in.getNome());
        out.setEmail(in.getEmail());
        out.setTelefone(in.getTelefone());
        out.setCpfCnpj(in.getCpfCnpj());

        when(proprietarioService.save(any(Proprietario.class))).thenReturn(out);

        mockMvc.perform(post("/api/proprietarios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(in)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nome").value("Ana"))
                .andExpect(jsonPath("$.email").value("ana@example.com"));
    }

    @Test
    void getAllProprietarios_shouldReturnList() throws Exception {
        Proprietario p1 = new Proprietario(); p1.setId(1); p1.setNome("A");
        Proprietario p2 = new Proprietario(); p2.setId(2); p2.setNome("B");
        List<Proprietario> lista = Arrays.asList(p1, p2);

        when(proprietarioService.findAll()).thenReturn(lista);

        mockMvc.perform(get("/api/proprietarios"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].nome").value("A"))
                .andExpect(jsonPath("$[1].nome").value("B"));
    }

    @Test
    void getProprietarioById_shouldReturnOne() throws Exception {
        Proprietario p = new Proprietario();
        p.setId(1);
        p.setNome("Carlos");

        when(proprietarioService.findById(1)).thenReturn(p);

        mockMvc.perform(get("/api/proprietarios/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Carlos"));
    }


    @Test
    void updateProprietario_shouldReturnUpdated() throws Exception {
        Proprietario updatedProprietario = new Proprietario(1, "João Silva Atualizado", "joao.novo@example.com", "11987654322", "12345678901", "novaSenha123");
        when(proprietarioService.update(eq(1), any(Proprietario.class))).thenReturn(updatedProprietario);

        mockMvc.perform(put("/api/proprietarios/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedProprietario)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nome").value("João Silva Atualizado"))
                .andExpect(jsonPath("$.email").value("joao.novo@example.com"))
                .andExpect(jsonPath("$.telefone").value("11987654322"))
                .andExpect(jsonPath("$.cpfCnpj").value("12345678901"))
                .andExpect(jsonPath("$.senha").value("novaSenha123"));

        verify(proprietarioService, times(1)).update(eq(1), any(Proprietario.class));
    }

    @Test
    void deleteProprietario_shouldReturnNoContent() throws Exception {
        mockMvc.perform(delete("/api/proprietarios/1"))
                .andExpect(status().isNoContent());
    }

}
