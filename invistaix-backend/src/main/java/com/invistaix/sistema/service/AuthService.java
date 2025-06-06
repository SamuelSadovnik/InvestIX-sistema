package com.invistaix.sistema.service;

import com.invistaix.sistema.repository.GestorRepository;
import com.invistaix.sistema.repository.ProprietarioRepository;
import com.invistaix.sistema.repository.AdminRepository;
import com.invistaix.sistema.util.JwtUtil;
import com.invistaix.sistema.dto.LoginRequest;
import com.invistaix.sistema.dto.LoginResponse;
import com.invistaix.sistema.dto.UserDto;
import com.invistaix.sistema.model.AuthenticatedUser;
import com.invistaix.sistema.model.Gestor;
import com.invistaix.sistema.model.Proprietario;
import com.invistaix.sistema.model.Admin;
import com.invistaix.sistema.enums.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

@Service
@Transactional
public class AuthService {

    @Autowired
    private GestorRepository gestorRepository;

    @Autowired
    private ProprietarioRepository proprietarioRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse authenticate(LoginRequest loginRequest) {
        AuthenticatedUser user = findUserByEmail(loginRequest.getEmail());
        
        if (user == null) {
            throw new BadCredentialsException("Usuário ou senha inválidos");
        }

        // Verificar senha
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getSenha())) {
            throw new BadCredentialsException("Usuário ou senha inválidos");
        }

        // Gerar token JWT
        String token = jwtUtil.generateToken(user);

        // Criar resposta
        UserDto userDto = new UserDto(user);
        return new LoginResponse(token, userDto);
    }

    public AuthenticatedUser findUserByEmail(String email) {
        // Tentar encontrar em Gestores
        Optional<Gestor> gestor = gestorRepository.findByEmail(email);
        if (gestor.isPresent()) {
            return new AuthenticatedUser(gestor.get());
        }

        // Tentar encontrar em Proprietários
        Optional<Proprietario> proprietario = proprietarioRepository.findByEmail(email);
        if (proprietario.isPresent()) {
            return new AuthenticatedUser(proprietario.get());
        }

        // Tentar encontrar em Admins
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) {
            return new AuthenticatedUser(admin.get());
        }

        return null;
    }

    public boolean validateToken(String token) {
        try {
            return jwtUtil.validateToken(token);
        } catch (Exception e) {
            return false;
        }
    }

    // Método para atualizar senha (opcional)
    public void updatePassword(String email, String newPassword, UserType userType) {
        String encodedPassword = passwordEncoder.encode(newPassword);
        
        switch (userType) {
            case GESTOR:
                Gestor gestor = gestorRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Gestor não encontrado"));
                gestor.setSenha(encodedPassword);
                gestorRepository.save(gestor);
                break;
            case PROPRIETARIO:
                Proprietario proprietario = proprietarioRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Proprietário não encontrado"));
                proprietario.setSenha(encodedPassword);
                proprietarioRepository.save(proprietario);
                break;
            case ADMIN:
                Admin admin = adminRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Admin não encontrado"));
                admin.setSenha(encodedPassword);
                adminRepository.save(admin);
                break;
        }
    }
}