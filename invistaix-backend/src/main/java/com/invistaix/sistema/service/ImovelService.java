package com.invistaix.sistema.service;

import com.invistaix.sistema.model.Imovel;
import com.invistaix.sistema.repository.ImovelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImovelService {

    @Autowired
    private ImovelRepository imovelRepository;

    // Listar todos os imóveis
    public List<Imovel> findAll() {
        return imovelRepository.findAll();
    }

    // Buscar um imóvel por ID
    public Imovel findById(Integer id) {
        Optional<Imovel> imovel = imovelRepository.findById(id);
        if (imovel.isEmpty()) {
            throw new RuntimeException("Imóvel com ID " + id + " não encontrado");
        }
        return imovel.get();
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

    // Deletar um imóvel por ID
    public void delete(Integer id) {
        imovelRepository.findById(id); // Verifica se o imóvel existe antes de deletar
        imovelRepository.deleteById(id);
    }
}