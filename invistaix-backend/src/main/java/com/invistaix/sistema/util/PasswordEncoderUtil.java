package com.invistaix.sistema.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Utilitário para operações com senhas usando BCrypt
 * 
 * Usado em:
 * - Services (para criar/atualizar usuários)
 * - Controllers (para endpoints de registro)
 * - Validações de login
 * 
 * NÃO use quando:
 * - Apenas consultando dados (sem alterar senhas)
 * - Em operações que não envolvem autenticação
 */
@Component
public class PasswordEncoderUtil {

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Codifica uma senha em texto plano usando BCrypt
     * @param plainPassword Senha em texto plano
     * @return Senha codificada
     */
    public String encodePassword(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }
    
    /**
     * Verifica se uma senha em texto plano corresponde à senha codificada
     * @param plainPassword Senha em texto plano
     * @param encodedPassword Senha codificada
     * @return true se as senhas coincidem
     */
    public boolean matches(String plainPassword, String encodedPassword) {
        return passwordEncoder.matches(plainPassword, encodedPassword);
    }
}