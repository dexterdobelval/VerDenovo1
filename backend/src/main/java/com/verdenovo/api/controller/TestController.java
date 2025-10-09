package com.verdenovo.api.controller;

import com.verdenovo.api.entity.Usuario;
import com.verdenovo.api.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @GetMapping("/update-fernando-password")
    public String updateFernandoPassword() {
        try {
            Usuario fernando = usuarioRepository.findByEmailAndStatusUsuario("fernando14112008@gmail.com", "ATIVO")
                .orElseThrow(() -> new RuntimeException("Fernando não encontrado"));
            
            String newPassword = "sampaio@14";
            fernando.setSenha(passwordEncoder.encode(newPassword));
            usuarioRepository.save(fernando);
            
            return "Senha do Fernando atualizada para: " + newPassword;
        } catch (Exception e) {
            return "Erro: " + e.getMessage();
        }
    }
    

}