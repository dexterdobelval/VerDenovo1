package com.verdenovo.api.controller;

import com.verdenovo.api.dto.LoginRequest;
import com.verdenovo.api.dto.LoginResponse;
import com.verdenovo.api.dto.MessageResponse;
import com.verdenovo.api.entity.Usuario;
import com.verdenovo.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            System.out.println("Login attempt for: " + request.getEmail());
            LoginResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.out.println("Login failed for " + request.getEmail() + ": " + e.getMessage());
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/cadastro")
    public ResponseEntity<MessageResponse> cadastro(@RequestBody Usuario usuario) {
        try {
            authService.cadastrar(usuario);
            return ResponseEntity.ok(new MessageResponse("Usuário cadastrado com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
    
    @GetMapping("/usuarios")
    public ResponseEntity<?> listarUsuarios() {
        try {
            return ResponseEntity.ok(authService.listarUsuarios());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Erro ao listar usuários"));
        }
    }
    
    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<MessageResponse> deletarUsuario(@PathVariable Long id) {
        try {
            authService.deletarUsuario(id);
            return ResponseEntity.ok(new MessageResponse("Usuário deletado com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse(e.getMessage()));
        }
    }
}