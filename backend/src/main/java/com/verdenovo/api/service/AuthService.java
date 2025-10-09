package com.verdenovo.api.service;

import com.verdenovo.api.dto.LoginRequest;
import com.verdenovo.api.dto.LoginResponse;
import com.verdenovo.api.dto.UsuarioResponse;
import com.verdenovo.api.entity.Usuario;
import com.verdenovo.api.repository.UsuarioRepository;
import com.verdenovo.api.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuthService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        System.out.println("Searching for user: " + request.getEmail());
        Usuario usuario = usuarioRepository.findByEmailAndStatusUsuario(request.getEmail(), "ATIVO")
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado ou inativo"));
        
        System.out.println("User found: " + usuario.getNome());
        System.out.println("Password check for: " + request.getEmail());
        
        if (!passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
            System.out.println("Password mismatch for: " + request.getEmail());
            throw new RuntimeException("Senha incorreta");
        }
        
        System.out.println("Login successful for: " + request.getEmail());
        
        String token = jwtUtil.generateToken(usuario.getEmail());
        
        return new LoginResponse(token, new UsuarioResponse(
            usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getNivelAcesso()));
    }

    public void cadastrar(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuario.setDataCadastro(LocalDateTime.now());
        usuario.setStatusUsuario("ATIVO");
        if (usuario.getNivelAcesso() == null) {
            usuario.setNivelAcesso("USER");
        }
        
        usuarioRepository.save(usuario);
    }
    
    public java.util.List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }
    
    public void deletarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        if ("ADMIN".equals(usuario.getNivelAcesso())) {
            throw new RuntimeException("Não é possível deletar usuários administradores");
        }
        
        usuarioRepository.delete(usuario);
    }
}