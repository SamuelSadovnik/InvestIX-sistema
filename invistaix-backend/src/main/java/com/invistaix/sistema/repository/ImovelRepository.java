package com.invistaix.sistema.repository;

import com.invistaix.sistema.model.Imovel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImovelRepository extends JpaRepository<Imovel, Integer> {

    // Buscar imóveis por tipo de imóvel (ex.: "Casa", "Apartamento")
    List<Imovel> findByTipoImovel(String tipoImovel);

    // Buscar imóveis por proprietário
    List<Imovel> findByProprietarioId(Integer proprietarioId);

    // Buscar imóveis por gestor (pode ser nulo, já que gestor_id é opcional)
    List<Imovel> findByGestorId(Integer gestorId);

    // Buscar imóveis por cidade (usando a relação com Endereco)
    List<Imovel> findByEnderecoCidade(String cidade);

    // Buscar imóveis com valor de aluguel atual dentro de um intervalo
    List<Imovel> findByValorAluguelAtualBetween(Double minValor, Double maxValor);
}