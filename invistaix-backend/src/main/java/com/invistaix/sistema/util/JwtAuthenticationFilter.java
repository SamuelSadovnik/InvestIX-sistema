package com.invistaix.sistema.util;

import com.invistaix.sistema.model.AuthenticatedUser;
import com.invistaix.sistema.enums.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Autowired
    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }
    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                if (jwtUtil.validateToken(token)) {
                    String email = jwtUtil.getEmailFromToken(token);
                    
                    // Verifica se já não está autenticado
                    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        UserType userType = jwtUtil.getUserTypeFromToken(token);
                        String role = "ROLE_" + userType.name();
                        logger.info("Authenticating user: " + email + " with role: " + role);
                        
                        AuthenticatedUser principal = new AuthenticatedUser();
                        principal.setEmail(email);
                        principal.setUserType(userType);
                        principal.setId(jwtUtil.getUserIdFromToken(token));
                        principal.setNome(jwtUtil.getUsernameFromToken(token));
                        
                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(principal, null, List.of(new SimpleGrantedAuthority(role)));
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                } else {
                    logger.warn("Invalid JWT token: " + token);
                }
            } catch (Exception e) {
                logger.error("Erro ao processar token JWT: " + e.getMessage());
                logger.error("Stack trace: ", e);
            }
        }

        filterChain.doFilter(request, response);
    }
}