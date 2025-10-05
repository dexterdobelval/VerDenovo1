package com.verdenovo.backend.config;

import com.verdenovo.backend.entity.Usuario;
import com.verdenovo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public void run(String... args) throws Exception {
        // Criar conta admin se não existir
        if (!usuarioRepository.findByEmail("vitorhugobate@gmail.com").isPresent()) {
            Usuario admin = new Usuario();
            admin.setNome("Administrador VerDenovo");
            admin.setEmail("vitorhugobate@gmail.com");
            admin.setSenha("123456789Vi");
            admin.setAtivo(true);
            
            usuarioRepository.save(admin);
            System.out.println("Conta admin criada: vitorhugobate@gmail.com");
        }
    }
}