package com.verdenovo.api.config;

import com.verdenovo.api.entity.Categoria;
import com.verdenovo.api.entity.Usuario;
import com.verdenovo.api.repository.CategoriaRepository;
import com.verdenovo.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Criar categoria padrão se não existir
        if (categoriaRepository.count() == 0) {
            Categoria categoria = new Categoria();
            categoria.setNome("Geral");
            categoria.setDescricao("Categoria padrão para pontos de coleta");
            categoria.setStatusCategoria("ATIVO");
            categoriaRepository.save(categoria);
            System.out.println("Categoria padrão criada");
        }
        
        // Criar usuário Fernando se não existir
        if (!usuarioRepository.existsByEmail("fernando14112008@gmail.com")) {
            Usuario fernando = new Usuario();
            fernando.setNome("Fernando Silva Sampaio");
            fernando.setEmail("fernando14112008@gmail.com");
            fernando.setSenha(passwordEncoder.encode("sampaio@14"));
            fernando.setNivelAcesso("ADMIN");
            fernando.setStatusUsuario("ATIVO");
            fernando.setDataCadastro(LocalDateTime.now());
            usuarioRepository.save(fernando);
            System.out.println("Usuário Fernando criado");
        }
    }
}