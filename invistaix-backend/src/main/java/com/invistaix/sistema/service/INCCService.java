package com.invistaix.sistema.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.invistaix.sistema.model.Imovel;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Map;
import java.util.NavigableMap;
import java.util.TreeMap;

@Service
public class INCCService {

    private static final String INCC_DATA_PATH = "data/incc-m.json";
    private final NavigableMap<YearMonth, BigDecimal> inccData = new TreeMap<>();

    public INCCService() {
        loadINCCData();
    }

    private void loadINCCData() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            InputStream inputStream = new ClassPathResource(INCC_DATA_PATH).getInputStream();
            INCCDataWrapper data = mapper.readValue(inputStream, INCCDataWrapper.class);
            
            for (Map.Entry<String, INCCDataWrapper.MonthData[]> yearEntry : data.anos.entrySet()) {
                int year = Integer.parseInt(yearEntry.getKey());
                for (INCCDataWrapper.MonthData monthData : yearEntry.getValue()) {
                    if (monthData.variacao != null) {
                        YearMonth yearMonth = YearMonth.of(year, monthNameToNumber(monthData.mes));
                        inccData.put(yearMonth, BigDecimal.valueOf(monthData.variacao));
                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to load INCC data", e);
        }
    }

    private int monthNameToNumber(String monthName) {
        return switch (monthName.toLowerCase()) {
            case "janeiro" -> 1;
            case "fevereiro" -> 2;
            case "março" -> 3;
            case "abril" -> 4;
            case "maio" -> 5;
            case "junho" -> 6;
            case "julho" -> 7;
            case "agosto" -> 8;
            case "setembro" -> 9;
            case "outubro" -> 10;
            case "novembro" -> 11;
            case "dezembro" -> 12;
            default -> throw new IllegalArgumentException("Invalid month name: " + monthName);
        };
    }

    public BigDecimal calculateCurrentValue(Imovel imovel) {
        if (imovel.getDataRegistroMatricula() == null || imovel.getValorMatricula() == null) {
            throw new IllegalArgumentException("Property registration date or value is missing");
        }

        LocalDate startDate = imovel.getDataRegistroMatricula();
        LocalDate endDate = LocalDate.now();
        
        if (startDate.isAfter(endDate)) {
            return imovel.getValorMatricula();
        }

        BigDecimal cumulativeFactor = BigDecimal.ONE;
        YearMonth currentMonth = YearMonth.from(startDate);
        YearMonth endMonth = YearMonth.from(endDate);

        while (!currentMonth.isAfter(endMonth)) {
            BigDecimal monthlyRate = inccData.getOrDefault(currentMonth, BigDecimal.ZERO);
            BigDecimal factor = BigDecimal.ONE.add(monthlyRate.divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP));
            cumulativeFactor = cumulativeFactor.multiply(factor);
            currentMonth = currentMonth.plusMonths(1);
        }

        return imovel.getValorMatricula().multiply(cumulativeFactor)
                .setScale(2, RoundingMode.HALF_UP);
    }

    // Inner classes for JSON parsing
    static class INCCDataWrapper {
        public Map<String, MonthData[]> anos;
        public Map<String, Double> acumulados;

        static class MonthData {
            public String mes;
            public Double variacao;
        }
    }
}