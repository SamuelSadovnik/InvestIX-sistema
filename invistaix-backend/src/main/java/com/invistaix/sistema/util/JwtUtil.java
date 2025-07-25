package com.invistaix.sistema.util;

import com.invistaix.sistema.model.AuthenticatedUser;
import com.invistaix.sistema.enums.UserType;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.JwtException;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.HashMap;
import java.util.Date;
import java.util.function.Function;
import java.util.List;

@Component
public class JwtUtil {

    @Value("${jwt.secret:minha-chave-secreta-muito-segura-para-jwt-precisa-ser-longa}")
    private String jwtSecret;

    @Value("${jwt.expiration:86400000}")
    private long jwtExpiration;

    private SecretKey getSigningKey() {
        // A chave precisa ter pelo menos 256 bits (32 bytes) para HS512
        byte[] keyBytes = jwtSecret.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(AuthenticatedUser user) {
        Map<String, Object> claims = new HashMap<>();
        // Use correct role format for Spring Security
        // claims.put("authorities", "ROLE_ADMINISTRADOR");
        claims.put("userType", user.getUserType().name());
        claims.put("username", user.getNome());
        claims.put("userId", user.getId());
        
        // Map user types to Spring Security compatible roles
        String role;
        UserType userType = user.getUserType();
        switch (userType) {
            case ADMIN:
                role = "ROLE_ADMINISTRADOR";
                break;
            case GESTOR:
                role = "ROLE_GESTOR";
                break;
            case PROPRIETARIO:
                role = "ROLE_PROPRIETARIO";
                break;
            default:
                role = "ROLE_USER";
        }
        claims.put("authorities", List.of(role));

        return Jwts.builder()
            .claims(claims)
            .subject(user.getEmail())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(getSigningKey())
            .compact();
    }

    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public UserType getUserTypeFromToken(String token) {
        String userTypeStr = (String) getAllClaimsFromToken(token).get("userType");
        return UserType.valueOf(userTypeStr);
    }

    public Integer getUserIdFromToken(String token) {
        return (Integer) getAllClaimsFromToken(token).get("userId");
    }
    
    public String getUsernameFromToken(String token) {
        return (String) getAllClaimsFromToken(token).get("username");
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        try {
            return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        } catch (JwtException e) {
            throw new RuntimeException("Token JWT inválido", e);
        }
    }

    private Boolean isTokenExpired(String token) {
        try {
            final Date expiration = getExpirationDateFromToken(token);
            return expiration.before(new Date());
        } catch (Exception e) {
            return true; // Se não conseguir ler a expiração, considera expirado
        }
    }

    public Boolean validateToken(String token) {
        try {
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false; // Token inválido
        }
    }
}