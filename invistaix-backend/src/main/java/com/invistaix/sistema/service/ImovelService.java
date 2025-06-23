package com.invistaix.sistema.service;

import com.invistaix.sistema.dto.PropertyDetailsDTO;
import com.invistaix.sistema.model.Avaliacao;
import com.invistaix.sistema.model.Imovel;
import com.invistaix.sistema.model.Proprietario;
import com.invistaix.sistema.repository.ImovelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ImovelService {

    @Autowired
    private ImovelRepository imovelRepository;

    @Autowired
    private INCCService inccService;

    @Autowired
    private AvaliacaoService avaliacaoService;

    // Listar todos os imóveis
    @Transactional(readOnly = true)
    public List<Imovel> findAll() {
        return imovelRepository.findAll();
    }
    
    @Transactional(readOnly = true)
    public List<Imovel> findByGestorId(Integer gestorId) {
        return imovelRepository.findByGestorId(gestorId);
    }
    
    @Transactional(readOnly = true)
    public List<Imovel> findByProprietarioId(Integer proprietarioId) {
        return imovelRepository.findByProprietarioId(proprietarioId);
    }

    // Buscar um imóvel por ID
    @Transactional(readOnly = true)
    public Imovel findById(Integer id) {
        Optional<Imovel> imovel = imovelRepository.findById(id);
        if (imovel.isEmpty()) {
            throw new RuntimeException("Imóvel com ID " + id + " não encontrado");
        }
        return imovel.get();
    }

    // Buscar detalhes completos do imóvel
    @Transactional(readOnly = true)
    public PropertyDetailsDTO getPropertyDetails(Integer id) {
        Imovel imovel = findById(id);
        Proprietario proprietario = imovel.getProprietario();
        BigDecimal valorAtualizado = inccService.calculateCurrentValue(imovel);
        List<Avaliacao> avaliacoes = avaliacaoService.findByImovelId(id);
        
        return new PropertyDetailsDTO(imovel, proprietario, valorAtualizado, avaliacoes);
    }
    
    // Criar ou atualizar um imóvel, função auxiliar para simplificar
    public Imovel save(Imovel imovel) {
        return imovelRepository.save(imovel);
    }

    // Atualizar um imóvel existente
    public Imovel update(Integer id, Imovel imovel) {
        Imovel existingImovel = findById(id); // Verifica se o imóvel existe
        // Atualiza os campos do imóvel existente com os novos valores
        existingImovel.setNomeImovel(imovel.getNomeImovel());
        existingImovel.setTipoImovel(imovel.getTipoImovel());
        existingImovel.setEndereco(imovel.getEndereco());
        existingImovel.setProprietario(imovel.getProprietario());
        existingImovel.setGestor(imovel.getGestor());
        existingImovel.setValorMatricula(imovel.getValorMatricula());
        existingImovel.setDataRegistroMatricula(imovel.getDataRegistroMatricula());
        existingImovel.setValorAluguelAtual(imovel.getValorAluguelAtual());
        existingImovel.setValorVendaEstimado(imovel.getValorVendaEstimado());
        existingImovel.setValorIptu(imovel.getValorIptu());
        existingImovel.setArea(imovel.getArea());
        existingImovel.setNumQuartos(imovel.getNumQuartos());
        existingImovel.setNumeroApartamentos(imovel.getNumeroApartamentos());
        
        return imovelRepository.save(existingImovel);
    }

    public void delete(Integer id) {
        imovelRepository.findById(id);
        imovelRepository.deleteById(id);
    }
}