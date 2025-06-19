package com.invistaix.sistema.config;

import com.invistaix.sistema.model.Admin;
import com.invistaix.sistema.model.Gestor;
import com.invistaix.sistema.model.Proprietario;
import com.invistaix.sistema.repository.AdminRepository;
import com.invistaix.sistema.repository.GestorRepository;
import com.invistaix.sistema.repository.ProprietarioRepository;
import com.invistaix.sistema.util.PasswordEncoderUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private GestorRepository gestorRepository;

    @Autowired
    private ProprietarioRepository proprietarioRepository;

    @Autowired
    private PasswordEncoderUtil passwordEncoderUtil;

    @Override
    public void run(String... args) throws Exception {
        initializeDefaultUsers();
    }

    private void initializeDefaultUsers() {
        // Criar admin padrão se não existir
        if (!adminRepository.existsByEmail("admin@sistema.com")) {
            Admin admin = new Admin();
            admin.setNome("Administrador Sistema");
            admin.setEmail("admin@sistema.com");
            admin.setSenha(passwordEncoderUtil.encodePassword("123"));
            adminRepository.save(admin);
            System.out.println("✅ Admin criado: admin@sistema.com / 123");
        }

        // Criar gestor de teste se não existir
        if (!gestorRepository.existsByEmail("gestor@sistema.com")) {
            Gestor gestor = new Gestor();
            gestor.setNome("João Silva");
            gestor.setEmail("gestor@sistema.com");
            gestor.setCpf("12345678901");
            gestor.setSenha(passwordEncoderUtil.encodePassword("123"));
            gestorRepository.save(gestor);
            System.out.println("✅ Gestor criado: gestor@sistema.com / 123");
        }

        // Criar proprietário de teste se não existir
        if (!proprietarioRepository.existsByEmail("proprietario@sistema.com")) {
            Proprietario proprietario = new Proprietario();
            proprietario.setNome("Maria Santos");
            proprietario.setEmail("proprietario@sistema.com");
            proprietario.setTelefone("11999999999");
            proprietario.setDocumento("98765432100");
            proprietario.setTipoDocumento(com.invistaix.sistema.model.TipoDocumento.CPF);
            proprietario.setSenha(passwordEncoderUtil.encodePassword("123"));
            proprietarioRepository.save(proprietario);
            System.out.println("✅ Proprietário criado: proprietario@sistema.com / 123");
        }

        System.out.println("🔐 Inicialização de usuários concluída!");
    }
}